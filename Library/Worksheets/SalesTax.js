
//
// This worksheet calculates the State and Local General Sales Tax Deduction Worksheet
// from the Instructions for Schedule A, line 5a, page 6.
//
import { Debug }		from "../Classes/Debug.js";
import { Line }			from "../Classes/Line.js";
import { Num }			from "../Classes/Num.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Classes/TaxFormObj.js";
import { TaxTable }		from "../Classes/TaxTable.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";

export class SalesTax extends TaxForm {
	constructor(formname) {
		Debug.enter("SalesTax.Constructor()");
		super(formname);

		// This field can be used to enter information that does not come from another
		// tax form.
		this.family_size	= 0;

		this.lines["01"]	= new Line("Sales Tax from Table");
		this.lines["02"]	= new Line("Not used in California");
		this.lines["03"]	= new Line("Local Sales Tax");
		this.lines["04"]	= new Line("State Sales Tax Rate");
		this.lines["05"]	= new Line("Line 3 / 4");
		this.lines["06"]	= new Line("Line 1 * 5");
		this.lines["07"]	= new Line("Sales Tax on Large Sales");
		this.lines["08"]	= new Line("Sales Tax Deduction");

		Debug.exit("SalesTax.Constructor()");
	}

	calculate(total_sales_tax = 0) {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("SalesTax.calculate()");
		this.calculated = true;
		const tt = TaxTable.getTaxTable();
		const tp = Taxpayer.getTaxpayer();

		let family_size = this.family_size;
		if (family_size == 0) {
			family_size = tp.familySize();
		}
		family_size = Num.limit(family_size, 1, 6);

		const spendable_income =
			TaxFormObj.getValue("F1040",	"01z") +	// wages
			TaxFormObj.getValue("F1040",	"02a") +	// tax exempt interest
			TaxFormObj.getValue("F1040",	"02b") +	// taxable interest
			TaxFormObj.getValue("F1040",	"03a") +	// qualified dividends
			TaxFormObj.getValue("F1040",	"03b") +	// ordinary dividends
			TaxFormObj.getValue("F1040",	"04a") +	// retirement accounts
			TaxFormObj.getValue("F1040",	"06a") +	// social security
			TaxFormObj.getValue("F1040",	"07a") +	// capital gains
			TaxFormObj.getValue("F1040",	"08");		// SE income + other income

		const base_sales_tax	= tt.getTaxValue("CA_BaseSalesTax");
		let local_sales_tax		= 0;
		if (total_sales_tax > 0) {
			local_sales_tax = Math.max(0, total_sales_tax - base_sales_tax);
		}

		this.lines["01"].value	= tt.getSalesTaxDeduction(spendable_income, family_size);
		this.lines["02"].value	= 0;	// 0 for California
		if (local_sales_tax === 0) {
			this.lines["06"].value = 0;
		} else {
			this.lines["03"].value	= local_sales_tax;
			if (this.line("02") === 0) {
				this.lines["04"].value	= base_sales_tax;
				const num = this.line("03") / this.line("04");
				// Round to 3 decimal places.
				this.lines["05"].value	= Math.round(num * 1000) / 1000;
				this.lines["06"].value	= Math.round(this.line("01") * this.line("05"));
			} else {
				this.lines["06"].value = this.line("02") * this.line("03");
			}
		}
		this.lines["07"].value	= 0;
		this.lines["08"].value	= Math.round(this.add("01","06","07"));

		Debug.exit("SalesTax.calculate()");
		return this.line("08");
	}
}
