
//
// California AGI Limitations Worksheet to limit exemptions for high incomes from the
// Instructions for Form 540 California Resideny Income tax return, page 17.
//
import { Debug }		from "../Modules/Debug.js";
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";

export class CA_HiIncExemptions extends TaxForm {
	constructor(formname) {
		Debug.enter("CA_HiIncExemptions.Constructor()");
		super(formname);

		this.lines["0a"]	= new Line("Federal AGI");
		this.lines["0b"]	= new Line("Exemption Phseout");
		this.lines["0c"]	= new Line("");
		this.lines["0d"]	= new Line("");
		this.lines["0e"]	= new Line("");
		this.lines["0f"]	= new Line("Number of Personal Exemptions");
		this.lines["0g"]	= new Line("");
		this.lines["0h"]	= new Line("Amount of Personal Exemptions");
		this.lines["0i"]	= new Line("");
		this.lines["0j"]	= new Line("Number of Dependent Exemptions");
		this.lines["0k"]	= new Line("");
		this.lines["0l"]	= new Line("Amount of Dependent Exemptions");
		this.lines["0m"]	= new Line("");
		this.lines["0n"]	= new Line("");
		this.lines["exemptions"]	= new Line("exemptions");

		Debug.exit("CA_HiIncExemptions.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("CA_HiIncExemptions.calculate()");
		this.calculated = true;
		const tt = TaxTable.getTaxTable();
		const tp = Taxpayer.getTaxpayer();
		const personal_exemption =
			tt.getTaxValue("CA_PersonalExemption", tp.filing_status);
		const dependent_exemption =
			tt.getTaxValue("CA_DependentExemption", tp.filing_status);

		this.lines["0a"].value	= TaxFormObj.getValue("F540", "13");	// Federal AGI
		this.lines["0b"].value	= tt.getTaxValue("CA_HiIncPhaseout", tp.filing_status);
		this.lines["0c"].value	= this.subtract("0a", "0b");
		if (tp.filing_status === "MFJ") {
			this.lines["0d"].value	= this.line("0c") / 2500;
		} else {
			this.lines["0d"].value	= this.line("0c") / 1250;
		}
		this.lines["0d"].value	= Math.round(this.line("d"));
		this.lines["0e"].value	= this.line("0d") * 6;
		this.lines["0f"].value	= (TaxFormObj.getValue("F540", "07") +	// Num of Exemptions
									TaxFormObj.getValue("F540", "08") +
									TaxFormObj.getValue("F540", "09")) / personal_exemption;
		this.lines["0g"].value	= this.line("0e") * this.line("0f");
		this.lines["0h"].value	= TaxFormObj.getValue("F540", "07") +	// Amt of Exemptions
									TaxFormObj.getValue("F540", "08") +
									TaxFormObj.getValue("F540", "09");
		this.lines["0i"].value	= Math.max(0, this.subtract("0h", "0g"));
		// Number of Personal Exemptions
		this.lines["0j"].value	= TaxFormObj.getValue("F540", "10") / dependent_exemption;
		this.lines["0k"].value	= this.line("0e") * this.line("0j");
		this.lines["0l"].value	= TaxFormObj.getValue("F540", "10"); 	// Amt of Exemptions
		this.lines["0m"].value	= Math.max(0, this.subtract("0l", "0k"));
		this.lines["0n"].value	= this.add("0i", "0m");

		this.lines["exemptions"]= this.line("0n");
		Debug.exit("CA_HiIncExemptions.calculate()");
	}
}
