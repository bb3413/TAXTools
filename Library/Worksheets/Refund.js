
//
// Compute the taxable portion of the state income tax refund.
//
// IRS Publication: 1040 Instructions, see the section for Schedule 1, Additional
// Income, Line 1 on page 88. Instructions say to use the State and Local Income
// Tax Refund Worksheet on page 90, which is implemented in this worksheet.
//
import { Debug }		from "../Classes/Debug.js";
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Classes/TaxFormObj.js";
import { TaxTable }		from "../Classes/TaxTable.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";

export class Refund extends TaxForm {
	constructor(formname) {
		Debug.enter("Refund.Constructor()");
		super(formname);

		// Inputs
		this.sched_a_5d				= 0;
		this.sched_a_5e				= 0;
		this.itemized_deductions	= 0;
		this.refund					= 0;

		// Outputs
		this.taxable_amount			= 0;
		this.explanation			= "";

		// Worksheet Lines
		this.lines["01"]	= new Line("Refund");
		this.lines["02"]	= new Line("");
		this.lines["03"]	= new Line("");
		this.lines["04"]	= new Line("Itemized Deductions");
		this.lines["05"]	= new Line("");
		this.lines["06"]	= new Line("");
		this.lines["07"]	= new Line("");
		this.lines["08"]	= new Line("");
		this.lines["09"]	= new Line("Taxable mount");

		Debug.exit("Refund.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("Refund.calculate()");
		this.calculated = true;
		const tt = TaxTable.getTaxTable();
		const tp = Taxpayer.getTaxpayer();

		// Inputs
		this.refund = Math.min(	// State Tax Refund
						TaxFormObj.getValue("F1099G", "02"),
						this.sched_a_5d);

		// When filing MFS, if one spouse itemizes then the other spouse is required to
		// itemize as well. Since it is only necessary to determine if a tax refund is
		// taxable if the taxpayer itemized, we can assume that if the filing status is MFS,
		// the taxpayer is required to itemize.
		let spouse_itemized = true;

		this.lines["01"].value = this.line("refund");				// Refund from 1099-G
		if (this.sched_a_5d > this.sched_a_5e) {					// Taxes > SALT cap
			// Amount of taxes limited by SALT cap
			this.lines["02"].value = this.subtract("sched_a_5d", "sched_a_5e");

			if (this.line("01") > this.line("02")) {
				// Amount of refund not covered by excess SALT.
				this.lines["03"].value	= this.subtract("01", "02");
				this.explanation = "Part of refund is less than the amount " +
					"of the state and local taxes that are over the SALT cap. The " +
					"remainder of the refund is taxable.";
			} else {
				this.explanation = "All of refund is less than the amount " +
					"of state and local taxes that are over the SALT cap. The refund is " +
					"not taxable.";
				return;
			}
		} else {
			// SALT taxes were not limited by SALT cap.
			this.lines["03"].value	= this.line("01");
			this.explanation = "The state and local taxes are not limited " +
				"by the SALT cap. The refund is taxable.";
		}

		this.lines["04"].value = this.itemized_deductions;
		if ((tp.filing_status === "MFS") && spouse_itemized) {
			this.lines["08"].value = this.line("04");
		} else {
			this.lines["05"].value	= 0;	// Get base standard deduction
			this.lines["06"].value	= 0;	// Get extra standard deduction
			this.lines["07"].value	= tt.getStandardDeduction(tp.filing_status,
											tp.taxpayers_age, tp.spouses_age,
											tp.is_taxpayer_blind, tp.is_spouse_blind);
			if (this.line("07") < this.line("04")) {
				// Itemized deductions - standard deduction
				this.lines["08"].value	= this.subtract("04", "07");
			} else {
				this.explanation = "Itemized deductions were less than " +
					"the standard deduction. The taxpayer could have used the " +
					"standard deduction.";
				return;
			}
		}

		// Itemized deductions - standard deduction < taxable part of refund?
		if (this.line("08") < this.line("03")) {	
			this.lines["09"].value = this.line("08");
			this.explanation = "Taxable part of refund was greater than " +
				"the difference between itemized and standard deductions, so " +
				"taxable amount is limited to that difference.";
		} else {
			this.lines["09"].value = this.line("03");
			// Line =_3 explanation was set above.
		}

		this.taxable_amount = this.line("09")
		Debug.exit("Refund.calculate()");
		return;
	}
}
