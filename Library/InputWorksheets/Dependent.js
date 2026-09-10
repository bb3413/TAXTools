
import { HTML }			from "../Classes/HTML.js";
import { Objects }		from "../Classes/Objects.js";
import { Str }			from "../Classes/Str.js";

const FIELD_NAMES = {
	// Name					Type	
	"name":					[],
	"birthday":				[],
	"filing-status":		[],
	"months-lived-at-home":	[],
	"gross-income":			[],
	"fulltime-student":		[],
	"mfj":					[],
	"provides-half-support":[],
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
				<div class="taxpayer-info-short-line">
					<p>Birthday</p>
					<input class="trigger input-field left"
						type="text" id="dependent-XX-birthday" size="36"
						placeholder="mm/dd/yyyy" tooltipid="#dependent-XX-birthday-tt" />
				</div>
				<div class="taxpayer-info-long-line">
					<p>Relationship</p>
					<select class="trigger input-field left" id="filing-status"
							tooltipid="#filing-status-tt">
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
					<p>Months Lived at Home</p>
					<input class="trigger input-field left"
						type="text" id="dependent-XX-months-lived-at-home" size="10"
						placeholder="12" tooltipid="#dependent-XX-months-lived-at-home-tt" />
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
					<p>Provides Half of Own Support</p>
					<input class="trigger checkbox" type="checkbox"
						id="dependent-XX-provides-half-support"
						tooltipid="#dependent-XX-provides-half-support-tt" />
				</div>
				<div class="taxpayer-info-short-line">
					<p>Disabled</p>
					<input class="trigger checkbox" type="checkbox"
						id="dependent-XX-disabled" tooltipid="#dependent-XX-disabled-tt" />
				</div>
				<div class="taxpayer-info-long-line">
					<p>Has SSN</p>
					<div>
						<input type="radio" id="dependent-XX-has-ssn" name="dependent-XX-has-ssn"
							checked />
						<label for="dependent-XX-has-ssn">SSN</label>
						<input type="radio" id="dependent-XX-has-itin" name="dependent-XX-has-ssn" />
						<label for="dependent-XX-has-itin">ITIN</label>
						<input type="radio" id="dependent-XX-has-atin" name="dependent-XX-has-ssn" />
						<label for="dependent-XX-has-atin">ATIN</label>
					</div>
				</div>
			</div>
		</details>
`;

function elementIDToVarName(element_id) {
	return Str.kebabToSnakeCase(element_id).replace(/^dep_[0-9][0-9]_/, "");
}

export class Dependent {
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
		for (const field_name of Object.keys(FIELD_NAMES)) {
			const value_type	= FIELD_NAMES[field_name][0];
			const var_name		= field_name.replace(/-/g, "_");
			const element_id	= `dependent-${uid}-${field_name}`;
			inputs[var_name]	= HTML.getUserInput(element_id, value_type);
		}

		return inputs;
	}
}
