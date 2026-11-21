
import { SINGLE, HOH, MFJ, QSS, MFS }	from "../TAXTools/TAXTools.js";
import { filingStatusToStr }			from "../TAXTools/TAXTools.js";
import { strToFilingStatus }			from "../TAXTools/TAXTools.js";

import { Dates }		from "../Modules/Dates.js";
import { Dependent }	from "../InputWorksheets/Dependent.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTML }			from "../Modules/HTML.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";
import { Str }			from "../Modules/Str.js";
import { Objects }		from "../Modules/Objects.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxInfo }		from "../Modules/TaxInfo.js";
import { TaxTable }		from "../Modules/TaxTable.js";
import { TaxpayerDependent }	from "../Classes/TaxpayerDependent.js";
import { TaxpayerWeb }	from "../InputWorksheets/TaxpayerWeb.js";

let taxpayer = undefined;		// Global variable.

function initializeTaxpayer() {
	//
	// Create a new taxpayer and initialize it with information from the Web page.
	//
	new Taxpayer();

	const values = TaxpayerWeb.getValues();
	for (const key of Object.keys(values)) {
		if (!key in taxpayer) {
			throw new Error(`Invalid key for taxpayer: ${key}`);
		}

		switch (key) {
			case "filing_status":
				taxpayer[key] = strToFilingStatus(values[key])
				break;
			default:
				taxpayer[key] = values[key];
				break;
		}
	}

	if (typeof taxpayer["filing_status"] !== "number") {
		taxpayer[filing_status] = SINGLE;
	}
	
	if (taxpayer.filing_status === MFJ) {
		if (taxpayer.months_lived_together === "") {
			taxpayer.months_lived_together = 12;
		} else {
			taxpayer.months_lived_together = Number(taxpayer.months_lived_together);
		}
	}

	return taxpayer;
}

export class Taxpayer {
	//
	// ---------------- Static Methods ----------------
	//
	static getTaxpayer() {
		if (!taxpayer) {
			initializeTaxpayer();
		}
		return taxpayer;
	}

	static reset() {
		taxpayer = undefined;
	}

	static setTaxpayer(new_taxpayer) {
		taxpayer = new_taxpayer;
	}

