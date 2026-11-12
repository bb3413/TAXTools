
import { Dates }				from "../Modules/Dates.js";
import { Debug }				from "../Modules/Debug.js";
import { Ensure }				from "../Modules/Ensure.js";
import { Line }					from "../Classes/Line.js";
import { TaxForm }				from "../Classes/TaxForm.js";
import { TaxFormObj }			from "../Modules/TaxFormObj.js";
import { TaxTable }				from "../Modules/TaxTable.js";
import { Taxpayer }				from "../Classes/Taxpayer.js";
import { CA_HiIncDeductions }	from "../Worksheets/CA_HiIncDeductions.js";
import { F540CA_HTML }			from "../OutputForms/F540CA_HTML.js";

export class F540CA extends TaxForm {
	constructor(formname) {
		Debug.enter("F540CA.Constructor()");
		super(formname);
		this.title = `CA (540) - California Adjustments - Residents`;

		// Variables for external input. This variable is be used to enter information
		// that does not come from another tax form.
		this.investment_expenses = 0;

		// Create the lines on the form.
		let field_info = F540CA_HTML.getFieldInfo();
		for (const field_name of Object.keys(field_info)) {
			if (field_info[field_name][1]) {
				this.lines[field_name]= new Line(field_info[field_name][2]);
			}
		}

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
		const f1040s1 = TaxFormObj.getForm("F1040S1");

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
		this.lines["B-02b"].value	= "";	// Divorce Date
		if (f1040s1) {
			this.lines["B-02b"].value = f1040s1.lines["02b"].value;	// Divorce Date
			if (Dates.isValid(this.lines["B-02b"].value) &&
				!Dates.isBefore(this.lines["B-02b"].value, "01/01/2019")) {
					this.lines["B-02aC"].value = f1040s1.alimony_received;
			}
		}

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
		this.lines["B-08bB"].value	= 0;	// California lottery winning
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

		// Deductible SE Tax
		this.lines["C-15A"].value	= TaxFormObj.getValue("F1040S1", "15");
		this.lines["C-15B"].value	= 0;
		this.lines["C-15C"].value	= 0;	// DO NOT ENTER

		// Deductible SEP, Simple
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

		// Alimony Paid new
		this.lines["C-19aA"].value	= TaxFormObj.getValue("F1040S1", "19a");
		this.lines["C-19aB"].value	= 0;	// DO NOT ENTER
		this.lines["C-19aC"].value	= 0;	// Alimony received if divorce after 12/31/2018
		this.lines["C-19c"].value	= "";	// Divorce date
		if (f1040s1) {
			this.lines["C-19c"].value = f1040s1.lines["19c"].value;	// Divorce Date
			if (Dates.isValid(this.lines["C-19c"].value) &&
				!Dates.isBefore(this.lines["C-19c"].value, "01/01/2019")) {
					this.lines["C-19aC"].value = f1040s1.alimony_paid;
			}
		}

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
			console.warn("F540CA: AGI does not match.");
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
		this.lines["D-04A"].value	= Math.max(0, this.subtract("D-01A", "D-03A"));
		this.lines["D-04B"].value	= 0;	// DO NOT ENTER
		this.lines["D-04C"].value	= 0;	// HSA Distribution for Qualified Expenses

		// Taxes You Paid
		// State and Local Income Tax
		this.lines["D-05aA"].value	= TaxFormObj.getValue("F1040SA", "05a");
		this.lines["D-05aB"].value	= TaxFormObj.getValue("F1040SA", "05a");
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
										   tt.getTaxValue("MaxSALT"));
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

		// Non-cash Donations
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
		this.lines["D-19"].value	= 0;							// Employee Exp
		this.lines["D-20"].value	= 0;							// Tax prep fee
		this.lines["D-21"].value	=								// Invest Expenses
			this.investment_expenses +
			TaxFormObj.getValue("F1099INT", "05") +
			TaxFormObj.getValue("F1099DIV", "06");
		this.lines["D-22"].value	= this.add("D-19","D-20","D-21");	// Misc Deduction
		this.lines["D-23"].value	= TaxFormObj.getValue("F1040", "11b");	// Federal AGI
		this.lines["D-24"].value	= Math.max(0, Math.round(this.line("D-23") * 0.02));
		this.lines["D-25"].value	= this.subtract("D-22","D-24");		// Misc Deduction
		if (this.line("D-24") > this.line("D-22")) {
			this.lines["D-25"].value = 0;
		}
		this.lines["D-26"].value	= this.add("D-18","D-25");			// Itemized + Misc
		this.lines["D-27"].value	= 0;								// Other Adjustments
		this.lines["D-28"].value	= this.add("D-26","D-27");			// Total Deduction

		if (TaxFormObj.getValue("F1040", "11b") <= tt.getTaxValue("CA_HiIncPhaseout")) {
			this.lines["D-29"].value = this.line("D-28");			// Itemized Deduction
		} else {
			this.lines["D-29"].value =
				new CA_HiIncDeductions("CA_HiIncDeductions").line("deductions");
		}
		this.lines["D-30"].value =
			Math.max(this.line("D-29"), tt.getTaxValue("CA_StandardDeduction"));

		Debug.exit("F540CA.calculate()");
	}
}
