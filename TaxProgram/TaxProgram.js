
import { Classes }		from "../Library/Modules/Classes.js";
import { Container }	from "../Library/Classes/Container.js";
import { Dates }		from "../Library/Modules/Dates.js";
import { Debug }		from "../Library/Modules/Debug.js";
import { Dependent }	from "../Library/Classes/Dependent.js";
import { HTML }			from "../Library/Modules/HTML.js";
import { Objects }		from "../Library/Modules/Objects.js";
import { TaxFormObj }	from "../Library/Modules/TaxFormObj.js";
import { Taxpayer }		from "../Library/Classes/Taxpayer.js";
import { TaxTable }		from "../Library/Modules/TaxTable.js";
import { F1040 }		from "../Library/TaxForms/F1040.js";

import { Assetitem }	from "../Library/InputWorksheets/Assetitem.js";
import { Business }		from "../Library/InputWorksheets/Business.js";
import { Expenses }		from "../Library/InputWorksheets/Expenses.js";
import { Income }		from "../Library/InputWorksheets/Income.js";

import { saveUserDataHandler }		from "./SaveRestore.js";
import { restoreUserDataHandler }	from "./SaveRestore.js";

export {
	// Global variables
	dependents_container,
	assetsale_items_container,
	input_taxforms_container,
	output_taxforms_container,
	// Functions
	addInputFormToWeb,
	processError,
	resetAll,
};

let sales_tax = 0;		// Global variable because it is initialized asynchronously.

let dependents_container;
let assetsale_items_container;
let input_taxforms_container;
let output_taxforms_container;

function addAssetItemHandler(event) {
	//
	// This function is called when the user clicks on the "Add Entry" button to add an
	// Asset/Stock Sale entry to the web page.
	//
	const uid = Container.getUID("assetitem");
	const [ html_id, html ] = Assetitem.getInputHTML(uid);
	assetsale_items_container.addEntry(html_id, html);
}

function addDependentHandler(event) {
	//
	// This function is called when the user clicks on the "Add Dependent" button to add the
	// fields for a new dependent to the web page.
	//
	const uid = Container.getUID("dependent");
	const [ html_id, html ] = Dependent.getInputHTML(uid);
	dependents_container.addEntry(html_id, html);

	// Open the dependent area and scroll the window to it.
	HTML.openDetails(html_id);
	document.getElementById(html_id).scrollIntoView({behavior: 'smooth', block: 'start'});
}

function addFormHandler(event) {
	//
	// This function is called when the user clicks on the "Add Form" button to add a new
	// input tax form to the web page.
	//
	const formname = HTML.getElementValue("add-form-button");	// Get selected form name.
	HTML.putElementValue("add-form-button", "None");			// Reset to "Add Form".

	if (formname === "") {
			return;
	}

	let taxform_id = addInputFormToWeb(formname);

	// Open the form and scroll the window to it.
	HTML.openDetails(taxform_id);
	document.getElementById(taxform_id).scrollIntoView({behavior: 'smooth', block: 'start'});
}

