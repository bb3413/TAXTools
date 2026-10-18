
import { SINGLE, HOH, MFJ, QSS, MFS }	from "../Library/TAXTools/TAXTools.js";
import { TAXTOOL_CONTAINER }			from "../Library/TAXTools/TAXTools.js";
import { strToFilingStatus }			from "../Library/TAXTools/TAXTools.js";
import { filingStatusToStr }			from "../Library/TAXTools/TAXTools.js";

// Classes
import { HTMLMgr }						from "../Library/Classes/HTMLMgr.js";
import { Taxpayer }						from "../Library/Classes/Taxpayer.js";

// Modules
import { Classes }						from "../Library/Modules/Classes.js";
import { Dates }						from "../Library/Modules/Dates.js";
import { Debug }						from "../Library/Modules/Debug.js";
import { Ensure }						from "../Library/Modules/Ensure.js";
import { HTML }							from "../Library/Modules/HTML.js";
import { Objects }						from "../Library/Modules/Objects.js";
import { Str }							from "../Library/Modules/Str.js";
import { TaxFormObj }					from "../Library/Modules/TaxFormObj.js";
import { TaxInfo }						from "../Library/Modules/TaxInfo.js";
import { TaxTable }						from "../Library/Modules/TaxTable.js";

// Tax Forms and Input Worksheet
import { Assetitem }					from "../Library/InputWorksheets/Assetitem.js";
import { Business }						from "../Library/InputWorksheets/Business.js";
import { Dependent }					from "../Library/InputWorksheets/Dependent.js";
import { Expenses }						from "../Library/InputWorksheets/Expenses.js";
import { Income }						from "../Library/InputWorksheets/Income.js";

export {
	addInputForm,
	changeHandler,
	processError,
	resetAll,
};

// HTML containers for dynamic content.
export const DEPENDENTS_CONTAINER		= "dependents-container";
export const EXPENSES_CONTAINER			= "expenses-container";
export const INCOME_CONTAINER			= "income-container";
export const ASSETSALES_CONTAINER		= "assetsales-container";
export const INPUT_TAXFORMS_CONTAINER	= "input-taxforms-container";
export const OUTPUT_TAXFORMS_CONTAINER	= "output-taxforms-container";
export const ERROR_MESSAGE_OUTPUT		= "error-message-output";
export const DEBUG_CONTAINER			= "debug-container";
export const DEBUG_OUTPUT				= "debug-output";

let sales_tax = 0;		// Global variable because it is initialized asynchronously.

function addAssetSaleHandler(event) {
	//
	// This function is called when the user clicks on the "Add Entry" button to add an
	// Asset/Stock Sale entry to the web page.
	//
	const hm = HTMLMgr.getMgr();

	hm.createAndAddBlock("Assetitem", ASSETSALES_CONTAINER, "beforeend");
}

function addDependentHandler(event) {
	//
	// This function is called when the user clicks on the "Add Dependent" button to add the
	// fields for a new dependent to the web page.
	//
	const hm = HTMLMgr.getMgr();

	const block = hm.createAndAddBlock("Dependent", DEPENDENTS_CONTAINER, "beforeend");

	// Open the dependent area and scroll the window to it.
	HTML.openDetails(block.getID());
	HTML.scrollTo(block.getID());
	HTML.setFocus(`${block.name}-${block.uid}-name`);
}

