
import { Dates }		from "../Library/Modules/Dates.js";
import { Debug }		from "../Library/Modules/Debug.js";
import { HTML }			from "../Library/Modules/HTML.js";
import { TaxFormObj }	from "../Library/Modules/TaxFormObj.js";
import { Taxpayer }		from "../Library/Classes/Taxpayer.js";
import { TaxTable }		from "../Library/Modules/TaxTable.js";

let input_color				= "";
let output_color			= "";

function calculateTax(inputs) {
	const outputs = {};

	const ss_tax = TaxFormObj.createForm("SSTax");
	outputs.taxable_ss = ss_tax.calculate(
		inputs.filing_status,
		inputs.social_security,			// Total SS received from 1040, line 6a
		inputs.income,					// Income without taxable SS
		inputs.tax_exempt_interest,		// Tax exempt interest from 1040, line 2a
		0,								// Student loan interest from 1040S1, line 21
		inputs.adjustments,				// Adjustments from 1040
		inputs.lived_with_spouse);		// Lived with spouse

	return outputs;
}

function changeIncomeHandler(event) {
	HTML.putUserOutput("Wages",					0);
	HTML.putUserOutput("TaxableInterest",		0);
	HTML.putUserOutput("OrdinaryDividends",		0);
	HTML.putUserOutput("RetirementAccounts",	0);
	HTML.putUserOutput("PensionsAndAnnuities",	0);
	HTML.putUserOutput("CapitalGains",			0);
	HTML.putUserOutput("SelfEmploymentIncome",	0);
	HTML.putUserOutput("OtherIncome",			0);

	HTML.changeBackgroundColor("Income", input_color);

	changeHandler(event);
}

function changeIncomeComponentHandler(event) {
	const wages						= HTML.getUserInput("Wages");
	const taxable_interest			= HTML.getUserInput("TaxableInterest");
	const ordinary_dividends		= HTML.getUserInput("OrdinaryDividends");
	const retirement_accounts		= HTML.getUserInput("RetirementAccounts");
	const pensions_and_annuities	= HTML.getUserInput("PensionsAndAnnuities");
	const capital_gains				= HTML.getUserInput("CapitalGains");
	const self_employment_income	= HTML.getUserInput("SelfEmploymentIncome");
	const other_income				= HTML.getUserInput("OtherIncome");

	const total_income				= wages +
										taxable_interest +
										ordinary_dividends +
										retirement_accounts +
										pensions_and_annuities +
										capital_gains +
										self_employment_income +
										other_income;

	HTML.putUserOutput("Income", total_income);
	HTML.changeBackgroundColor("Income", output_color);

	changeHandler(event);
}

function changeAdjustmentsHandler(event) {
	HTML.putUserOutput("EducatorExpenses",				0);
	HTML.putUserOutput("HealthSavingsAccount",			0);
	HTML.putUserOutput("SelfEmploymentTaxAdjustment",	0);
	HTML.putUserOutput("SelfEmployedHealthInsurance",	0);
	HTML.putUserOutput("EarlyWithdrawalPenalty",		0);
	HTML.putUserOutput("AlimonyPaid",					0);
	HTML.putUserOutput("IRAContributions",				0);
	HTML.putUserOutput("StudentLoanInterest",			0);
	HTML.putUserOutput("OtherAdjustments",				0);

	HTML.changeBackgroundColor("Adjustments", input_color);

	changeHandler(event);
}

function changeAdjustmentComponentHandler(event) {
	const educator_expenses				= HTML.getUserInput("EducatorExpenses");
	const health_savings_account		= HTML.getUserInput("HealthSavingsAccount");
	const self_employment_tax_adjustment= HTML.getUserInput("SelfEmploymentTaxAdjustment");
	const self_employed_health_insurance= HTML.getUserInput("SelfEmployedHealthInsurance");
	const early_withdrawal_penalty		= HTML.getUserInput("EarlyWithdrawalPenalty");
	const alimony_paid					= HTML.getUserInput("AlimonyPaid");
	const ira_contributions				= HTML.getUserInput("IRAContributions");
	const student_loan_interest			= HTML.getUserInput("StudentLoanInterest");
	const other_adjustments				= HTML.getUserInput("OtherAdjustments");

	const total_adjustments				= educator_expenses +
											health_savings_account +
											self_employment_tax_adjustment +
											self_employed_health_insurance +
											early_withdrawal_penalty +
											alimony_paid +
											ira_contributions +
											// student_loan_interest +
											other_adjustments;

	HTML.putUserOutput("Adjustments", total_adjustments);
	HTML.changeBackgroundColor("Adjustments", output_color);

	changeHandler(event);
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

		const inputs	= getInputs();					// Get inputs from the web page
		TaxTable.getTaxTable(inputs.tax_year);			// Initialize tax tables
		createTaxpayer(inputs);							// Initialize taxpayer
		const outputs	= calculateTax(inputs);
		putOutputs(inputs, outputs);					// Put results on web page
		Debug.turnOn();									// Put debug info on web page
	} catch (error) {
		HTML.putElementValue("error-message-output", error);
		console.log("Stack trace:", error.stack);
		document.getElementById("error-message-output")
			.scrollIntoView({behavior: 'smooth', block: 'start'});
	}
}

