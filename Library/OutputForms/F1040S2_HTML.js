
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
`;

const FIELD_INFO = {
	// Field Name	Value Type	Is Line	Description
	// Tax
	"01a":			["",		true,	"Repayment of Advanced PTC"],
	"01b":			["",		true,	"Repayment of New Clean Vehicle Credit"],
	"01c":			["",		true,	"Repayment of Used Clean Vehicle Credit"],
	"01d":			["",		true,	"Repayment of EPE"],
	"01e":			["",		true,	"Excess net EPE"],
	"01f":			["",		true,	"20% of EP from Form 4255"],
	"01y":			["",		true,	"Other Tax"],
	"01z":			["",		true,	"Total additions to Tax"],
	"02":			["",		true,	"AMT"],
	"03":			["",		true,	"Total Extra Tax"],

	// Other Taxes
	"04":			["",		true,	"Self-employment Tax"],	// Times 2 for MFJ
	"05":			["",		true,	"SS Tax on Unreported Income"],
	"06":			["",		true,	"SS Tax Not Collected on Wages"],
	"07":			["",		true,	"Total Additional SS Tax"],
	"08":			["",		true,	"Additional Tax on IRAs"],
	"09":			["",		true,	"Household Employment Tax"],
	"10":			["",		true,	"Reserved for Future Use"],
	"11":			["",		true,	"Additional Medicare Tax"],
	"12":			["",		true,	"Investment Income Tax"],
	"13":			["",		true,	"Uncollected SS Tax on Tips"],
	"14":			["",		true,	"Interest on Tax Due"],
	"15":			["",		true,	"Interest on Deferred Tax"],
	"16":			["",		true,	"Repayment of Low-income Housing Credit"],
	"17a":			["",		true,	"Other Additional Taxes"],
	"17b":			["",		true,	"Repayment of Other Credits"],
	"17c":			["",		true,	"Additional Tax on HSA Distributions"],
	"17d":			["",		true,	"Additional Tax on HSA"],
	"17e":			["",		true,	"Additional Tax on Archer MSA Distributions"],
	"17f":			["",		true,	"Additional Tax on Advantage MSA Distributions"],
	"17g":			["",		true,	"Repayment of Charitable Contribution Deduction"],
	"17h":			["",		true,	"Income from Non-qualified 409A Plan"],
	"17i":			["",		true,	"Income from Non-qualified 457A Plan"],
	"17j":			["",		true,	"Section 72(m) Excess"],
	"17k":			["",		true,	"Golden Parachute Payments"],
	"17l":			["",		true,	"Tax on Accumulation Distribution of Trusts"],
	"17m":			["",		true,	"Excess Tax on Stock Compensation"],
	"17n":			["",		true,	"Look Back Interest"],
	"17o":			["",		true,	"Tax on Non-resident Income"],
	"17p":			["",		true,	"Interest from Form 8621, line 16f"],
	"17q":			["",		true,	"Interest from Form 8621, line 24"],
	"17z":			["",		true,	"Other Taxes"],
	"18":			["",		true,	"Total Additional Taxes"],
	"19":			["",		true,	"Repayment of EPE from Form 4255"],
	"20":			["",		true,	"Tax from Form 965-A"],
	"21":			["",		true,	"Total Other Taxes"],
}

export class F1040S2_HTML extends HTMLBlock {
	static getFieldInfo() {
		return FIELD_INFO;
	}

	static getHTML(uid) {
		throw new Error("getHTML() not implemented for F1040S2.");
	}

	constructor() {
		super();
		this.name		= "f1040s2";
		this.uid		= HTMLMgr.getMgr().allocateUID(this.name);
		this.html		= "";
		this.fields		= F1040S2_HTML.getFieldInfo();
	}
}
