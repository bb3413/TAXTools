
import { Dates }		from "../Library/Modules/Dates.js";
import { Debug }		from "../Library/Modules/Debug.js";
import { File }			from "../Library/Modules/File.js";
import { HTML }			from "../Library/Modules/HTML.js";
import { TaxFormObj }	from "../Library/Modules/TaxFormObj.js";
import { Taxpayer }		from "../Library/Classes/Taxpayer.js";
import { TaxTable }		from "../Library/Modules/TaxTable.js";

import { ESTIMATED_TAX_CA_SAVE_FILE } from "../Library/TAXTools/TAXTools.js";

// This variable needs to be global so it can be accessed by the save and restore handlers.
let inputs = {};

function changeHandler(event) {
	//
	// This function is called when any input field is changed. It calculates the
	// whole return (not just the field tha was changed).
	//
	try {
		// Reset static (global) variables to erase information from a previous calculation.
		HTML.putElementValue("error-message-output", "");
		Debug.reset();
		TaxFormObj.reset();
		Taxpayer.reset();


		TaxTable.getTaxTable(HTML.getUserInput("tax-year"));// Initialize tax tables.
		inputs = getInputs();								// Get inputs from the web page
		const taxpayer = createTaxpayer(inputs);			// Initialize taxpayer
		mapInputValues(inputs);								// Map input values to tax forms
		TaxFormObj.getForm("F540").calculate();				// Calculate the tax forms
		putOutputs(taxpayer);								// Put results on web page
		Debug.turnOn();										// Put debug info on web page
	} catch (error) {
		HTML.putElementValue("error-message-output", error);
		console.log("Stack trace:", error.stack);
		document.getElementById("error-message-output")
			.scrollIntoView({behavior: 'smooth', block: 'start'});
	}
}

function createTaxpayer(inputs) {
	const taxpayer					= new Taxpayer();

	taxpayer.taxpayers_name			= inputs.taxpayers_name;
	taxpayer.filing_status			= inputs.filing_status;
	taxpayer.taxpayers_birthday		= inputs.taxpayers_birthday;
	taxpayer.spouses_birthday		= inputs.spouses_birthday;
	taxpayer.number_of_dependents	= inputs.number_of_dependents;

	return taxpayer;
}

