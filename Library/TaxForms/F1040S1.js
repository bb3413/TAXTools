
import { Debug }		from "../Modules/Debug.js";
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";

export class F1040S1 extends TaxForm {
	constructor(formname) {
		Debug.enter("F1040S1.Constructor()");
		super(formname);
		this.title = `Schedule 1 - Additional Income and Adjustments to Income`;

		// Additions to Income
		this.lines["01"]	= new Line("Taxable Refund");
		this.lines["02a"]	= new Line("Alimony Received");
		this.lines["02b"]	= new Line("Business Income");
		this.lines["03"]	= new Line("Other Gains");
		this.lines["04"]	= new Line("Schedule E Income");
		this.lines["05"]	= new Line("Farm Income");
		this.lines["06"]	= new Line("Unemployment Compensation");
		this.lines["07"]	= new Line("Other Income");
		this.lines["08a"]	= new Line("Net Operating Loss");	// Subtract
		this.lines["08b"]	= new Line("Gambling");
		this.lines["08c"]	= new Line("Cancellation of Debt");
		this.lines["08d"]	= new Line("Foreign Earned Income Exclusion");	// Subtract
		this.lines["08e"]	= new Line("Income from form 8853");
		this.lines["08f"]	= new Line("Income from form 8889");
		this.lines["08g"]	= new Line("Alaska Permanent Fund");
		this.lines["08h"]	= new Line("Jury Duty Pay");
		this.lines["08i"]	= new Line("Prizes and Awards");
		this.lines["08j"]	= new Line("Hobby Income");
		this.lines["08k"]	= new Line("Stock Options");
		this.lines["08l"]	= new Line("Income from Rent");
		this.lines["08m"]	= new Line("USOC Prize");
		this.lines["08n"]	= new Line("Section 951(a) Inclusion");
		this.lines["08o"]	= new Line("Section 951A(a) Inclusion");
		this.lines["08p"]	= new Line("Excess Business Loss");
		this.lines["08q"]	= new Line("Taxable ABLE Distributions");
		this.lines["08r"]	= new Line("Scholarship Not on W-2");
		this.lines["08s"]	= new Line("Non-taxable Medicaid Waiver Payment");	// Subtract
		this.lines["08t"]	= new Line("Pension from Non-qualified Plan");
		this.lines["08u"]	= new Line("Wages While Incarcerated");
		this.lines["08v"]	= new Line("Digital Assets Received");
		this.lines["08z"]	= new Line("Other Income");
		this.lines["09"]	= new Line("Total Other Income");
		this.lines["10"]	= new Line("Additional Income");

		// Adjustments to Income
		this.lines["11"]	= new Line("Educator Expense");
		this.lines["12"]	= new Line("Business Expense from Form 2106");
		this.lines["13"]	= new Line("HSA Deduction");
		this.lines["14"]	= new Line("Moving Expenses");
		this.lines["15"]	= new Line("Deductable SE Tax");
		this.lines["16"]	= new Line("Deductable SEP, Simple");
		this.lines["17"]	= new Line("Self-employed Health Insurance");
		this.lines["18"]	= new Line("Early Withdrawal Penalty");
		this.lines["19a"]	= new Line("Alimony Paid");
		this.lines["19b"]	= new Line("Recipient SSN");
		this.lines["19c"]	= new Line("Date of Divorce");
		this.lines["20"]	= new Line("IRA Deduction");
		this.lines["21"]	= new Line("Student Loan Interest Deduction");
		this.lines["22"]	= new Line("Reserved for Future Use");
		this.lines["23"]	= new Line("Archer MSA Deduction");
		this.lines["24a"]	= new Line("Jury Duty Pay");
		this.lines["24b"]	= new Line("Rental Expense (see line 8l)");
		this.lines["24c"]	= new Line("Non-taxable amount is USOC");
		this.lines["24d"]	= new Line("Reforestation Expenses");
		this.lines["24e"]	= new Line("Repayment of Unemployment Expenses");
		this.lines["24f"]	= new Line("Contribution to 501(c) Pension");
		this.lines["24g"]	= new Line("Contributions to 403(b) Plan");
		this.lines["24h"]	= new Line("Attorney Fees");
		this.lines["24i"]	= new Line("Attorney Fees");
		this.lines["24j"]	= new Line("Foreign Earned Income Housing Deduction");
		this.lines["24k"]	= new Line("Excess Deduction from Form 1041");
		this.lines["24z"]	= new Line("Other Adjustments");
		this.lines["25"]	= new Line("Total Other Adjustments");
		this.lines["26"]	= new Line("Adjustments to Income");

		Debug.exit("F1040S1.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F1040S1.calculate()");
		this.calculated = true;

		// Aditions to Income
		this.lines["01"].value	= 0;									// Taxable Refund
		this.lines["02a"].value	= 0;									// Alimony Received
		this.lines["02b"].value	= 0;									// Business Income
		this.lines["03"].value	= TaxFormObj.getValue("F1040SC", "31");	// Other Gains
		this.lines["04"].value	= 0;									// Schedule E Income
		this.lines["05"].value	= 0;									// Farm Income
		this.lines["06"].value	= TaxFormObj.getValue("F1099G", "01");	// Unemploy Comp
		this.lines["07"].value	= 0;									// Other Income
		this.lines["08a"].value	= 0;  // Subtract						// Net Operating Loss
		this.lines["08b"].value	= 0;									// Gambling
		this.lines["08c"].value	= 0;									// Cancelled Debt
		// Foreign Earned Income Exclusion (Subtract)
		this.lines["08d"].value	= -(TaxFormObj.getValue("F2555", "xx"));	
		this.lines["08e"].value	= TaxFormObj.getValue("F8853", "xx");	// Income from 8853
		this.lines["08f"].value	= TaxFormObj.getValue("F8889", "16") +	// Income from 8889
									TaxFormObj.getValue("F8889", "20");
		this.lines["08g"].value	= 0;									// Alaska Fund
		this.lines["08h"].value	= 0;									// Jury Duty Pay
		this.lines["08i"].value	= 0;									// Prizes and Awards
		this.lines["08j"].value	= 0;									// Hobby Income
		this.lines["08k"].value	= 0;									// Stock Options
		this.lines["08l"].value	= 0;									// Income from Rent
		this.lines["08m"].value	= 0;									// USOC Prize
		this.lines["08n"].value	= 0;									// Section 951(a)
		this.lines["08o"].value	= 0;									// Section 951A(a)
		this.lines["08p"].value	= 0;									// Business Loss
		this.lines["08q"].value	= 0;									// Taxable ABLE
		this.lines["08r"].value	= 0;									// Scholarship
		// Non-taxable Medicaid Waiver Payment (Subtract)
		this.lines["08s"].value	= -(TaxFormObj.getValue("W2", "xx") +
									TaxFormObj.getValue("F1099MISC", "xx"));
		this.lines["08t"].value	= 0;									// Non-qualified Plan
		this.lines["08u"].value	= 0;									// Incarceration Pay
		this.lines["08v"].value	= 0;									// Digital Assets
		this.lines["08z"].value	= 0;									// Other Income
		this.lines["09"].value	= this.add("08a","08b","08c","08d",
										   "08e","08f","08g","08h",
										   "08i","08j","08k","08l",
										   "08m","08n","08o","08p",
										   "08q","08r","08s","08t",
										   "08u","08v","08z");		// Total Other Income
		this.lines["10"].value	= this.add("01","02a","03","04",
										   "05","06","07","09");	// Additional Income

		// Adjustments to Income
		this.lines["11"].value	= 0;									// Educator Expense
		this.lines["12"].value	= 0;									// Business Expense
		this.lines["13"].value	= TaxFormObj.getValue("F8889", "13");	// HSA Deduction
		this.lines["14"].value	= 0;									// Moving Expenses
		this.lines["15"].value	= TaxFormObj.getValue("F1040SSE", "13");// Deductable SE Tax
		this.lines["16"].value	= 0;									// SEP, Simple
		this.lines["17"].value	= 0;									// SE Health Ins
		this.lines["18"].value	= 0;									// Early Withdrawal
		this.lines["19a"].value	= 0;									// Alimony Paid
		this.lines["19b"].value	= 0;									// Recipient SSN
		this.lines["19c"].value	= 0;									// Date of Divorce
		this.lines["20"].value	= 0;									// IRA Deduction
		this.lines["21"].value	= 0;									// Student Loan
		this.lines["22"].value	= 0;									// Reserved
		this.lines["23"].value	= 0;									// Archer MSA
		this.lines["24a"].value	= 0;									// Jury Duty Pay
		this.lines["24b"].value	= 0;									// Rental Expense
		this.lines["24c"].value	= 0;									// Non-taxable USOC
		this.lines["24d"].value	= 0;									// Reforestation
		this.lines["24e"].value	= 0;									// Repay Unemployment
		this.lines["24f"].value	= 0;									// Contrib to 501(c)
		this.lines["24g"].value	= 0;									// Contrib to 403(b)
		this.lines["24h"].value	= 0;									// Attorney Fees
		this.lines["24i"].value	= 0;									// Attorney Fees
		this.lines["24j"].value	= 0;									// Foreign Housing
		this.lines["24k"].value	= 0;									// Excess 1041
		this.lines["24z"].value	= 0;									// Other Adjustments
		this.lines["25"].value	= this.add("24a","24b","24c","24d",
										   "24e","24f","24g","24h",
										   "24i","24j","24k","24z");	// Total Other Adjs
		this.lines["26"].value	= this.add("11","12","13","14","15",
										   "16","17","18","19a","20",
										   "21","22","23","25");		// Adj to Income

		Debug.exit("F1040S1.calculate()");
	}
}
