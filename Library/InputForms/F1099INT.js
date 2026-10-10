
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
	"payer":			["text"],
	"ein":				["text"],
	"ssn":				["text"],
	"taxpayer":			["text"],
	"account":			["text"],
	"01":				[""],
	"02":				[""],
	"03":				[""],
	"04":				[""],
	"05":				[""],
	"06":				[""],
	"07":				["text"],
	"08":				[""],
	"09":				[""],
	"10":				[""],
	"11":				[""],
	"15":				["text"],
	"17":				[""],
};

const HTML_FORM = `
		<details class="taxform-details" id="f1099int-XX-container">
			<summary class="taxform-summary">1099-INT - Interest Income</summary>
			<div>&nbsp;</div>

			<div class="taxform-owner">
				<input type="radio" name="f1099int-XX-owner"
					id="f1099int-XX-is-taxpayers" checked />
				<label for="f1099int-XX-is-taxpayers">
					Taxpayer&apos;s Tax Form</label>

				<input type="radio" name="f1099int-XX-owner"
					id="f1099int-XX-is-spouses" />
				<label for="f1099int-XX-is-spouses">
					Spouse&apos;s Tax Form</label>
				</div>
			</div>

			<div class="f1099-taxform-container">
				<!-- Header Section -->
				<div class="f1099-header-row">
					<div class="f1099-header-left">
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
							<span class="f1099-box-label">Payer&apos;S name, street
								address, city or town, state or province, country,
								ZIP or foreign postal code, and telephone no.</span>
							<textarea id="f1099int-XX-payer"
								placeholder="Payer Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number"></textarea>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">Payer&apos;S TIN</span>
								<input type="text" id="f1099int-XX-ein"
									placeholder="12-3456789" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">RECIPIENT&apos;S TIN</span>
								<input type="text" id="f1099int-XX-ssn"
									placeholder="123-45-6789" />
							</div>
						</div>

						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">RECIPIENT&apos;S name, street
								address, city or town, state, and ZIP code</span>
							<textarea id="f1099int-XX-taxpayer"
								placeholder="Taxpayer&apos;s Name&#10;Street Address&#10;City, State, ZIP"></textarea>
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
							<div class="f1099-box">
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
								<span class="f1099-box-label">6 Foreign tax paid</span>
								<input type="text" id="f1099int-XX-06"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">7 Foreign country or U.S.
									territory</span>
								<input type="text" id="f1099int-XX-07"
									placeholder="" />
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
	static getHTML(uid) {
		if (!uid) {
			throw new Error(`f1099int.getHTML(): UID is undefined.`);
		}

		const html = HTML_FORM.replace(/XX/g, uid)
								.replace(/202X/g, TaxTable.getTaxYear());

		return [ `f1099int-${uid}-container`, html ];
	}

	static getInputFromWeb(uid, raw = false) {
		//
		// Read the fields of the form from the web and return an object with the
		// information. Raw user input is only used to save and restore user input.
		//
		if (!uid) {
			throw new Error(`f1099int.getInputFromWeb(): UID is undefined.`);
		}

		const element = document.getElementById(`f1099int-${uid}-container`);
		if (!element) {
			throw new Error(
				`f1099int.getInputFromWeb(): Element not found: f1099int-${uid}-container`);
		}

		let inputs = {};
		const form_id = "f1099int";

		for (const field_name of Object.keys(ELEMENTS)) {
			const value_type	= raw ? "raw" : ELEMENTS[field_name][0];
			const key_name		= field_name.replace(/-/g, "_");
			const element_id	= `${form_id}-${uid}-${field_name}`;
			inputs[key_name]	= HTML.getUserInput(element_id, value_type);
		}

		return inputs;
	}

	constructor(formname) {
		Debug.enter("f1099int.Constructor()");
		super(formname);
		this.title = `1099-INT - Interest Income`;

		this.lines["is_spouses"]= new Line("Spouse's Tax Form");
		this.lines["payer"]		= new Line("Payer");
		this.lines["ein"]		= new Line("EIN");
		this.lines["ssn"]		= new Line("SSN");
		this.lines["taxpayer"]	= new Line("Taxpayer");
		this.lines["account"]	= new Line("Account");
		this.lines["01"]		= new Line("Interest income");
		this.lines["02"]		= new Line("Early Withdrawal Penalty");
		this.lines["03"]		= new Line("Interest on U.S. Savings Bonds");
		this.lines["04"]		= new Line("Federal income tax withheld");
		this.lines["05"]		= new Line("Investment expenses");
		this.lines["06"]		= new Line("Foreign tax paid");
		this.lines["07"]		= new Line("Foreign country or U.S. territory");
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
