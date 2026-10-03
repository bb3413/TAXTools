
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
	"01a":				[""],
	"01b":				[""],
	"01c":				["text"],
	"01d":				[""],
	"02":				[""],
	"03":				[""],
	"04":				[""],
	"05":				[""],
	"06":				["text"],
	"07":				[""],
	"business-name":	["text"],
};

const HTML_FORM = `
		<details class="taxform-details" id="f1099nec-XX-container">
			<summary class="taxform-summary">1099-NEC - Non-employee Compensation</summary>
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
								placeholder="Payer Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number"></textarea>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">PAYER&apos;S TIN</span>
								<input type="text" id="f1099nec-XX-ein"
									placeholder="12-3456789" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">RECIPIENT&apos;S TIN</span>
								<input type="text" id="f1099nec-XX-ssn"
									placeholder="123-45-6789" />
							</div>
						</div>

						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">RECIPIENT&apos;S name, street
								address, city or town, state, and ZIP code</span>
							<textarea id="f1099nec-XX-taxpayer"
								placeholder="Taxpayer&apos;s Name&#10;Street Address&#10;City, State, ZIP"></textarea>
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
								<span class="f1099-box-label">1a Non-employee
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
									<input type="checkbox" id="f1099nec-XX-02" />
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
							<div class="f1099-box input-color">
								<span class="f1099-box-label">4 Federal income tax
									withheld</span>
								<input type="text" id="f1099nec-XX-04"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label"></span>
								<input type="text" placeholder="" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label"></span>
								<input type="text" placeholder="" />
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

			<div class="supplemental-line-150-400">
				<p>Name of Business</p>
				<input class="input-field left" type="text" spellcheck="false"
					size="45" id="f1099nec-XX-business-name" />
			</div>
			<div>&nbsp;</div>
		</details>
`;

export class F1099NEC extends TaxForm {
	static getHTML(uid) {
		if (!uid) {
			throw new Error(`F1099NEC.getHTML(): UID is undefined.`);
		}

		const html = HTML_FORM.replace(/XX/g, uid)
								.replace(/202X/g, TaxTable.getTaxYear());

		return [ `f1099nec-${uid}-container`, html ];
	}

	static getInputFromWeb(uid, raw = false) {
		//
		// Read the fields of the form from the web and return an object with the
		// information. Raw user input is only used to save and restore user input.
		//
		if (!uid) {
			throw new Error(`F1099NEC.getInputFromWeb(): UID is undefined.`);
		}

		const element = document.getElementById(`f1099nec-${uid}-container`);
		if (!element) {
			throw new Error(
				`F1099NEC.getInputFromWeb(): Element not found: f1099nec-${uid}-container`);
		}

		let inputs = {};
		const form_id = "f1099nec";

		for (const field_name of Object.keys(ELEMENTS)) {
			const value_type	= raw ? "raw" : ELEMENTS[field_name][0];
			const key_name		= field_name.replace(/-/g, "_");
			const element_id	= `${form_id}-${uid}-${field_name}`;
			inputs[key_name]	= HTML.getUserInput(element_id, value_type);
		}

		return inputs;
	}

	constructor(formname) {
		Debug.enter("F1099NEC.Constructor()");
		super(formname);
		this.title = `1099-NEC - Non-employee Compensation`;

		this.lines["payer"]		= new Line("Payer");
		this.lines["ein"]		= new Line("EIN");
		this.lines["ssn"]		= new Line("SSN");
		this.lines["taxpayer"]	= new Line("Taxpayer");
		this.lines["account"]	= new Line("Account");
		this.lines["business_bame"]	= new Line("Business Name");
		this.lines["01a"]		= new Line("Non-employee compensation");
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

	loadInputFromWeb(inputs) {
		//
		// The inputs parameter is an object that contains all the input fields from the
		// form's web page. This method copies those fields to the corresponding locations
		// in this instance of the form.
		//
		for (const key of Object.keys(inputs)) {
			switch (key) {
				case "business_name":
					this[key] = inputs[key];
					break;
				default:
					this.lines[key].user_value = inputs[key];
					break;
			}
		}
	}
}
