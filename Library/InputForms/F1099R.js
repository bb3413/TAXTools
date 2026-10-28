
// Classes
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { F1099R_HTML }	from "../InputForms/F1099R_HTML.js";

// Modules
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";

export class F1099R extends TaxForm {
	constructor(formname) {
		Debug.enter("F1099R.Constructor()");
		super(formname);
		this.title =
			`1099-R - Distributions from Pensions, Annuities, Retirement Plans, etc.`;
		this.simple	= TaxFormObj.createForm("Simple");

		// Create the lines on the form.
		let field_info = F1099R_HTML.getFieldInfo();
		for (const field_name of Object.keys(field_info)) {
			if (field_info[field_name][1]) {
				this.lines[field_name]= new Line(field_info[field_name][2]);
			}
		}

		Debug.exit("F1099R.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F1099R.calculate()");

		this.calculated = true;
		this.simple.resetCalculation();

		if (!this.line("07b")) {
			this.simple.calculate();
		}

		Debug.exit("F1099R.calculate()");
	}
}
