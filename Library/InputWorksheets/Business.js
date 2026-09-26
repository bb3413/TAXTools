
import { HTML }			from "../Modules/HTML.js";
import { Objects }		from "../Modules/Objects.js";
import { Str }			from "../Modules/Str.js";

const ELEMENTS = {
	// Element ID			Value Type
	"name":					[],
	"cash-income":			[],
	"advertising":			[],
	"commissions":			[],
	"insurance":			[],
	"interest":				[],
	"office-supplies":		[],
	"utilities":			[],
	"licenses":				[],
	"training":				[],
	"tools":				[],
	"travel":				[],
	"meals":				[],
	"rent":					[],
	"business-miles":		[],
	"tolls":				[],
	"other-expenses":		[],
};

const HTML_WORKSHEET = `
		<details class="taxform-details" id="business-XX-container">
			<summary class="taxform-summary">Small Business #-UID-</summary>
			<div class="input-worksheet-container">
				<div class="taxpayer-info-long-line">
					<p>Business Name</p>
					<input class="trigger input-field left" type="text" autofocus
						spellcheck="false" size="45"
						id="business-XX-name" tooltipid="#business-name-tt" />
				</div>

				<h3>Income</h3>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Cash Income</div>
					<input class="trigger input-worksheet-row-value input-field" type="text" 
						id="business-XX-cash-income" tooltipid="#business-cash-income-tt"
						size="10" placeholder="0" />
				</div>

				<h3>Expenses</h3>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Advertising</div>
					<input class="trigger input-worksheet-row-value input-field" type="text"
						id="business-XX-advertising" tooltipid="#business-advertising-tt"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Commissions and Fees</div>
					<input class="trigger input-worksheet-row-value input-field" type="text"
						id="business-XX-commissions" tooltipid="#business-commissions-tt"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Insurance (other than
						health)</div>
					<input class="trigger input-worksheet-row-value input-field" type="text"
						id="business-XX-insurance" tooltipid="#business-insurance-tt"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Interest on Business Loans</div>
					<input class="trigger input-worksheet-row-value input-field" type="text"
						id="business-XX-interest" tooltipid="#business-interest-tt"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Office Expenses</div>
					<input class="trigger input-worksheet-row-value input-field" type="text"
						id="business-XX-office-supplies"
						tooltipid="#business-office-supplies-tt"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Utilities</div>
					<input class="trigger input-worksheet-row-value input-field" type="text"
						id="business-XX-utilities" tooltipid="#business-utilities-tt"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Taxes and Licenses</div>
					<input class="trigger input-worksheet-row-value input-field" type="text"
						id="business-XX-licenses" tooltipid="#business-licenses-tt"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Training</div>
					<input class="trigger input-worksheet-row-value input-field" type="text"
						id="business-XX-training" tooltipid="#business-training-tt"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Tools (under $2,500 each)</div>
					<input class="trigger input-worksheet-row-value input-field" type="text"
						id="business-XX-tools" tooltipid="#business-tools-tt"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Travel</div>
					<input class="trigger input-worksheet-row-value input-field" type="text"
						id="business-XX-travel" tooltipid="#business-travel-tt"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Business Meals</div>
					<input class="trigger input-worksheet-row-value input-field" type="text"
						id="business-XX-meals" tooltipid="#business-meals-tt"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Rent</div>
					<input class="trigger input-worksheet-row-value input-field" type="text"
						id="business-XX-rent" tooltipid="#business-rent-tt"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Business Miles Driven</div>
					<input class="trigger input-worksheet-row-value input-field" type="text"
						id="business-XX-business-miles" tooltipid="#business-business-miles-tt"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Tolls, Parking</div>
					<input class="trigger input-worksheet-row-value input-field" type="text"
						id="business-XX-tolls" tooltipid="#business-tolls-tt"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Other Expenses</div>
					<input class="trigger input-worksheet-row-value input-field" type="text"
						id="business-XX-other-expenses" tooltipid="#business-other-expenses-tt"
						size="10" placeholder="0" />
				</div>
				<p>&nbsp;</p>
			</div>
		</details>
`;

export class Business {
	static getInputHTML(uid) {
		if (!uid) {
			throw new Error(`Business.getInputHTML(): UID is undefined.`);
		}

		const html = HTML_WORKSHEET.replace(/XX/g, uid)
									.replace(/-UID-/g, uid);

		return [ `business-${uid}-container`, html ];
	}

	static getUserInput(uid) {
		//
		// Read the fields of the worksheet from the web and return an object with the
		// values.
		//
		if (!uid) {
			throw new Error(`Business.getUserInput(): UID is undefined.`);
		}

		// Make sure the worksheet exists.
		const element = document.getElementById(`business-${uid}-container`);
		if (!element) {
			throw new Error(
				`Business.getUserInput(): Element not found: business-${uid}-container`);
		}

		let inputs = {};
		for (const field_name of Object.keys(ELEMENTS)) {
			const value_type	= ELEMENTS[field_name][0];
			const key_name		= field_name.replace(/-/g, "_");
			const element_id	= `business-${uid}-${field_name}`;
			inputs[key_name]	= HTML.getUserInput(element_id, value_type);
		}
		return inputs;
	}
}
