
import { Classes }		from "../Library/Classes/Classes.js";
import { Container }	from "../Library/Classes/Container.js";
import { Dates }		from "../Library/Classes/Dates.js";
import { Debug }		from "../Library/Classes/Debug.js";
import { File }			from "../Library/Classes/File.js";
import { HTML }			from "../Library/Classes/HTML.js";
import { Objects }		from "../Library/Classes/Objects.js";
import { TaxFormObj }	from "../Library/Classes/TaxFormObj.js";
import { Taxpayer }		from "../Library/Classes/Taxpayer.js";
import { TaxTable }		from "../Library/Classes/TaxTable.js";
import { F1040 }		from "../Library/TaxForms/F1040.js";

import { Assetitem }	from "../Library/InputWorksheets/Assetitem.js";
import { Assetsales }	from "../Library/InputWorksheets/Assetsales.js";
import { Business }		from "../Library/InputWorksheets/Business.js";
import { Dependent }	from "../Library/InputWorksheets/Dependent.js";
import { Expenses }		from "../Library/InputWorksheets/Expenses.js";
import { Income }		from "../Library/InputWorksheets/Income.js";

import { TAX_PROGRAM_SAVE_FILE } from "../Library/TAXTools/TAXTools.js";

let sales_tax = 0;		// Global variable because it is initialized asynchronously.
let worksheet_container;
let input_taxforms_container;
let output_taxforms_container;
let asset_sales_container;

function addAssetItemHandler(event) {
	//
	// This function is called when the user clicks on the "Add Entry" button to add an
	// Asset/Stock Sale entry.
	//
	addToAssetItems("Assetitem");
}

function addAssetSaleEntryToWeb(name) {
	const uid = Container.getUID(name.toLowerCase());
	const [ html_id, html ] = Classes.getInputHTML(name, uid);
	asset_sales_container.addEntry(html_id, html);

	return html_id;
}

function addFormHandler(event) {
	//
	// This function is called when the user clicks on the "Add Form" button.
	//
	const formname = HTML.getElementValue("add-form-button");	// Get selected form name.
	HTML.putElementValue("add-form-button", "");				// Reset to "Add Form".

	if (formname === "") {
			return;
	}

	addInputFormToWeb(formname);
}

function addInputFormToWeb(formname) {
	let uid = Container.getUID(formname);
	let [ taxform_id, html ] = Classes.getInputHTML(formname, uid);
	input_taxforms_container.addEntry(taxform_id, html);

	// Open the form and scroll the window to it.
	HTML.openDetails(taxform_id);
	document.getElementById(taxform_id).scrollIntoView({behavior: 'smooth', block: 'start'});

	return taxform_id;
}

function addOutputFormToWeb(form) {
	if (typeof form.getOutputHTML !== 'function') {
		throw new Error(
			`${form.formname}.getOutputHTML does not exist; cannot add output form.`);
		return;
	}

	let uid = Container.getUID(form.formname);
	let [ taxform_id, html ] = form.getOutputHTML(uid);
	output_taxforms_container.addEntry(taxform_id, html);
	form.putInformation(uid);

	return taxform_id;
}

function addWorksheetToWeb(name) {
	const uid = Container.getUID(name.toLowerCase());
	const [ html_id, html ] = Classes.getInputHTML(name, uid);
	worksheet_container.addEntry(html_id, html);

	return html_id;
}

function calculateHandler(event) {
	//
	// This function is called when the Calculate button is pressed. It causes
	// the tax return to be generated.
	//
	try {
		// Remove information from previous calculation.
		resetCalculation();

		TaxTable.getTaxTable(HTML.getUserInput("tax-year"));	// Initialize tax tables
		Taxpayer.getTaxpayer();									// Initialize taxpayer
		getInput();
		TaxFormObj.getOrCreateForm("F1040").calculate();
		putOutputs();
		Debug.turnOn();
	} catch (error) {
		processError(error);
	}
}

async function changeAddressHandler(event) {
	//
	// Get the total sales tax (state + local) percentage for the address.
	//
	const street_address	= HTML.getUserInput("street-address",	"text");
	const city				= HTML.getUserInput("city",				"text");
	const zip_code			= HTML.getUserInput("zip-code",			"text");

	sales_tax = 0;	// Global variable
	if (street_address && city && zip_code) {
		sales_tax = await fetchSalesTaxRate(street_address, city, zip_code);
	}
}

