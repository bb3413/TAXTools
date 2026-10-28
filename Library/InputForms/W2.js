
// Classes
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { W2_HTML }		from "../InputForms/W2_HTML.js";

// Modules
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";

export class W2 extends TaxForm {
	constructor(formname) {
		Debug.enter("W2.Constructor()");
		super(formname);

		this.title = `W-2 - Wage and Tax Statement`;

		// Create the lines on the form.
		let field_info = W2_HTML.getFieldInfo();
		for (const field_name of Object.keys(field_info)) {
			if (field_info[field_name][1]) {
				this.lines[field_name]= new Line(field_info[field_name][2]);
			}
		}

		Debug.exit("W2.Constructor()");
	}

	getBox12(code) {
		let value = 0;

		if (String(this.line("12a1")).toUpperCase() === code) {
			value += this.line("12a2");
		}
		if (String(this.line("12b1")).toUpperCase() === code) {
			value += this.line("12b2");
		}
		if (String(this.line("12c1")).toUpperCase() === code) {
			value += this.line("12c2");
		}
		if (String(this.line("12d1")).toUpperCase() === code) {
			value += this.line("12d2");
		}

		return value;
	}

	getTipIncome() {
		return this.getBox12("TP");
	}

	getRetirementContributions() {
		return this.getBox12("D");
	}
}
