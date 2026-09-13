
import { Dates }			from "../Library/Modules/Dates.js";
import { Debug }			from "../Library/Modules/Debug.js";
import { HTML }				from "../Library/Modules/HTML.js";
import { TaxFormObj }			from "../Library/Modules/TaxFormObj.js";
import { Taxpayer }			from "../Library/Classes/Taxpayer.js";
import { TaxTable }			from "../Library/Modules/TaxTable.js";

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

		const inputs = getInputs();				// Get inputs from the web page
		if (inputs.filing_status === "MFJ") {
			HTML.showElement("SpouseContainer");
		} else {
			HTML.hideElement("SpouseContainer");
		}
		TaxTable.getTaxTable(inputs.tax_year);	// Initialize tax tables
		createTaxpayer(inputs);					// Initialize taxpayer
		mapInputValues(inputs);					// Map input values to tax forms
		putOutputs();							// Put results on web page
		Debug.turnOn();							// Put debug info on web page if enabled
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
	inputs.tax_year				= HTML.getUserInput("tax-year");
	inputs.filing_status		= HTML.getUserInput("FilingStatus", "text").toUpperCase();
	inputs.taxpayers_birthday	= HTML.getUserInput("TaxpayersBirthday", "text");
	inputs.spouses_birthday		= HTML.getUserInput("SpousesBirthday", "text");
	inputs.is_taxpayer_blind	= HTML.getUserInput("TaxpayerIsBlind");
	inputs.is_spouse_blind		= HTML.getUserInput("SpouseIsBlind");

	// Input fields
	inputs.agi								= HTML.getUserInput("AGI");
	inputs.qualified_dividends				= HTML.getUserInput("QualifiedDividends");
	inputs.capital_gains					= HTML.getUserInput("CapitalGains");
	inputs.taxable_income					= HTML.getUserInput("TaxableIncome");
	inputs.income_tax						= HTML.getUserInput("IncomeTax");

	inputs.itemized_deduction				= HTML.getUserInput("ItemizedDeduction");
	inputs.taxes_paid_deduction				= HTML.getUserInput("TaxesPaidDeduction");
	inputs.qbi_deduction					= HTML.getUserInput("QBIDeduction");

	inputs.state_tax_refund					= HTML.getUserInput("StateTaxRefund");
	inputs.investment_interest				= HTML.getUserInput("InvestmentInterestExpense");
	inputs.depletion						= HTML.getUserInput("Depletion");
	inputs.net_operating_loss				= HTML.getUserInput("NetOperatingLoss");
	inputs.alternate_net_operating_loss		= HTML.getUserInput("AlternateNetOperatingLoss");
	inputs.private_activity_bonds_interest =
		HTML.getUserInput("PrivateActivityBondsInterest");
	inputs.qualified_small_business_stock =
		HTML.getUserInput("QualifiedSmallBusinessStock");
	inputs.incentive_stock_options			= HTML.getUserInput("IncentiveStockOptions");
	inputs.estates_and_trusts				= HTML.getUserInput("EstatesAndTrusts");
	inputs.disposition_of_property			= HTML.getUserInput("DispositionOfProperty");
	inputs.post_1986_depreciation			= HTML.getUserInput("Post1986Depreciation");
	inputs.passive_activities				= HTML.getUserInput("PassiveActivities");
	inputs.loss_limitations					= HTML.getUserInput("LossLimitations");
	inputs.circulation_costs				= HTML.getUserInput("CirculationCosts");
	inputs.long_term_contracts				= HTML.getUserInput("LongTermContracts");
	inputs.mining_costs						= HTML.getUserInput("MiningCosts");
	inputs.research_costs					= HTML.getUserInput("ResearchCosts");
	inputs.installment_sales				= HTML.getUserInput("InstallmentSales");
	inputs.intangible_drilling_costs		= HTML.getUserInput("IntangibleDrillingCosts");
	inputs.other_income						= HTML.getUserInput("OtherIncome");

	return inputs;
}

