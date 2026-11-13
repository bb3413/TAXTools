
//
// This is the Social Security Benefits Worksheet from the
// 1040 Instructions (TY2025), lines 6a and 6b, page 32.
//
import { SINGLE, HOH, MFJ, QSS, MFS }	from "../TAXTools/TAXTools.js";

import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";

export class CreditLimitA extends TaxForm {
	constructor(formname) {
		Debug.enter("CreditLimitA.Constructor()");
		super(formname);
		this.title	= `Credit Limit Worksheet A`;

		this.lines["01"]	= new Line("Tax");
		this.lines["02"]	= new Line("Other Credits");
		this.lines["03"]	= new Line("Line 1 - line 2");
		this.lines["04"]	= new Line("Credit limit Worksheet B");
		this.lines["05"]	= new Line("Credit Limit");

		Debug.exit("CreditLimitA.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("CreditLimitA.calculate()");
		this.calculated = true;
		const tt = TaxTable.getTaxTable();
		const tp = Taxpayer.getTaxpayer();

		this.lines["01"].value	= TaxFormObj.getValue("F1040", "18");	// Tax
		this.lines["02"].value	=		// Other credits
			TaxFormObj.getValue("F1040S3", "01") +
			TaxFormObj.getValue("F1040S3", "02") +
			TaxFormObj.getValue("F1040S3", "03") +
			TaxFormObj.getValue("F1040S3", "04") +
			TaxFormObj.getValue("F1040S3", "05b") +
			TaxFormObj.getValue("F1040S3", "06d") +
			TaxFormObj.getValue("F1040S3", "06f") +
			TaxFormObj.getValue("F1040S3", "06l") +
			TaxFormObj.getValue("F1040S3", "06m");
		this.lines["03"].value	= this.subtract("01", "02");
		this.lines["04"].value	= 0;	// Credit limit Worksheet B
		this.lines["05"].value	= this.subtract("03", "04");	// Credit limit

		Debug.exit("CreditLimitA.calculate()");
		return this.line("05");
	}
}
