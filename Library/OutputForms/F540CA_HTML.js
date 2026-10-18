
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
`;

const FIELD_INFO = {
	// Field Name	Value Type	Is Line	Description
	// Part I Income Adjustment Schedule - Section A
	// Income
	"A-01aA":		["",		true,	"Wages"],
	"A-01aB":		["",		true,	"Subtract from Wages"],
	"A-01aC":		["",		true,	"Add to Wages"],

	"A-01bA":		["",		true,	"Household Wages"],
	"A-01bB":		["",		true,	"Subtract from Household Wages"],
	"A-01bC":		["",		true,	"Add to Household Wages"],

	"A-01cA":		["",		true,	"Tip Income"],
	"A-01cB":		["",		true,	"Subtract from Tip Income"],
	"A-01cC":		["",		true,	"Add to Tip Income"],

	"A-01dA":		["",		true,	"Medicaid Waiver Payments"],
	"A-01dB":		["",		true,	"Subtract from Medicaid Waiver Payments"],
	"A-01dC":		["",		true,	"Add to Medicaid Waiver Payments"],

	"A-01eA":		["",		true,	"Dependent Care Benefits"],
	"A-01eB":		["",		true,	"Subtract from Dependent Care Benefits"],
	"A-01eC":		["",		true,	"Add to Dependent Care Benefits"],

	"A-01fA":		["",		true,	"Adoption Benefits"],
	"A-01fB":		["",		true,	"Subtract from Adoption Benefits"],
	"A-01fC":		["",		true,	"Add to Adoption Benefits"],

	"A-01gA":		["",		true,	"Wages from Form 8919"],
	"A-01gB":		["",		true,	"Subtract from Wages from Form 8919"],
	"A-01gC":		["",		true,	"Add to Wages from Form 8919"],

	"A-01hA":		["",		true,	"Other Earned Income"],
	"A-01hB":		["",		true,	"Subtract from Other Earned Income"],
	"A-01hC":		["",		true,	"Add to Other Earned Income"],

	"A-01iA":		["",		true,	"Nontaxable Combat Pay"],
	"A-01iB":		["",		true,	"Subtract from Nontaxable Combat Pay"],
	"A-01iC":		["",		true,	"Add to Nontaxable Combat Pay"],

	"A-01zA":		["",		true,	"Total Earned Income"],
	"A-01zB":		["",		true,	"Subtract from Earned Income"],
	"A-01zC":		["",		true,	"Add to Earned Income"],

	"A-02a":		["",		true,	"Tax-exempt Interest"],
	"A-02bA":		["",		true,	"Taxable Interest"],
	"A-02bB":		["",		true,	"Subtract from Taxable Interest"],
	"A-02bC":		["",		true,	"Add to Taxable Interest"],

	"A-03a":		["",		true,	"Qualified Dividends"],
	"A-03bA":		["",		true,	"Ordinary Dividends"],
	"A-03bB":		["",		true,	"Subtract from Ordinary Dividends"],
	"A-03bC":		["",		true,	"Add to Ordinary Dividends"],

	"A-04a":		["",		true,	"IRA Distributions"],
	"A-04bA":		["",		true,	"Taxable IRA"],
	"A-04bB":		["",		true,	"Subtract from Taxable IRA"],
	"A-04bC":		["",		true,	"Add to Taxable IRA"],

	"A-05a":		["",		true,	"Pensions and Annuities"],
	"A-05bA":		["",		true,	"Taxable Pensions and Annuities"],
	"A-05bB":		["",		true,	"Subtract from Taxable Pensions and Annuities"],
	"A-05bC":		["",		true,	"Add to Taxable Pensions and Annuities"],

	"A-06a":		["",		true,	"Social Security Benefits"],
	"A-06bA":		["",		true,	"Taxable Social Security"],
	"A-06bB":		["",		true,	"Subtract from Taxable Social Security"],
	"A-06bC":		["",		true,	"Add to Taxable Social Security"],

	"A-07aA":		["",		true,	"Capital Gain"],
	"A-07aB":		["",		true,	"Subtract from Capital Gain"],
	"A-07aC":		["",		true,	"Add to Capital Gain"],

	// Part I Income Adjustment Schedule - Section B
	// Form 1040S1 Additional Income
	"B-01A":		["",		true,	"Taxable Refund"],
	"B-01B":		["",		true,	"Subtract from Taxable Refund"],
	"B-01C":		["",		true,	"Add to Taxable Refund"],

	"B-02b":		["",		true,	"Divorce Date"],
	"B-02aA":		["",		true,	"Alimony Received"],
	"B-02aB":		["",		true,	"Subtract from Alimony Received"],
	"B-02aC":		["",		true,	"Add to Alimony Received"],

	"B-03A":		["",		true,	"Business Income"],
	"B-03B":		["",		true,	"Subtract from Business Income"],
	"B-03C":		["",		true,	"Add to Business Income"],

	"B-04A":		["",		true,	"Other Gains"],
	"B-04B":		["",		true,	"Subtract from Other Gains"],
	"B-04C":		["",		true,	"Add to Other Gains"],

	"B-05A":		["",		true,	"Schedule E Income"],
	"B-05B":		["",		true,	"Subtract from Schedule E Income"],
	"B-05C":		["",		true,	"Add to Schedule E Income"],

	"B-06A":		["",		true,	"Farm Income"],
	"B-06B":		["",		true,	"Subtract from Farm Income"],
	"B-06C":		["",		true,	"Add to Farm Income"],

	"B-07A":		["",		true,	"Unemployment Compensation"],
	"B-07B":		["",		true,	"Subtract from Unemployment Compensation"],
	"B-07C":		["",		true,	"Add to Unemployment Compensation"],

	"B-08aA":		["",		true,	"Net Operating Loss"],
	"B-08aB":		["",		true,	"Subtract from Net Operating Loss"],
	"B-08aC":		["",		true,	"Add to Net Operating Loss"],

	"B-08bA":		["",		true,	"Gambling"],
	"B-08bB":		["",		true,	"Subtract from Gambling"],
	"B-08bC":		["",		true,	"Add to Gambling"],

	"B-08cA":		["",		true,	"Cancellation of Debt"],
	"B-08cB":		["",		true,	"Subtract from Cancellation of Debt"],
	"B-08cC":		["",		true,	"Add to Cancellation of Debt"],

	"B-08dA":		["",		true,	"Foreign Earned Income Exclusion"],
	"B-08dB":		["",		true,	"Subtract from Foreign Earned Inc Exclusion"],
	"B-08dC":		["",		true,	"Add to Foreign Earned Income Exclusion"],

	"B-08eA":		["",		true,	"Income from form 8853"],
	"B-08eB":		["",		true,	"Subtract from Income from form 8853"],
	"B-08eC":		["",		true,	"Add to Income from form 8853"],

	"B-08fA":		["",		true,	"Income from form 8889"],
	"B-08fB":		["",		true,	"Subtract from Income from form 8889"],
	"B-08fC":		["",		true,	"Add to Income from form 8889"],

	"B-08gA":		["",		true,	"Alaska Permanent Fund"],
	"B-08gB":		["",		true,	"Subtract from Alaska Permanent Fund"],
	"B-08gC":		["",		true,	"Add to Alaska Permanent Fund"],

	"B-08hA":		["",		true,	"Jury Duty Pay"],
	"B-08hB":		["",		true,	"Subtract from Jury Duty Pay"],
	"B-08hC":		["",		true,	"Add to Jury Duty Pay"],

	"B-08iA":		["",		true,	"Prizes and Awards"],
	"B-08iB":		["",		true,	"Subtract from Prizes and Awards"],
	"B-08iC":		["",		true,	"Add to Prizes and Awards"],

	"B-08jA":		["",		true,	"Hobby Income"],
	"B-08jB":		["",		true,	"Subtract from Hobby Income"],
	"B-08jC":		["",		true,	"Add to Hobby Income"],

	"B-08kA":		["",		true,	"Stock Options"],
	"B-08kB":		["",		true,	"Subtract from Stock Options"],
	"B-08kC":		["",		true,	"Add to Stock Options"],

	"B-08lA":		["",		true,	"Income from Rent"],
	"B-08lB":		["",		true,	"Subtract from Income from Rent"],
	"B-08lC":		["",		true,	"Add to Income from Rent"],

	"B-08mA":		["",		true,	"USOC Prize"],
	"B-08mB":		["",		true,	"Subtract from USOC Prize"],
	"B-08mC":		["",		true,	"Add to USOC Prize"],

	"B-08nA":		["",		true,	"Section 951(a) Inclusion"],
	"B-08nB":		["",		true,	"Subtract from Section 951(a) Inclusion"],
	"B-08nC":		["",		true,	"Add to Section 951(a) Inclusion"],

	"B-08oA":		["",		true,	"Section 951A(a) Inclusion"],
	"B-08oB":		["",		true,	"Subtract from Section 951A(a) Inclusion"],
	"B-08oC":		["",		true,	"Add to Section 951A(a) Inclusion"],

	"B-08pA":		["",		true,	"Excess Business Loss"],
	"B-08pB":		["",		true,	"Subtract from Excess Business Loss"],
	"B-08pC":		["",		true,	"Add to Excess Business Loss"],

	"B-08qA":		["",		true,	"Taxable ABLE Distributions"],
	"B-08qB":		["",		true,	"Subtract from Taxable ABLE Distributions"],
	"B-08qC":		["",		true,	"Add to Taxable ABLE Distributions"],

	"B-08rA":		["",		true,	"Scholarship Not on W-2"],
	"B-08rB":		["",		true,	"Subtract from Scholarship Not on W-2"],
	"B-08rC":		["",		true,	"Add to Scholarship Not on W-2"],

	"B-08sA":		["",		true,	"Non-taxable Medicaid Waiver Payment"],
	"B-08sB":		["",		true,	"Subtract from Non-taxable MWP"],
	"B-08sC":		["",		true,	"Add to Non-taxable Medicaid Waiver Payment"],

	"B-08tA":		["",		true,	"Pension from Non-qualified Plan"],
	"B-08tB":		["",		true,	"Subtract from Pension from Non-qual Plan"],
	"B-08tC":		["",		true,	"Add to Pension from Non-qualified Plan"],

	"B-08uA":		["",		true,	"Wages While Incarcerated"],
	"B-08uB":		["",		true,	"Subtract from Wages While Incarcerated"],
	"B-08uC":		["",		true,	"Add to Wages While Incarcerated"],

	"B-08vA":		["",		true,	"Digital Assets Received"],
	"B-08vB":		["",		true,	"Subtract from Digital Assets Received"],
	"B-08vC":		["",		true,	"Add to Digital Assets Received"],

	"B-08zA":		["",		true,	"Other Income"],
	"B-08zB":		["",		true,	"Subtract from Other Income"],
	"B-08zC":		["",		true,	"Add to Other Income"],

	"B-09aA":		["",		true,	"Total Other Income (8a-8z)"],
	"B-09aB":		["",		true,	"Subtract from Total Other Income (8a-8z)"],
	"B-09aC":		["",		true,	"Add to Total Other Income (8a-8z)"],

	"B-09b1A":		["",		true,	"Disaster Loss"],
	"B-09b1B":		["",		true,	"Subtract from Disaster Loss"],
	"B-09b1C":		["",		true,	"Add to Disaster Loss"],

	"B-09b2A":		["",		true,	"NOL Deduction"],
	"B-09b2B":		["",		true,	"Subtract from NOL Deduction"],
	"B-09b2C":		["",		true,	"Add to NOL Deduction"],

	"B-09b3A":		["",		true,	"NOL Other"],
	"B-09b3B":		["",		true,	"Subtract from NOL Other"],
	"B-09b3C":		["",		true,	"Add to NOL Other"],

	"B-10A":		["",		true,	"Total Income"],
	"B-10B":		["",		true,	"Subtract from Total Income"],
	"B-10C":		["",		true,	"Add to Total Income"],

	// Form 1040S1 Adjustments to Income
	"C-11A":		["",		true,	"Educator Expense"],
	"C-11B":		["",		true,	"Subtract from Educator Expense"],
	"C-11C":		["",		true,	"Add to Educator Expense"],

	"C-12A":		["",		true,	"Business Expense from Form 2106"],
	"C-12B":		["",		true,	"Sub from Business Expense from Form 2106"],
	"C-12C":		["",		true,	"Add to Business Expense from Form 2106"],

	"C-13A":		["",		true,	"HSA Deduction"],
	"C-13B":		["",		true,	"Subtract from HSA Deduction"],
	"C-13C":		["",		true,	"Add to HSA Deduction"],

	"C-14A":		["",		true,	"Moving Expenses"],
	"C-14B":		["",		true,	"Subtract from Moving Expenses"],
	"C-14C":		["",		true,	"Add to Moving Expenses"],

	"C-15A":		["",		true,	"Deductible SE Tax"],
	"C-15B":		["",		true,	"Subtract from Deductible SE Tax"],
	"C-15C":		["",		true,	"Add to Deductible SE Tax"],

	"C-16A":		["",		true,	"Deductible SEP, Simple"],
	"C-16B":		["",		true,	"Subtract from Deductible SEP, Simple"],
	"C-16C":		["",		true,	"Add to Deductible SEP, Simple"],

	"C-17A":		["",		true,	"Self-employed Health Insurance"],
	"C-17B":		["",		true,	"Subtract from Self-employed Health Insurance"],
	"C-17C":		["",		true,	"Add to Self-employed Health Insurance"],

	"C-18A":		["",		true,	"Early Withdrawal Penalty"],
	"C-18B":		["",		true,	"Subtract from Early Withdrawal Penalty"],
	"C-18C":		["",		true,	"Add to Early Withdrawal Penalty"],

	"C-19c":		["",		true,	"Divorce Date"],
	"C-19aA":		["",		true,	"Alimony Paid"],
	"C-19aB":		["",		true,	"Subtract from Alimony Paid"],
	"C-19aC":		["",		true,	"Add to Alimony Paid"],

	"C-20A":		["",		true,	"IRA Deduction"],
	"C-20B":		["",		true,	"Subtract from IRA Deduction"],
	"C-20C":		["",		true,	"Add to IRA Deduction"],

	"C-21A":		["",		true,	"Student Loan Interest Deduction"],
	"C-21B":		["",		true,	"Subtract from Student Loan Int Deduction"],
	"C-21C":		["",		true,	"Add to Student Loan Interest Deduction"],

	"C-22A":		["",		true,	"Reserved for Future Use"],
	"C-22B":		["",		true,	"Subtract from Reserved for Future Use"],
	"C-22C":		["",		true,	"Add to Reserved for Future Use"],

	"C-23A":		["",		true,	"Archer MSA Deduction"],
	"C-23B":		["",		true,	"Subtract from Archer MSA Deduction"],
	"C-23C":		["",		true,	"Add to Archer MSA Deduction"],

	"C-24aA":		["",		true,	"Jury Duty Pay"],
	"C-24aB":		["",		true,	"Subtract from Jury Duty Pay"],
	"C-24aC":		["",		true,	"Add to Jury Duty Pay"],

	"C-24bA":		["",		true,	"Rental Expense (see line 8l)"],
	"C-24bB":		["",		true,	"Subtract from Rental Expense (see line 8l)"],
	"C-24bC":		["",		true,	"Add to Rental Expense (see line 8l)"],

	"C-24cA":		["",		true,	"Non-taxable amount is USOC"],
	"C-24cB":		["",		true,	"Subtract from Non-taxable amount is USOC"],
	"C-24cC":		["",		true,	"Add to Non-taxable amount is USOC"],

	"C-24dA":		["",		true,	"Reforestation Expenses"],
	"C-24dB":		["",		true,	"Subtract from Reforestation Expenses"],
	"C-24dC":		["",		true,	"Add to Reforestation Expenses"],

	"C-24eA":		["",		true,	"Repayment of Unemployment Expenses"],
	"C-24eB":		["",		true,	"Subtract from Repayment of Unemployment Expense"],
	"C-24eC":		["",		true,	"Add to Repayment of Unemployment Expenses"],

	"C-24fA":		["",		true,	"Contribution to 501(c) Pension"],
	"C-24fB":		["",		true,	"Subtract from Contribution to 501(c) Pension"],
	"C-24fC":		["",		true,	"Add to Contribution to 501(c) Pension"],

	"C-24gA":		["",		true,	"Contributions to 403(b) Plan"],
	"C-24gB":		["",		true,	"Subtract from Contributions to 403(b) Plan"],
	"C-24gC":		["",		true,	"Add to Contributions to 403(b) Plan"],

	"C-24hA":		["",		true,	"Attorney Fees"],
	"C-24hB":		["",		true,	"Subtract from Attorney Fees"],
	"C-24hC":		["",		true,	"Add to Attorney Fees"],

	"C-24iA":		["",		true,	"Attorney Fees"],
	"C-24iB":		["",		true,	"Subtract from Attorney Fees"],
	"C-24iC":		["",		true,	"Add to Attorney Fees"],

	"C-24jA":		["",		true,	"Foreign Earned Income Housing Deduction"],
	"C-24jB":		["",		true,	"Subtract from Foreign Earned Income Housing"],
	"C-24jC":		["",		true,	"Add to Foreign Earned Inc Housing Deduction"],

	"C-24kA":		["",		true,	"Excess Deduction from Form 1041"],
	"C-24kB":		["",		true,	"Sub from Excess Deduction from Form 1041"],
	"C-24kC":		["",		true,	"Add to Excess Deduction from Form 1041"],

	"C-24zA":		["",		true,	"Other Adjustments"],
	"C-24zB":		["",		true,	"Subtract from Other Adjustments"],
	"C-24zC":		["",		true,	"Add to Other Adjustments"],

	"C-25A":		["",		true,	"Total Other Adjustments"],
	"C-25B":		["",		true,	"Subtract from Total Other Adjustments"],
	"C-25C":		["",		true,	"Add to Total Other Adjustments"],

	"C-26A":		["",		true,	"Total Adjustments"],
	"C-26B":		["",		true,	"Subtract from Total Adjustments"],
	"C-26C":		["",		true,	"Add to Total Adjustments"],

	"C-27A":		["",		true,	"Federal AGI"],
	"C-27B":		["",		true,	"Subtract from Federal AGI"],
	"C-27C":		["",		true,	"Add to Federal AGI"],

	// Part II Adjustment to Federal Itemized Deductions
	// Medical and Dental Expenses
	"D-01A":		["",		true,	"Medical Expenses"],
	"D-01B":		["",		true,	"Subtract from Medical Expenses"],
	"D-01C":		["",		true,	"Add to Medical Expenses"],

	"D-02A":		["",		true,	"Federal AGI"],
	"D-02B":		["",		true,	"Subtract from Federal AGI"],
	"D-02C":		["",		true,	"Add to Federal AGI"],

	"D-03A":		["",		true,	"7.5% or AGI"],
	"D-03B":		["",		true,	"Subtract from 7.5% or AGI"],
	"D-03C":		["",		true,	"Add to 7.5% or AGI"],

	"D-04A":		["",		true,	"Medical Deduction"],
	"D-04B":		["",		true,	"Subtract from Medical Deduction"],
	"D-04C":		["",		true,	"Add to Medical Deduction"],

	// Taxes You Paid
	"D-05aA":		["",		true,	"State and Local Income Tax"],
	"D-05aB":		["",		true,	"Subtract from State and Local Income Tax"],
	"D-05aC":		["",		true,	"Add to State and Local Income Tax"],

	"D-05bA":		["",		true,	"Real Estate Tax"],
	"D-05bB":		["",		true,	"Subtract from Real Estate Tax"],
	"D-05bC":		["",		true,	"Add to Real Estate Tax"],

	"D-05cA":		["",		true,	"Personal Property Tax"],
	"D-05cB":		["",		true,	"Subtract from Personal Property Tax"],
	"D-05cC":		["",		true,	"Add to Personal Property Tax"],

	"D-05dA":		["",		true,	"Total State and Local Taxes"],
	"D-05dB":		["",		true,	"Subtract from Total State and Local Taxes"],
	"D-05dC":		["",		true,	"Add to Total State and Local Taxes"],

	"D-05eA":		["",		true,	"SALT after Limit"],
	"D-05eB":		["",		true,	"Subtract from SALT after Limit"],
	"D-05eC":		["",		true,	"Add to SALT after Limit"],

	"D-06A":		["",		true,	"Other Taxes"],
	"D-06B":		["",		true,	"Subtract from Other Taxes"],
	"D-06C":		["",		true,	"Add to Other Taxes"],

	"D-07A":		["",		true,	"Deduction for Taxes Paid"],
	"D-07B":		["",		true,	"Subtract from Deduction for Taxes Paid"],
	"D-07C":		["",		true,	"Add to Deduction for Taxes Paid"],

	// Interest You Paid
	"D-08aA":		["",		true,	"Mortgage Interest"],
	"D-08aB":		["",		true,	"Subtract from Mortgage Interest"],
	"D-08aC":		["",		true,	"Add to Mortgage Interest"],

	"D-08bA":		["",		true,	"Mortgage Interest Not from 1098"],
	"D-08bB":		["",		true,	"Subtract from Mortgage Int Not from 1098"],
	"D-08bC":		["",		true,	"Add to Mortgage Interest Not from 1098"],

	"D-08cA":		["",		true,	"Mortgage Points Not from 1098"],
	"D-08cB":		["",		true,	"Subtract from Mortgage Points Not from 1098"],
	"D-08cC":		["",		true,	"Add to Mortgage Points Not from 1098"],

	"D-08dA":		["",		true,	"Reserved For Future Use"],
	"D-08dB":		["",		true,	"Subtract from Reserved For Future Use"],
	"D-08dC":		["",		true,	"Add to Reserved For Future Use"],

	"D-08eA":		["",		true,	"Mortgage Deduction"],
	"D-08eB":		["",		true,	"Subtract from Mortgage Deduction"],
	"D-08eC":		["",		true,	"Add to Mortgage Deduction"],

	"D-09A":		["",		true,	"Investment Interest"],
	"D-09B":		["",		true,	"Subtract from Investment Interest"],
	"D-09C":		["",		true,	"Add to Investment Interest"],

	"D-10A":		["",		true,	"Interest Deduction"],
	"D-10B":		["",		true,	"Subtract from Interest Deduction"],
	"D-10C":		["",		true,	"Add to Interest Deduction"],

	// Gifts to Charity
	"D-11A":		["",		true,	"Cash Donations"],
	"D-11B":		["",		true,	"Subtract from Cash Donations"],
	"D-11C":		["",		true,	"Add to Cash Donations"],

	"D-12A":		["",		true,	"Non-cash Donations"],
	"D-12B":		["",		true,	"Subtract from Non-cash Donations"],
	"D-12C":		["",		true,	"Add to Non-cash Donations"],

	"D-13A":		["",		true,	"Carry-over Donations"],
	"D-13B":		["",		true,	"Subtract from Carry-over Donations"],
	"D-13C":		["",		true,	"Add to Carry-over Donations"],

	"D-14A":		["",		true,	"Donation Deduction"],
	"D-14B":		["",		true,	"Subtract from Donation Deduction"],
	"D-14C":		["",		true,	"Add to Donation Deduction"],

	"D-15A":		["",		true,	"Casualty and Theft Deduction"],
	"D-15B":		["",		true,	"Subtract from Casualty and Theft Deduction"],
	"D-15C":		["",		true,	"Add to Casualty and Theft Deduction"],

	"D-16A":		["",		true,	"Other Deduction"],
	"D-16B":		["",		true,	"Subtract from Other Deduction"],
	"D-16C":		["",		true,	"Add to Other Deduction"],

	"D-17A":		["",		true,	"Itemized Deductions"],
	"D-17B":		["",		true,	"Subtract from Itemized Deductions"],
	"D-17C":		["",		true,	"Add to Itemized Deductions"],

	"D-18":		["",		true,	"CA Itemized Deductions"],

	// Job Expenses and Miscellaneous Deductions
	"D-19":		["",		true,	"Un-reimbursed Employee Expenses"],
	"D-20":		["",		true,	"Tax Preparation Fees"],
	"D-21":		["",		true,	"Investment Expenses"],
	"D-22":		["",		true,	"Total Miscellaneous Deductions"],
	"D-23":		["",		true,	"Federal AGI"],
	"D-24":		["",		true,	"2% of AGI"],
	"D-25":		["",		true,	"Miscellaneous Deductions"],
	"D-26":		["",		true,	"Total Itemized Deductions"],
	"D-27":		["",		true,	"Other Adjustments"],
	"D-28":		["",		true,	"Total"],
	"D-29":		["",		true,	"Itemized Deductions"],
	"D-30":		["",		true,	"Deductions"],
}

export class F540CA_HTML extends HTMLBlock {
	static getFieldInfo() {
		return FIELD_INFO;
	}

	static getHTML(uid) {
		throw new Error("getHTML() not implemented for F540CA.");
	}

	constructor() {
		super();
		this.name		= "f540ca";
		this.uid		= HTMLMgr.getMgr().allocateUID(this.name);
		this.html		= "";
		this.fields		= F540CA_HTML.getFieldInfo();
	}
}
