
//
// This is form 6251, Alternative Minimum Tax - Individual.
//
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";
import { F6251_HTML }	from "../OutputForms/F6251_HTML.js";

export class F6251 extends TaxForm {
	constructor(formname) {
		Debug.enter("F6251.Constructor()");
		super(formname);
		this.title = `6251 - Alternative Minimum Tax - Individuals`;

		// Create the lines on the form.
		let field_info = F6251_HTML.getFieldInfo();
		for (const field_name of Object.keys(field_info)) {
			if (field_info[field_name][1]) {
				this.lines[field_name]= new Line(field_info[field_name][2]);
			}
		}

		Debug.exit("F6251.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F6251.calculate()");
		this.calculated = true;
		const tt = TaxTable.getTaxTable();
		const tp = Taxpayer.getTaxpayer();

		// Input values
		const qualified_dividends	= TaxFormObj.getValue("F1040",		"03a");
		const capital_gains			= TaxFormObj.getValue("F1040",		"07a");
		const agi					= TaxFormObj.getValue("F1040",		"11b");
		const qbi_deduction			= TaxFormObj.getValue("F1040",		"13a");
		const total_deductions		= TaxFormObj.getValue("F1040",		"14");
		const taxable_income		= TaxFormObj.getValue("F1040",		"15");
		const income_tax			= TaxFormObj.getValue("F1040",		"16");
		const taxable_refund		= TaxFormObj.getValue("F1040S1",	"01");
		const senior_deduction		= TaxFormObj.getValue("F1040S1A",	"43");
		const itemized_deductions	= TaxFormObj.getValue("F1040SA",	"17");
		const taxes_paid_deduction	= TaxFormObj.getValue("F1040SA",	"07");
		const standard_deduction	= tt.getStandardDeduction();
		const itemized				= itemized_deductions > standard_deduction;

		// Form 6251, Part I - AMT Income
		this.lines["01a"].value	= total_deductions - senior_deduction;
		this.lines["01b"].value	= agi - this.line("01a");
		if (itemized) {
			this.lines["02a"].value = taxes_paid_deduction;
		} else {
			this.lines["02a"].value = standard_deduction;
		}
		
		// Fields 2b, 2f, and 2s are entered as positive numbers but subtracted from total.
		this.lines["02b"].value	= (taxable_refund);	// Subtract Taxable Refund
		this.lines["02c"].value	= 0;					// Investment Interest Expense
		this.lines["02d"].value	= 0;					// Depletion
		this.lines["02e"].value	= 0;					// Net Operating Loss Deduction
		this.lines["02f"].value	= (0);	// Subtract			Net Operating Loss Deduction
		this.lines["02g"].value	= 0;					// Int from Private Activity bonds
		this.lines["02h"].value	= 0;					// Qualified Small Business Stock
		this.lines["02i"].value	= 0;					// Exercise of Incentive Stock Opt
		this.lines["02j"].value	= 0;					// Estates and Trusts
		this.lines["02k"].value	= 0;					// Disposition of Property
		this.lines["02l"].value	= 0;					// Post-1986 Depreciation
		this.lines["02m"].value	= 0;					// Passive Activities
		this.lines["02n"].value	= 0;					// Loss Limitations
		this.lines["02o"].value	= 0;					// Circulation Costs
		this.lines["02p"].value	= 0;					// Long-term Contracts
		this.lines["02q"].value	= 0;					// Mining Costs
		this.lines["02r"].value	= 0;					// Research and Experimental Costs
		this.lines["02s"].value	= (0);	// Subtract			Installment Sales
		this.lines["02t"].value	= 0;					// Intangible Drilling Costs
		this.lines["03"].value	= 0;					// Other Income

		// Convert to negative values
		for (const lineno of ["02b", "02f", "02s"]) {
			if (this.lines[lineno].value > 0) {
				this.lines[lineno]._value = this.lines[lineno].value * -1;
			}
		}

		this.lines["04"].value	= this.add("01b","02a","02b","02c",	// AMT Income
										   "02d","02e","02f","02g","02h","02i",
										   "02j","02k","02l","02m","02n","02o",
										   "02p","02q","02r","02s","02t","03");

		// Form 6251, Part III
		//
		// Calculate part I and III before II because par II references values from
		//the other parts.
		this.lines["12"].value	= this.line("06");					// AMT Inc - AMT Exempt
		this.lines["13"].value	= capital_gains + qualified_dividends;
		this.lines["14"].value	= 0;								// Leave blank for now.
		this.lines["15"].value	= this.add("13", "14");
		this.lines["16"].value	= this.min("12", "15");
		this.lines["17"].value	= this.subtract("12", "16");
		this.lines["18"].value	= tt.get_AMT_Tax(this.line("17"));
		this.lines["19"].value	= tt.getTaxValue("CG_15PercentRangeStart");
		this.lines["20"].value	= taxable_income;
		this.lines["21"].value	= Math.max(0, this.subtract("19", "20"));
		this.lines["22"].value	= this.min("12", "13");
		this.lines["23"].value	= this.min("21", "22");							// 0%
		this.lines["24"].value	= this.subtract("22", "23");
		this.lines["25"].value	= tt.getTaxValue("CG_20PercentRangeStart");
		this.lines["26"].value	= this.line("21");
		this.lines["27"].value	= taxable_income;
		this.lines["28"].value	= this.add("26", "27");
		this.lines["29"].value	= Math.max(0, this.subtract("25", "28"));
		this.lines["30"].value	= this.min("24", "29");
		this.lines["31"].value	= Math.round(this.line("30") * 0.15);			// 15%
		this.lines["32"].value	= this.add("23", "30");
		if (this.line("12") !== this.line("32")) {
			this.lines["33"].value	= this.subtract("22", "32");
			this.lines["34"].value	= Math.round(this.line("33") * 0.20);		// 20%
			if (this.line("14") !== 0) {
				this.lines["35"].value	= this.add("17", "32", "33");
				this.lines["36"].value	= this.subtract("12", "35");
				this.lines["37"].value	= Math.round(this.line("36") * 0.25);	// 25%
			}
		}
		this.lines["38"].value	= this.add("18", "31", "34", "37");
		this.lines["39"].value	= tt.get_AMT_Tax(this.line("12"));
		this.lines["40"].value	= this.min("38", "39");

		// Form 6251, Part II - Alternative Minimum Tax
		this.lines["05"].value	= tt.get_AMT_Exemption(this.line("04"));
		this.lines["06"].value	= this.subtract("04", "05");			// AMTInc - AMT Exemp
		if (this.line("06") > 0) {
			if ((capital_gains > 0) || (qualified_dividends > 0)) {
				this.lines["07"].value = this.line("40");
			} else {
				this.lines["07"].value = tt.get_AMT_Tax(this.line("06"));
			}
			this.lines["08"].value	= 0;								// Foreign tax credit
			this.lines["09"].value	= this.subtract("07", "08");		// AMT
		} else {	// AMT income is < AMT exemption, therefore AMT = 0
			this.lines["06"].value	= 0;
			this.lines["07"].value	= 0;
			this.lines["09"].value	= 0;								// AMT
			this.lines["11"].value	= 0;
		}
		this.lines["10"].value	= income_tax;	// 1040, line 16, normal income tax
		this.lines["11"].value	= Math.max(0, this.subtract("09", "10"));	// AMT

		Debug.exit("F6251.calculate()");
		return this.line("11");
	}
}
