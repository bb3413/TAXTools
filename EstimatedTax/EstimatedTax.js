
import { Dates }		from "../Library/Modules/Dates.js";
import { Debug }		from "../Library/Modules/Debug.js";
import { File }			from "../Library/Modules/File.js";
import { HTML }			from "../Library/Modules/HTML.js";
import { TaxFormObj }	from "../Library/Modules/TaxFormObj.js";
import { Taxpayer }		from "../Library/Classes/Taxpayer.js";
import { TaxTable }		from "../Library/Modules/TaxTable.js";

import { ESTIMATED_TAX_SAVE_FILE } from "../Library/TAXTools/TAXTools.js";

// This variable needs to be global so it can be accessed by the save handler.
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

		TaxTable.getTaxTable(HTML.getUserInput("tax-year"));// Initialize tax tables
		inputs = getInputs();								// Get inputs from the web page
		createTaxpayer(inputs);								// Initialize taxpayer
		checkInputValues(inputs);							// Verify range of values
		mapInputValues(inputs);								// Map input values to tax forms
		TaxFormObj.getForm("F1040").calculate();			// Calculate the tax forms
		putOutputs();										// Put results on web page
		Debug.turnOn();										// Put debug info on web page
	} catch (error) {
		HTML.putElementValue("error-message-output", error);
		console.log("Stack trace:", error.stack);
		document.getElementById("error-message-output")
			.scrollIntoView({behavior: 'smooth', block: 'start'});
	}
}

function checkInputValues(inputs) {
	//
	// For any values that have a minimum or maximum value, make sure the value is
	// within range. No error is reported if a correction is made.
	//
	const tt	= TaxTable.getTaxTable();
	const tp	= Taxpayer.getTaxpayer();
	const fs	= tp.filing_status;
	const inp	= inputs;	// Shorthand

	inp.ltc_taxpayer =
		Math.min(inp.ltc_taxpayer, tt.getMaxLTC(tp.taxpayers_age));
	inp.ltc_spouse =
		Math.min(inp.ltc_spouse, tt.getMaxLTC(tp.spouses_age));

	inp.educator_expenses =
		Math.min(inp.educator_expenses,
				 tt.getTaxValue("MaxEducatorExpenses", fs));
	inp.capital_gains =
		Math.max(inp.capital_gains,
				 tt.getTaxValue("MaxCapitalLoss", fs));
	inp.student_loan_interest =
		Math.min(inp.student_loan_interest,
				 tt.getTaxValue("MaxStudentLoanInterest", fs));

	// OBBA
	inp.qualified_tips_deduction =
		Math.min(inp.qualified_tips_deduction,
				 tt.getTaxValue("MaxTipsDeduction", fs));
	inp.qualified_overtime_deduction =
		Math.min(inp.qualified_overtime_deduction,
				 tt.getTaxValue("MaxOvertimeDeduction", fs));
	inp.car_loan_interest_deduction =
		Math.min(inp.car_loan_interest_deduction,
				 tt.getTaxValue("MaxCarLoanInterestDeduction", fs));
	inp.senior_deduction =
		Math.min(inp.senior_deduction, tt.getTaxValue("MaxSeniorDeduction", fs));

	// Non-refundable Credits
	inp.american_opp_credit_no_refund =
		Math.min(inp.american_opp_credit_no_refund,
				 tt.getTaxValue("MaxAmericanOppCreditNoRefund",	fs));
	inp.child_care_credit =
		Math.min(inp.child_care_credit,
				 tt.getTaxValue("MaxChildAndDependentCareCredit", fs));
	inp.child_tax_credit =
		Math.min(inp.child_tax_credit,
				 tt.getTaxValue("MaxChildTaxCredit", fs));
	inp.foreign_tax_credit =
		Math.min(inp.foreign_tax_credit,
				 tt.getTaxValue("MaxForeignTaxCredit", fs));
	inp.lifetime_learning_credit =
		Math.min(inp.lifetime_learning_credit,
				 tt.getTaxValue("MaxLifetimeLearningCredit", fs));
	inp.residential_energy_credit =
		Math.min(inp.residential_energy_credit,
				 tt.getTaxValue("MaxResidentialEnergyCredit",	fs));
	inp.retirement_savings_credit =
		Math.min(inp.retirement_savings_credit,
				 tt.getTaxValue("MaxRetirementSavingsCredit",	fs));

	// Refundable Credits
	inp.american_opp_credit_refundable =
		Math.min(inp.american_opp_credit_refundable,
				 tt.getTaxValue("MaxAmericanOppCreditRefundable",fs));
	inp.credit_for_other_dependents =
		Math.min(inp.credit_for_other_dependents,
				 tt.getTaxValue("MaxCreditForOtherDependents", fs));
	inp.earned_income_credit =
		Math.min(inp.earned_income_credit,
				 tt.getTaxValue("MaxEarnedIncomeCredit", fs));
	inp.premium_tax_credit =
		Math.min(inp.premium_tax_credit,
				 tt.getTaxValue("MaxPremiumTaxCredit", fs));
}

