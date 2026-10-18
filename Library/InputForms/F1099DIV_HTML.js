
// Classes
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";

// Modules
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTML }			from "../Modules/HTML.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
		<details class="taxform-details" id="f1099div-XX">
			<summary class="taxform-summary">1099-DIV - Dividends and Distributions</summary>
			<div>&nbsp;</div>

			<div class="taxform-owner">
				<input type="radio" name="f1099div-XX-owner"
					id="f1099div-XX-is-taxpayers" checked />
				<label for="f1099div-XX-is-taxpayers">
					Taxpayer&apos;s Tax Form</label>

				<input type="radio" name="f1099div-XX-owner"
					id="f1099div-XX-is-spouses" />
				<label for="f1099div-XX-is-spouses">
					Spouse&apos;s Tax Form</label>
				</div>
			</div>

			<div class="f1099-taxform-container">
				<!-- Header Section -->
				<div class="f1099-header-row">
					<div class="f1099-header-left">
					</div>

					<div class="f1099-header-center">
						<div>OMB No. 1545-0110</div>
						<h1><span id="tax-year">202X</span></h1>
						<h2>Form 1099-DIV</h2>
					</div>

					<div class="f1099-header-right">
						<strong>Dividends and Distributions</strong>
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
							<textarea id="f1099div-XX-payer"
								placeholder="Payer Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number"></textarea>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">Payer&apos;S TIN</span>
								<input type="text" id="f1099div-XX-ein"
									placeholder="12-3456789" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">RECIPIENT&apos;S TIN</span>
								<input type="text" id="f1099div-XX-ssn"
									placeholder="123-45-6789" />
							</div>
						</div>

						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">RECIPIENT&apos;S name, street
								address, city or town, state, and ZIP code</span>
							<textarea id="f1099div-XX-taxpayer"
								placeholder="Taxpayer&apos;s Name&#10;Street Address&#10;City, State, ZIP"></textarea>
						</div>

						<div class="f1099-box" style="border-bottom: none;">
							<span class="f1099-box-label">Account number (see
								instructions)</span>
							<input type="text" id="f1099div-XX-account"
								placeholder="Optional Account #" />
						</div>
					</div>

					<!-- Right Column: Numbered Input Boxes -->
					<div class="f1099-col-right">
						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">1a Total ordinary
									dividends</span>
								<input type="text" id="f1099div-XX-01a"
									placeholder="0" />
							</div>
							<div class="f1099-box input-color">
								<span class="f1099-box-label">1b Qualified dividends</span>
								<input type="text" id="f1099div-XX-01b"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">2a Total capital gain
									distr.</span>
								<input type="text" id="f1099div-XX-02a"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">2b Unrecap. Sec. 1250
									gain</span>
								<input type="text" id="f1099div-XX-02b"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">3 Nondividend
									distributions</span>
								<input type="text" id="f1099div-XX-03"
									placeholder="0" />
							</div>
							<div class="f1099-box input-color">
								<span class="f1099-box-label">4 Federal income tax
									withheld</span>
								<input type="text" id="f1099div-XX-04"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">5 Section 199A dividends</span>
								<input type="text" id="f1099div-XX-05"
									placeholder="0" />
							</div>
							<div class="f1099-box input-color">
								<span class="f1099-box-label">6 Investment expenses</span>
								<input type="text" id="f1099div-XX-06"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">7 Foreign tax paid</span>
								<input type="text" id="f1099div-XX-07"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">8 Foreign country or U.S.
									possession</span>
								<input type="text" id="f1099div-XX-08" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">12 Exempt-interest
									dividends</span>
								<input type="text" id="f1099div-XX-12"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">13 Specified private activity
									bond interest dividends</span>
								<input type="text" id="f1099div-XX-13"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box" style="border-bottom: none;">
								<span class="f1099-box-label">14/15 State/state no.</span>
								<input type="text" id="f1099div-XX-14"
									placeholder="State / ID" />
							</div>
							<div class="f1099-box input-color" style="border-bottom: none;">
								<span class="f1099-box-label">16 State tax withheld</span>
								<input type="text" id="f1099div-XX-16"
									placeholder="0" />
							</div>
						</div>
					</div>
				</div>		<!-- Main grid -->
			</div>		<!-- f1099-taxform-container -->
			<div class="f1099-footer-note">Form <strong>1099-DIV</strong></div>
			<div>&nbsp;</div>
		</details>
`;

const FIELD_INFO = {
	// Field Name		Value Type	Is Line	Description
	"is-spouses":		["",		false,	""],
	"payer":			["",		true,	""],
	"ein":				["",		true,	""],
	"ssn":				["",		true,	""],
	"taxpayer":			["",		true,	""],
	"account":			["",		true,	""],
	"01a":				["",		true,	""],
	"01b":				["",		true,	""],
	"02a":				["",		true,	""],
	"02b":				["",		true,	""],
	"03":				["",		true,	""],
	"04":				["",		true,	""],
	"05":				["",		true,	""],
	"06":				["",		true,	""],
	"07":				["",		true,	""],
	"08":				["",		true,	""],
	"12":				["",		true,	""],
	"13":				["",		true,	""],
	"14":				["",		true,	""],
	"16":				["",		true,	""],
};

export class F1099DIV_HTML extends HTMLBlock {
	static getFieldInfo() {
		return FIELD_INFO;
	}

	static getHTML(uid) {
		return HTML_CODE.replace(/XX/g, uid)
							.replace(/202X/g, TaxTable.getTaxYear());
	}

	constructor() {
		super();
		this.name		= "f1099div";
		this.uid		= HTMLMgr.getMgr().allocateUID(this.name);
		this.html		= F1099DIV_HTML.getHTML(this.uid);
		this.fields		= F1099DIV_HTML.getFieldInfo();
	}
}
