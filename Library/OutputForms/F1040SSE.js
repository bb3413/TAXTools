
//
// This worksheet calculates the XXXXX from the
// XXXXX, line xx, page xx.
//
import { Debug }		from "../Modules/Debug.js";
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";


export class F1040SSE extends TaxForm {
	constructor(formname) {
		Debug.enter("F1040SSE.Constructor()");
		super(formname);

		this.lines["01a"]	= new Line("Not used");
		this.lines["01b"]	= new Line("Not used");
		this.lines["02"]	= new Line("Net profit from business");
		this.lines["03"]	= new Line("Total self-employment income");
		this.lines["04a"]	= new Line("92.35%");
		this.lines["04b"]	= new Line("Ignore");
		this.lines["04c"]	= new Line("Add lines 04a and 04b");
		this.lines["05a"]	= new Line("Church employee income");
		this.lines["05b"]	= new Line("92.35%");
		this.lines["06"]	= new Line("Add lines 04c and 05b");
		this.lines["07"]	= new Line("Maximum amount of wages subject to SS tax");
		this.lines["08a"]	= new Line("W-2, boxes 3 and 7");
		this.lines["08b"]	= new Line("Unreported tips subject to ss tax");
		this.lines["08c"]	= new Line("Wages subject to ss tax");
		this.lines["08d"]	= new Line("Wages outside business subject to SS tax");
		this.lines["09"]	= new Line("");
		this.lines["10"]	= new Line("12.4% Social Security tax");
		this.lines["11"]	= new Line("2.9% Medicatre tax");
		this.lines["12"]	= new Line("Social Security + Medicare = SE Tax");
		this.lines["13"]	= new Line("SE Tax Deduction");

		Debug.exit("F1040SSE.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F1040SSE.calculate()");
		this.calculated = true;

		this.lines["01a"].value		= 0;							// Farm income
		this.lines["01b"].value		= 0;							// Farm income
		this.lines["02"].value		= TaxFormObj.getValue("F1040SC", "31");	// Net profit
		this.lines["03"].value		= this.add("01a", "01b", "02");	// Total income
		this.lines["04a"].value		=
			Math.round((this.line("03") > 0) ? this.line("03") * 0.9235 : this.line("03"));
		this.lines["04b"].value		= 0;							// Ignore
		this.lines["04c"].value		= this.add("04a", "04b");
		if (this.line("04c") < 400) {
			return;													// No SE tax
		}
		this.lines["05a"].value		= 0;							// Church employee income
		this.lines["05b"].value		= Math.round(this.line("05a") * .9235);	// 92.35%
		if (this.line("05b") < 100) {
			this.lines["05b"].value	= 0;
		}
		this.lines["06"].value		= this.add("04c", "05b");
		this.lines["07"].value		= 176100;						// SS tax on wages
		this.lines["08a"].value		= TaxFormObj.getValue("W2", "03") +
										TaxFormObj.getValue("W2", "07");
		this.lines["08b"].value		= 0;							// SS tax on tips
		this.lines["08c"].value		= 0;							// SS tax on wages
		this.lines["08d"].value		= this.add("08a", "08b", "08c");// SS tax on wages
		this.lines["09"].value		= this.subtract("07", "08d");
		this.lines["10"].value		= 0;
		if (this.line("09") <= 0) {
			this.lines["10"].value	= 0;
		} else {
			this.lines["10"].value	= Math.round(this.min("06", "09") * 0.124);	// SS tax
		}
		this.lines["11"].value		= Math.round(this.min("06") * 0.029);// Medicare tax
		this.lines["12"].value		= Math.round(this.add("10", "11"));	// SS+Med = SE Tax
		this.lines["13"].value		= Math.round(this.line("12") / 2);	// SE Tax Deduction

		Debug.exit("F1040SSE.calculate()");
	}
}
