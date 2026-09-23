
import { Debug }		from "../Modules/Debug.js";
import { HTML }			from "../Modules/HTML.js";
import { Line }			from "../Classes/Line.js";
import { Objects }		from "../Modules/Objects.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_FORM = `
		<details class="taxform-details" id="f1098vli-XX-container">
			<summary class="taxform-summary">1098-VLI - Vehicle Loan Interest
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
						<div>OMB No. 1545-2334</div>
						<h1><span id="tax-year">202X</span></h1>
						<h2>Form 1098-VLI</h2>
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
							<textarea id="f1098vli-XX-payer"
								placeholder="Recipient/Lender Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number"></textarea>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">Recipient/Lender&apos;S TIN</span>
								<input type="text" id="f1098vli-XX-ein"
									placeholder="12-3456789" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">PAYER of Record&apos;S TIN</span>
								<input type="text" id="f1098vli-XX-ssn"
									placeholder="123-45-6789" />
							</div>
						</div>

						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">PAYER of Record&apos;S name, street
								address, city or town, state, and ZIP code</span>
							<textarea id="f1098vli-XX-taxpayer"
								placeholder="PAYER of Record&apos;s Name&#10;Street Address&#10;City, State, ZIP"></textarea>
						</div>

						<div class="f1099-box" style="border-bottom: none;">
							<span class="f1099-box-label">Account number (see
								instructions)</span>
							<input type="text" id="f1098vli-XX-account"
								placeholder="Optional Account #" />
						</div>
					</div>

					<!-- Right Column: Numbered Input Boxes -->
					<div class="f1099-col-right">
						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">1 Vehicle loan interest
									received by lender</span>
								<input type="text" id="f1098vli-XX-01"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label"></span>
								<input type="text" placeholder="" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">2a Year</span>
								<input type="text" id="f1098vli-XX-02a" placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">2b Make</span>
								<input type="text" id="f1098vli-XX-02b" placeholder="" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">2c Model</span>
								<input type="text" id="f1098vli-XX-02c" placeholder="" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">2d VIN</span>
								<input type="text" id="f1098vli-XX-02c" placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">3a Loan origination date</span>
								<input type="text" id="f1098vli-XX-03a" placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">3b Loan acquisition date</span>
								<input type="text" id="f1098vli-XX-03b" placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">4 Outstanding principal</span>
								<input type="text" id="f1098vli-XX-04" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">5 Refund of overpaid
									interest</span>
								<input type="text" id="f1098vli-XX-05" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">6 Check if original use of
									the vehicle began with the payer of record</span>
								<div><input type="checkbox" id="f1099r-XX-06" /></div>
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">7 Check if final assembly of
									the vehicle occurred within the United States</span>
								<div><input type="checkbox" id="f1099r-XX-07"/></div>
							</div>
						</div>
					</div>
				</div>		<!-- Main grid -->
			</div>		<!-- f1099-taxform-container -->
			<div class="f1099-footer-note">Form <strong>1098-VLI</strong></div>
			<div>&nbsp;</div>
		</details>
`;

export class F1098VLI extends TaxForm {
	static createForm(uid) {
		//
		// Create a new form and initialize it with information from the Web page.
		// If the user hasn't entered any information, don't bother creating the form.
		//
		const inputs = F1098VLI.getUserInput(uid);
		if (!Objects.isUsed(inputs)) {
			return;
		}

		const newform = TaxFormObj.createForm("F1098VLI");

		for (const key of Object.keys(inputs)) {
			newform.lines[key].user_value = inputs[key];
		}

		return newform;
	}

	static getInputHTML(uid) {
		if (!uid) {
			throw new Error(`F1098VLI.getInputHTML(): UID is undefined.`);
		}

		const html = HTML_FORM.replace(/XX/g, uid)
								.replace(/202X/g, TaxTable.getTaxYear());

		return [ `f1098vli-${uid}-container`, html ];
	}

	static getUserInput(uid) {
		//
		// Read the fields of the form from the web and return an object with the
		// information.
		//
		if (!uid) {
			throw new Error(`F1098VLI.getUserInput(): UID is undefined.`);
		}

		const element = document.getElementById(`f1098vli-${uid}-container`);
		if (!element) {
			throw new Error(
				`F1098VLI.getUserInput(): Element not found: f1098vli-${uid}-container`);
		}

		let inputs = {};

		inputs["lender"]	= HTML.getUserInput(`f1098vli-${uid}-lender`,	"text");
		inputs["ein"]		= HTML.getUserInput(`f1098vli-${uid}-ein`,		"text");
		inputs["ssn"]		= HTML.getUserInput(`f1098vli-${uid}-ssn`,		"text");
		inputs["taxpayer"]	= HTML.getUserInput(`f1098vli-${uid}-taxpayer`,	"text");
		inputs["account"]	= HTML.getUserInput(`f1098vli-${uid}-account`,	"text");
		inputs["01"	]		= HTML.getUserInput(`f1098vli-${uid}-01`);
		inputs["02a"]		= HTML.getUserInput(`f1098vli-${uid}-02a`,		"text");
		inputs["02b"]		= HTML.getUserInput(`f1098vli-${uid}-02b`,		"text");
		inputs["02c"]		= HTML.getUserInput(`f1098vli-${uid}-02c`,		"text");
		inputs["02d"]		= HTML.getUserInput(`f1098vli-${uid}-02d`,		"text");
		inputs["03a"]		= HTML.getUserInput(`f1098vli-${uid}-03a`,		"text");
		inputs["03b"]		= HTML.getUserInput(`f1098vli-${uid}-03b`,		"text");
		inputs["04"	]		= HTML.getUserInput(`f1098vli-${uid}-04`);
		inputs["05"	]		= HTML.getUserInput(`f1098vli-${uid}-05`);
		inputs["06"	]		= HTML.getUserInput(`f1098vli-${uid}-06`);
		inputs["07a"]		= HTML.getUserInput(`f1098vli-${uid}-07`);

		return inputs;
	}

	constructor(formname) {
		Debug.enter("F1098VLI.Constructor()");
		super(formname);
		this.title =
			`1098-VLI - Distributions from Pensions, Annuities, Retirement Plans, etc.`;

		this.lines["lender"]	= new Line("Lender");
		this.lines["ein"]		= new Line("EIN");
		this.lines["ssn"]		= new Line("SSN");
		this.lines["taxpayer"]	= new Line("Taxpayer");
		this.lines["account"]	= new Line("Account");
		this.lines["01"]		= new Line("Vehicle loan interest received by lender");
		this.lines["02a"]		= new Line("Year");
		this.lines["02b"]		= new Line("Make");
		this.lines["02c"]		= new Line("Model");
		this.lines["02d"]		= new Line("VIN");
		this.lines["03a"]		= new Line("Loan origination date");
		this.lines["03b"]		= new Line("Loan acquisition date");
		this.lines["04"]		= new Line("Outstanding principal");
		this.lines["05"]		= new Line("Refund of overpaid interest");
		this.lines["06"]		= new Line("Original owner");
		this.lines["07"]		= new Line("Assembled within the United States");

		Debug.exit("F1098VLI.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F1098VLI.calculate()");

		this.calculated = true;

		Debug.exit("F1098VLI.calculate()");
	}
}
