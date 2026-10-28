
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
`;

const FIELD_INFO = {
	// Field Name	Value Type	Is Line	Description
	// Additions to Income
	"01":			["",		true,	"Taxable Refund"],
	"02a":			["",		true,	"Alimony Received"],
	"02b":			["",		true,	"Received Divorce Date"],
	"03":			["",		true,	"Business Income"],
	"04":			["",		true,	"Other Gains"],
	"05":			["",		true,	"Schedule E Income"],
	"06":			["",		true,	"Farm Income"],
	"07":			["",		true,	"Unemployment Compensation"],
	"08a":			["",		true,	"Net Operating Loss"],	// Subtract
	"08b":			["",		true,	"Gambling"],
	"08c":			["",		true,	"Cancellation of Debt"],
	"08d":			["",		true,	"Foreign Earned Income Exclusion"],	// Subtract
	"08e":			["",		true,	"Income from form 8853"],
	"08f":			["",		true,	"Income from form 8889"],
	"08g":			["",		true,	"Alaska Permanent Fund"],
	"08h":			["",		true,	"Jury Duty Pay"],
	"08i":			["",		true,	"Prizes and Awards"],
	"08j":			["",		true,	"Hobby Income"],
	"08k":			["",		true,	"Stock Options"],
	"08l":			["",		true,	"Income from Rent"],
	"08m":			["",		true,	"USOC Prize"],
	"08n":			["",		true,	"Section 951(a) Inclusion"],
	"08o":			["",		true,	"Section 951A(a) Inclusion"],
	"08p":			["",		true,	"Excess Business Loss"],
	"08q":			["",		true,	"Taxable ABLE Distributions"],
	"08r":			["",		true,	"Scholarship Not on W-2"],
	"08s":			["",		true,	"Non-taxable Medicaid Waiver Payment"],	// Subtract
	"08t":			["",		true,	"Pension from Non-qualified Plan"],
	"08u":			["",		true,	"Wages While Incarcerated"],
	"08v":			["",		true,	"Digital Assets Received"],
	"08z":			["",		true,	"Other Income"],
	"09":			["",		true,	"Total Other Income"],
	"10":			["",		true,	"Additional Income"],

	// Adjustments to Income
	"11":			["",		true,	"Educator Expense"],
	"12":			["",		true,	"Business Expense from Form 2106"],
	"13":			["",		true,	"HSA Deduction"],
	"14":			["",		true,	"Moving Expenses"],
	"15":			["",		true,	"Deductible SE Tax"],
	"16":			["",		true,	"Deductible SEP, Simple"],
	"17":			["",		true,	"Self-employed Health Insurance"],
	"18":			["",		true,	"Early Withdrawal Penalty"],
	"19a":			["",		true,	"Alimony Paid"],
	"19b":			["",		true,	"Recipient SSN"],
	"19c":			["",		true,	"Paid Divorce Date"],
	"20":			["",		true,	"IRA Deduction"],
	"21":			["",		true,	"Student Loan Interest Deduction"],
	"22":			["",		true,	"Reserved for Future Use"],
	"23":			["",		true,	"Archer MSA Deduction"],
	"24a":			["",		true,	"Jury Duty Pay"],
	"24b":			["",		true,	"Rental Expense (see line 8l)"],
	"24c":			["",		true,	"Non-taxable amount is USOC"],
	"24d":			["",		true,	"Reforestation Expenses"],
	"24e":			["",		true,	"Repayment of Unemployment Expenses"],
	"24f":			["",		true,	"Contribution to 501(c) Pension"],
	"24g":			["",		true,	"Contributions to 403(b) Plan"],
	"24h":			["",		true,	"Attorney Fees"],
	"24i":			["",		true,	"Attorney Fees"],
	"24j":			["",		true,	"Foreign Earned Income Housing Deduction"],
	"24k":			["",		true,	"Excess Deduction from Form 1041"],
	"24z":			["",		true,	"Other Adjustments"],
	"25":			["",		true,	"Total Other Adjustments"],
	"26":			["",		true,	"Adjustments to Income"],
}

export class F1040S1_HTML extends HTMLBlock {
	static getFieldInfo() {
		return FIELD_INFO;
	}

	static getHTML(uid) {
		throw new Error("getHTML() not implemented for F1040S1.");
	}

	constructor() {
		super();
		this.name		= "f1040s1";
		this.uid		= HTMLMgr.getMgr().allocateUID(this.name);
		this.html		= "";
		this.fields		= F1040S1_HTML.getFieldInfo();
	}
}
