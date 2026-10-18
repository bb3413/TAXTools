
// Classes
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { SSA1099_HTML }	from "../InputForms/SSA1099_HTML.js";

// Modules
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";

export class SSA1099 extends TaxForm {
	constructor(formname) {
		Debug.enter("SSA1099.Constructor()");
		super(formname);
		this.title = `SSA-1099 - Social Security Benefit Statement`;

		// Create the lines on the form.
		let field_info = SSA1099_HTML.getFieldInfo();
		for (const field_name of Object.keys(field_info)) {
			if (field_info[field_name][1]) {
				this.lines[field_name]= new Line(field_info[field_name][2]);
			}
		}

		Debug.exit("SSA1099.Constructor()");
	}
}