function getInputs() {
	//
	// Get the values from the web page. Put them in an object literal so the values
	// can be accessed by name. This program recalculates the entire tax return when
	// a values is changed, not just the value that was changed. This does not seem
	// to be a performance problem and it prevents needing to know what is dependent
	// on each value.
	//
	const inputs = {};

	// Taxpayer information
	inputs.taxpayers_name =
		HTML.getUserInput("TaxpayersName", "text");
	inputs.filing_status =
		HTML.getUserInput("FilingStatus", "text").toUpperCase();
	inputs.taxpayers_birthday =
		HTML.getUserInput("TaxpayersBirthday", "text");
	inputs.spouses_birthday =
		HTML.getUserInput("SpousesBirthday", "text");

	// Input Data
	inputs.federal_agi =
		HTML.getUserInput("FederalAGI");
	inputs.number_of_dependents =
		HTML.getUserInput("NumberOfDependents");

	// Subtractions
	inputs.us_treasury_obligations =
		HTML.getUserInput("USTreasuryObligations");
	inputs.military_retirement_income =
		HTML.getUserInput("MilitaryRetirementIncome");
	inputs.taxable_social_security =
		HTML.getUserInput("TaxableSocialSecurity");
	inputs.state_tax_refund =
		HTML.getUserInput("StateTaxRefund");
	inputs.unemployment_income =
		HTML.getUserInput("UnemploymentIncome");
	inputs.california_lottery_winnings =
		HTML.getUserInput("CaliforniaLotteryWinnings");
	inputs.nonqualified_hsa_distributions =
		HTML.getUserInput("NonqualifiedHSADistributions");
	inputs.alimony_paid	 =
		HTML.getUserInput("AlimonyPaid");
	inputs.other_subtractions =
		HTML.getUserInput("OtherSubtractions");

	// Additions
	inputs.hsa_employer_contributions =
		HTML.getUserInput("HSAEmployerContributions");
	inputs.alimony_received =
		HTML.getUserInput("AlimonyReceived");
	inputs.home_loan_debt_cancellation =
		HTML.getUserInput("HomeLoanDebtCancellation");
	inputs.employer_paid_student_loan_payments =
		HTML.getUserInput("EmployerPaidStudentLoanPayments");
	inputs.educator_expenses =
		HTML.getUserInput("EducatorExpenses");
	inputs.hsa_contributions =
		HTML.getUserInput("HSAContributions");
	inputs.ira_contributions =
		HTML.getUserInput("IRAContributions");
	inputs.other_additions =
		HTML.getUserInput("OtherAdditions");

	// Itemized Deductions
	inputs.federal_itemized_deductions =
		HTML.getUserInput("FederalItemizedDeductions");
	inputs.state_income_tax =
		HTML.getUserInput("StateIncomeTax");
	inputs.qualified_hsa_distributions =
		HTML.getUserInput("QualifiedHSADistributions");
	inputs.salt_limit_excess =
		HTML.getUserInput("SALTLimitExcess");
	inputs.home_mortgage_interest_limit =
		HTML.getUserInput("HomeMortgageInterestLimit");
	inputs.tax_preparation_fee =
		HTML.getUserInput("TaxPreparationFee");
	inputs.safe_deposit_box =
		HTML.getUserInput("SafeDepositBox");
	inputs.investment_fee =
		HTML.getUserInput("InvestmentFee");
	inputs.other_deductions =
		HTML.getUserInput("OtherDeductions");

	// Other Taxes, Interest, and Penalties

	inputs.shared_responsibility_penalty =
		HTML.getUserInput("SharedResponsibilityPenalty");
	inputs.interest_and_penalties =
		HTML.getUserInput("InterestAndPenalties");
	inputs.underpayment_of_estimated_tax =
		HTML.getUserInput("UnderpaymentOfEstimatedTax");
	inputs.use_tax =
		HTML.getUserInput("UseTax");
	inputs.miscellaneous_taxes =
		HTML.getUserInput("MiscellaneousTaxes");

	// Non-refundable Credits
	inputs.child_care_credit =
		HTML.getUserInput("ChildCareCredit");
	inputs.renters_credit =
		HTML.getUserInput("RentersCredit");
	inputs.other_nonrefundable_credits =
		HTML.getUserInput("OtherNonrefundableCredits");

	// Refundable Credits
	inputs.eitc =
		HTML.getUserInput("EITC");
	inputs.young_child_tax_credit =
		HTML.getUserInput("YoungChildTaxCredit");
	inputs.foster_youth_tax_credit =
		HTML.getUserInput("FosterYouthTaxCredit");
	inputs.other_refundable_credits =
		HTML.getUserInput("OtherRefundableCredits");

	// Payments
	inputs.withholding =
		HTML.getUserInput("Withholding");
	inputs.estimated_payments =
		HTML.getUserInput("EstimatedPayments");
	inputs.other_payments =
		HTML.getUserInput("OtherPayments");

	// Contributions
	inputs.contributions =
		HTML.getUserInput("Contributions");

	return inputs;
}

