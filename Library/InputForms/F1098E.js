
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
	"is-spouses":		[""],
	"lender":			["text"],
	"ein":				["text"],
	"ssn":				["text"],
	"taxpayer":			["text"],
	"account":			["text"],
	"01":				[""],
};

const HTML_FORM = `
		<details class="taxform-details" id="f1098e-XX-container">
			<summary class="taxform-summary">1098-E - Student Loan Interest
				Statement</summary>
			<div>&nbsp;</div>

			<div class="taxform-owner">
				<input type="radio" name="f1098e-XX-owner"
					id="f1098e-XX-is-taxpayers" checked />
				<label for="f1098e-XX-is-taxpayers">
					Taxpayer&apos;s Tax Form</label>

				<input type="radio" name="f1098e-XX-owner"
					id="f1098e-XX-is-spouses" />
				<label for="f1098e-XX-is-spouses">
					Spouse&apos;s Tax Form</label>
				</div>
			</div>

			<div class="f1099-taxform-container">
				<!-- Header Section -->
				<div class="f1099-header-row">
					<div class="f1099-header-left">
					</div>

					<div class="f1099-header-center">
						<div>OMB No. 1545-1576</div>
						<h1><span id="tax-year">202X</span></h1>
						<h2>Form 1098-E</h2>
					</div>

					<div class="f1099-header-right">
						<strong>Student Loan Interest Statement</strong>
					</div>
				</div>

				<!-- Main Content Grid -->
				<div class="f1099-main-grid">
					<!-- Left Column: Payer & Recipient Info Inputs -->
					<div class="f1099-col-left">
						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">Recipient/Lender&apos;s name, street
								address, city or town, state or province, country, and
								ZIP or foreign postal code</span>
							<textarea id="f1098e-XX-lender"
								placeholder="Recipient/Lender Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number"></textarea>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">Recipient/Lender&apos;s TIN</span>
								<input type="text" id="f1098e-XX-ein"
									placeholder="12-3456789" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Payer of Record&apos;s TIN</span>
								<input type="text" id="f1098e-XX-ssn"
									placeholder="123-45-6789" />
							</div>
						</div>

						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">Payer of Record&apos;s name, street
								address, city or town, state, and ZIP code</span>
							<textarea id="f1098e-XX-taxpayer"
								placeholder="Payer of Record&apos;s Name&#10;Street Address&#10;City, State, ZIP"></textarea>
						</div>

						<div class="f1099-box" style="border-bottom: none;">
							<span class="f1099-box-label">Account number (see
								instructions)</span>
							<input type="text" id="f1098e-XX-account"
								placeholder="Optional Account #" />
						</div>
					</div>

					<!-- Right Column: Numbered Input Boxes -->
					<div class="f1099-col-right">
						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">1 Student loan interest
									received by lender</span>
								<input type="text" id="f1098e-XX-01"
									placeholder="0" />
							</div>
							<div class="f1099-box">
							</div>
						</div>
					</div>
				</div>		<!-- Main grid -->
			</div>		<!-- f1099-taxform-container -->
			<div class="f1099-footer-note">Form <strong>1098-E</strong></div>
			<div>&nbsp;</div>
		</details>
`;

export class F1098E extends TaxForm {
	static getHTML(uid) {
		if (!uid) {
			throw new Error(`F1098E.getHTML(): UID is undefined.`);
		}

		const html = HTML_FORM.replace(/XX/g, uid)
								.replace(/202X/g, TaxTable.getTaxYear());

		return [ `f1098e-${uid}-container`, html ];
	}

	static getInputFromWeb(uid, raw = false) {
		//
		// Read the fields of the form from the web and return an object with the
		// information. Raw user input is only used to save and restore user input.
		//
		if (!uid) {
			throw new Error(`F1098E.getInputFromWeb(): UID is undefined.`);
		}

		const element = document.getElementById(`f1098e-${uid}-container`);
		if (!element) {
			throw new Error(
				`F1098E.getInputFromWeb(): Element not found: f1098e-${uid}-container`);
		}

		let inputs = {};
		const form_id = "f1098e";

		for (const field_name of Object.keys(ELEMENTS)) {
			const value_type	= raw ? "raw" : ELEMENTS[field_name][0];
			const key_name		= field_name.replace(/-/g, "_");
			const element_id	= `${form_id}-${uid}-${field_name}`;
			inputs[key_name]	= HTML.getUserInput(element_id, value_type);
		}

		return inputs;
	}

	constructor(formname) {
		Debug.enter("F1098E.Constructor()");
		super(formname);
		this.title = `1098-E - Student Loan Interest Statement`;

		this.lines["is_spouses"]= new Line("Spouse's Tax Form");
		this.lines["lender"]	= new Line("Lender");
		this.lines["ein"]		= new Line("EIN");
		this.lines["ssn"]		= new Line("SSN");
		this.lines["taxpayer"]	= new Line("Taxpayer");
		this.lines["account"]	= new Line("Account");
		this.lines["01"]		= new Line("Student loan interest received by lender");

		Debug.exit("F1098E.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F1098E.calculate()");

		this.calculated = true;

		Debug.exit("F1098E.calculate()");
	}

	loadInputFromWeb(inputs) {
		//
		// The inputs parameter is an object that contains all the input fields from the
		// form's web page. This method copies those fields to the corresponding locations
		// in this instance of the form.
		//
		for (const key of Object.keys(inputs)) {
			switch (key) {
				case "is_spouses":
					this[key] = inputs[key];
					break;
				default:
					this.lines[key].user_value = inputs[key];
					break;
			}
		}
	}
}
