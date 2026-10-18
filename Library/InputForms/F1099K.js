
// Classes
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { F1099K_HTML }	from "../InputForms/F1099K_HTML.js";

// Modules
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";;

export class F1099K extends TaxForm {
	constructor(formname) {
		Debug.enter("F1099K.Constructor()");
		super(formname);
		this.title = `1099-K - Payment Card and Third Party Network Transactions`;

		// Create the lines on the form.
		let field_info = F1099K_HTML.getFieldInfo();
		for (const field_name of Object.keys(field_info)) {
			if (field_info[field_name][1]) {
				this.lines[field_name]= new Line(field_info[field_name][2]);
			}
		}

		Debug.exit("F1099K.Constructor()");
	}
}
