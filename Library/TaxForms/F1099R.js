
import { Debug }		from "../Classes/Debug.js";
import { HTML }			from "../Classes/HTML.js";
import { Line }			from "../Classes/Line.js";
import { Objects }		from "../Classes/Objects.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Classes/TaxFormObj.js";
import { TaxTable }		from "../Classes/TaxTable.js";

const HTML_FORM = `
		<details class="taxform-details" id="f1099r-XX-container">
			<summary class="taxform-summary">1099-R - Distributions from Pensions, Annuities,
				Retirement Plans, etc.</summary>
			<div>&nbsp;</div>
			<div class="f1099-taxform-container">
				<!-- Header Section -->
				<div class="f1099-header-row">
					<div class="f1099-header-left"> 
						<label><input type="checkbox" disabled
							id="corrected" /> CORRECTED</label>
					</div>
					<div class="f1099-header-center">
						<div>OMB No. 1545-0119</div>
						<h1><span id="tax-year">202X</span></h1>
						<h2>Form 1099-R</h2>
					</div>
					<div class="f1099-header-right">
						<strong>Distributions From Pensions, Annuities, Retirement or
						Profit-Sharing Plans, IRAs, Insurance Contracts, etc.</strong>
					</div>
				</div>

				<!-- Main Content Grid -->
				<div class="f1099-main-grid">
					<!-- Left Column: Payer & Recipient Info Inputs -->
					<div class="f1099-col-left">
						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">PAYER&apos;S name, street
								address, city or town, state or province, country, and
								ZIP or foreign postal code</span>
							<textarea id="f1099r-XX-payer"
								placeholder="Payer Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number">
							</textarea>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">PAYER&apos;S TIN</span>
								<input type="text" id="f1099r-XX-ein"
									placeholder="12-3456789" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">TAXPAYER&apos;S TIN</span>
								<input type="text" id="f1099r-XX-ssn"
									placeholder="123-45-6789" />
							</div>
						</div>

						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">TAXPAYER&apos;S name, street
								address, city or town, state, and ZIP code</span>
							<textarea id="f1099r-XX-taxpayer"
								placeholder="Taxpayer&apos;s Name&#10;Street Address&#10;City, State, ZIP">
							</textarea>
						</div>

						<div class="f1099-box" style="border-bottom: none;">
							<span class="f1099-box-label">Account number (see
								instructions)</span>
							<input type="text" id="f1099r-XX-account"
								placeholder="Optional Account #" />
						</div>
					</div>

					<!-- Right Column: Numbered Input Boxes -->
					<div class="f1099-col-right">
						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">1 Gross distribution</span>
								<input type="text" id="f1099r-XX-01"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">2a Taxable amount</span>
								<input type="text" id="f1099r-XX-02a"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">2b Taxable amount not
									determined</span>
								<div><input type="checkbox" id="f1099r-XX-02b" /></div>
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Total distribution</span>
								<div><input type="checkbox"/></div>
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">3 Capital gain (included
									in box 2a)</span>
								<input type="text" id="f1099r-XX-03"
									placeholder="0" />
							</div>
							<div class="f1099-box input-color">
								<span class="f1099-box-label">4 Federal income tax
									withheld</span>
								<input type="text" id="f1099r-XX-04"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">5 Employee contrib. / 
									Designated Roth</span>
								<input type="text" id="f1099r-XX-05"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">6 Net unrealized
									appreciation</span>
								<input type="text" id="f1099r-XX-06"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">7a Distribution code(s)</span>
								<input type="text" id="f1099r-XX-07a" />
							</div>
							<div class="f1099-box input-color">
								<span class="f1099-box-label">7b IRA/SEP/SIMPLE</span>
								<div><input type="checkbox" id="f1099r-XX-07b" /></div>
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">7c Trump account</span>
								<div><input type="checkbox" id="f1099r-XX-07c" /></div>
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">7d Earnings on excess
									contribution</span>
								<div><input type="text" id="f1099r-XX-07d"
									placeholder="0" /></div>
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label"></span>
								<div></div>
							</div>
							<div class="f1099-box input-color">
								<span class="f1099-box-label">9b Total employee
									contributions</span>
								<input type="text" id="f1099r-XX-09b"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box input-color" style="border-bottom: none;">
								<span class="f1099-box-label">14 State tax withheld</span>
								<input type="text" id="f1099r-XX-14"
									placeholder="0" />
							</div>
							<div class="f1099-box" style="border-bottom: none;">
								<span class="f1099-box-label">15 State/state no.</span>
								<input type="text" id="f1099r-XX-15"
									placeholder="State / ID" />
							</div>
						</div>
					</div>
				</div>		<!-- Main grid -->
			</div>		<!-- f1099-taxform-container -->
			<div class="f1099-footer-note">Form <strong>1099-R</strong></div>
			<div>&nbsp;</div>
		</details>
`;

