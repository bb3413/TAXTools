
import { Debug }		from "../Modules/Debug.js";
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
	"01c":				[""],
	"01d":				["text"],
	"02":				["text"],
	"03":				[""],
	"04":				[""],
	"05a":				[""],
	"05b":				[""],
	"05c":				[""],
	"05d":				[""],
	"05e":				[""],
	"05f":				[""],
	"05g":				[""],
	"05h":				[""],
	"05i":				[""],
	"05j":				[""],
	"05k":				[""],
	"05l":				[""],
	"06":				[""],
	"07":				["text"],
};

const HTML_FORM = `
		<details class="taxform-details" id="f1099k-XX-container">
			<summary class="taxform-summary">1099-K - Payment Card and Third
				Party Network Transactions</summary>
			<div>&nbsp;</div>
			<div class="f1099-taxform-container">
				<!-- Header Section -->
				<div class="f1099-header-row">
					<div class="f1099-header-left">
						<label><input type="checkbox" disabled
							id="corrected" /> CORRECTED</label>
					</div>
					<div class="f1099-header-center">
						<div>OMB No. 1545-2205</div>
						<h1><span id="tax-year">202X</span></h1>
						<h2>Form 1099-K</h2>
					</div>
					<div class="f1099-header-right">
						<strong>Payment Card and Third Party Network Transactions</strong>
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
							<textarea id="f1099k-XX-payer"
								placeholder="Payer Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number"></textarea>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">PAYER&apos;S TIN</span>
								<input type="text" id="f1099k-XX-ein"
									placeholder="12-3456789" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">TAXPAYER&apos;S TIN</span>
								<input type="text" id="f1099k-XX-ssn"
									placeholder="123-45-6789" />
							</div>
						</div>

						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">TAXPAYER&apos;S name, street
								address, city or town, state, and ZIP code</span>
							<textarea id="f1099k-XX-taxpayer"
								placeholder="Taxpayer&apos;s Name&#10;Street Address&#10;City, State, ZIP"></textarea>
						</div>

						<div class="f1099-box" style="border-bottom: none;">
							<span class="f1099-box-label">Account number (see
								instructions)</span>
							<input type="text" id="f1099k-XX-account"
								placeholder="Optional Account #" />
						</div>
					</div>

					<!-- Right Column: Numbered Input Boxes -->
					<div class="f1099-col-right">
						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">1a Gross amount of payment
									card/third party network transactions</span>
								<input type="text" id="f1099k-XX-01a"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">1b Card Not Present
									transactions</span>
								<input type="text" id="f1099k-XX-01b"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">1c Cash tips</span>
								<input type="text" id="f1099k-XX-01c"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">1d TTOC</span>
								<input type="text" id="f1099k-XX-01d" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">2 Merchant category code</span>
								<input type="text" id="f1099k-XX-02" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">3 Number of payment
									transactions</span>
								<input type="text" id="f1099k-XX-03"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">4 Federal income tax
									withheld</span>
								<input type="text" id="f1099k-XX-04"
									placeholder="0" />
							</div>
							<div class="f1099-box">
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">5a January</span>
								<input type="text" id="f1099k-XX-05a"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">5b February</span>
								<input type="text" id="f1099k-XX-05b"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">5c March</span>
								<input type="text" id="f1099k-XX-05c"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">5d April</span>
								<input type="text" id="f1099k-XX-05d"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">5e May</span>
								<input type="text" id="f1099k-XX-05e"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">5f June</span>
								<input type="text" id="f1099k-XX-05f"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">5g July</span>
								<input type="text" id="f1099k-XX-05g"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">5h August</span>
								<input type="text" id="f1099k-XX-05h"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">5i September</span>
								<input type="text" id="f1099k-XX-05i"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">5j October</span>
								<input type="text" id="f1099k-XX-05j"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">5k November</span>
								<input type="text" id="f1099k-XX-05k"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">5l December</span>
								<input type="text" id="f1099k-XX-05l"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box input-color" style="border-bottom: none;">
								<span class="f1099-box-label">6 State income tax
									withheld</span>
								<input type="text" id="f1099k-XX-06"
									placeholder="0" />
							</div>
							<div class="f1099-box" style="border-bottom: none;">
								<span class="f1099-box-label">7/8 State/state no.</span>
								<input type="text" id="f1099k-XX-07"
									placeholder="State / ID" />
							</div>
						</div>
					</div>
				</div>		<!-- Main grid -->
			</div>		<!-- f1099-taxform-container -->
			<div class="f1099-footer-note">Form <strong>1099-K</strong></div>
			<div>&nbsp;</div>
		</details>
`;

export class F1099K extends TaxForm {
	static getHTML(uid) {
		if (!uid) {
			throw new Error(`F1099K.getHTML(): UID is undefined.`);
		}

		const html = HTML_FORM.replace(/XX/g, uid)
								.replace(/202X/g, TaxTable.getTaxYear());

		return [ `f1099k-${uid}-container`, html ];
	}

	static getInputFromWeb(uid, raw = false) {
		//
		// Read the fields of the form from the web and return an object with the
		// information. Raw user input is only used to save and restore user input.
		//
		if (!uid) {
			throw new Error(`F1099K.getInputFromWeb(): UID is undefined.`);
		}

		const element = document.getElementById(`f1099k-${uid}-container`);
		if (!element) {
			throw new Error(
				`F1099K.getInputFromWeb(): Element not found: f1099k-${uid}-container`);
		}

		let inputs = {};
		const form_id = "f1099k";

		for (const field_name of Object.keys(ELEMENTS)) {
			const value_type	= raw ? "raw" : ELEMENTS[field_name][0];
			const key_name		= field_name.replace(/-/g, "_");
			const element_id	= `${form_id}-${uid}-${field_name}`;
			inputs[key_name]	= HTML.getUserInput(element_id, value_type);
		}

		return inputs;
	}

	constructor(formname) {
		Debug.enter("F1099K.Constructor()");
		super(formname);
		this.title = `1099-K - Payment Card and Third Party Network Transactions`;

		this.lines["payer"]		= new Line("Payer");
		this.lines["ein"]		= new Line("EIN");
		this.lines["ssn"]		= new Line("SSN");
		this.lines["taxpayer"]	= new Line("Taxpayer");
		this.lines["account"]	= new Line("Account");
		this.lines["01a"]		= new Line("Gross amount of payment card/third par");
		this.lines["01b"]		= new Line("Card Not Present transactions ");
		this.lines["01c"]		= new Line("Cash tips");
		this.lines["01d"]		= new Line("TTOC");
		this.lines["02"]		= new Line("Merchant category code");
		this.lines["03"]		= new Line("Number of payment transactions");
		this.lines["04"]		= new Line("Federal income tax withheld");
		this.lines["05a"]		= new Line("January");
		this.lines["05b"]		= new Line("February");
		this.lines["05c"]		= new Line("March");
		this.lines["05d"]		= new Line("April");
		this.lines["05e"]		= new Line("May");
		this.lines["05f"]		= new Line("June");
		this.lines["05g"]		= new Line("July");
		this.lines["05h"]		= new Line("August");
		this.lines["05i"]		= new Line("September");
		this.lines["05j"]		= new Line("October");
		this.lines["05k"]		= new Line("November");
		this.lines["05l"]		= new Line("December");
		this.lines["06"]		= new Line("State tax withheld");
		this.lines["07"]		= new Line("State/state no.");

		Debug.exit("F1099K.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F1099K.calculate()");

		this.calculated = true;

		Debug.exit("F1099K.calculate()");
	}
}
