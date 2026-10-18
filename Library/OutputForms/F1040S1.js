
import { SINGLE, HOH, MFJ, QSS, MFS }	from "../TAXTools/TAXTools.js";
import { TAXPAYER, SPOUSE }				from "../TAXTools/TAXTools.js";

import { Dates }		from "../Modules/Dates.js";
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";
import { TaxTable }		from "../Modules/TaxTable.js";
import { F1040S1_HTML }	from "../OutputForms/F1040S1_HTML.js";

export class F1040S1 extends TaxForm {
	constructor(formname) {
		Debug.enter("F1040S1.Constructor()");
		super(formname);
		this.title = `Schedule 1 - Additional Income and Adjustments to Income`;
		const tp = Taxpayer.getTaxpayer();

		// Create worksheets
		this.student_loan = TaxFormObj.createForm("StudentLoan");
		this.taxpayer_ira_deduction	= TaxFormObj.createForm("IRADeduction");
		if (tp.filing_status === MFJ) {
			this.spouse_ira_deduction = TaxFormObj.createForm("IRADeduction");
		}

		// Variables for external input. These variables can be used to enter information
		// that does not come from another tax form.
		this.alimony_received			= 0;
		this.alimony_paid				= 0;
		this.educator_expense_taxpayer	= 0;
		this.educator_expense_spouse	= 0;
		this.ira_contribution_taxpayer	= 0;
		this.ira_contribution_spouse	= 0;

		// Create the lines on the form.
		let field_info = F1040S1_HTML.getFieldInfo();
		for (const field_name of Object.keys(field_info)) {
			if (field_info[field_name][1]) {
				this.lines[field_name]= new Line(field_info[field_name][2]);
			}
		}

		Debug.exit("F1040S1.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F1040S1.calculate()");
		this.calculated = true;

		// Abbreviations
		const tt = TaxTable.getTaxTable();
		const tp = Taxpayer.getTaxpayer();
		const getValue = TaxFormObj.getValue;

		// Reset the worksheets in case this form is being recalculated.
		this.student_loan.resetCalculation();
		this.taxpayer_ira_deduction.resetCalculation();
		if (this.spouse_ira_deduction) {
			this.spouse_ira_deduction.resetCalculation();
		}

		const max_educator_expense = tt.getTaxValue("MaxEducatorExpenses", SINGLE);

		// Additions to Income
		this.lines["01"].value	= getValue("F1099G", "taxable_refund");	// Taxable Refund
		this.lines["02a"].value	= 0;									// Alimony Received
		this.lines["02b"].value	= "";									// Divorce Date
		if (Dates.isValid(this.lines["02b"].value)) {
			if (Dates.isBefore(this.lines["02b"].value, "01/01/2019")) {
				this.lines["02a"].value	= this.alimony_received;
			}
		}
		this.lines["03"].value	= getValue("F1040SC", "31");		// Business Income
		this.lines["04"].value	= 0;								// Other Gains
		this.lines["05"].value	= 0;								// Schedule E Income
		this.lines["06"].value	= 0;								// Farm Income
		this.lines["07"].value	= getValue("F1099G", "01");			// Unemployment Comp
		this.lines["08a"].value	= 0;  // Subtract					// Net Operating Loss
		this.lines["08b"].value	= 0;								// Gambling
		this.lines["08c"].value	= 0;								// Cancelled Debt
		// Foreign Earned Income Exclusion (Subtract)
		this.lines["08d"].value	= -(getValue("F2555", "xx"));
		this.lines["08e"].value	= getValue("F8853", "xx");			// Income from 8853
		this.lines["08f"].value	= getValue("F8889", "16") +			// Income from 8889
									getValue("F8889", "20");
		this.lines["08g"].value	= 0;								// Alaska Fund
		this.lines["08h"].value	= 0;								// Jury Duty Pay
		this.lines["08i"].value	= 0;								// Prizes and Awards
		this.lines["08j"].value	= 0;								// Hobby Income
		this.lines["08k"].value	= 0;								// Stock Options
		this.lines["08l"].value	= 0;								// Income from Rent
		this.lines["08m"].value	= 0;								// USOC Prize
		this.lines["08n"].value	= 0;								// Section 951(a)
		this.lines["08o"].value	= 0;								// Section 951A(a)
		this.lines["08p"].value	= 0;								// Business Loss
		this.lines["08q"].value	= 0;								// Taxable ABLE
		this.lines["08r"].value	= 0;								// Scholarship
		// Non-taxable Medicaid Waiver Payment (Subtract)
		this.lines["08s"].value	= -(getValue("W2", "xx") +
									getValue("F1099MISC", "xx"));
		this.lines["08t"].value	= 0;								// Non-qualified Plan
		this.lines["08u"].value	= 0;								// Incarceration Pay
		this.lines["08v"].value	= 0;								// Digital Assets
		this.lines["08z"].value	= 0;								// Other Income
		this.lines["09"].value	= this.add("08a","08b","08c","08d",
										   "08e","08f","08g","08h",
										   "08i","08j","08k","08l",
										   "08m","08n","08o","08p",
										   "08q","08r","08s","08t",
										   "08u","08v","08z");		// Total Other Income
		this.lines["10"].value	= this.add("01","02a","03","04",
										   "05","06","07","09");	// Additional Income

		// Adjustments to Income
		this.lines["11"].value =									// Educator Expense
			Math.min(max_educator_expense, this.educator_expense_taxpayer) +
			Math.min(max_educator_expense, this.educator_expense_spouse);
		this.lines["12"].value	= 0;								// Business Expense
		this.lines["13"].value	= getValue("F8889", "13");			// HSA Deduction
		this.lines["14"].value	= 0;								// Moving Expenses
		this.lines["15"].value	= getValue("F1040SSE", "13");		// Deductible SE Tax
		this.lines["16"].value	= 0;								// SEP, Simple
		this.lines["17"].value	= 0;								// SE Health Ins
		this.lines["18"].value	=	// Early Withdrawal Penalty
			getValue("F1099INT", "02") +	
			getValue("F1099OID", "03");
		this.lines["19a"].value	= 0;								// Alimony Paid
		this.lines["19b"].value	= "";								// Recipient SSN
		this.lines["19c"].value	= "";								// Date of Divorce
		if (Dates.isValid(this.lines["19c"].value)) {
			if (Dates.isBefore(this.lines["19c"].value, "01/01/2019")) {
				this.lines["19a"].value	= this.alimony_paid;
			}
		}

		this.lines["20"].value	= 0;	// This line is calculated further down
		this.lines["21"].value	= 0;	// This line is calculated further down
		this.lines["22"].value	= 0;								// Reserved
		this.lines["23"].value	= 0;								// Archer MSA
		this.lines["24a"].value	= 0;								// Jury Duty Pay
		this.lines["24b"].value	= 0;								// Rental Expense
		this.lines["24c"].value	= 0;								// Non-taxable USOC
		this.lines["24d"].value	= 0;								// Reforestation
		this.lines["24e"].value	= 0;								// Repay Unemployment
		this.lines["24f"].value	= 0;								// Contrib to 501(c)
		this.lines["24g"].value	= 0;								// Contrib to 403(b)
		this.lines["24h"].value	= 0;								// Attorney Fees
		this.lines["24i"].value	= 0;								// Attorney Fees
		this.lines["24j"].value	= 0;								// Foreign Housing
		this.lines["24k"].value	= 0;								// Excess 1041
		this.lines["24z"].value	= 0;								// Other Adjustments
		this.lines["25"].value	= this.add("24a","24b","24c","24d",
										   "24e","24f","24g","24h",
										   "24i","24j","24k","24z");	// Total Other Adj

		// Delay calculating lines 20 and 21 because they are dependent on
		// lines 11-19a, 23, and 25.
		this.lines["20"].value	= this._calculateIRADeduction();		// IRA Contribution
		this.lines["21"].value	= this._calculateStudentLoanDeduction();// Student Loan

		this.lines["26"].value	= this.add("11","12","13","14","15",
										   "16","17","18","19a","20",
										   "21","22","23","25");		// Adj to Income

		Debug.exit("F1040S1.calculate()");
	}

	_calculateIRADeduction() {
		let deduction = 0;

		deduction =
			this.taxpayer_ira_deduction.calculate(TAXPAYER, this.ira_contribution_taxpayer);
		if (this.spouse_ira_deduction) {
			deduction +=
				this.spouse_ira_deduction.calculate(SPOUSE, this.ira_contribution_spouse);
		}

		return deduction;
	}

	_calculateStudentLoanDeduction() {
		const interest	= TaxFormObj.getValue("F1098E", "01");
		const deduction	= this.student_loan.calculate(interest);
		
		return deduction;
	}
}
