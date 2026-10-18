
// Classes
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";

// Modules
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTML }			from "../Modules/HTML.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
		<details class="taxform-details" id="w2-XX">
			<summary class="taxform-summary">W-2 - Wage and Tax Statement</summary>
			<div>&nbsp;</div>

			<div class="taxform-owner">
				<input type="radio" name="w2-XX-owner"
					id="w2-XX-is-taxpayers" checked />
				<label for="w2-XX-is-taxpayers">
					Taxpayer&apos;s Tax Form</label>

				<input type="radio" name="w2-XX-owner"
					id="w2-XX-is-spouses" />
				<label for="w2-XX-is-spouses">
					Spouse&apos;s Tax Form</label>
				</div>
			</div>

			<div class="f1099-taxform-container">
				<!-- Header Section -->
				<div class="f1099-header-row">
					<div class="w2-header-left">
					</div>

					<div class="w2-header-center">
						<span class="f1099-box-label">Employee&apos;s social
							security number</span>
						<input type="text" id="w2-XX-ssn" placeholder="123-45-6789" />
					</div>

					<div class="w2-header-right">
						<div>OMB No. 1545-0029</div>
					</div>
				</div>

				<!-- Main Content Grid -->
				<div class="f1099-main-grid">
					<!-- Left Column: Payer & Recipient Info Inputs -->
					<div class="f1099-col-left">
						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">Employer&apos;s
									identification number (EIN)</span>
								<input type="text" id="w2-XX-ein"
									placeholder="12-3456789" />
							</div>
						</div>

						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">Employer&apos;s name, address,
								and ZIP code</span>
							<textarea id="w2-XX-payer"
								placeholder="Employer&apos;s Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number"></textarea>
						</div>

						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">Employee&apos;s name, address,
								and ZIP code</span>
							<textarea id="w2-XX-taxpayer"
								placeholder="Taxpayer&apos;s Name&#10;Street Address&#10;City, State, ZIP"></textarea>
						</div>
					</div>

					<!-- Right Column: Numbered Input Boxes -->
					<div class="f1099-col-right">
						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">1 Wages, Tips, Other
									Compensation</span>
								<input type="text" id="w2-XX-01" placeholder="0" />
							</div>
							<div class="f1099-box input-color">
								<span class="f1099-box-label">2 Federal income tax
									withheld</span>
								<input type="text" id="w2-XX-02" placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">3 Social security wages</span>
								<input type="text" id="w2-XX-03" placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">4 Social security tax
									withheld</span>
								<input type="text" id="w2-XX-04" placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">5 Medicare wages and
									tips</span>
								<input type="text" id="w2-XX-05" placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">6 Medicare tax withheld</span>
								<input type="text" id="w2-XX-06" placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">7 Social security tips</span>
								<input type="text" id="w2-XX-07" placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">8 Allocated tips</span>
								<input type="text" id="w2-XX-08" placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">9</span>
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">10 Dependent care
									benefits</span>
								<input type="text" id="w2-XX-10" placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">11 Non-qualified plans</span>
								<input type="text" id="w2-XX-11" placeholder="0" />
							</div>
							<div class="f1099-box">
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">13 Statutory employee</span>
								<div><input type="checkbox" id="w2-XX-13a" /></div>
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Retirement plan</span>
								<div><input type="checkbox" id="w2-XX-13b" /></div>
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Third party sick pay</span>
								<div><input type="checkbox" id="w2-XX-13c" /></div>
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">12a Code</span>
								<input type="text" id="w2-XX-12a1" placeholder="" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Value</span>
								<input type="text" id="w2-XX-12a2" placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">12b Code</span>
								<input type="text" id="w2-XX-12b1" placeholder="" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Value</span>
								<input type="text" id="w2-XX-12b2" placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">12c Code</span>
								<input type="text" id="w2-XX-12c1" placeholder="" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Value</span>
								<input type="text" id="w2-XX-12c2" placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">12d Code</span>
								<input type="text" id="w2-XX-12d1" placeholder="" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Value</span>
								<input type="text" id="w2-XX-12d2" placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">14a Code</span>
								<input type="text" id="w2-XX-14a1" placeholder="" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Value</span>
								<input type="text" id="w2-XX-14a2" placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">14b Code</span>
								<input type="text" id="w2-XX-14b1" placeholder="" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Value</span>
								<input type="text" id="w2-XX-14b2" placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">14c Code</span>
								<input type="text" id="w2-XX-14c1" placeholder="" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Value</span>
								<input type="text" id="w2-XX-14c2" placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">14d Code</span>
								<input type="text" id="w2-XX-14d1" placeholder="" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Value</span>
								<input type="text" id="w2-XX-14d2" placeholder="0" />
							</div>
						</div>
					</div>
				</div>		<!-- Main grid -->

				<div class="f1099-header-row">
					<div class="f1099-box">
						<span class="f1099-box-label">15 State ID number</span>
						<input type="text" id="w2-XX-15" placeholder="" />
					</div>
					<div class="f1099-box input-color">
						<span class="f1099-box-label">16 State wages, tips</span>
						<input type="text" id="w2-XX-16" placeholder="" />
					</div>
					<div class="f1099-box input-color">
						<span class="f1099-box-label">17 State income tax</span>
						<input type="text" id="w2-XX-17" placeholder="" />
					</div>
					<div class="f1099-box">
						<span class="f1099-box-label">18 Local wages, tips</span>
						<input type="text" id="w2-XX-18" placeholder="" />
					</div>
					<div class="f1099-box">
						<span class="f1099-box-label">19 Local income tax</span>
						<input type="text" id="w2-XX-19" placeholder="" />
					</div>
					<div class="f1099-box">
						<span class="f1099-box-label">20 Locality name</span>
						<input type="text" id="w2-XX-20" placeholder="" />
					</div>
				</div>
			</div>		<!-- f1099-taxform-container -->
			<div class="f1099-footer-note">Form <strong>W-2</strong></div>
			<div>&nbsp;</div>
		</details>
