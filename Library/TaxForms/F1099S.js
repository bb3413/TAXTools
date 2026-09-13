
import { Debug }		from "../Modules/Debug.js";
import { HTML }			from "../Modules/HTML.js";
import { Line }			from "../Classes/Line.js";
import { Objects }		from "../Modules/Objects.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_FORM = `
		<details class="taxform-details" id="f1099s-XX-container">
			<summary class="taxform-summary">1099-S - Proceeds from Real Estate
				Transactions</summary>
			<div>&nbsp;</div>
			<div class="f1099-taxform-container">
				<!-- Header Section -->
				<div class="f1099-header-row">
					<div class="f1099-header-left">
						<label><input type="checkbox" disabled
							id="corrected" /> CORRECTED</label>
					</div>
					<div class="f1099-header-center">
						<div>OMB No. 1545-0997</div>
						<h1><span id="tax-year">202X</span></h1>
						<h2>Form 1099-S</h2>
					</div>
					<div class="f1099-header-right">
						<strong>Proceeds from Real Estate Transactions</strong>
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
							<textarea id="f1099s-XX-payer"
								placeholder="Payer Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number">
							</textarea>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">PAYER&apos;S TIN</span>
								<input type="text" id="f1099s-XX-ein"
									placeholder="12-3456789" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">TAXPAYER&apos;S TIN</span>
								<input type="text" id="f1099s-XX-ssn"
									placeholder="123-45-6789" />
							</div>
						</div>

						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">TAXPAYER&apos;S name, street
								address, city or town, state, and ZIP code</span>
							<textarea id="f1099s-XX-taxpayer"
								placeholder="Taxpayer&apos;s Name&#10;Street Address&#10;City, State, ZIP">
							</textarea>
						</div>

						<div class="f1099-box" style="border-bottom: none;">
							<span class="f1099-box-label">Account number (see
								instructions)</span>
							<input type="text" id="f1099s-XX-account"
								placeholder="Optional Account #" />
						</div>
					</div>

					<!-- Right Column: Numbered Input Boxes -->
					<div class="f1099-col-right">
						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">1 Date of closing</span>
								<input type="text" id="f1099s-XX-01"
									placeholder="mm/dd/yyyyY" />
							</div>
							<div class="f1099-box input-color">
								<span class="f1099-box-label">2a Total gross proceeds</span>
								<input type="text" id="f1099s-XX-02a"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">2b  Cash gross proceeds</span>
								<input type="text" id="f1099s-XX-02b"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">2c  Digital asset gross
									proceeds</span>
								<input type="text" id="f1099s-XX-02c"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">3 Address (including city,
									state, and ZIP code) or legal description</span>
								<textarea id="f1099s-XX-03"></textarea>
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">4 Buyer�s part of real
									estate tax</span>
								<input type="text" id="f1099s-XX-04"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">5</span>
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">6 If checked, transferor
									received or will receive services or property (other
									than cash, notes, or digital assets) as part of the
									consideration</span>
								<div class="f1099-checkbox-center">
									<input type="checkbox" id="f1099s-XX-06" />
								</div>
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">7 If  If checked, transferor
									is a foreign person (nonresident alien, foreign
									partnership, foreign estate, or foreign trust)</span>
								<div class="f1099-checkbox-center">
									<input type="checkbox" id="f1099s-XX-07" />
								</div>
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">8a Code for digital asset
									received, or to be received, as consideration</span>
								<input type="text" id="f1099s-XX-08a" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">8b Name of digital asset
									received, or to be received, as consideration</span>
								<input type="text" id="f1099s-XX-08b" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box style="border-bottom: none;"">
								<span class="f1099-box-label">8c Number of digital
									asset units received, or to be received, as
									consideration</span>
								<input type="text" id="f1099s-XX-08c" />
							</div>
							<div class="f1099-box style="border-bottom: none;"">
								<span class="f1099-box-label">8d Date digital asset received,
									or to be received, as consideration</span>
								<input type="text" id="f1099s-XX-08d" />
							</div>
						</div>
					</div>
				</div>		<!-- Main grid -->
			</div>		<!-- f1099-taxform-container -->
			<div class="f1099-footer-note">Form <strong>1099-S</strong></div>
			<div>&nbsp;</div>
		</details>
