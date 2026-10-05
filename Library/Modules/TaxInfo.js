
//
// This module calculates information from the current tax forms.
//

export const TaxInfo = {
	earnedIncome,
	formsInPrintOrder,
	getBusinessIncome,
	getBusinessNames,
	getIRAValue,
	getPensionValue,
	getStateWithholding,
	getW2OvertimePay,
	getW2RetirementContributions,
	getW2TipIncome,
	hasRetirementPlan,
};

import { Classes }		from "../Modules/Classes.js";
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";

// Which retirement plan
const IRA		= 0;
const PENSION	= 1;

const print_order = [
	"F1040",
	"F1040S1",
	"F1040S1A",
	"F1040S2",
	"F1040S3",
	"F1040SA",
	"F1040SB",
	"F1040SC",
	"F1040SD",
	"F1040SE",
	"F1040SSE",
	"F1041",
	"F1065B",
	"F1120S",
	"F2441",
	"F6251",
	"F7206",
	"F8880",
	"F540",
	"F540CA",
];

//----------  Local Functions ---------------------------------------------------------------
function get1099RValue(lineno, type) {
	//
	// Form 1099-R is used to report distributions from both IRAs and pensions. Box 7B
	// is used to indicate if a 1099-R is for an IRA or pansion.
	//
	// This function will scan all 1099-Rs that are either IRAs or pensions and sum the
	// values from the indicated line. The ira pparameter indicates which type of 1099-R
	// to collect information from.
	//
	let sum = 0;
	let form_list = TaxFormObj.getAllForms("F1099R");

	if (form_list) {
		for (const form of form_list) {
			if (!form.calculated) {
				// When simplified methood is supported, 1099-Rs will need to be
				// calculated before they are accessed.
				form.calculate();
			}

			let is_ira = form.lines["07b"].value;
			if (((type === IRA) && is_ira) || ((type !== IRA) && !is_ira) ) {
				sum += form.lines[lineno].value;
			}
		}
	}

	return sum;
}

//----------  Exported Functions ------------------------------------------------------------
function earnedIncome() {
	return (
		TaxFormObj.getValue("F1040",	"01z") +	// Earned income
		TaxFormObj.getValue("F1040",	"01i") +	// Non-taxable combat pay
		TaxFormObj.getValue("F1040S1",	"02a") +	// Alimont received
		TaxFormObj.getValue("F1040S1",	"03")  +	// Business income
		TaxFormObj.getValue("F1040S1",	"06")  +	// Farm income
		TaxFormObj.getValue("F1040S1",	"08r") +	// Scholarships not on W-2
		TaxFormObj.getValue("F1040S1",	"08t") +	// Pension from 457 plan
		TaxFormObj.getValue("F1040S1",	"08u")		// Prison pay
	);
}

function formsInPrintOrder() {
	let forms = [];

	for (let formname of print_order) {
		let more_forms = TaxFormObj.getAllForms(formname);
		for (let next_form of more_forms) {
			forms.push(next_form);
		}
	}

	return forms;
}

function getBusinessIncome(business_name) {
	let sum = 0;
	const all_1099s = TaxFormObj.getAllForms("F1099NEC")
						.concat(TaxFormObj.getAllForms("F1099MISC"))
		
	for (const form of all_1099s) {
		let bus_name = "NO_NAME";
		if (form.lines["business_name"]) {
			bus_name = form.lines["business_name"];
		}

		if (bus_name.toUpperCase === business_name.toUpperCase) {
			if (form.formname === "F1099NEC") {
				if (form.lines["01a"] !== undefined) {
					sum += form.lines["01a"].value;
				}
			} else {
				if (form.lines["01"] !== undefined) {
					sum += form.lines["01"].value;	// Rents
				}
				if (form.lines["02"] !== undefined) {
					sum += form.lines["02"].value;	// Royalties
				}
				if (form.lines["03"] !== undefined) {
					sum += form.lines["03"].value;	// Other income
				}
				if (form.lines["05"] !== undefined) {
					sum += form.lines["05"].value;	// Fishing boat proceeds
				}
			}
		}
	}

	return sum;
}

function getBusinessNames() {
	//
	// This is a bad function becuase it does not include business names from
	// Schedule Cs. That's because it is used to determine if a Schedule C needs to be
	// created.  REDESIGN THIS.
	//
	let business_names = [];
	let business_forms = TaxFormObj.getAllForms("F1099NEC")
							.concat(TaxFormObj.getAllForms("F1099MISC"));

	for (const form of business_forms) {
		let business_name = "NO_NAME";
		if (form.lines["business_name"]) {
			business_name = form.lines["business_name"].toUpperCase;
		}

		if (!business_names.includes(business_name) ) {
			name.push(business_name);
		}
	}

	return business_names;
}

function getIRAValue(lineno) {
	return get1099RValue(lineno, IRA);
}

function getPensionValue(lineno) {
	return get1099RValue(lineno, PENSION);
}

function getStateWithholding() {
	return (	// return cannot be on a line by itself
		TaxFormObj.getValue("W2",			"17") +
		TaxFormObj.getValue("F1099INT",		"17") +
		TaxFormObj.getValue("F1099DIV",		"16") +
		TaxFormObj.getValue("F1099G",		"12") +
		TaxFormObj.getValue("F1099K",		"06") +
		TaxFormObj.getValue("F1099MISC",	"16") +
		TaxFormObj.getValue("F1099MISC",	"05") +
		TaxFormObj.getValue("F1099OID",		"14") +
		TaxFormObj.getValue("F1099R",		"14")
	);
}

function getW2OvertimePay() {
	let overtime_pay = 0;
	let form_list = TaxFormObj.getAllForms("W2");

	if (form_list) {
		for (const form of form_list) {
			overtime_pay += form.getBox12("TT");
		}
	}

	return overtime_pay;
}

function getW2RetirementContributions(who) {
	//
	// Get the retirement contributions withheld from the taxpayer wages for either
	// the taxpayer or the spouse.
	//
	let contributions = 0;
	let form_list = TaxFormObj.getAllForms("W2");

	if (form_list) {
		for (const form of form_list) {
			if (form.isTaxpayers(who)) {
				// This method is only implemed by the W-2 form.
				contributions += form.getRetirementContributions();
			}
		}
	}

	return contributions;
}

function getW2TipIncome() {
	let tip_income = 0;
	let form_list = TaxFormObj.getAllForms("W2");

	if (form_list) {
		for (const form of form_list) {
			let tips = form.getTipIncome();
			if (tips !== 0) {
				tip_income += tips;
			} else {
				tip_income += form.lines["07"].value;
				tip_income += form.lines["08"].value;
			}
		}
	}

	return tip_income;
}

function hasRetirementPlan(who) {
	let form_list = TaxFormObj.getAllForms("W2");
	if (form_list) {
		for (const form of form_list) {
			if (form.isTaxpayers(who) && form.line("13b")) {
				return true;
			}
		}
	}

	return false;
}