function mapInputValues(inputs) {
	const f1040		= TaxFormObj.createForm("F1040");
	const f1040S1	= TaxFormObj.createForm("F1040S1");
	const f1040SA	= TaxFormObj.createForm("F1040SA");
	const f6251		= TaxFormObj.createForm("F6251");

	f1040.lines["11b"].user_value	= inputs.agi;
	f1040.lines["03a"].user_value	= inputs.qualified_dividends;
	f1040.lines["07a"].user_value	= inputs.capital_gains;
	f1040.lines["15"].user_value	= inputs.taxable_income;
	f1040.lines["16"].user_value	= inputs.income_tax;

	f1040SA.lines["17"].user_value	= inputs.itemized_deduction;
	f1040SA.lines["07"].user_value	= inputs.taxes_paid_deduction;
	f1040.lines["13a"].user_value	= inputs.qbi_deduction;

	f1040S1.lines["01"].user_value	= inputs.state_tax_refund;
	f6251.lines["02c"].user_value	= inputs.investment_interest;
	f6251.lines["02d"].user_value	= inputs.depletion;
	f6251.lines["02e"].user_value	= inputs.net_operating_loss;
	f6251.lines["02f"].user_value	= inputs.alternate_net_operating_loss;
	f6251.lines["02g"].user_value	= inputs.private_activity_bonds_interest;
	f6251.lines["02h"].user_value	= inputs.qualified_small_business_stock;
	f6251.lines["02i"].user_value	= inputs.incentive_stock_options;
	f6251.lines["02j"].user_value	= inputs.estates_and_trusts;
	f6251.lines["02k"].user_value	= inputs.disposition_of_property;
	f6251.lines["02l"].user_value	= inputs.post_1986_depreciation;
	f6251.lines["02m"].user_value	= inputs.passive_activities;
	f6251.lines["02n"].user_value	= inputs.loss_limitations;
	f6251.lines["02o"].user_value	= inputs.circulation_costs;
	f6251.lines["02p"].user_value	= inputs.long_term_contracts;
	f6251.lines["02q"].user_value	= inputs.mining_costs;
	f6251.lines["02r"].user_value	= inputs.research_costs;
	f6251.lines["02s"].user_value	= inputs.installment_sales;
	f6251.lines["02t"].user_value	= inputs.intangible_drilling_costs;
	f6251.lines["03"].user_value	= inputs.other_income;
}

function putOutputs() {
	const tp = Taxpayer.getTaxpayer();

	if (tp.filing_status === "MFJ") {
		HTML.showElement("SpouseContainer");
	} else {
		HTML.hideElement("SpouseContainer");
	}

	HTML.putUserOutput("AMTIncome",		TaxFormObj.getValue("F6251", "04"));
	HTML.putUserOutput("AMTExemption",	TaxFormObj.getValue("F6251", "05"));
	HTML.putUserOutput("AMT",			TaxFormObj.getValue("F6251", "11"));
}

document.addEventListener("DOMContentLoaded", () => {
	//
	// Wait for the DOM to be fully loaded before trying to access any elements.
	// All the listeners for the data fields use the same handler so when any field
	// is changed the whole calculation is redone.
	//

	// Listen for changes to the input data.
	HTML.addListener("tax-year",					"change", changeHandler);
	HTML.addListener("FilingStatus",				"change", changeHandler);
	HTML.addListener("TaxpayersBirthday",			"change", changeHandler);
	HTML.addListener("SpousesBirthday",				"change", changeHandler);
	HTML.addListener("TaxpayerIsBlind",				"change", changeHandler);
	HTML.addListener("SpouseIsBlind",				"change", changeHandler);

	// Input fields
	HTML.addListener("AGI",							"change", changeHandler);
	HTML.addListener("QualifiedDividends",			"change", changeHandler);
	HTML.addListener("CapitalGains",				"change", changeHandler);
	HTML.addListener("TaxableIncome",				"change", changeHandler);
	HTML.addListener("IncomeTax",					"change", changeHandler);

	HTML.addListener("ItemizedDeduction",			"change", changeHandler);
	HTML.addListener("TaxesPaidDeduction",			"change", changeHandler);
	HTML.addListener("QBIDeduction",				"change", changeHandler);

	HTML.addListener("StateTaxRefund",				"change", changeHandler);
	HTML.addListener("InvestmentInterestExpense",	"change", changeHandler);
	HTML.addListener("Depletion",					"change", changeHandler);
	HTML.addListener("NetOperatingLoss",			"change", changeHandler);
	HTML.addListener("AlternateNetOperatingLoss",	"change", changeHandler);
	HTML.addListener("PrivateActivityBondsInterest","change", changeHandler);
	HTML.addListener("QualifiedSmallBusinessStock",	"change", changeHandler);
	HTML.addListener("IncentiveStockOptions",		"change", changeHandler);
	HTML.addListener("EstatesAndTrusts",			"change", changeHandler);
	HTML.addListener("DispositionOfProperty",		"change", changeHandler);
	HTML.addListener("Post1986Depreciation",		"change", changeHandler);
	HTML.addListener("PassiveActivities",			"change", changeHandler);
	HTML.addListener("LossLimitations",				"change", changeHandler);
	HTML.addListener("CirculationCosts",			"change", changeHandler);
	HTML.addListener("LongTermContracts",			"change", changeHandler);
	HTML.addListener("MiningCosts",					"change", changeHandler);
	HTML.addListener("ResearchCosts",				"change", changeHandler);
	HTML.addListener("InstallmentSales",			"change", changeHandler);
	HTML.addListener("IntangibleDrillingCosts",		"change", changeHandler);
	HTML.addListener("OtherIncome",					"change", changeHandler);

	HTML.hideElement("SpouseContainer");
	HTML.hideElement("debug-container");
});
