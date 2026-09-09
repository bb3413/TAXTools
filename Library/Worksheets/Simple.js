
//
// This is the Simplified Method Worksheet from the
// 1040 Instructions (TY2025), lines 5a and 5b, page 29.
//

import { Dates }		from "../Classes/Dates.js";
import { Debug }		from "../Classes/Debug.js";
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Classes/TaxFormObj.js";
import { TaxTable }		from "../Classes/TaxTable.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";

const table_1 = [
	//				  Before  After
	//  Age Range		11/19/1996
	[	0,		55,		300,	360	],
	[	56,		60,		260,	310	],
	[	61,		65,		240,	260	],
	[	66,		70,		170,	210	],
	[	71,		999,	120,	160	],
];

const table_2 = [
	//   Age Range
	[	0,		110,	410	],
	[	111,	120,	360	],
	[	121,	130,	310	],
	[	131,	140,	260	],
	[	141,	999,	210	],
];

function getAgeFactor() {
}

function getMonthsPaid() {
}

function getAmountRecovered() {
}

export class Simple extends TaxForm {
	constructor(formname) {
		Debug.enter("Simple.Constructor()");
		super(formname);

		this.lines["01"]	= new Line("Gross Distribution (1099-R, box 1)");
		this.lines["02"]	= new Line("Total Contributions (1099-R, box 9b)");
		this.lines["03"]	= new Line("Age Factor");
		this.lines["04"]	= new Line("");
		this.lines["05"]	= new Line("");
		this.lines["06"]	= new Line("");
		this.lines["07"]	= new Line("");
		this.lines["08"]	= new Line("");
		this.lines["09"]	= new Line("Taxable Amount");
		this.lines["10"]	= new Line("Amount Recovered");
		this.lines["11"]	= new Line("Remaining Cost to Be Recovered");

		this.annuity_start_date		= 0;
		this.total_contributions	= 0;

		Debug.exit("Simple.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("Simple.calculate()");
		this.calculated = true;
		const tt = TaxTable.getTaxTable();
		const tp = Taxpayer.getTaxpayer();

		let taxpayers_age_at_atart	= 0;
		let spouses_age_at_atart	= 0;

		if (Str.empty(this.annuity_start_date)) {
			throw new Error("Annuity start date is not specified.");
		}
		if (Str.empty(tp.taxpayers_birthday)) {
			throw new Error("Taxpayer's birthday is not specified.");
		}
		if (Str.empty(tp.spouses_birthday) && tp.spouses_age > 0) {
			throw new Error("Spouse's birthday is not specified.");
		}

		taxpayers_age_at_atart = Dates.getAge(tp.taxpayers_birthday, annuity_start_date);
		if (!Str.empty(tp.spouses_birthday)) {
			spouses_age_at_atart = Dates.getAge(tp.spouses_birthday, annuity_start_date);
		}

		this.lines["01"].value	= this.annuity_start_date;	// Gross Dist (1099-R, box 1)
		this.lines["02"].value	= this.total_contributions;	// Total Contrib (1099-R, box 9b)
		this.lines["03"].value	= getAgeFactor();			// Age Factor
		this.lines["04"].value	= this.line("03") / 2;
		this.lines["05"].value	= this.line("04") * getMonthsPaid();
		this.lines["06"].value	= getAmountRecovered();
		this.lines["07"].value	= this.subtract("02", "06");
		this.lines["08"].value	= this.min("05", "07");
		this.lines["09"].value	= Math.max(0, this.subtract("01", "08"));// Taxable Amount
		this.lines["10"].value	= this.add("06","08");			// Amount Recovered
		this.lines["11"].value	= this.subtract("02", "10");	// Remaining to Be Recovered

		Debug.exit("Simple.calculate()");
 		return this.lines["09"].value;
	}
}