function changeHandler(event) {
	//
	// This function is called when any of the input fields are changed. It will reset
	// any information that may be affected.
	//
	HTML.putElementValue("error-message-output", "");	// Clear error message.

	// Reset information from previous calculation.
	resetCalculation();

	// See if filing status changed.
	const filing_status = HTML.getUserInput("filing-status", "text").toUpperCase();
	if (filing_status === "MFJ") {
		HTML.showElement("spouse-container");
	} else {
		HTML.hideElement("spouse-container");
	}
}

function dependentHandler(event) {
	//
	// This function is called when the user clicks on the "Enter a Dependentn" button.
	//
	let id = addWorksheet("Dependent");
	HTML.openDetails(id);
}

function getAssetsales() {
	// const input = Classes.getInputValues("Assetsales", 1);
	console.log("getAssetsales is not implemented yet.");
}

function getBusiness() {
	console.log("getBusiness is not implemented yet.");
};

function getDependents() {
	console.log("getDependents is not implemented yet.");
};

function getExpenses() {
	const tt		= TaxTable.getTaxTable();
	const tp		= Taxpayer.getTaxpayer();	
	const inputs	= Classes.getUserInput("Expenses");
	const f1040		= TaxFormObj.getOrCreateForm("F1040");
	const f1040s1	= TaxFormObj.getOrCreateForm("F1040S1");
	const f1040sa	= TaxFormObj.getOrCreateForm("F1040SA");

	// Form 1040
	f1040.estimated_payments = inputs["est_payments_federal"];

	// Form 1040, Schedule 1
	f1040s1.lines["11"].user_value = inputs["educator_taxpayer"] + inputs["educator_spouse"];
	f1040s1.lines["19a"].user_value	= inputs["alimony_paid"];
	f1040s1.lines["19c"].user_value	= inputs["divorce_date"];

	// Form 1040, Schedule A
	f1040sa.medicare = inputs["medicare"];
	f1040sa.medical_insurance =
		inputs["healthcare"] +
		inputs["dental"] +
		Math.min(inputs["taxpayer_ltc"], tt.getMaxLTC(tp.taxpayers_age)) +
		Math.min(inputs["taxpayer_ltc"], tt.getMaxLTC(tp.spouses_age));

	f1040sa.medical_expenses =
		inputs["doctor"] +
		inputs["prescriptions"] +
		inputs["medical_aids"] +
		inputs["medical_facilities"] +
		inputs["nursing_services"] +
		tt.getMedicalMileageDeduction(inputs["medical_miles"]) +
		inputs["other_medical"];

	f1040sa.sales_tax_rate		= sales_tax;
	f1040sa.extra_sales_tax		= inputs["extra_sales_tax"];
	f1040sa.est_payments_state	= inputs["est_payments_state"];
	f1040sa.property_tax		= inputs["property_tax"];
	f1040sa.personal_property_tax = inputs["personal_property_tax"];
	f1040sa.cash_donations		= inputs["cash_donations"];
	f1040sa.noncash_donations	=
		inputs["noncash_donations"]+
		tt.getCharitableMileageDeduction(inputs["charitable_miles"]);

	//
	// Expense fields that are not implemented yet
	//
	// fxxxx.lines["xx"].user_value	= inputs["foreign_tax"];
	// fxxxx.lines["xx"].user_value	= inputs["tax_preparation"];
	// fxxxx.lines["xx"].user_value	= inputs["investment_expenses"];
}

function getIncome() {
	const inputs	= Classes.getUserInput("Income");
	const f1040s1	= TaxFormObj.getOrCreateForm("F1040S1");

	f1040s1.lines["24a"].user_value = inputs["jury_duty"];
	f1040s1.lines["02a"].user_value = inputs["alimony_received"];
	f1040s1.lines["02b"].user_value = inputs["divorce_date"];
	f1040s1.lines["08b"].user_value = inputs["gambling"];
	f1040s1.lines["08z"].user_value = inputs["other"];
}

function getInput() {
	//
	// When the tax return is calculated, this function is called to copy the information
	// from the web page to objects instances of the tax form.
	//

	// Get information frm the input worksheets.
	getDependents();
	getExpenses();
	getIncome();
	getAssetsales();
	getBusiness();

	// Get information from the input tax forms.
	for (let taxform_id of input_taxforms_container.getEntries()) {
		let [ formname, uid ] = Container.parseElementID(taxform_id);
		Classes.createForm(formname.toUpperCase(), uid);
	}
}

