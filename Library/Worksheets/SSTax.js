
//
// This is the Social Security Benefits Worksheet from the
// 1040 Instructions (TY2025), lines 6a and 6b, page 32.
//
import { Debug }		from "../Modules/Debug.js";
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";

export class SSTax extends TaxForm {
	constructor(formname) {
		Debug.enter("SSTax.Constructor()");
		super(formname);

		this.lines["01"]	= new Line("Sum of all SSA-1099, box 5");
		this.lines["02"]	= new Line("Half of total SS benefits");
		this.lines["03"]	= new Line("Income w/o SS");
		this.lines["04"]	= new Line("Tax Exempt Interest");
		this.lines["05"]	= new Line("Not used");
		this.lines["06"]	= new Line("Add Lines 2, 3, 4, and 5");
		this.lines["07"]	= new Line("Adjustments");
		this.lines["08"]	= new Line("SS income");
		this.lines["09"]	= new Line("Start of 50% Taxable Range");
		this.lines["10"]	= new Line("Amount Above Base of Range") ;
		this.lines["11"]	= new Line("Length of 50% Taxable Range");
		this.lines["12"]	= new Line("Amount Above Top of Range");
		this.lines["13"]	= new Line("Amount Within Range");
		this.lines["14"]	= new Line("50% of Amount Within Range");
		this.lines["15"]	= new Line("At Most 50% is Taxable");
		this.lines["16"]	= new Line("85% of Amount Above Range");
		this.lines["17"]	= new Line("Taxable Amount");
		this.lines["18"]	= new Line("At Most 85% is Taxable");
		this.lines["19"]	= new Line("Taxable Amount");

		Debug.exit("SSTax.Constructor()");
	}

	calculate(
		filing_status		= undefined,
		ss_income			= undefined,
		income_wo_ss		= undefined,
		tax_exempt_int		= undefined,
		student_loan_int	= undefined,
		adjustments			= undefined,
		lived_with_spouse	= undefined,
	) {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("SSTax.calculate()");
		this.calculated = true;
		const tt = TaxTable.getTaxTable();
		const tp = Taxpayer.getTaxpayer();

		// Input values
		if (filing_status === undefined) {
			filing_status = tp.filing_status;
		}
		if (ss_income === undefined) {
			ss_income = TaxFormObj.getValue("F1040", "06a");
		}
		if (income_wo_ss === undefined) {
			income_wo_ss = TaxFormObj.getValue("F1040", "01z","02b","03b",
											   "04b","05b","07","08");
		}
		if (tax_exempt_int === undefined) {
			tax_exempt_int = TaxFormObj.getValue("F1040", "02a");
		}
		if (student_loan_int === undefined) {
			student_loan_int = TaxFormObj.getValue("F1040S1", "21");
		}
		if (adjustments === undefined) {
			adjustments = TaxFormObj.getValue("F1040", "10");
		}
		if (lived_with_spouse === undefined) {
			lived_with_spouse = tp.lived_with_spouse;
		}

		// Start of worksheet
		this.lines["01"].value	= ss_income;						// Sum all SSA-1099, bx 5
		this.lines["02"].value	= Math.round(this.line("01") / 2);	// Half of total SS
		this.lines["03"].value	= income_wo_ss;						// Income w/o SS
		this.lines["04"].value	= tax_exempt_int;					// Tax Exempt Interest
		this.lines["05"].value	= 0;								// Not used
		this.lines["06"].value	= this.add("02","03","04","05");
		this.lines["07"].value	= adjustments - student_loan_int;	// Adjustments
		if (this.line("07") >= this.line("06")) {
			this.lines["19"].value = 0;
			return 0;
		}
		this.lines["08"].value	= Math.max(0, this.subtract("06", "07"));	// SS income
		if ((filing_status === "MFS") && lived_with_spouse) {
			this.lines["17"].value = this.line("08") * 0.85;				// 85%
		} else {
			this.lines["09"].value = tt.get_SS_Start_50(filing_status);	// Start of 50% range
			if (this.line("09") >= this.line("08")) {
				this.lines["19"].value = 0;
				return 0;
			}
			this.lines["10"].value	= Math.max(0, this.subtract("08","09"));// Amount over
			this.lines["11"].value	= tt.get_SS_50_Range(filing_status);	// Len of range
			this.lines["12"].value	= Math.max(0, this.subtract("10","11"));// Amt over range
			this.lines["13"].value	= this.min("10","11");			// Amount within range
			this.lines["14"].value	= this.line("13") * 0.50;		// 50% of amt in range
			this.lines["15"].value	= this.min("02","14");			// At Most 50% taxable
			this.lines["16"].value	= this.line("12") * 0.85;		// 85% of amt over range
			this.lines["17"].value	= this.add("15","16");			// Taxable amount
		}
		this.lines["18"].value	= this.line("01") * 0.85;			// At Most 85% is taxable
		this.lines["19"].value	= Math.round(this.min("17","18"));	// Taxable amount

		Debug.exit("SSTax.calculate()");
		return this.line("19");
	}
}
