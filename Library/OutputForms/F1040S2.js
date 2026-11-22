
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { F1040S2_HTML }	from "../OutputForms/F1040S2_HTML.js";

export class F1040S2 extends TaxForm {
	constructor(formname) {
		Debug.enter("F1040S2.Constructor()");
		super(formname);
		this.title = `Schedule 2 - Additional Taxes`;

		// Create the lines on the form.
		let field_info = F1040S2_HTML.getFieldInfo();
		for (const field_name of Object.keys(field_info)) {
			if (field_info[field_name][1]) {
				this.lines[field_name]= new Line(field_info[field_name][2]);
			}
		}

		Debug.exit("F1040S2.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F1040S2.calculate()");
		this.calculated = true;

		// Tax
		this.lines["01a"].value	= TaxFormObj.getValue("F8962", "xx");	// Repayment of PTC
		this.lines["01b"].value	= 0;	// Repayment of New Clean Vehicle Credit
		this.lines["01c"].value	= 0;	// Repayment of Used Clean Vehicle Credit
		this.lines["01d"].value	= 0;	// Repayment of EPE
		this.lines["01e"].value	= 0;	// Excess net EPE
		this.lines["01f"].value	= 0;	// 20% of EP from Form 4255
		this.lines["01y"].value	= 0;	// Other Tax
		// Total additions to Tax
		this.lines["01z"].value	= this.add("01a","01b","01c","01d","01e","01f","01y");
		this.lines["02"].value	= TaxFormObj.getValue("F6251", "11");	// AMT
		this.lines["03"].value	= this.add("01z", "02");			// Total Extra Tax

		// Other Taxes
		this.lines["04"].value	= TaxFormObj.getValue("F1040SSE", "12");	// SE Tax
		this.lines["05"].value	= 0;	// SS Tax on Unreported Income
		this.lines["06"].value	= 0;	// SS Tax Not Collected on Wages
		this.lines["07"].value	= 0;	// Total Additional SS Tax
		this.lines["08"].value	= 0;	// Additional Tax on IRAs
		this.lines["09"].value	= 0;	// Household Employment Tax
		this.lines["10"].value	= 0;	// Reserved for Future Use
		this.lines["11"].value	= TaxFormObj.getValue("F8959", "18");	// Medicare
		this.lines["12"].value	= TaxFormObj.getValue("F8960", "17");	// Investment Tax
		this.lines["13"].value	= 0;	// Uncollected SS Tax on Tips
		this.lines["14"].value	= 0;	// Interest on Tax Due
		this.lines["15"].value	= 0;	// Interest on Deferred Tax
		this.lines["16"].value	= 0;	// Repayment of Low-income Housing Credit
		this.lines["17a"].value	= 0;	// Other Additional Taxes
		this.lines["17b"].value	= 0;	// Repayment of Other Credits
		this.lines["17c"].value	= TaxFormObj.getValue("F8889", "17b");	// Tax on HSA
		this.lines["17d"].value	= TaxFormObj.getValue("F8889", "21");	// Tax on HSA
		this.lines["17e"].value	= 0;	// Additional Tax on Archer MSA Distributions
		this.lines["17f"].value	= 0;	// Additional Tax on Advantage MSA Distributions
		this.lines["17g"].value	= 0;	// Repayment of Charitable Contribution Deduction
		this.lines["17h"].value	= 0;	// Income from Non-qualified 409A Plan
		this.lines["17i"].value	= 0;	// Income from Non-qualified 457A Plan
		this.lines["17j"].value	= 0;	// Section 72(m) Excess
		this.lines["17k"].value	= 0;	// Golden Parachute Payments
		this.lines["17l"].value	= 0;	// Tax on Accumulation Distribution of Trusts
		this.lines["17m"].value	= 0;	// Excess Tax on Stock Compensation
		this.lines["17n"].value	= 0;	// Look Back Interest
		this.lines["17o"].value	= 0;	// Tax on Non-resident Income
		this.lines["17p"].value	= TaxFormObj.getValue("F8621", "16f");	// Interest
		this.lines["17q"].value	= TaxFormObj.getValue("F8621", "24");	// Interest
		this.lines["17z"].value	= 0;	// Other Taxes
		this.lines["18"].value	= this.add("17a","17b","17c","17d","17e",
										   "17f","17g","17h","17i","17j",
										   "17k","17l","17m","17n","17o",
										   "17p","17q","17z");	// Total Additional Taxes
		this.lines["19"].value	= 0;	// Repayment of EPE from Form 4255
		this.lines["20"].value	= 0;	// Tax from Form 965-A
		this.lines["21"].value	= this.add("04","07","16","18","19");	// Total Other Taxes

		Debug.exit("F1040S2.calculate()");
	}
}
