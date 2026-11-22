
//
// Self-employment Health Insurance Deduction
//
// This is an implementation of form 7206.
//
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";
import { F7206_HTML }	from "../OutputForms/F7206_HTML.js";

export class F7206 extends TaxForm {
	constructor(formname) {
		Debug.enter("F7206.Constructor()");
		super(formname);
		this.title = `7206 - Self-Employed Health Insurance Deduction`;

		// Create the lines on the form.
		let field_info = F7206_HTML.getFieldInfo();
		for (const field_name of Object.keys(field_info)) {
			if (field_info[field_name][1]) {
				this.lines[field_name]= new Line(field_info[field_name][2]);
			}
		}

		Debug.exit("F7206.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F7206.calculate()");
		this.calculated = true;
		const tt = TaxTable.getTaxTable();
		const tp = Taxpayer.getTaxpayer();

		this.lines["01"].value	= 0;									// Health Insurance
		this.lines["02"].value	= 0;									// LTC Insurance
		this.lines["03"].value	= this.add("01", "02");					// Health Insurance
		this.lines["04"].value	= TaxFormObj.getValue("F1040SC", "31");	// Net Profit
		this.lines["05"].value	= this.line("04");						// Net Profit
		this.lines["06"].value	= this.line("04") / this.line("05");	// Profit Ratio
		this.lines["07"].value	= TaxFormObj.getValue("F1040S1", "15");	// Deductible SE Tax
		this.lines["07x"].value	= this.line("07") * this.line("06");	// SE Tax * Profit
		this.lines["08"].value	= this.subtract("04", "07x");			// Profit - SE Tax
		this.lines["09"].value	= TaxFormObj.getValue("F1040S1", "16");	// Retirement Contrib
		this.lines["10"].value	= this.subtract("08", "09");			// Profit - Retire
		this.lines["11"].value	= TaxFormObj.getValue("W2", "05");		// Medicare Wages
		this.lines["12"].value	= TaxFormObj.getValue("F2555", "45");
		this.lines["13"].value	= Math.max(this.line("10"),
											this.line("11")) - this.line("12");
		this.lines["14"].value	= Math.min(this.line("03"),
											this.line("13"));	// SEHI

		Debug.exit("F7206.calculate()");
	}
}
