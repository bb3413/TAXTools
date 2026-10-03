
//
// This is the IRA Contribution Deduction Worksheet for Schedule 1, line 20.
// It is documented in the 1040 Instructions (TY2025) on pages 95-98.
//
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";

export class IRADeduction extends TaxForm {
	constructor(formname) {
		Debug.enter("IRADeduction.Constructor()");
		super(formname);

		this.lines["01a"]	= new Line("");
		this.lines["01b"]	= new Line("");
		this.lines["02a"]	= new Line("");
		this.lines["02b"]	= new Line("");
		this.lines["03"]	= new Line("");
		this.lines["04"]	= new Line("");
		this.lines["05a"]	= new Line("");
		this.lines["05b"]	= new Line("");
		this.lines["06a"]	= new Line("");
		this.lines["06b"]	= new Line("");
		this.lines["07a"]	= new Line("");
		this.lines["07b"]	= new Line("");
		this.lines["08"]	= new Line("");
		this.lines["09"]	= new Line("");
		this.lines["10"]	= new Line("");
		this.lines["11a"]	= new Line("");
		this.lines["11b"]	= new Line("");
		this.lines["12a"]	= new Line("");
		this.lines["12b"]	= new Line("");

		Debug.exit("IRADeduction.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("IRADeduction.calculate()");
		this.calculated = true;
		const tt = TaxTable.getTaxTable();
		const tp = Taxpayer.getTaxpayer();

		const max_contribution	= 0;
		const phase_out			= 0;

		this.lines["01a"].value	= 0;
		this.lines["01b"].value	= 0;
		this.lines["02"].value	= 0;
		this.lines["03"].value	= TaxFormObj.getValue("F1040", "09");	// Total Income
		this.lines["04"].value	= this.add("11", "12", "13", "14", "15",
										   "16", "17", "18", "19a", "23", "25");
		this.lines["05a"].value	= this.subtract("03", "04");
		if (tp.filing_status === MFJ) {
			this.lines["05b"].value	= this.line("05a");
		} else {
				this.lines["05b"].value	= 0;
		}
		this.lines["06a"].value	= this.subtract("02a", "05a");
		this.lines["06b"].value	= this.subtract("02b", "05b");
		this.lines["07a"].value	= 0;
		this.lines["07b"].value	= 0;
		this.lines["08"].value	= 0;
		this.lines["09"].value	= 0;
		this.lines["10"].value	= 0;
		this.lines["11a"].value	= 0;
		this.lines["11b"].value	= 0;
		this.lines["12a"].value	= 0;
		this.lines["12b"].value	= 0;

		Debug.exit("IRADeduction.calculate()");
		return this.line("12a");
	}
}
