
// Classes
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";

// Modules
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
		<details class="taxform-details" id="expenses-XX">
			<summary class="trigger taxform-summary" tooltipid="#expenses-summary-tt">
				Expenses</summary>
			<div class="input-worksheet-container">
				<h3>Medical Insurance Premiums</h3>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Healthcare Insurance</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-XX-healthcare"
						size="10" placeholder="0"
						tooltipid="#expenses-healthcare-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Dental and Vision Insurance</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-XX-dental"
						size="10" placeholder="0"
						tooltipid="#expenses-dental-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Medicare</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-XX-medicare"
						size="10" placeholder="0"
						tooltipid="#expenses-medicare-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Long Term Care (LTC) Insurance
						for the Taxpayer</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-XX-taxpayer-ltc"
						size="10" placeholder="0"
						tooltipid="#expenses-taxpayer-ltc-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Long Term Care (LTC) Insurance
						for the Spouse</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-XX-spouse-ltc"
						size="10" placeholder="0"
						tooltipid="#expenses-spouse-ltc-tt" />
				</div>

				<h3>Other Medical Expenses</h3>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Payments to Doctors,
						Dentists, etc.</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-XX-doctor"
						size="10" placeholder="0"
						tooltipid="#expenses-doctor-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Prescriptions</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-XX-prescriptions"
						size="10" placeholder="0"
						tooltipid="#expenses-prescriptions-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Medical Aids (glasses,
						hearing aids, etc.)</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-XX-medical-aids"
						size="10" placeholder="0"
						tooltipid="#expenses-medical-aids-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Medical Facilities</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-XX-medical-facilities"
						size="10" placeholder="0"
						tooltipid="#expenses-medical-facilities-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Nursing Services</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-XX-nursing-services"
						size="10" placeholder="0"
						tooltipid="#expenses-nursing-services-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Medical Miles Driven</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-XX-medical-miles"
						size="10" placeholder="0"
						tooltipid="#expenses-medical-miles-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Other Medical Expenses</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-XX-other-medical"
						size="10" placeholder="0"
						tooltipid="#expenses-other-medical-tt" />
				</div>

				<h3>Taxes Paid</h3>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Estimated Payments - Federal</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-XX-est-payments-federal"
						size="10" placeholder="0"
						tooltipid="#expenses-est-payments-federal-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Estimated Payments - State</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-XX-est-payments-state"
						size="10" placeholder="0"
						tooltipid="#expenses-est-payments-state-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">State Tax Due (from last
						year&apos;s taxes)</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-XX-state-tax-due"
						size="10" placeholder="0"
						tooltipid="#expenses-state-tax-due-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Property Tax</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-XX-property-tax"
						size="10" placeholder="0"
						tooltipid="#expenses-property-tax-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Personal Property Tax</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-XX-personal-property-tax"
						size="10" placeholder="0"
						tooltipid="#expenses-personal-property-tax-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Extra Sales tax</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-XX-extra-sales-tax"
						size="10" placeholder="0"
						tooltipid="#expenses-extra-sales-tax-tt" />
				</div>

				<h3>Charitable Donations</h3>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Cash Donations to Charity</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-XX-cash-donations"
						size="10" placeholder="0"
						tooltipid="#expenses-cash-donations-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Non-cash Donations to
						Charity</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-XX-noncash-donations"
						size="10" placeholder="0"
						tooltipid="#expenses-noncash-donations-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Miles Driven for Charity</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-XX-charitable-miles"
						size="10" placeholder="0"
						tooltipid="#expenses-charitable-miles-tt" />
				</div>

				<h3>Other Expenses</h3>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Educator Expenses - Taxpayer</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-XX-educator-taxpayer"
						size="10" placeholder="0"
						tooltipid="#expenses-educator-taxpayer-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Educator Expenses - Spouse</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-XX-educator-spouse"
						size="10" placeholder="0"
						tooltipid="#expenses-educator-taxpayer-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Alimony Paid</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-XX-alimony-paid"
						size="10" placeholder="0"
						tooltipid="#expenses-alimony-paid-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Divorce Date</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-XX-divorce-date"
						size="10" placeholder="mm/dd/yyyy"
						tooltipid="#expenses-divorce-date-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Tax Preparation Fees</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-XX-tax-preparation"
						size="10" placeholder="0"
						tooltipid="#expenses-tax-preparation-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Investment Expenses</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-XX-investment-expenses"
						size="10" placeholder="0"
						tooltipid="#expenses-investment-expenses-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">IRA Contribution - Taxpayer</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-XX-ira-contribution-taxpayer"
						size="10" placeholder="0"
						tooltipid="#expenses-ira-contribution-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">IRA Contribution - Spouse</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-XX-ira-contribution-spouse"
						size="10" placeholder="0"
						tooltipid="#expenses-ira-contribution-tt" />
				</div>
				<p>&nbsp;</p>
			</div>
		</details>
`;

const FIELD_INFO = {
	// Field Name					Value Type	Is Line	Description
	"healthcare":					[""],
	"dental":						["",		false,	""],
	"medicare":						["",		false,	""],
	"taxpayer-ltc":					["",		false,	""],
	"spouse-ltc":					["",		false,	""],

	"doctor":						["",		false,	""],
	"prescriptions":				["",		false,	""],
	"medical-aids":					["",		false,	""],
	"medical-facilities":			["",		false,	""],
	"nursing-services":				["",		false,	""],
	"medical-miles":				["",		false,	""],
	"other-medical":				["",		false,	""],

	"est-payments-federal":			["",		false,	""],
	"est-payments-state":			["",		false,	""],
	"state-tax-due":				["",		false,	""],
	"property-tax":					["",		false,	""],
	"personal-property-tax":		["",		false,	""],
	"extra-sales-tax":				["",		false,	""],

	"cash-donations":				["",		false,	""],
	"noncash-donations":			["",		false,	""],
	"charitable-miles":				["",		false,	""],

	"educator-taxpayer":			["",		false,	""],
	"educator-spouse":				["",		false,	""],
	"alimony-paid":					["",		false,	""],
	"divorce-date":					["text",	false,	""],
	"tax-preparation":				["",		false,	""],
	"investment-expenses":			["",		false,	""],
	"ira-contribution-taxpayer":	["",		false,	""],
	"ira-contribution-spouse":		["",		false,	""],
};

export class Expenses extends HTMLBlock {
	static getFieldInfo() {
		return FIELD_INFO;
	}

	static getHTML(uid) {
		return HTML_CODE.replace(/XX/g, uid)
							.replace(/202X/g, TaxTable.getTaxYear());
	}

	constructor() {
		super();
		this.name		= "expenses";
		this.uid		= HTMLMgr.getMgr().allocateUID(this.name);
		this.html		= Expenses.getHTML(this.uid);
		this.fields		= Expenses.getFieldInfo();
	}
}
