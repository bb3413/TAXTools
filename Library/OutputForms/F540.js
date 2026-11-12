
import { SINGLE, HOH, MFJ, QSS, MFS } from "../TAXTools/TAXTools.js";

import { Debug }				from "../Modules/Debug.js";
import { Ensure }				from "../Modules/Ensure.js";
import { Line }					from "../Classes/Line.js";
import { TaxForm }				from "../Classes/TaxForm.js";
import { TaxFormObj }			from "../Modules/TaxFormObj.js";
import { TaxInfo }				from "../Modules/TaxInfo.js";
import { TaxTable }				from "../Modules/TaxTable.js";
import { Taxpayer }				from "../Classes/Taxpayer.js";
import { CA_HiIncExemptions }	from "../Worksheets/CA_HiIncExemptions.js";
import { F540_HTML }			from "../OutputForms/F540_HTML.js";

export class F540 extends TaxForm {
	constructor(formname) {
		Debug.enter("F540.Constructor()");
		super(formname);
		this.title = `540 - California Resident Income Tax Return`;

		// Create the lines on the form.
		let field_info = F540_HTML.getFieldInfo();
		for (const field_name of Object.keys(field_info)) {
			if (field_info[field_name][1]) {
				this.lines[field_name]= new Line(field_info[field_name][2]);
			}
		}

		Debug.exit("F540.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F540.calculate()");
		this.calculated = true;
		const tt = TaxTable.getTaxTable();
		const tp = Taxpayer.getTaxpayer();
		const personal_exemption =	tt.getTaxValue("CA_PersonalExemption");
		const dependent_exemption =	tt.getTaxValue("CA_DependentExemption");

		// Filing Status
		this.lines["001"].value	= false;	// SINGLE
		this.lines["002"].value	= false;	// MFJ
		this.lines["003"].value	= false;	// MFS
		this.lines["004"].value	= false;	// HOH
		this.lines["005"].value	= false;	// QSS
		if (tp.filing_status === SINGLE) {
			this.lines["001"].value	= true;
		} else if (tp.filing_status === MFJ) {
			this.lines["002"].value	= true;
		} else if (tp.filing_status === MFS) {
			this.lines["003"].value	= true;
		} else if (tp.filing_status === HOH) {
			this.lines["004"].value	= true;
		} else if (tp.filing_status === QSS) {
			this.lines["005"].value	= true;
		}

		// Can Be a Dependent
		this.lines["006"].value	= false;

		// Personal Exemption
		this.lines["007"].value	= personal_exemption;
		if ((tp.filing_status === MFJ) || (tp.filing_status === QSS)) {
			this.lines["007"].value += personal_exemption;
		}

		// Blind Exemption
		this.lines["008"].value	= 0;
		if (tp.is_taxpayer_blind) {
			this.lines["008"].value += personal_exemption;
		}
		if ((tp.filing_status === MFJ) && tp.is_spouse_blind) {
			this.lines["008"].value += personal_exemption;
		}

		// Senior Exemption
		this.lines["009"].value	= 0;
		if (tp.taxpayers_age >= 65) {
			this.lines["009"].value += personal_exemption;
		}
		if ((tp.filing_status === MFJ) && tp.spouses_age >= 65) {
			this.lines["009"].value += personal_exemption;
		}

		// Dependents Exemption
		this.lines["010"].value	= tp.number_of_dependents * dependent_exemption;
		this.lines["011"].value	= this.add("007", "008", "009", "010");	// Total Exemptions

		// Taxable Income
		this.lines["012"].value	= TaxFormObj.getValue("W2", "16");		// State Wages
		this.lines["013"].value	= TaxFormObj.getValue("F1040", "11b");	// Federal AGI
		this.lines["014"].value	= TaxFormObj.getValue("F540CA", "C-27B");	// Subtractions
		this.lines["015"].value	= this.subtract("013", "014");			// AGI - Subtractions
		this.lines["016"].value	= TaxFormObj.getValue("F540CA", "C-27C");	// Additions
		this.lines["017"].value	= this.add("015", "016");				// AGI + Additions
		this.lines["018"].value	= TaxFormObj.getValue("F540CA", "D-30");	// Deductions
		this.lines["019"].value	= Math.max(0, this.subtract("017", "018"));	// Taxable Income

		// Tax
		this.lines["031"].value	= tt.get_CA_IncomeTax(this.line("019"));
		if (this.line("013") > tt.getTaxValue("CA_HiIncPhaseout")) {
			this.lines["032"].value =
				new CA_HiIncExemptions("CA_HiIncExemptions").line("exemptions");
		} else {
			this.lines["032"].value = this.line("011");					// Exemptions
		}

		this.lines["033"].value	= Math.max(0, this.subtract("031", "032"));// Tax - Exempts
		this.lines["034"].value	= 0;									// From Form 5870A
		this.lines["035"].value	= this.add("033", "034");				// Total Tax
		this.lines["040"].value	= 0;									// Child Care Credit
		this.lines["043"].value	= 0;									// Other Credit
		this.lines["044"].value	= 0;									// Other Credit
		this.lines["045"].value	= 0;									// Other Credit
		this.lines["046"].value	= 0;									// Renter's Credit
		if (tp.rents_home) {
			this.lines["046"].value	= tt.getTaxValue("CA_RentersCredit");
		}
		// Total Special Credits
		this.lines["047"].value	= this.add("040","043","044","045","046");
		this.lines["048"].value	= Math.max(0, this.subtract("035", "047"));	// Updated Tax

		// Other taxes
		this.lines["061"].value	= 0;									// AMT
		this.lines["062"].value	= 0;									// Mental Health Tax
		this.lines["063"].value	= 0;									// Recapture
		this.lines["064"].value	= this.add("048","061","062","063");	// Total Tax

		// Payments
		this.lines["071"].value	= TaxInfo.getStateWithholding();		// Withholding
		this.lines["072"].value	= 0;	// Estimated Payments - set by TaxProgram
		this.lines["073"].value	= 0;									// Withholding
		this.lines["074"].value	= 0;									// Excess SDI or VPDI
		this.lines["075"].value	= 0;									// EITC
		this.lines["076"].value	= 0;									// Young Child Tax
		this.lines["077"].value	= 0;									// Foster Youth Tax
		this.lines["078"].value	= this.add("071","072","073","074",
										   "075","076","077");			// Total Payments

		// Use Tax
		this.lines["091"].value	= 0;									// Use tax

		// ISR Penalty
		this.lines["092"].value	= 0;									// Individual SRP

		// Overpaid Tax / Tax Due
		this.lines["093"].value	= 0;									// Payments Balance
		if (this.line("078") > this.line("091")) {
			this.lines["093"].value = this.subtract("078", "091");		// Payments Balance
		}
		this.lines["094"].value	= 0;									// Use Tax Balance
		if (this.line("091") > this.line("078")) {
			this.lines["094"].value = this.subtract("091", "078");		// Use Tax Balance
		}
		this.lines["095"].value	= 0;									// Payments - ISRP
		if (this.line("093") > this.line("092")) {
			this.lines["095"].value = this.subtract("093", "092");		// Payments - ISRP
		}
		this.lines["096"].value	= 0;									// ISRP Balance
		if (this.line("092") > this.line("093")) {
			this.lines["096"].value = this.subtract("092", "093");		// ISRP Balance
		}
		this.lines["097"].value	= 0;									// Overpaid Tax
		if (this.line("095") > this.line("064")) {
			this.lines["097"].value = this.subtract("095", "064");		// Overpaid Tax
		}
		this.lines["098"].value	= 0;									// Apply to Next Year
		this.lines["099"].value	= this.subtract("097","098");			// Overpaid
		this.lines["100"].value	= 0;									// Tax Due
		if (this.line("095") < this.line("064")) {
			this.lines["100"].value = this.subtract("064", "095");		// Tax Due
		}

		// Contributions
		this.lines["110"].value	= 0;									// Total Contributions

		// Amount You Owe
		this.lines["111"].value	= 0;									// Amount You Owe
		if (this.line("099") === 0) {
			this.lines["111"].value = this.add("094","096","100","110");
		}

		// Interest and Penalties
		this.lines["112"].value	= 0;						// Interest and Penalties
		this.lines["113"].value	= 0;						// Underpayment of Estimated Tax
		this.lines["114"].value	= this.add("111","112","113");			// Amount Due

		// Refund
		this.lines["115"].value	= this.line("099") - this.add("110","112","113");	// Refund

		Debug.exit("F540.calculate()");
	}
}
