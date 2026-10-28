
// Classes
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";

// Modules
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTML }			from "../Modules/HTML.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
		<details class="taxform-details" id="f1099nec-XX">
			<summary class="taxform-summary">1099-NEC - Non-employee Compensation</summary>
			<div>&nbsp;</div>

			<div class="taxform-owner">
				<input type="radio" name="f1099nec-XX-owner"
					id="f1099nec-XX-is-taxpayers" checked />
				<label for="f1099nec-XX-is-taxpayers">
					Taxpayer&apos;s Tax Form</label>

				<input type="radio" name="f1099nec-XX-owner"
					id="f1099nec-XX-is-spouses" />
				<label for="f1099nec-XX-is-spouses">
					Spouse&apos;s Tax Form</label>
				</div>
			</div>

			<div class="f1099-taxform-container">
				<!-- Header Section -->
				<div class="f1099-header-row">
					<div class="f1099-header-left">
					</div>

					<div class="f1099-header-center">
						<div>OMB No. 1545-0116</div>
						<h1><span id="tax-year">202X</span></h1>
						<h2>Form 1099-NEC</h2>
					</div>

					<div class="f1099-header-right">
						<strong>Nonemployee Compensation</strong>
					</div>
				</div>

				<!-- Main Content Grid -->
				<div class="f1099-main-grid">
					<!-- Left Column: Payer & Recipient Info Inputs -->
					<div class="f1099-col-left">
						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">Payer&apos;S name, street
								address, city or town, state or province, country,
								ZIP or foreign postal code, and telephone no.</span>
							<textarea id="f1099nec-XX-payer"
								placeholder="Payer Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number"></textarea>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">Payer&apos;S TIN</span>
								<input type="text" id="f1099nec-XX-ein"
									placeholder="12-3456789" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">RECIPIENT&apos;S TIN</span>
								<input type="text" id="f1099nec-XX-ssn"
									placeholder="123-45-6789" />
							</div>
						</div>

						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">RECIPIENT&apos;S name, street
								address, city or town, state, and ZIP code</span>
							<textarea id="f1099nec-XX-taxpayer"
								placeholder="Taxpayer&apos;s Name&#10;Street Address&#10;City, State, ZIP"></textarea>
						</div>

						<div class="f1099-box" style="border-bottom: none;">
							<span class="f1099-box-label">Account number (see
								instructions)</span>
							<input type="text" id="f1099nec-XX-account"
								placeholder="Optional Account #" />
						</div>
					</div>

					<!-- Right Column: Numbered Input Boxes -->
					<div class="f1099-col-right">
						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">1a Non-employee
									compensation</span>
								<input type="text" id="f1099nec-XX-01a"
									placeholder="0" />
							</div>
							<div class="f1099-box input-color">
								<span class="f1099-box-label">1b Cash tips</span>
								<input type="text" id="f1099nec-XX-01b"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">1c TTOC</span>
								<input type="text" id="f1099nec-XX-01c" />
							</div>
							<div class="f1099-box input-color">
								<span class="f1099-box-label">1d Overtime compensation</span>
								<input type="text" id="f1099nec-XX-01d"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">2 Payer made direct sales
									totaling $5,000 or more of consumer products</span>
								<div class="f1099-checkbox-center">
									<input type="checkbox" id="f1099nec-XX-02" />
								</div>
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">3 Excess golden parachute
									payments</span>
								<input type="text" id="f1099nec-XX-03"
									placeholder="0" />
							</div>
							<div class="f1099-box input-color">
								<span class="f1099-box-label">4 Federal income tax
									withheld</span>
								<input type="text" id="f1099nec-XX-04"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">5 State tax withheld</span>
								<input type="text" id="f1099nec-XX-05"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">6 State/state no.</span>
								<input type="text" id="f1099nec-XX-06"
									placeholder="State / ID" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">7 State income</span>
								<input type="text" id="f1099nec-XX-07"
									placeholder="0" />
							</div>
						</div>
					</div>
				</div>		<!-- Main grid -->
			</div>		<!-- f1099-taxform-container -->
			<div class="f1099-footer-note">Form <strong>1099-NEC</strong></div>
			<div>&nbsp;</div>

			<div class="supplemental-line-150-400">
				<p>Name of Business</p>
				<input class="input-field left" type="text" spellcheck="false"
					size="45" id="f1099nec-XX-business-name" />
			</div>
			<div>&nbsp;</div>
		</details>
`;

const FIELD_INFO = {
	// Field Name		Value Type	Is Line	Description
	"is-spouses":		["",		false,	""],
	"payer":			["text",	true,	""],
	"ein":				["text",	true,	""],
	"ssn":				["text",	true,	""],
	"taxpayer":			["text",	true,	""],
	"account":			["text",	true,	""],
	"01a":				["",		true,	""],
	"01b":				["",		true,	""],
	"01c":				["text",	true,	""],
	"01d":				["",		true,	""],
	"02":				["",		true,	""],
	"03":				["",		true,	""],
	"04":				["",		true,	""],
	"05":				["",		true,	""],
	"06":				["text",	true,	""],
	"07":				["",		true,	""],
	"business-name":	["text",	true,	""],
};

export class F1099NEC_HTML extends HTMLBlock {
	static getFieldInfo() {
		return FIELD_INFO;
	}

	static getHTML(uid) {
		return HTML_CODE.replace(/XX/g, uid)
							.replace(/202X/g, TaxTable.getTaxYear());
	}

	constructor() {
		super();
		this.name		= "f1099nec";
		this.uid		= HTMLMgr.getMgr().allocateUID(this.name);
		this.html		= F1099NEC_HTML.getHTML(this.uid);
		this.fields		= F1099NEC_HTML.getFieldInfo();
	}
}
