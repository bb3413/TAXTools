
import { Alert }				from "../Library/Classes/Alert.js";
import { Dates }				from "../Library/Classes/Dates.js";
import { Debug }				from "../Library/Classes/Debug.js";
import { fetchSalesTaxRate }	from "../Library/SalesTax/SalesTaxFromCDTFA.js";
import { HTML }					from "../Library/Classes/HTML.js";
import { TaxFormObj }			from "../Library/Classes/TaxFormObj.js";
import { Taxpayer }				from "../Library/Classes/Taxpayer.js";
import { TaxTable }				from "../Library/Classes/TaxTable.js";

let total_sales_tax			= 0;
let total_spendable_income	= 0;

async function changeAddressHandler(event) {
	const street_address	= HTML.getUserInput("StreetAddress",	"text");
	const city				= HTML.getUserInput("City",				"text");
	const zip_code			= HTML.getUserInput("ZipCode",			"text");

	total_sales_tax = 0;
	if (street_address && city && zip_code) {
		total_sales_tax = await fetchSalesTaxRate(street_address, city, zip_code);
	}

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

		const inputs = getInputs();					// Get inputs from the web page
		TaxTable.getTaxTable(inputs.tax_year);		// Initialize tax tables
		createTaxpayer(inputs);						// Initialize taxpayer
		mapInputValues(inputs);						// Map input values to tax forms
		TaxFormObj.getForm("SalesTax").calculate(total_sales_tax);	// Calculate the tax
		putOutputs();								// Put results on web page
		Debug.turnOn();								// Put debug info on web page if enabled
	} catch (error) {
		HTML.putElementValue("error-message-output", error);
		console.log("Stack trace:", error.stack);
		document.getElementById("error-message-output")
			.scrollIntoView({behavior: 'smooth', block: 'start'});
	}
}

function createTaxpayer(inputs) {
	const taxpayer					= new Taxpayer();

	taxpayer.filing_status			= "SINGLE";
	taxpayer.number_of_dependents	= Math.min(0, inputs.family_size - 1);

	return taxpayer;
}

function getInputs() {
	//
	// Get the values from the web page. Put them in an object literal so the values
	// can be accessed by name.
	//
	const inputs = {};

	inputs.tax_year					= HTML.getUserInput("tax-year");
	inputs.family_size				= HTML.getUserInput("FamilySize");
	inputs.extra_sales_tax			= HTML.getUserInput("ExtraSalesTax");

	inputs.wages					= HTML.getUserInput("Wages");
	inputs.tax_exempt_interest		= HTML.getUserInput("TaxExemptInterest");
	inputs.taxable_interest			= HTML.getUserInput("TaxableInterest");
	inputs.qualified_dividends		= HTML.getUserInput("QualifiedDividends");
	inputs.ordinary_dividends		= HTML.getUserInput("OrdinaryDividends");
	inputs.retirement_accounts		= HTML.getUserInput("RetirementAccounts");
	inputs.social_security			= HTML.getUserInput("SocialSecurity");
	inputs.capital_gains			= HTML.getUserInput("CapitalGains");
	inputs.self_employment_income	= HTML.getUserInput("SelfEmploymentIncome");
	inputs.other_income				= HTML.getUserInput("OtherIncome");

	total_spendable_income =		// Save for output.
		inputs.wages +
		inputs.tax_exempt_interest +
		inputs.taxable_interest +
		inputs.qualified_dividends +
		inputs.ordinary_dividends +
		inputs.retirement_accounts +
		inputs.social_security +
		inputs.capital_gains +
		inputs.self_employment_income +
		inputs.other_income;

	return inputs;
}

function mapInputValues(inputs) {
	const f1040		= TaxFormObj.createForm("F1040");
	const salestax	= TaxFormObj.createForm("SalesTax");

	salestax.family_size			= inputs.family_size;
	salestax.lines["07"].user_value	= inputs.extra_sales_tax;

	f1040.lines["01z"].user_value	= inputs.wages;
	f1040.lines["02a"].user_value	= inputs.tax_exempt_interest;
	f1040.lines["02b"].user_value	= inputs.taxable_interest;
	f1040.lines["03a"].user_value	= inputs.qualified_dividends;
	f1040.lines["03b"].user_value	= inputs.ordinary_dividends;
	f1040.lines["04a"].user_value	= inputs.retirement_accounts;
	f1040.lines["06a"].user_value	= inputs.social_security;
	f1040.lines["07a"].user_value	= inputs.capital_gains;
	f1040.lines["08" ].user_value	= inputs.self_employment_income + inputs.other_income;
}

function putOutputs() {
	HTML.putUserOutput("TotalSpendableIncome",	total_spendable_income);
	HTML.putUserOutput("SalesTaxDeduction",		TaxFormObj.getValue("SalesTax", "08"));
}

document.addEventListener("DOMContentLoaded", () => {
	//
	// Wait for the DOM to be fully loaded before trying to access any elements.
	//
	HTML.addListener("tax-year",				"change", changeHandler);
	HTML.addListener("StreetAddress",			"change", changeAddressHandler);
	HTML.addListener("City",					"change", changeAddressHandler);
	HTML.addListener("ZipCode",					"change", changeAddressHandler);
	HTML.addListener("FamilySize",				"change", changeHandler);
	HTML.addListener("ExtraSalesTax",			"change", changeHandler);

	HTML.addListener("Wages",					"change", changeHandler);
	HTML.addListener("TaxExemptInterest",		"change", changeHandler);
	HTML.addListener("TaxableInterest",			"change", changeHandler);
	HTML.addListener("QualifiedDividends",		"change", changeHandler);
	HTML.addListener("OrdinaryDividends",		"change", changeHandler);
	HTML.addListener("RetirementAccounts",		"change", changeHandler);
	HTML.addListener("SocialSecurity",			"change", changeHandler);
	HTML.addListener("CapitalGains",			"change", changeHandler);
	HTML.addListener("SelfEmploymentIncome",	"change", changeHandler);
	HTML.addListener("OtherIncome",				"change", changeHandler);

	HTML.hideElement("debug-container");
});
