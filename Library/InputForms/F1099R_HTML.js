
// Classes
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";

// Modules
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTML }			from "../Modules/HTML.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
		<details class="taxform-details" id="f1099r-XX">
			<summary class="taxform-summary">1099-R - Distributions from Pensions, Annuities,
				Retirement Plans, etc.</summary>
			<div>&nbsp;</div>

			<div class="taxform-owner">
				<input type="radio" name="f1099r-XX-owner"
					id="f1099r-XX-is-taxpayers" checked />
				<label for="f1099r-XX-is-taxpayers">
					Taxpayer&apos;s Tax Form</label>

				<input type="radio" name="f1099r-XX-owner"
					id="f1099r-XX-is-spouses" />
				<label for="f1099r-XX-is-spouses">
					Spouse&apos;s Tax Form</label>
				</div>
			</div>

			<div class="f1099-taxform-container">
				<!-- Header Section -->
				<div class="f1099-header-row">
					<div class="f1099-header-left">
					</div>

					<div class="f1099-header-center">
						<div>OMB No. 1545-0119</div>
						<h1><span id="tax-year">202X</span></h1>
						<h2>Form 1099-R</h2>
					</div>

					<div class="f1099-header-right">
						<strong>Distributions From Pensions, Annuities, Retirement or
						Profit-Sharing Plans, IRAs, Insurance Contracts, etc.</strong>
					</div>
				</div>

				<!-- Main Content Grid -->
				<div class="f1099-main-grid">
					<!-- Left Column: Payer & Recipient Info Inputs -->
					<div class="f1099-col-left">
						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">Payer&apos;S name, street
								address, city or town, state or province, country, and
								ZIP or foreign postal code</span>
							<textarea id="f1099r-XX-payer"
								placeholder="Payer Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number"></textarea>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">Payer&apos;S TIN</span>
								<input type="text" id="f1099r-XX-ein"
									placeholder="12-3456789" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">RECIPIENT&apos;S TIN</span>
								<input type="text" id="f1099r-XX-ssn"
									placeholder="123-45-6789" />
							</div>
						</div>

						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">RECIPIENT&apos;S name, street
								address, city or town, state, and ZIP code</span>
							<textarea id="f1099r-XX-taxpayer"
								placeholder="Taxpayer&apos;s Name&#10;Street Address&#10;City, State, ZIP"></textarea>
						</div>

						<div class="f1099-box" style="border-bottom: none;">
							<span class="f1099-box-label">Account number (see
								instructions)</span>
							<input type="text" id="f1099r-XX-account"
								placeholder="Optional Account #" />
						</div>
					</div>

					<!-- Right Column: Numbered Input Boxes -->
					<div class="f1099-col-right">
						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">1 Gross distribution</span>
								<input type="text" id="f1099r-XX-01"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label"></span>
								<input type="text" placeholder="" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">2a Taxable amount</span>
								<input type="text" id="f1099r-XX-02a"
									placeholder="0" />
							</div>
							<div class="f1099-box input-color">
								<span class="f1099-box-label">2b Taxable amount not
									determined</span>
								<div><input type="checkbox" id="f1099r-XX-02b" /></div>
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Total distribution</span>
								<div><input type="checkbox"/></div>
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">3 Capital gain (included
									in box 2a)</span>
								<input type="text" id="f1099r-XX-03"
									placeholder="0" />
							</div>
							<div class="f1099-box input-color">
								<span class="f1099-box-label">4 Federal income tax
									withheld</span>
								<input type="text" id="f1099r-XX-04"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">5 Employee contrib. /
									Designated Roth</span>
								<input type="text" id="f1099r-XX-05"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">6 Net unrealized
									appreciation</span>
								<input type="text" id="f1099r-XX-06"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">7a Distribution code(s)</span>
								<input type="text" id="f1099r-XX-07a" />
							</div>
							<div class="f1099-box input-color">
								<span class="f1099-box-label">7b IRA/SEP/SIMPLE</span>
								<div><input type="checkbox" id="f1099r-XX-07b" /></div>
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">7c Trump account</span>
								<div><input type="checkbox" id="f1099r-XX-07c" /></div>
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">7d Earnings on excess
									contribution</span>
								<div><input type="text" id="f1099r-XX-07d"
									placeholder="0" /></div>
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label"></span>
								<div></div>
							</div>
							<div class="f1099-box input-color">
								<span class="f1099-box-label">9b Total employee
									contributions</span>
								<input type="text" id="f1099r-XX-09b"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box input-color" style="border-bottom: none;">
								<span class="f1099-box-label">14 State tax withheld</span>
								<input type="text" id="f1099r-XX-14"
									placeholder="0" />
							</div>
							<div class="f1099-box" style="border-bottom: none;">
								<span class="f1099-box-label">15 State/state no.</span>
								<input type="text" id="f1099r-XX-15"
									placeholder="State / ID" />
							</div>
						</div>
					</div>
				</div>		<!-- Main grid -->
			</div>		<!-- f1099-taxform-container -->
			<div class="f1099-footer-note">Form <strong>1099-R</strong></div>
			<div>&nbsp;</div>
		</details>
`;

const FIELD_INFO = {
	// Field Name		Value Type	Is Line	Description
	"is-spouses":		["",		false,	""],
	"is-spouses":		["",		true,	""],
	"payer":			["text",	true,	""],
	"ein":				["text",	true,	""],
	"ssn":				["text",	true,	""],
	"taxpayer":			["text",	true,	""],
	"account":			["text",	true,	""],
	"01":				["",		true,	""],
	"02a":				["",		true,	""],
	"02b":				["",		true,	""],
	"03":				["",		true,	""],
	"04":				["",		true,	""],
	"05":				["",		true,	""],
	"06":				["",		true,	""],
	"07a":				["text",	true,	""],
	"07b":				["",		true,	""],
	"07c":				["",		true,	""],
	"07d":				["",		true,	""],
	"09b":				["",		true,	""],
	"14":				["",		true,	""],
	"15":				["text",	true,	""],
};

export class F1099R_HTML extends HTMLBlock {
	static getFieldInfo() {
		return FIELD_INFO;
	}

	static getHTML(uid) {
		return HTML_CODE.replace(/XX/g, uid)
							.replace(/202X/g, TaxTable.getTaxYear());
	}

	constructor() {
		super();
		this.name		= "f1099r";
		this.uid		= HTMLMgr.getMgr().allocateUID(this.name);
		this.html		= F1099R_HTML.getHTML(this.uid);
		this.fields		= F1099R_HTML.getFieldInfo();
	}
}