`;

const FIELD_INFO = {
	// Field Name		Value Type	Is Line	Description
	"is-spouses":		["",		false,	""],
	"ssn":				["text",	true,	""],
	"ein":				["text",	true,	""],
	"payer":			["text",	true,	""],
	"taxpayer":			["text",	true,	""],
	"01":				["",		true,	""],
	"02":				["",		true,	""],
	"03":				["",		true,	""],
	"04":				["",		true,	""],
	"05":				["",		true,	""],
	"06":				["",		true,	""],
	"07":				["",		true,	""],
	"08":				["",		true,	""],
	"10":				["",		true,	""],
	"11":				["",		true,	""],
	"12a1":				["text",	true,	""],
	"12a2":				["",		true,	""],
	"12b1":				["text",	true,	""],
	"12b2":				["",		true,	""],
	"12c1":				["text",	true,	""],
	"12c2":				["",		true,	""],
	"12d1":				["text",	true,	""],
	"12d2":				["",		true,	""],
	"13a":				["",		true,	""],
	"13b":				["",		true,	""],
	"13c":				["",		true,	""],
	"14a1":				["text",	true,	""],
	"14a2":				["",		true,	""],
	"14b1":				["text",	true,	""],
	"14b2":				["",		true,	""],
	"14c1":				["text",	true,	""],
	"14c2":				["",		true,	""],
	"14d1":				["text",	true,	""],
	"14d2":				["",		true,	""],
	"15":				["text",	true,	""],
	"16":				["",		true,	""],
	"17":				["",		true,	""],
	"18":				["",		true,	""],
	"19":				["",		true,	""],
	"20":				["text",	true,	""],
};

export class W2_HTML extends HTMLBlock {
	static getFieldInfo() {
		return FIELD_INFO;
	}

	static getHTML(uid) {
		return HTML_CODE.replace(/XX/g, uid)
							.replace(/202X/g, TaxTable.getTaxYear());
	}

	constructor() {
		super();
		this.name		= "w2";
		this.formname	= "W2";
		this.uid		= HTMLMgr.getMgr().allocateUID(this.name);
		this.html		= W2_HTML.getHTML(this.uid);
		this.fields		= W2_HTML.getFieldInfo();
	}
}