function mapInputValues(inputs) {
	const tt		= TaxTable.getTaxTable();
	const tp		= Taxpayer.getTaxpayer();
	const f540		= TaxFormObj.createForm("F540");
	const f540CA	= TaxFormObj.createForm("F540CA");

	f540.lines["013"].user_value	= inputs.federal_agi;

	// Subtractions
	f540CA.lines["A-02bB"].user_value	= inputs.us_treasury_obligations;
	f540CA.lines["A-05bB"].user_value	= inputs.military_retirement_income;
	f540CA.lines["A-06bB"].user_value	= inputs.taxable_social_security;
	f540CA.lines["B-01B" ].user_value	= inputs.state_tax_refund;
	f540CA.lines["B-07B" ].user_value	= inputs.unemployment_income;
	f540CA.lines["B-08bB"].user_value	= inputs.california_lottery_winnings;
	f540CA.lines["B-08fB"].user_value	= inputs.nonqualified_hsa_distributions;
	f540CA.lines["C-19aB"].user_value	= inputs.alimony_paid;
	f540CA.lines["C-24zB"].user_value	= inputs.other_subtractions;

	// Additions
	f540CA.lines["A-01hC"].user_value	= inputs.hsa_employer_contributions;
	f540CA.lines["B-02aC"].user_value	= inputs.alimony_received;
	f540CA.lines["B-08cC"].user_value	= inputs.home_loan_debt_cancellation +
											inputs.employer_paid_student_loan_payments;
	f540CA.lines["C-11C" ].user_value	= inputs.educator_expenses;
	f540CA.lines["C-13C" ].user_value	= inputs.hsa_contributions;
	f540CA.lines["C-20C" ].user_value	= inputs.ira_contributions;
	f540CA.lines["C-24zC"].user_value	= inputs.other_additions;

	// Itemized Deductions
	f540CA.lines["D-17A" ].user_value	= inputs.federal_itemized_deductions;
	f540CA.lines["D-05aB"].user_value	= inputs.state_income_tax;
	f540CA.lines["D-04C" ].user_value	= inputs.qualified_hsa_distributions;
	f540CA.lines["D-05aC"].user_value	= inputs.salt_limit_excess;
	f540CA.lines["D-05aC"].user_value	= inputs.home_mortgage_interest_limit;
	f540CA.lines["D-20"  ].user_value	= inputs.tax_preparation_fee;
	f540CA.lines["D-21"  ].user_value	= inputs.safe_deposit_box + inputs.investment_fee;
	f540CA.lines["D-16C" ].user_value	= inputs.other_deductions;

	// Other Taxes, Interest, and Penalties
	f540.lines[	"092"].user_value	= inputs.shared_responsibility_penalty;
	f540.lines[	"112"].user_value	= inputs.interest_and_penalties;
	f540.lines[	"113"].user_value	= inputs.underpayment_of_estimated_tax;
	f540.lines[	"091"].user_value	= inputs.use_tax;
	f540.lines[	"063"].user_value	= inputs.miscellaneous_taxes;

	// Non-refundable Credits
	f540.lines[	"040"].user_value	= inputs.child_care_credit;
	f540.lines[	"046"].user_value	= inputs.renters_credit;
	f540.lines[	"045"].user_value	= inputs.other_nonrefundable_credits;

	// Refundable Credits
	f540.lines[	"075"].user_value	= inputs.eitc;
	f540.lines[	"076"].user_value	= inputs.young_child_tax_credit;
	f540.lines[	"077"].user_value	= inputs.foster_youth_tax_credit;
	f540.lines[	"078"].user_value	= inputs.other_refundable_credits;

	// Payments
	f540.lines[	"071"].user_value	= inputs.withholding;
	f540.lines[	"072"].user_value	= inputs.estimated_payments;
	f540.lines[	"078"].user_value	= inputs.other_payments;

	// Contributions
	f540.lines[	"110"].user_value	= inputs.contributions;
}

