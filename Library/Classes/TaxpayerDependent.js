
import { Debug }		from "../Modules/Debug.js";
import { Dates }		from "../Modules/Dates.js";
import { Ensure }		from "../Modules/Ensure.js";
import { Str }			from "../Modules/Str.js";
import { TaxTable }		from "../Modules/TaxTable.js";

import { SINGLE, HOH, MFJ, QSS, MFS }	from "../TAXTools/TAXTools.js";

const FIELD_INFO = {
	// Field Name			Value Type	Is Line	Description
	"dependent-name":		["text",	false,	""],
	"birthday":				["text",	false,	""],
	"relationship":			["text",	false,	""],
	"months-lived-at-home":	["text",	false,	""],
	"gross-income":			["",		false,	""],
	"fulltime-student":		["",		false,	""],
	"mfj":					["",		false,	""],
	"taxpayer-supported":	["",		false,	""],
	"dependent-supported":	["",		false,	""],
	"disabled":				["",		false,	""],
	"has-ssn":				["",		false,	""],
	"has-itin":				["",		false,	""],
	"has-atin":				["",		false,	""],
};

export class TaxpayerDependent {
	constructor(values) {
		Ensure.isObject(values);

		this.dependent_name			= "";
		this._birthday				= "";
		this._age					= 0;
		this.relationship			= "";
		this.months_lived_at_home	= "";
		this.gross_income			= 0;
		this.fulltime_student		= false;
		this.mfj					= false;
		this.dependent_supported	= false;
		this.taxpayer_supported		= false;
		this.disabled				= false;
		this.has_ssn				= false;
		this.has_itin				= false;
		this.has_atin				= false;

		for (const key of Object.keys(values)) {
			if (key in this) {
				this[key] = values[key];
			} else {
				throw new Error(`Invalid key for dependent: ${key}`);
			}
		}

		if (this.months_lived_at_home === "") {
			this.months_lived_at_home = 12;
		} else {
			this.months_lived_at_home = Number(this.months_lived_at_home);
		}
	}

	get birthday() { return this._birthday };
	get age() { return this._age };

	set birthday(birthday) {
		if (birthday === null || birthday === undefined) { return; }
		this._birthday = birthday;
		this._age =
			Math.max(0, Dates.getEndOfYearAge(birthday, TaxTable.getTaxYear()));
	}

	set age(age) {
		if (age === null || age === undefined) { return; }
		if (age > 0) {
			this._birthday	= "";
			this._age		= age;
		}
	}

	isQualifiedChild() {
		const tp = Taxpayer.getTaxpayer();

		// Relationship Test - The child must be the taxpayer's child, stepchild, foster
		// child, adopted child, brother, sister, half-brother, half-sister, stepbrother,
		// stepsister, or a descendant of any of them.
		if (this.relationship !== "CHILD" && this.relationship !== "SIBLING") {
			return false;
		}

		// Age Test - The child must be:
		// 		o	Any age if permanently and totally disabled, or
		//		o	Younger than the taxpayer (or spouse if filing jointly) (e.g., younger
		//			brother, but not older brother), and
		//			o	Under age 19 at the end of the year, or
		//			o	Under age 24 at the end of the year, a full-time student during any
		//				5 months of the year.
		if (this.disabled) {
			// OK
		} else if ((this.age < tp.taxpayers_age) || (this.age < tp.spouses_age)) {
			if (this.age < 19) {
				// OK
			} else if ((this.age < 24) && this.fulltime_student) {
				// OK
			} else {
				return false;
			}
		} else {
			// Older than both taxpayer and spouse.
			return false;
		}

		// Residency Test - The child must have lived with the taxpayer in the U.S. for more
		// than half of the year.
		if (this.months_lived_at_home > 6) {
			// OK
		} else {
			return false;
		}

		// Support Test - The child must not provide more than half of their own support.
		//		o	The parent does not need to provide more than half the support for the
		//			child.
		//		o	A scholarship is not considered support.
		//		o	Income received by the child, but not spent on their own support is not
		//			considered support.
		if (this.dependent_supported) {
			return false;
		}

		// Joint Return Test - The child must not be filing a joint return for the year
		// (unless it is filed only to get a refund of income tax withheld or estimated tax
		// paid).
		if (this.mfj) {
			return false;
		}

		return true;
	}

	isQualifiedRelative() {
		const tt = TaxTable.getTaxTable();
		const tp = Taxpayer.getTaxpayer();

		// Qualifying Child Test - The relative cannot be the taxpayer's qualifying child or
		// the qualifying child of any other taxpayer unless that taxpayer does not file a
		// tax return.
		if (this.isQualifyingChild()) {
			return false;
		}

		// Relationship Test - The relative either:
		//		o	Must live with the taxpayer all year as a member of the taxpayer's
		//			household and not married, or
		//		o	Must be related to the taxpayer in one of the following ways:
		//			o	The taxpayer's child, stepchild, foster child, or a descendant of any
		//				of them,
		//			o	The taxpayer's brother, sister, half-brother, half-sister,
		//				stepbrother,
		//				or stepsister,
		//			o	The taxpayer's father, mother, grandparent, or other ancestor, but
		//				not foster parent,
		//			o	The taxpayer's stepfather or stepmother,
		//			o	A son or daughter of the taxpayer's brother or sister,
		//			o	A son or daughter of the taxpayer's half-brother half-sister,
		//			o	A brother or sister of the taxpayer's father or mother,
		//			o	The taxpayer's son-in-law, daughter-in-law, father-in-law,
		//				mother-in-law, brother-in-law, or sister-in-law.
		//		o	Relationships established by marriage and not ended by death or divorce.
		if (this.months_lived_at_home >= 12) {
			// OK
		} else {
			switch (this.relationship) {
				case "NONE":		return false;
				case "CHILD":		break;
				case "SIBLING":		break;
				case "PARENT":		break;
				case "STEP-PARENT":	break;
				case "AUNT-UNCLE":	break;
				case "IN-LAW":		break;
				case "NOT_RELATED":	break;
				default: throw new Error(
					`Unexpected relationship for qualifying relative: ${this.relationship}`);
			}
		}

		// Gross Income Test - The relative's gross (taxable) income for the year must be
		// less than $5,050.
		if (this.gross_income > tt.getTaxValue("MaxDependentGrossIncome")) {
			return false;
		}

		// Support Test - The taxpayer must provide more than half of the relative's support
		// for the year.
		//		o	A scholarship is not considered support.
		//		o	Income received by the relative, but not spent on their own support is
		//			not considered support.
		//		o	If two or more people could claim the person except for the support test,
		//			and together they provide more than half the support, one of them can
		//			file form 2120 Multiple Support Agreement and claim the person.
		if (!this.taxpayer_supported) {
			return false;
		}

		return true;
	}

	toString() {
		let str		= [];
		let title	= [];

		title.push(`Dependent`);

		const fields = Object.keys(this);
		for (const field of fields) {
			if ((this._filing_status !== MFJ) && field.match(/spouse/i)) {
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
