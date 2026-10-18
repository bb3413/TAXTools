
// Classes
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";

// Modules
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
		<details class="taxform-details" id="income-XX">
			<summary class="trigger taxform-summary" tooltipid="#income-summary-tt">
				Income Not on a Tax Form</summary>
			<div class="input-worksheet-container">
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Jury Duty</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="income-XX-jury-duty"
						size="10" placeholder="0"
						tooltipid="#income-jury-duty-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Alimony Received</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="income-XX-alimony-received"
						size="10" placeholder="0"
						tooltipid="#income-alimony-received-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Divorce Data</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="income-XX-divorce-date"
						size="10" placeholder="mm/dd/yyyy"
						tooltipid="#income-divorce-date-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Gambling Winnings</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="income-XX-gambling"
						size="10" placeholder="0"
						tooltipid="#income-gambling-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Other Income</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="income-XX-other"
						size="10" placeholder="0"
						tooltipid="#income-other-tt" />
				</div>
			</div>		<!-- input-worksheet-container -->
			<div>&nbsp;</div>
		</details>
`;

const FIELD_INFO = {
	// Field Name			Value Type	Is Line	Description
	"jury-duty":			["",		false,	""],
	"alimony-received":		["",		false,	""],
	"divorce-date":			["text",	false,	""],
	"gambling":				["",		false,	""],

};

export class Income extends HTMLBlock {
	static getFieldInfo() {
		return FIELD_INFO;
	}

	static getHTML(uid) {
		return HTML_CODE.replace(/XX/g, uid)
							.replace(/202X/g, TaxTable.getTaxYear());
	}

	constructor() {
		super();
		this.name		= "income";
		this.uid		= HTMLMgr.getMgr().allocateUID(this.name);
		this.html		= Income.getHTML(this.uid);
		this.fields		= Income.getFieldInfo();
	}
}