function addInputFormHandler(event) {
	//
	// This function is called when the user clicks on the "Add Form" button to add a new
	// input tax form to the web page.
	//
	const formname = HTML.getElementValue("add-form-button");	// Get selected form name.
	HTML.putElementValue("add-form-button", "None");			// Reset to "Add Form".
	if (formname === "" || formname === "None") {
		return;
	}

	const block		= addInputForm(formname);
	const block_id	= block.getID();

	// Open the form and scroll the window to it.
	HTML.openDetails(block_id);
	HTML.scrollTo(block_id);

	// Set the focus to the first box on the form.
	
	switch (formname) {
		case "W2":			HTML.setFocus(`${block_id}-01`);	break;
		case "SSA1099":		HTML.setFocus(`${block_id}-05`);	break;
		case "F1099C":		HTML.setFocus(`${block_id}-02`);	break;
		case "F1099DIV":	HTML.setFocus(`${block_id}-01a`);	break;
		case "F1099G":		HTML.setFocus(`${block_id}-01`);	break;
		case "F1099INT":	HTML.setFocus(`${block_id}-01`);	break;
		case "F1099K":		HTML.setFocus(`${block_id}-01a`);	break;
		case "F1099MISC":	HTML.setFocus(`${block_id}-01`);	break;
		case "F1099NEC":	HTML.setFocus(`${block_id}-01a`);	break;
		case "F1099OID":	HTML.setFocus(`${block_id}-01`);	break;
		case "F1099R":		HTML.setFocus(`${block_id}-01`);	break;
		case "F1099S":		HTML.setFocus(`${block_id}-02a`);	break;
		case "F1098E":		HTML.setFocus(`${block_id}-01`);	break;
		case "F1098VLI":	HTML.setFocus(`${block_id}-01`);	break;
		case "Business":	HTML.setFocus(`${block_id}-name`);	break;
	}
}

function addInputForm(formname) {
	Ensure.isNonEmptyString(formname);

	const hm		= HTMLMgr.getMgr();
	let block_name	= formname.toLowerCase();
	let last_block	= hm.lastBlock(block_name);
	let block		= undefined;

	if (last_block) {
		block = hm.createAndAddBlock(
						formname + "_HTML",
						last_block.getID(),
						"afterend");
	} else {
		block = hm.createAndAddBlock(
						formname + "_HTML",
						"input-taxforms-container",
						"beforeend");
	}
	
	return block;
}

function addOutputForm(form) {
	const hm = HTMLMgr.getMgr();

	const html_block = hm.createBlock(form.formname + "_HTML");
	if (Str.empty(html_block.html)) {
		html_block.html = form.toHTML(html_block.uid);
	}
	
	hm.addBlock(html_block, OUTPUT_TAXFORMS_CONTAINER, "beforeend");
	html_block.putValues(form.getValues());
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

		// Calculate the Fed return
		// There is a circular reference from 1040-S1, lines 20 and 21 to 1040, line 9,
		// but to 1040, lines 8 and 10 reference 1040-S1, lines 8 and 26. Therefore, a
		// two-pass calculation is used which gets the correct calculation in most
		// situations and very close in all situations.
		TaxFormObj.getOrCreateForm("F1040").calculate();
		TaxFormObj.getOrCreateForm("F1040S1").recalculate();
		TaxFormObj.getForm("F1040").recalculate();

		// Calculate the CA return
		TaxFormObj.getOrCreateForm("F540").calculate();

		putOutputs();											// Display the tax return
		Debug.turnOn();											// Display debugging data
	} catch (error) {
		processError(error);
	}
}

async function changeAddressHandler(event) {
	//
	// If the address changes, we need to get the sale tax rate for the new address. This is
	// retrieved asynchronously from the Internet, but it should be finished by the time it
	// is needed.
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
	HTML.putElementValue(ERROR_MESSAGE_OUTPUT, "");	// Clear error message.

	resetCalculation();  // Reset the previous calculation if there was one.

	// If the filing status changed, make sure the correct spouse information is displayed.
	const filing_status =
		strToFilingStatus(HTML.getUserInput("filing-status", "text"));
	if (filing_status === MFJ) {
		HTML.showElement("spouse-container");
	} else {
		HTML.hideElement("spouse-container");
	}
}

function getAssetsales() {
	const hm = HTMLMgr.getMgr();

	let short_term_proceeds	= 0;
	let short_term_basis	= 0;
	let short_term_wash		= 0;
	let long_term_proceeds	= 0;
	let long_term_basis		= 0;
	let long_term_wash		= 0;

	for (const block of hm.getBlocks("assetitem")) {
		const values = block.getValues();
		if (Objects.isEmpty(values)) {
			continue;
		}

		if (values.long_term) {
			long_term_proceeds	+= values.proceeds;
			long_term_basis		+= values.basis;
			long_term_wash		+= values.wash;
		} else {
			short_term_proceeds	+= values.proceeds;
			short_term_basis	+= values.basis;
			short_term_wash		+= values.wash;
		}
	}

	if (short_term_proceeds > 0 || long_term_proceeds > 0) {
		const f1040sd = TaxFormObj.createForm("F1040SD");
		f1040sd.lines["01ad"].user_value	= short_term_proceeds;
		f1040sd.lines["01ae"].user_value	= short_term_basis;

		f1040sd.lines["08ad"].user_value	= long_term_proceeds;
		f1040sd.lines["08ae"].user_value	= long_term_basis;
	}
}

