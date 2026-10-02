
import { Debug }		from "../Modules/Debug.js";
import { HTML }			from "../Modules/HTML.js";
import { Line }			from "../Classes/Line.js";
import { Objects }		from "../Modules/Objects.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_FORM = `
		<details class="taxform-details" id="f1098e-XX-container">
			<summary class="taxform-summary">1098-E - Student Loan Interest
				Statement</summary>
			<div>&nbsp;</div>
			<div class="f1099-taxform-container">
				<!-- Header Section -->
				<div class="f1099-header-row">
					<div class="f1099-header-left">
						<label><input type="checkbox" disabled
							id="corrected" /> CORRECTED</label>
					</div>
					<div class="f1099-header-center">
						<div>OMB No. 1545-1576</div>
						<h1><span id="tax-year">202X</span></h1>
						<h2>Form 1098-E</h2>
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
							<textarea id="f1098e-XX-lender"
								placeholder="Recipient/Lender Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number"></textarea>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">Recipient/Lender&apos;S TIN</span>
								<input type="text" id="f1098e-XX-ein"
									placeholder="12-3456789" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">PAYER of Record&apos;S TIN</span>
								<input type="text" id="f1098e-XX-ssn"
									placeholder="123-45-6789" />
							</div>
						</div>

						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">PAYER of Record&apos;S name, street
								address, city or town, state, and ZIP code</span>
							<textarea id="f1098e-XX-taxpayer"
								placeholder="PAYER of Record&apos;s Name&#10;Street Address&#10;City, State, ZIP"></textarea>
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
	static createForm(uid) {
		//
		// Create a new form and initialize it with information from the Web page.
		// If the user hasn't entered any information, don't bother creating the form.
		//
		const inputs = F1098E.getUserInput(uid);
		if (!Objects.isUsed(inputs)) {
			return;
		}

		const newform = TaxFormObj.createForm("F1098E");

		for (const key of Object.keys(inputs)) {
			newform.lines[key].user_value = inputs[key];
		}

		return newform;
	}

	static getInputHTML(uid) {
		if (!uid) {
			throw new Error(`F1098E.getInputHTML(): UID is undefined.`);
		}

		const html = HTML_FORM.replace(/XX/g, uid)
								.replace(/202X/g, TaxTable.getTaxYear());

		return [ `f1098e-${uid}-container`, html ];
	}

	static getUserInput(uid, raw = false) {
		//
		// Read the fields of the form from the web and return an object with the
		// information. Raw user input is only used to save and restore user input.
		//
		if (!uid) {
			throw new Error(`F1098E.getUserInput(): UID is undefined.`);
		}

		const element = document.getElementById(`f1098e-${uid}-container`);
		if (!element) {
			throw new Error(
				`F1098E.getUserInput(): Element not found: f1098e-${uid}-container`);
		}

		let inputs = {};

		inputs["lender"]	= HTML.getUserInput(`f1098e-${uid}-lender`,raw?"raw":"text");
		inputs["ein"]		= HTML.getUserInput(`f1098e-${uid}-ein`,	raw?"raw":"text");
		inputs["ssn"]		= HTML.getUserInput(`f1098e-${uid}-ssn`,	raw?"raw":"text");
		inputs["taxpayer"]	= HTML.getUserInput(`f1098e-${uid}-taxpayer`,raw?"raw":"text");
		inputs["account"]	= HTML.getUserInput(`f1098e-${uid}-account`, raw?"raw":"text");
		inputs["01"	]		= HTML.getUserInput(`f1098e-${uid}-01`,	raw?"raw":"");

		return inputs;
	}

	constructor(formname) {
		Debug.enter("F1098E.Constructor()");
		super(formname);
		this.title = `1098-E - Student Loan Interest Statement`;

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
}