function putOutputs(taxpayer) {
	//
	// Get the information we are interested in and write them to the web page.
	//
	const todays_date			= new Date().toLocaleDateString();
	const payments_and_credits	= TaxFormObj.getValue("F540", "078");
	const estimated_payments	= TaxFormObj.getValue("F540", "072");
	const refund				= TaxFormObj.getValue("F540", "097");
	let amount_due				= TaxFormObj.getValue("F540", "100");

	amount_due =
		(amount_due !== 0) ? -amount_due : refund;
	const estimated_tax_due =
		Math.max(0, payments_and_credits - estimated_payments - amount_due);

	HTML.putUserOutput("TodaysDate",			todays_date, "text");
	HTML.putUserOutput("TaxpayersAge",			taxpayer.taxpayers_age);
	HTML.putUserOutput("SpousesAge",			taxpayer.spouses_age);

	// Estimated Tax
	HTML.putUserOutput("Exemptions",			TaxFormObj.getValue("F540", "011"));
	HTML.putUserOutput("Subtractions",			TaxFormObj.getValue("F540", "014"));
	HTML.putUserOutput("Additions",				TaxFormObj.getValue("F540", "016"));
	HTML.putUserOutput("Deductions",			TaxFormObj.getValue("F540", "018"));
	HTML.putUserOutput("NonrefundableCredits",	TaxFormObj.getValue("F540", "047"));
	HTML.putUserOutput("RefundableCredits",
					   TaxFormObj.getValue("F540", "074", "075", "076", "077"));
	HTML.putUserOutput("OtherTaxes",
					   TaxFormObj.getValue("F540", "061","062","063"));
	HTML.putUserOutput("Payments",				TaxFormObj.getValue("F540", "078"));
	HTML.putUserOutput("StateAGI",				TaxFormObj.getValue("F540", "017"));
	HTML.putUserOutput("TaxableIncome",			TaxFormObj.getValue("F540", "019"));
	HTML.putUserOutput("IncomeTax",				TaxFormObj.getValue("F540", "031"));
	HTML.putUserOutput("TotalTax",				TaxFormObj.getValue("F540", "035"));
	HTML.putUserOutput("RefundAmountDue",		amount_due);
	HTML.putUserOutput("AprilPayment",			Math.round(estimated_tax_due * 0.30));
	HTML.putUserOutput("JunePayment",			Math.round(estimated_tax_due * 0.40));
	HTML.putUserOutput("SeptemberPayment",		0);
	HTML.putUserOutput("JanuaryPayment",		Math.round(estimated_tax_due * 0.30));
}

