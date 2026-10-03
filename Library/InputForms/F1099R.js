
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTML }			from "../Modules/HTML.js";
import { Line }			from "../Classes/Line.js";
import { Objects }		from "../Modules/Objects.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const ELEMENTS = {
	// Element ID		Value Type
	"payer":			["text"],
	"ein":				["text"],
	"ssn":				["text"],
	"taxpayer":			["text"],
	"account":			["text"],
	"01":				[""],
	"02a":				[""],
	"02b":				[""],
	"03":				[""],
	"04":				[""],
	"05":				[""],
	"06":				[""],
	"07a":				["text"],
	"07b":				[""],
	"07c":				[""],
	"07d":				[""],
	"09b":				[""],
	"14":				[""],
	"15":				["text"],
};

const HTML_FORM = `
		<details class="taxform-details" id="f1099r-XX-container">
			<summary class="taxform-summary">1099-R - Distributions from Pensions, Annuities,
				Retirement Plans, etc.</summary>
			<div>&nbsp;</div>
			<div class="f1099-taxform-container">
				<!-- Header Section -->
				<div class="f1099-header-row">
					<div class="f1099-header-left">
						<label><input type="checkbox" disabled
							id="corrected" /> CORRECTED</label>
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
							<span class="f1099-box-label">PAYER&apos;S name, street
								address, city or town, state or province, country, and
								ZIP or foreign postal code</span>
							<textarea id="f1099r-XX-payer"
								placeholder="Payer Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number"></textarea>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">PAYER&apos;S TIN</span>
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

export class F1099R extends TaxForm {
	static getHTML(uid) {
		if (!uid) {
			throw new Error(`F1099R.getHTML(): UID is undefined.`);
		}

		const html = HTML_FORM.replace(/XX/g, uid)
								.replace(/202X/g, TaxTable.getTaxYear());

		return [ `f1099r-${uid}-container`, html ];
	}

	static getInputFromWeb(uid, raw = false) {
		//
		// Read the fields of the form from the web and return an object with the
		// information. Raw user input is only used to save and restore user input.
		//
		if (!uid) {
			throw new Error(`F1099R.getInputFromWeb(): UID is undefined.`);
		}

		const element = document.getElementById(`f1099r-${uid}-container`);
		if (!element) {
			throw new Error(
				`F1099R.getInputFromWeb(): Element not found: f1099r-${uid}-container`);
		}

		let inputs = {};
		const form_id = "f1099r";

		for (const field_name of Object.keys(ELEMENTS)) {
			const value_type	= raw ? "raw" : ELEMENTS[field_name][0];
			const key_name		= field_name.replace(/-/g, "_");
			const element_id	= `${form_id}-${uid}-${field_name}`;
			inputs[key_name]	= HTML.getUserInput(element_id, value_type);
		}

		return inputs;
	}

	constructor(formname) {
		Debug.enter("F1099R.Constructor()");
		super(formname);
		this.title =
			`1099-R - Distributions from Pensions, Annuities, Retirement Plans, etc.`;

		this.lines["payer"]		= new Line("Payer");
		this.lines["ein"]		= new Line("EIN");
		this.lines["ssn"]		= new Line("SSN");
		this.lines["taxpayer"]	= new Line("Taxpayer");
		this.lines["account"]	= new Line("Account");
		this.lines["01"]		= new Line("Gross distribution");
		this.lines["02a"]		= new Line("Taxable amount");
		this.lines["02b"]		= new Line("Taxable amount not determined");
		this.lines["03"]		= new Line("Capital gain (included in box 2a)");
		this.lines["04"]		= new Line("Federal income tax withheld");
		this.lines["05"]		= new Line("Employee contrib./Designated Roth");
		this.lines["06"]		= new Line("Net unrealized appreciation");
		this.lines["07a"]		= new Line("Distribution code(s)");
		this.lines["07b"]		= new Line("IRA/SEP/SIMPLE");
		this.lines["07c"]		= new Line("Trump account");
		this.lines["07d"]		= new Line("Earnings on excess contribution");
		this.lines["09b"]		= new Line("Total employee contributions");
		this.lines["14"]		= new Line("State tax withheld");
		this.lines["15"]		= new Line("State/state no.");

		Debug.exit("F1099R.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F1099R.calculate()");

		this.calculated = true;

		Debug.exit("F1099R.calculate()");
	}
}