export class F1099R extends TaxForm {
	static createForm(uid) {
		//
		// Create a new form and initialize it with information from the Web page.
		// If the user hasn't entered any information, don't bother creating the form.
		//
		const inputs = F1099R.getUserInput(uid);
		if (!Objects.isUsed(inputs)) {
			return;
		}

		const newform = TaxFormObj.createForm("F1099R");

		for (const key of Object.keys(inputs)) {
			newform.lines[key].user_value = inputs[key];
		}

		return newform;
	}

	static getInputHTML(uid) {
		if (!uid) {
			throw new Error(`F1099R.getInputHTML(): UID is undefined.`);
		}

		const html = HTML_FORM.replace(/XX/g, uid)
								.replace(/202X/g, TaxTable.getTaxYear());

		return [ `f1099r-${uid}-container`, html ];
	}

	static getUserInput(uid) {
		//
		// Read the fields of the form from the web and return an object with the
		// information.
		//
		if (!uid) {
			throw new Error(`F1099R.getUserInput(): UID is undefined.`);
		}

		const element = document.getElementById(`f1099r-${uid}-container`);
		if (!element) {
			throw new Error(
				`F1099R.getUserInput(): Element not found: f1099r-${uid}-container`);
		}

		let inputs = {};

		// Specify "" as the default value to getUserInput(). This allows the tool to
		// distinguish between when the the user enters a zero and when it is the default
		// value.	
		inputs["payer"]		= HTML.getUserInput(`f1099r-${uid}-payer`,		"text");
		inputs["ein"]		= HTML.getUserInput(`f1099r-${uid}-ein`,		"text");
		inputs["ssn"]		= HTML.getUserInput(`f1099r-${uid}-ssn`,		"text");
		inputs["taxpayer"]	= HTML.getUserInput(`f1099r-${uid}-taxpayer`,	"text");
		inputs["account"]	= HTML.getUserInput(`f1099r-${uid}-account`,	"text");
		inputs["01"	]		= HTML.getUserInput(`f1099r-${uid}-01`, "");
		inputs["02a"]		= HTML.getUserInput(`f1099r-${uid}-02a`, "");
		inputs["02b"]		= HTML.getUserInput(`f1099r-${uid}-02b`, "");
		inputs["03"	]		= HTML.getUserInput(`f1099r-${uid}-03`, "");
		inputs["04"	]		= HTML.getUserInput(`f1099r-${uid}-04`, "");
		inputs["05"	]		= HTML.getUserInput(`f1099r-${uid}-05`, "");
		inputs["06"	]		= HTML.getUserInput(`f1099r-${uid}-06`, "");
		inputs["07a"]		= HTML.getUserInput(`f1099r-${uid}-07a`, "text");
		inputs["07b"]		= HTML.getUserInput(`f1099r-${uid}-07b`, "");
		inputs["07c"]		= HTML.getUserInput(`f1099r-${uid}-07c`, "");
		inputs["07d"]		= HTML.getUserInput(`f1099r-${uid}-07d`, "");
		inputs["09b"]		= HTML.getUserInput(`f1099r-${uid}-09b`, "");
		inputs["14"	]		= HTML.getUserInput(`f1099r-${uid}-14`, "");
		inputs["15"	]		= HTML.getUserInput(`f1099r-${uid}-15`, "text");

		return inputs;
	}