function createTaxpayer(inputs) {
	const taxpayer				= new Taxpayer();
	taxpayer.lived_with_spouse	= inputs.lived_with_spouse
	return taxpayer;
}

function getInputs() {
	//
	// Get the values from the web page. Put them in an object literal so the values
	// can be accessed by name.
	//
	const inputs = {};

	inputs.tax_year					= Dates.getTaxYear();

	inputs.filing_status			= HTML.getUserInput("FilingStatus","text").toUpperCase();
	inputs.lived_with_spouse		= HTML.getUserInput("LivedWithSpouse");
	inputs.social_security			= HTML.getUserInput("SocialSecurity");
	inputs.income					= HTML.getUserInput("Income");
	inputs.tax_exempt_interest		= HTML.getUserInput("TaxExemptInterest");
	inputs.adjustments				= HTML.getUserInput("Adjustments");

	return inputs;
}

function putOutputs(inputs, outputs) {
	//
	// Get the information we are interested in and write them to the web page.
	//
	const tp = Taxpayer.getTaxpayer();
	let taxable_percent = 0;

	if (tp.filing_status === "MFS") {
		HTML.showElement("LivedWithSpouseContainer");
	} else {
		HTML.hideElement("LivedWithSpouseContainer");
	}

	taxable_percent =
		(inputs.social_security === 0) ?
			0 : Math.round(outputs.taxable_ss / inputs.social_security * 100);
	HTML.putUserOutput("TaxableSocialSecurity",	outputs.taxable_ss);
	HTML.putUserOutput("TaxablePercent",		taxable_percent + "%", "text");
}

document.addEventListener("DOMContentLoaded", () => {
	//
	// Wait for the DOM to be fully loaded before trying to access any elements.
	//
	HTML.addListener("FilingStatus",				"change", changeHandler);
	HTML.addListener("LivedWithSpouse",				"change", changeHandler);
	HTML.addListener("SocialSecurity",				"change", changeHandler);
	HTML.addListener("Income",						"change", changeIncomeHandler);
	HTML.addListener("TaxExemptInterest",			"change", changeHandler);
	HTML.addListener("Adjustments",					"change", changeAdjustmentsHandler);

	// Income
	HTML.addListener("Wages",						"change", changeIncomeComponentHandler);
	HTML.addListener("TaxableInterest",				"change", changeIncomeComponentHandler);
	HTML.addListener("OrdinaryDividends",			"change", changeIncomeComponentHandler);
	HTML.addListener("RetirementAccounts",			"change", changeIncomeComponentHandler);
	HTML.addListener("PensionsAndAnnuities",		"change", changeIncomeComponentHandler);
	HTML.addListener("CapitalGains",				"change", changeIncomeComponentHandler);
	HTML.addListener("SelfEmploymentIncome",		"change", changeIncomeComponentHandler);
	HTML.addListener("OtherIncome",					"change", changeIncomeComponentHandler);

	// Adjustments
	HTML.addListener("EducatorExpenses",
					 "change", changeAdjustmentComponentHandler);
	HTML.addListener("HealthSavingsAccount",
					 "change", changeAdjustmentComponentHandler);
	HTML.addListener("SelfEmploymentTaxAdjustment",
					 "change", changeAdjustmentComponentHandler);
	HTML.addListener("SelfEmployedHealthInsurance",
					 "change", changeAdjustmentComponentHandler);
	HTML.addListener("EarlyWithdrawalPenalty",
					 "change", changeAdjustmentComponentHandler);
	HTML.addListener("AlimonyPaid",
					 "change", changeAdjustmentComponentHandler);
	HTML.addListener("IRAContributions",
					 "change", changeAdjustmentComponentHandler);
	HTML.addListener("StudentLoanInterest",
					 "change", changeAdjustmentComponentHandler);
	HTML.addListener("OtherAdjustments",
					 "change", changeAdjustmentComponentHandler);

	output_color	= HTML.getCSSGlobalVariable("--output-color");
	input_color		= HTML.getCSSGlobalVariable("--input-color");

	HTML.hideElement("LivedWithSpouseContainer");
	HTML.hideElement("debug-container");
});
