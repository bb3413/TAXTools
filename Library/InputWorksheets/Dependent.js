
// Classes
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";

// Modules
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
		<details class="taxform-details" id="dependent-XX">
			<summary class="taxform-summary">Dependent #-UID-</summary>
			<div class="input-worksheet-container">
				<div class="taxpayer-info-150-400">
					<p>Name</p>
					<input class="trigger input-field left"
						type="text" autofocus spellcheck="false" size="45"
						id="dependent-XX-name" tooltipid="#dependent-name-tt" />
				</div>
				<div class="taxpayer-info-150-400">
					<p>Relationship</p>
					<select class="trigger input-field left" id="dependent-XX-relationship"
							tooltipid="#dependent-relationship-tt">
						<option value="NONE"></option>
						<option value="OFFSPRING">Son, Daughter or Step-Child</option>
						<option value="OFFSPRING">Grandchild</option>
						<option value="SIBLING">Brother or Sister</option>
						<option value="SIBLING">Niece or Nephew</option>
						<option value="PARENT">Parent, Step-Parent or Grandparent</option>
						<option value="PARENT">Aunt or Uncle</option>
						<option value="NOT_RELATED">Not related</option>
					</select>
				</div>
				<div class="taxpayer-info-150-100">
					<p>Birthday</p>
					<input class="trigger input-field left"
						type="text" id="dependent-XX-birthday" size="36"
						placeholder="mm/dd/yyyy" tooltipid="#dependent-birthday-tt" />
				</div>
				<div class="taxpayer-info-150-100">
					<p>Months Lived at Home</p>
					<input class="trigger input-field left"
						type="text" id="dependent-XX-months-lived-at-home" size="10"
						placeholder="0" tooltipid="#dependent-months-lived-at-home-tt" />
				</div>
				<div class="taxpayer-info-150-100">
					<p>Gross Income</p>
					<input class="trigger input-field left"
						type="text" id="dependent-XX-gross-income" size="10"
						placeholder="0" tooltipid="#dependent-gross-income-tt" />
				</div>
				<div class="taxpayer-info-150-100">
					<p>Fulltime Student</p>
					<input class="trigger checkbox" type="checkbox"
						id="dependent-XX-fulltime-student"
						tooltipid="#dependent-fulltime-student-tt" />
				</div>
				<div class="taxpayer-info-150-100">
					<p>Married and Filing Jointly</p>
					<input class="trigger checkbox" type="checkbox"
						id="dependent-XX-mfj" tooltipid="#dependent-mfj-tt" />
				</div>
				<div class="taxpayer-info-150-100">
					<p>Taxpayer Paid Over Half of Support</p>
					<input class="trigger checkbox" type="checkbox"
						id="dependent-XX-taxpayer-supported"
						tooltipid="#dependent-taxpayer-supported-tt" />
				</div>
				<div class="taxpayer-info-150-100">
					<p>Dependent Paid Over Half of Support</p>
					<input class="trigger checkbox" type="checkbox"
						id="dependent-XX-dependent-supported"
						tooltipid="#dependent-dependent-supported-tt" />
				</div>
				<div class="taxpayer-info-150-100">
					<p>Disabled</p>
					<input class="trigger checkbox" type="checkbox"
						id="dependent-XX-disabled"
						tooltipid="#dependent-disabled-tt" />
				</div>
				<div class="taxpayer-info-150-400">
					<p>Has SSN</p>
					<div>
						<input type="radio" id="dependent-XX-has-ssn"
							name="dependent-XX-has-ssn" checked />
						<label for="dependent-XX-has-ssn">SSN</label>

						<input type="radio" id="dependent-XX-has-itin"
							name="dependent-XX-has-ssn" />
						<label for="dependent-XX-has-itin">ITIN</label>

						<input type="radio" id="dependent-XX-has-atin"
							name="dependent-XX-has-ssn" />
						<label for="dependent-XX-has-atin">ATIN</label>
					</div>
				</div>
			</div>
		</details>
`;

const FIELD_INFO = {
	// Field Name			Value Type	Is Line	Description
	"name":					["text",	false,	""],
	"birthday":				["text",	false,	""],
	"relationship":			["text",	false,	""],
	"months-lived-at-home":	["",		false,	""],
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

export class Dependent extends HTMLBlock {
	static getFieldInfo() {
		return FIELD_INFO;
	}

	static getHTML(uid) {
		return HTML_CODE.replace(/XX/g, uid)
							.replace(/202X/g, TaxTable.getTaxYear());
	}

	constructor() {
		super();
		this.name		= "dependent";
		this.uid		= HTMLMgr.getMgr().allocateUID(this.name);
		this.html		= Dependent.getHTML(this.uid);
		this.fields		= Dependent.getFieldInfo();
	}

	set birthday(birthday) {
		if (birthday === null || birthday === undefined) { return; }
		this.birthday = birthday;
		this.age =
			Math.max(0, Dates.getEndOfYearAge(birthday, TaxTable.getTaxYear()));
	}

	set age(age) {
		if (age === null || age === undefined) { return; }
		if (age !== 0) {
			this.birthday	= "";
			this.age		= age;
		}
	}

	isQualifiedChild() {
		const tp = Taxpayer.getTaxpayer();

		// Relationship Test - The child must be the taxpayer's child, stepchild, foster
		// child, adopted child, brother, sister, half-brother, half-sister, stepbrother,
		// stepsister, or a descendant of any of them.
		switch (this.relationship) {
			case "NONE":		return false;
			case "OFFSPRING":	break;
			case "SIBLING":		break;
			case "PARENT":		return false;
			case "NOT_RELATED":	return false;
			default:			return false;
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
			// OK
		} else {
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
				case "OFFSPRING":	break;
				case "SIBLING":		break;
				case "PARENT":		break;
				case "NOT_RELATED":	return false;
				default:			return false;
			}
		}

		// Gross Income Test - The relative's gross (taxable) income for the year must be less
		// than $5,050.
		if (this.gross_income > tt.getTaxValue("MaxDependentGrossIncome")) {
			return false;
		}

		// Support Test - The taxpayer must provide more than half of the relative's support
		// for the year.
		//		o	A scholarship is not considered support.
		//		o	Income received by the relative, but not spent on their own support is not
		//			considered support.
		//		o	If two or more people could claim the person except for the support test,
		//			and together they provide more than half the support, one of them can file
		//			form 2120 Multiple Support Agreement and claim the person.
		if (!this.taxpayer_suported) {
			return false;
		}

		return true;
	}
}
