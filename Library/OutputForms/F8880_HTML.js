
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
`;

const FIELD_INFO = {
	// Field Name	Value Type	Is Line	Description
	"01a":			["",		true,	"Traditional and Roth IRA contributions"],
	"01b":			["",		true,	"Traditional and Roth IRA contributions"],
	"02a":			["",		true,	"Elective deferrals to a 401(k), employer plan"],
	"02b":			["",		true,	"Elective deferrals to a 401(k), employer plan"],
	"03a":			["",		true,	"Add lines 1 and 2"],
	"03b":			["",		true,	"Add lines 1 and 2"],
	"04a":			["",		true,	"Certain distributions received after 2022"],
	"04b":			["",		true,	"Certain distributions received after 2022"],
	"05a":			["",		true,	"Subtract line 4 from line 3"],
	"05b":			["",		true,	"Subtract line 4 from line 3"],
	"06a":			["",		true,	"Enter smaller of line 5 or $2,000"],
	"06b":			["",		true,	"Enter smaller of line 5 or $2,000"],
	"07":			["",		true,	"Add the amounts on line 6"],
	"08":			["",		true,	"Enter the amount from Form 1040, line 11a"],
	"09":			["",		true,	"Enter amount from the table"],
	"10":			["",		true,	"Multiply line 7 by line 9"],
	"11":			["",		true,	"Limitation based on tax liability"],
	"12":			["",		true,	"Credit for retirement savings contributions"],
	"ws1":			["",		true,	"Total tax"],
	"ws2":			["",		true,	"Some credits from Schedule 3"],
	"ws3":			["",		true,	"ws1 - ws2"],
}

export class F8880_HTML extends HTMLBlock {
	static getFieldInfo() {
		return FIELD_INFO;
	}

	static getHTML(uid) {
		throw new Error("getHTML() not implemented for F8880.");
	}

	constructor() {
		super();
		this.name		= "f8880";
		this.uid		= HTMLMgr.getMgr().allocateUID(this.name);
		this.html		= "";
		this.fields		= F8880_HTML.getFieldInfo();
	}
}
