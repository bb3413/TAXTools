
//
// This is a worksheet that I created to execute the Earned Income Credit formula.
//

import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxInfo }		from "../Modules/TaxInfo.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";
import { TaxTable }		from "../Modules/TaxTable.js";

export class EIC extends TaxForm {
	constructor(formname) {
		Debug.enter("EIC.Constructor()");
		super(formname);
		this.title	= `Earned Income Credit Worksheet`;

		this.lines["00a"]	= new Line("Is taxpayer qualified for EIC");
		this.lines["00b"]	= new Line("Foreign earned income");
		this.lines["00c"]	= new Line("Unearned income");

		this.lines["01"]	= new Line("Earned income");
		this.lines["02"]	= new Line("EIC base");
		this.lines["03"]	= new Line("EIC rate");
		this.lines["04"]	= new Line("Phase out start");
		this.lines["05"]	= new Line("Phase out rate");
		
		this.lines["06"]	= new Line("Earned income after limit");
		this.lines["07"]	= new Line("Mamimum credit amount");
		this.lines["08"]	= new Line("Amount over phase out");
		this.lines["09"]	= new Line("Phase out amount");
		this.lines["10"]	= new Line("EIC");

		Debug.exit("EIC.Constructor()");
	}

	calculate() {
		Debug.enter("EIC.calculate()");
		this.calculated = true;
		const tt = TaxTable.getTaxTable();
		const tp = Taxpayer.getTaxpayer();

		// The eic_base is the maximum amount of earned income that can be used to calculate
		// the credit. The maximum credit is the limited earned income times the EIC percent.
		// The phase out amount is the amount over the start of phase out times the phase out
		// percent. It is subtracted from the maximum credit.

		// Save values for debugging.
		this.lines["00a"].value	= tp.isQualifiedForEIC();
		this.lines["00b"].value	= TaxFormObj.getValue("F2555", "26");
		this.lines["00c"].value	= TaxInfo.unearnedIncome();

		if (!tp.isQualifiedForEIC()) {
			Debug.exit("EIC.calculate()");
			return 0;
		}
		if (TaxFormObj.getValue("F2555", "26") > 0) {	// Foreign earned income
			Debug.exit("EIC.calculate()");
			return 0;
		}
		if ((TaxInfo.unearnedIncome() > tt.getTaxValue("EIC_MaxUnearnedIncome"))) {
			Debug.exit("EIC.calculate()");
			return 0;
		}
		
		this.lines["01"].value	= TaxInfo.earnedIncome();				// Earned income
		this.lines["02"].value	= tt.getEICBase();						// Max EI allowed
		this.lines["03"].value	= tt.getEICRate();						// EI * rate = credit
		this.lines["04"].value	= tt.getEICPhaseOutStart();				// Start of phase out
		this.lines["05"].value	= tt.getEICPhaseOutRate();				// Phase out percent

		this.lines["06"].value	= Math.min(this.line("01"), this.line("02"));	// EI after limit
		this.lines["07"].value	= Math.round(this.line("06") * this.line("03"));// Mamimum credit amount

		// If earned income > start of phase outr
		if (this.line("01") <= this.line("04")) {
			this.lines["10"].value	= this.line("07");						// EIC
		} else {
			this.lines["08"].value	= Math.max(0, this.subtract("01", "04"));	// Amount over phase out
			this.lines["09"].value	= Math.round(this.line("08") * this.line("05"));	// Phase out amount
			this.lines["10"].value	= Math.max(0, this.subtract("07", "09"));	// EIC
		}

		Debug.exit("EIC.calculate()");
		return this.line("10");
	}
}
