
// Classes
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";

// Modules
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTML }			from "../Modules/HTML.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
		<details class="taxform-details" id="f1099c-XX">
			<summary class="taxform-summary">1099-C - Cancellation of Debt</summary>
			<div>&nbsp;</div>

			<div class="taxform-owner">
				<input type="radio" name="f1099c-XX-owner"
					id="f1099c-XX-is-taxpayers" checked />
				<label for="f1099c-XX-is-taxpayers">
					Taxpayer&apos;s Tax Form</label>

				<input type="radio" name="f1099c-XX-owner"
					id="f1099c-XX-is-spouses" />
				<label for="f1099c-XX-is-spouses">
					Spouse&apos;s Tax Form</label>
				</div>
			</div>

			<div class="f1099-taxform-container">
				<!-- Header Section -->
				<div class="f1099-header-row">
					<div class="f1099-header-left">
					</div>

					<div class="f1099-header-center">
						<div>OMB No. 1545-1424</div>
						<h1><span id="tax-year">202X</span></h1>
						<h2>Form 1099-C</h2>
					</div>

					<div class="f1099-header-right">
						<strong>Cancellation of Debt</strong>
					</div>
				</div>

				<!-- Main Content Grid -->
				<div class="f1099-main-grid">
					<!-- Left Column: Payer & Recipient Info Inputs -->
					<div class="f1099-col-left">
						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">Creditor&apos;S name, street
								address, city or town, state or province, country,
								ZIP or foreign postal code, and telephone no.</span>
							<textarea id="f1099c-XX-payer"
								placeholder="Payer Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number"></textarea>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">Creditor&apos;S TIN</span>
								<input type="text" id="f1099c-XX-ein"
									placeholder="12-3456789" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Debtor&apos;S TIN</span>
								<input type="text" id="f1099c-XX-ssn"
									placeholder="123-45-6789" />
							</div>
						</div>

						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">Debtor&apos;S name, street
								address, city or town, state, and ZIP code</span>
							<textarea id="f1099c-XX-taxpayer"
								placeholder="Taxpayer&apos;s Name&#10;Street Address&#10;City, State, ZIP"></textarea>
						</div>

						<div class="f1099-box" style="border-bottom: none;">
							<span class="f1099-box-label">Account number (see
								instructions)</span>
							<input type="text" id="f1099c-XX-account"
								placeholder="Optional Account #" />
						</div>
					</div>

					<!-- Right Column: Numbered Input Boxes -->
					<div class="f1099-col-right">
						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">1 Date of identifiable
									event</span>
								<input type="text" id="f1099c-XX-01"
									placeholder="mm/dd/yyyy" />
							</div>
							<div class="f1099-box input-color">
								<span class="f1099-box-label">2 Amount of debt
									discharged</span>
								<input type="text" id="f1099c-XX-02"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">3 Interest, if included
									in box 2</span>
								<input type="text" id="f1099c-XX-03"
									placeholder="0" />
							</div>
							<div class="f1099-box">
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">4 Debt description</span>
								<textarea id="f1099c-XX-04"></textarea>
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">5 If checked, the debtor
									was personally liable for repayment of the debt</span>
								<div class="f1099-checkbox-center">
									<input type="checkbox" id="f1099c-XX-05" />
								</div>
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box" style="border-bottom: none;">
								<span class="f1099-box-label">6  Identifiable event
									code</span>
								<input type="text" id="f1099c-XX-06" />
							</div>
							<div class="f1099-box" style="border-bottom: none;">
								<span class="f1099-box-label">7 Fair market value of
									property</span>
								<input type="text" id="f1099c-XX-07"
									placeholder="0" />
							</div>
						</div>
					</div>
				</div>		<!-- Main grid -->
			</div>		<!-- f1099-taxform-container -->
			<div class="f1099-footer-note">Form <strong>1099-C</strong></div>
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
	"01":				["text",	true,	""],
	"02":				["",		true,	""],
	"03":				["",		true,	""],
	"04":				["text",	true,	""],
	"05":				["",		true,	""],
	"06":				["text",	true,	""],
	"07":				["",		true,	""],
};

export class F1099C_HTML extends HTMLBlock {
	static getFieldInfo() {
		return FIELD_INFO;
	}

	static getHTML(uid) {
		return HTML_CODE.replace(/XX/g, uid)
							.replace(/202X/g, TaxTable.getTaxYear());
	}

	constructor() {
		super();
		this.name		= "f1099c";
		this.uid		= HTMLMgr.getMgr().allocateUID(this.name);
		this.html		= F1099C_HTML.getHTML(this.uid);
		this.fields		= F1099C_HTML.getFieldInfo();
	}
}
