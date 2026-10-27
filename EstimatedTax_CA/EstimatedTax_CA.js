
import { Dates }		from "../Library/Modules/Dates.js";
import { Debug }		from "../Library/Modules/Debug.js";
import { Ensure }		from "../Library/Modules/Ensure.js";
import { File }			from "../Library/Modules/File.js";
import { HTML }			from "../Library/Modules/HTML.js";
import { SaveRestore }	from "../Library/Modules/SaveRestore.js";
import { TaxFormObj }	from "../Library/Modules/TaxFormObj.js";
import { Taxpayer }		from "../Library/Classes/Taxpayer.js";
import { TaxTable }		from "../Library/Modules/TaxTable.js";

import { ESTIMATED_TAX_CA_SAVE_FILE }	from "../Library/TAXTools/TAXTools.js";
import { TAXTOOL_CONTAINER }			from "../Library/TAXTools/TAXTools.js";
import { ERROR_MESSAGE_OUTPUT }			from "../Library/TAXTools/TAXTools.js";
import { strToFilingStatus }			from "../Library/TAXTools/TAXTools.js";
import { filingStatusToStr }			from "../Library/TAXTools/TAXTools.js";

const SAVE_FILE		= ESTIMATED_TAX_CA_SAVE_FILE;
const FIELD_INFO	= {
	// Field Name					Value Type
	"tax-year":						["text"],
	"TaxpayersName":				["text"],
	"FilingStatus":					["text"],
	"TaxpayersBirthday":			["text"],
	"SpousesBirthday":				["text"],

	"FederalAGI":					[""],
	"NumberOfDependents":			[""],

	// Subtractions
	"USTreasuryObligations":		[""],
	"MilitaryRetirementIncome":		[""],
	"TaxableSocialSecurity":		[""],
	"StateTaxRefund":				[""],
	"UnemploymentIncome":			[""],
	"CaliforniaLotteryWinnings":	[""],
	"NonqualifiedHSADistributions":	[""],
	"AlimonyPaid":					[""],
	"OtherSubtractions":			[""],

	// Additions
	"HSAEmployerContributions":		[""],
	"AlimonyReceived":				[""],
	"HomeLoanDebtCancellation":		[""],
	"EmployerPaidStudentLoanPayments":	[""],
	"EducatorExpenses":				[""],
	"HSAContributions":				[""],
	"IRAContributions":				[""],
	"OtherAdditions":				[""],

	// Itemized Deductions
	"FederalItemizedDeductions":	[""],
	"StateIncomeTax":				[""],
	"QualifiedHSADistributions":	[""],
	"SALTLimitExcess":				[""],
	"HomeMortgageInterestLimit":	[""],
	"TaxPreparationFee":			[""],
	"SafeDepositBox":				[""],
	"InvestmentFee":				[""],
	"OtherDeductions":				[""],

	// Other Taxes, Interest, and Penalties
	"SharedResponsibilityPenalty":	[""],
	"InterestAndPenalties":			[""],
	"UnderpaymentOfEstimatedTax":	[""],
	"UseTax":						[""],
	"MiscellaneousTaxes":			[""],

	// Non-refundable Credits
	"ChildCareCredit":				[""],
	"RentersCredit":				[""],
	"OtherNonrefundableCredits":	[""],

	// Refundable Credits
	"EITC":							[""],
	"YoungChildTaxCredit":			[""],
	"FosterYouthTaxCredit":			[""],
	"OtherRefundableCredits":		[""],

	// Payments
	"Withholding":					[""],
	"EstimatedPayments":			[""],
	"OtherPayments":				[""],

	// Contributions
	"Contributions":				[""],
};

// This variable needs to be global so it can be accessed by the save and restore handlers.
let inputs = {};

function changeHandler(event) {
	//
	// This function is called when any input field is changed. It calculates the
	// whole return (not just the field tha was changed).
	//
	try {
		resetAll();
		TaxTable.getTaxTable(HTML.getUserInput("tax-year"));// Initialize tax tables.
		inputs = getInputs();								// Get inputs from the web page
		const taxpayer = createTaxpayer(inputs);			// Initialize taxpayer
		mapInputValues(inputs);								// Map input values to tax forms
		TaxFormObj.getForm("F540").calculate();				// Calculate the tax forms
		putOutputs(taxpayer);								// Put results on web page
		Debug.turnOn();										// Put debug info on web page
	} catch (error) {
		Ensure.processError(error);
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

function getInputsNew() {
	//
	// This function will not work as long as the element ID are not in kebab case.
	//
	// Copy values from the web page.
	//
	// The return parameter is an object that contains the name-value pairs for all the
	// fields copied from the web page.
	//
	const values = {};

	for (const element_id of Object.keys(FIELD_INFO)) {
		const key_name		= element_id.replace(/-/g, "_");
		const value_type	= FIELD_INFO[element_id][0];
		values[key_name]	= HTML.getUserInput(element_id, value_type);
	}

	return values;
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
		strToFilingStatus(HTML.getUserInput("FilingStatus", "text"));
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

	SaveRestore.initialize(SAVE_FILE, FIELD_INFO, resetAll);

	// Using autofocus attribute scrolls the page to that element; this will move the
	// focus but display the page without scrolling to that element.
	const TaxpayersName = document.getElementById('TaxpayersName');
	TaxpayersName.focus({
		preventScroll: true
	});

	HTML.putUserOutput("tax-year", Dates.getTaxYear(), "text");		// Default tax year.
	HTML.hideElement("debug-container");
});
