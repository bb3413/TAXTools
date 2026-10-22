
// Classes
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";

// Modules
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTML }			from "../Modules/HTML.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
		<details class="taxform-details" id="f1099k-XX">
			<summary class="taxform-summary">1099-K - Payment Card and Third
				Party Network Transactions</summary>
			<div>&nbsp;</div>

			<div class="taxform-owner">
				<input type="radio" name="f1099k-XX-owner"
					id="f1099k-XX-is-taxpayers" checked />
				<label for="f1099k-XX-is-taxpayers">
					Taxpayer&apos;s Tax Form</label>

				<input type="radio" name="f1099k-XX-owner"
					id="f1099k-XX-is-spouses" />
				<label for="f1099k-XX-is-spouses">
					Spouse&apos;s Tax Form</label>
				</div>
			</div>

			<div class="f1099-taxform-container">
				<!-- Header Section -->
				<div class="f1099-header-row">
					<div class="f1099-header-left">
					</div>

					<div class="f1099-header-center">
						<div>OMB No. 1545-2205</div>
						<h1><span id="tax-year">202X</span></h1>
						<h2>Form 1099-K</h2>
					</div>

					<div class="f1099-header-right">
						<strong>Payment Card and Third Party Network Transactions</strong>
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
							<textarea id="f1099k-XX-payer"
								placeholder="Payer Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number"></textarea>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">Payer&apos;S TIN</span>
								<input type="text" id="f1099k-XX-ein"
									placeholder="12-3456789" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Taxpayer&apos;S TIN</span>
								<input type="text" id="f1099k-XX-ssn"
									placeholder="123-45-6789" />
							</div>
						</div>

						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">Taxpayer&apos;S name, street
								address, city or town, state, and ZIP code</span>
							<textarea id="f1099k-XX-taxpayer"
								placeholder="Taxpayer&apos;s Name&#10;Street Address&#10;City, State, ZIP"></textarea>
						</div>

						<div class="f1099-box" style="border-bottom: none;">
							<span class="f1099-box-label">Account number (see
								instructions)</span>
							<input type="text" id="f1099k-XX-account"
								placeholder="Optional Account #" />
						</div>
					</div>

					<!-- Right Column: Numbered Input Boxes -->
					<div class="f1099-col-right">
						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">1a Gross amount of payment
									card/third party network transactions</span>
								<input type="text" id="f1099k-XX-01a"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">1b Card Not Present
									transactions</span>
								<input type="text" id="f1099k-XX-01b"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">1c Cash tips</span>
								<input type="text" id="f1099k-XX-01c"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">1d TTOC</span>
								<input type="text" id="f1099k-XX-01d" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">2 Merchant category code</span>
								<input type="text" id="f1099k-XX-02" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">3 Number of payment
									transactions</span>
								<input type="text" id="f1099k-XX-03"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">4 Federal income tax
									withheld</span>
								<input type="text" id="f1099k-XX-04"
									placeholder="0" />
							</div>
							<div class="f1099-box">
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">5a January</span>
								<input type="text" id="f1099k-XX-05a"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">5b February</span>
								<input type="text" id="f1099k-XX-05b"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">5c March</span>
								<input type="text" id="f1099k-XX-05c"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">5d April</span>
								<input type="text" id="f1099k-XX-05d"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">5e May</span>
								<input type="text" id="f1099k-XX-05e"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">5f June</span>
								<input type="text" id="f1099k-XX-05f"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">5g July</span>
								<input type="text" id="f1099k-XX-05g"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">5h August</span>
								<input type="text" id="f1099k-XX-05h"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">5i September</span>
								<input type="text" id="f1099k-XX-05i"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">5j October</span>
								<input type="text" id="f1099k-XX-05j"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">5k November</span>
								<input type="text" id="f1099k-XX-05k"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">5l December</span>
								<input type="text" id="f1099k-XX-05l"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box input-color" style="border-bottom: none;">
								<span class="f1099-box-label">6 State income tax
									withheld</span>
								<input type="text" id="f1099k-XX-06"
									placeholder="0" />
							</div>
							<div class="f1099-box" style="border-bottom: none;">
								<span class="f1099-box-label">7/8 State/state no.</span>
								<input type="text" id="f1099k-XX-07"
									placeholder="State / ID" />
							</div>
						</div>
					</div>
				</div>		<!-- Main grid -->
			</div>		<!-- f1099-taxform-container -->
			<div class="f1099-footer-note">Form <strong>1099-K</strong></div>
			<div>&nbsp;</div>

			<div class="supplemental-line-150-400">
				<p>Name of Business (if applicable)</p>
				<input class="input-field left" type="text" spellcheck="false"
					size="45" id="f1099k-XX-business-name" />
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
	"01c":				["",		true,	""],
	"01d":				["text",	true,	""],
	"02":				["text",	true,	""],
	"03":				["",		true,	""],
	"04":				["",		true,	""],
	"05a":				["",		true,	""],
	"05b":				["",		true,	""],
	"05c":				["",		true,	""],
	"05d":				["",		true,	""],
	"05e":				["",		true,	""],
	"05f":				["",		true,	""],
	"05g":				["",		true,	""],
	"05h":				["",		true,	""],
	"05i":				["",		true,	""],
	"05j":				["",		true,	""],
	"05k":				["",		true,	""],
	"05l":				["",		true,	""],
	"06":				["",		true,	""],
	"07":				["text",	true,	""],
	"business-name":	["text",	true,	""],
};

export class F1099K_HTML extends HTMLBlock {
	static getFieldInfo() {
		return FIELD_INFO;
	}

	static getHTML(uid) {
		return HTML_CODE.replace(/XX/g, uid)
							.replace(/202X/g, TaxTable.getTaxYear());
	}
	constructor() {
		super();
		this.name		= "f1099k";
		this.uid		= HTMLMgr.getMgr().allocateUID(this.name);
		this.html		= F1099K_HTML.getHTML(this.uid);
		this.fields		= F1099K_HTML.getFieldInfo();
	}
}
