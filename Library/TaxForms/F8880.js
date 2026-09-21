
import { Debug }		from "../Modules/Debug.js";
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";

export class F8880 extends TaxForm {
	constructor(formname) {
		Debug.enter("F8880.Constructor()");
		super(formname);
		this.title = `Form 8880 - Credit for Qualified Retirement Savings Contributions`;

		this.lines["01a"]	= new Line("Traditional and Roth IRA contributions");
		this.lines["01b"]	= new Line("Traditional and Roth IRA contributions");
		this.lines["02a"]	= new Line("Elective deferrals to a 401(k), employer plan");
		this.lines["02b"]	= new Line("Elective deferrals to a 401(k), employer plan");
		this.lines["03a"]	= new Line("Add lines 1 and 2");
		this.lines["03b"]	= new Line("Add lines 1 and 2");
		this.lines["04a"]	= new Line("Certain distributions received after 2022");
		this.lines["04b"]	= new Line("Certain distributions received after 2022");
		this.lines["05a"]	= new Line("Subtract line 4 from line 3");
		this.lines["05b"]	= new Line("Subtract line 4 from line 3");
		this.lines["06a"]	= new Line("Enter smaller of line 5 or $2,000");
		this.lines["06b"]	= new Line("Enter smaller of line 5 or $2,000");
		this.lines["07"]	= new Line("Add the amounts on line 6");
		this.lines["08"]	= new Line("Enter the amount from Form 1040, line 11a");
		this.lines["09"]	= new Line("Enter amount from the table");
		this.lines["10"]	= new Line("Multiply line 7 by line 9");
		this.lines["11"]	= new Line("Limitation based on tax liability");
		this.lines["12"]	= new Line("Credit for retirement savings contributions");
		this.lines["ws1"]	= new Line("Total tax");
		this.lines["ws2"]	= new Line("Some credits from Schedule 3");
		this.lines["ws3"]	= new Line("ws1 - ws2");

		Debug.exit("F8880.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F8880.calculate()");
		this.calculated = true;
		const tt = TaxTable.getTaxTable();
		const tp = Taxpayer.getTaxpayer();

		this.lines["01a"].value		= 0;
		this.lines["01b"].value		= 0;
		this.lines["02a"].value		= TaxFormObj.getTaxpayerRetirementContributions();
		this.lines["02b"].value		= TaxFormObj.getSpouseRetirementContributions();
		this.lines["03a"].value		= this.add("01a","02a");
		this.lines["03b"].value		= this.add("01b","02b");
		this.lines["04a"].value		= 0;
		this.lines["04b"].value		= 0;
		this.lines["05a"].value		= Math.max(0, this.subtract("03a", "04a"));
		this.lines["05b"].value		= Math.max(0, this.subtract("03b", "04b"));
		this.lines["06a"].value		= Math.min(2000, this.line("05a"));
		this.lines["06b"].value		= Math.min(2000, this.line("05b"));
		this.lines["07"].value		= this.add("06a","06b");
		if (this.line("07") > 0) {
			this.lines["08"].value	= TaxFormObj.getValue("F1040", "11b");	// AGI
			this.lines["09"].value	= tt.getRetirementSavingsPhaseOut(this.line("08"));
			this.lines["10"].value	= this.line("07") * this.line("09");
			this.lines["11"].value	= this._creditLimitWorksheet();
			this.lines["12"].value	= Math.min(this.line("10"), this.line("11"));
		}

		Debug.exit("F8880.calculate()");
	}

	_creditLimitWorksheet() {
		this.lines["ws1"].value =
			TaxFormObj.getValue("F1040", "18");		// Total Tax
		this.lines["ws2"].value =
			TaxFormObj.getValue("F1040S3", "01") +	// Foreign Tax Credit
			TaxFormObj.getValue("F1040S3", "02") +	// Child and Dependent Care Credit
			TaxFormObj.getValue("F1040S3", "03") +	// Education Credit
			TaxFormObj.getValue("F1040S3", "06d") +	// Credit for Elderly or Disabled
			TaxFormObj.getValue("F1040S3", "06e") +	// Reserved for Future Use
			TaxFormObj.getValue("F1040S3", "06f") +	// Clean Vehicle Credit
			TaxFormObj.getValue("F1040S3", "06g") +	// Mortgage Interest Credit
			TaxFormObj.getValue("F1040S3", "06h") +	// DC Homebuyer Credit
			TaxFormObj.getValue("F1040S3", "06i");	// EV Credit
		this.lines["ws3"].value = this.subtract("ws1", "ws2");
		
		return this.line("ws3");
	}
}
