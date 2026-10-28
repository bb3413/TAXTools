
import { Dates }		from "../Library/Modules/Dates.js";
import { Debug }		from "../Library/Modules/Debug.js";
import { Ensure }		from "../Library/Modules/Ensure.js";
import { HTML }			from "../Library/Modules/HTML.js";
import { TaxTable }		from "../Library/Modules/TaxTable.js";

import { ERROR_MESSAGE_OUTPUT }	from "../Library/TAXTools/TAXTools.js";

let input_color			= "";
let output_color		= "";

function calculateRMD(inputs) {
	const tt		= TaxTable.getTaxTable(inputs.tax_year);
	const outputs	= {};

	if (inputs.taxpayers_birthday !== "") {
		outputs.taxpayers_age =
			Dates.getEndOfYearAge(inputs.taxpayers_birthday, inputs.tax_year);
		HTML.changeBackgroundColor("TaxpayersAge", output_color);
	} else {
		outputs.taxpayers_age = inputs.taxpayers_age;
		HTML.changeBackgroundColor("TaxpayersAge", input_color);
	}

	if (outputs.taxpayers_age < 73) {
		outputs.rmd = 0;
	} else {
		outputs.rmd = Math.round(inputs.ira_total / tt.getRMDPeriod(outputs.taxpayers_age));
	}

	return outputs;
}

function changeAge(event) {
	const age = HTML.getUserInput("TaxpayersAge");
	if (age !== 0)
		HTML.putUserOutput("TaxpayersBirthday", "");

	changeHandler(event);
}

function changeHandler(event) {
	//
	// This function is called when any input field is changed.
	//
	try {
		resetAll();
		const inputs	= getInputs();						// Get inputs from the web page
		const outputs	= calculateRMD(inputs);
		putOutputs(outputs);								// Put results on web page
		Debug.turnOn();										// Put debug info on web page
	} catch (error) {
		Ensure.processError(error);
	}
}

function getInputs() {
	//
	// Get the values from the web page. Put them in an object literal so the values
	// can be accessed by name.
	//
	const inputs = {};

	// Input fields
	inputs.tax_year					= HTML.getUserInput("tax-year");
	inputs.ira_total				= HTML.getUserInput("IRATotal");
	inputs.taxpayers_birthday		= HTML.getUserInput("TaxpayersBirthday", "text");
	inputs.taxpayers_age			= HTML.getUserInput("TaxpayersAge");

	return inputs;
}

function putOutputs(outputs) {
	HTML.putUserOutput("TaxpayersAge",	outputs.taxpayers_age);
	HTML.putUserOutput("RMD",			outputs.rmd);
}

function resetAll() {
	//
	// Reset static (global) variables to erase information from a previous calculation.
	//
	HTML.putElementValue(ERROR_MESSAGE_OUTPUT, "");
	Debug.reset();
}

document.addEventListener("DOMContentLoaded", () => {
	//
	// Wait for the DOM to be fully loaded before trying to access any elements.
	//
	HTML.addListener("tax-year",			"change", changeHandler);
	HTML.addListener("IRATotal",			"change", changeHandler);
	HTML.addListener("TaxpayersBirthday",	"change", changeHandler);
	HTML.addListener("TaxpayersAge",		"change", changeAge);

	output_color	= HTML.getCSSGlobalVariable("--output-color");
	input_color		= HTML.getCSSGlobalVariable("--input-color");

	HTML.putUserOutput("tax-year", Dates.getTaxYear(), "text");		// Default tax year.
	HTML.hideElement("debug-container");
});
