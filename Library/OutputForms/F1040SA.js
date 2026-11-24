
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxInfo }		from "../Modules/TaxInfo.js";
import { TaxTable }		from "../Modules/TaxTable.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";
import { F1040SA_HTML }	from "../OutputForms/F1040SA_HTML.js";

export class F1040SA extends TaxForm {
	constructor(formname) {
		Debug.enter("F1040SA.Constructor()");
		super(formname);
		this.title = `Schedule A - Itemized Deductions`;

		// Create the lines on the form.
		let field_info = F1040SA_HTML.getFieldInfo();
		for (const field_name of Object.keys(field_info)) {
			if (field_info[field_name][1]) {
				this.lines[field_name]= new Line(field_info[field_name][2]);
			}
		}

		Debug.exit("F1040SA.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F1040SA.calculate()");
		this.calculated = true;
		const tt = TaxTable.getTaxTable();
		const tp = Taxpayer.getTaxpayer();

		// Medical Deductions
		this.lines["01"].value	= TaxInfo.getMedicalExpenses();
		this.lines["02"].value	= TaxFormObj.getValue("F1040", "11b");	// AGI
		this.lines["03"].value	= Math.round(this.line("02") * 0.075);	// 7.5% or AGI
		this.lines["04"].value	= Math.max(0, this.subtract("01", "03"));// Medical Deduction

		// Taxes Paid Deduction
		this.lines["05a"].value	= Math.max(							// State tax
									TaxInfo.getStateTaxPaid(),		// Inc tax, or
									TaxInfo.getSalesTaxPaid());		// Sales tax
		this.lines["05b"].value	= tp.property_tax;					// Real Estate Tax
		this.lines["05c"].value	= tp.personal_property_tax;			// Personal Property Tax
		this.lines["05d"].value	= this.add("05a","05b","05c");		// SALT
		this.lines["05e"].value	= Math.min(this.line("05d"),		// SALT after Limit
									tt.getTaxValue("MaxSALT"));
		this.lines["06"].value	= 0;								// Other Taxes
		this.lines["07"].value	= this.add("05e","06");				// Taxes Paid Deduction

		// Interest Paid Deduction
		this.lines["08a"].value	= TaxFormObj.getValue("F1098", "01"); // Mortgage Interest
		this.lines["08b"].value	= 0;								// Mortgage Interest
		this.lines["08c"].value	= 0;								// Mortgage Points
		this.lines["08d"].value	= 0;								// Reserved
		this.lines["08e"].value	= this.add("08a","08b","08c");		// Mortgage Deduction
		this.lines["09"].value	= 0;								// Investment Interest
		this.lines["10"].value	= this.add("08e","09");				// Interest Deduction

		// Gifts to Charity
		this.lines["11"].value	= tp.cash_donations;				// Cash Donations
		this.lines["12"].value	= tp.non_cash_donations +			// Non-cash Donations
									tt.getCharitableMileageDeduction(tp.charitable_miles);
		this.lines["13"].value	= this.add("11","12");				// Donations after Limit
		this.lines["14"].value	= 0;								// Carry-over Donations
		this.lines["15"].value	= this.add("13","14");				// Donation Deduction

		// Total Itemized Deductions
		this.lines["16"].value	= 0;								// Casualty and Theft
		
		// Other Itemized Deductions
		this.lines["17a"].value	= 0;								// Gambling Losses
		this.lines["17b"].value	= 0;								// Disaster Loss
		this.lines["17c"].value	= 0;								// StdDed w/ Dis Loss
		this.lines["17d"].value	= 0;								// Casualty Loss
		this.lines["17e"].value	= 0;								// Federal Estate Tax
		this.lines["17f"].value	= 0;								// Amoritized Premium
		this.lines["17g"].value	= 0;								// Loss from Debt
		this.lines["17h"].value	= 0;								// Repayment from Claim
		this.lines["17i"].value	= 0;								// Unrecovered Investment
		this.lines["17j"].value	= 0;								// Impairment Expenses
		this.lines["17k"].value	=									// Educator expenses
			Math.max(0, tp.educator_expense_taxpayer -
					 	tt.getTaxValue("MaxEducatorExpenses")) +
			Math.max(0, tp.educator_expense_spouse -
					 	tt.getTaxValue("MaxEducatorExpenses"));
		this.lines["17z"].value	= this.add("17a","17b","17c","17d",	// Total Other Deduction
										   "17e","17f","17g","17h",
										   "17i","17j","17k");

		// Total Itemized Deductions
		this.lines["18"].value	= this.add("04","07","10","15","16","17z");

		Debug.exit("F1040SA.calculate()");
	}
}
