
// Classes
import { Line }				from "../Classes/Line.js";
import { TaxForm }			from "../Classes/TaxForm.js";
import { F1098VLI_HTML }	from "../InputForms/F1098VLI_HTML.js";

// Modules
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";

export class F1098VLI extends TaxForm {
	constructor(formname) {
		Debug.enter("F1098VLI.Constructor()");
		super(formname);
		this.title = `1098-VLI - Vehicle Loan Interest Statement`;

		// Create the lines on the form.
		let field_info = F1098VLI_HTML.getFieldInfo();
		for (const field_name of Object.keys(field_info)) {
			if (field_info[field_name][1]) {
				this.lines[field_name]= new Line(field_info[field_name][2]);
			}
		}

		Debug.exit("F1098VLI.Constructor()");
	}
}
