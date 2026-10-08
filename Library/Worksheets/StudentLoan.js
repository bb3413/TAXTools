
//
// This is the Student Loan Interest Deduction Worksheet for Schedule 1, line 21.
// It is documented in the 1040 Instructions (TY2025) on pages 98-99.
//
import { SINGLE, HOH, MFJ, QSS, MFS }	from "../TAXTools/TAXTools.js";

import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";

export class StudentLoan extends TaxForm {
	constructor(formname) {
		Debug.enter("StudentLoan.Constructor()");
		super(formname);
		
		this.lines["01"]	= new Line("Student Loan Interest");
		this.lines["02"]	= new Line("Total Income");
		this.lines["03"]	= new Line("Disallowed adjustments");
		this.lines["04"]	= new Line("Line 2 - Line 3");
		this.lines["05"]	= new Line("Start of phase out");
		this.lines["06"]	= new Line("Amount over phase out");
		this.lines["07"]	= new Line("");
		this.lines["08"]	= new Line("Amount of phase out");
		this.lines["09"]	= new Line("Student Loan Interest Deduction") ;

		Debug.exit("StudentLoan.Constructor()");
	}

	calculate(interest) {
		Ensure.isNumber(interest);

		// if (this.calculated) {
		// 	throw new Error(`${this.formname} already calculated.`);
		// }

		Debug.enter("StudentLoan.calculate()");
		this.calculated = true;
		const tt = TaxTable.getTaxTable();
		const tp = Taxpayer.getTaxpayer();
		const f1040s1 = TaxFormObj.getForm("F1040S1");

		const max_interest	= tt.getTaxValue("MaxStudentLoanInterest", tp.filing_status);
		const phase_out		= tt.getTaxValue("StudentLoanPhaseOut", tp.filing_status);
		const factor		= tp.filing_status === MFJ ? 30000 : 15000;

		this.lines["01"].value	= Math.min(max_interest, interest);
		this.lines["02"].value	= TaxFormObj.getValue("F1040", "09");	// Total Income
		this.lines["03"].value	= f1040s1.add("11", "12", "13", "14",
									"15", "16", "17", "18", "19a",
									"20", "23", "25");
		this.lines["04"].value	= this.subtract("02", "03");
		this.lines["05"].value	= phase_out;
		if (this.line("04") > this.line("05")) {
			this.lines["06"].value = this.subtract("04", "05");
			this.lines["07"].value	= Math.min(1000, Math.round(this.line("06") / factor));
			this.lines["08"].value	= this.line("01") * 7;
		} else {
			this.lines["08"].value	= 0;
		}
		this.lines["09"].value	= this.subtract("01", "08");

		Debug.exit("StudentLoan.calculate()");
		return this.line("09");
	}
}
