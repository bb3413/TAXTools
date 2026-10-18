
// Classes
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";

// Modules
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTML }			from "../Modules/HTML.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
		<details class="taxform-details" id="ssa1099-XX">
			<summary class="taxform-summary">SSA-1099 - Social Security Benefit
				Statement</summary>
			<div>&nbsp;</div>
			<div class="ssa-outside-header">Form SSA-1099 - Social Security
				Benefit Statement</div>

			<div class="taxform-owner">
				<input type="radio" name="ssa1099-XX-owner"
					id="ssa1099-XX-is-taxpayers" checked />
				<label for="ssa1099-XX-is-taxpayers">
					Taxpayer&apos;s Tax Form</label>

				<input type="radio" name="ssa1099-XX-owner"
					id="ssa1099-XX-is-spouses" />
				<label for="ssa1099-XX-is-spouses">
					Spouse&apos;s Tax Form</label>
				</div>
			</div>

			<div class="f1099-taxform-container">
				<!-- Header Section -->
				<div class="f1099-header-row">
					<div class="ssa-header-left">
						<h1><span id="tax-year">202X</span></h1>
					</div>
					<div class="ssa-header-right">
						<ul>
							<li>Part of your Social Security benefits shown in box 5 may
								be taxable income.</li>
							<li>See the reverse for more information.</li>
						</ul>
					</div>
				</div>

				<div class="ssa-row-1">
					<div class="f1099-box ssa-border-right">
						<span class="f1099-box-label">Box 1. Name</span>
						<input type="text" id="ssa1099-XX-01"
							placeholder="Beneficiary&apos;s name" />
					</div>
					<div class="f1099-box">
						<span class="f1099-box-label">Box 2. Beneficiary&apos;s Social
							Security Number</span>
						<input type="text" id="ssa1099-XX-02"
							placeholder="123-45-6789" />
					</div>
				</div>

				<div class="ssa-row-2">
					<div class="f1099-box ssa-border-right">
						<span class="f1099-box-label">Box 3. Benefits Paid in 202X</span>
						<input type="text" id="ssa1099-XX-03"
							placeholder="0" />
					</div>
					<div class="f1099-box ssa-border-right">
						<span class="f1099-box-label">Box 4. Benefits Repaid to SSA in
							202X</span>
						<input type="text" id="ssa1099-XX-04"
							placeholder="0" />
					</div>
					<div class="f1099-box input-color">
						<span class="f1099-box-label">Box 5. Net Benefits for 202X (Box 3
							minus Box 4)</span>
						<input type="text" id="ssa1099-XX-05"
							placeholder="0" />
					</div>
				</div>

				<!-- Main Content Grid -->
				<div class="f1099-main-grid">
					<!-- Left Column: Payer & Recipient Info Inputs -->
					<div class="f1099-col-left">
						<div class="f1099-box f1099-box-large" style="border-bottom: none;">
							<h2 class="ssa-subheading">Description of Amount in Box 3</h2>
							<div class="ssa-label-group input-color">
								<span class="f1099-box-label">
									<label for="ssa-XX-03a">Medicare Part B:</label>
								</span>
								<input type="text" id="ssa1099-XX-03a" name="ssa-XX-03a"
									placeholder="0" />
							</div>
							<div class="ssa-label-group input-color">
								<span class="f1099-box-label">
									<label for="ssa-XX-03b">Medicare Part D:</label>
								</span>
								<input type="text" id="ssa1099-XX-03b" name="ssa-XX-03b"
									placeholder="0" />
							</div>
						</div>
					</div>

					<!-- Right Column: Numbered Input Boxes -->
					<div class="f1099-col-right">
						<div class="f1099-box f1099-box-large">
							<h2 class="ssa-subheading">Description of Amount in Box 4</h2>
							<textarea id="ssa1099-XX-04" placeholder=""></textarea>
						</div>
						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">Box 6. Voluntary Federal
									Income Tax Withheld</span>
								<input type="text" id="ssa1099-XX-06"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">Box 7. Address</span>
								<textarea id="ssa1099-XX-07"
									placeholder="Payer Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number"></textarea>
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box" style="border-bottom: none;">
								<span class="f1099-box-label">Box 8. Claim Number</span>
								<input type="text" id="ssa1099-XX-08"
									placeholder="Optional Account #" />
							</div>
						</div>
					</div>		<!-- f1099-col-right -->
				</div>		<!-- f1099-main-grid -->
			</div>		<!-- f1099-taxform-container -->
			<div class="f1099-footer-note">Form <strong>SSA-1099</strong></div>
			<div>&nbsp;</div>
		</details>
`;

const FIELD_INFO = {
	// Field Name		Value Type	Is Line	Description
	"is-spouses":		["",		false,	""],
	"01":				["text",	true,	""],
	"02":				["text",	true,	""],
	"03":				["",		true,	""],
	"03a":				["",		true,	""],
	"03b":				["",		true,	""],
	"04":				["text",	true,	""],
	"05":				["",		true,	""],
	"06":				["",		true,	""],
	"07":				["text",	true,	""],
	"08":				["text",	true,	""],
};

export class SSA1099_HTML extends HTMLBlock {
	static getFieldInfo() {
		return FIELD_INFO;
	}

	static getHTML(uid) {
		return HTML_CODE.replace(/XX/g, uid)
							.replace(/202X/g, TaxTable.getTaxYear());
	}

	constructor() {
		super();
		this.name		= "ssa1099";
		this.uid		= HTMLMgr.getMgr().allocateUID(this.name);
		this.html		= SSA1099_HTML.getHTML(this.uid);
		this.fields		= SSA1099_HTML.getFieldInfo();
	}
}
