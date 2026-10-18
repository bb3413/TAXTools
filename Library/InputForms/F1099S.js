
// Classes
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { F1099S_HTML }	from "../InputForms/F1099S_HTML.js";

// Modules
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";

export class F1099S extends TaxForm {
	constructor(formname) {
		Debug.enter("F1099S.Constructor()");
		super(formname);
		this.title = `1099-S - Proceeds From Real Estate Transactions`;

		// Create the lines on the form.
		let field_info = F1099S_HTML.getFieldInfo();
		for (const field_name of Object.keys(field_info)) {
			if (field_info[field_name][1]) {
				this.lines[field_name]= new Line(field_info[field_name][2]);
			}
		}

		Debug.exit("F1099S.Constructor()");
	}
}
