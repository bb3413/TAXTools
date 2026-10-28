
// Classes
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { F1099G_HTML }	from "../InputForms/F1099G_HTML.js";
import { Refund }		from "../Worksheets/Refund.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";

// Modules
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";

export class F1099G extends TaxForm {
	constructor(formname) {
		Debug.enter("F1099G.Constructor()");
		super(formname);
		this.title	= `1099-G - Certain Government Payments`;
		this.refund	= TaxFormObj.createForm("Refund");

		// Variables for external input. These variables can be used to enter information
		// that does not come from another tax form.
		this.prev_5d			= 0;
		this.prev_5e			= 0;
		this.prev_itemized		= 0;

		// Create the lines on the form.
		let field_info = F1099G_HTML.getFieldInfo();
		for (const field_name of Object.keys(field_info)) {
			if (field_info[field_name][1]) {
				this.lines[field_name]= new Line(field_info[field_name][2]);
			}
		}

		Debug.exit("F1099G.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			return;
		}

		Debug.enter("F1099G.calculate()");

		this.calculated = true;
		this.refund.resetCalculation();

		if (this.line("02")) {
			const tt = TaxTable.getTaxTable();		// Save current value
			const tp = Taxpayer.getTaxpayer();		// Save current value

			TaxTable.getTaxTable(tt.tax_year-1);	// Set tax tables to previous year.
			const prev_tp			= tp.clone();	// Shallow copy
			prev_tp.taxpayers_age	= tp.taxpayers_age - 1;
			prev_tp.spouses_age		= tp.spouses_age - 1;
			Taxpayer.setTaxpayer(prev_tp);

			this.refund.sched_a_5d				= this.prev_5d;
			this.refund.sched_a_5e				= this.prev_5e;
			this.refund.itemized_deductions		= this.prev_itemized;
			this.refund.refund					= this.line("02");
			this.refund.calculate();

			Taxpayer.setTaxpayer(tp);
			TaxTable.setTaxTable(tt);

		}

		Debug.exit("F1099G.calculate()");
	}
}
