
// Classes
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";

// Modules
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTML }			from "../Modules/HTML.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
		<details class="taxform-details" id="f1098e-XX">
			<summary class="taxform-summary">1098-E - Student Loan Interest
				Statement</summary>
			<div>&nbsp;</div>

			<div class="taxform-owner">
				<input type="radio" name="f1098e-XX-owner"
					id="f1098e-XX-is-taxpayers" checked />
				<label for="f1098e-XX-is-taxpayers">
					Taxpayer&apos;s Tax Form</label>

				<input type="radio" name="f1098e-XX-owner"
					id="f1098e-XX-is-spouses" />
				<label for="f1098e-XX-is-spouses">
					Spouse&apos;s Tax Form</label>
				</div>
			</div>

			<div class="f1099-taxform-container">
				<!-- Header Section -->
				<div class="f1099-header-row">
					<div class="f1099-header-left">
					</div>

					<div class="f1099-header-center">
						<div>OMB No. 1545-1576</div>
						<h1><span id="tax-year">202X</span></h1>
						<h2>Form 1098-E</h2>
					</div>

					<div class="f1099-header-right">
						<strong>Student Loan Interest Statement</strong>
					</div>
				</div>

				<!-- Main Content Grid -->
				<div class="f1099-main-grid">
					<!-- Left Column: Payer & Recipient Info Inputs -->
					<div class="f1099-col-left">
						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">Recipient/Lender&apos;s name, street
								address, city or town, state or province, country, and
								ZIP or foreign postal code</span>
							<textarea id="f1098e-XX-lender"
								placeholder="Recipient/Lender Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number"></textarea>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">Recipient/Lender&apos;s TIN</span>
								<input type="text" id="f1098e-XX-ein"
									placeholder="12-3456789" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Payer of Record&apos;s TIN</span>
								<input type="text" id="f1098e-XX-ssn"
									placeholder="123-45-6789" />
							</div>
						</div>

						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">Payer of Record&apos;s name, street
								address, city or town, state, and ZIP code</span>
							<textarea id="f1098e-XX-taxpayer"
								placeholder="Payer of Record&apos;s Name&#10;Street Address&#10;City, State, ZIP"></textarea>
						</div>

						<div class="f1099-box" style="border-bottom: none;">
							<span class="f1099-box-label">Account number (see
								instructions)</span>
							<input type="text" id="f1098e-XX-account"
								placeholder="Optional Account #" />
						</div>
					</div>

					<!-- Right Column: Numbered Input Boxes -->
					<div class="f1099-col-right">
						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">1 Student loan interest
									received by lender</span>
								<input type="text" id="f1098e-XX-01"
									placeholder="0" />
							</div>
							<div class="f1099-box">
							</div>
						</div>
					</div>
				</div>		<!-- Main grid -->
			</div>		<!-- f1099-taxform-container -->
			<div class="f1099-footer-note">Form <strong>1098-E</strong></div>
			<div>&nbsp;</div>
		</details>
`;

const FIELD_INFO = {
	// Field Name		Value Type	Is Line	Description
	"is-spouses":		["",		false,	""],
	"lender":			["text",	true,	""],
	"ein":				["text",	true,	""],
	"ssn":				["text",	true,	""],
	"taxpayer":			["text",	true,	""],
	"account":			["text",	true,	""],
	"01":				["",		true,	""],
};

export class F1098E_HTML extends HTMLBlock {
	static getFieldInfo() {
		return FIELD_INFO;
	}

	static getHTML(uid) {
		return HTML_CODE.replace(/XX/g, uid)
							.replace(/202X/g, TaxTable.getTaxYear());
	}

	constructor() {
		super();
		this.name		= "f1098e";
		this.uid		= HTMLMgr.getMgr().allocateUID(this.name);
		this.html		= F1098E_HTML.getHTML(this.uid);
		this.fields		= F1098E_HTML.getFieldInfo();
	}
}
