
import { HTML }			from "../Modules/HTML.js";
import { Objects }		from "../Modules/Objects.js";
import { Str }			from "../Modules/Str.js";

const ELEMENT_IDS = {
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
			<summary class="taxform-summary">Small Business</summary>
			<div class="input-worksheet-container">
				<div class="taxpayer-info-long-line">
					<p>Business Name</p>
					<input class="trigger input-field left" type="text" autofocus
						spellcheck="false" size="45"
						id="business-XX-name" tooltipid="#business-XX-name-tt" />
				</div>

				<h3>Income</h3>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Cash Income</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="business-XX-cash-income"
						size="10" placeholder="0" />
				</div>

				<h3>Expenses</h3>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Advertising</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="business-XX-advertising"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Commissions and Fees</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="business-XX-commissions"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Insurance (other than
						health)</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="business-XX-insurance"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Interest on Business Loans</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="business-XX-interest"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Office Expenses</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="business-XX-office-supplies"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Utilities</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="business-XX-utilities"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Taxes and Licenses</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="business-XX-licenses"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Training</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="business-XX-training"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Tools (under $2,500 each)</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="business-XX-tools"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Travel</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="business-XX-travel"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Business Meals</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="business-XX-meals"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Rent</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="business-XX-rent"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Business Miles Driven</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="business-XX-business-miles"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Tolls, Parking</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="business-XX-tolls"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Other Expenses</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="business-XX-other-expenses"
						size="10" placeholder="0" />
				</div>
				<p>&nbsp;</p>
			</div>
		</details>
`;

function setvalue(variable, value) {
	if (value !== "") {
		variable = value;
	}
}

export class Business {
	static createF1040SC() {
		for (const worksheet_id of TaxFormWeb.getInputForms("Business")) {
			let [ name, uid ] = Container.parseElementID(worksheet_id);
			const input = Classes.getInputValues("Business", uid);
			if (!Objects.isUsed(inputs)) {
				break;
			}

			setvalue(this.lines["xx"].user_value, inputs["name"]);
			setvalue(this.lines["xx"].user_value, inputs["cash-income"]);
			setvalue(this.lines["xx"].user_value, inputs["advertising"]);
			setvalue(this.lines["xx"].user_value, inputs["commissions"]);
			setvalue(this.lines["xx"].user_value, inputs["insurance"]);
			setvalue(this.lines["xx"].user_value, inputs["interest"]);
			setvalue(this.lines["xx"].user_value, inputs["office-supplies"]);
			setvalue(this.lines["xx"].user_value, inputs["utilities"]);
			setvalue(this.lines["xx"].user_value, inputs["licenses"]);
			setvalue(this.lines["xx"].user_value, inputs["training"]);
			setvalue(this.lines["xx"].user_value, inputs["tools"]);
			setvalue(this.lines["xx"].user_value, inputs["travel"]);
			setvalue(this.lines["xx"].user_value, inputs["meals"]);
			setvalue(this.lines["xx"].user_value, inputs["rent"]);
			setvalue(this.lines["xx"].user_value, inputs["business-miles"]);
			setvalue(this.lines["xx"].user_value, inputs["tolls"]);
			setvalue(this.lines["xx"].user_value, inputs["other-expenses"]);
		}
	}

	static getInputHTML(uid) {
		if (!uid) {
			throw new Error(`Business.getInputHTML(): UID is undefined.`);
		}

		const html = HTML_WORKSHEET.replace(/XX/g, uid);

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
		for (const field_name of Object.keys(ELEMENT_IDS)) {
			const value_type	= ELEMENT_IDS[field_name][0];
			const key_name		= field_name.replace(/-/g, "_");
			const element_id	= `business-${uid}-${field_name}`;
			inputs[key_name]	= HTML.getUserInput(element_id, value_type);
		}
		return inputs;
	}
}
