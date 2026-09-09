
import { Debug }		from "../Classes/Debug.js";
import { HTML }			from "../Classes/HTML.js";
import { Line }			from "../Classes/Line.js";
import { Objects }		from "../Classes/Objects.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Classes/TaxFormObj.js";
import { TaxTable }		from "../Classes/TaxTable.js";

const HTML_FORM = `
		<details class="taxform-details" id="f1099int-XX-container">
			<summary class="taxform-summary">1099-INT - Interest Income</summary>
			<div>&nbsp;</div>
			<div class="f1099-taxform-container">
				<!-- Header Section -->
				<div class="f1099-header-row">
					<div class="f1099-header-left">
						<label><input type="checkbox" disabled
							id="corrected" /> CORRECTED</label>
					</div>
					<div class="f1099-header-center">
						<div>OMB No. 1545-0112</div>
						<h1><span id="tax-year">202X</span></h1>
						<h2>Form 1099-INT</h2>
					</div>
					<div class="f1099-header-right">
						<strong>Interest Income</strong>
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
							<textarea id="f1099int-XX-payer"
								placeholder="Payer Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number">
							</textarea>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">PAYER&apos;S TIN</span>
								<input type="text" id="f1099int-XX-ein"
									placeholder="12-3456789" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">TAXPAYER&apos;S TIN</span>
								<input type="text" id="f1099int-XX-ssn"
									placeholder="123-45-6789" />
							</div>
						</div>

						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">TAXPAYER&apos;S name, street
								address, city or town, state, and ZIP code</span>
							<textarea id="f1099int-XX-taxpayer"
								placeholder="Taxpayer&apos;s Name&#10;Street Address&#10;City, State, ZIP">
							</textarea>
						</div>

						<div class="f1099-box" style="border-bottom: none;">
							<span class="f1099-box-label">Account number (see
								instructions)</span>
							<input type="text" id="f1099int-XX-account"
								placeholder="Optional Account #" />
						</div>
					</div>

					<!-- Right Column: Numbered Input Boxes -->
					<div class="f1099-col-right">
						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">1 Interest income</span>
								<input type="text" id="f1099int-XX-01"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">2 Early withdrawal
									penalty</span>
								<input type="text" id="f1099int-XX-02"
									placeholder="0" />
							</div>
							<div class="f1099-box input-color">
								<span class="f1099-box-label">3 Interest on U.S.
									Savings Bonds</span>
								<input type="text" id="f1099int-XX-03"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">4 Federal income tax
									withheld</span>
								<input type="text" id="f1099int-XX-04"
									placeholder="0" />
							</div>
							<div class="f1099-box input-color">
								<span class="f1099-box-label">5 Investment expenses</span>
								<input type="text" id="f1099int-XX-05"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">8 Tax-exempt interest</span>
								<input type="text" id="f1099int-XX-08"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">9 Specified private activity
									bond interest</span>
								<input type="text" id="f1099int-XX-09"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">10 Market discount</span>
								<input type="text" id="f1099int-XX-10"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">11 Bond premium</span>
								<input type="text" id="f1099int-XX-11"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box" style="border-bottom: none;">
								<span class="f1099-box-label">15/16 State/state no.</span>
								<input type="text" id="f1099int-XX-15"
									placeholder="State / ID" />
							</div>
							<div class="f1099-box input-color" style="border-bottom: none;">
								<span class="f1099-box-label">17 State Tax Withheld</span>
								<input type="text" id="f1099int-XX-17"
									placeholder="0" />
							</div>
						</div>
					</div>
				</div>		<!-- Main grid -->
			</div>	<!-- f1099-taxform-container -->
			<div class="f1099-footer-note">Form <strong>1099-INT</strong></div>
			<div>&nbsp;</div>
		</details>
`;

export class F1099INT extends TaxForm {
	static createForm(uid) {
		//
		// Create a new form and initialize it with information from the Web page.
		// If the user hasn't entered any information, don't bother creating the form.
		//
		const inputs = F1099INT.getUserInput(uid);
		if (!Objects.isUsed(inputs)) {
			return;
		}

		const newform = TaxFormObj.createForm("F1099INT");

		for (const key of Object.keys(inputs)) {
			newform.lines[key].user_value = inputs[key];
		}

		return newform;
	}

	static getInputHTML(uid) {
		if (!uid) {
			throw new Error(`f1099int.getInputHTML(): UID is undefined.`);
		}

		const html = HTML_FORM.replace(/XX/g, uid)
								.replace(/202X/g, TaxTable.getTaxYear());

		return [ `f1099int-${uid}-container`, html ];
	}

