
import { Debug }		from "../Modules/Debug.js";
import { HTML }			from "../Modules/HTML.js";
import { Line }			from "../Classes/Line.js";
import { Objects }		from "../Modules/Objects.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";

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
							<span class="f1099-box-label">PAYER&apos;S name, street
								address, city or town, state or province, country,
								ZIP or foreign postal code, and telephone no.</span>
							<textarea id="f1099c-XX-payer"
								placeholder="Payer Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number">
							</textarea>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">PAYER&apos;S TIN</span>
								<input type="text" id="f1099c-XX-ein"
									placeholder="12-3456789" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">TAXPAYER&apos;S TIN</span>
								<input type="text" id="f1099c-XX-ssn"
									placeholder="123-45-6789" />
							</div>
						</div>

						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">TAXPAYER&apos;S name, street
								address, city or town, state, and ZIP code</span>
							<textarea id="f1099c-XX-taxpayer"
								placeholder="Taxpayer&apos;s Name&#10;Street Address&#10;City, State, ZIP">
							</textarea>
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
									placeholder="mm/dd/yyyyY" />
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
	static createForm(uid) {
		//
		// Create a new form and initialize it with information from the Web page.
		// If the user hasn't entered any information, don't bother creating the form.
		//
		const inputs = F1099C.getUserInput(uid);
		if (!Objects.isUsed(inputs)) {
			return;
		}

		const newform = TaxFormObj.createForm("F1099C");

		for (const key of Object.keys(inputs)) {
			newform.lines[key].user_value = inputs[key];
		}

		return newform;
	}

	static getInputHTML(uid) {
		if (!uid) {
			throw new Error(`F1099C.getInputHTML(): UID is undefined.`);
		}

		const tax_year	= TaxTable.getTaxYear();
		const html		= HTML_FORM.replace(/XX/g, uid)
									.replace(/202X/g, tax_year);

		return [ `f1099c-${uid}-container`, html ];
	}

	static getUserInput(uid) {
		//
		// Read the fields of the form from the web and return an object with the
		// information.
		//
		if (!uid) {
			throw new Error(`F1099C.getUserInput(): UID is undefined.`);
		}

		const element = document.getElementById(`f1099c-${uid}-container`);
		if (!element) {
			throw new Error(
				`F1099C.getUserInput(): Element not found: f1099c-${uid}-container`);
		}

		let inputs = {};

		inputs["payer"]		= HTML.getUserInput(`f1099c-${uid}-payer`,		"text");
		inputs["ein"]		= HTML.getUserInput(`f1099c-${uid}-ein`,		"text");
		inputs["ssn"]		= HTML.getUserInput(`f1099c-${uid}-ssn`,		"text");
		inputs["taxpayer"]	= HTML.getUserInput(`f1099c-${uid}-taxpayer`,	"text");
		inputs["account"]	= HTML.getUserInput(`f1099c-${uid}-account`,	"text");
		inputs["01"]		= HTML.getUserInput(`f1099c-${uid}-01`,			"text");
		inputs["02"]		= HTML.getUserInput(`f1099c-${uid}-02`);
		inputs["03"]		= HTML.getUserInput(`f1099c-${uid}-03`);
		inputs["04"]		= HTML.getUserInput(`f1099c-${uid}-04`,			"text");
		inputs["05"]		= HTML.getUserInput(`f1099c-${uid}-05`);
		inputs["06"]		= HTML.getUserInput(`f1099c-${uid}-06`,			"text");
		inputs["07"]		= HTML.getUserInput(`f1099c-${uid}-07`);

		return inputs;
	}

	constructor(formname) {
		Debug.enter("F1099C.Constructor()");
		super(formname);
		this.title = `1099-C - Cancellation of Debt`;

		this.payer				= 0;
		this.ein				= 0;
		this.ssn				= 0;
		this.taxpayer			= 0;
		this.account			= 0;

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
