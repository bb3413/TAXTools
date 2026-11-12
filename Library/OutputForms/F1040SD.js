
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";
import { F1040SD_HTML }	from "../OutputForms/F1040SD_HTML.js";

export class F1040SD extends TaxForm {
	constructor(formname) {
		Debug.enter("F1040SD.Constructor()");
		super(formname);
		this.title = `Schedule D - Capital Gains and Losses`;

		// Create the lines on the form.
		let field_info = FF1040SD_HTML.getFieldInfo();
		for (const field_name of Object.keys(field_info)) {
			if (field_info[field_name][1]) {
				this.lines[field_name]= new Line(field_info[field_name][2]);
			}
		}

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
						tt.getTaxValue("MaxCapitalLoss"));
				}
			} else {
				this.lines["17"].value	= 0;	// Not used
				this.lines["18"].value	= 0;
				this.lines["19"].value	= 0;
				this.lines["20"].value	= 0;
				this.lines["21"].value	= 0;
				if (this.line("16") < 0) {
					this.lines["21"].value	= Math.min(this.line("16"),
						tt.getTaxValue("MaxCapitalLoss"));
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
					tt.getTaxValue("MaxCapitalLoss"));
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
