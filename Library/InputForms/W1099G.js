
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTML }			from "../Modules/HTML.js";
import { Line }			from "../Classes/Line.js";
import { Objects }		from "../Modules/Objects.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";
import { Refund }		from "../Worksheets/Refund.js";

import { TAXTOOL_CONTAINER } from "../TAXTools/TAXTools.js";

const FIELDS = {
	// Field Name		Value Type	Line	Description
	"is-spouses":		["",		true,	""],
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
	"07":				["",		true,	""],
	"08":				["",		true,	""],
	"09":				["",		true,	""],
	"10":				["",		true,	""],
	"11":				["text",	true,	""],
	"12":				["",		true,	""],
	"prev-itemized":	["",		true,	""],
	"prev-5d":			["",		true,	""],
	"prev-5e":			["",		true,	""],
};

const HTML_CODE = `
		<details class="taxform-details" id="f1099g-XX-container">
			<summary class="taxform-summary">1099-G - Certain Government Payments</summary>
			<div>&nbsp;</div>

			<div class="taxform-owner">
				<input type="radio" name="f1099g-XX-owner"
					id="f1099g-XX-is-taxpayers" checked />
				<label for="f1099g-XX-is-taxpayers">
					Taxpayer&apos;s Tax Form</label>

				<input type="radio" name="f1099g-XX-owner"
					id="f1099g-XX-is-spouses" />
				<label for="f1099g-XX-is-spouses">
					Spouse&apos;s Tax Form</label>
				</div>
			</div>

			<div class="f1099-taxform-container">
				<!-- Header Section -->
				<div class="f1099-header-row">
					<div class="f1099-header-left">
					</div>

					<div class="f1099-header-center">
						<div>OMB No. 1545-0120</div>
						<h1><span id="tax-year">202X</span></h1>
						<h2>Form 1099-G</h2>
					</div>

					<div class="f1099-header-right">
						<strong>Certain Government Payments</strong>
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
							<textarea id="f1099g-XX-payer"
								placeholder="Payer Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number"></textarea>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">Payer&apos;S TIN</span>
								<input type="text" id="f1099g-XX-ein"
									placeholder="12-3456789" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">RECIPIENT&apos;S TIN</span>
								<input type="text" id="f1099g-XX-ssn"
									placeholder="123-45-6789" />
							</div>
						</div>

						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">RECIPIENT&apos;S name, street
								address, city or town, state, and ZIP code</span>
							<textarea id="f1099g-XX-taxpayer"
								placeholder="Taxpayer&apos;s Name&#10;Street Address&#10;City, State, ZIP"></textarea>
						</div>

						<div class="f1099-box" style="border-bottom: none;">
							<span class="f1099-box-label">Account number (see
								instructions)</span>
							<input type="text" id="f1099g-XX-account"
								placeholder="Optional Account #" />
						</div>
					</div>

					<!-- Right Column: Numbered Input Boxes -->
					<div class="f1099-col-right">
						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">1 Unemployment
									compensation</span>
								<input type="text" id="f1099g-XX-01"
									placeholder="0" />
							</div>
							<div class="f1099-box input-color">
								<span class="f1099-box-label">2 State or local income tax
									refunds, credits, or offsets</span>
								<input type="text" id="f1099g-XX-02"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">3 Box 2 amount is for
									tax year</span>
								<input type="text" id="f1099g-XX-03"
									placeholder="0" />
							</div>
							<div class="f1099-box input-color">
								<span class="f1099-box-label">4  Federal income tax
									withheld</span>
								<input type="text" id="f1099g-XX-04"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">5 RTAA payments</span>
								<input type="text" id="f1099g-XX-05"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">6 Taxable grants</span>
								<input type="text" id="f1099g-XX-06"
									placeholder="0" />
							</div>
						</div>
						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">7 Agriculture payments</span>
								<input type="text" id="f1099g-XX-07"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">8 Check if box 2 is trade
									or f1099g income</span>
								<div class="f1099-checkbox-center">
									<input type="checkbox" id="f1099g-XX-08" />
								</div>
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">9 Market gain</span>
								<input type="text" id="f1099g-XX-09"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">10 Family leave benefits</span>
								<input type="text" id="f1099g-XX-10"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box" style="border-bottom: none;">
								<span class="f1099-box-label">11 State/state no.</span>
								<input type="text" id="f1099g-XX-11"
									placeholder="State / ID" />
							</div>
							<div class="f1099-box input-color" style="border-bottom: none;">
								<span class="f1099-box-label">12 State income tax
									withheld</span>
								<input type="text" id="f1099g-XX-12"
									placeholder="0" />
							</div>
						</div>
					</div>
				</div>		<!-- Main grid -->
			</div>		<!-- f1099-taxform-container -->
			<div class="f1099-footer-note">Form <strong>1099-G</strong></div>

			<p>If this 1099-G has a value in box 2, it is for a tax refund from the state.
			It may or may not be taxable depending upon how it was used on last
			year&apos;s federal tax return. If you fill in the following fields with
			the information from last year&apos;s federal tax return, this tool will
			determine how much of the refund is taxable; otherwise, the entire refund will
			be treated as taxable.</p>

			<div class="supplemental-line-400-40">
				<p>Schedule A, line 17 from last year&apos;s federal tax return</p>
				<input class="input-worksheet-row-value input-field"
					type="text" size="10" placeholder="0"
					id="f1099g-XX-prev-itemized" />
			</div>
			<div class="supplemental-line-400-40">
				<p>Schedule A, line 5d from last year&apos;s federal tax return</p>
				<input class="input-worksheet-row-value input-field"
					type="text" size="10" placeholder="0"
					id="f1099g-XX-prev-5d" />
			</div>
			<div class="supplemental-line-400-40">
				<p>Schedule A, line 5e from last year&apos;s federal tax return</p>
				<input class="input-worksheet-row-value input-field"
					type="text" size="10" placeholder="0"
					id="f1099g-XX-prev-5e" />
			</div>
			<div>&nbsp;</div>
		</details>
`;

export class W1099G extends TaxForm {
	constructor() {
		super("F1099G");
		const mgr HTMLMgr.getMgr();
		this.name = "F1099G"
		this.uid = mgr.getUID("F1099G");
	}

	calculate() {
	}
}