	//
	// ---------------- Constructor ----------------
	//
	constructor() {
		if (taxpayer) {
			throw new Error("Taxpayer is already initialized.");
		}
		taxpayer = this;

		this._filing_status				= SINGLE;
		this.taxpayers_name				= "";
		this.street_address				= "";		// Needed for sales tax
		this.city						= "";		// Needed for sales tax
		this.state						= "";
		this.zip_code					= "";		// Needed for sales tax
		this._taxpayers_birthday		= "";
		this._taxpayers_age				= 0;
		this.is_taxpayer_blind			= false;
		this.taxpayer_has_ssn			= true;		// Not an ITIN

		// Spouse
		this._spouses_birthday			= "";
		this._spouses_age				= 0;
		this.months_lived_together		= 12;		// Needed when filing MFS
		this.is_spouse_blind			= false;
		this.spouse_has_ssn				= true;		// Not an ITIN

		this.dependents					= [];

		// The following properties contain tax information that is not contained on a tax
		// form but is needed to calculate some tax forms. These properties can be accessed
		// directly from the tax forms. The comment following each property shows where it is
		// referenced from.
		// Medical insurance premiums
		this.health_insurance			= 0;	// TaxInfo.getMedicalInsurancePremiums()
		this.dental_vision_insurance	= 0;	// TaxInfo.getMedicalInsurancePremiums()
		this.medicare					= 0;	// TaxInfo.getMedicalInsurancePremiums()
		this.ltc_taxpayer				= 0;	// TaxInfo.getLTCInsurance()
		this.ltc_spouse					= 0;	// TaxInfo.getLTCInsurance()

		// Other medical expenses
		this.doctor						= 0;	// TaxInfo.getMedicalExpenses()
		this.prescriptions				= 0;	// TaxInfo.getMedicalExpenses()
		this.medical_aids				= 0;	// TaxInfo.getMedicalExpenses()
		this.medical_facilities			= 0;	// TaxInfo.getMedicalExpenses()
		this.nursing_services			= 0;	// TaxInfo.getMedicalExpenses()
		this.medical_miles				= 0;	// TaxInfo.getMedicalExpenses()
		this.other_medical				= 0;	// TaxInfo.getMedicalExpenses()

		// Taxes paid
		this.estimated_payments_federal	= 0;	// F1040[26]
		this.estimated_payments_state	= 0;	// TaxInfo.getStateTaxPaid(), 540[72]
		this.state_tax_due_last_year	= 0;	// TaxInfo.getStateTaxPaid()
		this.property_tax				= 0;	// F1040SA[5b]
		this.personal_property_tax		= 0;	// F1040SA[5c]
		this.sales_tax_rate				= 0;	// TaxInfo.getSalesTaxPaid()
		this.extra_sales_tax			= 0;	// TaxInfo.getSalesTaxPaid()

		// Charitable donations
		this.cash_donations				= 0;	// F1040SA[11]
		this.non_cash_donations			= 0;	// F1040SA[12]
		this.charitable_miles			= 0;	// F1040SA[12]

		// Other expenses
		this.educator_expense_taxpayer	= 0;	// F1040S1[11]
		this.educator_expense_spouse	= 0;	// F1040S1[11]
		this.tax_preparation			= 0;	// F540CA[D-20]
		this.investment_expenses		= 0;	// F540CA[D-21]
		this.ira_contribution_taxpayer	= 0;	// F1040S1._calculateIRADeduction(), F8880[1a]
		this.ira_contribution_spouse	= 0;	// F1040S1._calculateIRADeduction(), F8880[1b]

		this.alimony_paid				= 0;	// F1040S1[2a]
		this.alimony_received			= 0;	// F1040S1[19a]
		this.divorce_date				= 0;	// F1040S1[2b], F1040S1[19c]

		// Other income
		this.jury_duty					= 0;	// F1040S1[24a]
		this.gambling_winnings			= 0;	// F1040S1[8b]
		this.other_income				= 0;	// F1040S1[8z]
	}

	//
	// ---------------- Getter Methods ----------------
	//
	get filing_status() {				return this._filing_status};
	get taxpayers_birthday() {			return this._taxpayers_birthday};
	get taxpayers_age() {				return this._taxpayers_age};
	get spouses_birthday() {			return this._spouses_birthday};
	get spouses_age() {					return this._spouses_age};

	//
	// ---------------- Setter Methods ----------------
	//
	set filing_status(fs) {
		Ensure.isNumber(fs);
		this._filing_status = fs;
	}

	set taxpayers_birthday(birthday) {
		if (birthday === null || birthday === undefined) {
			return;
		}

		this._taxpayers_birthday = birthday;
		this._taxpayers_age =
			Math.max(0, Dates.getEndOfYearAge(birthday, TaxTable.getTaxYear()));
	}

	set taxpayers_age(age) {
		if (age === null || age === undefined) {
			return;
		}

		if (age > 0) {
			this._taxpayers_birthday	= "";
			this._taxpayers_age			= age;
		}
	}

	set spouses_birthday(birthday) {
		if (birthday === null || birthday === undefined) {
			return;
		}

		this._spouses_birthday = birthday;
		this._spouses_age =
			Math.max(0, Dates.getEndOfYearAge(birthday, TaxTable.getTaxYear()));
	}

	set spouses_age(age) {
		if (age === null || age === undefined) {
			return;
		}

		if (age > 0) {
			this._spouses_birthday		= "";
			this._spouses_age			= age;
		}
	}

	//
	// ---------------- Utility Methods ----------------
	//
	addDependent(inputs) {
		Ensure.isObject(inputs);

		const dependent = new TaxpayerDependent(inputs);
		if (!dependent.isQualifiedChild() && !dependent.isQualifiedRelative()) {
			throw new Error("Dependent is not a qualifying child or relative.");
		}

		this.dependents.push(dependent);
	}