function getBusinesses() {
	const hm = HTMLMgr.getMgr();
	let business_names = [];

	for (const block of hm.getBlocks("business")) {
		const values = block.getValues();
		if (Objects.isEmpty(values)) {
			continue;
		}

		const f1040sc = TaxFormObj.createForm("F1040SC");

		let business_name = "NO_NAME";
		if (values["name"]) {
			business_name = values["name"];
		}
		if (business_names.includes(business_name)) {
			throw new Error(`Business names must be unique: ${business_name}`);
		}

		f1040sc.cash_income = values["cash_income"];

		f1040sc.lines["name"].user_value	= business_name;
		f1040sc.lines["08" ].user_value		= values["advertising"];
		f1040sc.lines["09" ].user_value		= values["tolls"] +
			tt.getBusinessMileageDeduction(values["business_miles"]);
		f1040sc.lines["10" ].user_value		= values["commissions"];
		f1040sc.lines["15" ].user_value		= values["insurance"];
		f1040sc.lines["16b"].user_value		= values["interest"];
		f1040sc.lines["20b"].user_value		= values["rent"];
		f1040sc.lines["22" ].user_value		= values["office_supplies"] + values["tools"];
		f1040sc.lines["23" ].user_value		= values["licenses"];
		f1040sc.lines["24a"].user_value		= values["travel"];
		f1040sc.lines["24b"].user_value		= values["meals"];
		f1040sc.lines["25" ].user_value		= values["utilities"];
		f1040sc.lines["27b"].user_value		= values["other_expenses"] + values["training"];
	}

	// Make sure that Schedule Cs were created for all the businesses that have 1099-NECs
	// and 1099-MISCs.
	for (const name of TaxInfo.getBusinessNames()) {
		if (!business_names.includes(name)) {
			const f1040sc = TaxFormObj.createForm("F1040SC");
			f1040sc.lines["name"].user_value = name;
		}
	}
};

function getDependents() {
	const hm = HTMLMgr.getMgr();
	const tp = Taxpayer.getTaxpayer();

	for (const block of hm.getBlocks("dependent")) {
		const values = block.getValues();
		if (Objects.isEmpty(values)) {
			continue;
		}

		tp.addDependent(values);
	}
};

