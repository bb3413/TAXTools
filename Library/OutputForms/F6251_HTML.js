
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
`;

const FIELD_INFO = {
	// Field Name	Value Type	Is Line	Description
	// Form 6251, Part I - AMT Income
	"01a":			["",		true,	"Total Deductions w/o Senior Deduction"],
	"01b":			["",		true,	"AGI - Deductions"],
	"02a":			["",		true,	"Deductions Allowed for AMT"],
	"02b":			["",		true,	"Taxable Refund"],
	"02c":			["",		true,	"Investment Interest Expense"],
	"02d":			["",		true,	"Depletion"],
	"02e":			["",		true,	"Net Operating Loss Deduction"],
	"02f":			["",		true,	"Alternative Tax Net Operating Loss Deduction"],
	"02g":			["",		true,	"Interest from Private Activity bonds"],
	"02h":			["",		true,	"Qualified Small Business Stock"],
	"02i":			["",		true,	"Exercise of Incentive Stock Options"],
	"02j":			["",		true,	"Estates and Trusts"],
	"02k":			["",		true,	"Disposition of Property"],
	"02l":			["",		true,	"Post-1986 Depreciation"],
	"02m":			["",		true,	"Passive Activities"],
	"02n":			["",		true,	"Loss Limitations"],
	"02o":			["",		true,	"Circulation Costs"],
	"02p":			["",		true,	"Long-term Contracts"],
	"02q":			["",		true,	"Mining Costs"],
	"02r":			["",		true,	"Research and Experimental Costs"],
	"02s":			["",		true,	"Installment Sales"],
	"02t":			["",		true,	"Intangible Drilling Costs"],
	"03":			["",		true,	"Other Income"],
	"04":			["",		true,	"AMT Income"],

	// Form 6251, Part II - Alternative Minimum Tax
	"05":			["",		true,	"AMT Exemption"],
	"06":			["",		true,	"AMT Income - Exemption"],
	"07":			["",		true,	"Result from Form 6251, Part III"],
	"08":			["",		true,	"AMT Foreign Tax Credit"],
	"09":			["",		true,	"Tentative Minimum Tax"],
	"10":			["",		true,	"Normal Income Tax (1040, line 13a)"],
	"11":			["",		true,	"Alternative Minimum Tax"],

	// Form 6251, Part III
	"12":			["",		true,	"AMT Income - AMT Exemption"],
	"13":			["",		true,	"Line 13"],
	"14":			["",		true,	"Line 14"],
	"15":			["",		true,	"Line 15"],
	"16":			["",		true,	"Line 16"],
	"17":			["",		true,	"Line 17"],
	"18":			["",		true,	"Line 18"],
	"19":			["",		true,	"Line 19"],
	"20":			["",		true,	"Line 20"],
	"21":			["",		true,	"Line 21"],
	"22":			["",		true,	"Line 22"],
	"23":			["",		true,	"Line 23"],
	"24":			["",		true,	"Line 24"],
	"25":			["",		true,	"Line 25"],
	"26":			["",		true,	"Line 26"],
	"27":			["",		true,	"Line 27"],
	"28":			["",		true,	"Line 28"],
	"29":			["",		true,	"Line 29"],
	"30":			["",		true,	"Line 30"],
	"31":			["",		true,	"Line 31"],
	"32":			["",		true,	"Line 32"],
	"33":			["",		true,	"Line 33"],
	"34":			["",		true,	"Line 34"],
	"35":			["",		true,	"Line 35"],
	"36":			["",		true,	"Line 36"],
	"37":			["",		true,	"Line 37"],
	"38":			["",		true,	"Line 38"],
	"39":			["",		true,	"Line 39"],
	"40":			["",		true,	"Line 40"],
}

export class F6251_HTML extends HTMLBlock {
static getFieldInfo() {
return FIELD_INFO;
}

static getHTML(uid) {
throw new Error("getHTML() not implemented for F6251.");
}

constructor() {
super();
this.name= "f6251";
this.uid= HTMLMgr.getMgr().allocateUID(this.name);
this.html= "";
this.fields= F6251_HTML.getFieldInfo();
}
}
