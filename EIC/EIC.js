
import { Dates }		from "../Library/Modules/Dates.js";
import { Debug }		from "../Library/Modules/Debug.js";
import { Ensure }		from "../Library/Modules/Ensure.js";
import { HTML }			from "../Library/Modules/HTML.js";
import { Num }			from "../Library/Modules/Num.js";
import { TaxFormObj }	from "../Library/Modules/TaxFormObj.js";
import { TaxInfo }		from "../Library/Modules/TaxInfo.js";
import { Taxpayer }		from "../Library/Classes/Taxpayer.js";
import { TaxTable }		from "../Library/Modules/TaxTable.js";

import { TAXTOOL_CONTAINER }			from "../Library/TAXTools/TAXTools.js";
import { ERROR_MESSAGE_OUTPUT }			from "../Library/TAXTools/TAXTools.js";
import { strToFilingStatus }			from "../Library/TAXTools/TAXTools.js";

let input_color			= "";
let output_color		= "";

function changeHandler(event) {
	//
	// This function is called when any input field is changed. It calculates the EIC.
	//
	try {
		resetAll();
		const inputs = getInputs();				// Get inputs from the web page
		TaxTable.getTaxTable(inputs.tax_year);	// Initialize tax tables
		
		createTaxpayer();						// Initialize taxpayer
		mapInputValues(inputs);					// Map input values to tax forms
		putOutputs();							// Put results on web page
		Debug.turnOn();							// Put debug info on web page if enabled
	} catch (error) {
		Ensure.processError(error);
	}
}
function createTaxpayer() {
	const taxpayer = Taxpayer.getTaxpayer();

	taxpayer.taxpayers_age = 25;	// Must be older than dependents.
}

function getInputs() {
	//
	// Get the values from the web page. Put them in an object literal so the values
	// can be accessed by name.
	//
	const inputs = {};

	// Input fields
	inputs.tax_year			= HTML.getUserInput("tax-year");
	inputs.filing_status	= strToFilingStatus(HTML.getUserInput("filing-status", "text"));
	inputs.earned_income	= HTML.getUserInput("earned-income");
	inputs.num_dependents	= HTML.getUserInput("num-dependents");

	return inputs;
}

function mapInputValues(inputs) {
	const f1040 = TaxFormObj.createForm("F1040");
	f1040.lines["01a"].user_value = inputs.earned_income;

	const tp = Taxpayer.getTaxpayer();
	for (let i = 0; i < inputs.num_dependents; i++) {
		tp.addDependent({
			dependent_name:			`Dependent-${i}`,
			age:					5,
			relationship:			"CHILD",
			months_lived_at_home:	"12",
			gross_income:			"0",
			fulltime_student:		false,
			mfj:					false,
			dependent_supported:	false,
			taxpayer_supported:		true,
			disabled:				false,
			has_ssn:				true,
		});
	}
}

function putOutputs() {
	const tt = TaxTable.getTaxTable();

	HTML.putUserOutput("unearned-income", tt.getTaxValue("EIC_MaxUnearnedIncome"));
	HTML.putUserOutput("eic", TaxFormObj.getValue("F1040", "27a"));
}

function resetAll() {
	//
	// Reset static (global) variables to erase information from a previous calculation.
	//
	HTML.putElementValue(ERROR_MESSAGE_OUTPUT, "");
	Debug.reset();
	TaxFormObj.reset();
	Taxpayer.reset();
}

document.addEventListener("DOMContentLoaded", () => {
	//
	// Wait for the DOM to be fully loaded before trying to access any elements.
	// All the listeners for the data fields use the same handler so when any field
	// is changed the whole calculation is redone.
	//

	// Listen for changes to the input data.
	HTML.addListener(TAXTOOL_CONTAINER,	"change", changeHandler);
	HTML.hideElement("debug-container");
});
