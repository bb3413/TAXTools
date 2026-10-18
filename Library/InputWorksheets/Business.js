
// Classes
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";

// Modules
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
		<details class="taxform-details" id="business-XX">
			<summary class="taxform-summary">Small Business #-UID-</summary>
			<div class="input-worksheet-container">
				<div class="taxpayer-info-150-400">
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

const FIELD_INFO = {
	// Field Name			Value Type	Is Line	Description
	"name":					["text",	false,	""],
	"cash-income":			["",		false,	""],
	"advertising":			["",		false,	""],
	"commissions":			["",		false,	""],
	"insurance":			["",		false,	""],
	"interest":				["",		false,	""],
	"office-supplies":		["",		false,	""],
	"utilities":			["",		false,	""],
	"licenses":				["",		false,	""],
	"training":				["",		false,	""],
	"tools":				["",		false,	""],
	"travel":				["",		false,	""],
	"meals":				["",		false,	""],
	"rent":					["",		false,	""],
	"business-miles":		["",		false,	""],
	"tolls":				["",		false,	""],
	"other-expenses":		["",		false,	""],
};

export class Business extends HTMLBlock {
	static getFieldInfo() {
		return FIELD_INFO;
	}

	static getHTML(uid) {
		return HTML_CODE.replace(/XX/g, uid)
							.replace(/202X/g, TaxTable.getTaxYear());
	}

	constructor() {
		super();
		this.name		= "business";
		this.uid		= HTMLMgr.getMgr().allocateUID(this.name);
		this.html		= Business.getHTML(this.uid);
		this.fields		= Business.getFieldInfo();
	}
}
