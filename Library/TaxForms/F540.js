
import { Debug }				from "../Modules/Debug.js";
import { Line }					from "../Classes/Line.js";
import { TaxForm }				from "../Classes/TaxForm.js";
import { TaxFormObj }			from "../Modules/TaxFormObj.js";
import { TaxTable }				from "../Modules/TaxTable.js";
import { Taxpayer }				from "../Classes/Taxpayer.js";
import { CA_HiIncExemptions }	from "../Worksheets/CA_HiIncExemptions.js";

export class F540 extends TaxForm {
	constructor(formname) {
		Debug.enter("F540.Constructor()");
		super(formname);
		this.title = `540 - California Resident Income Tax Return`;

		// Filing Status
		this.lines["001"]	= new Line("Single");
		this.lines["002"]	= new Line("MFJ");
		this.lines["003"]	= new Line("MFS");
		this.lines["004"]	= new Line("HoH");
		this.lines["005"]	= new Line("QSS");
		this.lines["006"]	= new Line("Can Be a Dependent");

		// Exemptions
		this.lines["007"]	= new Line("Personal Exemption");
		this.lines["008"]	= new Line("Blind Exemption");
		this.lines["009"]	= new Line("Senior Exemption");
		this.lines["010"]	= new Line("Dependents Exemption");
		this.lines["011"]	= new Line("Total Exemptions");

		// Taxable Income
		this.lines["012"]	= new Line("Wages");
		this.lines["013"]	= new Line("Federal AGI");
		this.lines["014"]	= new Line("CA Adjustments - Subtractions");
		this.lines["015"]	= new Line("AGI - Subtractions");
		this.lines["016"]	= new Line("CA Adjustments - Additions");
		this.lines["017"]	= new Line("AGI + Additions = CA AGI");
		this.lines["018"]	= new Line("Deductions");
		this.lines["019"]	= new Line("Taxable Income");
		this.lines["020"]	= new Line("Reserved");
		this.lines["021"]	= new Line("Reserved");
		this.lines["022"]	= new Line("Reserved");
		this.lines["023"]	= new Line("Reserved");
		this.lines["024"]	= new Line("Reserved");
		this.lines["025"]	= new Line("Reserved");
		this.lines["026"]	= new Line("Reserved");
		this.lines["027"]	= new Line("Reserved");
		this.lines["028"]	= new Line("Reserved");
		this.lines["029"]	= new Line("Reserved");
		this.lines["030"]	= new Line("Reserved");

		// Tax
		this.lines["031"]	= new Line("Tax");
		this.lines["032"]	= new Line("Exemptions");
		this.lines["033"]	= new Line("Tax - Exemptions");
		this.lines["034"]	= new Line("Tax from Schedule G1, Form 5870A");
		this.lines["035"]	= new Line("Total Tax");
		this.lines["036"]	= new Line("Reserved");
		this.lines["037"]	= new Line("Reserved");
		this.lines["038"]	= new Line("Reserved");
		this.lines["039"]	= new Line("Reserved");
		this.lines["040"]	= new Line("Child and Dependent Care Credit");
		this.lines["041"]	= new Line("Reserved");
		this.lines["042"]	= new Line("Reserved");
		this.lines["043"]	= new Line("Other Credit");
		this.lines["044"]	= new Line("Other Credit");
		this.lines["045"]	= new Line("Other Credit");
		this.lines["046"]	= new Line("Renter's Credit");
		this.lines["047"]	= new Line("Total Special Credits");
		this.lines["048"]	= new Line("Updated Tax");
		this.lines["049"]	= new Line("Reserved");
		this.lines["050"]	= new Line("Reserved");
		this.lines["051"]	= new Line("Reserved");
		this.lines["052"]	= new Line("Reserved");
		this.lines["053"]	= new Line("Reserved");
		this.lines["054"]	= new Line("Reserved");
		this.lines["055"]	= new Line("Reserved");
		this.lines["056"]	= new Line("Reserved");
		this.lines["057"]	= new Line("Reserved");
		this.lines["058"]	= new Line("Reserved");
		this.lines["059"]	= new Line("Reserved");
		this.lines["060"]	= new Line("Reserved");

		// Other taxes
		this.lines["061"]	= new Line("AMT");
		this.lines["062"]	= new Line("Mental Health Tax");
		this.lines["063"]	= new Line("Tax and Credit Recapture");
		this.lines["064"]	= new Line("Total Tax");
		this.lines["065"]	= new Line("Reserved");
		this.lines["066"]	= new Line("Reserved");
		this.lines["067"]	= new Line("Reserved");
		this.lines["068"]	= new Line("Reserved");
		this.lines["069"]	= new Line("Reserved");
		this.lines["070"]	= new Line("Reserved");

		// Payments
		this.lines["071"]	= new Line("Withholding");
		this.lines["072"]	= new Line("Estimated Tax Payments");
		this.lines["073"]	= new Line("Withholding from Forms 592-B and 593");
		this.lines["074"]	= new Line("Excess SDI or VPDI");
		this.lines["075"]	= new Line("Earned Income Tax Credit");
		this.lines["076"]	= new Line("Young Child Tax Credit");
		this.lines["077"]	= new Line("Foster Youth Tax Credit");
		this.lines["078"]	= new Line("Total Payments");
		this.lines["079"]	= new Line("Reserved");
		this.lines["080"]	= new Line("Reserved");
		this.lines["081"]	= new Line("Reserved");
		this.lines["082"]	= new Line("Reserved");
		this.lines["083"]	= new Line("Reserved");
		this.lines["084"]	= new Line("Reserved");
		this.lines["085"]	= new Line("Reserved");
		this.lines["086"]	= new Line("Reserved");
		this.lines["087"]	= new Line("Reserved");
		this.lines["088"]	= new Line("Reserved");
		this.lines["089"]	= new Line("Reserved");
		this.lines["090"]	= new Line("Reserved");

		// Use Tax
		this.lines["091"]	= new Line("Use tax");

		// ISR Penalty
		this.lines["092"]	= new Line("Individual Shared Responsibility Penalty");

		// Overpaid Tax / Tax Due
		this.lines["093"]	= new Line("Payments Balance");
		this.lines["094"]	= new Line("Use Tax Balance");
		this.lines["095"]	= new Line("Payments - ISRP");
		this.lines["096"]	= new Line("ISRP Balance");
		this.lines["097"]	= new Line("Overpaid Tax");
		this.lines["098"]	= new Line("Amount to Apply to Next Year");
		this.lines["099"]	= new Line("Overpaid");
		this.lines["100"]	= new Line("Tax Due");
		this.lines["101"]	= new Line("Reserved");
		this.lines["102"]	= new Line("Reserved");
		this.lines["103"]	= new Line("Reserved");
		this.lines["104"]	= new Line("Reserved");
		this.lines["105"]	= new Line("Reserved");
		this.lines["106"]	= new Line("Reserved");
		this.lines["107"]	= new Line("Reserved");
		this.lines["108"]	= new Line("Reserved");
		this.lines["109"]	= new Line("Reserved");

		// Contributions
		this.lines["110"]	= new Line("Total Contributions");

		// Amount You Owe
		this.lines["111"]	= new Line("Amount You Owe");

		// Interest and Penalties
		this.lines["112"]	= new Line("Interest and Penalties");
		this.lines["113"]	= new Line("Underpayment of Estimated Tax");
		this.lines["114"]	= new Line("Amount Due");

		// Refund
		this.lines["115"]	= new Line("Refund");

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
		const personal_exemption =
			tt.getTaxValue("CA_PersonalExemption", tp.filing_status);
		const dependent_exemption =
			tt.getTaxValue("CA_DependentExemption", tp.filing_status);

		// Filing Status
		this.lines["001"].value	= false;	// SINGLE
		this.lines["002"].value	= false;	// MFJ
		this.lines["003"].value	= false;	// MFS
		this.lines["004"].value	= false;	// HOH
		this.lines["005"].value	= false;	// QSS
		if (tp.filing_status === "SINGLE") {
			this.lines["001"].value	= true;
		} else if (tp.filing_status === "MFJ") {
			this.lines["002"].value	= true;
		} else if (tp.filing_status === "MFS") {
			this.lines["003"].value	= true;
		} else if (tp.filing_status === "HOH") {
			this.lines["004"].value	= true;
		} else if (tp.filing_status === "QSS") {
			this.lines["005"].value	= true;
		}

		// Can Be a Dependent
		this.lines["006"].value	= false;

		// Personal Exemption
		this.lines["007"].value	= personal_exemption;
		if ((tp.filing_status === "MFJ") || (tp.filing_status === "QSS")) {
			this.lines["007"].value += personal_exemption;
		}

		// Blind Exemption
		this.lines["008"].value	= 0;
		if (tp.is_taxpayer_blind) {
			this.lines["008"].value += personal_exemption;
		}
		if ((tp.filing_status === "MFJ") && tp.is_spouse_blind) {
			this.lines["008"].value += personal_exemption;
		}

		// Senior Exemption
		this.lines["009"].value	= 0;
		if (tp.taxpayers_age >= 65) {
			this.lines["009"].value += personal_exemption;
		}
		if ((tp.filing_status === "MFJ") && tp.spouses_age >= 65) {
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
		this.lines["018"].value	= TaxFormObj.getValue("F540CA", "D-30");// Deductions
		this.lines["019"].value	= this.subtract("017", "018");			// Taxable Income
		this.lines["020"].value	= 0;									// Reserved
		this.lines["021"].value	= 0;									// Reserved
		this.lines["022"].value	= 0;									// Reserved
		this.lines["023"].value	= 0;									// Reserved
		this.lines["024"].value	= 0;									// Reserved
		this.lines["025"].value	= 0;									// Reserved
		this.lines["026"].value	= 0;									// Reserved
		this.lines["027"].value	= 0;									// Reserved
		this.lines["028"].value	= 0;									// Reserved
		this.lines["029"].value	= 0;									// Reserved
		this.lines["030"].value	= 0;									// Reserved

		// Tax
		this.lines["031"].value	= tt.get_CA_IncomeTax(tp.filing_status, this.line("019"));
		if (this.line("013") > tt.getTaxValue("CA_HiIncPhaseout", tp.filing_status)) {
			this.lines["032"].value =
				new CA_HiIncExemptions("CA_HiIncExemptions").line("exemptions");
		} else {
			this.lines["032"].value = this.line("011");					// Exemptions
		}

		this.lines["033"].value	= Math.max(0, this.subtract("031", "032"));// Tax - Exempts
		this.lines["034"].value	= 0;									// From Form 5870A
		this.lines["035"].value	= this.add("033", "034");				// Total Tax
		this.lines["036"].value	= 0;									// Reserved
		this.lines["037"].value	= 0;									// Reserved
		this.lines["038"].value	= 0;									// Reserved
		this.lines["039"].value	= 0;									// Reserved
		this.lines["040"].value	= 0;									// Child Care Credit
		this.lines["041"].value	= 0;									// Reserved
		this.lines["042"].value	= 0;									// Reserved
		this.lines["043"].value	= 0;									// Other Credit
		this.lines["044"].value	= 0;									// Other Credit
		this.lines["045"].value	= 0;									// Other Credit
		this.lines["046"].value	= 0;									// Renter's Credit
		if (tp.rents_home) {
			this.lines["046"].value	= tt.getTaxValue("CA_RentersCredit", tp.filing_status);
		}
		this.lines["047"].value	= this.add("040","041","042","043",
										   "044","045","046");	// Total Special Credits
		this.lines["048"].value	= Math.max(0, this.subtract("035", "047"));	// Updated Tax
		this.lines["049"].value	= 0;									// Reserved
		this.lines["050"].value	= 0;									// Reserved
		this.lines["051"].value	= 0;									// Reserved
		this.lines["052"].value	= 0;									// Reserved
		this.lines["053"].value	= 0;									// Reserved
		this.lines["054"].value	= 0;									// Reserved
		this.lines["055"].value	= 0;									// Reserved
		this.lines["056"].value	= 0;									// Reserved
		this.lines["057"].value	= 0;									// Reserved
		this.lines["058"].value	= 0;									// Reserved
		this.lines["059"].value	= 0;									// Reserved
		this.lines["060"].value	= 0;									// Reserved

		// Other taxes
		this.lines["061"].value	= 0;									// AMT
		this.lines["062"].value	= 0;									// Mental Health Tax
		this.lines["063"].value	= 0;									// Recapture
		this.lines["064"].value	= this.add("048","061","062","063");	// Total Tax
		this.lines["065"].value	= 0;									// Reserved
		this.lines["066"].value	= 0;									// Reserved
		this.lines["067"].value	= 0;									// Reserved
		this.lines["068"].value	= 0;									// Reserved
		this.lines["069"].value	= 0;									// Reserved
		this.lines["070"].value	= 0;									// Reserved

		// Payments
		this.lines["071"].value	= TaxFormObj.getValue("W2", "19") +		// Withholding
									TaxFormObj.getValue("F1099INT", "17") +
									TaxFormObj.getValue("F1099DIV", "16") +
									TaxFormObj.getValue("F1099R", "14");
		this.lines["072"].value	= 0;									// Estimated Payments
		this.lines["073"].value	= 0;									// Withholding
		this.lines["074"].value	= 0;									// Excess SDI or VPDI
		this.lines["075"].value	= 0;									// EITC
		this.lines["076"].value	= 0;									// Young Child Tax
		this.lines["077"].value	= 0;									// Foster Youth Tax
		this.lines["078"].value	= this.add("071","072","073","074",
										   "075","076","077");			// Total Payments
		this.lines["079"].value	= 0;									// Reserved
		this.lines["080"].value	= 0;									// Reserved
		this.lines["081"].value	= 0;									// Reserved
		this.lines["082"].value	= 0;									// Reserved
		this.lines["083"].value	= 0;									// Reserved
		this.lines["084"].value	= 0;									// Reserved
		this.lines["085"].value	= 0;									// Reserved
		this.lines["086"].value	= 0;									// Reserved
		this.lines["087"].value	= 0;									// Reserved
		this.lines["088"].value	= 0;									// Reserved
		this.lines["089"].value	= 0;									// Reserved
		this.lines["090"].value	= 0;									// Reserved

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
		this.lines["101"].value	= 0;									// Reserved
		this.lines["102"].value	= 0;									// Reserved
		this.lines["103"].value	= 0;									// Reserved
		this.lines["104"].value	= 0;									// Reserved
		this.lines["105"].value	= 0;									// Reserved
		this.lines["106"].value	= 0;									// Reserved
		this.lines["107"].value	= 0;									// Reserved
		this.lines["108"].value	= 0;									// Reserved
		this.lines["109"].value	= 0;									// Reserved

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
