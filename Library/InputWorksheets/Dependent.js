
import { Dates }		from "../Modules/Dates.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";

const ELEMENTS = {
	// Element ID			Value Type
	"name":					["text"],
	"birthday":				["text"],
	"relationship":			["text"],
	"months-lived-at-home":	[],
	"gross-income":			[],
	"fulltime-student":		[],
	"mfj":					[],
	"taxpayer-supported":	[],
	"dependent-supported":	[],
	"disabled":				[],
	"has-ssn":				[],
	"has-itin":				[],
	"has-atin":				[],
};

const HTML_WORKSHEET = `
		<details class="taxform-details" id="dependent-XX-container">
			<summary class="taxform-summary">Dependent #-UID-</summary>
			<div class="input-worksheet-container">
				<div class="taxpayer-info-long-line">
					<p>Name</p>
					<input class="trigger input-field left"
						type="text" autofocus spellcheck="false" size="45"
						id="dependent-XX-name" tooltipid="#dependent-XX-name-tt" />
				</div>
				<div class="taxpayer-info-long-line">
					<p>Relationship</p>
					<select class="trigger input-field left" id="dependent-XX-relationship"
							tooltipid="#relationship-tt">
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
				<div class="taxpayer-info-short-line">
					<p>Birthday</p>
					<input class="trigger input-field left"
						type="text" id="dependent-XX-birthday" size="36"
						placeholder="mm/dd/yyyy" tooltipid="#dependent-XX-birthday-tt" />
				</div>
				<div class="taxpayer-info-short-line">
					<p>Months Lived at Home</p>
					<input class="trigger input-field left"
						type="text" id="dependent-XX-months-lived-at-home" size="10"
						placeholder="0" tooltipid="#dependent-XX-months-lived-at-home-tt" />
				</div>
				<div class="taxpayer-info-short-line">
					<p>Gross Income</p>
					<input class="trigger input-field left"
						type="text" id="dependent-XX-gross-income" size="10"
						placeholder="0" tooltipid="#dependent-XX-gross-income-tt" />
				</div>
				<div class="taxpayer-info-short-line">
					<p>Fulltime Student</p>
					<input class="trigger checkbox" type="checkbox"
						id="dependent-XX-fulltime-student"
						tooltipid="#dependent-XX-fulltime-student-tt" />
				</div>
				<div class="taxpayer-info-short-line">
					<p>Married and Filing Jointly</p>
					<input class="trigger checkbox" type="checkbox"
						id="dependent-XX-mfj" tooltipid="#dependent-XX-mfj-tt" />
				</div>
				<div class="taxpayer-info-short-line">
					<p>Taxpayer Paid Over Half of Support</p>
					<input class="trigger checkbox" type="checkbox"
						id="dependent-XX-taxpayer-supported"
						tooltipid="#dependent-XX-taxpayer-supported-tt" />
				</div>
				<div class="taxpayer-info-short-line">
					<p>Dependent Paid Over Half of Support</p>
					<input class="trigger checkbox" type="checkbox"
						id="dependent-XX-dependent-supported"
						tooltipid="#dependent-XX-dependent-supported-tt" />
				</div>
				<div class="taxpayer-info-short-line">
					<p>Disabled</p>
					<input class="trigger checkbox" type="checkbox"
						id="dependent-XX-disabled"
						tooltipid="#dependent-XX-disabled-tt" />
				</div>
				<div class="taxpayer-info-long-line">
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

export class Dependent {
	constructor(inputs) {
		this.age					= 0;

		this.name					= inputs.name;
		this.birthday				= inputs.birthday;
		this.relationship			= inputs.relationship;
		this.months_lived_at_home	= inputs.months_lived_at_home;
		this.gross_income			= inputs.gross_income;
		this.fulltime_student		= inputs.fulltime_student;
		this.mfj					= inputs.mfj;
		this.taxpayer_supported		= inputs.taxpayer_supported;
		this.dependent_supported	= inputs.dependent_supported;
		this.disabled				= inputs.disabled;
		this.has_ssn				= inputs.has_ssn || inputs.has_atin;	// Not an ITIN		
	}

	//
	// ---------------- Getter Methods ----------------
	//
	get name() {			return this.name};
	get birthday() {		return this.birthday};
	get age() {				return this.age};
	get is_blind() {		return this.is_blind};
	get has_ssn() {			return this.has_ssn};

	//
	// ---------------- Setter Methods ----------------
	//
	set name(name) {		this.name			= name }
	set is_blind(bool) {	this.is_blind		= bool }
	set has_ssn(bool) {		this.has_ssn		= bool }

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

		// Relationship Test - The child must be the taxpayer’s child, stepchild, foster child,
		// adopted child, brother, sister, half-brother, half-sister, stepbrother, stepsister,
		// or a descendant of any of them.
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

		// Joint Return Test - The child must not be filing a joint return for the year (unless
		// it is filed only to get a refund of income tax withheld or estimated tax paid).
		if (this.mfj) {
			return false;
		}
		
		return true;
	}

	isQualifiedRelative() {
		const tt = TaxTable.getTaxTable();
		const tp = Taxpayer.getTaxpayer();

		// Qualifying Child Test - The relative cannot be the taxpayer’s qualifying child or
		// the qualifying child of any other taxpayer unless that taxpayer does not file a tax
		// return.
		if (this.isQualifyingChild()) {
			return false;
		}

		// Relationship Test - The relative either:
		//		o	Must live with the taxpayer all year as a member of the taxpayer’s
		//			household and not married, or
		//		o	Must be related to the taxpayer in one of the following ways:
		//			o	The taxpayer’s child, stepchild, foster child, or a descendant of any
		//				of them,
		//			o	The taxpayer’s brother, sister, half-brother, half-sister, stepbrother,
		//				or stepsister,
		//			o	The taxpayer’s father, mother, grandparent, or other ancestor, but not
		//				foster parent,
		//			o	The taxpayer’s stepfather or stepmother,
		//			o	A son or daughter of the taxpayer’s brother or sister,
		//			o	A son or daughter of the taxpayer’s half-brother half-sister,
		//			o	A brother or sister of the taxpayer’s father or mother,
		//			o	The taxpayer’s son-in-law, daughter-in-law, father-in-law,
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

		// Gross Income Test - The relative’s gross (taxable) income for the year must be less
		// than $5,050.
		if (this.gross_income > tt.getTaxValue("MaxDependentGrossIncome")) {
			return false;
		}

		// Support Test – The taxpayer must provide more than half of the relative’s support
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

	//
	// ---------------- Static Methods ----------------
	//
	static getInputHTML(uid) {
		if (!uid) {
			throw new Error(`Dependent.getInputHTML(): UID is undefined.`);
		}

		const html = HTML_WORKSHEET.replace(/XX/g, uid)
									.replace(/-UID-/g, uid);

		return [ `dependent-${uid}-container`, html ];
	}

	static getUserInput(uid) {
		//
		// Read the fields of the worksheet from the web and return an object with the
		// values.
		//
		if (!uid) {
			throw new Error(`Dependent.getUserInput(): UID is undefined.`);
		}

		// Make sure the worksheet exists.
		const element = document.getElementById(`dependent-${uid}-container`);
		if (!element) {
			throw new Error(
				`Dependent.getUserInput(): Element not found: dependent-${uid}-container`);
		}

		let inputs = {};
		for (const field_name of Object.keys(ELEMENTS)) {
			const value_type	= ELEMENTS[field_name][0];
			const key_name		= field_name.replace(/-/g, "_");
			const element_id	= `dependent-${uid}-${field_name}`;
			inputs[key_name]	= HTML.getUserInput(element_id, value_type);
		}

		return inputs;
	}

	static putUserInput(inputs, uid) {
		//
		// Copy the value of the fields from the inputs object to the web.
		//
		for (const key_name of Object.keys(inputs)) {
			const element_name	= key_name.replace(/_/g, "-");
			const element_id	= `dependent-${uid}-${element_name}`;
			if (document.getElementById(element_id)) {
				HTML.putUserInput(element_id, inputs[key_name]);
			}
		}
	}
}
