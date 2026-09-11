
import { HTML }			from "../Modules/HTML.js";
import { Objects }		from "../Modules/Objects.js";
import { Str }			from "../Modules/Str.js";

const ELEMENT_IDS = {
	// Element ID			Value Type
	"jury-duty":			[],
	"alimony-received":		[],
	"divorce-date":			[],
	"gambling":				[],

};

const HTML_WORKSHEET = `
		<details class="taxform-details" id="income-XX-container">
			<summary class="taxform-summary">Other Income</summary>
			<div class="input-worksheet-container">
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Jury Duty</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="income-XX-jury-duty"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Alimony Received</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="income-XX-alimony-received"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Divorce Data</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="income-XX-divorce-date"
						size="10" placeholder="mm/dd/yyyy" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Gambling Winnings</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="income-XX-gambling"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Other Income</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="income-XX-other"
						size="10" placeholder="0" />
				</div>
			</div>		<!-- input-worksheet-container -->
			<div>&nbsp;</div>
		</details>
`;

function elementIDToVarName(element_id) {
	return Str.kebabToSnakeCase(element_id).replace(/^inc_[0-9][0-9]_/, "");
}

export class Income {
	static getInputHTML(uid = 1) {
		if (!uid) {
			throw new Error(`Income.getInputHTML(): UID is undefined.`);
		}

		const html = HTML_WORKSHEET.replace(/XX/g, uid);

		return [ `income-${uid}-container`, html ];
	}

	static getUserInput(uid = 1) {
		//
		// Read the fields of the worksheet from the web and return an object with the
		// values.
		//
		if (!uid) {
			throw new Error(`Income.getUserInput(): UID is undefined.`);
		}

		// Make sure the worksheet exists.
		const element = document.getElementById(`income-${uid}-container`);
		if (!element) {
			throw new Error(
				`Income.getUserInput(): Element not found: income-${uid}-container`);
		}

		let inputs = {};
		for (const field_name of Object.keys(ELEMENT_IDS)) {
			const value_type	= ELEMENT_IDS[field_name][0];
			const key_name		= field_name.replace(/-/g, "_");
			const element_id	= `income-${uid}-${field_name}`;
			inputs[key_name]	= HTML.getUserInput(element_id, value_type);
		}

		return inputs;
	}
}
