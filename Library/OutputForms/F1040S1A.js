
import { SINGLE, HOH, MFJ, QSS, MFS }	from "../TAXTools/TAXTools.js";

import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxInfo }		from "../Modules/TaxInfo.js";
import { TaxTable }		from "../Modules/TaxTable.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";
import { F1040S1A_HTML }	from "../OutputForms/F1040S1A_HTML.js";

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

		this.lines["01"]	= new Line("Adjusted Gross Income");
		this.lines["02a"]	= new Line("Income from Puerto Rico");
		this.lines["02b"]	= new Line("Foreign Earned Income Housing Exclusion");
		this.lines["02c"]	= new Line("Foreign Earned Income Housing Deduction");
		this.lines["02d"]	= new Line("Samoa Income Exclusion");
		this.lines["02e"]	= new Line("Total Foreign Income");
		this.lines["03"]	= new Line("AGI + Foreign Income");

		// No Tax on Tips
		this.lines["04a1"]	= new Line("Business name");
		this.lines["04a2"]	= new Line("EIN");
		this.lines["04a3"]	= new Line("Tips from W-2, box 12, code TP");
		this.lines["04a4"]	= new Line("Tips from form 4137, line 1");
		this.lines["04a5"]	= new Line("Max 04a3 or 04a4");
		this.lines["05"]	= new Line("Add 04a5, 04b5, 04c5, 04d5, 04e5");

		this.lines["06a1"]	= new Line("Business name");
		this.lines["06a2"]	= new Line("EIN");
		this.lines["06a3"]	= new Line("Schedule C, line 31");
		this.lines["06a4"]	= new Line("Other allocatable deductions");
		this.lines["06a5"]	= new Line("06a3 - 06a4");
		this.lines["06a6"]	= new Line("EIN from 1st 1099");
		this.lines["06a7"]	= new Line("Tips from 1st 1099");
		this.lines["06a8"]	= new Line("EIN from 2nd 1099");
		this.lines["06a9"]	= new Line("Tips from 2nd 1099");
		this.lines["06a10"]	= new Line("EIN from 3rd 1099");
		this.lines["06a11"]	= new Line("Tips from 3rd 1099");
		this.lines["06a12"]	= new Line("Add 06a7, 06a9, 06a11");
		this.lines["06a13"]	= new Line("Min 06a5 06a12");
	
		this.lines["07"]	= new Line("Add 06a5, 06b5, 06c5, 06d5, 06e5");
		this.lines["08"]	= new Line("Total Qualified Tips");
		this.lines["09"]	= new Line("Limit to Maximum Allowed");
		this.lines["10"]	= new Line("AGI + Foreign Income");
		this.lines["11"]	= new Line("Start of Phase Out");
		this.lines["12"]	= new Line("Amount Over Phase Out");
		this.lines["13"]	= new Line("Calculate Phase Out");
		this.lines["14"]	= new Line("Calculate Phase Out");
		this.lines["15"]	= new Line("Qualified Tip Deduction");

		// No Tax on Overtime
		this.lines["16a1"]	= new Line("Employer Name");
		this.lines["16a2"]	= new Line("EIN");
		this.lines["16a3"]	= new Line("Overtime Pay from W-2, box 12, code TT");
		this.lines["17"]	= new Line("Total Overtime Pay from W-2");

		this.lines["18a1"]	= new Line("Business Name");
		this.lines["18a2"]	= new Line("EIN");
		this.lines["18a2"]	= new Line("Payer TIN");
		this.lines["18a4"]	= new Line("Overtime Pay from 1099");

		this.lines["19"]	= new Line("Total Overtime Pay from 1099");
		this.lines["20"]	= new Line("Total Overtime Pay");
		this.lines["21"]	= new Line("Limit to Maximum Allowed");
		this.lines["22"]	= new Line("AGI + Foreign Income");
		this.lines["23"]	= new Line("Start of Phase Out");
		this.lines["24"]	= new Line("Amount Over Phase Out");
		this.lines["25"]	= new Line("Calculate Phase Out");
		this.lines["26"]	= new Line("Calculate Phase Out");
		this.lines["27"]	= new Line("Qualified Overtime Deduction");

		// No Tax on Car Loan Interest
		this.lines["28a"]	= new Line("Interest on Car Loan #1");
		this.lines["28b"]	= new Line("Interest on Car Loan #2");
		this.lines["29"]	= new Line("Total Interest");
		this.lines["30"]	= new Line("Limit to Maximum Allowed");
		this.lines["31"]	= new Line("AGI + Foreign Income");
		this.lines["32"]	= new Line("Start of Phase Out");
		this.lines["33"]	= new Line("Amount Over Phase Out");
		this.lines["34"]	= new Line("Calculate Phase Out");
		this.lines["35"]	= new Line("Calculate Phase Out");
		this.lines["36"]	= new Line("Qualified Car Loan Deduction");

		// Enhanced Deduction for Seniors
		this.lines["37"]	= new Line("AGI + Foreign Income");
		this.lines["38"]	= new Line("Start of Phase Out");
		this.lines["39"]	= new Line("Amount Over Phase Out");
		this.lines["40"]	= new Line("Calculate Phase Out");
		this.lines["41"]	= new Line("Possible Deduction");
		this.lines["42a"]	= new Line("Senior Deduction for Taxpayer");
		this.lines["42b"]	= new Line("Senior Deduction for Spouse");
		this.lines["43"]	= new Line("Senior Deduction");

		this.lines["44"]	= new Line("Total Additional Deductions");

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
		max_deduction		= tt.getTaxValue("MaxTipsDeduction");
		start_of_phase_out	= tt.getTaxValue("TipsDeductionPhaseOut");

		this.lines["01"].value	= TaxFormObj.getValue("F1040", "11b");	// AGI
		this.lines["02a"].value	= 0;									// Puerto Rico Inc
		this.lines["02b"].value	= TaxFormObj.getValue("F2555", "45");	// Foreign Housing
		this.lines["02c"].value	= TaxFormObj.getValue("F2555", "50");	// Foreign Housing
		this.lines["02d"].value	= TaxFormObj.getValue("F4563", "15");	// Samoa Income
		this.lines["02e"].value	= this.add("02a","02b","02c","02d");	// Total Foreign Inc
		this.lines["03"].value	= this.add("01","02e");					// AGI + Foreign Inc

		// No Tax on Tips
		this.lines["04a1"].value	= "";
		this.lines["04a2"].value	= "";
		this.lines["04a3"].value	= TaxInfo.getW2TipIncome();				// Tips from W-2, box 12
		this.lines["04a4"].value	= TaxFormObj.getValue("F4137", "01");	// Tips from 4137
		this.lines["04a5"].value	= Math.max(this.line("04a3"), this.line("04a4"))
		this.lines["05"].value		= this.line("04a5");

		this.lines["06a1"].value	= "";	// Business name
		this.lines["06a2"].value	= "";	// EIN
		this.lines["06a3"].value	= TaxFormObj.getValue("F1040SC", "31");	// Schedule C, line 31
		this.lines["06a4"].value	= 0;	// Other allocatable deductions
		this.lines["06a5"].value	= this.subtract("06a3", "06a4");	// 06a3 - 06a4
		this.lines["06a6"].value	= "";	// EIN from 1st 1099
		this.lines["06a7"].value	=		// Tips from 1st 1099
			TaxFormObj.getValue("F1099NEC", "01b") +
			TaxFormObj.getValue("F1099MISC", "13a") +
			TaxFormObj.getValue("F1099K", "01c");
		this.lines["06a8"].value	= "";	// EIN from 2nd 1099
		this.lines["06a9"].value	= 0;	// Tips from 2nd 1099
		this.lines["06a10"].value	= "";	// EIN from 3rd 1099
		this.lines["06a11"].value	= 0;	// Tips from 3rd 1099
		this.lines["06a12"].value	= this.add("06a7", "06a9", "06a11");
		this.lines["06a13"].value	= this.min("06a5", "06a12");
		this.lines["07"].value		= this.line("06a13");

		this.lines["08"].value		= this.add("05", "07");		// Total Tips
		if ((this.line("08") > 0) && this._isQualified()) {
			this.lines["09"].value		= Math.min(this.line("08"), max_deduction);	// Limit
			this.lines["10"].value		= this.line("03");	// AGI + Foreign Inc
			this.lines["11"].value		= start_of_phase_out;
			this.lines["12"].value		= this.subtract("10", "11");		// Amount Over Limit
			if (this.line("12") <= 0) {
				this.lines["15"].value = this.line("09");
			} else {
				this.lines["13"].value		= roundDown(this.line("12") / 1000);// Calc Phase Out
				this.lines["14"].value		= this.line("13") * 100;		// Calc Phase Out
				this.lines["15"].value		= Math.max(0, this.subtract("09", "14"));// Deduction
			}
		}

		// No Tax on Overtime
		max_deduction =			tt.getTaxValue("MaxOvertimeDeduction");
		start_of_phase_out =	tt.getTaxValue("OvertimeDeductionPhaseOut");

		this.lines["16a1"].value	= "";	// Employer Name
		this.lines["16a2"].value	= "";	// EIN
		this.lines["16a3"].value	= TaxInfo.getW2OvertimePay();;	// OT Pay from W-2, box 12, code TT
		this.lines["17"].value		= this.line("16a3");	// Total Overtime Pay from W-2

		this.lines["18a1"].value	= "";	// Business Name
		this.lines["18a2"].value	= "";	// EIN
		this.lines["18a2"].value	= "";	// Payer TIN
		this.lines["18a4"].value	=		// Overtime Pay from 1099
			TaxFormObj.getValue("F1099NEC", "01d") +
			TaxFormObj.getValue("F1099MISC", "14");
		this.lines["19"].value		= this.line("18a4");	// Total Overtime Pay from 1099
		
		this.lines["20"].value	= this.add("17","19");		// Total Overtime Pay
		if ((this.line("20") > 0) && this._isQualified()) {
			this.lines["21"].value	= Math.min(this.line("20"), max_deduction);	// Limit to Max Allowed
			this.lines["22"].value	= this.line("03");			// AGI + Foreign Income
			this.lines["23"].value	= start_of_phase_out;	// Start of Phase Out
			this.lines["24"].value	= this.subtract("22", "23");	// Amount Over Phase Out
			if (this.line("24") <= 0) {
				this.lines["27"].value = this.line("21");
			} else {
				this.lines["25"].value	= roundDown(this.line("24") / 1000);	// Calculate Phase Out
				this.lines["26"].value	= this.line("25") * 100;	// Calculate Phase Out
				this.lines["27"].value	= Math.max(0, this.subtract("21", "26"));	// Overtime Deduction
			}
		}

		// No Tax on Car Loan Interest
		max_deduction =			tt.getTaxValue("MaxCarLoanInterestDeduction");
		start_of_phase_out =	tt.getTaxValue("CarLoanInterestPhaseOut");

		this.lines["28a"].value	= TaxFormObj.getValue("F1098VLI", "01");	// Car Loan #1 Interest
		this.lines["28b"].value	= 0;								// Car Loan #2 Interest
		this.lines["29"].value	= this.add("28a","28b");			// Total Interest
		if ((this.line("29") > 0) && (tp.filing_status !== MFS)) {
			this.lines["30"].value	= Math.min(this.line("29"), max_deduction);	// Limit
			this.lines["31"].value	= this.line("03");				// AGI + Foreign Income
			this.lines["32"].value	= start_of_phase_out;
			this.lines["33"].value	= this.subtract("31", "32");	// Amount Over Phase Out
			if (this.line("33") <= 0) {
				this.lines["36"].value = this.line("30");			// Car Loan Deduction
			} else {
				this.lines["34"].value	= roundUp(this.line("33") / 1000);	// Calc Phase Out
				this.lines["35"].value	= this.line("34") * 200;		// Calc Phase Out
				this.lines["36"].value	= Math.max(0, this.subtract("30", "35"));// Deduction
			}
		}

		// Enhanced Deduction for Seniors
		max_deduction		= tt.getTaxValue("MaxSeniorDeduction");
		start_of_phase_out	= tt.getTaxValue("SeniorDeductionPhaseOut");

		this.lines["37"].value	= this.line("03");				// AGI + Foreign Income
		this.lines["38"].value	= start_of_phase_out;
		// Line 39 = Amount Over Phase Out
		this.lines["39"].value	= Math.max(0, this.subtract("37", "38"));
		if (this.line("39") <= 0) {
			this.lines["41"].value	= max_deduction;			// Amount of Deduction
		} else {
			this.lines["40"].value	= Math.round(this.line("39") * 0.06);	// Calc Phase Out
			this.lines["41"].value	= Math.max(0, max_deduction - this.line("40"));
		}
		this.lines["42a"].value	= 0;
		if (tp.taxpayer_has_ssn && tp.taxpayers_age >= 65) {
			this.lines["42a"].value	= this.line("41");			// Senior deduction
		}
		this.lines["42b"].value	= 0;
		if ((tp.filing_status === MFJ) && tp.spouse_has_ssn && tp.spouses_age >= 65) {
			this.lines["42b"].value	= this.line("41");			// Senior deduction
		}
		this.lines["43"].value	= this.add("42a","42b");		// Senior Deduction
		this.lines["44"].value	= this.add("15","27","36","43");// Additional Deductions

		Debug.exit("F1040S1A.calculate()");
	}

	_isQualified() {
		// Check qualification for tips, overtime.
		const tp = Taxpayer.getTaxpayer();
		if (tp.filing_status === MFS){
			return false;
		}
		if ((tp.filing_status !== MFJ) && tp.taxpayer_has_ssn) {
			return true;
		}
		if ((tp.filing_status === MFJ) && tp.taxpayer_has_ssn && tp.spouse_has_ssn) {
			// FIX THIS; only the spouse that earned the overtime or tips needs an SSN.
			return true;
		}
		return false;
	}
}
