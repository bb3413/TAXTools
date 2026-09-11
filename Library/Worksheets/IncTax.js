
//
// This worksheet calculates the Qualified Dividends and Capital Gain Tax Worksheet from the
// 1040 Instructions (TY2025), line 16, page 38.
//
import { Debug }		from "../Modules/Debug.js";
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";

export class IncTax extends TaxForm {
	constructor(formname) {
		Debug.enter("IncTax.Constructor()");
		super(formname);

		this.lines["01"]	= new Line("Taxable Income");
		this.lines["02"]	= new Line("Qualified Dividends");
		this.lines["03"]	= new Line("Capital Gains");
		this.lines["04"]	= new Line("Total Capital Gains");
		this.lines["05"]	= new Line("Total Ordinary Income");
		this.lines["06"]	= new Line("Start of 15% CG Bracket");
		this.lines["07"]	= new Line("Min(Line 1, Line 6)");
		this.lines["08"]	= new Line("Min(Line 5, Line 7)");
		this.lines["09"]	= new Line("Amount Taxed at 0%");
		this.lines["10"]	= new Line("Min(Line 1, Line 4)");
		this.lines["11"]	= new Line("Line 9");
		this.lines["12"]	= new Line("Line 10 - Line 11");
		this.lines["13"]	= new Line("Start of 20% CG Bracket");
		this.lines["14"]	= new Line("Min(Line 1, Line 13)");
		this.lines["15"]	= new Line("Line 5 + Line 9");
		this.lines["16"]	= new Line("Line 14 - Line 15");
		this.lines["17"]	= new Line("Min(Line 12, Line 16)");
		this.lines["18"]	= new Line("15% or Line 17");
		this.lines["19"]	= new Line("Line 9 + Line 17");
		this.lines["20"]	= new Line("Line 10 - Line 19");
		this.lines["21"]	= new Line("20% of Line 20");
		this.lines["22"]	= new Line("Income Tax on Line 5");
		this.lines["23"]	= new Line("Lines 18 + 21 + 22");
		this.lines["24"]	= new Line("Income from Line 1");
		this.lines["25"]	= new Line("Income Tax");

		Debug.exit("IncTax.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("IncTax.calculate()");
		this.calculated = true;
		const tt = TaxTable.getTaxTable();
		const tp = Taxpayer.getTaxpayer();

		this.lines["01"].value	= TaxFormObj.getValue("F1040",	"15");	// Taxable Income
		this.lines["02"].value	= TaxFormObj.getValue("F1040",	"03a");	// Qual Dividends
		this.lines["03"].value	= TaxFormObj.getValue("F1040",	"07");	// Capital Gains
		this.lines["04"].value	= this.add("02", "03");					// Tot Capital Gains
		this.lines["05"].value	= Math.max(0, this.subtract("01", "04"));// Total Ord Income
		this.lines["06"].value	= tt.get_CapGains_15_Start(tp.filing_status);
		this.lines["07"].value	= this.min("01", "06");
		this.lines["08"].value	= this.min("05", "07");
		this.lines["09"].value	= Math.max(0, this.subtract("07", "08"));	// Taxed at 0%
		this.lines["10"].value	= this.min("01", "04");
		this.lines["11"].value	= this.line("09");
		this.lines["12"].value	= Math.max(0, this.subtract("10", "11"));
		this.lines["13"].value	= tt.get_CapGains_20_Start(tp.filing_status);
		this.lines["14"].value	= this.min("01", "13");
		this.lines["15"].value	= this.add("05", "09");
		this.lines["16"].value	= Math.max(0, this.subtract("14", "15"));
		this.lines["17"].value	= this.min("12", "16");
		this.lines["18"].value	= this.line("17") * 0.15;					// 15%
		this.lines["19"].value	= this.add("09", "17");
		this.lines["20"].value	= Math.max(0, this.subtract("10", "19"));
		this.lines["21"].value	= this.line("20") * 0.20;					// 20%
		this.lines["22"].value	= tt.getIncomeTaxFromTable(
										tp.filing_status, this.line("05"));
		this.lines["23"].value	= this.add("18", "21", "22");
		this.lines["24"].value	= tt.getIncomeTaxFromTable(
										tp.filing_status, this.line("01"));
		this.lines["25"].value	= Math.round(this.min("23", "24"));			// Income Tax

		Debug.exit("IncTax.calculate()");
		return this.line("25");
	}
}