	clone() {
		// This method is a shallow copy. If an object or array is contained in this object 
		// it will be copied by reference.
		return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
	}

	familySize() {
		// Family size is used for sales tax calculation.
		let size = 1;	// Taxpayer
		if (this.filing_status === MFJ) {
			size++;		// Spouse
		}

		size += this.dependents.length;

		return size;
	}

	fillIn1040() {
		//
		// Put the taxpayer information on the output form 1040.
		//
		const hm	= HTMLMgr.getMgr();
		const block = hm.getBlock("f1040");
		const id	= block.getID();

		HTML.putUserOutput(`${id}-filing-status`,
			filingStatusToStr(this.filing_status), "text");
		HTML.putUserOutput(`${id}-taxpayers-name`,
			this.taxpayers_name, "text");
		HTML.putUserOutput(`${id}-street-address`,
			this.street_address, "text");
		if (!Str.empty(this.city)) {
			const state = this.state ? this.state : "CA";
			HTML.putUserOutput(`${id}-city-state-zip`,
				`${this.city}, ${state} ${this.zip_code}`.trim(), "text");
		} else {
			HTML.putUserOutput(`${id}-city-state-zip`,"", "text");
		}

		if (!Str.empty(this.taxpayers_birthday)) {
			HTML.putUserOutput(`${id}-taxpayers-birthday`,
				`${this.taxpayers_birthday} (Age ${this.taxpayers_age})`, "text");
		} else {
			HTML.putUserOutput(`${id}-taxpayers-birthday`, " ", "text");
		}
		if (!Str.empty(this.spouses_birthday)) {
			HTML.putUserOutput(`${id}-spouses-birthday`,
				`${this.spouses_birthday} (Age ${this.spouses_age})`, "text");
		} else {
			HTML.putUserOutput(`${id}-spouses-birthday`, " ", "text");
		}
		HTML.putUserOutput(`${id}-taxpayer-is-blind`,
			this.is_taxpayer_blind ? "X" : "", "text");
		HTML.putUserOutput(`${id}-spouse-is-blind`,
			this.is_spouse_blind ? "X" : "", "text");
	}

	isMarried() {
		switch (this.filing_status) {
			case MFJ:	return true;
			case MFS:	return true;
		}
		return false;
	}

	isQualifiedForEIC() {
		if (!this.taxpayer_has_ssn) {
			return false;
		}
		if (this.filing_status === MFJ && !this.spouse_has_ssn) {
			return false;
		}
		if ((this.numDependentsForEIC() === 0) && (this.age <25 || this.age >= 65)) {
			return false;
		}
		return true;
	}

	numDependentsForCTC() {
		let qualifying_children = 0;
		let other_dependents = 0;
		
		for (const dep of this.dependents) {
			if (!dep.has_ssn) {
				continue;
			}
		
			if (dep.isQualifiedChild() && (dep.age < 17)) {
				qualifying_children++;
			} else {
				other_dependents++;
			}
		}

		return [qualifying_children, other_dependents];
	}

	numDependentsForEIC() {
		let qualifying_dependents = 0;

		for (const dep of this.dependents) {
			if (!dep.has_ssn) {
				continue;
			}
			if (!dep.isQualifiedChild(true)) {
				continue;
			}

			qualifying_dependents++;
		}

		return Math.min(3, qualifying_dependents);
	}

	toString() {
		let str		= [];
		let title	= [];

		title.push(`Taxpayer`);

		const fields = Object.keys(this);
		for (const field of fields) {
			if ((this.filing_status !== MFJ) && field.match(/spouse/i)) {
				continue;
			}
			if (field === "_dependents") {
				continue;
			}

			let value = this[field];
			if (value) {	// Skip empty lines.
				let s = "  " + Str.snakeCaseToEnglish(field);
				s = s.padEnd(65, " ") + value;
				str.push(s);
			}
		}

		if (str.length > 0) {
			str = title.concat(str);
			str.push("");
			str.push("");
			return str.join("\n");
		} else {
			return "";
		}
	}
}
