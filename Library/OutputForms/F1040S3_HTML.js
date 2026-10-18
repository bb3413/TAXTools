
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
`;

const FIELD_INFO = {
	// Field Name	Value Type	Is Line	Description
	// Non-refundable Credits
	"01":			["",		true,	"Foreign Tax Credit"],
	"02":			["",		true,	"Child and Dependent Care Credit"],
	"03":			["",		true,	"Education Credit"],
	"04":			["",		true,	"Retirement Savings Credit"],
	"05a":			["",		true,	"Residential Clean Energy Credit"],
	"05b":			["",		true,	"Energy Efficient Home Credit"],
	"06a":			["",		true,	"General Business Credit"],
	"06b":			["",		true,	"Credit for Prior Year Minimum Tax"],
	"06c":			["",		true,	"Adoption Credit"],
	"06d":			["",		true,	"Credit for Elderly or Disabled"],
	"06e":			["",		true,	"Reserved for Future Use"],
	"06f":			["",		true,	"Clean Vehicle Credit"],
	"06g":			["",		true,	"Mortgage Interest Credit"],
	"06h":			["",		true,	"DC Home Buyer Credit"],
	"06i":			["",		true,	"EV Credit"],
	"06j":			["",		true,	"Refueling Property Credit"],
	"06k":			["",		true,	"Tax Credit Bond Holder Credit"],
	"06l":			["",		true,	"Partner's Additional Reporting"],
	"06m":			["",		true,	"Used EV Credit"],
	"06z":			["",		true,	"Non-refundable Credits Not Listed"],
	"07":			["",		true,	"Total Other Non-refundable Credits"],
	"08":			["",		true,	"Total Non-refundable Credits"],

	// Other Payments and Refundable Credits
	"09":			["",		true,	"PTC"],
	"10":			["",		true,	"Amount Paid with Extension Request"],
	"11":			["",		true,	"Excess SS Withheld"],
	"12":			["",		true,	"Tax on Fuels Credit"],
	"13a":			["",		true,	"Undistributed LT Gains"],
	"13b":			["",		true,	"Section 1341 Credit"],
	"13c":			["",		true,	"Payment from Form 3800"],
	"13d":			["",		true,	"Deferred 965 Tax Liability"],
	"13z":			["",		true,	"Other Refundable Credits"],
	"14":			["",		true,	"Total Other Refundable Credits"],
	"15":			["",		true,	"Total Refundable Credits"],
}

export class F1040S3_HTML extends HTMLBlock {
	static getFieldInfo() {
		return FIELD_INFO;
	}

	static getHTML(uid) {
		throw new Error("getHTML() not implemented for F1040S3.");
	}

	constructor() {
		super();
		this.name		= "f1040s3";
		this.uid		= HTMLMgr.getMgr().allocateUID(this.name);
		this.html		= "";
		this.fields		= F1040S3_HTML.getFieldInfo();
	}
}
