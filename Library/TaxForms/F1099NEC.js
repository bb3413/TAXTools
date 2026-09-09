
import { Debug }		from "../Classes/Debug.js";
import { HTML }			from "../Classes/HTML.js";
import { Line }			from "../Classes/Line.js";
import { Objects }		from "../Classes/Objects.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Classes/TaxFormObj.js";
import { TaxTable }		from "../Classes/TaxTable.js";

const HTML_FORM = `
		<details class="taxform-details" id="f1099nec-XX-container">
			<summary class="taxform-summary">1099-NEC - Nonemployee Compensation</summary>
			<div>&nbsp;</div>
			<div class="f1099-taxform-container">
				<!-- Header Section -->
				<div class="f1099-header-row">
					<div class="f1099-header-left"> 
						<label><input type="checkbox" disabled
							id="corrected" /> CORRECTED</label>
					</div>
					<div class="f1099-header-center">
						<div>OMB No. 1545-0116</div>
						<h1><span id="tax-year">202X</span></h1>
						<h2>Form 1099-NEC</h2>
					</div>
					<div class="f1099-header-right">
						<strong>Nonemployee Compensation</strong>
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
							<textarea id="f1099nec-XX-payer"
								placeholder="Payer Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number">
							</textarea>
						</div>
			
						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">PAYER&apos;S TIN</span>
								<input type="text" id="f1099nec-XX-ein"
									placeholder="12-3456789" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">TAXPAYER&apos;S TIN</span>
								<input type="text" id="f1099nec-XX-ssn"
									placeholder="123-45-6789" />
							</div>
						</div>
			
						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">TAXPAYER&apos;S name, street
								address, city or town, state, and ZIP code</span>
							<textarea id="f1099nec-XX-taxpayer"
								placeholder="Taxpayer&apos;s Name&#10;Street Address&#10;City, State, ZIP">
							</textarea>
						</div>

						<div class="f1099-box" style="border-bottom: none;">
							<span class="f1099-box-label">Account number (see
								instructions)</span>
							<input type="text" id="f1099nec-XX-account"
								placeholder="Optional Account #" />
						</div>
					</div>
			
					<!-- Right Column: Numbered Input Boxes -->
					<div class="f1099-col-right">
						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">1a Nonemployee
									compensation</span>
								<input type="text" id="f1099nec-XX-01a"
									placeholder="0" />
							</div>
							<div class="f1099-box input-color">
								<span class="f1099-box-label">1b Cash tips</span>
								<input type="text" id="f1099nec-XX-01b"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">1c TTOC</span>
								<input type="text" id="f1099nec-XX-01c" />
							</div>
							<div class="f1099-box input-color">
								<span class="f1099-box-label">1d Overtime compensation</span>
								<input type="text" id="f1099nec-XX-01d"
									placeholder="0" />
							</div>
						</div>
			
						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">2 Payer made direct sales
									totaling $5,000 or more of consumer products</span>
								<div class="f1099-checkbox-center">
									<label><input type="checkbox" id="f1099nec-XX-02" />
										Check if applicable</label>
								</div>
							</div>
						</div>
			
						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">3 Excess golden parachute
									payments</span>
								<input type="text" id="f1099nec-XX-03"
									placeholder="0" />
							</div>
						</div>
			
						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">4 Federal income tax
									withheld</span>
								<input type="text" id="f1099nec-XX-04"
									placeholder="0" />
							</div>
						</div>
			
						<div class="f1099-flex-row">
							<div class="f1099-box input-color" style="border-bottom: none;">
								<span class="f1099-box-label">5 State tax withheld</span>
								<input type="text" id="f1099nec-XX-05"
									placeholder="0" />
							</div>
							<div class="f1099-box" style="border-bottom: none;">
								<span class="f1099-box-label">6 State/state no.</span>
								<input type="text" id="f1099nec-XX-06"
									placeholder="State / ID" />
							</div>
							<div class="f1099-box" style="border-bottom: none;">
								<span class="f1099-box-label">7 State income</span>
								<input type="text" id="f1099nec-XX-07"
									placeholder="0" />
							</div>
						</div>
					</div>
				</div>		<!-- Main grid -->
			</div>		<!-- f1099-taxform-container -->
			<div class="f1099-footer-note">Form <strong>1099-NEC</strong></div>
			<div>&nbsp;</div>

			<div class="supplimental-input-line">
				<p>Name of Business</p>
				<input class="input-field left" type="text" spellcheck="false"
					size="45" id="f1099nec-XX-business-name" />
			</div>
		</details>
`;

export class F1099NEC extends TaxForm {
	static createForm(uid) {
		//
		// Create a new form and initialize it with information from the Web page.
		// If the user hasn't entered any information, don't bother creating the form.
		//
		const inputs = F1099NEC.getUserInput(uid);
		if (!Objects.isUsed(inputs)) {
			return;
		}

		const newform = TaxFormObj.createForm("F1099NEC");

		for (const key of Object.keys(inputs)) {
			newform.lines[key].user_value = inputs[key];
		}

		return newform;
	}

	static getInputHTML(uid) {
		if (!uid) {
			throw new Error(`F1099NEC.getInputHTML(): UID is undefined.`);
		}

		const html = HTML_FORM.replace(/XX/g, uid)
								.replace(/202X/g, TaxTable.getTaxYear());

		return [ `f1099nec-${uid}-container`, html ];
	}

