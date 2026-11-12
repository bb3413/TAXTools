
import { TAXPAYER, SPOUSE }	from "../TAXTools/TAXTools.js";

import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxInfo }		from "../Modules/TaxInfo.js";
import { TaxTable }		from "../Modules/TaxTable.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";
import { F8880_HTML }	from "../OutputForms/F8880_HTML.js";

export class F8880 extends TaxForm {
	constructor(formname) {
		Debug.enter("F8880.Constructor()");
		super(formname);
		this.title = `Form 8880 - Credit for Qualified Retirement Savings Contributions`;

		// Variables for external input. These variables can be used to enter information
		// that does not come from another tax form.
		this.ira_contribution_taxpayer	= 0;
		this.ira_contribution_spouse	= 0;

		// Create the lines on the form.
		let field_info = F8880_HTML.getFieldInfo();
		for (const field_name of Object.keys(field_info)) {
			if (field_info[field_name][1]) {
				this.lines[field_name]= new Line(field_info[field_name][2]);
			}
		}

		Debug.exit("F8880.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F8880.calculate()");
		this.calculated = true;
		const tt = TaxTable.getTaxTable();
		const tp = Taxpayer.getTaxpayer();

		this.lines["01a"].value		= this.ira_contribution_taxpayer;
		this.lines["01b"].value		= this.ira_contribution_spouse;
		this.lines["02a"].value		= TaxInfo.getW2RetirementContributions(TAXPAYER);
		this.lines["02b"].value		= TaxInfo.getW2RetirementContributions(SPOUSE);
		this.lines["03a"].value		= this.add("01a","02a");
		this.lines["03b"].value		= this.add("01b","02b");
		this.lines["04a"].value		= 0;
		this.lines["04b"].value		= 0;
		this.lines["05a"].value		= Math.max(0, this.subtract("03a", "04a"));
		this.lines["05b"].value		= Math.max(0, this.subtract("03b", "04b"));
		this.lines["06a"].value		= Math.min(2000, this.line("05a"));
		this.lines["06b"].value		= Math.min(2000, this.line("05b"));
		this.lines["07"].value		= this.add("06a","06b");
		if (this.line("07") > 0) {
			this.lines["08"].value	= TaxFormObj.getValue("F1040", "11b");	// AGI
			this.lines["09"].value	= tt.getRetirementSavingsPhaseOut(this.line("08"));
			this.lines["10"].value	= this.line("07") * this.line("09");
			this.lines["11"].value	= this._creditLimitWorksheet();
			this.lines["12"].value	= Math.min(this.line("10"), this.line("11"));
		}

		Debug.exit("F8880.calculate()");
	}

	_creditLimitWorksheet() {
		this.lines["ws1"].value =
			TaxFormObj.getValue("F1040", "18");		// Total Tax
		this.lines["ws2"].value =
			TaxFormObj.getValue("F1040S3", "01") +	// Foreign Tax Credit
			TaxFormObj.getValue("F1040S3", "02") +	// Child and Dependent Care Credit
			TaxFormObj.getValue("F1040S3", "03") +	// Education Credit
			TaxFormObj.getValue("F1040S3", "06d") +	// Credit for Elderly or Disabled
			TaxFormObj.getValue("F1040S3", "06e") +	// Reserved for Future Use
			TaxFormObj.getValue("F1040S3", "06f") +	// Clean Vehicle Credit
			TaxFormObj.getValue("F1040S3", "06g") +	// Mortgage Interest Credit
			TaxFormObj.getValue("F1040S3", "06h") +	// DC Home Buyer Credit
			TaxFormObj.getValue("F1040S3", "06i");	// EV Credit
		this.lines["ws3"].value = this.subtract("ws1", "ws2");

		return this.line("ws3");
	}
}
