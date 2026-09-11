
import { Debug }		from "../Modules/Debug.js";
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";

function roundDown(value) {
	return Math.trunc(value);
}

function roundUp(value) {
	let num = Math.trunc(value);
	if (num !== value) {
		num += 1;
	}

	return num;
}

export class F1040S1A extends TaxForm {
	constructor(formname) {
		Debug.enter("F1040S1A.Constructor()");
		super(formname);
		this.title = `Schedule 1A - Additional Deductions`;

		// No Tax on Tips
		this.lines["01"]	= new Line("Adjusted Gross Income");
		this.lines["02a"]	= new Line("Income from Puerto Rico");
		this.lines["02b"]	= new Line("Foreign Earned Income Housing Exclusion");
		this.lines["02c"]	= new Line("Foreign Earned Income Housing Deduction");
		this.lines["02d"]	= new Line("Samoa Income Exclusion");
		this.lines["02e"]	= new Line("Total Foreign Income");
		this.lines["03"]	= new Line("AGI + Foreign Income");
		this.lines["04a"]	= new Line("Qualified Tips");
		this.lines["04b"]	= new Line("Qualified Tips from Form 4137");
		this.lines["04c"]	= new Line("Qualified Tips Allowed");
		this.lines["05"]	= new Line("Qualified Tips from Business");
		this.lines["06"]	= new Line("Total Qualified Tips");
		this.lines["07"]	= new Line("Limit to Maximum Allowed");
		this.lines["08"]	= new Line("AGI + Foreign Income");
		this.lines["09"]	= new Line("Start of Phase Out");
		this.lines["10"]	= new Line("Amount Over Phase Out");
		this.lines["11"]	= new Line("Calculate Phase Out");
		this.lines["12"]	= new Line("Calculate Phase Out");
		this.lines["13"]	= new Line("Qualified Tip Deduction");

		// No Tax on Overtime
		this.lines["14a"]	= new Line("Qualified Overtime Pay");
		this.lines["14b"]	= new Line("Qualified Overtime Pay from Business");
		this.lines["14c"]	= new Line("Total Overtime Pay");
		this.lines["15"]	= new Line("Limit to Maximum Allowed");
		this.lines["16"]	= new Line("AGI + Foreign Income");
		this.lines["17"]	= new Line("Start of Phase Out");
		this.lines["18"]	= new Line("Amount Over Phase Out");
		this.lines["19"]	= new Line("Calculate Phase Out");
		this.lines["20"]	= new Line("Calculate Phase Out");
		this.lines["21"]	= new Line("Qualified Overtime Deduction");

		// No Tax on Car Loan Interest
		this.lines["22a"]	= new Line("Interest on Car Loan #1");
		this.lines["22b"]	= new Line("Interest on Car Loan #2");
		this.lines["23"]	= new Line("Total Interest");
		this.lines["24"]	= new Line("Limit to Maximum Allowed");
		this.lines["25"]	= new Line("AGI + Foreign Income");
		this.lines["26"]	= new Line("Start of Phase Out");
		this.lines["27"]	= new Line("Amount Over Phase Out");
		this.lines["28"]	= new Line("Calculate Phase Out");
		this.lines["29"]	= new Line("Calculate Phase Out");
		this.lines["30"]	= new Line("Qualified Car Loan Deduction");

		// Enhanced Deduction for Seniors
		this.lines["31"]	= new Line("AGI + Foreign Income");
		this.lines["32"]	= new Line("Start of Phase Out");
		this.lines["33"]	= new Line("Amount Over Phase Out");
		this.lines["34"]	= new Line("Calculate Phase Out");
		this.lines["35"]	= new Line("Amount of Deduction");
		this.lines["36a"]	= new Line("Senior Deduction for Taxpayer");
		this.lines["36b"]	= new Line("Senior Deduction for Spouse");
		this.lines["37"]	= new Line("Senior Deduction");
		this.lines["38"]	= new Line("Total Additional Deductions");

		Debug.exit("F1040S1A.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F1040S1A.calculate()");
		this.calculated = true;
		const tt = TaxTable.getTaxTable();
		const tp = Taxpayer.getTaxpayer();

		let max_deduction		= 0;
		let start_of_phase_out	= 0;

		// No Tax on Tips
		max_deduction		= tt.getTaxValue("MaxTipsDeduction",		tp.filing_status);
		start_of_phase_out	= tt.getTaxValue("TipsDeductionPhaseOut",	tp.filing_status);

		this.lines["01"].value	= TaxFormObj.getValue("F1040", "11b");	// AGI
		this.lines["02a"].value	= 0;									// Puerto Rico Inc
		this.lines["02b"].value	= TaxFormObj.getValue("F2555", "45");	// Foreign Housing
		this.lines["02c"].value	= TaxFormObj.getValue("F2555", "50");	// Foreign Housing
		this.lines["02d"].value	= TaxFormObj.getValue("F4563", "15");	// Samoa Income
		this.lines["02e"].value	= this.add("02a","02b","02c","02d");	// Total Foreign Inc
		this.lines["03"].value	= this.add("01","02e");					// AGI + Foreign Inc
		this.lines["04a"].value	= TaxFormObj.getValue("W2", "05") +		// Qualified Tips
									TaxFormObj.getValue("W2", "07");
		this.lines["04b"].value	= TaxFormObj.getValue("F4137", "01");	// Qualified Tips
		this.lines["04c"].value	= 0;									// Qualified Tips
		this.lines["05"].value	= 0;									// Qualified Tips
		this.lines["06"].value	= this.add("04c","05");					// Total Tips
		this.lines["07"].value	= Math.min(this.line("06"), max_deduction);	// Limit
		this.lines["08"].value	= this.line("03");						// AGI + Foreign Inc
		this.lines["09"].value	= start_of_phase_out;
		this.lines["10"].value	= this.subtract("08", "09");			// Amount Over Limit
		if (this.line("10") <= 0) {
			this.lines["13"].value = this.line("07");					// Tip Deduction
		} else {
			this.lines["11"].value	= roundDown(this.line("10") / 1000);// Calc Phase Out
			this.lines["12"].value	= this.line("11") * 100;			// Calc Phase Out
			this.lines["13"].value	= Math.max(0, this.subtract("07", "12"));// Tip Deduction
		}

		// No Tax on Overtime
		max_deduction =
			tt.getTaxValue("MaxOvertimeDeduction",		tp.filing_status);
		start_of_phase_out =
			tt.getTaxValue("OvertimeDeductionPhaseOut",	tp.filing_status);

		this.lines["14a"].value	= 0;									// Overtime Pay
		this.lines["14b"].value	= 0;									// Overtime Pay
		this.lines["14c"].value	= this.add("14a","14b");				// Total Overtime
		this.lines["15"].value	= Math.min(this.line("14c"), max_deduction);// Limit
		this.lines["16"].value	= this.line("03");						// AGI + Foreign Inc
		this.lines["17"].value	= start_of_phase_out;
		this.lines["18"].value	= this.subtract("16", "17");			// Over Phase Out
		if (this.line("18") <= 0) {
			this.lines["21"].value = this.line("15");					// Overtime Deduction
		} else {
			this.lines["19"].value	= roundDown(this.line("18") / 1000);// Calc Phase Out
			this.lines["20"].value	= this.line("19") * 100;			// Calc Phase Out
			this.lines["21"].value	= Math.max(0, this.subtract("15", "20"));// Deduction
		}

		// No Tax on Car Loan Interest
		max_deduction =
			tt.getTaxValue("MaxCarLoanInterestDeduction", tp.filing_status);
		start_of_phase_out =
			tt.getTaxValue("CarLoanInterestPhaseOut", tp.filing_status);

		this.lines["22a"].value	= 0;								// Car Loan #1 Interest
		this.lines["22b"].value	= 0;								// Car Loan #2 Interest
		this.lines["23"].value	= this.add("22a","22b");			// Total Interest
		this.lines["24"].value	= Math.min(this.line("23"), max_deduction);	// Limit
		this.lines["25"].value	= this.line("03");					// AGI + Foreign Income
		this.lines["26"].value	= start_of_phase_out;
		this.lines["27"].value	= this.subtract("25", "26");		// Amount Over Phase Out
		if (this.line("27") <= 0) {
			this.lines["30"].value = this.line("24");				// Car Loan Deduction
		} else {
			this.lines["28"].value	= roundUp(this.line("27") / 1000);	// Calc Phase Out
			this.lines["29"].value	= this.line("28") * 200;			// Calc Phase Out
			this.lines["30"].value	= Math.max(0, this.subtract("24", "29"));// Car Deduction
		}

		// Enhanced Deduction for Seniors
		max_deduction		= tt.getTaxValue("MaxSeniorDeduction",		tp.filing_status);
		start_of_phase_out	= tt.getTaxValue("SeniorDeductionPhaseOut",	tp.filing_status);

		this.lines["31"].value	= this.line("03");					// AGI + Foreign Income
		this.lines["32"].value	= start_of_phase_out;
		this.lines["33"].value	= this.subtract("31", "32");		// Amount Over Phase Out
		if (this.line("33") <= 0) {
			this.lines["35"].value	= max_deduction;				// Amount of Deduction
		} else {
			this.lines["34"].value	= Math.round(this.line("33") * 0.06);// Calc Phase Out
			this.lines["35"].value	= Math.max(0, max_deduction - this.line("34"));
		}
		this.lines["36a"].value	= 0;
		if (tp.taxpayer_has_ssn && tp.taxpayers_age >= 65) {
			this.lines["36a"].value	= this.line("35");				// Senior deduction
		}
		this.lines["36b"].value	= 0;
		if ((tp.filing_status === "MFJ") && tp.taxpayer_has_ssn && tp.spouses_age >= 65) {
			this.lines["36b"].value	= this.line("35");				// Senior deduction
		}
		this.lines["37"].value	= this.add("36a","36b");			// Senior Deduction
		this.lines["38"].value	= this.add("13","21","30","37");	// Additional Deductions

		Debug.exit("F1040S1A.calculate()");
	}
}
