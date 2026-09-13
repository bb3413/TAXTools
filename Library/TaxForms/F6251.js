
//
// This is form 6251, Alternative Minimum Tax - Individual.
//
import { Debug }		from "../Modules/Debug.js";
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";

export class F6251 extends TaxForm {
	constructor(formname) {
		Debug.enter("F6251.Constructor()");
		super(formname);
		this.title = `6251 - Alternative Minimum Tax�Individuals`;

		// Form 6251, Part I - AMT Income
		this.lines["01a"]	= new Line("Total Deductions w/o Senior Deduction");
		this.lines["01b"]	= new Line("AGI - Deductions");
		this.lines["02a"]	= new Line("Deductions Allowed for AMT");
		this.lines["02b"]	= new Line("Taxable Refund");
		this.lines["02c"]	= new Line("Investment Interest Expense");
		this.lines["02d"]	= new Line("Depletion");
		this.lines["02e"]	= new Line("Net Operating Loss Deduction");
		this.lines["02f"]	= new Line("Alternative Tax Net Operating Loss Deduction");
		this.lines["02g"]	= new Line("Interest from Private Activity bonds");
		this.lines["02h"]	= new Line("Qualified Small Business Stock");
		this.lines["02i"]	= new Line("Exercise of Incentive Stock Options");
		this.lines["02j"]	= new Line("Estates and Trusts");
		this.lines["02k"]	= new Line("Disposition of Property");
		this.lines["02l"]	= new Line("Post-1986 Depreciation");
		this.lines["02m"]	= new Line("Passive Activities");
		this.lines["02n"]	= new Line("Loss Limitations");
		this.lines["02o"]	= new Line("Circulation Costs");
		this.lines["02p"]	= new Line("Long-term Contracts");
		this.lines["02q"]	= new Line("Mining Costs");
		this.lines["02r"]	= new Line("Research and Experimental Costs");
		this.lines["02s"]	= new Line("Installment Sales");
		this.lines["02t"]	= new Line("Intangible Drilling Costs");
		this.lines["03"]	= new Line("Other Income");
		this.lines["04"]	= new Line("AMT Income");

		// Form 6251, Part II - Alternative Minimum Tax
		this.lines["05"]	= new Line("AMT Exemption");
		this.lines["06"]	= new Line("AMT Income - Exemption");
		this.lines["07"]	= new Line("Result from Form 6251, Part III");
		this.lines["08"]	= new Line("AMT Foreign Tax Credit");
		this.lines["09"]	= new Line("Tentative Minimum Tax");
		this.lines["10"]	= new Line("Normal Income Tax (1040, line 13a)");
		this.lines["11"]	= new Line("Alternative Minimum Tax");

		// Form 6251, Part III
		this.lines["12"]	= new Line("AMT Income - AMT Exemption");
		this.lines["13"]	= new Line("Line 13");
		this.lines["14"]	= new Line("Line 14");
		this.lines["15"]	= new Line("Line 15");
		this.lines["16"]	= new Line("Line 16");
		this.lines["17"]	= new Line("Line 17");
		this.lines["18"]	= new Line("Line 18");
		this.lines["19"]	= new Line("Line 19");
		this.lines["20"]	= new Line("Line 20");
		this.lines["21"]	= new Line("Line 21");
		this.lines["22"]	= new Line("Line 22");
		this.lines["23"]	= new Line("Line 23");
		this.lines["24"]	= new Line("Line 24");
		this.lines["25"]	= new Line("Line 25");
		this.lines["26"]	= new Line("Line 26");
		this.lines["27"]	= new Line("Line 27");
		this.lines["28"]	= new Line("Line 28");
		this.lines["29"]	= new Line("Line 29");
		this.lines["30"]	= new Line("Line 30");
		this.lines["31"]	= new Line("Line 31");
		this.lines["32"]	= new Line("Line 32");
		this.lines["33"]	= new Line("Line 33");
		this.lines["34"]	= new Line("Line 34");
		this.lines["35"]	= new Line("Line 35");
		this.lines["36"]	= new Line("Line 36");
		this.lines["37"]	= new Line("Line 37");
		this.lines["38"]	= new Line("Line 38");
		this.lines["39"]	= new Line("Line 39");
		this.lines["40"]	= new Line("Line 40");

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
		const qualified_dividends	= TaxFormObj.getValue("F1040",	"03a");
		const capital_gains			= TaxFormObj.getValue("F1040",	"07a");
		const agi					= TaxFormObj.getValue("F1040",	"11b");
		const qbi_deduction			= TaxFormObj.getValue("F1040",	"13a");
		const total_deductions		= TaxFormObj.getValue("F1040",	"14");
		const taxable_income		= TaxFormObj.getValue("F1040",	"15");
		const income_tax			= TaxFormObj.getValue("F1040",	"16");
		const taxable_refund		= TaxFormObj.getValue("F1040S1",	"01");
		const senior_deduction		= TaxFormObj.getValue("F1040S1A","37");
		const itemized_deductions	= TaxFormObj.getValue("F1040SA",	"17");
		const taxes_paid_deduction	= TaxFormObj.getValue("F1040SA",	"07");
		const standard_deduction	= tt.getStandardDeduction(
										tp.filing_status,
										tp.taxpayers_age,		tp.spouses_age,
										tp.is_taxpayer_blind,	tp.is_spouse_blind);
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
		this.lines["04"].value	= this.add("01b","02a",	// AMT Income
										   "02c","02d","02e","02g","02h","02i",
										   "02j","02k","02l","02m","02n","02o",
										   "02p","02q","02r","02t","03") -
												this.add("02b","02f","02s");

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
		this.lines["18"].value	= tt.get_AMT_Tax(tp.filing_status, this.line("17"));
		this.lines["19"].value	= tt.get_CapGains_15_Start(tp.filing_status);
		this.lines["20"].value	= taxable_income;
		this.lines["21"].value	= Math.max(0, this.subtract("19", "20"));
		this.lines["22"].value	= this.min("12", "13");
		this.lines["23"].value	= this.min("21", "22");							// 0%
		this.lines["24"].value	= this.subtract("22", "23");
		this.lines["25"].value	= tt.get_CapGains_20_Start(tp.filing_status);
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
		this.lines["39"].value	= tt.get_AMT_Tax(tp.filing_status, this.line("12"));
		this.lines["40"].value	= this.min("38", "39");

		// Form 6251, Part II - Alternative Minimum Tax
		this.lines["05"].value	= tt.get_AMT_Exemption(tp.filing_status, this.line("04"));
		this.lines["06"].value	= this.subtract("04", "05");			// AMTInc - AMT Exemp
		if (this.line("06") > 0) {
			if ((capital_gains > 0) || (qualified_dividends > 0)) {
				this.lines["07"].value = this.line("40");
			} else {
				this.lines["07"].value = tt.get_AMT_Tax(tp.filing_status, this.line("06"));
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
