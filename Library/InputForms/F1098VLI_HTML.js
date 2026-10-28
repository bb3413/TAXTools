
// Classes
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";

// Modules
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTML }			from "../Modules/HTML.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
		<details class="taxform-details" id="f1098vli-XX">
			<summary class="taxform-summary">1098-VLI - Vehicle Loan Interest
				Statement</summary>
			<div>&nbsp;</div>
			
			<div class="taxform-owner">
				<input type="radio" name="f1098vli-XX-owner"
					id="f1098vli-XX-is-taxpayers" checked />
				<label for="f1098vli-XX-is-taxpayers">
					Taxpayer&apos;s Tax Form</label>

				<input type="radio" name="f1098vli-XX-owner"
					id="f1098vli-XX-is-spouses" />
				<label for="f1098vli-XX-is-spouses">
					Spouse&apos;s Tax Form</label>
				</div>
			</div>

			<div class="f1099-taxform-container">
				<!-- Header Section -->
				<div class="f1099-header-row">
					<div class="f1099-header-left">
					</div>

					<div class="f1099-header-center">
						<div>OMB No. 1545-2334</div>
						<h1><span id="tax-year">202X</span></h1>
						<h2>Form 1098-VLI</h2>
					</div>

					<div class="f1099-header-right">
						<strong>Vehicle Loan Interest Statement</strong>
					</div>
				</div>

				<!-- Main Content Grid -->
				<div class="f1099-main-grid">
					<!-- Left Column: Payer & Recipient Info Inputs -->
					<div class="f1099-col-left">
						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">Recipient/Lender&apos;S name, street
								address, city or town, state or province, country, and
								ZIP or foreign postal code</span>
							<textarea id="f1098vli-XX-lender"
								placeholder="Recipient/Lender Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number"></textarea>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">Recipient/Lender&apos;S TIN</span>
								<input type="text" id="f1098vli-XX-ein"
									placeholder="12-3456789" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Payer of Record&apos;S TIN</span>
								<input type="text" id="f1098vli-XX-ssn"
									placeholder="123-45-6789" />
							</div>
						</div>

						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">Payer of Record&apos;S name, street
								address, city or town, state, and ZIP code</span>
							<textarea id="f1098vli-XX-taxpayer"
								placeholder="Payer of Record&apos;s Name&#10;Street Address&#10;City, State, ZIP"></textarea>
						</div>

						<div class="f1099-box" style="border-bottom: none;">
							<span class="f1099-box-label">Account number (see
								instructions)</span>
							<input type="text" id="f1098vli-XX-account"
								placeholder="Optional Account #" />
						</div>
					</div>

					<!-- Right Column: Numbered Input Boxes -->
					<div class="f1099-col-right">
						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">1 Vehicle loan interest
									received by lender</span>
								<input type="text" id="f1098vli-XX-01"
									placeholder="0" />
							</div>
							<div class="f1099-box">
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">2a Year</span>
								<input type="text" id="f1098vli-XX-02a" placeholder="" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">2b Make</span>
								<input type="text" id="f1098vli-XX-02b" placeholder="" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">2c Model</span>
								<input type="text" id="f1098vli-XX-02c" placeholder="" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">2d VIN</span>
								<input type="text" id="f1098vli-XX-02d" placeholder="" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">3a Loan origination date</span>
								<input type="text" id="f1098vli-XX-03a"
									placeholder="mm/dd/yyyy" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">3b Loan acquisition date</span>
								<input type="text" id="f1098vli-XX-03b"
									placeholder="mm/dd/yyyy" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">4 Outstanding principal</span>
								<input type="text" id="f1098vli-XX-04" placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">5 Refund of overpaid
									interest</span>
								<input type="text" id="f1098vli-XX-05" placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">6 Check if original use of
									the vehicle began with the payer of record</span>
								<div><input type="checkbox" id="f1098vli-XX-06" /></div>
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">7 Check if final assembly of
									the vehicle occurred within the United States</span>
								<div><input type="checkbox" id="f1098vli-XX-07"/></div>
							</div>
						</div>
					</div>
				</div>		<!-- Main grid -->
			</div>		<!-- f1099-taxform-container -->
			<div class="f1099-footer-note">Form <strong>1098-VLI</strong></div>
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
	"02a":				["text",	true,	""],
	"02b":				["text",	true,	""],
	"02c":				["text",	true,	""],
	"02d":				["text",	true,	""],
	"03a":				["text",	true,	""],
	"03b":				["text",	true,	""],
	"04":				["",		true,	""],
	"05":				["",		true,	""],
	"06":				["",		true,	""],
	"07":				["",		true,	""],
};

export class F1098VLI_HTML extends HTMLBlock {
	static getFieldInfo() {
		return FIELD_INFO;
	}

	static getHTML(uid) {
		return HTML_CODE.replace(/XX/g, uid)
							.replace(/202X/g, TaxTable.getTaxYear());
	}

	constructor() {
		super();
		this.name		= "f1098vli";
		this.uid		= HTMLMgr.getMgr().allocateUID(this.name);
		this.html		= F1098VLI_HTML.getHTML(this.uid);
		this.fields		= F1098VLI_HTML.getFieldInfo();
	}
}