function addInputFormToWeb(formname) {
	let uid = Container.getUID(formname);
	let [ taxform_id, html ] = Classes.getInputHTML(formname, uid);
	input_taxforms_container.addEntry(taxform_id, html);

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

function calculateHandler(event) {
	//
	// This function is called when the Calculate button is pressed. It causes
	// the tax return to be generated and displayed on the web page.
	//
	try {
		resetCalculation();		// Remove information from previous calculation.

		TaxTable.getTaxTable(HTML.getUserInput("tax-year"));	// Initialize tax tables
		Taxpayer.getTaxpayer();									// Initialize taxpayer
		getInput();												// Get the tax data
		TaxFormObj.getOrCreateForm("F1040").calculate();		// Calculate the tax
		putOutputs();											// Display the tax return
		Debug.turnOn();											// Display debugging data
	} catch (error) {
		processError(error);
	}
}

async function changeAddressHandler(event) {
	//
	// If the address changes, we need to get the sale tax rate for the new address. This is
	// retrieved asynchronously from the Internet, but it should be finished by the time it is
	// needed.
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
	// This function is called when any of the input fields are changed. It will update any
	// fields on the web page that may be affected by the change.
	//
	HTML.putElementValue("error-message-output", "");	// Clear error message.

	resetCalculation();  // Reset the previous calculation if there was one.

	// If the filing status changed, make sure the correct spouse information is displayed.
	const filing_status = HTML.getUserInput("filing-status", "text").toUpperCase();
	if (filing_status === "MFJ") {
		HTML.showElement("spouse-container");
	} else {
		HTML.hideElement("spouse-container");
	}
}

function getAssetsales() {
	let short_term_proceeds	= 0;
	let short_term_basis	= 0;
	let short_term_wash		= 0;
	let long_term_proceeds	= 0;
	let long_term_basis		= 0;
	let long_term_wash		= 0;

	for (const entry_id of assetsale_items_container.getEntries("Assetitem")) {
		const [ name, uid ] = Container.parseElementID(entry_id);
		const item = Assetitem.getUserInput(uid);

		if (Objects.isEmpty(item)) {
			continue;
		}

		if (item.long_term) {
			long_term_proceeds	+= item.proceeds;
			long_term_basis		+= item.basis;
			long_term_wash		+= item.wash;
		} else {
			short_term_proceeds	+= item.proceeds;
			short_term_basis	+= item.basis;
			short_term_wash		+= item.wash;
		}
	}

	const f1040sd = TaxFormObj.createForm("F1040SD");
	f1040sd.lines["01ad"].user_value	= short_term_proceeds;
	f1040sd.lines["01ae"].user_value	= short_term_basis;

	f1040sd.lines["08ad"].user_value	= long_term_proceeds;
	f1040sd.lines["08ae"].user_value	= long_term_basis;
}

function getBusinesses() {
	let business_names = [];

	for (const entry_id of input_taxforms_container.getEntries("Business")) {
		const [ name, uid ] = Container.parseElementID(entry_id);
		const inputs = Business.getUserInput(uid);

		if (Objects.isEmpty(inputs)) {
			continue;
		}

		const f1040sc = TaxFormObj.createForm("F1040SC");

		let business_name = "NO_NAME";
		if (inputs["name"]) {
			business_name = inputs["name"];
		}
		if (business_names.includes(business_name)) {
			throw new Error(`Business names must be unique: ${business_name}`);
		}

		f1040sc.cash_income = inputs["cash_income"];

		f1040sc.lines["name"].user_value	= business_name;
		f1040sc.lines["08" ].user_value		= inputs["advertising"];
		f1040sc.lines["09" ].user_value		= inputs["tolls"] +
			tt.getBusinessMileageDeduction(inputs["business_miles"]);
		f1040sc.lines["10" ].user_value		= inputs["commissions"];
		f1040sc.lines["15" ].user_value		= inputs["insurance"];
		f1040sc.lines["16b"].user_value		= inputs["interest"];
		f1040sc.lines["20b"].user_value		= inputs["rent"];
		f1040sc.lines["22" ].user_value		= inputs["office_supplies"] + inputs["tools"];
		f1040sc.lines["23" ].user_value		= inputs["licenses"];
		f1040sc.lines["24a"].user_value		= inputs["travel"];
		f1040sc.lines["24b"].user_value		= inputs["meals"];
		f1040sc.lines["25" ].user_value		= inputs["utilities"];
		f1040sc.lines["27b"].user_value		= inputs["other_expenses"] + inputs["training"];
	}

	// Make sure that Schedule Cs were created for all the businesses that have 1099-NECs
	// and 1099-MISCs.
	for (const name of TaxFormObj.getBusinessNames()) {
		if (!business_names.includes(name)) {
			const f1040sc = TaxFormObj.createForm("F1040SC");
			f1040sc.lines["name"].user_value = name;
		}
	}
};

function getDependents() {
	const tp = Taxpayer.getTaxpayer();

	for (const dependent of dependents_container.getEntries("Dependent")) {
		const [ entry_name, uid ] = Container.parseElementID(entry_id);
		const inputs = Dependent.getUserInput(uid);
		if (Objects.isUsed(inputs)) {
			tp.addDependent(inputs);
		}
	}
};

function getExpenses() {
	const tt		= TaxTable.getTaxTable();
	const tp		= Taxpayer.getTaxpayer();
	const inputs	= Expenses.getUserInput();

	if (Objects.isEmpty(inputs)) {
		return;
	}

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
	const inputs = Income.getUserInput();
	if (Objects.isEmpty(inputs)) {
			return;
	}

	const f1040s1 = TaxFormObj.getOrCreateForm("F1040S1");

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

	// Get information from the input worksheets.
	getDependents();
	getExpenses();
	getIncome();
	getAssetsales();
	getBusinesses();

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
	dependents_container		= new Container("dependents-container");
	assetsale_items_container	= new Container("assetsale-items-container");
	input_taxforms_container	= new Container("input-taxforms-container");
	output_taxforms_container	= new Container("output-taxforms-container");

	// Add four blsnl entries to get started.
	addAssetItemHandler();
	addAssetItemHandler();
	addAssetItemHandler();
	addAssetItemHandler();

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
	Expenses.reset();
	Income.reset();
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
	Taxpayer.resetCalculation();			// Re-read the input fields.
	output_taxforms_container.reset();		// Remove tax return (output) web pages
	HTML.hideElement("output-taxforms-container");
}

document.addEventListener("DOMContentLoaded", () => {
	//
	// Wait for the DOM to be fully loaded before trying to access any elements.
	//
	HTML.addListener("tool-container",			"change", changeHandler);
	HTML.addListener("street-address",			"change", changeAddressHandler);
	HTML.addListener("city",					"change", changeAddressHandler);
	HTML.addListener("zip-code",				"change", changeAddressHandler);
	HTML.addListener("add-asset-sale-button",	"click",  addAssetItemHandler);
	HTML.addListener("add-dependent-button",	"click",  addDependentHandler);
	HTML.addListener("add-form-button",			"click",  addFormHandler);
	HTML.addListener("calculate-button",		"click",  calculateHandler);

	HTML.addListener("save-button",				"click",  saveUserDataHandler);
	HTML.addListener("input-file",				"change", restoreUserDataHandler);

	initialize();
});
