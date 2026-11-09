
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
`;

const FIELD_INFO = {
	// Field Name	Value Type	Is Line	Description
	"01":			["",		true,	"Adjusted Gross Income"],
	"02a":			["",		true,	"Income from Puerto Rico"],
	"02b":			["",		true,	"Foreign Earned Income Housing Exclusion"],
	"02c":			["",		true,	"Foreign Earned Income Housing Deduction"],
	"02d":			["",		true,	"Samoa Income Exclusion"],
	"02e":			["",		true,	"Total Foreign Income"],
	"03":			["",		true,	"AGI + Foreign Income"],

	// No Tax on Tips
	"04a1":			["text",	true,	"Employer name"],
	"04a2":			["text",	true,	"EIN"],
	"04a3":			["",		true,	"Tips from W-2, box 12, code TP"],
	"04a4":			["",		true,	"Tips from form 4137, line 1"],
	"04a5":			["",		true,	"Max 04a3 or 04a4"],
	"05":			["",		true,	"Qualified Tips"],

	"06a1":			["text",	true,	"Business name"],
	"06a2":			["text",	true,	"EIN"],
	"06a3":			["",		true,	"Schedule C, line 31"],
	"06a4":			["",		true,	"Other allocatable deductions"],
	"06a5":			["",		true,	"06a3 - 06a4"],
	"06a6":			["text",	true,	"EIN from 1st 1099"],
	"06a7":			["",		true,	"Tips from 1st 1099"],
	"06a8":			["text",	true,	"EIN from 2nd 1099"],
	"06a9":			["",		true,	"Tips from 2nd 1099"],
	"06a10":		["text",	true,	"EIN from 3rd 1099"],
	"06a11":		["",		true,	"Tips from 3rd 1099"],
	"06a12":		["",		true,	"Add 06a7, 06a9, 06a11"],
	"06a13":		["",		true,	"Min 06a5 06a12"],

	"07":			["",		true,	"Add 06a5, 06b5, 06c5, 06d5, 06e5"],
	"08":			["",		true,	"Total Qualified Tips"],
	"09":			["",		true,	"Limit to Maximum Allowed"],
	"10":			["",		true,	"AGI + Foreign Income"],
	"11":			["",		true,	"Start of Phase Out"],
	"12":			["",		true,	"Amount Over Phase Out"],
	"13":			["",		true,	"Calculate Phase Out"],
	"14":			["",		true,	"Calculate Phase Out"],
	"15":			["",		true,	"Qualified Tip Deduction"],

	// No Tax on Overtime
	"16a1":			["text",	true,	"Employer Name"],
	"16a2":			["text",	true,	"EIN"],
	"16a3":			["",		true,	"Overtime Pay from W-2, box 12, code TT"],
	"17":			["",		true,	"Total Overtime Pay from W-2"],

	"18a1":			["text",	true,	"Business Name"],
	"18a2":			["text",	true,	"EIN"],
	"18a2":			["text",	true,	"Payer TIN"],
	"18a4":			["",		true,	"Overtime Pay from 1099"],

	"19":			["",		true,	"Total Overtime Pay from 1099"],
	"20":			["",		true,	"Total Overtime Pay"],
	"21":			["",		true,	"Limit to Maximum Allowed"],
	"22":			["",		true,	"AGI + Foreign Income"],
	"23":			["",		true,	"Start of Phase Out"],
	"24":			["",		true,	"Amount Over Phase Out"],
	"25":			["",		true,	"Calculate Phase Out"],
	"26":			["",		true,	"Calculate Phase Out"],
	"27":			["",		true,	"Qualified Overtime Deduction"],

	// No Tax on Car Loan Interest
	"28a":			["",		true,	"Interest on Car Loan #1"],
	"28b":			["",		true,	"Interest on Car Loan #2"],
	"29":			["",		true,	"Total Interest"],
	"30":			["",		true,	"Limit to Maximum Allowed"],
	"31":			["",		true,	"AGI + Foreign Income"],
	"32":			["",		true,	"Start of Phase Out"],
	"33":			["",		true,	"Amount Over Phase Out"],
	"34":			["",		true,	"Calculate Phase Out"],
	"35":			["",		true,	"Calculate Phase Out"],
	"36":			["",		true,	"Qualified Car Loan Deduction"],

	// Enhanced Deduction for Seniors
	"37":			["",		true,	"AGI + Foreign Income"],
	"38":			["",		true,	"Start of Phase Out"],
	"39":			["",		true,	"Amount Over Phase Out"],
	"40":			["",		true,	"Calculate Phase Out"],
	"41":			["",		true,	"Possible Deduction"],
	"42a":			["",		true,	"Senior Deduction for Taxpayer"],
	"42b":			["",		true,	"Senior Deduction for Spouse"],
	"43":			["",		true,	"Senior Deduction"],
	"44":			["",		true,	"Total Additional Deductions"],
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
