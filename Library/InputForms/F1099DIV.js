
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
	"01a":				[""],
	"01b":				[""],
	"02a":				[""],
	"02b":				[""],
	"03":				[""],
	"04":				[""],
	"05":				[""],
	"06":				[""],
	"07":				[""],
	"08":				["text"],
	"12":				[""],
	"13":				[""],
	"14":				["text"],
	"16":				[""],
};

const HTML_FORM = `
		<details class="taxform-details" id="f1099div-XX-container">
			<summary class="taxform-summary">1099-DIV - Dividends and Distributions</summary>
			<div>&nbsp;</div>
			<div class="f1099-taxform-container">
				<!-- Header Section -->
				<div class="f1099-header-row">
					<div class="f1099-header-left">
						<label><input type="checkbox" disabled
							id="corrected" /> CORRECTED</label>
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
							<span class="f1099-box-label">PAYER&apos;S name, street
								address, city or town, state or province, country,
								ZIP or foreign postal code, and telephone no.</span>
							<textarea id="f1099div-XX-payer"
								placeholder="Payer Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number"></textarea>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">PAYER&apos;S TIN</span>
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

export class F1099DIV extends TaxForm {
	static getHTML(uid) {
		if (!uid) {
			throw new Error(`f1099div.getHTML(): UID is undefined.`);
		}

		const html = HTML_FORM.replace(/XX/g, uid)
								.replace(/202X/g, TaxTable.getTaxYear());

		return [ `f1099div-${uid}-container`, html ];
	}

	static getInputFromWeb(uid, raw = false) {
		//
		// Read the fields of the form from the web and return an object with the
		// information. Raw user input is only used to save and restore user input.
		//
		if (!uid) {
			throw new Error(`f1099div.getInputFromWeb(): UID is undefined.`);
		}

		const element = document.getElementById(`f1099div-${uid}-container`);
		if (!element) {
			throw new Error(
				`f1099div.getInputFromWeb(): Element not found: f1099div-${uid}-container`);
		}

		let inputs = {};
		const form_id = "f1099div";

		for (const field_name of Object.keys(ELEMENTS)) {
			const value_type	= raw ? "raw" : ELEMENTS[field_name][0];
			const key_name		= field_name.replace(/-/g, "_");
			const element_id	= `${form_id}-${uid}-${field_name}`;
			inputs[key_name]	= HTML.getUserInput(element_id, value_type);
		}

		return inputs;
	}

	constructor(formname) {
		Debug.enter("f1099div.Constructor()");
		super(formname);
		this.title = `1099-DIV - Dividends and Distributions`;

		this.lines["payer"]		= new Line("Payer");
		this.lines["ein"]		= new Line("EIN");
		this.lines["ssn"]		= new Line("SSN");
		this.lines["taxpayer"]	= new Line("Taxpayer");
		this.lines["account"]	= new Line("Account");
		this.lines["01a"]		= new Line("Total ordinary dividends");
		this.lines["01b"]		= new Line("Qualified dividends");
		this.lines["02a"]		= new Line("Total capital gain distr.");
		this.lines["02b"]		= new Line("Unrecap. Sec. 1250 gain");
		this.lines["03"]		= new Line("Nondividend distributions");
		this.lines["04"]		= new Line("Federal income tax withheld");
		this.lines["05"]		= new Line("Section 199A dividends");
		this.lines["06"]		= new Line("Investment expenses");
		this.lines["07"]		= new Line("Foreign tax paid");
		this.lines["08"]		= new Line("Foreign country or U.S. possession");
		this.lines["12"]		= new Line("Exempt-interest dividends");
		this.lines["13"]		= new Line("Specified private activity bond dividends");
		this.lines["14"]		= new Line("State/State no.");
		this.lines["16"]		= new Line("State tax withheld");

		Debug.exit("f1099div.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("f1099div.calculate()");

		this.calculated = true;

		Debug.exit("f1099div.calculate()");
	}
}
