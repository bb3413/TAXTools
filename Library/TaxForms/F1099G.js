
import { Debug }		from "../Modules/Debug.js";
import { HTML }			from "../Modules/HTML.js";
import { Line }			from "../Classes/Line.js";
import { Objects }		from "../Modules/Objects.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_FORM = `
		<details class="taxform-details" id="f1099g-XX-container">
			<summary class="taxform-summary">1099-G - Certain Government Payments</summary>
			<div>&nbsp;</div>
			<div class="f1099-taxform-container">
				<!-- Header Section -->
				<div class="f1099-header-row">
					<div class="f1099-header-left">
						<label><input type="checkbox" disabled
							id="corrected" /> CORRECTED</label>
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
							<span class="f1099-box-label">PAYER&apos;S name, street
								address, city or town, state or province, country,
								ZIP or foreign postal code, and telephone no.</span>
							<textarea id="f1099g-XX-payer"
								placeholder="Payer Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number">
							</textarea>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">PAYER&apos;S TIN</span>
								<input type="text" id="f1099g-XX-ein"
									placeholder="12-3456789" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">TAXPAYER&apos;S TIN</span>
								<input type="text" id="f1099g-XX-ssn"
									placeholder="123-45-6789" />
							</div>
						</div>

						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">TAXPAYER&apos;S name, street
								address, city or town, state, and ZIP code</span>
							<textarea id="f1099g-XX-taxpayer"
								placeholder="Taxpayer&apos;s Name&#10;Street Address&#10;City, State, ZIP">
							</textarea>
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
									or business income</span>
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
			<div>&nbsp;</div>
		</details>
`;

export class F1099G extends TaxForm {
	static createForm(uid) {
		//
		// Create a new form and initialize it with information from the Web page.
		// If the user hasn't entered any information, don't bother creating the form.
		//
		const inputs = F1099G.getUserInput(uid);
		if (!Objects.isUsed(inputs)) {
			return;
		}

		const newform = TaxFormObj.createForm("F1099G");

		for (const key of Object.keys(inputs)) {
			newform.lines[key].user_value = inputs[key];
		}

		return newform;
	}

	static getInputHTML(uid) {
		if (!uid) {
			throw new Error(`F1099G.getInputHTML(): UID is undefined.`);
		}

		const html = HTML_FORM.replace(/XX/g, uid)
								.replace(/202X/g, TaxTable.getTaxYear());

		return [ `f1099g-${uid}-container`, html ];
	}

	static getUserInput(uid) {
		//
		// Read the fields of the form from the web and return an object with the
		// information.
		//
		if (!uid) {
			throw new Error(`F1099G.getUserInput(): UID is undefined.`);
		}

		const element = document.getElementById(`f1099g-${uid}-container`);
		if (!element) {
			throw new Error(
				`F1099G.getUserInput(): Element not found: f1099g-${uid}-container`);
		}

		let inputs = {};

		inputs["payer"]		= HTML.getUserInput(`f1099g-${uid}-payer`,		"text");
		inputs["ein"]		= HTML.getUserInput(`f1099g-${uid}-ein`,		"text");
		inputs["ssn"]		= HTML.getUserInput(`f1099g-${uid}-ssn`,		"text");
		inputs["taxpayer"]	= HTML.getUserInput(`f1099g-${uid}-taxpayer`,	"text");
		inputs["account"]	= HTML.getUserInput(`f1099g-${uid}-account`,	"text");
		inputs["01"]		= HTML.getUserInput(`f1099g-${uid}-01`);
		inputs["02"]		= HTML.getUserInput(`f1099g-${uid}-02`);
		inputs["03"]		= HTML.getUserInput(`f1099g-${uid}-03`);
		inputs["04"]		= HTML.getUserInput(`f1099g-${uid}-04`);
		inputs["05"]		= HTML.getUserInput(`f1099g-${uid}-05`);
		inputs["06"]		= HTML.getUserInput(`f1099g-${uid}-06`);
		inputs["07"]		= HTML.getUserInput(`f1099g-${uid}-07`);
		inputs["08"]		= HTML.getUserInput(`f1099g-${uid}-08`);
		inputs["09"]		= HTML.getUserInput(`f1099g-${uid}-09`);
		inputs["10"]		= HTML.getUserInput(`f1099g-${uid}-10`);
		inputs["11"]		= HTML.getUserInput(`f1099g-${uid}-11`, "text");
		inputs["12"]		= HTML.getUserInput(`f1099g-${uid}-12`);

		return inputs;
	}

	constructor(formname) {
		Debug.enter("F1099G.Constructor()");
		super(formname);
		this.title = `1099-G - Certain Government Payments`;

		this.payer				= 0;
		this.ein				= 0;
		this.ssn				= 0;
		this.taxpayer			= 0;
		this.account			= 0;

		this.lines["01"]		= new Line("Unemployment compensation");
		this.lines["02"]		= new Line("State tax refunds, credits, or offsets");
		this.lines["03"]		= new Line("Box 2 amount is for tax year");
		this.lines["04"]		= new Line("Federal income tax withheld");
		this.lines["05"]		= new Line("RTAA payments");
		this.lines["06"]		= new Line("Taxable grants");
		this.lines["07"]		= new Line("Agriculture payments");
		this.lines["08"]		= new Line("Check if box 2 is trade or business income");
		this.lines["09"]		= new Line("Market gain");
		this.lines["10"]		= new Line("Family leave benefits");
		this.lines["11"]		= new Line("State/state no.");
		this.lines["12"]		= new Line("State tax withheld");

		Debug.exit("F1099G.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F1099G.calculate()");

		this.calculated = true;

		Debug.exit("F1099G.calculate()");
	}
}