function createTaxpayer(inputs) {
	const taxpayer					= new Taxpayer();

	taxpayer.taxpayers_name			= inputs.taxpayers_name;
	taxpayer.filing_status			= inputs.filing_status;
	taxpayer.taxpayers_birthday		= inputs.taxpayers_birthday;
	taxpayer.spouses_birthday		= inputs.spouses_birthday;

	return taxpayer;
}

function getInputs() {
	//
	// Get the values from the web page. Put them in an object literal so the values
	// can be accessed by name.
	//
	const inputs = {};

	// Taxpayer Information
	inputs.taxpayers_name =
		HTML.getUserInput("TaxpayersName", "text");
	inputs.filing_status =
		HTML.getUserInput("FilingStatus", "text").toUpperCase();
	inputs.taxpayers_birthday =
		HTML.getUserInput("TaxpayersBirthday", "text");
	inputs.spouses_birthday =
		HTML.getUserInput("SpousesBirthday", "text");

	// Income
	inputs.wages =
		HTML.getUserInput("Wages");
	inputs.tax_exempt_interest =
		HTML.getUserInput("TaxExemptInterest");
	inputs.taxable_interest =
		HTML.getUserInput("TaxableInterest");
	inputs.qualified_dividends =
		HTML.getUserInput("QualifiedDividends");
	inputs.ordinary_dividends =
		HTML.getUserInput("OrdinaryDividends");
	inputs.retirement_accounts =
		HTML.getUserInput("RetirementAccounts");
	inputs.social_security =
		HTML.getUserInput("SocialSecurity");
	inputs.capital_gains =
		HTML.getUserInput("CapitalGains");
	inputs.self_employment_income =
		HTML.getUserInput("SelfEmploymentIncome");
	inputs.other_income =
		HTML.getUserInput("OtherIncome");

	// Other Taxes
	inputs.self_employment_tax =
		HTML.getUserInput("SelfEmploymentTax");
	inputs.early_withdrawal_tax =
		HTML.getUserInput("EarlyWithdrawalTax");
	inputs.other_taxes =
		HTML.getUserInput("OtherTaxes");

	// Adjustments
	inputs.educator_expenses =
		HTML.getUserInput("EducatorExpenses");
	inputs.health_savings_account =
		HTML.getUserInput("HealthSavingsAccount");
	inputs.self_employment_tax_adjustment =
		HTML.getUserInput("SelfEmploymentTaxAdjustment");
	inputs.self_employed_health_insurance =
		HTML.getUserInput("SelfEmployedHealthInsurance");
	inputs.early_withdrawal_penalty =
		HTML.getUserInput("EarlyWithdrawalPenalty");
	inputs.alimony_paid =
		HTML.getUserInput("AlimonyPaid");
	inputs.ira_contributions =
		HTML.getUserInput("IRAContributions");
	inputs.student_loan_interest =
		HTML.getUserInput("StudentLoanInterest");
	inputs.other_adjustments =
		HTML.getUserInput("OtherAdjustments");

	// Deductions (non-itemized)
	inputs.qualified_business_income_deduction =
		HTML.getUserInput("QualifiedBusinessIncomeDeduction");
	inputs.qualified_tips_deduction =
		HTML.getUserInput("QualifiedTipsDeduction");
	inputs.qualified_overtime_deduction =
		HTML.getUserInput("QualifiedOvertimeDeduction");
	inputs.car_loan_interest_deduction =
		HTML.getUserInput("CarLoanInterestDeduction");
	inputs.senior_deduction =
		HTML.getUserInput("SeniorDeduction");

	// Deductions (itemized)
	inputs.medical_insurance =
		HTML.getUserInput("MedicalInsurance");
	inputs.doctor_visits =
		HTML.getUserInput("DoctorVisits");
	inputs.prescription_drugs =
		HTML.getUserInput("PrescriptionDrugs");
	inputs.medical_aids =
		HTML.getUserInput("MedicalAids");
	inputs.other_medical_expenses =
		HTML.getUserInput("OtherMedicalExpenses");
	inputs.ltc_taxpayer =
		HTML.getUserInput("LTCTaxpayer");
	inputs.ltc_spouse =
		HTML.getUserInput("LTCSpouse");
	inputs.medical_miles =
		HTML.getUserInput("MedicalMiles");
	inputs.state_income_tax =
		HTML.getUserInput("StateIncomeTax");
	inputs.sales_tax =
		HTML.getUserInput("SalesTax");
	inputs.real_estate_property_tax =
		HTML.getUserInput("RealEstatePropertyTax");
	inputs.personal_property_tax =
		HTML.getUserInput("PersonalPropertyTax");
	inputs.mortgage_interest =
		HTML.getUserInput("MortgageInterest");
	inputs.cash_gifts_to_charity =
		HTML.getUserInput("CashGiftsToCharity");
	inputs.noncash_gifts_to_charity =
		HTML.getUserInput("NoncashGiftsToCharity");
	inputs.qualified_charitable_distribution =
		HTML.getUserInput("QualifiedCharitableDistribution");

	// Non-refundable Credits
	inputs.american_opp_credit_no_refund =
		HTML.getUserInput("AmericanOppCreditNoRefund");
	inputs.child_care_credit =
		HTML.getUserInput("ChildCareCredit");
	inputs.child_tax_credit =
		HTML.getUserInput("ChildTaxCredit");
	inputs.foreign_tax_credit =
		HTML.getUserInput("ForeignTaxCredit");
	inputs.lifetime_learning_credit =
		HTML.getUserInput("LifetimeLearningCredit");
	inputs.residential_energy_credit =
		HTML.getUserInput("ResidentialEnergyCredit");
	inputs.retirement_savings_credit =
		HTML.getUserInput("RetirementSavingsCredit");
	inputs.other_nonrefundable_credits =
		HTML.getUserInput("OtherNonrefundableCredits");

	// Refundable Credits
	inputs.american_opp_credit_refundable =
		HTML.getUserInput("AmericanOppCreditRefundable");
	inputs.credit_for_other_dependents =
		HTML.getUserInput("CreditForOtherDependents");
	inputs.earned_income_credit =
		HTML.getUserInput("EarnedIncomeCredit");
	inputs.premium_tax_credit =
		HTML.getUserInput("PremiumTaxCredit");
	inputs.other_refundable_credits =
		HTML.getUserInput("OtherRefundableCredits");

	// Payments
	inputs.withholding =
		HTML.getUserInput("Withholding");
	inputs.estimated_tax_paid =
		HTML.getUserInput("EstimatedTaxPaid");

	return inputs;
}