	static getUserInput(uid) {
		//
		// Read the fields of the form from the web and return an object with the
		// information.
		//
		if (!uid) {
			throw new Error(`F1099NEC.getUserInput(): UID is undefined.`);
		}

		const element = document.getElementById(`f1099nec-${uid}-container`);
		if (!element) {
			throw new Error(
				`F1099NEC.getUserInput(): Element not found: f1099nec-${uid}-container`);
		}

		let inputs = {};

		// Specify "" as the default value to getUserInput(). This allows the tool to
		// distinguish between when the the user enters a zero and when it is the default
		// value.	
		inputs["payer"]		= HTML.getUserInput(`f1099nec-${uid}-payer`,	"text");
		inputs["ein"]		= HTML.getUserInput(`f1099nec-${uid}-ein`,		"text");
		inputs["ssn"]		= HTML.getUserInput(`f1099nec-${uid}-ssn`,		"text");
		inputs["taxpayer"]	= HTML.getUserInput(`f1099nec-${uid}-taxpayer`,	"text");
		inputs["account"]	= HTML.getUserInput(`f1099nec-${uid}-account`,	"text");
		inputs["01a"]		= HTML.getUserInput(`f1099nec-${uid}-01a`, "");
		inputs["01b"]		= HTML.getUserInput(`f1099nec-${uid}-01b`, "");
		inputs["01c"]		= HTML.getUserInput(`f1099nec-${uid}-01c`, "text");
		inputs["01d"]		= HTML.getUserInput(`f1099nec-${uid}-01d`, "");
		inputs["02"]		= HTML.getUserInput(`f1099nec-${uid}-02`, "");
		inputs["03"]		= HTML.getUserInput(`f1099nec-${uid}-03`, "");
		inputs["04"]		= HTML.getUserInput(`f1099nec-${uid}-04`, "");
		inputs["05"]		= HTML.getUserInput(`f1099nec-${uid}-05`, "");
		inputs["06"]		= HTML.getUserInput(`f1099nec-${uid}-06`, "text");
		inputs["07"]		= HTML.getUserInput(`f1099nec-${uid}-07`, "");

		return inputs;
	}

	static saveUserInput(uid) {
		//
		// Read the fields of the form from the web, but do not alter the information, for
		// example by changing "" to 0 or removing commas.
		//
		if (!uid) {
			throw new Error(`F1099NEC.getUserInput(): UID is undefined.`);
		}

		const element = document.getElementById(`f1099nec-${uid}-container`);
		if (!element) {
			throw new Error(
				`F1099NEC.getUserInput(): Element not found: f1099nec-${uid}-container`);
		}

		let inputs = {};
	
		inputs["payer"]		= HTML.getElementValue(`f1099nec-${uid}-payer`);
		inputs["ein"]		= HTML.getElementValue(`f1099nec-${uid}-ein`);
		inputs["ssn"]		= HTML.getElementValue(`f1099nec-${uid}-ssn`);
		inputs["taxpayer"]	= HTML.getElementValue(`f1099nec-${uid}-taxpayer`);
		inputs["account"]	= HTML.getElementValue(`f1099nec-${uid}-account`);
		inputs["01a"]		= HTML.getElementValue(`f1099nec-${uid}-01a`);
		inputs["01b"]		= HTML.getElementValue(`f1099nec-${uid}-01b`);
		inputs["01c"]		= HTML.getElementValue(`f1099nec-${uid}-01c`);
		inputs["01d"]		= HTML.getElementValue(`f1099nec-${uid}-01d`);
		inputs["02"]		= HTML.getElementValue(`f1099nec-${uid}-02`);
		inputs["03"]		= HTML.getElementValue(`f1099nec-${uid}-03`);
		inputs["04"]		= HTML.getElementValue(`f1099nec-${uid}-04`);
		inputs["05"]		= HTML.getElementValue(`f1099nec-${uid}-05`);
		inputs["06"]		= HTML.getElementValue(`f1099nec-${uid}-06`);
		inputs["07"]		= HTML.getElementValue(`f1099nec-${uid}-07`);

		return inputs;
	}

	constructor(formname) {
		Debug.enter("F1099NEC.Constructor()");
		super(formname);
		this.title = `1099-NEC - Nonemployee Compensation`;

		this.payer				= 0;
		this.ein				= 0;
		this.ssn				= 0;
		this.taxpayer			= 0;
		this.account			= 0;

		this.lines["01a"]		= new Line("Nonemployee compensation");
		this.lines["01b"]		= new Line("Cash tips");
		this.lines["01c"]		= new Line("TTOC");
		this.lines["01d"]		= new Line("Overtime compensation");
		this.lines["02"]		= new Line("Payer sold $5,000 of consumer products");
		this.lines["03"]		= new Line("Excess golden parachute payments");
		this.lines["04"]		= new Line("Federal income tax withheld");
		this.lines["05"]		= new Line("State tax withheld");
		this.lines["06"]		= new Line("State/state no.");
		this.lines["07"]		= new Line("State income");

		Debug.exit("F1099NEC.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F1099NEC.calculate()");

		this.calculated = true;

		Debug.exit("F1099NEC.calculate()");
	}
}
