
import { Debug }		from "../Modules/Debug.js";
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

		this.lines["01ad"]	= new Line("Short-term prodeeds from 1099-B");
		this.lines["01ae"]	= new Line("Short-term cost from 1099-B");
		this.lines["01ag"]	= new Line("Short-term adjustments from 1099-B");
		this.lines["01ah"]	= new Line("Short-term gain or loss from 1099-B");
		// Box A or G checked
		this.lines["01bd"]	= new Line("Short-term prodeeds from 8949");
		this.lines["01be"]	= new Line("Short-term cost from 8949");
		this.lines["01bg"]	= new Line("Short-term adjustments from 8949");
		this.lines["01bh"]	= new Line("Short-term gain or loss from 8949");
		// Box B or H checked
		this.lines["02d"]	= new Line("Short-term prodeeds from 8949");
		this.lines["02e"]	= new Line("Short-term cost from 8949");
		this.lines["02g"]	= new Line("Short-term adjustments from 8949");
		this.lines["02h"]	= new Line("Short-term gain or loss from 8949");
		// Box C or I checked.
		this.lines["03d"]	= new Line("Short-term prodeeds from 8949");
		this.lines["03e"]	= new Line("Short-term cost from 8949");
		this.lines["03g"]	= new Line("Short-term adjustments from 8949");
		this.lines["03h"]	= new Line("Short-term gain or loss from 8949");

		this.lines["04"]	= new Line("Short-term gain from 6252, 4684, 6781, 8824");
		this.lines["05"]	= new Line("Net short-term from K-1");
		this.lines["06"]	= new Line("Short-term capital loss carryover");
		this.lines["07"]	= new Line("Net short-term capital gain");

		this.lines["08ad"]	= new Line("Long-term prodeeds from 1099-B");
		this.lines["08ae"]	= new Line("Long-term cost from 1099-B");
		this.lines["08ag"]	= new Line("Long-term adjustments from 1099-B");
		this.lines["08ah"]	= new Line("Long-term gain or loss from 1099-B");
		// Box D or J checked
		this.lines["08bd"]	= new Line("Long-term prodeeds from 8949");
		this.lines["08be"]	= new Line("Long-term cost from 8949");
		this.lines["08bg"]	= new Line("Long-term adjustments from 8949");
		this.lines["08bh"]	= new Line("Long-term gain or loss from 8949");
		// Box E or K checked
		this.lines["09d"]	= new Line("Long-term prodeeds from 8949");
		this.lines["09e"]	= new Line("Long-term cost from 8949");
		this.lines["09g"]	= new Line("Long-term adjustments from 8949");
		this.lines["09h"]	= new Line("Long-term gain or loss from 8949");
		// Box F or L checked
		this.lines["10d"]	= new Line("Long-term prodeeds from 8949");
		this.lines["10e"]	= new Line("Long-term cost from 8949");
		this.lines["10g"]	= new Line("Long-term adjustments from 8949");
		this.lines["10h"]	= new Line("Long-term gain or loss from 8949");

		this.lines["11"]	= new Line("LT Gain from 4797, 2439, 6252, 4684, 6781, 8824");
		this.lines["12"]	= new Line("Net long-term gain from K-1");
		this.lines["13"]	= new Line("Capital gain distribution");
		this.lines["14"]	= new Line("Long-term capital loss carryover");
		this.lines["15"]	= new Line("Net long-term capital gain");
		this.lines["16"]	= new Line("Line 7 + 15");
		this.lines["17"]	= new Line("Lines 15 and 16 > 0");
		this.lines["18"]	= new Line("28% Rate Gain worksheet, line 7");
		this.lines["19"]	= new Line("Unrecaptured Section 1250 worksheet, line 18");
		this.lines["20"]	= new Line("Lines 18 and 19 = 0");
		this.lines["21"]	= new Line("Line 16 < 0");
		this.lines["22"]	= new Line("Qualified dividends");

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
		if (this.line("16") < 0) {
			if (this.line("15") > 0 && this.line("16") > 0) {
				this.lines["17"].value		= 0;	// Not used
				this.lines["18"].value		= TaxFormObj.getValue("CapGainWS", "07");
				this.lines["19"].value		= TaxFormObj.getValue("Sect1250WS", "18");
				this.lines["20"].value		= 0;
			}
		}
		if (this.line("15") > 0 && this.line("16") > 0) {
		} else {
			if (this.line("16") < 0) {
				this.lines["21"].value = Math.max(
					tt.getTaxValue("MaxCapitalLoss", tp.filing_status),
					this.line("16"));
			}
		}
		this.lines["22"].value		= 0;	// Not used

		Debug.exit("F1040SD.calculate()");
	}
}
