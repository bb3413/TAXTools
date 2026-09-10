
import { HTML }			from "../Classes/HTML.js";
import { Objects }		from "../Classes/Objects.js";
import { Str }			from "../Classes/Str.js";

const ELEMENT_IDS = {
	// Element ID			Value Type
	"healthcare":			[],
	"dental":				[],
	"medicare":				[],
	"taxpayer-ltc":			[],
	"spouse-ltc":			[],

	"doctor":				[],
	"prescriptions":		[],
	"medical-aids":			[],
	"medical-facilities":	[],
	"nursing-services":		[],
	"medical-miles":		[],
	"other-medical":		[],

	"est-payments-federal":	[],
	"est-payments-state":	[],
	"property-tax":			[],
	"personal-property-tax":[],
	"extra-sales-tax":		[],
	"foreign-tax":			[],

	"cash-donations":		[],
	"noncash-donations":	[],
	"charitable-miles":		[],

	"educator-taxpayer":	[],
	"educator-spouse":		[],
	"alimony-paid":			[],
	"divorce-date":			[],
	"tax-preparation":		[],
	"investment-expenses":	[],
};

const HTML_WORKSHEET = `
		<details class="taxform-details" id="expenses-XX-container">
			<summary class="taxform-summary">Expenses</summary>
			<div class="input-worksheet-container">
				<h3>Medical Insurance Premiums</h3>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Healthcare</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="expenses-XX-healthcare"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Dental, Vision</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="expenses-XX-dental"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Medicare</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="expenses-XX-medicare"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">LTC Taxpayer</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="expenses-XX-taxpayer-ltc"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">LTC Spouse</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="expenses-XX-spouse-ltc"
						size="10" placeholder="0" />
				</div>

				<h3>Other Medical Expenses</h3>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Payments to Doctors,
						Dentists, etc.</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="expenses-XX-doctor"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Prescriptions</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="expenses-XX-prescriptions"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Medical Aids (glasses,
						hearing aids, etc.)</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="expenses-XX-medical-aids"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Medical Facilities</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="expenses-XX-medical-facilities"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Nursing Services</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="expenses-XX-nursing-services"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Medical Miles Driven</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="expenses-XX-medical-miles"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Other Medical Expenses</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="expenses-XX-other-medical"
						size="10" placeholder="0" />
				</div>

				<h3>Taxes Paid</h3>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Estimated Payments - Federal</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="expenses-XX-est-payments-federal"
						size="10" placeholder="0" />
				</div>

				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Estimated Payments - State</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="expenses-XX-est-payments-state"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Property Tax</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="expenses-XX-property-tax"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Personal Property Tax</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="expenses-XX-personal-property-tax"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Extra Sales tax</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="expenses-XX-extra-sales-tax"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Forengin Tax (not entered
						elsewhere)</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="expenses-XX-foreign-tax"
						size="10" placeholder="0" />
				</div>

				<h3>Charitable Donations</h3>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Cash Donations to Charity</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="expenses-XX-cash-donations"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Non-cash Donations to
						Charity</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="expenses-XX-noncash-donations"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Miles Driven for Charity</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="expenses-XX-charitable-miles"
						size="10" placeholder="0" />
				</div>

				<h3>Other Expnses</h3>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Educator Expense - Taxpayer</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="expenses-XX-educator-taxpayer"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Educator Expense - Spouse</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="expenses-XX-educator-spouse"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Alimony Paid</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="expenses-XX-alimony-paid"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Divorce Date</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="expenses-XX-divorce-date"
						size="10" placeholder="mm/dd/yyyy" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Tax Preparation Fees</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="expenses-XX-tax-preparation"
						size="10" placeholder="0" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Investment Expenses</div>
					<input class="input-worksheet-row-value input-field"
						type="text" id="expenses-XX-investment-expenses"
						size="10" placeholder="0" />
				</div>
				<p>&nbsp;</p>
			</div>
		</details>
`;

export class Expenses {
	static getInputHTML(uid = 1) {
		if (!uid) {
			throw new Error(`Expenses.getInputHTML(): UID is undefined.`);
		}

		const html = HTML_WORKSHEET.replace(/XX/g, uid);

		return [ `expenses-${uid}-container`, html ];
	}

	static getUserInput(uid = 1) {
		//
		// Read the fields of the worksheet from the web and return an object with the
		// values.
		//
		if (!uid) {
			throw new Error(`Expenses.getUserInput(): UID is undefined.`);
		}

		// Make sure the worksheet exists.
		const element = document.getElementById(`expenses-${uid}-container`);
		if (!element) {
			throw new Error(
				`Expenses.getUserInput(): Element not found: expenses-${uid}-container`);
		}

		let inputs = {};
		for (const field_name of Object.keys(ELEMENT_IDS)) {
			const value_type	= ELEMENT_IDS[field_name][0];
			const key_name		= field_name.replace(/-/g, "_");
			const element_id	= `expenses-${uid}-${field_name}`;
			inputs[key_name]	= HTML.getUserInput(element_id, value_type);
		}

		return inputs;
	}
}