	static getUserInput(uid) {
		//
		// Read the fields of the form from the web and return an object with the
		// information.
		//
		if (!uid) {
			throw new Error(`f1099int.getUserInput(): UID is undefined.`);
		}

		const element = document.getElementById(`f1099int-${uid}-container`);
		if (!element) {
			throw new Error(
				`f1099int.getUserInput(): Element not found: f1099int-${uid}-container`);
		}

		let inputs = {};

		// Specify "" as the default value to getUserInput(). This allows the tool to
		// distinguish between when the the user enters a zero and when it is the default
		// value.	
		inputs["payer"]		= HTML.getUserInput(`f1099int-${uid}-payer`,	"text");
		inputs["ein"]		= HTML.getUserInput(`f1099int-${uid}-ein`,		"text");
		inputs["ssn"]		= HTML.getUserInput(`f1099int-${uid}-ssn`,		"text");
		inputs["taxpayer"]	= HTML.getUserInput(`f1099int-${uid}-taxpayer`,	"text");
		inputs["account"]	= HTML.getUserInput(`f1099int-${uid}-account`,	"text");
		inputs["01"	]		= HTML.getUserInput(`f1099int-${uid}-01`, "");
		inputs["02"	]		= HTML.getUserInput(`f1099int-${uid}-02`, "");
		inputs["03"	]		= HTML.getUserInput(`f1099int-${uid}-03`, "");
		inputs["04"	]		= HTML.getUserInput(`f1099int-${uid}-04`, "");
		inputs["05"	]		= HTML.getUserInput(`f1099int-${uid}-05`, "");
		inputs["08"	]		= HTML.getUserInput(`f1099int-${uid}-08`, "");
		inputs["09"	]		= HTML.getUserInput(`f1099int-${uid}-09`, "");
		inputs["10"	]		= HTML.getUserInput(`f1099int-${uid}-10`, "");
		inputs["11"	]		= HTML.getUserInput(`f1099int-${uid}-11`, "");
		inputs["15"	]		= HTML.getUserInput(`f1099int-${uid}-15`, "text");
		inputs["17"	]		= HTML.getUserInput(`f1099int-${uid}-17`, "");

		return inputs;
	}

	static saveUserInput(uid) {
		//
		// Read the fields of the form from the web, but do not alter the information, for
		// example by changing "" to 0 or removing commas.
		//
		if (!uid) {
			throw new Error(`f1099int.getUserInput(): UID is undefined.`);
		}

		const element = document.getElementById(`f1099int-${uid}-container`);
		if (!element) {
			throw new Error(
				`f1099int.getUserInput(): Element not found: f1099int-${uid}-container`);
		}

		let inputs = {};

		inputs["payer"]		= HTML.getElementValue(`f1099int-${uid}-payer`);
		inputs["ein"]		= HTML.getElementValue(`f1099int-${uid}-ein`);
		inputs["ssn"]		= HTML.getElementValue(`f1099int-${uid}-ssn`);
		inputs["taxpayer"]	= HTML.getElementValue(`f1099int-${uid}-taxpayer`);
		inputs["account"]	= HTML.getElementValue(`f1099int-${uid}-account`);
		inputs["01"	]		= HTML.getElementValue(`f1099int-${uid}-01`);
		inputs["02"	]		= HTML.getElementValue(`f1099int-${uid}-02`);
		inputs["03"	]		= HTML.getElementValue(`f1099int-${uid}-03`);
		inputs["04"	]		= HTML.getElementValue(`f1099int-${uid}-04`);
		inputs["05"	]		= HTML.getElementValue(`f1099int-${uid}-05`);
		inputs["08"	]		= HTML.getElementValue(`f1099int-${uid}-08`);
		inputs["09"	]		= HTML.getElementValue(`f1099int-${uid}-09`);
		inputs["10"	]		= HTML.getElementValue(`f1099int-${uid}-10`);
		inputs["11"	]		= HTML.getElementValue(`f1099int-${uid}-11`);
		inputs["15"	]		= HTML.getElementValue(`f1099int-${uid}-15`);
		inputs["17"	]		= HTML.getElementValue(`f1099int-${uid}-17`);

		return inputs;
	}

	constructor(formname) {
		Debug.enter("f1099int.Constructor()");
		super(formname);
		this.title = `1099-INT - Interest Income`;

		this.payer				= 0;
		this.ein				= 0;
		this.ssn				= 0;
		this.taxpayer			= 0;
		this.account			= 0;

		this.lines["01"]		= new Line("Interest income");
		this.lines["02"]		= new Line("Early Withdrawal Penalty");
		this.lines["03"]		= new Line("Interest on U.S. Savings Bonds");
		this.lines["04"]		= new Line("Federal income tax withheld");
		this.lines["05"]		= new Line("Investment expenses");
		this.lines["08"]		= new Line("Tax-exempt interest");
		this.lines["09"]		= new Line("Specified private activity bond interest");
		this.lines["10"]		= new Line("Market discount");
		this.lines["11"]		= new Line("Bond premium");
		this.lines["15"]		= new Line("State/State no.");
		this.lines["17"]		= new Line("State tax withheld");

		Debug.exit("f1099int.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("f1099int.calculate()");

		this.calculated = true;

		Debug.exit("f1099int.calculate()");
	}
}
