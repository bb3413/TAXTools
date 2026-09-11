
import { Debug }				from "../Modules/Debug.js";
import { Line }					from "../Classes/Line.js";
import { TaxForm }				from "../Classes/TaxForm.js";
import { TaxFormObj }			from "../Modules/TaxFormObj.js";
import { TaxTable }				from "../Modules/TaxTable.js";
import { Taxpayer }				from "../Classes/Taxpayer.js";
import { CA_HiIncDeductions }	from "../Worksheets/CA_HiIncDeductions.js";

export class F540CA extends TaxForm {
	constructor(formname) {
		Debug.enter("F540CA.Constructor()");
		super(formname);
		this.title = `CA (540) - California Adjustments — Residents`;

		// Part I Income Adjustment Schedule - Section A
		// Income
		this.lines["A-01aA"]	= new Line("Wages");
		this.lines["A-01aB"]	= new Line("Subtract from Wages");
		this.lines["A-01aC"]	= new Line("Add to Wages");

		this.lines["A-01bA"]	= new Line("Household Wages");
		this.lines["A-01bB"]	= new Line("Subtract from Household Wages");
		this.lines["A-01bC"]	= new Line("Add to Household Wages");

		this.lines["A-01cA"]	= new Line("Tip Income");
		this.lines["A-01cB"]	= new Line("Subtract from Tip Income");
		this.lines["A-01cC"]	= new Line("Add to Tip Income");

		this.lines["A-01dA"]	= new Line("Medicaid Waiver Payments");
		this.lines["A-01dB"]	= new Line("Subtract from Medicaid Waiver Payments");
		this.lines["A-01dC"]	= new Line("Add to Medicaid Waiver Payments");

		this.lines["A-01eA"]	= new Line("Dependent Care Benefits");
		this.lines["A-01eB"]	= new Line("Subtract from Dependent Care Benefits");
		this.lines["A-01eC"]	= new Line("Add to Dependent Care Benefits");

		this.lines["A-01fA"]	= new Line("Adoption Benefits");
		this.lines["A-01fB"]	= new Line("Subtract from Adoption Benefits");
		this.lines["A-01fC"]	= new Line("Add to Adoption Benefits");

		this.lines["A-01gA"]	= new Line("Wages from Form 8919");
		this.lines["A-01gB"]	= new Line("Subtract from Wages from Form 8919");
		this.lines["A-01gC"]	= new Line("Add to Wages from Form 8919");

		this.lines["A-01hA"]	= new Line("Other Earned Income");
		this.lines["A-01hB"]	= new Line("Subtract from Other Earned Income");
		this.lines["A-01hC"]	= new Line("Add to Other Earned Income");

		this.lines["A-01iA"]	= new Line("Nontaxable Combat Pay");
		this.lines["A-01iB"]	= new Line("Subtract from Nontaxable Combat Pay");
		this.lines["A-01iC"]	= new Line("Add to Nontaxable Combat Pay");

		this.lines["A-01zA"]	= new Line("Total Earned Income");
		this.lines["A-01zB"]	= new Line("Subtract from Earned Income");
		this.lines["A-01zC"]	= new Line("Add to Earned Income");

		this.lines["A-02a"]		= new Line("Tax-exempt Interest");
		this.lines["A-02bA"]	= new Line("Taxable Interest");
		this.lines["A-02bB"]	= new Line("Subtract from Taxable Interest");
		this.lines["A-02bC"]	= new Line("Add to Taxable Interest");

		this.lines["A-03a"]		= new Line("Qualified Dividends");
		this.lines["A-03bA"]	= new Line("Ordinary Dividends");
		this.lines["A-03bB"]	= new Line("Subtract from Ordinary Dividends");
		this.lines["A-03bC"]	= new Line("Add to Ordinary Dividends");

		this.lines["A-04a"]		= new Line("IRA Distributions");
		this.lines["A-04bA"]	= new Line("Taxable IRA");
		this.lines["A-04bB"]	= new Line("Subtract from Taxable IRA");
		this.lines["A-04bC"]	= new Line("Add to Taxable IRA");

		this.lines["A-05a"]		= new Line("Pensions and Annuities");
		this.lines["A-05bA"]	= new Line("Taxable Pensions and Annuities");
		this.lines["A-05bB"]	= new Line("Subtract from Taxable Pensions and Annuities");
		this.lines["A-05bC"]	= new Line("Add to Taxable Pensions and Annuities");

		this.lines["A-06a"]		= new Line("Social Security Benefits");
		this.lines["A-06bA"]	= new Line("Taxable Social Security");
		this.lines["A-06bB"]	= new Line("Subtract from Taxable Social Security");
		this.lines["A-06bC"]	= new Line("Add to Taxable Social Security");

		this.lines["A-07aA"]	= new Line("Capital Gain");
		this.lines["A-07aB"]	= new Line("Subtract from Capital Gain");
		this.lines["A-07aC"]	= new Line("Add to Capital Gain");

		// Part I Income Adjustment Schedule - Section B
		// Form 1040S1 Additional Income
		this.lines["B-01A"]		= new Line("Taxable Refund");
		this.lines["B-01B"]		= new Line("Subtract from Taxable Refund");
		this.lines["B-01C"]		= new Line("Add to Taxable Refund");

		this.lines["B-02aA"]	= new Line("Alimony Received");
		this.lines["B-02aB"]	= new Line("Subtract from Alimony Received");
		this.lines["B-02aC"]	= new Line("Add to Alimony Received");

		this.lines["B-03A"]		= new Line("Business Income");
		this.lines["B-03B"]		= new Line("Subtract from Business Income");
		this.lines["B-03C"]		= new Line("Add to Business Income");

		this.lines["B-04A"]		= new Line("Other Gains");
		this.lines["B-04B"]		= new Line("Subtract from Other Gains");
		this.lines["B-04C"]		= new Line("Add to Other Gains");

		this.lines["B-05A"]		= new Line("Schedule E Income");
		this.lines["B-05B"]		= new Line("Subtract from Schedule E Income");
		this.lines["B-05C"]		= new Line("Add to Schedule E Income");

		this.lines["B-06A"]		= new Line("Farm Income");
		this.lines["B-06B"]		= new Line("Subtract from Farm Income");
		this.lines["B-06C"]		= new Line("Add to Farm Income");

		this.lines["B-07A"]		= new Line("Unemployment Compensation");
		this.lines["B-07B"]		= new Line("Subtract from Unemployment Compensation");
		this.lines["B-07C"]		= new Line("Add to Unemployment Compensation");

		this.lines["B-08aA"]	= new Line("Net Operating Loss");
		this.lines["B-08aB"]	= new Line("Subtract from Net Operating Loss");
		this.lines["B-08aC"]	= new Line("Add to Net Operating Loss");

		this.lines["B-08bA"]	= new Line("Gambling");
		this.lines["B-08bB"]	= new Line("Subtract from Gambling");
		this.lines["B-08bC"]	= new Line("Add to Gambling");

		this.lines["B-08cA"]	= new Line("Cancellation of Debt");
		this.lines["B-08cB"]	= new Line("Subtract from Cancellation of Debt");
		this.lines["B-08cC"]	= new Line("Add to Cancellation of Debt");

		this.lines["B-08dA"]	= new Line("Foreign Earned Income Exclusion");
		this.lines["B-08dB"]	= new Line("Subtract from Foreign Earned Inc Exclusion");
		this.lines["B-08dC"]	= new Line("Add to Foreign Earned Income Exclusion");

		this.lines["B-08eA"]	= new Line("Income from form 8853");
		this.lines["B-08eB"]	= new Line("Subtract from Income from form 8853");
		this.lines["B-08eC"]	= new Line("Add to Income from form 8853");

		this.lines["B-08fA"]	= new Line("Income from form 8889");
		this.lines["B-08fB"]	= new Line("Subtract from Income from form 8889");
		this.lines["B-08fC"]	= new Line("Add to Income from form 8889");

		this.lines["B-08gA"]	= new Line("Alaska Permanent Fund");
		this.lines["B-08gB"]	= new Line("Subtract from Alaska Permanent Fund");
		this.lines["B-08gC"]	= new Line("Add to Alaska Permanent Fund");

		this.lines["B-08hA"]	= new Line("Jury Duty Pay");
		this.lines["B-08hB"]	= new Line("Subtract from Jury Duty Pay");
		this.lines["B-08hC"]	= new Line("Add to Jury Duty Pay");

		this.lines["B-08iA"]	= new Line("Prizes and Awards");
		this.lines["B-08iB"]	= new Line("Subtract from Prizes and Awards");
		this.lines["B-08iC"]	= new Line("Add to Prizes and Awards");

		this.lines["B-08jA"]	= new Line("Hobby Income");
		this.lines["B-08jB"]	= new Line("Subtract from Hobby Income");
		this.lines["B-08jC"]	= new Line("Add to Hobby Income");

		this.lines["B-08kA"]	= new Line("Stock Options");
		this.lines["B-08kB"]	= new Line("Subtract from Stock Options");
		this.lines["B-08kC"]	= new Line("Add to Stock Options");

		this.lines["B-08lA"]	= new Line("Income from Rent");
		this.lines["B-08lB"]	= new Line("Subtract from Income from Rent");
		this.lines["B-08lC"]	= new Line("Add to Income from Rent");

		this.lines["B-08mA"]	= new Line("USOC Prize");
		this.lines["B-08mB"]	= new Line("Subtract from USOC Prize");
		this.lines["B-08mC"]	= new Line("Add to USOC Prize");

		this.lines["B-08nA"]	= new Line("Section 951(a) Inclusion");
		this.lines["B-08nB"]	= new Line("Subtract from Section 951(a) Inclusion");
		this.lines["B-08nC"]	= new Line("Add to Section 951(a) Inclusion");

		this.lines["B-08oA"]	= new Line("Section 951A(a) Inclusion");
		this.lines["B-08oB"]	= new Line("Subtract from Section 951A(a) Inclusion");
		this.lines["B-08oC"]	= new Line("Add to Section 951A(a) Inclusion");

		this.lines["B-08pA"]	= new Line("Excess Business Loss");
		this.lines["B-08pB"]	= new Line("Subtract from Excess Business Loss");
		this.lines["B-08pC"]	= new Line("Add to Excess Business Loss");

		this.lines["B-08qA"]	= new Line("Taxable ABLE Distributions");
		this.lines["B-08qB"]	= new Line("Subtract from Taxable ABLE Distributions");
		this.lines["B-08qC"]	= new Line("Add to Taxable ABLE Distributions");

		this.lines["B-08rA"]	= new Line("Scholarship Not on W-2");
		this.lines["B-08rB"]	= new Line("Subtract from Scholarship Not on W-2");
		this.lines["B-08rC"]	= new Line("Add to Scholarship Not on W-2");

		this.lines["B-08sA"]	= new Line("Non-taxable Medicaid Waiver Payment");
		this.lines["B-08sB"]	= new Line("Subtract from Non-taxable MWP");
		this.lines["B-08sC"]	= new Line("Add to Non-taxable Medicaid Waiver Payment");

		this.lines["B-08tA"]	= new Line("Pension from Non-qualified Plan");
		this.lines["B-08tB"]	= new Line("Subtract from Pension from Non-qual Plan");
		this.lines["B-08tC"]	= new Line("Add to Pension from Non-qualified Plan");

		this.lines["B-08uA"]	= new Line("Wages While Incarcerated");
		this.lines["B-08uB"]	= new Line("Subtract from Wages While Incarcerated");
		this.lines["B-08uC"]	= new Line("Add to Wages While Incarcerated");

		this.lines["B-08vA"]	= new Line("Digital Assets Received");
		this.lines["B-08vB"]	= new Line("Subtract from Digital Assets Received");
		this.lines["B-08vC"]	= new Line("Add to Digital Assets Received");

		this.lines["B-08zA"]	= new Line("Other Income");
		this.lines["B-08zB"]	= new Line("Subtract from Other Income");
		this.lines["B-08zC"]	= new Line("Add to Other Income");

		this.lines["B-09aA"]	= new Line("Total Other Income (8a-8z)")
		this.lines["B-09aB"]	= new Line("Subtract from Total Other Income (8a-8z)")
		this.lines["B-09aC"]	= new Line("Add to Total Other Income (8a-8z)")

		this.lines["B-09b1A"]	= new Line("Disaster Loss");
		this.lines["B-09b1B"]	= new Line("Subtract from Disaster Loss");
		this.lines["B-09b1C"]	= new Line("Add to Disaster Loss");

		this.lines["B-09b2A"]	= new Line("NOL Deduction")
		this.lines["B-09b2B"]	= new Line("Subtract from NOL Deduction")
		this.lines["B-09b2C"]	= new Line("Add to NOL Deduction")

		this.lines["B-09b3A"]	= new Line("NOL Other");
		this.lines["B-09b3B"]	= new Line("Subtract from NOL Other");
		this.lines["B-09b3C"]	= new Line("Add to NOL Other");

		this.lines["B-10A"]		= new Line("Total Income");
		this.lines["B-10B"]		= new Line("Subtract from Total Income");
		this.lines["B-10C"]		= new Line("Add to Total Income");

		// Form 1040S1 Adjustments to Income
		this.lines["C-11A"]		= new Line("Educator Expense");
		this.lines["C-11B"]		= new Line("Subtract from Educator Expense");
		this.lines["C-11C"]		= new Line("Add to Educator Expense");

		this.lines["C-12A"]		= new Line("Business Expense from Form 2106");
		this.lines["C-12B"]		= new Line("Sub from Business Expense from Form 2106");
		this.lines["C-12C"]		= new Line("Add to Business Expense from Form 2106");

		this.lines["C-13A"]		= new Line("HSA Deduction");
		this.lines["C-13B"]		= new Line("Subtract from HSA Deduction");
		this.lines["C-13C"]		= new Line("Add to HSA Deduction");

		this.lines["C-14A"]		= new Line("Moving Expenses");
		this.lines["C-14B"]		= new Line("Subtract from Moving Expenses");
		this.lines["C-14C"]		= new Line("Add to Moving Expenses");

		this.lines["C-15A"]		= new Line("Deductable SE Tax");
		this.lines["C-15B"]		= new Line("Subtract from Deductable SE Tax");
		this.lines["C-15C"]		= new Line("Add to Deductable SE Tax");

		this.lines["C-16A"]		= new Line("Deductable SEP, Simple");
		this.lines["C-16B"]		= new Line("Subtract from Deductable SEP, Simple");
		this.lines["C-16C"]		= new Line("Add to Deductable SEP, Simple");

		this.lines["C-17A"]		= new Line("Self-employed Health Insurance");
		this.lines["C-17B"]		= new Line("Subtract from Self-employed Health Insurance");
		this.lines["C-17C"]		= new Line("Add to Self-employed Health Insurance");

		this.lines["C-18A"]		= new Line("Early Withdrawal Penalty");
		this.lines["C-18B"]		= new Line("Subtract from Early Withdrawal Penalty");
		this.lines["C-18C"]		= new Line("Add to Early Withdrawal Penalty");

		this.lines["C-19aA"]	= new Line("Alimony Paid");
		this.lines["C-19aB"]	= new Line("Subtract from Alimony Paid");
		this.lines["C-19aC"]	= new Line("Add to Alimony Paid");

		this.lines["C-20A"]		= new Line("IRA Deduction");
		this.lines["C-20B"]		= new Line("Subtract from IRA Deduction");
		this.lines["C-20C"]		= new Line("Add to IRA Deduction");

		this.lines["C-21A"]		= new Line("Student Loan Interest Deduction");
		this.lines["C-21B"]		= new Line("Subtract from Student Loan Int Deduction");
		this.lines["C-21C"]		= new Line("Add to Student Loan Interest Deduction");

		this.lines["C-22A"]		= new Line("Reserved for Future Use");
		this.lines["C-22B"]		= new Line("Subtract from Reserved for Future Use");
		this.lines["C-22C"]		= new Line("Add to Reserved for Future Use");

		this.lines["C-23A"]		= new Line("Archer MSA Deduction");
		this.lines["C-23B"]		= new Line("Subtract from Archer MSA Deduction");
		this.lines["C-23C"]		= new Line("Add to Archer MSA Deduction");

		this.lines["C-24aA"]	= new Line("Jury Duty Pay");
		this.lines["C-24aB"]	= new Line("Subtract from Jury Duty Pay");
		this.lines["C-24aC"]	= new Line("Add to Jury Duty Pay");

		this.lines["C-24bA"]	= new Line("Rental Expense (see line 8l)");
		this.lines["C-24bB"]	= new Line("Subtract from Rental Expense (see line 8l)");
		this.lines["C-24bC"]	= new Line("Add to Rental Expense (see line 8l)");

		this.lines["C-24cA"]	= new Line("Non-taxable amount is USOC");
		this.lines["C-24cB"]	= new Line("Subtract from Non-taxable amount is USOC");
		this.lines["C-24cC"]	= new Line("Add to Non-taxable amount is USOC");

		this.lines["C-24dA"]	= new Line("Reforestation Expenses");
		this.lines["C-24dB"]	= new Line("Subtract from Reforestation Expenses");
		this.lines["C-24dC"]	= new Line("Add to Reforestation Expenses");

		this.lines["C-24eA"]	= new Line("Repayment of Unemployment Expenses");
		this.lines["C-24eB"]	= new Line("Subtract from Repayment of Unemploy Expense");
		this.lines["C-24eC"]	= new Line("Add to Repayment of Unemployment Expenses");

		this.lines["C-24fA"]	= new Line("Contribution to 501(c) Pension");
		this.lines["C-24fB"]	= new Line("Subtract from Contribution to 501(c) Pension");
		this.lines["C-24fC"]	= new Line("Add to Contribution to 501(c) Pension");

		this.lines["C-24gA"]	= new Line("Contributions to 403(b) Plan");
		this.lines["C-24gB"]	= new Line("Subtract from Contributions to 403(b) Plan");
		this.lines["C-24gC"]	= new Line("Add to Contributions to 403(b) Plan");

		this.lines["C-24hA"]	= new Line("Attorney Fees");
		this.lines["C-24hB"]	= new Line("Subtract from Attorney Fees");
		this.lines["C-24hC"]	= new Line("Add to Attorney Fees");

		this.lines["C-24iA"]	= new Line("Attorney Fees");
		this.lines["C-24iB"]	= new Line("Subtract from Attorney Fees");
		this.lines["C-24iC"]	= new Line("Add to Attorney Fees");

		this.lines["C-24jA"]	= new Line("Foreign Earned Income Housing Deduction");
		this.lines["C-24jB"]	= new Line("Subtract from Foreign Earned Income Housing");
		this.lines["C-24jC"]	= new Line("Add to Foreign Earned Inc Housing Deduction");

		this.lines["C-24kA"]	= new Line("Excess Deduction from Form 1041");
		this.lines["C-24kB"]	= new Line("Sub from Excess Deduction from Form 1041");
		this.lines["C-24kC"]	= new Line("Add to Excess Deduction from Form 1041");

		this.lines["C-24zA"]	= new Line("Other Adjustments");
		this.lines["C-24zB"]	= new Line("Subtract from Other Adjustments");
		this.lines["C-24zC"]	= new Line("Add to Other Adjustments");

		this.lines["C-25A"]		= new Line("Total Other Adjustments");
		this.lines["C-25B"]		= new Line("Subtract from Total Other Adjustments");
		this.lines["C-25C"]		= new Line("Add to Total Other Adjustments");

		this.lines["C-26A"]		= new Line("Total Adjustments");
		this.lines["C-26B"]		= new Line("Subtract from Total Adjustments");
		this.lines["C-26C"]		= new Line("Add to Total Adjustments");

		this.lines["C-27A"]		= new Line("Federal AGI");
		this.lines["C-27B"]		= new Line("Subtract from Federal AGI");
		this.lines["C-27C"]		= new Line("Add to Federal AGI");

		// Part II Adjustment to Federal Itemized Deductions
		// Medical and Dental Expenses
		this.lines["D-01A"]		= new Line("Medical Expenses");
		this.lines["D-01B"]		= new Line("Subtract from Medical Expenses");
		this.lines["D-01C"]		= new Line("Add to Medical Expenses");

		this.lines["D-02A"]		= new Line("Federal AGI");
		this.lines["D-02B"]		= new Line("Subtract from Federal AGI");
		this.lines["D-02C"]		= new Line("Add to Federal AGI");

		this.lines["D-03A"]		= new Line("7.5% or AGI");
		this.lines["D-03B"]		= new Line("Subtract from 7.5% or AGI");
		this.lines["D-03C"]		= new Line("Add to 7.5% or AGI");

		this.lines["D-04A"]		= new Line("Medical Deduction");
		this.lines["D-04B"]		= new Line("Subtract from Medical Deduction");
		this.lines["D-04C"]		= new Line("Add to Medical Deduction");

		// Taxes You Paid
		this.lines["D-05aA"]	= new Line("State and Local Income Tax");
		this.lines["D-05aB"]	= new Line("Subtract from State and Local Income Tax");
		this.lines["D-05aC"]	= new Line("Add to State and Local Income Tax");

		this.lines["D-05bA"]	= new Line("Real Estate Tax");
		this.lines["D-05bB"]	= new Line("Subtract from Real Estate Tax");
		this.lines["D-05bC"]	= new Line("Add to Real Estate Tax");

		this.lines["D-05cA"]	= new Line("Personal Property Tax");
		this.lines["D-05cB"]	= new Line("Subtract from Personal Property Tax");
		this.lines["D-05cC"]	= new Line("Add to Personal Property Tax");

		this.lines["D-05dA"]	= new Line("Total State and Local Taxes");
		this.lines["D-05dB"]	= new Line("Subtract from Total State and Local Taxes");
		this.lines["D-05dC"]	= new Line("Add to Total State and Local Taxes");

		this.lines["D-05eA"]	= new Line("SALT after Limit");
		this.lines["D-05eB"]	= new Line("Subtract from SALT after Limit");
		this.lines["D-05eC"]	= new Line("Add to SALT after Limit");

		this.lines["D-06A"]		= new Line("Other Taxes");
		this.lines["D-06B"]		= new Line("Subtract from Other Taxes");
		this.lines["D-06C"]		= new Line("Add to Other Taxes");

		this.lines["D-07A"]		= new Line("Deduction for Taxes Paid");
		this.lines["D-07B"]		= new Line("Subtract from Deduction for Taxes Paid");
		this.lines["D-07C"]		= new Line("Add to Deduction for Taxes Paid");

		// Interest You Paid
		this.lines["D-08aA"]	= new Line("Mortgage Interest");
		this.lines["D-08aB"]	= new Line("Subtract from Mortgage Interest");
		this.lines["D-08aC"]	= new Line("Add to Mortgage Interest");

		this.lines["D-08bA"]	= new Line("Mortgage Interest Not from 1098");
		this.lines["D-08bB"]	= new Line("Subtract from Mortgage Int Not from 1098");
		this.lines["D-08bC"]	= new Line("Add to Mortgage Interest Not from 1098");

		this.lines["D-08cA"]	= new Line("Mortgage Points Not from 1098");
		this.lines["D-08cB"]	= new Line("Subtract from Mortgage Points Not from 1098");
		this.lines["D-08cC"]	= new Line("Add to Mortgage Points Not from 1098");

		this.lines["D-08dA"]	= new Line("Reserved For Future Use");
		this.lines["D-08dB"]	= new Line("Subtract from Reserved For Future Use");
		this.lines["D-08dC"]	= new Line("Add to Reserved For Future Use");

		this.lines["D-08eA"]	= new Line("Mortgage Deduction");
		this.lines["D-08eB"]	= new Line("Subtract from Mortgage Deduction");
		this.lines["D-08eC"]	= new Line("Add to Mortgage Deduction");

		this.lines["D-09A"]		= new Line("Investment Interest");
		this.lines["D-09B"]		= new Line("Subtract from Investment Interest");
		this.lines["D-09C"]		= new Line("Add to Investment Interest");

		this.lines["D-10A"]		= new Line("Interest Deduction");
		this.lines["D-10B"]		= new Line("Subtract from Interest Deduction");
		this.lines["D-10C"]		= new Line("Add to Interest Deduction");

		// Gifts to Charity
		this.lines["D-11A"]		= new Line("Cash Donations");
		this.lines["D-11B"]		= new Line("Subtract from Cash Donations");
		this.lines["D-11C"]		= new Line("Add to Cash Donations");

		this.lines["D-12A"]		= new Line("Non-cash Donatons");
		this.lines["D-12B"]		= new Line("Subtract from Non-cash Donatons");
		this.lines["D-12C"]		= new Line("Add to Non-cash Donatons");

		this.lines["D-13A"]		= new Line("Carry-over Donations");
		this.lines["D-13B"]		= new Line("Subtract from Carry-over Donations");
		this.lines["D-13C"]		= new Line("Add to Carry-over Donations");

		this.lines["D-14A"]		= new Line("Donation Deduction");
		this.lines["D-14B"]		= new Line("Subtract from Donation Deduction");
		this.lines["D-14C"]		= new Line("Add to Donation Deduction");

		this.lines["D-15A"]		= new Line("Casualty and Theft Deduction");
		this.lines["D-15B"]		= new Line("Subtract from Casualty and Theft Deduction");
		this.lines["D-15C"]		= new Line("Add to Casualty and Theft Deduction");

		this.lines["D-16A"]		= new Line("Other Deduction");
		this.lines["D-16B"]		= new Line("Subtract from Other Deduction");
		this.lines["D-16C"]		= new Line("Add to Other Deduction");

		this.lines["D-17A"]		= new Line("Itemized Deductions");
		this.lines["D-17B"]		= new Line("Subtract from Itemized Deductions");
		this.lines["D-17C"]		= new Line("Add to Itemized Deductions");

		this.lines["D-18"]		= new Line("CA Itemized Deductions");

		// Job Expenses and Miscellaneous Deductions
		this.lines["D-19"]		= new Line("Unreimbursed Employee Expenses");
		this.lines["D-20"]		= new Line("Tax Preparation Fees");
		this.lines["D-21"]		= new Line("Investment Expenses");
		this.lines["D-22"]		= new Line("Total Miscellaneous Deductions");
		this.lines["D-23"]		= new Line("Federal AGI");
		this.lines["D-24"]		= new Line("2% of AGI");
		this.lines["D-25"]		= new Line("Miscellaneous Deductions");
		this.lines["D-26"]		= new Line("Total Itemized Deductions");
		this.lines["D-27"]		= new Line("Other Adjustments");
		this.lines["D-28"]		= new Line("Total");
		this.lines["D-29"]		= new Line("Itemized Deductions");
		this.lines["D-30"]		= new Line("Deductions");

		Debug.exit("F540CA.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F540CA.calculate()");
		this.calculated = true;
		const tt = TaxTable.getTaxTable();
		const tp = Taxpayer.getTaxpayer();

		// Part I Income Adjustment Schedule - Section A
		// Income

		// Wages
		this.lines["A-01aA"].value	= TaxFormObj.getValue("F1040", "01a");
		this.lines["A-01aB"].value	= 0;
		this.lines["A-01aC"].value	= 0;

		// Household Wages
		this.lines["A-01bA"].value	= TaxFormObj.getValue("F1040", "01b");
		this.lines["A-01bB"].value	= 0;
		this.lines["A-01bC"].value	= 0;

		// Tip Income
		this.lines["A-01cA"].value	= TaxFormObj.getValue("F1040", "01c");
		this.lines["A-01cB"].value	= 0;
		this.lines["A-01cC"].value	= 0;

		// Medicaid Waiver Payments
		this.lines["A-01dA"].value	= TaxFormObj.getValue("F1040", "01d");
		this.lines["A-01dB"].value	= 0;
		this.lines["A-01dC"].value	= 0;

		// Dependent Care Benefits
		this.lines["A-01eA"].value	= TaxFormObj.getValue("F1040", "01e");
		this.lines["A-01eB"].value	= 0;
		this.lines["A-01eC"].value	= 0;

		// Adoption Benefits
		this.lines["A-01fA"].value	= TaxFormObj.getValue("F1040", "01f");
		this.lines["A-01fB"].value	= 0;
		this.lines["A-01fC"].value	= 0;

		// Wages from Form 8919
		this.lines["A-01gA"].value	= TaxFormObj.getValue("F1040", "01g");
		this.lines["A-01gB"].value	= 0;
		this.lines["A-01gC"].value	= 0;

		// Other Earned Income
		this.lines["A-01hA"].value	= TaxFormObj.getValue("F1040", "01h");
		this.lines["A-01hB"].value	= 0;
		this.lines["A-01hC"].value	= TaxFormObj.getValue("W2", "12W");	// Employer HSA

		//  Nontaxable Combat Pay
		this.lines["A-01iA"].value	= 0;	// DO NOT ENTER
		this.lines["A-01iB"].value	= 0;	// DO NOT ENTER
		this.lines["A-01iC"].value	= 0;

		// Total Earned Income
		this.lines["A-01zA"].value	= this.add("A-01aA","A-01bA","A-01cA",
											   "A-01dA","A-01eA","A-01fA",
											   "A-01gA","A-01hA","A-01iA");
		this.lines["A-01zB"].value	= this.add("A-01aB","A-01bB","A-01cB",
											   "A-01dB","A-01eB","A-01fB",
											   "A-01gB","A-01hB","A-01iB");
		this.lines["A-01zC"].value	= this.add("A-01aC","A-01bC","A-01cC",
											   "A-01dC","A-01eC","A-01fC",
											   "A-01gC","A-01hC","A-01iC");

		// Tax-exempt Interest
		this.lines["A-02a"].value	= TaxFormObj.getValue("F1040", "02a");

		// Taxable Interest
		this.lines["A-02bA"].value	= TaxFormObj.getValue("F1040", "02b");
		this.lines["A-02bB"].value	= TaxFormObj.getValue("F1099INT", "03");// US interest
		this.lines["A-02bC"].value	= 0;

		// Qualified Dividends
		this.lines["A-03a"].value	= TaxFormObj.getValue("F1040", "03a");

		// Ordinary Dividends
		this.lines["A-03bA"].value	= TaxFormObj.getValue("F1040", "03b");
		this.lines["A-03bB"].value	= 0;
		this.lines["A-03bC"].value	= 0;

		// IRA Distributions
		this.lines["A-04a"].value	= TaxFormObj.getValue("F1040", "04a");

		// Taxable IRA
		this.lines["A-04bA"].value	= TaxFormObj.getValue("F1040", "04b");
		this.lines["A-04bB"].value	= 0;
		this.lines["A-04bC"].value	= 0;

		// Pensions and Annuities
		this.lines["A-05a"].value	= TaxFormObj.getValue("F1040", "05a");

		// Taxable Pensions and Annuities
		this.lines["A-05bA"].value	= TaxFormObj.getValue("F1040", "05b");
		this.lines["A-05bB"].value	= 0;
		this.lines["A-05bC"].value	= 0;

		// Social Security Benefits
		this.lines["A-06a"].value	= TaxFormObj.getValue("F1040", "06a");

		// Taxable Social Security
		this.lines["A-06bA"].value	= TaxFormObj.getValue("F1040", "06b");
		this.lines["A-06bB"].value	= this.line("A-06bA");	// Value from column A
		this.lines["A-06bC"].value	= 0;	// DO NOT ENTER

		// Capital Gain
		this.lines["A-07aA"].value	= TaxFormObj.getValue("F1040", "07a");
		this.lines["A-07aB"].value	= 0;
		this.lines["A-07aC"].value	= 0;

		// Part I Income Adjustment Schedule - Section B
		// Form 1040S1 Additional Income

		// Taxable Refund
		this.lines["B-01A"].value	= TaxFormObj.getValue("F1040S1", "01");
		// Assume it is a CA tax refund.
		this.lines["B-01B"].value	= TaxFormObj.getValue("F1040S1", "01");
		this.lines["B-01C"].value	= 0;	// DO NOT ENTER

		// Alimony Received
		this.lines["B-02aA"].value	= TaxFormObj.getValue("F1040S1", "02a");
		this.lines["B-02aB"].value	= 0;	// DO NOT ENTER
		this.lines["B-02aC"].value	= 0;	// Alimony received if divorce after 12/31/2018

		// Business Income
		this.lines["B-03A"].value	= TaxFormObj.getValue("F1040S1", "03");
		this.lines["B-03B"].value	= 0;
		this.lines["B-03C"].value	= 0;

		// Other Gains
		this.lines["B-04A"].value	= TaxFormObj.getValue("F1040S1", "04");
		this.lines["B-04B"].value	= 0;
		this.lines["B-04C"].value	= 0;

		// Schedule E Income
		this.lines["B-05A"].value	= TaxFormObj.getValue("F1040S1", "05");
		this.lines["B-05B"].value	= 0;
		this.lines["B-05C"].value	= 0;

		// Farm Income
		this.lines["B-06A"].value	= TaxFormObj.getValue("F1040S1", "06");
		this.lines["B-06B"].value	= 0;
		this.lines["B-06C"].value	= 0;

		// Unemployment Compensation
		this.lines["B-07A"].value	= TaxFormObj.getValue("F1040S1", "07");
		this.lines["B-07B"].value	= this.line("B-07A");	// Value from column A;
		this.lines["B-07C"].value	= 0;	// DO NOT ENTER

		// Net Operating Loss
		this.lines["B-08aA"].value	= -(TaxFormObj.getValue("F1040S1", "08a"));
		this.lines["B-08aB"].value	= 0;	// DO NOT ENTER
		this.lines["B-08aC"].value	= this.line("B-08aA");	// Value from column A

		// Gambling
		this.lines["B-08bA"].value	= TaxFormObj.getValue("F1040S1", "08b");
		this.lines["B-08bB"].value	= 0;	// Californi lottery winning
		this.lines["B-08bC"].value	= 0;	// DO NOT ENTER

		// Cancellation of Debt
		this.lines["B-08cA"].value	= TaxFormObj.getValue("F1040S1", "08c");
		this.lines["B-08cB"].value	= 0;
		this.lines["B-08cC"].value	= 0;

		// Foreign Earned Income Exclusion
		this.lines["B-08dA"].value	= -(TaxFormObj.getValue("F1040S1", "08d"));
		this.lines["B-08dB"].value	= 0;	// DO NOT ENTER
		this.lines["B-08dC"].value	= 0;

		// Income from form 8853
		this.lines["B-08eA"].value	= TaxFormObj.getValue("F1040S1", "08e");
		this.lines["B-08eB"].value	= 0;	// DO NOT ENTER
		this.lines["B-08eC"].value	= 0;

		// Income from form 8889
		this.lines["B-08fA"].value	= TaxFormObj.getValue("F1040S1", "08f");
		this.lines["B-08fB"].value	= 0;	// HSA distribution for unqualified expenses
		this.lines["B-08fC"].value	= 0;	// DO NOT ENTER

		// Alaska Permanent Fund
		this.lines["B-08gA"].value	= TaxFormObj.getValue("F1040S1", "08g");
		this.lines["B-08gB"].value	= 0;	// DO NOT ENTER
		this.lines["B-08gC"].value	= 0;	// DO NOT ENTER

		// Jury Duty Pay
		this.lines["B-08hA"].value	= TaxFormObj.getValue("F1040S1", "08h");
		this.lines["B-08hB"].value	= 0;	// DO NOT ENTER
		this.lines["B-08hC"].value	= 0;	// DO NOT ENTER

		// Prizes and Awards
		this.lines["B-08iA"].value	= TaxFormObj.getValue("F1040S1", "08i");
		this.lines["B-08iB"].value	= 0;	// DO NOT ENTER
		this.lines["B-08iC"].value	= 0;	// DO NOT ENTER

		// Hobby Income
		this.lines["B-08jA"].value	= TaxFormObj.getValue("F1040S1", "08j");
		this.lines["B-08jB"].value	= 0;	// DO NOT ENTER
		this.lines["B-08jC"].value	= 0;	// DO NOT ENTER

		// Stock Options
		this.lines["B-08kA"].value	= TaxFormObj.getValue("F1040S1", "08k");
		this.lines["B-08kB"].value	= 0;	// DO NOT ENTER
		this.lines["B-08kC"].value	= 0;

		// Income from Rent
		this.lines["B-08lA"].value	= TaxFormObj.getValue("F1040S1", "08l");
		this.lines["B-08lB"].value	= 0;	// DO NOT ENTER
		this.lines["B-08lC"].value	= 0;	// DO NOT ENTER

		// USOC Prize
		this.lines["B-08mA"].value	= TaxFormObj.getValue("F1040S1", "08m");
		this.lines["B-08mB"].value	= 0;	// DO NOT ENTER
		this.lines["B-08mC"].value	= 0;	// DO NOT ENTER

		// Section 951(a) Inclusion
		this.lines["B-08nA"].value	= TaxFormObj.getValue("F1040S1", "08n");
		this.lines["B-08nB"].value	= 0;
		this.lines["B-08nC"].value	= 0;	// DO NOT ENTER

		// Section 951A(a) Inclusion
		this.lines["B-08oA"].value	= TaxFormObj.getValue("F1040S1", "08o");
		this.lines["B-08oB"].value	= 0;
		this.lines["B-08oC"].value	= 0;	// DO NOT ENTER

		// Excess Business Loss
		this.lines["B-08pA"].value	= TaxFormObj.getValue("F1040S1", "08p");
		this.lines["B-08pB"].value	= 0;
		this.lines["B-08pC"].value	= 0;

		// Taxable ABLE Distributions
		this.lines["B-08qA"].value	= TaxFormObj.getValue("F1040S1", "08q");
		this.lines["B-08qB"].value	= 0;	// DO NOT ENTER
		this.lines["B-08qC"].value	= 0;	// DO NOT ENTER

		// Scholarship Not on W-2
		this.lines["B-08rA"].value	= TaxFormObj.getValue("F1040S1", "08r");
		this.lines["B-08rB"].value	= 0;	// DO NOT ENTER
		this.lines["B-08rC"].value	= 0;	// DO NOT ENTER

		// Non-taxable Medicaid Waiver Payment
		this.lines["B-08sA"].value	= -(TaxFormObj.getValue("F1040S1", "08s"));
		this.lines["B-08sB"].value	= 0;	// DO NOT ENTER
		this.lines["B-08sC"].value	= 0;	// DO NOT ENTER

		// Pension from Non-qualified Plan
		this.lines["B-08tA"].value	= TaxFormObj.getValue("F1040S1", "08t");
		this.lines["B-08tB"].value	= 0;	// DO NOT ENTER
		this.lines["B-08tC"].value	= 0;	// DO NOT ENTER

		// Wages While Incarcerated
		this.lines["B-08uA"].value	= TaxFormObj.getValue("F1040S1", "08u");
		this.lines["B-08uB"].value	= 0;	// DO NOT ENTER
		this.lines["B-08uC"].value	= 0;	// DO NOT ENTER

		// Digital Assets Received
		this.lines["B-08vA"].value	= TaxFormObj.getValue("F1040S1", "08v");
		this.lines["B-08vB"].value	= 0;
		this.lines["B-08vC"].value	= 0;

		// Other Income
		this.lines["B-08zA"].value	= TaxFormObj.getValue("F1040S1", "08z");
		this.lines["B-08zB"].value	= 0;
		this.lines["B-08zC"].value	= 0;

		// Total Other Income (8a-8z)"
		this.lines["B-09aA"].value =
			this.add("B-08aA","B-08bA","B-08cA","B-08dA","B-08eA","B-08fA",
						"B-08gA","B-08hA","B-08iA","B-08jA","B-08kA","B-08lA",
						"B-08mA","B-08nA","B-08oA","B-08pA","B-08qA","B-08rA",
						"B-08sA","B-08tA","B-08uA","B-08vA","B-08zA");
		// Subtract from Other Income (8a-8z)"
		this.lines["B-09aB"].value =
			this.add("B-08aB","B-08bB","B-08cB","B-08dB","B-08eB","B-08fB",
						"B-08gB","B-08hB","B-08iB","B-08jB","B-08kB","B-08lB",
						"B-08mB","B-08nB","B-08oB","B-08pB","B-08qB","B-08rB",
						"B-08sB","B-08tB","B-08uB","B-08vB","B-08zB");
		// Add to Other Income (8a-8z)"
		this.lines["B-09aC"].value =
			this.add("B-08aC","B-08bC","B-08cC","B-08dC","B-08eC","B-08fC",
						"B-08gC","B-08hC","B-08iC","B-08jC","B-08kC","B-08lC",
						"B-08mC","B-08nC","B-08oC","B-08pC","B-08qC","B-08rC",
						"B-08sC","B-08tC","B-08uC","B-08vC","B-08zC");

		// Disaster Loss
		this.lines["B-09b1A"].value	= 0;	// DO NOT ENTER
		this.lines["B-09b1B"].value	= 0;
		this.lines["B-09b1C"].value	= 0;	// DO NOT ENTER

		// NOL Deduction
		this.lines["B-09b2A"].value	= 0;	// DO NOT ENTER
		this.lines["B-09b2B"].value	= 0;
		this.lines["B-09b2C"].value	= 0;	// DO NOT ENTER

		// NOL Other
		this.lines["B-09b3A"].value	= 0;	// DO NOT ENTER
		this.lines["B-09b3B"].value	= 0;
		this.lines["B-09b3C"].value	= 0;	// DO NOT ENTER

		// Total Income
		this.lines["B-10A"].value =
			this.add("A-01zA","A-02bA","A-03bA","A-04bA","A-05bA","A-06bA","A-07aA",
						"B-01A", "B-02aA","B-03A", "B-04A", "B-05A", "B-06A", "B-07A",
						"B-09aA","B-09b1A","B-09b2A","B-09b3A");
		// Subtract from Total Income
		this.lines["B-10B"].value =
			this.add("A-01zB","A-02bB","A-03bB","A-04bB","A-05bB","A-06bB","A-07aB",
						"B-01B", "B-02aB","B-03B", "B-04B", "B-05B", "B-06B", "B-07B",
						"B-09aB","B-09b1B","B-09b2B","B-09b3B",
						"B-09b1B","B-09b2B","B-09b3B");
		// Add to Total Income
		this.lines["B-10C"].value =
			this.add("A-01zC","A-02bC","A-03bC","A-04bC","A-05bC","A-06bC","A-07aC",
						"B-01C", "B-02aC","B-03C", "B-04C", "B-05C", "B-06C", "B-07C",
						"B-09aC","B-09b1C","B-09b2C","B-09b3C");

		// Form 1040S1 Adjustments to Income

		// Educator Expense
		this.lines["C-11A"].value	= TaxFormObj.getValue("F1040S1", "11");
		this.lines["C-11B"].value	= this.line("C-11A");	// Value from column A
		this.lines["C-11C"].value	= 0;	// DO NOT ENTER

		// Business Expense from Form 2106
		this.lines["C-12A"].value	= TaxFormObj.getValue("F1040S1", "12");
		this.lines["C-12B"].value	= 0;
		this.lines["C-12C"].value	= 0;

		// HSA Deduction
		this.lines["C-13A"].value	= TaxFormObj.getValue("F1040S1", "13");
		this.lines["C-13B"].value	= this.line("C-13A");	// Value from column A;
		this.lines["C-13C"].value	= 0;	// DO NOT ENTER

		// Moving Expenses
		this.lines["C-14A"].value	= TaxFormObj.getValue("F1040S1", "14");
		this.lines["C-14B"].value	= 0;	// DO NOT ENTER
		this.lines["C-14C"].value	= 0;

		// Deductable SE Tax
		this.lines["C-15A"].value	= TaxFormObj.getValue("F1040S1", "15");
		this.lines["C-15B"].value	= 0;
		this.lines["C-15C"].value	= 0;	// DO NOT ENTER

		// Deductable SEP, Simple
		this.lines["C-16A"].value	= TaxFormObj.getValue("F1040S1", "16");
		this.lines["C-16B"].value	= 0;	// DO NOT ENTER
		this.lines["C-16C"].value	= 0;	// DO NOT ENTER

		// Self-employed Health Insurance
		this.lines["C-17A"].value	= TaxFormObj.getValue("F1040S1", "17");
		this.lines["C-17B"].value	= 0;
		this.lines["C-17C"].value	= 0;	// DO NOT ENTER

		// Early Withdrawal Penalty
		this.lines["C-18A"].value	= TaxFormObj.getValue("F1040S1", "18");
		this.lines["C-18B"].value	= 0;	// DO NOT ENTER
		this.lines["C-18C"].value	= 0;	// DO NOT ENTER

		// Alimony Paid
		this.lines["C-19aA"].value	= TaxFormObj.getValue("F1040S1", "19a");
		this.lines["C-19aB"].value	= 0;	// DO NOT ENTER
		this.lines["C-19aC"].value	= 0;	// Alimony paid if divorce after 12/31/2018

		// IRA Deduction
		this.lines["C-20A"].value	= TaxFormObj.getValue("F1040S1", "20");
		this.lines["C-20B"].value	= 0;
		this.lines["C-20C"].value	= 0;

		// Student Loan Interest Deduction
		this.lines["C-21A"].value	= TaxFormObj.getValue("F1040S1", "21");
		this.lines["C-21B"].value	= 0;	// DO NOT ENTER
		this.lines["C-21C"].value	= 0;

		// Reserved for Future Use
		this.lines["C-22A"].value	= 0;	// DO NOT ENTER
		this.lines["C-22B"].value	= 0;	// DO NOT ENTER
		this.lines["C-22C"].value	= 0;	// DO NOT ENTER

		// Archer MSA Deduction
		this.lines["C-23A"].value	= TaxFormObj.getValue("F1040S1", "23");
		this.lines["C-23B"].value	= 0;	// DO NOT ENTER
		this.lines["C-23C"].value	= 0;	// DO NOT ENTER

		// Jury Duty Pay
		this.lines["C-24aA"].value	= TaxFormObj.getValue("F1040S1", "24a");
		this.lines["C-24aB"].value	= 0;	// DO NOT ENTER
		this.lines["C-24aC"].value	= 0;	// DO NOT ENTER

		// Rental Expense (see line 8l)
		this.lines["C-24bA"].value	= TaxFormObj.getValue("F1040S1", "24b");
		this.lines["C-24bB"].value	= 0;
		this.lines["C-24bC"].value	= 0;

		// Non-taxable amount is USOC
		this.lines["C-24cA"].value	= TaxFormObj.getValue("F1040S1", "24c");
		this.lines["C-24cB"].value	= 0;
		this.lines["C-24cC"].value	= 0;	// DO NOT ENTER

		// Reforestation Expenses
		this.lines["C-24dA"].value	= TaxFormObj.getValue("F1040S1", "24d");
		this.lines["C-24dB"].value	= 0;
		this.lines["C-24dC"].value	= 0;	// DO NOT ENTER

		// Repayment of Unemployment Expenses
		this.lines["C-24eA"].value	= TaxFormObj.getValue("F1040S1", "24e");
		this.lines["C-24eB"].value	= 0;	// DO NOT ENTER
		this.lines["C-24eC"].value	= 0;	// DO NOT ENTER

		// Contribution to 501(c) Pension
		this.lines["C-24fA"].value	= TaxFormObj.getValue("F1040S1", "24f");
		this.lines["C-24fB"].value	= 0;
		this.lines["C-24fC"].value	= 0;

		// Contributions to 403(b) Plan
		this.lines["C-24gA"].value	= TaxFormObj.getValue("F1040S1", "24g");
		this.lines["C-24gB"].value	= 0;
		this.lines["C-24gC"].value	= 0;

		// Attorney Fees
		this.lines["C-24hA"].value	= TaxFormObj.getValue("F1040S1", "24h");
		this.lines["C-24hB"].value	= 0;	// DO NOT ENTER
		this.lines["C-24hC"].value	= 0;	// DO NOT ENTER

		// Attorney Fees
		this.lines["C-24iA"].value	= TaxFormObj.getValue("F1040S1", "24i");
		this.lines["C-24iB"].value	= 0;
		this.lines["C-24iC"].value	= 0;	// DO NOT ENTER

		// Foreign Earned Income Housing Deduction
		this.lines["C-24jA"].value	= TaxFormObj.getValue("F1040S1", "24j");
		this.lines["C-24jB"].value	= 0;
		this.lines["C-24jC"].value	= 0;	// DO NOT ENTER

		// Excess Deduction from Form 1041
		this.lines["C-24kA"].value	= TaxFormObj.getValue("F1040S1", "24k");
		this.lines["C-24kB"].value	= 0;	// DO NOT ENTER
		this.lines["C-24kC"].value	= 0;	// DO NOT ENTER

		// Other Adjustments
		this.lines["C-24zA"].value	= TaxFormObj.getValue("F1040S1", "24z");
		this.lines["C-24zB"].value	= 0;
		this.lines["C-24zC"].value	= 0;

		// Total Other Adjustments
		this.lines["C-25A"].value =
			this.add("C-24aA","C-24bA","C-24cA","C-24dA","C-24eA","C-24fA",
						"C-24gA","C-24hA","C-24iA","C-24jA","C-24kA","C-24zA");
		this.lines["C-25B"].value =
			this.add("C-24aB","C-24bB","C-24cB","C-24dB","C-24eB","C-24fB",
						"C-24gB","C-24hB","C-24iB","C-24jB","C-24kB","C-24zB");
		this.lines["C-25C"].value =
			this.add("C-24aC","C-24bC","C-24cC","C-24dC","C-24eC","C-24fC",
						"C-24gC","C-24hC","C-24iC","C-24jC","C-24kC","C-24zC");

		// (Total Adjustments
		this.lines["C-26A"].value =
			this.add("C-11A","C-12A","C-13A","C-14A","C-15A","C-16A","C-17A",
						"C-18A","C-19aA","C-20A","C-21A","C-22A","C-23A","C-25A");
		this.lines["C-26B"].value =
			this.add("C-11B","C-12B","C-13B","C-14B","C-15B","C-16B","C-17B",
						"C-18B","C-19aB","C-20B","C-21B","C-22B","C-23B","C-25B");
		this.lines["C-26C"].value =
			this.add("C-11C","C-12C","C-13C","C-14C","C-15C","C-16C","C-17C",
						"C-18C","C-19aC","C-20C","C-21C","C-22C","C-23C","C-25C");

		// Income - Adjustments
		this.lines["C-27A"].value	= this.subtract("B-10A","C-26A");	// (A) Federal AGI
		this.lines["C-27B"].value	= this.subtract("B-10B","C-26B");	// Sub from AGI
		this.lines["C-27C"].value	= this.subtract("B-10C","C-26C");	// Add to AGI
		if (this.line("C-27A") !== TaxFormObj.getValue("F1040", "11b")) {
			Debug.warn("F540CA: AGI does not match.");
		}

		// Part II Adjustment to Federal Itemized Deductions
		// Medical and Dental Expenses

		// Medical Expenses
		this.lines["D-01A"].value	= TaxFormObj.getValue("F1040SA", "01");
		this.lines["D-01B"].value	= 0;	// DO NOT ENTER
		this.lines["D-01C"].value	= 0;	// DO NOT ENTER

		// AGI
		this.lines["D-02A"].value	= TaxFormObj.getValue("F1040", "11b");
		this.lines["D-02B"].value	= 0;	// DO NOT ENTER
		this.lines["D-02C"].value	= 0;	// DO NOT ENTER

		// 7.5% or AGI
		this.lines["D-03A"].value	= Math.round(this.line("D-02A") * 0.075);
		this.lines["D-03B"].value	= 0;	// DO NOT ENTER
		this.lines["D-03C"].value	= 0;	// DO NOT ENTER

		// Medical Deduction
		this.lines["D-04A"].value	= this.subtract("D-01A", "D-03A");
		this.lines["D-04B"].value	= 0;	// DO NOT ENTER
		this.lines["D-04C"].value	= 0;	// HSA Distribution for Qualified Expenses

		// Taxes You Paid
		// State and Local Income Tax
		this.lines["D-05aA"].value	= TaxFormObj.getValue("F1040SA", "05a");
		this.lines["D-05aB"].value	= TaxFormObj.getValue("F1040SA", "05a") -
										TaxFormObj.getValue("SalesTax", "08");
		this.lines["D-05aC"].value	= 0;	// DO NOT ENTER

		// Real Estate Tax
		this.lines["D-05bA"].value	= TaxFormObj.getValue("F1040SA", "05b");
		this.lines["D-05bB"].value	= 0;	// DO NOT ENTER
		this.lines["D-05bC"].value	= 0;	// DO NOT ENTER

		// Personal Property Tax
		this.lines["D-05cA"].value	= TaxFormObj.getValue("F1040SA", "05c");
		this.lines["D-05cB"].value	= 0;	// DO NOT ENTER
		this.lines["D-05cC"].value	= 0;	// DO NOT ENTER

		// Total State and Local Taxes
		this.lines["D-05dA"].value	= this.add("D-05aA","D-05bA","D-05cA");
		this.lines["D-05dB"].value	= 0;	// DO NOT ENTER
		this.lines["D-05dC"].value	= 0;	// DO NOT ENTER

		// SALT after Limit
		this.lines["D-05eA"].value	= Math.min(this.line("D-05dA"),
										   tt.getTaxValue("MaxSALT", tp.filing_status));
		this.lines["D-05eB"].value	= this.line("D-05aB");
		this.lines["D-05eC"].value	= this.subtract("D-05dA","D-05eA");

		// Other Taxes
		this.lines["D-06A"].value	= TaxFormObj.getValue("F1040SA", "06");
		this.lines["D-06B"].value	= 0;
		this.lines["D-06C"].value	= 0;

		// Deduction for Taxes Paid
		this.lines["D-07A"].value	= this.add("D-05eA","D-06A");
		this.lines["D-07B"].value	= this.add("D-05eB","D-06B");
		this.lines["D-07C"].value	= this.add("D-05eC","D-06C");

		// Interest You Paid
		// Mortgage Interest
		this.lines["D-08aA"].value	= TaxFormObj.getValue("F1040SA", "08a");
		this.lines["D-08aB"].value	= 0;	// DO NOT ENTER
		this.lines["D-08aC"].value	= 0;

		// Mortgage Interest Not from 1098
		this.lines["D-08bA"].value	= TaxFormObj.getValue("F1040SA", "08b");
		this.lines["D-08bB"].value	= 0;	// DO NOT ENTER
		this.lines["D-08bC"].value	= 0;

		// Mortgage Points Not from 1098
		this.lines["D-08cA"].value	= TaxFormObj.getValue("F1040SA", "08c");
		this.lines["D-08cB"].value	= 0;	// DO NOT ENTER
		this.lines["D-08cC"].value	= 0;

		// Reserved For Future Use
		this.lines["D-08dA"].value	= 0;	// DO NOT ENTER
		this.lines["D-08dB"].value	= 0;	// DO NOT ENTER
		this.lines["D-08dC"].value	= 0;	// DO NOT ENTER

		// Mortgage Deduction
		this.lines["D-08eA"].value	= this.add("D-08aA","D-08bA","D-08cA");
		this.lines["D-08eB"].value	= this.add("D-08aB","D-08bB","D-08cB");
		this.lines["D-08eC"].value	= this.add("D-08aC","D-08bC","D-08cC");

		// Investment Interest
		this.lines["D-09A"].value	= TaxFormObj.getValue("F1040SA", "09");
		this.lines["D-09B"].value	= 0;
		this.lines["D-09C"].value	= 0;

		// Interest Deduction
		this.lines["D-10A"].value	= this.add("D-08eA","D-09A");
		this.lines["D-10B"].value	= this.add("D-08eB","D-09B");
		this.lines["D-10C"].value	= this.add("D-08eC","D-09C");

		// Gifts to Charity
		// Cash Donations
		this.lines["D-11A"].value	= TaxFormObj.getValue("F1040SA", "11");
		this.lines["D-11B"].value	= 0;
		this.lines["D-11C"].value	= 0;

		// Non-cash Donatons
		this.lines["D-12A"].value	= TaxFormObj.getValue("F1040SA", "12");
		this.lines["D-12B"].value	= 0;
		this.lines["D-12C"].value	= 0;

		// Carry-over Donations
		this.lines["D-13A"].value	= TaxFormObj.getValue("F1040SA", "13");
		this.lines["D-13B"].value	= 0;
		this.lines["D-13C"].value	= 0;

		// Donation Deduction
		this.lines["D-14A"].value	= this.add("D-11A","D-12A","D-13A");
		this.lines["D-14B"].value	= this.add("D-11B","D-12B","D-13B");
		this.lines["D-14C"].value	= this.add("D-11C","D-12C","D-13C");

		// Casualty and Theft Deduction
		this.lines["D-15A"].value	= TaxFormObj.getValue("F1040SA", "15");
		this.lines["D-15B"].value	= 0;
		this.lines["D-15C"].value	= 0;

		// Other Deduction
		this.lines["D-16A"].value	= TaxFormObj.getValue("F1040SA", "16");
		this.lines["D-16B"].value	= 0;
		this.lines["D-16C"].value	= 0;

		// Itemized Deductions
		this.lines["D-17A"].value	= this.add("D-04A","D-07A","D-10A",
											   "D-14A","D-15A","D-16A");
		this.lines["D-17B"].value	= this.add("D-04B","D-07B","D-10B",
											   "D-14B","D-15B","D-16B");
		this.lines["D-17C"].value	= this.add("D-04C","D-07C","D-10C",
											   "D-14C","D-15C","D-16C");

		// CA Itemized Deductions
		this.lines["D-18"].value	= this.line("D-17A") -
										this.line("D-17B") +
										this.line("D-17C");

		// Job Expenses and Miscellaneous Deductions
		this.lines["D-19"].value	= 0;								// Employee Exp
		this.lines["D-20"].value	= 0;								// Tax prep fee
		this.lines["D-21"].value	= 0;								// Invest Expense
		this.lines["D-22"].value	= this.add("D-19","D-20","D-21");	// Misc Deduction
		this.lines["D-23"].value	= TaxFormObj.getValue("F1040", "11b");	// Federal AGI
		this.lines["D-24"].value	= Math.max(0, Math.round(this.line("D-23") * 0.02));
		this.lines["D-25"].value	= this.subtract("D-22","D-24");		// Misc Deduction
		if (this.line("D-24") > this.line("D-22")) {
			this.lines["D-25"].value = 0;
		}
		this.lines["D-26"].value	= this.add("D-18","D-25");			// Itemized + Misc
		this.lines["D-27"].value	= 0;								// Other Adjs
		this.lines["D-28"].value	= this.add("D-26","D-27");			// Total Deduction

		if (TaxFormObj.getValue("F1040", "11b") <= 
			tt.getTaxValue("CA_HiIncPhaseout", tp.filing_status)) {
			this.lines["D-29"].value = this.line("D-28");			// Itemized Deduction
		} else {
			this.lines["D-29"].value =
				new CA_HiIncDeductions("CA_HiIncDeductions").line("deductions");
		}
		this.lines["D-30"].value =
			Math.max(this.line("D-29"),
						tt.getTaxValue("CA_StandardDeduction", tp.filing_status));

		Debug.exit("F540CA.calculate()");
	}
}
