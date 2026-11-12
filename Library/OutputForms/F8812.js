
//
// Additional Child Tax Credit
//
// This is an implementation of form 8812.
//
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";
import { F8812_HTML }	from "../OutputForms/F8812_HTML.js";

export class F8812 extends TaxForm {
	constructor(formname) {
		Debug.enter("F8812.Constructor()");
		super(formname);
		this.title = `8812 - Additional Child Tax Credit`;

		// Create the lines on the form.
		let field_info = F8812_HTML.getFieldInfo();
		for (const field_name of Object.keys(field_info)) {
			if (field_info[field_name][1]) {
				this.lines[field_name]= new Line(field_info[field_name][2]);
			}
		}

		Debug.exit("F8812.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F8812.calculate()");
		this.calculated = true;
		const tt = TaxTable.getTaxTable();
		const tp = Taxpayer.getTaxpayer();

		// Child Tax Credit and Credit for Other Dependents
		this.lines["01"].value	= TaxFormObj.getValue("F1040", "11b");	// AGI
		this.lines["02a"].value	= 0;		// Income from Puerto Rico that you excluded
		this.lines["02b"].value	= 0;		// Foreign earned income Form 2555
		this.lines["02c"].value	= 0;		// Income from Samoa
		this.lines["02d"].value	= this.add("02a","02b", "02c");		// Add lines 2a through 2c
		this.lines["03"].value	= this.add("01","02d");				// Add lines 1 and 2d
		this.lines["04"].value	= 0;		// Number of qualifying children
		this.lines["05"].value	= 0;		// Multiply line 4 by $2,200
		this.lines["06"].value	= 0;		// Number of other dependents
		this.lines["07"].value	= 0;		// Multiply line 6 by $500 
		this.lines["08"].value	= 0;		// Add lines 5 and 7
		this.lines["09"].value	= 0;		// AGI limit
		this.lines["10"].value	= 0;		// Subtract line 9 from 3
		this.lines["11"].value	= 0;		// Multiply line 10 by 5%
		this.lines["12"].value	= 0;		// Is line 8 more than 11
		this.lines["13"].value	= 0;		// Amount from Credit Limit Worksheet A
		this.lines["14"].value	= 0;		// Enter the smaller of line 12 or 13

		// Additional Child Tax Credit for all filers
		this.lines["15"].value	= 0;		// Reserved for future use
		this.lines["16a"].value	= 0;		// Subtract line 14 from line 12
		this.lines["16b"].value	= 0;		// Number of qualifying children
		this.lines["17"].value	= 0;		// Smaller of line 16a or 16b
		this.lines["18a"].value	= 0;		// Earned income
		this.lines["18b"].value	= 0;		// Nontaxable combat pay
		this.lines["19"].value	= 0;		// Is the amount on line 18a more than max credit
		this.lines["20"].value	= 0;		// Multiply the amount on line 19 by 15%

		// Filers with three or more children and redidents of Puerto Rico
		this.lines["21"].value	= 0;		// Withheld social security taxes
		this.lines["22"].value	= 0;		// Total S1, line 15; S2, line 16c; and S2, line 17c
		this.lines["23"].value	= 0;		// Add lines 21 and 22
		this.lines["24"].value	= 0;		// Amounts from Form 1040, line 27a, and S3, line 1
		this.lines["25"].value	= 0;		// Subtract line 24 from 23
		this.lines["26"].value	= 0;		// Enter the larger of line 20 or 25

		// Additional Child Tax Credit
		this.lines["27"].value	= 0;		// Smaller of line 17 or 26

		Debug.exit("F8812.calculate()");
	}
}
