
import { Dates }		from "../Library/Modules/Dates.js";
import { Debug }		from "../Library/Modules/Debug.js";
import { HTML }			from "../Library/Modules/HTML.js";
import { TaxFormObj }	from "../Library/Modules/TaxFormObj.js";
import { Taxpayer }		from "../Library/Classes/Taxpayer.js";
import { TaxTable }		from "../Library/Modules/TaxTable.js";

function calculateTax(inputs) {
	const outputs = {};

	const ss_tax_0		= TaxFormObj.createForm("SSTax");
	const ss_tax_alt	= TaxFormObj.createForm("SSTax");
	const ss_tax_1		= TaxFormObj.createForm("SSTax");
	const ss_tax_2		= TaxFormObj.createForm("SSTax")

	if (inputs.ss_received_0 < inputs.lump_sum_1 + inputs.lump_sum_2) {
		throw new Error(
			"Sum of lump sum payments cannot be greater that the total benefits received.");
	}

	// Current year - Standard Method
	outputs.ss_taxable_0 = ss_tax_0.calculate(
		inputs.filing_status_0,
		inputs.ss_received_0,			// Total SS received from 1040, line 6a
		inputs.ss_income_0,				// Income without taxable SS
		inputs.tax_exempt_interest_0,	// Tax exempt interest from 1040, line 2a
		0,								// Student loan interest from 1040S1, line 21
		inputs.adjustments_0,			// Adjustments from 1040
		false);							// Lived with spouse

	// Current year - Alternate Method
	let ss_received_alt = inputs.ss_received_0 - inputs.lump_sum_1 - inputs.lump_sum_2;
	if (ss_received_alt !== 0) {
		outputs.ss_taxable_alt = ss_tax_alt.calculate(
			inputs.filing_status_0,
			ss_received_alt,
			inputs.ss_income_0,				// Income without taxable SS
			inputs.tax_exempt_interest_0,	// Tax exempt interest from 1040, line 2a
			0,								// Student loan interest from 1040S1, line 21
			inputs.adjustments_0,			// Adjustments from 1040
			false);							// Lived with spouse
	}

	// Previous Year 1
	if (inputs.lump_sum_1 !== 0) {
		outputs.ss_taxable_new_1 = ss_tax_1.calculate(
			inputs.filing_status_1,
			inputs.ss_received_reported_1 + inputs.lump_sum_1,	// Total SS received
			inputs.agi_1 - inputs.ss_taxable_reported_1,		// Income without taxable SS
			inputs.tax_exempt_interest_1,						// Tax exempt interest
			0,													// Student loan interest
			0,													// Adjustments
			false);												// Lived with spouse

		outputs.ss_taxable_new_1	-= inputs.ss_taxable_reported_1;
		outputs.ss_taxable_alt		+= outputs.ss_taxable_new_1;
	}

	// Previous Year 2
	if (inputs.lump_sum_2 !== 0) {
		outputs.ss_taxable_new_2 = ss_tax_2.calculate(
			inputs.filing_status_2,
			inputs.ss_received_reported_2 + inputs.lump_sum_2,	// Total SS received
			inputs.agi_2 - inputs.ss_taxable_reported_2,		// Income without taxable SS
			inputs.tax_exempt_interest_2,						// Tax exempt interest
			0,													// Student loan interest
			0,													// Adjustments
			false);												// Lived with spouse

		outputs.ss_taxable_new_2	-= inputs.ss_taxable_reported_2;
		outputs.ss_taxable_alt		+= outputs.ss_taxable_new_2;
	}

	return outputs;
}

function changeHandler(event) {
	//
	// This function is called when any input field is changed. It calculates the
	// whole deduction (not just the field tha was changed).
	//
	try {
		// Reset static (global) variables to erase information from a previous calculation.
		HTML.putElementValue("error-message-output", "");
		Debug.reset();
		TaxFormObj.reset();
		Taxpayer.reset();

		const inputs = getInputs();							// Get inputs from the web page
		TaxTable.getTaxTable(inputs.tax_year);				// Initialize tax tables
		const outputs = calculateTax(inputs);
		putOutputs(inputs, outputs);						// Put results on web page
		Debug.turnOn();										// Put debug info on web page
	} catch (error) {
		HTML.putElementValue("error-message-output", error);
		console.log("Stack trace:", error.stack);
		document.getElementById("error-message-output")
			.scrollIntoView({behavior: 'smooth', block: 'start'});
	}
}