function initialize() {
	Debug.set_strict();

	// Initialize header.
	HTML.putUserOutput("tax-year", Dates.getTaxYear(), "text");
	HTML.putUserOutput("filing-status", "SINGLE");
	HTML.hideElement("spouse-container");

	// Add input worksheets.
	worksheet_container			= new Container("input-worksheets-container");
	input_taxforms_container	= new Container("input-taxforms-container");
	output_taxforms_container	= new Container("output-taxforms-container");
	asset_sales_container		= new Container("assetsales-container");

	addWorksheetToWeb("Expenses");
	addWorksheetToWeb("Assetsales");
	addWorksheetToWeb("Income");
	addWorksheetToWeb("Business");
	addAssetSaleEntryToWeb("Assetitem");
	addAssetSaleEntryToWeb("Assetitem");
	addAssetSaleEntryToWeb("Assetitem");
	addAssetSaleEntryToWeb("Assetitem");
	HTML.addListener("add-asset-sale-button", "click", addAssetItemHandler);

	HTML.hideElement("output-taxforms-container");
	HTML.hideElement("debug-container");
	HTML.putElementValue("error-message-output", "");
}

function listBusinessNames() {
	let business_names = [];

	// Search the small business worksheets for business names.
	for (const worksheet_id of worksheet_container.getEntries()) {
		if (worksheet_id.startsWith("business-")) {
			let [ name, uid ] = Container.parseElementID(worksheet_id);
			let business_name_id = `${name}-${uid}-name`;
			let business_name = HTML.getElementValue(business_name_id);
			if (business_name === "") {
				business_name = "NO-NAME";
			}
			if (business_names.includes(business_name)) {
				throw new Error("listBusinesses: More than one business with " +
					`the same name: ${business_name}`);
			}
			business_names.push(business_name);
		}
	}

	// Search the 1099-NEC and 1099-MISC forms for business names.
	for (const form_id of input_taxforms_container.getEntries()) {
		if (form_id.startsWith("f1099NEC-") || form_id.startsWith("f1099MISC-")) {
			let [ name, uid ] = Container.parseElementID(form_id);
			let business_name_id = `${name}-${uid}-business-name`;
			let business_name = HTML.getElementValue(business_name_id);
			if (business_name === "" && form_id.startsWith("f1099NEC-")) {
				business_name = "NO-NAME";
			}
			if (business_name && !business_names.includes(business_name)) {
				business_names.push(business_name);
			}
		}
	}

	return business_names;
}

function processError(error) {
	//
	// Process an error caught by one of the main functions.
	//
	HTML.putElementValue("error-message-output", error);
	console.log("Stack trace:", error.stack);
	document.getElementById("error-message-output")
		.scrollIntoView({behavior: 'smooth', block: 'start'});
}

function putOutputs() {
	//
	//	Print the tax forms.
	//

	// Close the input forms so they do not distract from the tax return information.
	HTML.closeAllDetails();

	// Create the tax return web pages.
	for(const form of TaxFormObj.formsInPrintOrder()) {
		if (form.isUsed() || (form.formname === "F1040")) {
			addOutputFormToWeb(form);
		}
	}

	// Put the taxpayer information into form 1040.
	Taxpayer.getTaxpayer().putTaxpayerInformation();

	// Show the tax return forms.
	HTML.openDetails("f1040-1-container");
	HTML.showElement("output-taxforms-container");
	document.getElementById("output-taxforms-container")
		.scrollIntoView({behavior: 'smooth', block: 'start'});
}

function resetAll() {
	//
	// Start over, reset everything.
	//
	Debug.reset();
	TaxFormObj.reset();
	Taxpayer.reset();
	TaxTable.reset();
	Container.reset();
	
	initialize();
}

function resetCalculation() {
	//
	// Reset the tax calculation, but leave the information entered by the user as is.
	//
	Debug.reset();
	Debug.set_strict();
	TaxFormObj.reset();						// Reset the tax calculations.
	output_taxforms_container.reset();
	HTML.hideElement("output-taxforms-container");
}