function getExpenses() {
	const hm		= HTMLMgr.getMgr();
	const tt		= TaxTable.getTaxTable();
	const tp		= Taxpayer.getTaxpayer();

	const block		= hm.getBlock("expenses");
	const values	= block.getValues();

	const f1040		= TaxFormObj.getOrCreateForm("F1040");
	const f1040s1	= TaxFormObj.getOrCreateForm("F1040S1");
	const f1040sa	= TaxFormObj.getOrCreateForm("F1040SA");
	const f540		= TaxFormObj.getOrCreateForm("F540");
	const f540ca	= TaxFormObj.getOrCreateForm("F540CA");

	// Form 1040
	f1040.estimated_payments = values["est_payments_federal"];

	// Form 1040, Schedule 1
	f1040s1.alimony_paid				= values["alimony_paid"];
	f1040s1.lines["19c"].user_value		= values["divorce_date"];
	f1040s1.educator_expense_taxpayer	= values["educator_taxpayer"];
	f1040s1.educator_expense_spouse		= values["educator_spouse"];
	// Also enter on form 8880.
	f1040s1.ira_contribution_taxpayer	= values["ira_contribution_taxpayer"];
	f1040s1.ira_contribution_spouse		= values["ira_contribution_spouse"];

	// Form 1040, Schedule A
	f1040sa.medicare = values["medicare"];
	f1040sa.medical_insurance =
		values["healthcare"] +
		values["dental"] +
		Math.min(values["taxpayer_ltc"], tt.getMaxLTC(tp.taxpayers_age)) +
		Math.min(values["taxpayer_ltc"], tt.getMaxLTC(tp.spouses_age));

	f1040sa.medical_expenses =
		values["doctor"] +
		values["prescriptions"] +
		values["medical_aids"] +
		values["medical_facilities"] +
		values["nursing_services"] +
		tt.getMedicalMileageDeduction(values["medical_miles"]) +
		values["other_medical"];

	f1040sa.sales_tax_rate			= sales_tax;
	f1040sa.extra_sales_tax			= values["extra_sales_tax"];
	f1040sa.est_payments_state		= values["est_payments_state"];
	f1040sa.state_tax_due			= values["state_tax_due"];
	f1040sa.property_tax			= values["property_tax"];
	f1040sa.personal_property_tax	= values["personal_property_tax"];
	f1040sa.cash_donations			= values["cash_donations"];
	f1040sa.noncash_donations =
		values["noncash_donations"]+
		tt.getCharitableMileageDeduction(values["charitable_miles"]);

	// Form 8880
	if (values["ira_contribution_taxpayer"] || values["ira_contribution_spouse"]) {
		const f8880	= TaxFormObj.getOrCreateForm("F8880");
		// Also enter in form 1040-S1
		f8880.ira_contribution_taxpayer	= values["ira_contribution_taxpayer"];
		f8880.ira_contribution_spouse	= values["ira_contribution_spouse"];
	}
		
	// Form 540
	f540.lines["072"].user_value = values["est_payments_state"];

	// Form 540-CA
	f540ca.lines["D-20"].user_value	= values["tax_preparation"];
	f540ca.investment_expenses		= values["investment_expenses"];
}

function getIncome() {
	const hm		= HTMLMgr.getMgr();
	const block		= hm.getBlock("income")
	const values	= block.getValues();
	const f1040s1	= TaxFormObj.getOrCreateForm("F1040S1");

	f1040s1.alimony_received = values["alimony_received"];

	f1040s1.lines["24a"].user_value = values["jury_duty"];
	f1040s1.lines["02b"].user_value = values["divorce_date"];
	f1040s1.lines["08b"].user_value = values["gambling"];
	f1040s1.lines["08z"].user_value = values["other"];
}

function getInputForms() {
	// For each form that the taxpayer added to the web page, create a form object and
	// copy the fields from the web to the form object.
	const hm = HTMLMgr.getMgr();

	for (const block of hm.getBlocks()) {
		const formname = block.getFormname();
		if (!Classes.isInputForm(formname)) {
			continue;
		}

		const values = block.getValues();
		if (Objects.isEmpty(values)) {
			continue;
		}

		const form = TaxFormObj.createForm(formname);
		form.putValues(values);
	}
}

function getInput() {
	//
	// When the tax return is calculated, this function is called to copy the information
	// from the web page to objects instances of the tax form.
	//
	getDependents();
	getExpenses();
	getIncome();
	getAssetsales();
	getBusinesses();
	getInputForms();
}

function initialize() {
	// Initialize header.
	HTML.putUserOutput("tax-year", Dates.getTaxYear(), "text");
	HTML.putUserOutput("filing-status", "SINGLE");
	HTML.hideElement("spouse-container");

	// Add input worksheets.
	const hm = HTMLMgr.getMgr();
	hm.createAndAddBlock("Expenses",	EXPENSES_CONTAINER,		"beforeend");
	hm.createAndAddBlock("Income",		INCOME_CONTAINER, 		"beforeend");

	// Add four blnk entries to get started.
	hm.createAndAddBlock("Assetitem",	ASSETSALES_CONTAINER,	"beforeend");
	hm.createAndAddBlock("Assetitem",	ASSETSALES_CONTAINER,	"beforeend");
	hm.createAndAddBlock("Assetitem",	ASSETSALES_CONTAINER,	"beforeend");
	hm.createAndAddBlock("Assetitem",	ASSETSALES_CONTAINER,	"beforeend");

	HTML.hideElement(OUTPUT_TAXFORMS_CONTAINER);
	HTML.hideElement(DEBUG_CONTAINER);
	HTML.putElementValue(ERROR_MESSAGE_OUTPUT, "");
}