	static saveUserInput(uid) {
		//
		// Read the fields of the form from the web, but do not alter the information, for
		// example by changing "" to 0 or removing commas.
		//
		if (!uid) {
			throw new Error(`F1099R.getUserInput(): UID is undefined.`);
		}

		const element = document.getElementById(`f1099r-${uid}-container`);
		if (!element) {
			throw new Error(
				`F1099R.getUserInput(): Element not found: f1099r-${uid}-container`);
		}

		let inputs = {};
	
		inputs["payer"]		= HTML.getElementValue(`f1099r-${uid}-payer`);
		inputs["ein"]		= HTML.getElementValue(`f1099r-${uid}-ein`);
		inputs["ssn"]		= HTML.getElementValue(`f1099r-${uid}-ssn`);
		inputs["taxpayer"]	= HTML.getElementValue(`f1099r-${uid}-taxpayer`);
		inputs["account"]	= HTML.getElementValue(`f1099r-${uid}-account`);
		inputs["01"	]		= HTML.getElementValue(`f1099r-${uid}-01`);
		inputs["02a"]		= HTML.getElementValue(`f1099r-${uid}-02a`);
		inputs["02b"]		= HTML.getElementValue(`f1099r-${uid}-02b`);
		inputs["03"	]		= HTML.getElementValue(`f1099r-${uid}-03`);
		inputs["04"	]		= HTML.getElementValue(`f1099r-${uid}-04`);
		inputs["05"	]		= HTML.getElementValue(`f1099r-${uid}-05`);
		inputs["06"	]		= HTML.getElementValue(`f1099r-${uid}-06`);
		inputs["07a"]		= HTML.getElementValue(`f1099r-${uid}-07a`);
		inputs["07b"]		= HTML.getElementValue(`f1099r-${uid}-07b`);
		inputs["07c"]		= HTML.getElementValue(`f1099r-${uid}-07c`);
		inputs["07d"]		= HTML.getElementValue(`f1099r-${uid}-07d`);
		inputs["09b"]		= HTML.getElementValue(`f1099r-${uid}-09b`);
		inputs["14"	]		= HTML.getElementValue(`f1099r-${uid}-14`);
		inputs["15"	]		= HTML.getElementValue(`f1099r-${uid}-15`);

		return inputs;
	}

	constructor(formname) {
		Debug.enter("F1099R.Constructor()");
		super(formname);
		this.title =
			`1099-R - Distributions from Pensions, Annuities, Retirement Plans, etc.`;

		this.payer				= 0;
		this.ein				= 0;
		this.ssn				= 0;
		this.taxpayer			= 0;
		this.account			= 0;

		this.lines["01"]		= new Line("Gross distribution");
		this.lines["02a"]		= new Line("Taxable amount");
		this.lines["02b"]		= new Line("Taxable amount not determined");
		this.lines["03"]		= new Line("Capital gain (included in box 2a)");
		this.lines["04"]		= new Line("Federal income tax withheld");
		this.lines["05"]		= new Line("Employee contrib./Designated Roth");
		this.lines["06"]		= new Line("Net unrealized appreciation");
		this.lines["07a"]		= new Line("Distribution code(s)");
		this.lines["07b"]		= new Line("IRA/SEP/SIMPLE");
		this.lines["07c"]		= new Line("Trunp account");
		this.lines["07d"]		= new Line("Earnings on excess contribution");
		this.lines["09b"]		= new Line("Total employee contributions");
		this.lines["14"]		= new Line("State tax withheld");
		this.lines["15"]		= new Line("State/state no.");

		Debug.exit("F1099R.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F1099R.calculate()");

		this.calculated = true;

		Debug.exit("F1099R.calculate()");
	}
}
