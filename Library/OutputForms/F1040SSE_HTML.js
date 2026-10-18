
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
`;

const FIELD_INFO = {
	// Field Name	Value Type	Is Line	Description
	"01a":			["",		true,	"Not used"],
	"01b":			["",		true,	"Not used"],
	"02":			["",		true,	"Net profit from business"],
	"03":			["",		true,	"Total self-employment income"],
	"04a":			["",		true,	"92.35%"],
	"04b":			["",		true,	"Ignore"],
	"04c":			["",		true,	"Add lines 04a and 04b"],
	"05a":			["",		true,	"Church employee income"],
	"05b":			["",		true,	"92.35%"],
	"06":			["",		true,	"Add lines 04c and 05b"],
	"07":			["",		true,	"Maximum amount of wages subject to SS tax"],
	"08a":			["",		true,	"W-2, boxes 3 and 7"],
	"08b":			["",		true,	"Unreported tips subject to ss tax"],
	"08c":			["",		true,	"Wages subject to ss tax"],
	"08d":			["",		true,	"Wages outside business subject to SS tax"],
	"09":			["",		true,	""],
	"10":			["",		true,	"12.4% Social Security tax"],
	"11":			["",		true,	"2.9% Medicare tax"],
	"12":			["",		true,	"Social Security + Medicare = SE Tax"],
	"13":			["",		true,	"SE Tax Deduction"],
}

export class F1040SSE_HTML extends HTMLBlock {
	static getFieldInfo() {
		return FIELD_INFO;
	}

	static getHTML(uid) {
		throw new Error("getHTML() not implemented for F1040SSE.");
	}

	constructor() {
		super();
		this.name		= "f1040sse";
		this.uid		= HTMLMgr.getMgr().allocateUID(this.name);
		this.html		= "";
		this.fields		= F1040SSE_HTML.getFieldInfo();
	}
}
