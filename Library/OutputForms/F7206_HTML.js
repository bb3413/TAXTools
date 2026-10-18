
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
`;

const FIELD_INFO = {
	// Field Name	Value Type	Is Line	Description
	"01":			["",		true,	"Health Insurance"],
	"02":			["",		true,	"LTC Insurance"],	// Rounded down by age
	"03":			["",		true,	"Total Health Insurance"],
	"04":			["",		true,	"Net Profit (business with Insurance"],
	"05":			["",		true,	"Net Profit (all businesses)"],
	"06":			["",		true,	"Profit Ratio"],
	"07":			["",		true,	"Deductible Part of SE Tax"],
	"07x":			["",		true,	"SE Tax * Profit Ratio"],
	"08":			["",		true,	"Profit - SE Tax"],
	"09":			["",		true,	"Retirement Plan Contributions, 1040S1, line 16"],
	"10":			["",		true,	"Profit - Retirement"],
	"11":			["",		true,	"Medicare Wages (W-2, box 5)"],
	"12":			["",		true,	"Form 2555, line 45"],
	"13":			["",		true,	""],
	"14":			["",		true,	"SEHI Deduction"],
}

export class F7206_HTML extends HTMLBlock {
	static getFieldInfo() {
		return FIELD_INFO;
	}

	static getHTML(uid) {
		throw new Error("getHTML() not implemented for F7206.");
	}

	constructor() {
		super();
		this.name= "f7206";
		this.uid= HTMLMgr.getMgr().allocateUID(this.name);
		this.html= "";
		this.fields= F7206_HTML.getFieldInfo();
	}
}