function mapInputValues(inputs) {
	const tt		= TaxTable.getTaxTable();
	const f1040		= TaxFormObj.createForm("F1040");
	const f1040S1	= TaxFormObj.createForm("F1040S1");
	const f1040S2	= TaxFormObj.createForm("F1040S2");
	const f1040S3	= TaxFormObj.createForm("F1040S3");
	const f1040S1A	= TaxFormObj.createForm("F1040S1A");
	const f1040SA	= TaxFormObj.createForm("F1040SA");

	f1040.lines["01z"].user_value	= inputs.wages;
	f1040.lines["02a"].user_value	= inputs.tax_exempt_interest;
	f1040.lines["02b"].user_value	= inputs.taxable_interest;
	f1040.lines["03a"].user_value	= inputs.qualified_dividends;
	f1040.lines["03b"].user_value	= inputs.ordinary_dividends;
	f1040.lines["04b"].user_value	= inputs.retirement_accounts;
	f1040.lines["06a"].user_value	= inputs.social_security;
	f1040.lines["07a"].user_value	= inputs.capital_gains;
	f1040.lines["08" ].user_value	= inputs.self_employment_income + inputs.other_income;

	//Other Taxes
	f1040S2.lines["04"].user_value	= inputs.self_employment_tax;
	f1040S2.lines["08"].user_value	= inputs.early_withdrawal_tax;
	f1040.lines  ["23"].user_value	= inputs.other_taxes;

	// Adjustments
	f1040S1.lines["11"].user_value	= inputs.educator_expenses;
	f1040S1.lines["13"].user_value	= inputs.health_savings_account;
	f1040S1.lines["15"].user_value	= inputs.self_employment_tax_adjustment;
	f1040S1.lines["17"].user_value	= inputs.self_employed_health_insurance;
	f1040S1.lines["18"].user_value	= inputs.early_withdrawal_penalty;
	f1040S1.lines["19a"].user_value	= inputs.alimony_paid;
	f1040S1.lines["20"].user_value	= inputs.ira_contributions;
	f1040S1.lines["21"].user_value	= inputs.student_loan_interest;
	f1040S1.lines["25"].user_value	= inputs.other_adjustments;

	// Deductions (non-itemized)
	f1040.lines   ["13a"].user_value= inputs.qualified_business_income_deduction;
	f1040S1A.lines["13"].user_value	= inputs.qualified_tips_deduction;
	f1040S1A.lines["21"].user_value	= inputs.qualified_overtime_deduction;
	f1040S1A.lines["30"].user_value	= inputs.car_loan_interest_deduction;
	f1040S1A.lines["37"].user_value	= inputs.senior_deduction;

	// Deductions
	const total_medical_deductions =
		inputs.medical_insurance +
		inputs.doctor_visits +
		inputs.prescription_drugs +
		inputs.medical_aids +
		inputs.other_medical_expenses +
		inputs.ltc_taxpayer +
		inputs.ltc_spouse +
		tt.getMedicalMileageDeduction(inputs.medical_miles);	// Convert miles to dollars;
	const state_and_local_taxes = Math.max(inputs.state_income_tax, inputs.sales_tax);

	f1040SA.lines["01"].user_value	= total_medical_deductions;
	f1040SA.lines["05a"].user_value	= state_and_local_taxes;
	f1040SA.lines["05b"].user_value	= inputs.real_estate_property_tax;
	f1040SA.lines["05c"].user_value	= inputs.personal_property_tax;
	f1040SA.lines["08a"].user_value	= inputs.mortgage_interest;
	f1040SA.lines["11"].user_value	= inputs.cash_gifts_to_charity;
	f1040SA.lines["12"].user_value	= inputs.noncash_gifts_to_charity;

	// Non-refundable Credits
	f1040S3.lines["03"].user_value	= inputs.american_opp_credit_no_refund;
	f1040.lines  ["19"].user_value	= inputs.child_care_credit;
	f1040S3.lines["02"].user_value	= inputs.child_tax_credit;
	f1040S3.lines["01"].user_value	= inputs.foreign_tax_credit;
	f1040S3.lines["03"].user_value	= inputs.lifetime_learning_credit;
	f1040S3.lines["05a"].user_value	= inputs.residential_energy_credit;
	f1040S3.lines["04"].user_value	= inputs.retirement_savings_credit;
	f1040S3.lines["07"].user_value	= inputs.other_nonrefundable_credits;

	// Refundable Credits
	f1040S3.lines["03" ].user_value	= inputs.american_opp_credit_refundable;
	f1040.lines  ["19" ].user_value	= inputs.credit_for_other_dependents;
	f1040.lines  ["27a"].user_value	= inputs.earned_income_credit;
	f1040S3.lines["09" ].user_value	= inputs.premium_tax_credit;
	f1040S3.lines["13z"].user_value	= inputs.other_refundable_credits;

	// Payments
	f1040.lines["25d"].user_value	= inputs.withholding;
	f1040.lines["26"].user_value	= inputs.estimated_tax_paid;
}

