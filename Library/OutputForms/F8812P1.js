
//
// Additional Child Tax Credit - Part 1
//
// This is an implementation of form 8812, lines 1-14. This is part 1, the reset of
// form 8812 is in part 2. The instructions say to calculate part 2 when it is needed
// on form 1040, line 28.
//
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { Line }			from "../Classes/Line.js";
import { Num }			from "../Modules/Num.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";
import { F8812P1_HTML }	from "../OutputForms/F8812P1_HTML.js";

export class F8812P1 extends TaxForm {
	constructor(formname) {
		Debug.enter("F8812P1.Constructor()");
		super(formname);
		this.title = `8812 (Part 1) - Additional Child Tax Credit`;

		this.credit_limit_worksheet = TaxFormObj.createForm("CreditLimitA");

		// Create the lines on the form.
		let field_info = F8812P1_HTML.getFieldInfo();
		for (const field_name of Object.keys(field_info)) {
			if (field_info[field_name][1]) {
				this.lines[field_name]= new Line(field_info[field_name][2]);
			}
		}

		Debug.exit("F8812P1.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F8812P1.calculate()");
		this.calculated = true;
		const tt = TaxTable.getTaxTable();
		const tp = Taxpayer.getTaxpayer();

		// Child Tax Credit and Credit for Other Dependents
		this.lines["01"].value	= TaxFormObj.getValue("F1040", "11b");	// AGI
		this.lines["02a"].value	= 0;		// Income from Puerto Rico
		this.lines["02b"].value	= 0;		// Foreign earned income Form 2555
		this.lines["02c"].value	= 0;		// Income from Samoa
		this.lines["02d"].value	= this.add("02a","02b", "02c");		// Add lines 2a - 2c
		this.lines["03"].value	= this.add("01","02d");				// Add lines 1 and 2d
		const [ qualified_children, other_dependents ] = tp.numDependentsForCTC();
		this.lines["04"].value	= qualified_children;
		this.lines["05"].value	= this.line("04") * tt.getTaxValue("CTC_Amount");
		this.lines["06"].value	= other_dependents;
		this.lines["07"].value	= this.line("06") * tt.getTaxValue("CTC_OtherDep");
		this.lines["08"].value	= this.add("05","07");		// Add lines 5 and 7
		this.lines["09"].value	= tt.getTaxValue("CTC_AGILimit");
		this.lines["10"].value	= Num.roundUp(Math.max(0, this.subtract("03","09")), 1000);
		this.lines["11"].value	= Math.round(this.line("10") * 0.05);	// 5%
		if (this.line("08") > this.line("11")) {
			// No CTC, credit or other dependts, or ACTC
			Debug.exit("F8812P1.calculate()");
			return 0;
		}
		this.lines["12"].value	= this.subtract("08","11");
		this.lines["13"].value	= this.credit_limit_worksheet.calculate();
		this.lines["14"].value	= this.min("12", "13");		// Smaller of line 12 or 13

		Debug.exit("F8812P1.calculate()");
		return this.value("14");
	}
}
