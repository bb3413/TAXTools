
// Classes
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";

// Modules
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTML }			from "../Modules/HTML.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
		<details class="taxform-details" id="f1099oid-XX">
			<summary class="taxform-summary">1099-OID - Original Issue Discount</summary>
			<div>&nbsp;</div>

			<div class="taxform-owner">
				<input type="radio" name="f1099oid-XX-owner"
					id="f1099oid-XX-is-taxpayers" checked />
				<label for="f1099oid-XX-is-taxpayers">
					Taxpayer&apos;s Tax Form</label>

				<input type="radio" name="f1099oid-XX-owner"
					id="f1099oid-XX-is-spouses" />
				<label for="f1099oid-XX-is-spouses">
					Spouse&apos;s Tax Form</label>
				</div>
			</div>

			<div class="f1099-taxform-container">
				<!-- Header Section -->
				<div class="f1099-header-row">
					<div class="f1099-header-left">
					</div>

					<div class="f1099-header-center">
						<div>OMB No. 1545-0117</div>
						<h1><span id="tax-year">202X</span></h1>
						<h2>Form 1099-OID</h2>
					</div>

					<div class="f1099-header-right">
						<strong>Original Issue Discount</strong>
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
							<textarea id="f1099oid-XX-payer"
								placeholder="Payer Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number"></textarea>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">Payer&apos;S TIN</span>
								<input type="text" id="f1099oid-XX-ein"
									placeholder="12-3456789" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">RECIPIENT&apos;S TIN</span>
								<input type="text" id="f1099oid-XX-ssn"
									placeholder="123-45-6789" />
							</div>
						</div>

						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">RECIPIENT&apos;S name, street
								address, city or town, state, and ZIP code</span>
							<textarea id="f1099oid-XX-taxpayer"
								placeholder="Taxpayer&apos;s Name&#10;Street Address&#10;City, State, ZIP"></textarea>
						</div>

						<div class="f1099-box" style="border-bottom: none;">
							<span class="f1099-box-label">Account number (see
								instructions)</span>
							<input type="text" id="f1099oid-XX-account"
								placeholder="Optional Account #" />
						</div>
					</div>

					<!-- Right Column: Numbered Input Boxes -->
					<div class="f1099-col-right">
						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">1 Original issue discount for
									the year</span>
								<input type="text" id="f1099oid-XX-01"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">2 Other periodic
									interest</span>
								<input type="text" id="f1099oid-XX-02"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">3 Early withdrawal
									penalty</span>
								<input type="text" id="f1099oid-XX-03"
									placeholder="0" />
							</div>
							<div class="f1099-box input-color">
								<span class="f1099-box-label">4 Federal income tax
									withheld</span>
								<input type="text" id="f1099oid-XX-04"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">5 Market discount</span>
								<input type="text" id="f1099oid-XX-05"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">6  Acquisition premium</span>
								<input type="text" id="f1099oid-XX-06"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">7 Description</span>
								<textarea id="f1099oid-XX-07"></textarea>
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">8 Original issue discount
									on U.S. Treasury obligations</span>
								<input type="text" id="f1099oid-XX-08"
									placeholder="0" />
							</div>
							<div class="f1099-box input-color">
								<span class="f1099-box-label">9  Investment expenses</span>
								<input type="text" id="f1099oid-XX-09"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">10 Bond premium</span>
								<input type="text" id="f1099oid-XX-10"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">11 Tax-exempt OID</span>
								<input type="text" id="f1099oid-XX-11"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box" style="border-bottom: none;">
								<span class="f1099-box-label">12/13 State/state no.</span>
								<input type="text" id="f1099oid-XX-12"
									placeholder="State / ID" />
							</div>
							<div class="f1099-box input-color" style="border-bottom: none;">
								<span class="f1099-box-label">14 State tax withheld</span>
								<input type="text" id="f1099oid-XX-14"
									placeholder="0" />
							</div>

						</div>
					</div>
				</div>		<!-- Main grid -->
			</div>		<!-- f1099-taxform-container -->
			<div class="f1099-footer-note">Form <strong>1099-OID</strong></div>
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
	"01":				["",		true,	""],
	"02":				["",		true,	""],
	"03":				["",		true,	""],
	"04":				["",		true,	""],
	"05":				["",		true,	""],
	"06":				["",		true,	""],
	"07":				["text",	true,	""],
	"08":				["",		true,	""],
	"09":				["",		true,	""],
	"10":				["",		true,	""],
	"11":				["",		true,	""],
	"12":				["text",	true,	""],
	"14":				["",		true,	""],
};

export class F1099OID_HTML extends HTMLBlock {
	static getFieldInfo() {
		return FIELD_INFO;
	}

	static getHTML(uid) {
		return HTML_CODE.replace(/XX/g, uid)
							.replace(/202X/g, TaxTable.getTaxYear());
	}

	constructor() {
		super();
		this.name		= "f1099oid";
		this.uid		= HTMLMgr.getMgr().allocateUID(this.name);
		this.html		= F1099OID_HTML.getHTML(this.uid);
		this.fields		= F1099OID_HTML.getFieldInfo();
	}
}
