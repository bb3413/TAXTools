
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
`;

const FIELD_INFO = {
	// Field Name	Value Type	Is Line	Description
	// Child Tax Credit and Credit for Other Dependents
	"01":			["",		true,	"Amount from 1040, line 11b (AGI)"],
	"02a":			["",		true,	"Income from Puerto Rico that you excluded"],
	"02b":			["",		true,	"Foreign earned income Form 2555"],
	"02c":			["",		true,	"Income from Samoa"],
	"02d":			["",		true,	"Add lines 2a through 2c"],
	"03":			["",		true,	"Add lines 1 and 2d"],
	"04":			["",		true,	"Number of qualifying children"],
	"05":			["",		true,	"Multiply line 4 by $2,200"],
	"06":			["",		true,	"Number of other dependents"],
	"07":			["",		true,	"Multiply line 6 by $500 "],
	"08":			["",		true,	"Add lines 5 and 7"],
	"09":			["",		true,	"AGI limit"],
	"10":			["",		true,	"Subtract line 9 from 3"],
	"11":			["",		true,	"Multiply line 10 by 5%"],
	"12":			["",		true,	"Is line 8 more than 11"],
	"13":			["",		true,	"Amount from Credit Limit Worksheet A"],
	"14":			["",		true,	"Enter the smaller of line 12 or 13"],

	// Additional Child Tax Credit for all filers
	"15":			["",		true,	"Reserved for future use"],
	"16a":			["",		true,	"Subtract line 14 from line 12"],
	"16b":			["",		true,	"Number of qualifying children"],
	"17":			["",		true,	"Smaller of line 16a or 16b"],
	"18a":			["",		true,	"Earned income"],
	"18b":			["",		true,	"Nontaxable combat pay"],
	"19":			["",		true,	"Is the amount on line 18a more than max credit"],
	"20":			["",		true,	"Multiply the amount on line 19 by 15%"],

	// Filers with three or more children and redidents of Puerto Rico
	"21":			["",		true,	"Withheld social security taxes"],
	"22":			["",		true,	"Total S1, line 15; S2, line 16c; and S2, line 17c"],
	"23":			["",		true,	"Add lines 21 and 22"],
	"24":			["",		true,	"Amounts from Form 1040, line 27a, and S3, line 1"],
	"25":			["",		true,	"Subtract line 24 from 23"],
	"26":			["",		true,	"Enter the larger of line 20 or 25"],

	// Additional Child Tax Credit
	"27":			["",		true,	"Smaller of line 17 or 26"],
}

export class F8812_HTML extends HTMLBlock {
	static getFieldInfo() {
		return FIELD_INFO;
	}

	static getHTML(uid) {
		throw new Error("getHTML() not implemented for F8812.");
	}

	constructor() {
		super();
		this.name= "f8812";
		this.uid= HTMLMgr.getMgr().allocateUID(this.name);
		this.html= "";
		this.fields= F8812_HTML.getFieldInfo();
	}
}
