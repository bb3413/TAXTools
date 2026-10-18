
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTML }			from "../Modules/HTML.js";
import { Line }			from "../Classes/Line.js";
import { Objects }		from "../Modules/Objects.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxInfo }		from "../Modules/TaxInfo.js";
import { TaxTable }		from "../Modules/TaxTable.js";
import { F1040SC_HTML }	from "../OutputForms/F1040SC_HTML.js";

export class F1040SC extends TaxForm {
	constructor(formname) {
		Debug.enter("F1040SC.Constructor()");
		super(formname);
		this.title = `Schedule C - Profit or Loss From Business`;

		// Variables for external input. This variable is be used to enter information
		// that does not come from another tax form.
		this.cash_inccome	= 0;

		this.lines["name"]	= new Line("Business Name");

		// Income
		this.lines["01"]	= new Line("Gross Receipts or Sales");
		this.lines["02"]	= new Line("Returns and Allowances");
		this.lines["03"]	= new Line("Line 1 - Line 2");
		this.lines["04"]	= new Line("Cost of Goods Sold");
		this.lines["05"]	= new Line("Gross Profit");
		this.lines["06"]	= new Line("Other Income");
		this.lines["07"]	= new Line("Gross Income");

		// Expenses
		this.lines["08"]	= new Line("Advertising");
		this.lines["09"]	= new Line("Car and Truck Expense");
		this.lines["10"]	= new Line("Commission and Fees");
		this.lines["11"]	= new Line("Contract Labor");
		this.lines["12"]	= new Line("Depletion");
		this.lines["13"]	= new Line("Depreciation");
		this.lines["14"]	= new Line("Employee Benefit Programs");
		this.lines["15"]	= new Line("Insurance");
		this.lines["16a"]	= new Line("Mortgage Interest");
		this.lines["16b"]	= new Line("Other Interest");
		this.lines["17"]	= new Line("Professional Services");
		this.lines["18"]	= new Line("Office Expenses");
		this.lines["19"]	= new Line("Pension Plan");
		this.lines["20a"]	= new Line("Rent Machinery");
		this.lines["20b"]	= new Line("Rent Other");
		this.lines["21"]	= new Line("Repairs and Maintenance");
		this.lines["22"]	= new Line("Supplies");
		this.lines["23"]	= new Line("Taxes and Licenses");
		this.lines["24a"]	= new Line("Travel");
		this.lines["24b"]	= new Line("Travel Meals");
		this.lines["25"]	= new Line("Utilities");
		this.lines["26"]	= new Line("Wages");
		this.lines["27a"]	= new Line("Energy Efficiency Deduction");
		this.lines["27b"]	= new Line("Other Expense");

		this.lines["28"]	= new Line("Total Expenses");
		this.lines["29"]	= new Line("Tentative profit");
		this.lines["30"]	= new Line("Business Use of Home Expense");
		this.lines["31"]	= new Line("Net Profit");

		Debug.exit("F1040SC.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F1040SC.calculate()");
		this.calculated = true;
		const tt = TaxTable.getTaxTable();

		this.lines["name"].value	= "";				//Business Name

		// Income
		this.lines["01"].value	= this.cash_inccome +	// Gross Receipts or Sales
									TaxInfo.getBusinessIncome(this.line("name"));
		this.lines["02"].value	= 0;				// Returns and Allowances
		this.lines["03"].value	= this.subtract("01", "02");
		this.lines["04"].value	= 0;				// Cost of Goods Sold
		this.lines["05"].value	= this.subtract("03", "04");	// Gross Profit
		this.lines["06"].value	= 0;				// Other Income
		this.lines["07"].value	= this.add("05", "06");// Gross Income

		// Expenses
		this.lines["08"].value	= 0;				// Advertising
		this.lines["09"].value	= 0;				// Car and Truck Expense
		this.lines["10"].value	= 0;				// Commission and Fees
		this.lines["11"].value	= 0;				// Contract Labor
		this.lines["12"].value	= 0;				// Depletion
		this.lines["13"].value	= 0;				// Depreciation
		this.lines["14"].value	= 0;				// Employee Benefit Programs
		this.lines["15"].value	= 0;				// Insurance
		this.lines["16a"].value	= 0;				// Mortgage Interest
		this.lines["16b"].value	= 0;				// Other Interest
		this.lines["17"].value	= 0;				// Professional Services
		this.lines["18"].value	= 0;				// Office Expenses
		this.lines["19"].value	= 0;				// Pension Plan
		this.lines["20a"].value	= 0;				// Rent Machinery
		this.lines["20b"].value	= 0;				// Rent Other
		this.lines["21"].value	= 0;				// Repairs and Maintenance
		this.lines["22"].value	= 0;				// Supplies
		this.lines["23"].value	= 0;				// Taxes and Licenses
		this.lines["24a"].value	= 0;				// Travel
		this.lines["24b"].value	= 0;				// Travel Meals
		this.lines["25"].value	= 0;				// Utilities
		this.lines["26"].value	= 0;				// Wages
		this.lines["27a"].value	= 0;				// Energy Efficiency Deduction
		this.lines["27b"].value	= 0;				// Other Expense

		this.lines["28"].value	= this.add("08","09","10","11","12",
										   "13","14","15","16a","16b",
										   "17","18","19","20a","20b",
										   "21","22","23","24a","24b",
										   "25","26","27a","27b");	// Total Expenses
		this.lines["29"].value	= this.subtract("07", "28");	// Tentative profit
		this.lines["30"].value	= 0;				// Business Use of Home Expense
		this.lines["31"].value	= this.subtract("29", "30");	// Net Profit

		Debug.exit("F1040SC.calculate()");
	}

	getHTML(uid) {
		if (!uid) {
			throw new Error(`${this.formname}.getHTML(): UID is undefined.`);
		}

		const html = HTML_CODE.replace(/XX/g, uid)
								.replace(/202X/g, TaxTable.getTaxYear());

		return [ `f1040sc-${uid}-container`, html ];
	}

	loadUserInputs(inputs) {
		//
		// Initialize the for from the fields in the object instance passed.
		//
		for (const key of Object.keys(inputs)) {
			if (this.lines[key] && inputs[key]) {
				this.lines[key].user_value = inputs[key];
			}
		}
	}
}
