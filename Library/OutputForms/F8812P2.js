
//
// Additional Child Tax Credit - Part 2
//
// This is an implementation of form 8812, lines 15-27. This is part 2, the reset of
// form 8812 is in part 1. The instructions say to calculate part 2 when it is needed
// on form 1040, line 28.
//
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { Line }			from "../Classes/Line.js";
import { Num }			from "../Modules/Num.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxInfo }		from "../Modules/TaxInfo.js";
import { TaxTable }		from "../Modules/TaxTable.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";
import { F8812P2_HTML }	from "../OutputForms/F8812P2_HTML.js";

export class F8812P2 extends TaxForm {
	constructor(formname) {
		Debug.enter("F8812P2.Constructor()");
		super(formname);
		this.title = `8812 (Part 2) - Additional Child Tax Credit`;

		// Create the lines on the form.
		let field_info = F8812P2_HTML.getFieldInfo();
		for (const field_name of Object.keys(field_info)) {
			if (field_info[field_name][1]) {
				this.lines[field_name]= new Line(field_info[field_name][2]);
			}
		}

		Debug.exit("F8812P2.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F8812P2.calculate()");
		this.calculated = true;
		const tt = TaxTable.getTaxTable();
		const tp = Taxpayer.getTaxpayer();

		this.lines["15"].value	= 0;		// Reserved for future use
		this.lines["16a"].value	= 
			TaxFormObj.getValue("F8812P1", "12") -
			TaxFormObj.getValue("F8812P1", "14");
		if (this.value ("16a") <= 0) {
			Debug.exit("F8812P2.calculate()");
			return 0;
		}

		const [ qualified_children, other_dependents ] = tp.numDependentsForCTC();
		const additional_ctc = tt.getTaxValue("AdditionalCTC");

		// Additional Child Tax Credit for all filers
		this.lines["16b"].value	= qualified_children * additional_ctc;
		this.lines["17"].value	= this.min("16a", "16b");		// Smaller of line 16a or 16b
		this.lines["18a"].value	= TaxInfo.earnedIncome();		// Earned income
		this.lines["18b"].value	= TaxFormObj.getValue("F1040", "01i");	// Nontaxable combat pay
		this.lines["19"].value	= 0;
		if (this.line("18a") > 2500) {
			this.lines["19"].value = this.line("18a") - 2500;
		}
		this.lines["20"].value	= Math.round(this.line("19") * 0.15);	// 15%

		// Filers with three or more children and redidents of Puerto Rico
		if (qualified_children < 3) {
			this.lines["27"].value = this.min("17", "20");	// Additional CTC
		} else {
			this.lines["21"].value	=		// Withheld social security taxes
				TaxFormObj.getValue("W2", "04") +
				TaxFormObj.getValue("W2", "06");
			this.lines["22"].value	=
				TaxFormObj.getValue("F1040S1", "15") +
				TaxFormObj.getValue("F1040S2", "16c") +
				TaxFormObj.getValue("F1040S2", "17c");
			this.lines["23"].value	= this.add("21", "22");
			this.lines["24"].value	=
				TaxFormObj.getValue("F1040", "27a") +
				TaxFormObj.getValue("F1040S3", "11");
			this.lines["25"].value	= Math.max(0, this.subtract("23", "24"));
			this.lines["26"].value	= this.max("20", "25");
			this.lines["27"].value	= this.min("17", "26");		// Additional CTC
		}

		Debug.exit("F8812P2.calculate()");
		return this.value("27");
	}
}
