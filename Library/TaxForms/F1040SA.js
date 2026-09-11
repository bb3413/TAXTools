
import { Debug }		from "../Modules/Debug.js";
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";

export class F1040SA extends TaxForm {
	constructor(formname) {
		Debug.enter("F1040SA.Constructor()");
		super(formname);
		this.title = `Schdeule A - Itemized Deductions`;

		// These fields can be used to enter information that does not come from another
		// tax form.
		this.medical_insurance		= 0;
		this.medicare				= 0;
		this.medical_expenses		= 0;
		this.est_payments_state		= 0;
		this.sales_tax_rate			= 0;
		this.extra_sales_tax		= 0;
		this.property_tax			= 0;
		this.personal_property_tax	= 0;
		this.cash_donations			= 0;
		this.noncash_donations		= 0;

		this.lines["01"]	= new Line("Medical Expenses");
		this.lines["02"]	= new Line("AGI");
		this.lines["03"]	= new Line("7.5% or AGI");
		this.lines["04"]	= new Line("Medical Deduction");
		this.lines["05a"]	= new Line("State and Local Income Tax");
		this.lines["05b"]	= new Line("Real Estate Tax");
		this.lines["05c"]	= new Line("Personal Property Tax");
		this.lines["05d"]	= new Line("Total State and Local Taxes");
		this.lines["05e"]	= new Line("SALT after Limit");
		this.lines["06"]	= new Line("Other Taxes");
		this.lines["07"]	= new Line("Deduction for Taxes Paid");
		this.lines["08a"]	= new Line("Mortgage Interest");
		this.lines["08b"]	= new Line("Mortgage Interest Not from 1098");
		this.lines["08c"]	= new Line("Mortgage Points Not from 1098");
		this.lines["08d"]	= new Line("Reserved For Future Use");
		this.lines["08e"]	= new Line("Mortgage Deduction");
		this.lines["09"]	= new Line("Investment Interest");
		this.lines["10"]	= new Line("Interest Deduction");
		this.lines["11"]	= new Line("Cash Donations");
		this.lines["12"]	= new Line("Non-cash Donatons");
		this.lines["13"]	= new Line("Carry-over Donations");
		this.lines["14"]	= new Line("Donation Deduction");
		this.lines["15"]	= new Line("Casualty and Theft Deduction");
		this.lines["16"]	= new Line("Other Deduction");
		this.lines["17"]	= new Line("Itemized Deductions");

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

		this.lines["01"].value	= this.calculateMedicalExpenses();
		this.lines["02"].value	= TaxFormObj.getValue("F1040", "11b");	// AGI
		this.lines["03"].value	= Math.round(this.line("02") * 0.075);	// 7.5% or AGI
		this.lines["04"].value	= Math.max(0, this.subtract("01", "03"));// Medical Deduction
		this.lines["05a"].value	= Math.max(							// State tax
									this.calculateStateIncomeTax(),	// Inc tax, or
									this.calculateSalesTax());		// Sales tax
		this.lines["05b"].value	= this.property_tax;				// Real Estate Tax
		this.lines["05c"].value	= this.personal_property_tax;		// Personal Property Tax
		this.lines["05d"].value	= this.add("05a","05b","05c");		// SALT
		this.lines["05e"].value	= Math.min(this.line("05d"),		// SALT after Limit
									tt.getTaxValue("MaxSALT", tp.filing_status));
		this.lines["06"].value	= 0;								// Other Taxes
		this.lines["07"].value	= this.add("05e","06");				// Deduction for Taxes
		this.lines["08a"].value	= TaxFormObj.getValue("F1098", "01"); // Mortgage Interest
		this.lines["08b"].value	= 0;								// Mortgage Interest
		this.lines["08c"].value	= 0;								// Mortgage Points
		this.lines["08d"].value	= 0;								// Reserved
		this.lines["08e"].value	= this.add("08a","08b","08c");		// Mortgage Deduction
		this.lines["09"].value	= 0;								// Investment Interest
		this.lines["10"].value	= this.add("08e","09");				// Interest Deduction
		this.lines["11"].value	= this.cash_donations;		// Cash Donations
		this.lines["12"].value	= this.noncash_donations;	// Non-cash Donatons
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
	calculateMedicalExpenses() {
		const medicare =	// Choose Medicare entered as expense or from SSA-1099
			Math.max(this.medicare,
				TaxFormObj.getValue("SSA1099", "03a") +		// Part B
				TaxFormObj.getValue("SSA1099", "03b"));		// Part D

		return medicare +
				this.medical_insurance +
				this.medical_expenses;
	}

	calculateSalesTax() {
		// Calculate sales tax deduction.
		return
			TaxFormObj.getForm("SalesTax").calculate(this.sales_tax_rate) +
			this.extra_sales_tax;
	}

	calculateStateIncomeTax() {
		// Estimated payments + withholding
		return
			this.est_payments_state +
			TaxFormObj.getValue("W2", "17") +
			TaxFormObj.getValue("F1099INT", "17") +
			TaxFormObj.getValue("F1099DIV", "16") +
			TaxFormObj.getValue("F1099G", "12") +
			TaxFormObj.getValue("F1099K", "06") +
			TaxFormObj.getValue("F1099MISC", "16") +
			TaxFormObj.getValue("F1099MISC", "05") +
			TaxFormObj.getValue("F1099OID", "14") +
			TaxFormObj.getValue("F1099R", "14");
	}
}
