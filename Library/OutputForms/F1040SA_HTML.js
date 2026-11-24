
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
`;

const FIELD_INFO = {
	// Field Name	Value Type	Is Line	Description
	// Medical Deductions
	"01":			["",		true,	"Medical Expenses"],
	"02":			["",		true,	"AGI"],
	"03":			["",		true,	"7.5% or AGI"],
	"04":			["",		true,	"Medical Deduction"],

	// Taxes Paid Deduction
	"05a":			["",		true,	"State and Local Income Tax"],
	"05b":			["",		true,	"Real Estate Tax"],
	"05c":			["",		true,	"Personal Property Tax"],
	"05d":			["",		true,	"Total State and Local Taxes"],
	"05e":			["",		true,	"State and Local Taxes after Limit"],
	"06":			["",		true,	"Other Taxes"],
	"07":			["",		true,	"Taxes Paid Deduction"],

	// Interest Paid Deduction
	"08a":			["",		true,	"Mortgage Interest"],
	"08b":			["",		true,	"Mortgage Interest Not from 1098"],
	"08c":			["",		true,	"Mortgage Points Not from 1098"],
	"08d":			["",		true,	"Mortgage Interest Premuiums"],
	"08e":			["",		true,	"Mortgage Deduction"],
	"09":			["",		true,	"Investment Interest"],
	"10":			["",		true,	"Interest Paid Deduction"],

	// Gifts to Charity
	"11":			["",		true,	"Cash Donations"],
	"12":			["",		true,	"Non-cash Donations"],
	"13":			["",		true,	"Charitable Donations after Limit"],
	"14":			["",		true,	"Carry-over Donations"],
	"15":			["",		true,	"Donation Deduction"],

	// Casualty and Theft Losses
	"16":			["",		true,	"Casualty and Theft Deduction"],

	// Other Itemized Deductions
	"17a":			["",		true,	"Gambling Losses"],
	"17b":			["",		true,	"Disaster Loss"],
	"17c":			["",		true,	"Standard Deduction with Disaster Loss"],
	"17d":			["",		true,	"Casualty and Theft Loss"],
	"17e":			["",		true,	"Federal Estate Tax"],
	"17f":			["",		true,	"Amoritized Bond Premium"],
	"17g":			["",		true,	"Loss from Debt"],
	"17h":			["",		true,	"Repayment from Claim of Right"],
	"17i":			["",		true,	"Unrecovered Investment"],
	"17j":			["",		true,	"Impairment Expenses"],
	"17k":			["",		true,	"Educator expenses"],
	"17z":			["",		true,	"Total Other Itemized Deduction"],

	// Total Itemized Deductions
	"18":			["",		true,	"Itemized Deductions"],
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
