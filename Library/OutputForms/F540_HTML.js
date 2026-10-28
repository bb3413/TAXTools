
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
`;

const FIELD_INFO = {
	// Field Name	Value Type	Is Line	Description
	// Filing Status
	"001":			["",		true,	"Single"],
	"002":			["",		true,	"MFJ"],
	"003":			["",		true,	"MFS"],
	"004":			["",		true,	"HoH"],
	"005":			["",		true,	"QSS"],
	"006":			["",		true,	"Can Be a Dependent"],

	// Exemptions
	"007":			["",		true,	"Personal Exemption"],
	"008":			["",		true,	"Blind Exemption"],
	"009":			["",		true,	"Senior Exemption"],
	"010":			["",		true,	"Dependents Exemption"],
	"011":			["",		true,	"Total Exemptions"],

	// Taxable Income
	"012":			["",		true,	"Wages"],
	"013":			["",		true,	"Federal AGI"],
	"014":			["",		true,	"CA Adjustments - Subtractions"],
	"015":			["",		true,	"AGI - Subtractions"],
	"016":			["",		true,	"CA Adjustments - Additions"],
	"017":			["",		true,	"AGI + Additions = CA AGI"],
	"018":			["",		true,	"Deductions"],
	"019":			["",		true,	"Taxable Income"],

	// Tax
	"031":			["",		true,	"Tax"],
	"032":			["",		true,	"Exemptions"],
	"033":			["",		true,	"Tax - Exemptions"],
	"034":			["",		true,	"Tax from Schedule G1, Form 5870A"],
	"035":			["",		true,	"Total Tax"],
	"040":			["",		true,	"Child and Dependent Care Credit"],
	"043":			["",		true,	"Other Credit"],
	"044":			["",		true,	"Other Credit"],
	"045":			["",		true,	"Other Credit"],
	"046":			["",		true,	"Renter's Credit"],
	"047":			["",		true,	"Total Special Credits"],
	"048":			["",		true,	"Updated Tax"],

	// Other taxes
	"061":			["",		true,	"AMT"],
	"062":			["",		true,	"Mental Health Tax"],
	"063":			["",		true,	"Tax and Credit Recapture"],
	"064":			["",		true,	"Total Tax"],

	// Payments
	"071":			["",		true,	"Withholding"],
	"072":			["",		true,	"Estimated Tax Payments"],
	"073":			["",		true,	"Withholding from Forms 592-B and 593"],
	"074":			["",		true,	"Excess SDI or VPDI"],
	"075":			["",		true,	"Earned Income Tax Credit"],
	"076":			["",		true,	"Young Child Tax Credit"],
	"077":			["",		true,	"Foster Youth Tax Credit"],
	"078":			["",		true,	"Total Payments"],

	// Use Tax
	"091":			["",		true,	"Use tax"],

	// ISR Penalty
	"092":			["",		true,	"Individual Shared Responsibility Penalty"],

	// Overpaid Tax / Tax Due
	"093":			["",		true,	"Payments Balance"],
	"094":			["",		true,	"Use Tax Balance"],
	"095":			["",		true,	"Payments - ISRP"],
	"096":			["",		true,	"ISRP Balance"],
	"097":			["",		true,	"Overpaid Tax"],
	"098":			["",		true,	"Amount to Apply to Next Year"],
	"099":			["",		true,	"Overpaid"],
	"100":			["",		true,	"Tax Due"],

	// Contributions
	"110":			["",		true,	"Total Contributions"],

	// Amount You Owe
	"111":			["",		true,	"Amount You Owe"],

	// Interest and Penalties
	"112":			["",		true,	"Interest and Penalties"],
	"113":			["",		true,	"Underpayment of Estimated Tax"],
	"114":			["",		true,	"Amount Due"],

	// Refund
	"115":			["",		true,	"Refund"],
}

export class F540_HTML extends HTMLBlock {
	static getFieldInfo() {
		return FIELD_INFO;
	}

	static getHTML(uid) {
		throw new Error("getHTML() not implemented for F540.");
	}

	constructor() {
		super();
		this.name		= "f540";
		this.uid		= HTMLMgr.getMgr().allocateUID(this.name);
		this.html		= "";
		this.fields		= F540_HTML.getFieldInfo();
	}
}
