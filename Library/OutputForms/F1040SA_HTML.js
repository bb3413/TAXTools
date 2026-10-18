
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
`;

const FIELD_INFO = {
	// Field Name	Value Type	Is Line	Description
	"01":			["",		true,	"Medical Expenses"],
	"02":			["",		true,	"AGI"],
	"03":			["",		true,	"7.5% or AGI"],
	"04":			["",		true,	"Medical Deduction"],
	"05a":			["",		true,	"State and Local Income Tax"],
	"05b":			["",		true,	"Real Estate Tax"],
	"05c":			["",		true,	"Personal Property Tax"],
	"05d":			["",		true,	"Total State and Local Taxes"],
	"05e":			["",		true,	"SALT after Limit"],
	"06":			["",		true,	"Other Taxes"],
	"07":			["",		true,	"Deduction for Taxes Paid"],
	"08a":			["",		true,	"Mortgage Interest"],
	"08b":			["",		true,	"Mortgage Interest Not from 1098"],
	"08c":			["",		true,	"Mortgage Points Not from 1098"],
	"08d":			["",		true,	"Reserved For Future Use"],
	"08e":			["",		true,	"Mortgage Deduction"],
	"09":			["",		true,	"Investment Interest"],
	"10":			["",		true,	"Interest Deduction"],
	"11":			["",		true,	"Cash Donations"],
	"12":			["",		true,	"Non-cash Donations"],
	"13":			["",		true,	"Carry-over Donations"],
	"14":			["",		true,	"Donation Deduction"],
	"15":			["",		true,	"Casualty and Theft Deduction"],
	"16":			["",		true,	"Other Deduction"],
	"17":			["",		true,	"Itemized Deductions"],
}

export class F1040SA_HTML extends HTMLBlock {
	static getFieldInfo() {
		return FIELD_INFO;
	}

	static getHTML(uid) {
		throw new Error("getHTML() not implemented for F1040SA.");
	}

	constructor() {
		super();
		this.name		= "f1040sa";
		this.uid		= HTMLMgr.getMgr().allocateUID(this.name);
		this.html		= "";
		this.fields		= F1040SA_HTML.getFieldInfo();
	}
}
