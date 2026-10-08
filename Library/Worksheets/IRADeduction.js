
//
// This is the IRA Contribution Deduction Worksheet for Schedule 1, line 20.
// It is documented in the 1040 Instructions (TY2025) on pages 95-98.
//
import { TAXPAYER, SPOUSE } from "../TAXTools/TAXTools.js";

import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxInfo }		from "../Modules/TaxInfo.js";
import { TaxTable }		from "../Modules/TaxTable.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";

export class IRADeduction extends TaxForm {
	constructor(formname) {
		Debug.enter("IRADeduction.Constructor()");
		super(formname);

		this.lines["01"]	= new Line("Taxpayer has retirement plan at work");
		this.lines["02"]	= new Line("Income Limit");
		this.lines["03"]	= new Line("Total Income");
		this.lines["04"]	= new Line("Disallowed adjustments");
		this.lines["05"]	= new Line("Allowed Income");
		this.lines["06"]	= new Line("Income Limit - Allowed Income");
		this.lines["07"]	= new Line("Contributions allowed");
		this.lines["08"]	= new Line("Earned income from wages");
		this.lines["09"]	= new Line("Earned income from small business");
		this.lines["10"]	= new Line("Total earned income");
		this.lines["11"]	= new Line("IRA Contributions");
		this.lines["12"]	= new Line("");

		Debug.exit("IRADeduction.Constructor()");
	}

	calculate(who, contributions) {
		Ensure.isTaxpayer(who);
		Ensure.isNumber(contributions);

		// if (this.calculated) {
		//	throw new Error(`${this.formname} already calculated.`);
		// }

		Debug.enter("IRADeduction.calculate()");
		this.calculated = true;
		const tt = TaxTable.getTaxTable();
		const tp = Taxpayer.getTaxpayer();
		const f1040s1 = TaxFormObj.getForm("F1040S1");
		let has_retirement_plan = TaxInfo.hasRetirementPlan(who);

		this.lines["01"].value	= has_retirement_plan;
		if (!has_retirement_plan) {
			this.lines["07"].value	= contributionLimit(who);
		} else {
			this.lines["02"].value	= agiLimit(who);
			this.lines["03"].value	= TaxFormObj.getValue("F1040", "09");	// Total Income
			this.lines["04"].value	= f1040s1.add("11","12","13","14",
											"15","16","17","18","19a",
											"23","25");
			this.lines["05"].value	= this.subtract("03", "04");
			if (this.line("05") < this.liune("02")) {
				return 0;	// Not deductible
			}
			this.lines["06"].value = this.subtract("02", "05");	// Income limit - income
			switch (tp.filing_status) {
				case SINGLE:
				case HOH:
				case MFS:
					if (this.line("06") >= 10000) {
						this.lines["07"].value = contributionLimit(who);
					} else {
						this.lines["07"].value = doLine7(who);
					}
					break;
				case MFJ:
				case QSS:
					if ((this.line("06") >= 20000) && has_retirement_plan) {
						this.lines["07"].value = contributionLimit(who);
					} else if (this.line("06") >= 10000) {
						this.lines["07"].value = contributionLimit(who);
					} else {
						this.lines["07"].value = doLine7(who);
					}
					break;		
			}
		}

		this.lines["08"].value	= 0;	// Earned income from wages
		this.lines["09"].value	= 0;	// Earned income from small business
		this.lines["10"].value	= TaxInfo.earnedIncome();
		this.lines["11"].value	= contributions;
		this.lines["12"].value	= this.min("07", "10", "11");;

		Debug.exit("IRADeduction.calculate()");
		return this.line("12");
	}
}

function agiLimit(who) {
	const tp = Taxpayer.getTaxpayer();
	const tt = TaxTable.getTaxTable();
	
	let limit = tt.getTaxValue("IRA_AGILimit", tp.filing_status);
	if ((tp.filing_status === MFS) && !this.line("01")) {
		limit = tt.getTaxValue("IRA_AGILimitNoPlan", tp.filing_status);
	}
	if ((tp.filing_status === MFS) && (tp.months_lived_together > 0)) {
		limit = 10000;
	}

	return limit;
}

function contributionLimit(who) {
	const tp = Taxpayer.getTaxpayer();
	const tt = TaxTable.getTaxTable();

	let limit = tt.getTaxValue("MaxIRAContribution", tp.filing_status);
	if ( ((who === TAXPAYER) && (tp.taxpayers_age >= 50)) ||
		   ((who === SPOUSE) && (tp.spouses_age >= 50)) ) {
		limit += tt.getTaxValue("IRAContributionOver50", tp.filing_status);
	}

	return limit;
}

function doLine7(who) {
	let has_retirement_plan = this.line("01");
	let over50 = false;
	if ( ((who === TAXPAYER) && (tp.taxpayers_age >= 50)) ||
			((who === SPOUSE) && (tp.spouses_age >= 50)) ) {
		over50 = true;
	}
	
	let percent = 0;
	switch (tp.filing_status) {
		case SINGLE:
		case HOH:
		case MFS:
			if (over50) {
				percent = 0.80;
			} else {
				percent = 0.70;
			}
			break;
		case MFJ:
		case QSS:
			if ((tp.filing_status === MFJ) && has_retirement_plan) {
				if (over50) {
					percent = 0.80;
				} else {
					percent = 0.70;
				}									  
			} else if (over50) {
				percent = 0.40;
			} else {
				percent = 0.35;
			}
			break;
	}
				
	let line7 = this.line("06") * percent;
	line7 = Math.min(200, roundup(tmp, 10));
	return line7;
}
