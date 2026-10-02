
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
	"01":				["text"],
	"02":				[],
	"03":				[],
	"04":				["text"],
	"05":				[],
	"06":				["text"],
	"07":				[],
};

const HTML_FORM = `
		<details class="taxform-details" id="f1099c-XX-container">
			<summary class="taxform-summary">1099-C - Cancellation of Debt</summary>
			<div>&nbsp;</div>
			<div class="f1099-taxform-container">
				<!-- Header Section -->
				<div class="f1099-header-row">
					<div class="f1099-header-left">
						<label><input type="checkbox" disabled
							id="corrected" /> CORRECTED</label>
					</div>
					<div class="f1099-header-center">
						<div>OMB No. 1545-1424</div>
						<h1><span id="tax-year">202X</span></h1>
						<h2>Form 1099-C</h2>
					</div>
					<div class="f1099-header-right">
						<strong>Cancellation of Debt</strong>
					</div>
				</div>

				<!-- Main Content Grid -->
				<div class="f1099-main-grid">
					<!-- Left Column: Payer & Recipient Info Inputs -->
					<div class="f1099-col-left">
						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">CREDITOR&apos;S name, street
								address, city or town, state or province, country,
								ZIP or foreign postal code, and telephone no.</span>
							<textarea id="f1099c-XX-payer"
								placeholder="Payer Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number"></textarea>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">CREDITOR&apos;S TIN</span>
								<input type="text" id="f1099c-XX-ein"
									placeholder="12-3456789" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">DEBTOR&apos;S TIN</span>
								<input type="text" id="f1099c-XX-ssn"
									placeholder="123-45-6789" />
							</div>
						</div>

						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">DEBTOR&apos;S name, street
								address, city or town, state, and ZIP code</span>
							<textarea id="f1099c-XX-taxpayer"
								placeholder="Taxpayer&apos;s Name&#10;Street Address&#10;City, State, ZIP"></textarea>
						</div>

						<div class="f1099-box" style="border-bottom: none;">
							<span class="f1099-box-label">Account number (see
								instructions)</span>
							<input type="text" id="f1099c-XX-account"
								placeholder="Optional Account #" />
						</div>
					</div>

					<!-- Right Column: Numbered Input Boxes -->
					<div class="f1099-col-right">
						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">1 Date of identifiable
									event</span>
								<input type="text" id="f1099c-XX-01"
									placeholder="mm/dd/yyyy" />
							</div>
							<div class="f1099-box input-color">
								<span class="f1099-box-label">2 Amount of debt
									discharged</span>
								<input type="text" id="f1099c-XX-02"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">3 Interest, if included
									in box 2</span>
								<input type="text" id="f1099c-XX-03"
									placeholder="0" />
							</div>
							<div class="f1099-box">
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">4 Debt description</span>
								<textarea id="f1099c-XX-04"></textarea>
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">5 If checked, the debtor
									was personally liable for repayment of the debt</span>
								<div class="f1099-checkbox-center">
									<input type="checkbox" id="f1099c-XX-05" />
								</div>
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box" style="border-bottom: none;">
								<span class="f1099-box-label">6  Identifiable event
									code</span>
								<input type="text" id="f1099c-XX-06" />
							</div>
							<div class="f1099-box" style="border-bottom: none;">
								<span class="f1099-box-label">7 Fair market value of
									property</span>
								<input type="text" id="f1099c-XX-07"
									placeholder="0" />
							</div>
						</div>
					</div>
				</div>		<!-- Main grid -->
			</div>		<!-- f1099-taxform-container -->
			<div class="f1099-footer-note">Form <strong>1099-C</strong></div>
			<div>&nbsp;</div>
		</details>
`;

export class F1099C extends TaxForm {
	static getHTML(uid) {
		if (!uid) {
			throw new Error(`F1099C.getHTML(): UID is undefined.`);
		}

		const tax_year	= TaxTable.getTaxYear();
		const html		= HTML_FORM.replace(/XX/g, uid)
									.replace(/202X/g, tax_year);

		return [ `f1099c-${uid}-container`, html ];
	}

	static getInputFromWeb(uid, raw = false) {
		//
		// Read the fields of the form from the web and return an object with the
		// information. Raw user input is only used to save and restore user input.
		//
		if (!uid) {
			throw new Error(`F1099C.getInputFromWeb(): UID is undefined.`);
		}

		const element = document.getElementById(`f1099c-${uid}-container`);
		if (!element) {
			throw new Error(
				`F1099C.getInputFromWeb(): Element not found: f1099c-${uid}-container`);
		}

		let inputs = {};

		for (const field_name of Object.keys(ELEMENTS)) {
			const value_type	= raw ? "raw" : ELEMENTS[field_name][0];
			const key_name		= field_name.replace(/-/g, "_");
			const element_id	= `f1099g-${uid}-${field_name}`;
			inputs[key_name]	= HTML.getUserInput(element_id, value_type);
		}

		return inputs;
	}

	constructor(formname) {
		Debug.enter("F1099C.Constructor()");
		super(formname);
		this.title = `1099-C - Cancellation of Debt`;

		this.lines["payer"]		= new Line("Payer");
		this.lines["ein"]		= new Line("EIN");
		this.lines["ssn"]		= new Line("SSN");
		this.lines["taxpayer"]	= new Line("Taxpayer");
		this.lines["account"]	= new Line("Account");
		this.lines["01"]		= new Line("Date of identifiable event");
		this.lines["02"]		= new Line("Amount of debt discharged");
		this.lines["03"]		= new Line("Interest, if included in box 2");
		this.lines["04"]		= new Line("Debt description");
		this.lines["05"]		= new Line("Debtor was personally liable for debt");
		this.lines["06"]		= new Line("Identifiable event code");
		this.lines["07"]		= new Line("Fair market value of property");

		Debug.exit("F1099C.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F1099C.calculate()");

		this.calculated = true;

		Debug.exit("F1099C.calculate()");
	}
}