function getInputs() {
	//
	// Get the values from the web page. Put them in an object literal so the values
	// can be accessed by name.
	//
	const inputs = {};

	inputs.tax_year					= Dates.getTaxYear();

	// Current year
	inputs.filing_status_0 =
		HTML.getUserInput("FilingStatus-0", "text").toUpperCase();
	inputs.ss_received_0			= HTML.getUserInput("SocialSecurity-0");
	inputs.ss_income_0				= HTML.getUserInput("Income-0");
	inputs.tax_exempt_interest_0	= HTML.getUserInput("TaxExemptInterest-0");
	inputs.adjustments_0			= HTML.getUserInput("Adjustments-0");

	// Previous year 1
	inputs.filing_status_1 =
		HTML.getUserInput("FilingStatus-1", "text").toUpperCase();
	inputs.lump_sum_1				= HTML.getUserInput("LumpSum-1");
	inputs.agi_1					= HTML.getUserInput("AGI-1");
	inputs.tax_exempt_interest_1	= HTML.getUserInput("TaxExemptInterest-1");
	inputs.ss_received_reported_1	= HTML.getUserInput("SocialSecurityReceivedReported-1");
	inputs.ss_taxable_reported_1	= HTML.getUserInput("SocialSecurityTaxableReported-1");

	// Previous year 2
	inputs.filing_status_2 =
		HTML.getUserInput("FilingStatus-2", "text").toUpperCase();
	inputs.lump_sum_2				= HTML.getUserInput("LumpSum-2");
	inputs.agi_2					= HTML.getUserInput("AGI-2");
	inputs.tax_exempt_interest_2	= HTML.getUserInput("TaxExemptInterest-2");
	inputs.ss_received_reported_2	= HTML.getUserInput("SocialSecurityReceivedReported-2");
	inputs.ss_taxable_reported_2	= HTML.getUserInput("SocialSecurityTaxableReported-2");

	return inputs;
}

function putOutputs(inputs, outputs) {
	//
	// Get the information we are interested in and write them to the web page.
	//
	let taxable_percent = 0;

	// Current year - Standard Method
	taxable_percent =
		Math.round(outputs.ss_taxable_0 / inputs.ss_received_0 * 100);
	HTML.putUserOutput("TaxableSocialSecurity-0",		outputs.ss_taxable_0);
	HTML.putUserOutput("TaxablePercent-0",				taxable_percent + "%", "text");

	// Previous Year 1
	taxable_percent	=
		(inputs.lump_sum_1 === 0) ?
			0 : Math.round(outputs.ss_taxable_new_1 / inputs.lump_sum_1 * 100);
	HTML.putUserOutput("TaxableSocialSecurityNew-1",	outputs.ss_taxable_new_1);
	HTML.putUserOutput("TaxablePercent-1",				taxable_percent + "%", "text");

	// Previous Year 2
	taxable_percent	=
		(inputs.lump_sum_2 === 0) ?
			0 : Math.round(outputs.ss_taxable_new_2 / inputs.lump_sum_2 * 100);
	HTML.putUserOutput("TaxableSocialSecurityNew-2",	outputs.ss_taxable_new_2);
	HTML.putUserOutput("TaxablePercent-2",				taxable_percent + "%", "text");

	// Alternate taxable amount
	taxable_percent = Math.round(outputs.ss_taxable_alt / inputs.ss_received_0 * 100);
	HTML.putUserOutput("TaxableSocialSecurityAlt",		outputs.ss_taxable_alt);
	HTML.putUserOutput("TaxablePercentAlt",				taxable_percent + "%", "text");
}

document.addEventListener("DOMContentLoaded", () => {
	//
	// Wait for the DOM to be fully loaded before trying to access any elements.
	//
	HTML.addListener("FilingStatus-0",					"change", changeHandler);
	HTML.addListener("SocialSecurity-0",				"change", changeHandler);
	HTML.addListener("Income-0",						"change", changeHandler);
	HTML.addListener("TaxExemptInterest-0",				"change", changeHandler);
	HTML.addListener("Adjustments-0",					"change", changeHandler);

	HTML.addListener("FilingStatus-1",					"change", changeHandler);
	HTML.addListener("LumpSum-1",						"change", changeHandler);
	HTML.addListener("AGI-1",							"change", changeHandler);
	HTML.addListener("TaxExemptInterest-1",				"change", changeHandler);
	HTML.addListener("SocialSecurityReceivedReported-2","change", changeHandler);
	HTML.addListener("SocialSecurityTaxableReported-2",	"change", changeHandler);

	HTML.addListener("FilingStatus-2",					"change", changeHandler);
	HTML.addListener("LumpSum-2",						"change", changeHandler);
	HTML.addListener("AGI-2",							"change", changeHandler);
	HTML.addListener("TaxExemptInterest-2",				"change", changeHandler);
	HTML.addListener("SocialSecurityReceivedReported-2","change", changeHandler);
	HTML.addListener("SocialSecurityTaxableReported-2",	"change", changeHandler);

	HTML.hideElement("debug-container");
});
