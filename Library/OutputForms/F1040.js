

// Classes
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";

import { F1040_HTML }	from "../OutputForms/F1040_HTML.js";
import { IncTax }		from "../Worksheets/IncTax.js";
import { SSTax }		from "../Worksheets/SSTax.js";

// Modules
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxInfo }		from "../Modules/TaxInfo.js";
import { TaxTable }		from "../Modules/TaxTable.js";

export class F1040 extends TaxForm {
	constructor(formname) {
		Debug.enter("F1040.Constructor()");
		super(formname);
		this.title	= `1040 - Individual Income Tax Return`;
		this.sstax	= TaxFormObj.createForm("SSTax");
		this.inctax	= TaxFormObj.createForm("IncTax");

		// Variables for external input. This variable is be used to enter information
		// that does not come from another tax form.
		this.estimated_payments	= 0;

		// Create the lines on the form.
		let field_info = F1040_HTML.getFieldInfo();
		for (const field_name of Object.keys(field_info)) {
			if (field_info[field_name][1]) {
				this.lines[field_name]= new Line(field_info[field_name][2]);
			}
		}

		Debug.exit("F1040.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F1040.calculate()");
		this.calculated = true;

		// Abbreviations
		const tt = TaxTable.getTaxTable();
		const tp = Taxpayer.getTaxpayer();
		const getValue = TaxFormObj.getValue;

		this.sstax.resetCalculation();
		this.inctax.resetCalculation();

		this.lines["01a"].value	= getValue("W2", "01");	// Wages
		this.lines["01b"].value	= 0;					// Household ages
		this.lines["01c"].value	= 0;					// Tip Income
		this.lines["01d"].value	= 0;					// MWP
		this.lines["01e"].value	= getValue("F2441", "26");	// Dep Care Benefits
		this.lines["01f"].value	= getValue("F8839", "31");	// Adoption Benefits
		this.lines["01g"].value	= getValue("F8919", "06");	// Wages from f8919
		this.lines["01h"].value	= 0;					// Other Earned Inc
		this.lines["01i"].value	= 0;					// Nontaxed Combat
		this.lines["01z"].value	= this.add("01a","01b","01c","01d","01e","01f","01g","01h");
		this.lines["02a"].value	=						// Tax exempt interest =
			getValue("F1099INT",	"08") +				// Tax-exempt interest
			getValue("F1099OID",	"11") +				// Tax-exempt OID
			getValue("F1099DIV",	"12");				// Tax-exempt interest dividends
		this.lines["02b"].value	=						// Taxable interest
			getValue("F1099INT",	"01") +				// Interest income
			getValue("F1099INT",	"03") +				// Interest on US treasuries
			getValue("F1099OID",	"01") +				// Original issue discount
			getValue("F1099OID",	"02") +				// OID - other periodic interest
			getValue("F1099OID",	"06");				// OID - acquisition premium
		this.lines["03a"].value	= getValue("F1099DIV", "01b");	// Qualified Dividends
		this.lines["03b"].value	= getValue("F1099DIV", "01a");	// Ordinary Dividends
		this.lines["04a"].value	= TaxInfo.getIRAValue("01");	// Total IRA Distributions
		this.lines["04b"].value	=
			TaxInfo.getIRAValue("02a") +				// Taxable IRA Distributions
			getValue("F8606",	"15c") +
			getValue("F8606",	"18") +
			getValue("F8606",	"25c");
		this.lines["05a"].value	= TaxInfo.getPensionValue("01");	// Total Pension
		this.lines["05b"].value	= TaxInfo.getPensionValue("02a");	// Taxable Pension
		this.lines["06a"].value	= getValue("SSA1099",	"05");		// Total SS Benefits

		// this.lines["06b"].value	= 0;  // DELAY INITIALIZATION UNTIL LATER

		// Capital gains
		this.lines["07a"].value	=
			getValue("F1099DIV", "02a") +
			Math.max(0, getValue("F1040SD", "16")) +			// One of these is 0
			getValue("F1040SD", "21");							// One of these is 0
		this.lines["08"].value	= getValue("F1040S1",	"10");	// Other Income

		// Reorder fields for dependency. Taxable SS, which is on 1040 line 6b, depends
		// on 1040 lines 1z, 2a, 2b, 3b, 4b, 5b, 6a, 7, 8, and 10. And, 1040 line 9
		// depends on Taxable SS.
		this.lines["10"].value	= getValue("F1040S1", "26");	// Adjustments to Income
		this.lines["06b"].value	= this.sstax.calculate();		// Taxable SS

		// Resume normal order
		// Total Income
		this.lines["09"].value	= this.add("01z","02b","03b","04b","05b","06b","07a","08");
		this.lines["11a"].value	= this.subtract("09", "10");	// AGI
		this.lines["11b"].value	= this.line("11a");				// AGI
		this.lines["12e"].value	= Math.max(tt.getStandardDeduction(),
										   getValue("F1040SA", "17"));
		this.lines["13a"].value	= getValue("F8995", "15");		// QBI Deduction
		this.lines["13b"].value	= getValue("F1040S1A", "38");	// Additional Deducts
		this.lines["14"].value	= this.add("12e","13a","13b");	// Total Deductions
		this.lines["15"].value	= Math.max(0, this.subtract("11b", "14"));	// Taxable Income
		this.lines["16"].value	= this.inctax.calculate();		// Income Tax
		this.lines["17"].value	= getValue("F1040S2", "03");	// Additional Tax
		this.lines["18"].value	= this.add("16", "17");			// Total Tax
		this.lines["19"].value	= getValue("F8812", "14");		// Child Tax Credit
		this.lines["20"].value	= getValue("F1040S3", "08");	// Non-refund Credits
		this.lines["21"].value	= this.add("19", "20");
		this.lines["22"].value	= Math.max(0, this.subtract("18", "21"));	// Tax - Credits
		this.lines["23"].value	= getValue("F1040S2", "21");	// Other Taxes
		this.lines["24"].value	= this.add("22", "23");			// Total Tax
		this.lines["25a"].value	= getValue("W2", "02");			// W2 Withholding
		this.lines["25b"].value	=								// 1099 Withholding
			getValue("F1099INT", "04") +
			getValue("F1099DIV", "04") +
			getValue("F1099G", "04") +
			getValue("F1099K", "04") +
			getValue("F1099MISC", "04") +
			getValue("F1099NEC", "04") +
			getValue("F1099OID", "04") +
			getValue("F1099R", "04") +
			getValue("SSA1099", "06");
		this.lines["25c"].value	= getValue("F8959", "24");			// Other withholding
		this.lines["25d"].value	= this.add("25a", "25b", "25c");	// Total Withholding
		this.lines["26"].value	= this.estimated_payments;			// Estimated payments
		this.lines["27a"].value	= getValue("EIC", "xx");			// EIC
		this.lines["28"].value	= getValue("F8812", "27");			// Additional CTC
		this.lines["29"].value	= getValue("F8863", "08");			// Amer Opp Cred
		this.lines["30"].value	= getValue("F8839", "13");			// Refund Adopt Credit
		this.lines["31"].value	= getValue("F1040S3", "15");		// Other Refund Credits
		this.lines["32"].value	= this.add("27a","28","29","30","31");	// Estimated Payments
		this.lines["33"].value	= this.add("25d","26","32");		// Total Payments
		if (this.line("33") > this.line("24")) {
			this.lines["34"].value	= this.subtract("33", "24");	// Overpaid
			this.lines["35a"].value	= this.subtract("34", "36");	// Refund
			this.lines["36"].value	= 0;							// Apply to next year
		} else {
			this.lines["37"].value	= this.subtract("24", "33");	// Amount Owed
			this.lines["38"].value	= getValue("Penalty", "xx");	// EstTax Penalty
		}
		Debug.exit("F1040.calculate()");
	}
}