function putOutputs() {
	//
	// Get the information we are interested in and write them to the web page.
	//
	const tp				= Taxpayer.getTaxpayer();
	const todays_date		= new Date().toLocaleDateString();
	const withholding		= TaxFormObj.getValue("F1040", "25d");
	const payments			= TaxFormObj.getValue("F1040", "26");
	const refund			= TaxFormObj.getValue("F1040", "34");
	let amount_due			= TaxFormObj.getValue("F1040", "37");

	amount_due				= (amount_due !== 0) ? -amount_due : refund;
	const estimated_tax		= Math.round(Math.max(0, payments - amount_due) / 4);

	HTML.putUserOutput("TodaysDate",			todays_date, "text");
	HTML.putUserOutput("TaxpayersAge",			tp.tps_age);
	HTML.putUserOutput("SpousesAge",			tp.spouses_age);

	// Estimated Tax
	HTML.putUserOutput("TotalIncome",			TaxFormObj.getValue("F1040", "09"));
	HTML.putUserOutput("Adjustments",			TaxFormObj.getValue("F1040", "10"));
	HTML.putUserOutput("AdjustedGrossIncome",	TaxFormObj.getValue("F1040", "11b"));
	HTML.putUserOutput("Deductions",			TaxFormObj.getValue("F1040", "14"));
	HTML.putUserOutput("TaxableIncome",			TaxFormObj.getValue("F1040", "15"));
	HTML.putUserOutput("TaxOnTaxableIncome",	TaxFormObj.getValue("F1040", "16"));
	HTML.putUserOutput("TotalOtherTaxes",		TaxFormObj.getValue("F1040", "23"));
	HTML.putUserOutput("TotalTax",				TaxFormObj.getValue("F1040", "24"));
	HTML.putUserOutput("NonrefundableCredits",	TaxFormObj.getValue("F1040", "20"));
	HTML.putUserOutput("RefundableCredits", 	TaxFormObj.getValue("F1040", "32"));
	HTML.putUserOutput("Payments", 				payments + withholding);
	HTML.putUserOutput("AmountDue",				amount_due);
	HTML.putUserOutput("EstimatedTax",			estimated_tax);
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

	// Taxpayer Information
	HTML.putElementValue("TaxpayersName",
						 inputs.taxpayers_name);
	HTML.putElementValue("FilingStatus",
						 inputs.filing_status);
	HTML.putElementValue("TaxpayersBirthday",
						 inputs.taxpayers_birthday);
	HTML.putElementValue("SpousesBirthday",
						 inputs.spouses_birthday);

	// Income
	HTML.putElementValue("TaxExemptInterest",
						 inputs.tax_exempt_interest);
	HTML.putElementValue("Wages",
						 inputs.wages);
	HTML.putElementValue("TaxableInterest",
						 inputs.taxable_interest);
	HTML.putElementValue("QualifiedDividends",
						 inputs.qualified_dividends);
	HTML.putElementValue("OrdinaryDividends",
						 inputs.ordinary_dividends);
	HTML.putElementValue("RetirementAccounts",
						 inputs.retirement_accounts);
	HTML.putElementValue("SocialSecurity",
						 inputs.social_security);
	HTML.putElementValue("CapitalGains",
						 inputs.capital_gains);
	HTML.putElementValue("SelfEmploymentIncome",
						 inputs.self_employment_income);
	HTML.putElementValue("OtherIncome",
						 inputs.other_income);

	// Other Taxes
	HTML.putElementValue("SelfEmploymentTax",
						 inputs.self_employment_tax);
	HTML.putElementValue("EarlyWithdrawalTax",
						 inputs.early_withdrawal_tax);
	HTML.putElementValue("OtherTaxes",
						 inputs.other_taxes);

	// Adjustments
	HTML.putElementValue("EducatorExpenses",
						 inputs.educator_expenses);
	HTML.putElementValue("HealthSavingsAccount",
						 inputs.health_savings_account);
	HTML.putElementValue("SelfEmploymentTaxAdjustment",
						 inputs.self_employment_tax_adjustment);
	HTML.putElementValue("SelfEmployedHealthInsurance",
						 inputs.self_employed_health_insurance);
	HTML.putElementValue("EarlyWithdrawalPenalty",
						 inputs.early_withdrawal_penalty);
	HTML.putElementValue("AlimonyPaid",
						 inputs.alimony_paid);
	HTML.putElementValue("IRAContributions",
						 inputs.ira_contributions);
	HTML.putElementValue("StudentLoanInterest",
						 inputs.student_loan_interest);
	HTML.putElementValue("OtherAdjustments",
						 inputs.other_adjustments);

	// Deductions (non-itemized)
	HTML.putElementValue("QualifiedBusinessIncomeDeduction",
						 inputs.qualified_business_income_deduction);
	HTML.putElementValue("QualifiedTipsDeduction",
						 inputs.qualified_tips_deduction);
	HTML.putElementValue("QualifiedOvertimeDeduction",
						 inputs.qualified_overtime_deduction);
	HTML.putElementValue("CarLoanInterestDeduction",
						 inputs.car_loan_interest_deduction);
	HTML.putElementValue("SeniorDeduction",
						 inputs.senior_deduction);

	// Deductions (itemized)
	HTML.putElementValue("MedicalInsurance",
						 inputs.medical_insurance);
	HTML.putElementValue("DoctorVisits",
						 inputs.doctor_visits);
	HTML.putElementValue("PrescriptionDrugs",
						 inputs.prescription_drugs);
	HTML.putElementValue("MedicalAids",
						 inputs.medical_aids);
	HTML.putElementValue("LTCTaxpayer",
						 inputs.ltc_taxpayer);
	HTML.putElementValue("LTCSpouse",
						 inputs.ltc_spouse);
	HTML.putElementValue("MedicalMiles",
						 inputs.medical_miles);
	HTML.putElementValue("OtherMedicalExpenses",
						 inputs.other_medical_expenses);
	HTML.putElementValue("StateIncomeTax",
						 inputs.state_income_tax);
	HTML.putElementValue("SalesTax",
						 inputs.sales_tax);
	HTML.putElementValue("RealEstatePropertyTax",
						 inputs.real_estate_property_tax);
	HTML.putElementValue("PersonalPropertyTax",
						 inputs.personal_property_tax);
	HTML.putElementValue("MortgageInterest",
						 inputs.mortgage_interest);
	HTML.putElementValue("CashGiftsToCharity",
						 inputs.cash_gifts_to_charity);
	HTML.putElementValue("NoncashGiftsToCharity",
						 inputs.noncash_gifts_to_charity);
	HTML.putElementValue("QualifiedCharitableDistribution",
						 inputs.qualified_charitable_distribution);

	// Non-refndable Credits
	HTML.putElementValue("AmericanOppCreditNoRefund",
						 inputs.american_opp_credit_no_refund);
	HTML.putElementValue("ChildCareCredit",
						 inputs.child_care_credit);
	HTML.putElementValue("ChildTaxCredit",
						 inputs.child_tax_credit);
	HTML.putElementValue("ForeignTaxCredit",
						 inputs.foreign_tax_credit);
	HTML.putElementValue("LifetimeLearningCredit",
						 inputs.lifetime_learning_credit);
	HTML.putElementValue("ResidentialEnergyCredit",

						 inputs.residential_energy_credit);
	HTML.putElementValue("RetirementSavingsCredit",
						 inputs.retirement_savings_credit);
	HTML.putElementValue("OtherNonrefundableCredits",
						 inputs.other_nonrefundable_credits);

	// Refundable Credits
	HTML.putElementValue("AmericanOppCreditRefundable",
						 inputs.american_opp_credit_refundable);
	HTML.putElementValue("CreditForOtherDependents",
						 inputs.credit_for_other_dependents);
	HTML.putElementValue("EarnedIncomeCredit",
						 inputs.earned_income_credit);
	HTML.putElementValue("PremiumTaxCredit",
						 inputs.premium_tax_credit);
	HTML.putElementValue("OtherRefundableCredits",
						 inputs.other_refundable_credits);

	// Payments
	HTML.putElementValue("Withholding",
						 inputs.withholding);
	HTML.putElementValue("EstimatedTaxPaid",
						 inputs.estimated_tax_paid);

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
	const data = {
		version:		HTML.getUserInput("tax-tools-version", "text"),
		todays_date:	new Date().toLocaleDateString(),
		tax_year:		HTML.getUserInput("tax-year", "text"),
		input_data:		inputs,
	};

	File.saveToFile(data, ESTIMATED_TAX_SAVE_FILE);
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

	// Taxpayer information
	HTML.addListener("TaxpayersName",					"change", changeHandler);
	HTML.addListener("FilingStatus",					"change", changeHandler);
	HTML.addListener("TaxpayersBirthday",				"change", changeHandler);
	HTML.addListener("SpousesBirthday",					"change", changeHandler);

	// Income
	HTML.addListener("Wages",							"change", changeHandler);
	HTML.addListener("TaxExemptInterest",				"change", changeHandler);
	HTML.addListener("TaxableInterest",					"change", changeHandler);
	HTML.addListener("QualifiedDividends",				"change", changeHandler);
	HTML.addListener("OrdinaryDividends",				"change", changeHandler);
	HTML.addListener("RetirementAccounts",				"change", changeHandler);
	HTML.addListener("SocialSecurity",					"change", changeHandler);
	HTML.addListener("CapitalGains",					"change", changeHandler);
	HTML.addListener("SelfEmploymentIncome",			"change", changeHandler);
	HTML.addListener("OtherIncome",						"change", changeHandler);

	// Other Taxes
	HTML.addListener("SelfEmploymentTax",				"change", changeHandler);
	HTML.addListener("EarlyWithdrawalTax",				"change", changeHandler);
	HTML.addListener("OtherTaxes",						"change", changeHandler);

	// Adjustments
	HTML.addListener("EducatorExpenses",				"change", changeHandler);
	HTML.addListener("HealthSavingsAccount",			"change", changeHandler);
	HTML.addListener("SelfEmploymentTaxAdjustment",		"change", changeHandler);
	HTML.addListener("SelfEmployedHealthInsurance",		"change", changeHandler);
	HTML.addListener("EarlyWithdrawalPenalty",			"change", changeHandler);
	HTML.addListener("AlimonyPaid",						"change", changeHandler);
	HTML.addListener("IRAContributions",				"change", changeHandler);
	HTML.addListener("StudentLoanInterest",				"change", changeHandler);
	HTML.addListener("OtherAdjustments",				"change", changeHandler);

	// Deductions (non-itemized)
	HTML.addListener("QualifiedBusinessIncomeDeduction","change", changeHandler);
	HTML.addListener("QualifiedTipsDeduction",			"change", changeHandler);
	HTML.addListener("QualifiedOvertimeDeduction",		"change", changeHandler);
	HTML.addListener("CarLoanInterestDeduction",		"change", changeHandler);
	HTML.addListener("SeniorDeduction",					"change", changeHandler);

	// Deductions (itemized)
	HTML.addListener("MedicalInsurance",				"change", changeHandler);
	HTML.addListener("DoctorVisits",					"change", changeHandler);
	HTML.addListener("PrescriptionDrugs",				"change", changeHandler);
	HTML.addListener("MedicalAids",						"change", changeHandler);
	HTML.addListener("OtherMedicalExpenses",			"change", changeHandler);
	HTML.addListener("LTCTaxpayer",						"change", changeHandler);
	HTML.addListener("LTCSpouse",						"change", changeHandler);
	HTML.addListener("MedicalMiles",					"change", changeHandler);
	HTML.addListener("StateIncomeTax",					"change", changeHandler);
	HTML.addListener("SalesTax",						"change", changeHandler);
	HTML.addListener("RealEstatePropertyTax",			"change", changeHandler);
	HTML.addListener("PersonalPropertyTax",				"change", changeHandler);
	HTML.addListener("MortgageInterest",				"change", changeHandler);
	HTML.addListener("CashGiftsToCharity",				"change", changeHandler);
	HTML.addListener("NoncashGiftsToCharity",			"change", changeHandler);
	HTML.addListener("QualifiedCharitableDistribution",	"change", changeHandler);

	// Non-refundable Credits
	HTML.addListener("AmericanOppCreditNoRefund",		"change", changeHandler);
	HTML.addListener("ChildCareCredit",					"change", changeHandler);
	HTML.addListener("ChildTaxCredit",					"change", changeHandler);
	HTML.addListener("ForeignTaxCredit",				"change", changeHandler);
	HTML.addListener("LifetimeLearningCredit",			"change", changeHandler);
	HTML.addListener("ResidentialEnergyCredit",			"change", changeHandler);
	HTML.addListener("RetirementSavingsCredit",			"change", changeHandler);
	HTML.addListener("OtherNonrefundableCredits",		"change", changeHandler);

	// Refundable Credits
	HTML.addListener("AmericanOppCreditRefundable",		"change", changeHandler);
	HTML.addListener("CreditForOtherDependents",		"change", changeHandler);
	HTML.addListener("EarnedIncomeCredit",				"change", changeHandler);
	HTML.addListener("PremiumTaxCredit",				"change", changeHandler);
	HTML.addListener("OtherRefundableCredits",			"change", changeHandler);

	// Payments
	HTML.addListener("Withholding",						"change", changeHandler);
	HTML.addListener("EstimatedTaxPaid",				"change", changeHandler);

	// Using autofocus attribute scrolls the page to that element; this will move the
	// focus but display the page without scrolling to that element.
	const TaxpayersName = document.getElementById("TaxpayersName");
	TaxpayersName.focus({preventScroll: true});

	HTML.putUserOutput("tax-year", Dates.getTaxYear(), "text");		// Default tax year.
	HTML.hideElement("debug-container");
});