function restoreUserData(data) {
	//
	// This function is called when the user restores the input fields from a file.
	// The data that was copied from the file is passed a parameter.
	//
	try {
		const tool = HTML.getUserInput("title", "text");
		if (data.tool_name !== tool) {
			throw new Error(`Restored data file is intended for the ${data.tool} tool.`);
		}

		resetAll();		// Start over, reset ewverything.

		// Restore the taxpayer information.
		HTML.putUserOutput("tax-year", data.tax_year, "text");
		Taxpayer.restoreUserInput(data["taxpayer"]);

		// Restore each input form.
		for (const forminfo of data["input_forms"]) {
			let formname	= forminfo[0];
			let lines		= forminfo[1];

			if (!Classes.isInputForm(formname)) {
				throw new Error(`restoreUserData(): ${formname} ` +
					"is an output form, cannot restore.");
			}

			const taxform_id = addInputFormToWeb(formname);
			let [ name, uid ] = Container.parseElementID(taxform_id);
			const element_id_prefix = `${name}-${uid}-`;
			for (const lineno of Object.keys(lines)) {
				HTML.putElementValue(element_id_prefix + lineno, lines[lineno]);
			}
		}
	} catch (error) {
		processError(error);
	}
}

function restoreUserDataHandler(event) {
	//
	// The file selection dialog gets a list of files, but only one should be passed
	// in our case; select the first file and ignore the rest.
	//
	const filename = event.target.files[0];
	if (!filename) {
		throw new Error("No file selected.");
		return;
	}

	File.restoreFromFile(filename, restoreUserData);
}

function saveInputValues() {
	// Return array of: formName: [ formIndex, lineNumber, value ]
	// This method is used to save the current state to a file. It only saves the
	// values on the input form web pages.
	let user_values = [];

	// For each form.
	for (let taxform_id of input_taxforms_container.getEntries()) {
		let [ formname, uid ] = Container.parseElementID(taxform_id);
		formname = formname.toUpperCase();
		let inputs = Objects.removeUnused(Classes.getUserInput(formname, uid));
		inputs = Objects.removeUnused(inputs);
		user_values.push( [ formname, inputs ] );
	}

	return user_values;
}

function saveOutputValues() {
	// Return array of: formName: [ formIndex, { lineNumber: value } }
	// This method is used to save the current state to a file. It only saves the
	// values in the tax form objects.
	let user_values = [];

	// For each form.
	for (const form of TaxFormObj.getAllForms()) {
		if (!Classes.isOutputForm(form.formname)) {
			break;
		}

		let outputs = {};
		for (const lineno of Object.keys(form.lines)) {
			if (form.lines[lineno].value) {
				outputs[lineno] = form.lines[lineno].value;
			}
		}
		if (Objects.isUsed(outputs)) {
			user_values.push( [ form.formname, outputs ] );
		}
	}

	return user_values;
}

function saveUserDataHandler(event) {
	//
	// This function is called when the user wants to save the input fields to a file.
	//
	try {
		const data = {
			"tool_name":	HTML.getUserInput("title", "text"),
			"version":		HTML.getUserInput("tax-tools-version", "text"),
			"todays_date":	new Date().toLocaleDateString(),
			"tax_year":		HTML.getUserInput("tax-year", "text"),
			"taxpayer":		Objects.removeUnused(Taxpayer.getUserInput()),
			"input_forms":	saveInputValues(),
			"output_forms":	saveOutputValues(),
		};

		File.saveToFile(data, TAX_PROGRAM_SAVE_FILE);
	} catch (error) {
		processError(error)
	}
}

document.addEventListener("DOMContentLoaded", () => {
	//
	// Wait for the DOM to be fully loaded before trying to access any elements.
	//
	HTML.addListener("add-form-button",		"click",  addFormHandler);
	HTML.addListener("calculate-button",	"click",  calculateHandler);
	HTML.addListener("dependent-button",	"click",  dependentHandler);
	HTML.addListener("save-button",			"click",  saveUserDataHandler);
	HTML.addListener("input-file",			"change", restoreUserDataHandler);
	HTML.addListener("tool-container",		"change", changeHandler);
	HTML.addListener("street-address",		"change", changeAddressHandler);
	HTML.addListener("city",				"change", changeAddressHandler);
	HTML.addListener("zip-code",			"change", changeAddressHandler);

	initialize();
});