function restoreDataHandler(data) {
	//
	// This function is called when the user restores the input fields from a file.
	// The data that was copied from the file is passed a parameter.
	//
	let inputs;

	// There are currently 2 formats in use; select which one this is.
	if (data.input_data) {
		HTML.putElementValue("tax-year", data.tax_year);
		inputs = data.input_data;
	} else {
		inputs = data;
	}

	// Taxpayer information
	HTML.putElementValue("TaxpayersName",
						 inputs.taxpayers_name);
	HTML.putElementValue("FilingStatus",
						 inputs.filing_status);
	HTML.putElementValue("TaxpayersBirthday",
						 inputs.taxpayers_birthday);
	HTML.putElementValue("SpousesBirthday",
						 inputs.spouses_birthday);

	// Input Data
	HTML.putElementValue("FederalAGI",
						 inputs.federal_agi);
	HTML.putElementValue("NumberOfDependents",
						 inputs.number_of_dependents);

	// Subtractions
	HTML.putElementValue("USTreasuryObligations",
						 inputs.us_treasury_obligations);
	HTML.putElementValue("MilitaryRetirementIncome",
						 inputs.military_retirement_income);
	HTML.putElementValue("TaxableSocialSecurity",
						 inputs.taxable_social_security);
	HTML.putElementValue("StateTaxRefund",
						 inputs.state_tax_refund	);
	HTML.putElementValue("UnemploymentIncome",
						 inputs.unemployment_income);
	HTML.putElementValue("CaliforniaLotteryWinnings",
						 inputs.california_lottery_winnings);
	HTML.putElementValue("NonqualifiedHSADistributions",
						 inputs.nonqualified_hsa_distributions);
	HTML.putElementValue("AlimonyPaid",
						 inputs.alimony_paid);
	HTML.putElementValue("OtherSubtractions",
						 inputs.other_subtractions);

	// Additions
	HTML.putElementValue("HSAEmployerContributions",
						 inputs.hsa_employer_contributions);
	HTML.putElementValue("AlimonyReceived",
						 inputs.alimony_received);
	HTML.putElementValue("HomeLoanDebtCancellation",
						 inputs.home_loan_debt_cancellation);
	HTML.putElementValue("EmployerPaidStudentLoanPayments",
						 inputs.employer_paid_student_loan_payments);
	HTML.putElementValue("EducatorExpenses",
						 inputs.educator_expenses);
	HTML.putElementValue("HSAContributions",
						 inputs.hsa_contributions);
	HTML.putElementValue("IRAContributions",
						 inputs.ira_contributions);
	HTML.putElementValue("OtherAdditions",
						 inputs.other_additions);

	// Itemized Deductions
	HTML.putElementValue("FederalItemizedDeductions",
						 inputs.federal_itemized_deductions);
	HTML.putElementValue("StateIncomeTax",
						 inputs.state_income_tax);
	HTML.putElementValue("QualifiedHSADistributions",
						 inputs.qualified_hsa_distributions);
	HTML.putElementValue("SALTLimitExcess",
						 inputs.salt_limit_excess);
	HTML.putElementValue("HomeMortgageInterestLimit",
						 inputs.home_mortgage_interest_limit);
	HTML.putElementValue("TaxPreparationFee",
						 inputs.tax_preparation_fee);
	HTML.putElementValue("SafeDepositBox",
						 inputs.safe_deposit_box);
	HTML.putElementValue("InvestmentFee",
						 inputs.investment_fee);
	HTML.putElementValue("OtherDeductions",
						 inputs.other_deductions);

	// Other Taxes, Interest, and Penalties

	HTML.putElementValue("SharedResponsibilityPenalty",
						 inputs.shared_responsibility_penalty);
	HTML.putElementValue("InterestAndPenalties",
						 inputs.interest_and_penalties);
	HTML.putElementValue("UnderpaymentOfEstimatedTax",
						 inputs.underpayment_of_estimated_tax);
	HTML.putElementValue("UseTax",
						 inputs.use_tax);
	HTML.putElementValue("MiscellaneousTaxes",
						 inputs.miscellaneous_taxes);

	// Non-refundable Credits
	HTML.putElementValue("ChildCareCredit",
						 inputs.child_care_credit);
	HTML.putElementValue("RentersCredit",
						 inputs.renters_credit);
	HTML.putElementValue("OtherNonrefundableCredits",
						 inputs.other_nonrefundable_credits);

	// Refundable Credits
	HTML.putElementValue("EITC",
						 inputs.eitc);
	HTML.putElementValue("YoungChildTaxCredit",
						 inputs.young_child_tax_credit);
	HTML.putElementValue("FosterYouthTaxCredit",
						 inputs.foster_youth_tax_credit);
	HTML.putElementValue("FosterYouthTaxCredit",
						 inputs.other_refundable_credits);

	// Payments
	HTML.putElementValue("Withholding",
						 inputs.withholding);
	HTML.putElementValue("EstimatedPayments",
						 inputs.estimated_payments);
	HTML.putElementValue("OtherPayments",
						 inputs.other_payments);

	// Contributions
	HTML.putElementValue("Contributions",
						 inputs.contributions);

	changeHandler();
}

function restoreUserData(event) {
	//
	// The file selection dialog gets a list of files, but only one should be passed
	// in our case; select the first file and ignore the rest.
	//
	const filename = event.target.files[0];
	if (!filename) {
		throw new Error("No file selected.");
		return;
	}

	File.restoreFromFile(filename, restoreDataHandler);
}

function saveUserData(event) {
	//
	// This function is called when the user wants to save the input fields to a file.
	//
	const FILENAME = "EstimatedTax_CA.txt";

	const data = {
		version:		HTML.getUserInput("tax-tools-version", "text"),
		todays_date:	new Date().toLocaleDateString(),
		tax_year:		HTML.getUserInput("tax-year", "text"),
		input_data:		inputs,
	};

	File.saveToFile(data, ESTIMATED_TAX_CA_SAVE_FILE);
}