function listBusinessNames() {
	const hm = HTMLMgr.getMgr();
	const business_names = [];

	for (const block of hm.getBlocks("business")) {
		const values = block.getValues();
		if (Objects.isEmpty(values)) {
			continue;
		}
	
		let business_name = values.name === "" ? "NO-NAME" : values.name;
		if (business_names.includes(business_name)) {
			throw new Error("listBusinesses: More than one business with " +
				`the same name: ${business_name}`);
		}
		business_names.push(business_name);
	}

	// Search the 1099-NEC and 1099-MISC forms for business names.
	for (const block of hm.getBlocks()) {
		const values = block.getValues();
		if (Objects.isEmpty(values)) {
			continue;
		}

		
		if (block.name === "f1099misc") {
			let business_name = values.name === "" ? "NO-NAME" : values.name;
		}

		if (block.name === "f1099nec") {
			let business_name = values.name === "" ? "NO-NAME" : values.name;
		}
	
		if (business_name && !business_names.includes(business_name)) {
			business_names.push(business_name);
		}
	}

	return business_names;
}

function parseElementID(element_id) {
	// Returns:  [ name, uid ]
	Ensure.isString(element_id);

	const parts = element_id.split("-");
	const name = parts[0] || "";
	const uid = parts.length > 1 ? parts[1] : "0";
	return [ name, uid ];
}
	
function processError(error) {
	//
	// Process an error caught by one of the main functions.
	//
	HTML.putElementValue(ERROR_MESSAGE_OUTPUT, error);
	console.log("Stack trace:", error.stack);
	HTML.scrollTo(ERROR_MESSAGE_OUTPUT);
}

function putOutputs() {
	//
	//	Print the tax forms.
	//

	// Close the input forms so they do not distract from the tax return information.
	HTML.closeAllDetails();

	// Create the tax return web pages.
	for(const form of TaxInfo.formsInPrintOrder()) {
		if (form.isUsed() || (form.formname === "F1040")) {
			addOutputForm(form);
		}
	}

	// Put the taxpayer information into form 1040.
	const tp = Taxpayer.getTaxpayer();
	tp.fillIn1040();

	// Show the tax return forms.
	const hm = HTMLMgr.getMgr();
	const block = hm.getBlock("f1040");
	HTML.openDetails(block.getID());
	HTML.showElement("output-taxforms-container");
	document.getElementById("output-taxforms-container")
		.scrollIntoView({behavior: 'smooth', block: 'start'});
}

function resetAll() {
	//
	// Start over, reset everything.
	//
	const hm = HTMLMgr.getMgr();

	Debug.reset();
	TaxFormObj.reset();
	Taxpayer.reset();
	TaxTable.reset();
	hm.reset();

	initialize();
}

function resetCalculation() {
	//
	// Reset the tax calculation, but leave the information entered by the user as is.
	//
	const hm = HTMLMgr.getMgr();

	Debug.reset();
	TaxFormObj.reset();						// Reset the tax calculations.
	Taxpayer.resetCalculation();			// Re-read the input fields.
	hm.removeOutputForms();					// Remove tax return (output) web pages
	HTML.hideElement("output-taxforms-container");
}

document.addEventListener("DOMContentLoaded", () => {
	//
	// Wait for the DOM to be fully loaded before trying to access any elements.
	//
	HTML.addListener(TAXTOOL_CONTAINER,			"change", changeHandler);
	HTML.addListener("street-address",			"change", changeAddressHandler);
	HTML.addListener("city",					"change", changeAddressHandler);
	HTML.addListener("zip-code",				"change", changeAddressHandler);
	HTML.addListener("add-assetsale-button",	"click",  addAssetSaleHandler);
	HTML.addListener("add-dependent-button",	"click",  addDependentHandler);
	HTML.addListener("add-form-button",			"click",  addInputFormHandler);
	HTML.addListener("calculate-button",		"click",  calculateHandler);

	initialize();
});
