
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";

export class F1040SD extends TaxForm {
	constructor(formname) {
		Debug.enter("F1040SD.Constructor()");
		super(formname);
		this.title = `Schedule D - Capital Gains and Losses`;

		this.lines["01ad"]	= new Line("F1040SD.01ad", "Short-term proceeds from 1099-B");
		this.lines["01ae"]	= new Line("F1040SD.01ae", "Short-term cost from 1099-B");
		this.lines["01ag"]	= new Line("F1040SD.01ag", "Short-term adjustments from 1099-B");
		this.lines["01ah"]	= new Line("F1040SD.01ah", "Short-term gain or loss from 1099-B");
		// Box A or G checked
		this.lines["01bd"]	= new Line("F1040SD.01bd", "Short-term proceeds from 8949");
		this.lines["01be"]	= new Line("F1040SD.01be", "Short-term cost from 8949");
		this.lines["01bg"]	= new Line("F1040SD.01bg", "Short-term adjustments from 8949");
		this.lines["01bh"]	= new Line("F1040SD.01bh", "Short-term gain or loss from 8949");
		// Box B or H checked
		this.lines["02d"]	= new Line("F1040SD.02d", "Short-term proceeds from 8949");
		this.lines["02e"]	= new Line("F1040SD.02e", "Short-term cost from 8949");
		this.lines["02g"]	= new Line("F1040SD.02g", "Short-term adjustments from 8949");
		this.lines["02h"]	= new Line("F1040SD.02h", "Short-term gain or loss from 8949");
		// Box C or I checked.
		this.lines["03d"]	= new Line("F1040SD.03d", "Short-term proceeds from 8949");
		this.lines["03e"]	= new Line("F1040SD.03e", "Short-term cost from 8949");
		this.lines["03g"]	= new Line("F1040SD.03g", "Short-term adjustments from 8949");
		this.lines["03h"]	= new Line("F1040SD.03h", "Short-term gain or loss from 8949");

		this.lines["04"]	= new Line("F1040SD.04", "Short-term gain from 6252, 4684, 6781, 8824");
		this.lines["05"]	= new Line("F1040SD.05", "Net short-term from K-1");
		this.lines["06"]	= new Line("F1040SD.06", "Short-term capital loss carryover");
		this.lines["07"]	= new Line("F1040SD.07", "Net short-term capital gain");

		this.lines["08ad"]	= new Line("F1040SD.08ad", "Long-term proceeds from 1099-B");
		this.lines["08ae"]	= new Line("F1040SD.08ae", "Long-term cost from 1099-B");
		this.lines["08ag"]	= new Line("F1040SD.08ag", "Long-term adjustments from 1099-B");
		this.lines["08ah"]	= new Line("F1040SD.08ah", "Long-term gain or loss from 1099-B");
		// Box D or J checked
		this.lines["08bd"]	= new Line("F1040SD.08bd", "Long-term proceeds from 8949");
		this.lines["08be"]	= new Line("F1040SD.08be", "Long-term cost from 8949");
		this.lines["08bg"]	= new Line("F1040SD.08bg", "Long-term adjustments from 8949");
		this.lines["08bh"]	= new Line("F1040SD.08bh", "Long-term gain or loss from 8949");
		// Box E or K checked
		this.lines["09d"]	= new Line("F1040SD.09d", "Long-term proceeds from 8949");
		this.lines["09e"]	= new Line("F1040SD.09e", "Long-term cost from 8949");
		this.lines["09g"]	= new Line("F1040SD.09g", "Long-term adjustments from 8949");
		this.lines["09h"]	= new Line("F1040SD.09h", "Long-term gain or loss from 8949");
		// Box F or L checked
		this.lines["10d"]	= new Line("F1040SD.10d", "Long-term proceeds from 8949");
		this.lines["10e"]	= new Line("F1040SD.10e", "Long-term cost from 8949");
		this.lines["10g"]	= new Line("F1040SD.10g", "Long-term adjustments from 8949");
		this.lines["10h"]	= new Line("F1040SD.10h", "Long-term gain or loss from 8949");

		this.lines["11"]	= new Line("F1040SD.11", "LT Gain from 4797, 2439, 6252, 4684, 6781, 8824");
		this.lines["12"]	= new Line("F1040SD.12", "Net long-term gain from K-1");
		this.lines["13"]	= new Line("F1040SD.13", "Capital gain distribution");
		this.lines["14"]	= new Line("F1040SD.14", "Long-term capital loss carryover");
		this.lines["15"]	= new Line("F1040SD.15", "Net long-term capital gain");
		this.lines["16"]	= new Line("F1040SD.16", "Total Gain or loss");
		this.lines["17"]	= new Line("F1040SD.17", "Lines 15 and 16 > 0");
		this.lines["18"]	= new Line("F1040SD.18", "28% Rate Gain worksheet, line 7");
		this.lines["19"]	= new Line("F1040SD.19", "Un-recaptured Section 1250 worksheet, line 18");
		this.lines["20"]	= new Line("F1040SD.20", "Lines 18 and 19 = 0");
		this.lines["21"]	= new Line("F1040SD.21", "Line 16 < 0");
		this.lines["22"]	= new Line("F1040SD.22", "Qualified dividends");

		Debug.exit("F1040SD.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F1040SD.calculate()");
		this.calculated = true;
		const tp = Taxpayer.getTaxpayer();

		const f1040 = TaxFormObj.getOrCreateForm("F1040")

		this.lines["01ad"].value	= 0;
		this.lines["01ae"].value	= 0;
		this.lines["01ag"].value	= 0;	// Not used
		this.lines["01ah"].value	= this.subtract("01ad", "01ae");
		// Box A or G checked
		this.lines["01bd"].value	= 0;
		this.lines["01be"].value	= 0;
		this.lines["01bg"].value	= 0;
		this.lines["01bh"].value	= this.subtract("01bd", "01be") + this.line("01bg");
		// Box B or H checked
		this.lines["02d"].value		= 0;
		this.lines["02e"].value		= 0;
		this.lines["02g"].value		= 0;
		this.lines["02h"].value		= this.subtract("02d", "02e") + this.line("02g");
		// Box C or I checked.
		this.lines["03d"].value		= 0;
		this.lines["03e"].value		= 0;
		this.lines["03g"].value		= 0;
		this.lines["03h"].value		= this.subtract("03d", "03e") + this.line("03g");

		this.lines["04"].value		= 0;
		this.lines["05"].value		= 0;
		this.lines["06"].value		= 0;
		this.lines["07"].value		= this.add("01ah", "01bh", "02h", "03h",
											   "04", "05", "06");

		this.lines["08ad"].value	= 0;
		this.lines["08ae"].value	= 0;
		this.lines["08ag"].value	= 0;	// Not used
		this.lines["08ah"].value	= this.subtract("08ad", "08ae");
		// Box D or J checked
		this.lines["08bd"].value	= 0;
		this.lines["08be"].value	= 0;
		this.lines["08bg"].value	= 0;
		this.lines["08bh"].value	= this.subtract("08bd", "08be") + this.line("08bg");
		// Box E or K checked
		this.lines["09d"].value		= 0;
		this.lines["09e"].value		= 0;
		this.lines["09g"].value		= 0;
		this.lines["09h"].value		= this.subtract("09d", "09e") + this.line("09g");
		// Box F or L checked
		this.lines["10d"].value		= 0;
		this.lines["10e"].value		= 0;
		this.lines["10g"].value		= 0;
		this.lines["10h"].value		= this.subtract("10d", "10e") + this.line("10g");

		this.lines["11"].value		= 0;
		this.lines["12"].value		= 0;
		this.lines["13"].value		= 0;
		this.lines["14"].value		= 0;
		this.lines["15"].value		= this.add("08ah", "08bh", "09h", "10h",
											   "11", "12", "13", "14");
		this.lines["16"].value		= this.add("07", "15");
		this.lines["17"].value		= 0;	// Not used
		if (this.line("16") > 0) {
			if (this.line("15") > 0 && this.line("16") > 0) {
				this.lines["17"].value	= 0;	// Not used
				this.lines["18"].value	= TaxFormObj.getValue("CapGainWS", "07");
				this.lines["19"].value	= TaxFormObj.getValue("Sect1250WS", "18");
				this.lines["20"].value	= 0;	// Not used
				this.lines["21"].value	= 0;
				if (this.line("16") < 0) {
					this.lines["21"].value	= Math.min(this.line("16"),
						tt.getTaxValue("MaxCapitalLoss", tp.filing_status));
				}
			} else {
				this.lines["17"].value	= 0;	// Not used
				this.lines["18"].value	= 0;
				this.lines["19"].value	= 0;
				this.lines["20"].value	= 0;
				this.lines["21"].value	= 0;
				if (this.line("16") < 0) {
					this.lines["21"].value	= Math.min(this.line("16"),
						tt.getTaxValue("MaxCapitalLoss", tp.filing_status));
				}
			}
		} else if (this.line("16") < 0) {
			this.lines["17"].value	= 0;	// Not used
			this.lines["18"].value	= 0;
			this.lines["19"].value	= 0;
			this.lines["20"].value	= 0;
			this.lines["21"].value	= 0;
			if (this.line("16") < 0) {
				this.lines["21"].value	= Math.min(this.line("16"),
					tt.getTaxValue("MaxCapitalLoss", tp.filing_status));
			}
		} else {	// Line 16 === 0
			this.lines["17"].value	= 0;	// Not used
			this.lines["18"].value	= 0;
			this.lines["19"].value	= 0;
			this.lines["20"].value	= 0;
			this.lines["21"].value	= 0;
		}
		this.lines["22"].value		= 0;	// Not used

		Debug.exit("F1040SD.calculate()");
	}
}
