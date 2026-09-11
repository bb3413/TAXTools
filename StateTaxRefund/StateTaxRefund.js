
import { Dates }		from "../Library/Modules/Dates.js";
import { Debug }		from "../Library/Modules/Debug.js";
import { HTML }			from "../Library/Modules/HTML.js";
import { TaxFormObj }	from "../Library/Modules/TaxFormObj.js";
import { Taxpayer }		from "../Library/Classes/Taxpayer.js";
import { TaxTable }		from "../Library/Modules/TaxTable.js";

function calculateTaxableAmount(inputs) {

	const tp = Taxpayer.getTaxpayer();

	const outputs = {};

	if (inputs.state_tax_refund === 0) {
		outputs.taxable_amount		= 0;
		outputs.explanation			= "Tax refund is $0.";

	} else if (inputs.prev_state_income_tax === 0) {
		outputs.taxable_amount		= 0;
		outputs.explanation			= "State income tax is $0; state income tax was " +
										"not used as a deduction.";

	} else if (inputs.sales_tax_used) {
		outputs.taxable_amount		= 0;
		outputs.explanation			= "State income tax was not used as a deduction; " +
										"sales tax was used instead.";

	} else if (inputs.sales_tax >= inputs.state_income_tax) {
		outputs.taxable_amount		= 0;
		outputs.explanation			= "Sales tax is greater that state income tax; sales "+
										"tax could have used instead of state income tax " +
										"for the same or better result.";
	} else {
		outputs.taxable_amount	= TaxFormObj.getValue("Refund",	"taxable_amount");
		outputs.explanation		= TaxFormObj.getTextValue("Refund",	"explanation");
	}

	return outputs;
}

function changeHandler(event) {
	//
	// This function is called when any input field is changed. It calculates the
	// whole AMT (not just the field tha was changed).
	//
	try {
		// Reset static (global) variables to erase information from a previous calculation.
		HTML.putElementValue("error-message-output", "");
		Debug.reset();
		TaxFormObj.reset();
		Taxpayer.reset();

		const inputs	= getInputs();							// Get inputs from  web page
		TaxTable.getTaxTable(inputs.previous_tax_year);			// Initialize tax tables
		const taxpayer	= createTaxpayer(inputs);				// Initialize taxpayer
		mapInputValues(inputs);									// Map input values to forms
		const outputs = calculateTaxableAmount(inputs);
		putOutputs(outputs);									// Put results on web page
		Debug.turnOn();											// Put debug info on web page
	} catch (error) {
		HTML.putElementValue("error-message-output", error);
		console.log("Stack trace:", error.stack);
		document.getElementById("error-message-output")
			.scrollIntoView({behavior: 'smooth', block: 'start'});
	}
}

function createTaxpayer(inputs) {
	const taxpayer					= new Taxpayer();

	taxpayer.tax_year				= inputs.tax_year;
	taxpayer.filing_status			= inputs.filing_status;
	taxpayer.taxpayers_birthday		= inputs.taxpayers_birthday;
	taxpayer.spouses_birthday		= inputs.spouses_birthday;
	taxpayer.is_taxpayer_blind		= inputs.is_taxpayer_blind;
	taxpayer.is_spouse_blind		= inputs.is_spouse_blind;

	return taxpayer;
}

function getInputs() {
	//
	// Get the values from the web page. Put them in an object literal so the values
	// can be accessed by name.
	//
	const inputs = {};

	// Input fields
	inputs.previous_tax_year =
		HTML.getUserInput("PreviousTaxYear");
	inputs.filing_status =
		HTML.getUserInput("FilingStatus", "text").toUpperCase();
	inputs.taxpayers_birthday				= HTML.getUserInput("TaxpayersBirthday", "text");
	inputs.is_taxpayer_blind				= HTML.getUserInput("TaxpayerIsBlind");
	inputs.spouses_birthday					= HTML.getUserInput("SpousesBirthday", "text");
	inputs.is_spouse_blind					= HTML.getUserInput("SpouseIsBlind");
	inputs.state_tax_refund					= HTML.getUserInput("StateTaxRefund");

	// Information from last year
	inputs.prev_state_income_tax			= HTML.getUserInput("StateIncomeTax");
	inputs.prev_sales_tax					= HTML.getUserInput("SalesTax");
	inputs.prev_sales_tax_used				= HTML.getUserInput("SalesTaxUsed");
	inputs.prev_real_estate_taxes			= HTML.getUserInput("RealEstateTaxes");
	inputs.prev_personal_property_taxes 	= HTML.getUserInput("PersonalPropertyTaxes");
	inputs.prev_itemized_deductions			= HTML.getUserInput("ItemizedDeductions");

	return inputs;
}

function mapInputValues(inputs) {
	const tt		= TaxTable.getTaxTable();
	const max_salt	= tt.getTaxValue("MaxSALT");
	const line_5d	= inputs.prev_state_income_tax +
						inputs.prev_real_estate_taxes +
						inputs.pev_personal_property_taxes;
	const line_5e	= Math.min(line_5d, max_salt);
	const refund	= TaxFormObj.createForm("Refund");

	refund.lines["refund"].user_value				= inputs.state_tax_refund;
	refund.lines["sched_a_5d"].user_value			= line_5d;
	refund.lines["sched_a_5e"].user_value			= line_5e;
	refund.lines["itemized_deductions"].user_value	= inputs.prev_itemized_deductions;
}

function putOutputs(outputs) {
	const tp = Taxpayer.getTaxpayer();

	if (tp.filing_status === "MFJ") {
		HTML.showElement("SpouseContainer");
	} else {
		HTML.hideElement("SpouseContainer");
	}

	HTML.putUserOutput("TaxableAmount",	outputs.taxable_amount);
	HTML.putUserOutput("Explanation",	outputs.explanation,	"text");
}

document.addEventListener("DOMContentLoaded", () => {
	//
	// Wait for the DOM to be fully loaded before trying to access any elements.
	//
	HTML.addListener("PreviousTaxYear",			"change", changeHandler);
	HTML.addListener("FilingStatus",			"change", changeHandler);
	HTML.addListener("TaxpayersBirthday",		"change", changeHandler);
	HTML.addListener("SpousesBirthday",			"change", changeHandler);
	HTML.addListener("TaxpayerIsBlind",			"change", changeHandler);
	HTML.addListener("SpouseIsBlind",			"change", changeHandler);
	HTML.addListener("StateTaxRefund",			"change", changeHandler);

	// Information from last year
	HTML.addListener("StateIncomeTax",			"change", changeHandler);
	HTML.addListener("SalesTax",				"change", changeHandler);
	HTML.addListener("SalesTaxUsed",			"change", changeHandler);
	HTML.addListener("RealEstateTaxes",			"change", changeHandler);
	HTML.addListener("PersonalPropertyTaxes",	"change", changeHandler);
	HTML.addListener("ItemizedDeductions",		"change", changeHandler);

	HTML.putUserOutput("PreviousTaxYear", Dates.getTaxYear() - 1, "text");
	HTML.hideElement("SpouseContainer");
	HTML.hideElement("debug-container");
});
