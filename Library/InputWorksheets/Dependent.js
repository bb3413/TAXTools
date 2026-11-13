
// Classes
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";

// Modules
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTML }			from "../Modules/HTML.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
		<details class="taxform-details" id="dependent-XX">
			<summary class="taxform-summary">Dependent</summary>
			<div class="input-worksheet-container">
				<div class="taxpayer-info-150-400">
					<p>Name</p>
					<input class="trigger input-field left"
						type="text" autofocus spellcheck="false" size="45"
						id="dependent-XX-dependent-name" tooltipid="#dependent-dependent-name-tt" />
				</div>
				<div class="taxpayer-info-150-400">
					<p>Relationship</p>
					<select class="trigger input-field left" id="dependent-XX-relationship"
							tooltipid="#dependent-relationship-tt">
						<option value="NONE"></option>
						<option value="CHILD">			Child (son or daughter),
														Step-child, Foster-child, or Adopted-child,
														or a decendent of one of these.
														</option>
						<option value="SIBLING">		Sibling (brother or sister),
														Half-sibling, Step-sibling, or Foster-sibling,
														or a decendent of one of these.
														</option>
						<option value="PARENT">			Parent (mother or father),
														or an ancestor of one of these.
														</option>
						<option value="STEP-PARENT">	Step-mother or Step-father</option>
						<option value="AUNT-UNCLE">	 	Aunt or Uncle</option>
						<option value="IN-LAW">	 		Mother-in-law or Father-in-law,
														Daughter-in-law or Son-in-law,
														or Sister-in-law or Brother-in-law	
														</option>
						<option value="NOT_RELATED">	Not related</option>
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
						placeholder="12" tooltipid="#dependent-months-lived-at-home-tt" />
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
					<input class="trigger checkbox" type="checkbox" checked
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
						<label class="radio-button">
							<input type="radio" name="dependent-XX-has-ssn"
								id="dependent-XX-has-ssn"
								checked />
							SSN
						</label>
						<label class="radio-button">
							<input type="radio" name="dependent-XX-has-ssn"
								id="dependent-XX-has-itin" />
							ITIN
						</label>
						<label class="radio-button">
							<input type="radio" name="dependent-XX-has-ssn"
								id="dependent-XX-has-atin" />
							ATIN
						</label>
					</div>
				</div>

			</div>
		</details>
`;

const FIELD_INFO = {
	// Field Name			Value Type	Is Line	Description
	"dependent-name":		["text",	false,	""],
	"birthday":				["text",	false,	""],
	"relationship":			["text",	false,	""],
	"months-lived-at-home":	["text",	false,	""],
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
}
