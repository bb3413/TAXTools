
import { Dates }		from "../Library/Modules/Dates.js";
import { Debug }		from "../Library/Modules/Debug.js";
import { HTML }			from "../Library/Modules/HTML.js";
import { TaxFormObj }	from "../Library/Modules/TaxFormObj.js";
import { TaxTable }		from "../Library/Modules/TaxTable.js";

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

		const inputs = getInputs();							// Get inputs from the web page
		TaxTable.getTaxTable(inputs.tax_year);				// Initialize tax tables
		mapInputValues(inputs);								// Map input values to tax forms
		putOutputs(inputs);									// Put results on web page
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

	// Income
	inputs.sales					= HTML.getUserInput("Sales");
	inputs.returns					= HTML.getUserInput("Returns");
	inputs.cost						= HTML.getUserInput("Cost");
	inputs.other_income				= HTML.getUserInput("OtherIncome");
	inputs.home_office_expense		= HTML.getUserInput("HomeOfficeExpense");

	// Expenses
	inputs.medical_insurance		= HTML.getUserInput("MedicalInsurance");
	inputs.advertising				= HTML.getUserInput("Advertising");
	inputs.car_and_truck			= HTML.getUserInput("CarAndTruck");
	inputs.car_and_truck_miles		= HTML.getUserInput("CarAndTruckMiles");
	inputs.commissions_and_fees		= HTML.getUserInput("CommissionsAndFees");
	inputs.contract_labor			= HTML.getUserInput("ContractLabor");
	inputs.depletion				= HTML.getUserInput("Depletion");
	inputs.depreciation				= HTML.getUserInput("Depreciation");
	inputs.employee_benefit_programs= HTML.getUserInput("EmployeeBenefitPrograms");
	inputs.insurance				= HTML.getUserInput("Insurance");
	inputs.interest					= HTML.getUserInput("Interest");
	inputs.professional_services	= HTML.getUserInput("ProfessionalServices");
	inputs.office_expenses			= HTML.getUserInput("OfficeExpenses");
	inputs.pension_plan				= HTML.getUserInput("PensionPlan");
	inputs.rent						= HTML.getUserInput("Rent");
	inputs.repairs					= HTML.getUserInput("Repairs");
	inputs.supplies					= HTML.getUserInput("Supplies");
	inputs.taxes_and_licenses		= HTML.getUserInput("TaxesAndLicenses");
	inputs.travel					= HTML.getUserInput("Travel");
	inputs.utilities				= HTML.getUserInput("Utilities");
	inputs.wages					= HTML.getUserInput("Wages");
	inputs.other_expenses			= HTML.getUserInput("OtherExpenses");

	return inputs;
}

function mapInputValues(inputs) {
	const tt		= TaxTable.getTaxTable();
	const f1040SC	= TaxFormObj.createForm("F1040SC");
	const f7206		= TaxFormObj.createForm("F7206");	// SE Health Insurance Deduction

	// Income
	f1040SC.lines["01"].user_value	= inputs.sales;
	f1040SC.lines["02"].user_value	= inputs.returns;
	f1040SC.lines["04"].user_value	= inputs.cost;
	f1040SC.lines["06"].user_value	= inputs.other_income;
	f1040SC.lines["30"].user_value	= inputs.home_office_expense;

	// Expenses
	let car_and_truck = inputs.car_and_truck;
	if (car_and_truck === 0) {
		car_and_truck = tt.getBusinessMileageDeduction(inputs.car_and_truck_miles);
	}
	f1040SC.lines["08" ].user_value	= inputs.advertising;
	f1040SC.lines["09" ].user_value	= car_and_truck;
	f1040SC.lines["10" ].user_value	= inputs.commissions_and_fees;
	f1040SC.lines["11" ].user_value	= inputs.contract_labor;
	f1040SC.lines["12" ].user_value	= inputs.depletion;
	f1040SC.lines["13" ].user_value	= inputs.depreciation;
	f1040SC.lines["14" ].user_value	= inputs.employee_benefit_programs;
	f1040SC.lines["15" ].user_value	= inputs.insurance;
	f1040SC.lines["16a"].user_value	= inputs.interest;
	f1040SC.lines["17" ].user_value	= inputs.professional_services;
	f1040SC.lines["18" ].user_value	= inputs.office_expenses;
	f1040SC.lines["19" ].user_value	= inputs.pension_plan;
	f1040SC.lines["20a"].user_value	= inputs.rent;
	f1040SC.lines["21" ].user_value	= inputs.repairs;
	f1040SC.lines["22" ].user_value	= inputs.supplies;
	f1040SC.lines["23" ].user_value	= inputs.taxes_and_licenses;
	f1040SC.lines["24a"].user_value	= inputs.travel;
	f1040SC.lines["25" ].user_value	= inputs.utilities;
	f1040SC.lines["26" ].user_value	= inputs.wages;
	f1040SC.lines["27b"].user_value	= inputs.other_expenses;

	f7206.lines["01"].user_value	= inputs.medical_insurance;
}

