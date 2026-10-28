
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
`;

const FIELD_INFO = {
	// Field Name	Value Type	Is Line	Description
	// No Tax on Tips
	"01":			["",		true,	"Adjusted Gross Income"],
	"02a":			["",		true,	"Income from Puerto Rico"],
	"02b":			["",		true,	"Foreign Earned Income Housing Exclusion"],
	"02c":			["",		true,	"Foreign Earned Income Housing Deduction"],
	"02d":			["",		true,	"Samoa Income Exclusion"],
	"02e":			["",		true,	"Total Foreign Income"],
	"03":			["",		true,	"AGI + Foreign Income"],
	"04a":			["",		true,	"Qualified Tips"],
	"04b":			["",		true,	"Qualified Tips from Form 4137"],
	"04c":			["",		true,	"Qualified Tips Allowed"],
	"05":			["",		true,	"Qualified Tips from Business"],
	"06":			["",		true,	"Total Qualified Tips"],
	"07":			["",		true,	"Limit to Maximum Allowed"],
	"08":			["",		true,	"AGI + Foreign Income"],
	"09":			["",		true,	"Start of Phase Out"],
	"10":			["",		true,	"Amount Over Phase Out"],
	"11":			["",		true,	"Calculate Phase Out"],
	"12":			["",		true,	"Calculate Phase Out"],
	"13":			["",		true,	"Qualified Tip Deduction"],

	// No Tax on Overtime
	"14a":			["",		true,	"Qualified Overtime Pay"],
	"14b":			["",		true,	"Qualified Overtime Pay from Business"],
	"14c":			["",		true,	"Total Overtime Pay"],
	"15":			["",		true,	"Limit to Maximum Allowed"],
	"16":			["",		true,	"AGI + Foreign Income"],
	"17":			["",		true,	"Start of Phase Out"],
	"18":			["",		true,	"Amount Over Phase Out"],
	"19":			["",		true,	"Calculate Phase Out"],
	"20":			["",		true,	"Calculate Phase Out"],
	"21":			["",		true,	"Qualified Overtime Deduction"],

	// No Tax on Car Loan Interest
	"22a":			["",		true,	"Interest on Car Loan #1"],
	"22b":			["",		true,	"Interest on Car Loan #2"],
	"23":			["",		true,	"Total Interest"],
	"24":			["",		true,	"Limit to Maximum Allowed"],
	"25":			["",		true,	"AGI + Foreign Income"],
	"26":			["",		true,	"Start of Phase Out"],
	"27":			["",		true,	"Amount Over Phase Out"],
	"28":			["",		true,	"Calculate Phase Out"],
	"29":			["",		true,	"Calculate Phase Out"],
	"30":			["",		true,	"Qualified Car Loan Deduction"],

	// Enhanced Deduction for Seniors
	"31":			["",		true,	"AGI + Foreign Income"],
	"32":			["",		true,	"Start of Phase Out"],
	"33":			["",		true,	"Amount Over Phase Out"],
	"34":			["",		true,	"Calculate Phase Out"],
	"35":			["",		true,	"Possible Deduction"],
	"36a":			["",		true,	"Senior Deduction for Taxpayer"],
	"36b":			["",		true,	"Senior Deduction for Spouse"],
	"37":			["",		true,	"Senior Deduction"],
	"38":			["",		true,	"Total Additional Deductions"],
}

export class F1040S1A_HTML extends HTMLBlock {
	static getFieldInfo() {
		return FIELD_INFO;
	}

	static getHTML(uid) {
		throw new Error("getHTML() not implemented for F1040S1A.");
	}

	constructor() {
		super();
		this.name		= "f1040s1a";
		this.uid		= HTMLMgr.getMgr().allocateUID(this.name);
		this.html		= "";
		this.fields		= F1040S1A_HTML.getFieldInfo();
	}
}
