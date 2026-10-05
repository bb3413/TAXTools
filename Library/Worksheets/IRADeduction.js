
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
import { TaxInfo }		from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";

export class IRADeduction extends TaxForm {
	constructor(formname) {
		Debug.enter("IRADeduction.Constructor()");
		super(formname);

		this.lines["01a"]	= new Line("Taxpayer has retirement plan at work");
		this.lines["01b"]	= new Line("Spouses has retirement plan at work");
		this.lines["02a"]	= new Line("");
		this.lines["02b"]	= new Line("");
		this.lines["03"]	= new Line("");
		this.lines["04"]	= new Line("");
		this.lines["05a"]	= new Line("");
		this.lines["05b"]	= new Line("");
		this.lines["06a"]	= new Line("");
		this.lines["06b"]	= new Line("");
		this.lines["07a"]	= new Line("");
		this.lines["07b"]	= new Line("");
		this.lines["08"]	= new Line("");
		this.lines["09"]	= new Line("");
		this.lines["10"]	= new Line("");
		this.lines["11a"]	= new Line("");
		this.lines["11b"]	= new Line("");
		this.lines["12a"]	= new Line("");
		this.lines["12b"]	= new Line("");

		Debug.exit("IRADeduction.Constructor()");
	}

	calculate(who) {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("IRADeduction.calculate()");
		this.calculated = true;
		const tt = TaxTable.getTaxTable();
		const tp = Taxpayer.getTaxpayer();

		const max_contribution	= 0;
		const phase_out			= 0;

		this.lines["01a"].value	= TaxInfo.hasRetirementPlan(TAXPAYER);
		this.lines["01b"].value	= TaxInfo.hasRetirementPlan(SPOUSE);
		if (!this.line("01a") && (tp.filing_status === MFJ && !this.line("01b"))) {
			this.lines["02a"].value	= 0;
			this.lines["02b"].value	= 0;
			this.lines["03"].value	= 0;
			this.lines["04"].value	= 0;
			this.lines["05a"].value	= 0;
			this.lines["05b"].value	= 0;
			this.lines["06a"].value	= 0;
			this.lines["06b"].value	= 0;
		} else {
			this.lines["02a"].value	= 0;
			this.lines["02b"].value	= 0;
			this.lines["03"].value	= TaxFormObj.getValue("F1040", "09");	// Total Income
			this.lines["04"].value	= this.add("11", "12", "13", "14", "15",
											   "16", "17", "18", "19a", "23", "25");
			this.lines["05a"].value	= this.subtract("03", "04");
			if (tp.filing_status === MFJ) {
				this.lines["05b"].value	= this.line("05a");
			} else {
				this.lines["05b"].value	= 0;
			}
			this.lines["06a"].value	= this.subtract("02a", "05a");
			this.lines["06b"].value	= this.subtract("02b", "05b");
		}
		this.lines["07a"].value	= 0;
		this.lines["07b"].value	= 0;
		this.lines["08"].value	= 0;
		this.lines["09"].value	= 0;
		this.lines["10"].value	= 0;
		this.lines["11a"].value	= 0;
		this.lines["11b"].value	= 0;
		this.lines["12a"].value	= 0;
		this.lines["12b"].value	= 0;

		Debug.exit("IRADeduction.calculate()");
		return this.line("12a");
	}
}

function contributionLimit(who) {
	const tp = Taxpayer.getTaxpayer();
	const tt = TaxTable.getTaxTable();
	
	let limit = tt.getTaxValue("MaxIRAContribution");
}
function getDeductibleIRAContribution(contribution, who) {
	// - Contribution is not deductible on a California return.
	// - If taxpayer has retirement plan at work (W-2, box 13), the deductible amount is
	//   limited by AGI.
	// - If taxpayer does not have retirement plan at work, deductible amount is not limited
	//   by AGI.
	// - Maximum contribution to all IRAs (sum of all traditional and Roth) is:	
	//		The amount of earned income (both spouses), or
	//		$7,000 per spouse if under 50
	//		$8,000 per spouse if over 50
	// - Update tooltip

	console.warn("Unimplemented function: getDeductibleIRAContribution()");
	return contribution;
}