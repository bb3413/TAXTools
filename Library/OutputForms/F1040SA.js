
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
		this.title		= `Schedule A - Itemized Deductions`;
		this.sales_tax	= TaxFormObj.getOrCreateForm("SalesTax");

		// Variables for external input. These variables are used to enter information
		// that does not come from another tax form.
		this.medical_insurance		= 0;
		this.medicare				= 0;
		this.medical_expenses		= 0;
		this.est_payments_state		= 0;
		this.state_tax_due			= 0;
		this.sales_tax_rate			= 0;
		this.extra_sales_tax		= 0;
		this.property_tax			= 0;
		this.personal_property_tax	= 0;
		this.cash_donations			= 0;
		this.noncash_donations		= 0;

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

		this.sales_tax.resetCalculation();

		this.lines["01"].value	= this.getMedicalExpenses();
		this.lines["02"].value	= TaxFormObj.getValue("F1040", "11b");	// AGI
		this.lines["03"].value	= Math.round(this.line("02") * 0.075);	// 7.5% or AGI
		this.lines["04"].value	= Math.max(0, this.subtract("01", "03"));// Medical Deduction
		this.lines["05a"].value	= Math.max(							// State tax
									this.getStateIncTaxPaid(),		// Inc tax, or
									this.getSalesTax());			// Sales tax
		this.lines["05b"].value	= this.property_tax;				// Real Estate Tax
		this.lines["05c"].value	= this.personal_property_tax;		// Personal Property Tax
		this.lines["05d"].value	= this.add("05a","05b","05c");		// SALT
		this.lines["05e"].value	= Math.min(this.line("05d"),		// SALT after Limit
									tt.getTaxValue("MaxSALT"));
		this.lines["06"].value	= 0;								// Other Taxes
		this.lines["07"].value	= this.add("05e","06");				// Deduction for Taxes
		this.lines["08a"].value	= TaxFormObj.getValue("F1098", "01"); // Mortgage Interest
		this.lines["08b"].value	= 0;								// Mortgage Interest
		this.lines["08c"].value	= 0;								// Mortgage Points
		this.lines["08d"].value	= 0;								// Reserved
		this.lines["08e"].value	= this.add("08a","08b","08c");		// Mortgage Deduction
		this.lines["09"].value	= 0;								// Investment Interest
		this.lines["10"].value	= this.add("08e","09");				// Interest Deduction
		this.lines["11"].value	= this.cash_donations;				// Cash Donations
		this.lines["12"].value	= this.noncash_donations;			// Non-cash Donations
		this.lines["13"].value	= 0;								// Carry-over Donations
		this.lines["14"].value	= this.add("11","12","13");			// Donation Deduction
		this.lines["15"].value	= 0;								// Casualty and Theft
		this.lines["16"].value	= 0;								// Other Deduction
		this.lines["17"].value	= this.add("04","07","10","14",
										   "15","16");				// Itemized Deductions

		Debug.exit("F1040SA.calculate()");
	}

	//
	// Utility functions
	//
	getMedicalExpenses() {
		const medicare =	// Choose Medicare entered as expense or from SSA-1099
			Math.max(this.medicare,
				TaxFormObj.getValue("SSA1099", "03a") +		// Part B
				TaxFormObj.getValue("SSA1099", "03b"));		// Part D

		return medicare +
				this.medical_insurance +
				this.medical_expenses;
	}

	getSalesTax() {
		// Calculate sales tax deduction.
		return (	// return cannot be on a line by itself
			this.sales_tax.calculate(this.sales_tax_rate) +
			this.extra_sales_tax
		);
	}

	getStateIncTaxPaid() {
		// Estimated payments + withholding
		return (	// return cannot be on a line by itself
			this.est_payments_state +
			this.state_tax_due +
			TaxInfo.getStateWithholding()
		);
	}
}
