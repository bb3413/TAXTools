
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
}

export class F8812P1_HTML extends HTMLBlock {
	static getFieldInfo() {
		return FIELD_INFO;
	}

	static getHTML(uid) {
		throw new Error("getHTML() not implemented for F8812P1.");
	}

	constructor() {
		super();
		this.name= "f8812p1";
		this.uid= HTMLMgr.getMgr().allocateUID(this.name);
		this.html= "";
		this.fields= F8812P1_HTML.getFieldInfo();
	}
}