`;

export class F1099S extends TaxForm {
	static createForm(uid) {
		//
		// Create a new form and initialize it with information from the Web page.
		// If the user hasn't entered any information, don't bother creating the form.
		//
		const inputs = F1099S.getUserInput(uid);
		if (!Objects.isUsed(inputs)) {
			return;
		}

		const newform = TaxFormObj.createForm("F1099S");

		for (const key of Object.keys(inputs)) {
			newform.lines[key].user_value = inputs[key];
		}

		return newform;
	}

	static getInputHTML(uid) {
		if (!uid) {
			throw new Error(`F1099S.getInputHTML(): UID is undefined.`);
		}

		const html = HTML_FORM.replace(/XX/g, uid)
								.replace(/202X/g, TaxTable.getTaxYear());

		return [ `f1099s-${uid}-container`, html ];
	}

	static getUserInput(uid) {
		//
		// Read the fields of the form from the web and return an object with the
		// information.
		//
		if (!uid) {
			throw new Error(`F1099S.getUserInput(): UID is undefined.`);
		}

		const element = document.getElementById(`f1099s-${uid}-container`);
		if (!element) {
			throw new Error(
				`F1099S.getUserInput(): Element not found: f1099s-${uid}-container`);
		}

		let inputs = {};

		inputs["payer"]		= HTML.getUserInput(`f1099s-${uid}-payer`,		"text");
		inputs["ein"]		= HTML.getUserInput(`f1099s-${uid}-ein`,		"text");
		inputs["ssn"]		= HTML.getUserInput(`f1099s-${uid}-ssn`,		"text");
		inputs["taxpayer"]	= HTML.getUserInput(`f1099s-${uid}-taxpayer`,	"text");
		inputs["account"]	= HTML.getUserInput(`f1099s-${uid}-account`,	"text");
		inputs["01"]		= HTML.getUserInput(`f1099s-${uid}-01`,			"text");
		inputs["02a"]		= HTML.getUserInput(`f1099s-${uid}-02a`);
		inputs["02b"]		= HTML.getUserInput(`f1099s-${uid}-02b`);
		inputs["02c"]		= HTML.getUserInput(`f1099s-${uid}-02c`);
		inputs["03"]		= HTML.getUserInput(`f1099s-${uid}-03`,			"text");
		inputs["04"]		= HTML.getUserInput(`f1099s-${uid}-04`);
		inputs["05"]		= HTML.getUserInput(`f1099s-${uid}-05`);
		inputs["06"]		= HTML.getUserInput(`f1099s-${uid}-06`,			"text");
		inputs["07"]		= HTML.getUserInput(`f1099s-${uid}-07`);
		inputs["08a"]		= HTML.getUserInput(`f1099s-${uid}-08a`,		"text");
		inputs["08b"]		= HTML.getUserInput(`f1099s-${uid}-08b`,		"text");
		inputs["08c"]		= HTML.getUserInput(`f1099s-${uid}-08c`,		"text");
		inputs["08d"]		= HTML.getUserInput(`f1099s-${uid}-08d`,		"text");

		return inputs;
	}

	constructor(formname) {
		Debug.enter("F1099S.Constructor()");
		super(formname);
		this.title = `1099-S - Proceeds From Real Estate Transactions`;

		this.payer				= 0;
		this.ein				= 0;
		this.ssn				= 0;
		this.taxpayer			= 0;
		this.account			= 0;

		this.lines["01"]		= new Line("Date of closing");
		this.lines["02a"]		= new Line("Total gross proceeds");
		this.lines["02b"]		= new Line("Cash gross proceeds");
		this.lines["02c"]		= new Line("Digital asset gross proceeds");
		this.lines["03"]		= new Line("Address");
		this.lines["04"]		= new Line("Buyer�s part of real estate tax");
		this.lines["05"]		= new Line("");
		this.lines["06"]		= new Line("Received other than cash");
		this.lines["07"]		= new Line("Foreign person");
		this.lines["08a"]		= new Line("Code for digital asset received");
		this.lines["08b"]		= new Line("Name of digital asset received");
		this.lines["08c"]		= new Line("Number of digital asset units received");
		this.lines["08d"]		= new Line("Date digital asset received");

		Debug.exit("F1099S.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F1099S.calculate()");

		this.calculated = true;

		Debug.exit("F1099S.calculate()");
	}
}