document.addEventListener("DOMContentLoaded", () => {
	//
	// Wait for the DOM to be fully loaded before trying to access any elements.
	// All the listeners for the data fields use the same handler so when any field
	// is changed the whole calculation is redone.
	//

	// Listen for changes to the input data.
	HTML.addListener("tax-year",						"change", changeHandler);
	HTML.addListener("SaveButton",						"click",  saveUserData);
	HTML.addListener("InputFile",						"change", restoreUserData);

	// Taxpayer Information
	HTML.addListener("TaxpayersName",					"change", changeHandler);
	HTML.addListener("FilingStatus",					"change", changeHandler);
	HTML.addListener("TaxpayersBirthday",				"change", changeHandler);
	HTML.addListener("SpousesBirthday",					"change", changeHandler);

	// Input Data
	HTML.addListener("FederalAGI",						"change", changeHandler);
	HTML.addListener("NumberOfDependents",				"change", changeHandler);

	// Subtractions
	HTML.addListener("USTreasuryObligations",			"change", changeHandler);
	HTML.addListener("MilitaryRetirementIncome",		"change", changeHandler);
	HTML.addListener("TaxableSocialSecurity",			"change", changeHandler);
	HTML.addListener("StateTaxRefund",					"change", changeHandler);
	HTML.addListener("UnemploymentIncome",				"change", changeHandler);
	HTML.addListener("CaliforniaLotteryWinnings",		"change", changeHandler);
	HTML.addListener("NonqualifiedHSADistributions",	"change", changeHandler);
	HTML.addListener("AlimonyPaid",						"change", changeHandler);
	HTML.addListener("OtherSubtractions",				"change", changeHandler);

	// Additions
	HTML.addListener("HSAEmployerContributions",		"change", changeHandler);
	HTML.addListener("AlimonyReceived",					"change", changeHandler);
	HTML.addListener("HomeLoanDebtCancellation",		"change", changeHandler);
	HTML.addListener("EmployerPaidStudentLoanPayments",	"change", changeHandler);
	HTML.addListener("EducatorExpenses",				"change", changeHandler);
	HTML.addListener("HSAContributions",				"change", changeHandler);
	HTML.addListener("IRAContributions",				"change", changeHandler);
	HTML.addListener("OtherAdditions",					"change", changeHandler);

	// Itemized Deductions
	HTML.addListener("FederalItemizedDeductions",		"change", changeHandler);
	HTML.addListener("StateIncomeTax",					"change", changeHandler);
	HTML.addListener("QualifiedHSADistributions",		"change", changeHandler);
	HTML.addListener("SALTLimitExcess",					"change", changeHandler);
	HTML.addListener("HomeMortgageInterestLimit",		"change", changeHandler);
	HTML.addListener("TaxPreparationFee",				"change", changeHandler);
	HTML.addListener("SafeDepositBox",					"change", changeHandler);
	HTML.addListener("InvestmentFee",					"change", changeHandler);
	HTML.addListener("OtherDeductions",					"change", changeHandler);

	// Other Taxes, Interest, and Penalties
	HTML.addListener("SharedResponsibilityPenalty",		"change", changeHandler);
	HTML.addListener("InterestAndPenalties",			"change", changeHandler);
	HTML.addListener("UnderpaymentOfEstimatedTax",		"change", changeHandler);
	HTML.addListener("UseTax",							"change", changeHandler);
	HTML.addListener("MiscellaneousTaxes",				"change", changeHandler);

	// Non-refundable Credits
	HTML.addListener("ChildCareCredit",					"change", changeHandler);
	HTML.addListener("RentersCredit",					"change", changeHandler);
	HTML.addListener("OtherNonrefundableCredits",		"change", changeHandler);

	// Refundable Credits
	HTML.addListener("EITC",							"change", changeHandler);
	HTML.addListener("YoungChildTaxCredit",				"change", changeHandler);
	HTML.addListener("FosterYouthTaxCredit",			"change", changeHandler);
	HTML.addListener("OtherRefundableCredits",			"change", changeHandler);

	// Payments
	HTML.addListener("Withholding",						"change", changeHandler);
	HTML.addListener("EstimatedPayments",				"change", changeHandler);
	HTML.addListener("OtherPayments",					"change", changeHandler);

	// Contributions
	HTML.addListener("Contributions",					"change", changeHandler);

	// Using autofocus attribute scrolls the page to that element; this will move the
	// focus but display the page without scrolling to that element.
	const TaxpayersName = document.getElementById('TaxpayersName');
	TaxpayersName.focus({
		preventScroll: true
	});

	HTML.putUserOutput("tax-year", Dates.getTaxYear(), "text");		// Default tax year.
	HTML.hideElement("debug-container");
});

export { changeHandler };
