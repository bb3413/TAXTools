
// Classes
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";

// Modules
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTML }			from "../Modules/HTML.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
		<details class="taxform-details" id="f1099s-XX">
			<summary class="taxform-summary">1099-S - Proceeds from Real Estate
				Transactions</summary>
			<div>&nbsp;</div>

			<div class="taxform-owner">
				<input type="radio" name="f1099s-XX-owner"
					id="f1099s-XX-is-taxpayers" checked />
				<label for="f1099s-XX-is-taxpayers">
					Taxpayer&apos;s Tax Form</label>

				<input type="radio" name="f1099s-XX-owner"
					id="f1099s-XX-is-spouses" />
				<label for="f1099s-XX-is-spouses">
					Spouse&apos;s Tax Form</label>
				</div>
			</div>

			<div class="f1099-taxform-container">
				<!-- Header Section -->
				<div class="f1099-header-row">
					<div class="f1099-header-left">
					</div>

					<div class="f1099-header-center">
						<div>OMB No. 1545-0997</div>
						<h1><span id="tax-year">202X</span></h1>
						<h2>Form 1099-S</h2>
					</div>

					<div class="f1099-header-right">
						<strong>Proceeds from Real Estate Transactions</strong>
					</div>
				</div>

				<!-- Main Content Grid -->
				<div class="f1099-main-grid">
					<!-- Left Column: Payer & Recipient Info Inputs -->
					<div class="f1099-col-left">
						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">Transferror&apos;S name, street
								address, city or town, state or province, country,
								ZIP or foreign postal code, and telephone no.</span>
							<textarea id="f1099s-XX-payer"
								placeholder="Payer Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number"></textarea>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">Transferror&apos;S TIN</span>
								<input type="text" id="f1099s-XX-ein"
									placeholder="12-3456789" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Taxpayer&apos;S TIN</span>
								<input type="text" id="f1099s-XX-ssn"
									placeholder="123-45-6789" />
							</div>
						</div>

						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">Taxpayer&apos;S name, street
								address, city or town, state, and ZIP code</span>
							<textarea id="f1099s-XX-taxpayer"
								placeholder="Taxpayer&apos;s Name&#10;Street Address&#10;City, State, ZIP"></textarea>
						</div>

						<div class="f1099-box" style="border-bottom: none;">
							<span class="f1099-box-label">Account number (see
								instructions)</span>
							<input type="text" id="f1099s-XX-account"
								placeholder="Optional Account #" />
						</div>
					</div>

					<!-- Right Column: Numbered Input Boxes -->
					<div class="f1099-col-right">
						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">1 Date of closing</span>
								<input type="text" id="f1099s-XX-01"
									placeholder="mm/dd/yyyy" />
							</div>
							<div class="f1099-box input-color">
								<span class="f1099-box-label">2a Total gross proceeds</span>
								<input type="text" id="f1099s-XX-02a"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">2b  Cash gross proceeds</span>
								<input type="text" id="f1099s-XX-02b"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">2c  Digital asset gross
									proceeds</span>
								<input type="text" id="f1099s-XX-02c"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">3 Address (including city,
									state, and ZIP code) or legal description</span>
								<textarea id="f1099s-XX-03"></textarea>
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">4 Buyer&apos;s part of real
									estate tax</span>
								<input type="text" id="f1099s-XX-04"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">5</span>
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">6 If checked, transferor
									received or will receive services or property (other
									than cash, notes, or digital assets) as part of the
									consideration</span>
								<div class="f1099-checkbox-center">
									<input type="checkbox" id="f1099s-XX-06" />
								</div>
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">7 If  If checked, transferor
									is a foreign person (nonresident alien, foreign
									partnership, foreign estate, or foreign trust)</span>
								<div class="f1099-checkbox-center">
									<input type="checkbox" id="f1099s-XX-07" />
								</div>
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">8a Code for digital asset
									received, or to be received, as consideration</span>
								<input type="text" id="f1099s-XX-08a" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">8b Name of digital asset
									received, or to be received, as consideration</span>
								<input type="text" id="f1099s-XX-08b" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box style="border-bottom: none;"">
								<span class="f1099-box-label">8c Number of digital
									asset units received, or to be received, as
									consideration</span>
								<input type="text" id="f1099s-XX-08c" />
							</div>
							<div class="f1099-box style="border-bottom: none;"">
								<span class="f1099-box-label">8d Date digital asset received,
									or to be received, as consideration</span>
								<input type="text" id="f1099s-XX-08d" />
							</div>
						</div>
					</div>
				</div>		<!-- Main grid -->
			</div>		<!-- f1099-taxform-container -->
			<div class="f1099-footer-note">Form <strong>1099-S</strong></div>
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
	"02a":				["",		true,	""],
	"02b":				["",		true,	""],
	"02c":				["",		true,	""],
	"03":				["text",	true,	""],
	"04":				["",		true,	""],
	"05":				["",		true,	""],
	"06":				["",		true,	""],
	"07":				["",		true,	""],
	"08a":				["text",	true,	""],
	"08b":				["text",	true,	""],
	"08c":				["text",	true,	""],
	"08d":				["text",	true,	""],
};

export class F1099S_HTML extends HTMLBlock {
	static getFieldInfo() {
		return FIELD_INFO;
	}

	static getHTML(uid) {
		return HTML_CODE.replace(/XX/g, uid)
							.replace(/202X/g, TaxTable.getTaxYear());
	}

	constructor() {
		super();
		this.name		= "f1099s";
		this.uid		= HTMLMgr.getMgr().allocateUID(this.name);
		this.html		= F1099S_HTML.getHTML(this.uid);
		this.fields		= F1099S_HTML.getFieldInfo();
	}
}