function putOutputs(inputs) {
	//
	// Get the information we are interested in and write them to the web page.
	//
	const retirement_contributions	= 0;
	const net_profit				= TaxFormObj.getValue("F1040SC",	"31");
	const se_tax					= TaxFormObj.getValue("F1040SSE", "12");
	const sehi_adjustment			= TaxFormObj.getValue("F7206", "14");
	const qbi_deduction				= Math.round(Math.max(0, net_profit -
										(se_tax / 2) -
										retirement_contributions -
										sehi_adjustment) * 0.20);

	HTML.putUserOutput("GrossProfit",
					   TaxFormObj.getValue("F1040SC", "05"));
	HTML.putUserOutput("GrossIncome",
					   TaxFormObj.getValue("F1040SC", "07"));
	HTML.putUserOutput("NetProfit",
					   net_profit);
	HTML.putUserOutput("SelfEmploymentTax",
					   se_tax);
	HTML.putUserOutput("QBI_Deduction",
					   qbi_deduction);
	HTML.putUserOutput("SelfEmploymentTaxAdjustment",
					   Math.round(se_tax / 2));

	HTML.putUserOutput("NetProfitAfterSEHI",
						Math.max(0, net_profit - sehi_adjustment));
	HTML.putUserOutput("SEHI_Adjustment",
						sehi_adjustment);
	HTML.putUserOutput("MedicalDeduction",
						Math.max(0, inputs.medical_insurance - sehi_adjustment));

	HTML.putUserOutput("TotalExpenses",
						TaxFormObj.getValue("F1040SC", "28"));
}

document.addEventListener("DOMContentLoaded", () => {
	//
	// Wait for the DOM to be fully loaded before trying to access any elements.
	//

	// Income
	HTML.addListener("Sales",					"change", changeHandler);
	HTML.addListener("Returns",					"change", changeHandler);
	HTML.addListener("Cost",					"change", changeHandler);
	HTML.addListener("OtherIncome",				"change", changeHandler);
	HTML.addListener("HomeOfficeExpense",		"change", changeHandler);
	// HTML.addListener("GrossIncome",			"change", changeHandler);

	// Expenses
	HTML.addListener("Advertising",				"change", changeHandler);
	HTML.addListener("CarAndTruck",				"change", changeHandler);
	HTML.addListener("CarAndTruckMiles",		"change", changeHandler);
	HTML.addListener("CommissionsAndFees",		"change", changeHandler);
	HTML.addListener("ContractLabor",			"change", changeHandler);
	HTML.addListener("Depletion",				"change", changeHandler);
	HTML.addListener("Depreciation",			"change", changeHandler);
	HTML.addListener("EmployeeBenefitPrograms",	"change", changeHandler);
	HTML.addListener("Insurance",				"change", changeHandler);
	HTML.addListener("Interest",				"change", changeHandler);
	HTML.addListener("ProfessionalServices",	"change", changeHandler);
	HTML.addListener("MedicalInsurance",		"change", changeHandler);
	HTML.addListener("OfficeExpenses",			"change", changeHandler);
	HTML.addListener("PensionPlan",				"change", changeHandler);
	HTML.addListener("Rent",					"change", changeHandler);
	HTML.addListener("Repairs",					"change", changeHandler);
	HTML.addListener("Supplies",				"change", changeHandler);
	HTML.addListener("TaxesAndLicenses",		"change", changeHandler);
	HTML.addListener("Travel",					"change", changeHandler);
	HTML.addListener("Utilities",				"change", changeHandler);
	HTML.addListener("Wages",					"change", changeHandler);
	HTML.addListener("OtherExpenses",			"change", changeHandler);
	// HTML.addListener("TotalExpenses",		"change", changeHandler);

	// Using autofocus attribute scrolls the page to that element; this will move the
	// focus but display the page without scrolling to that element.
	const Sales = document.getElementById('Sales');
	Sales.focus({
		preventScroll: true
	});

	HTML.hideElement("debug-container");
});
