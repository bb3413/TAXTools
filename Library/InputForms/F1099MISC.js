
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
	"01":				[],
	"02":				[],
	"03":				[],
	"04":				[],
	"05":				[],
	"06":				[],
	"07":				[],
	"08":				[],
	"09":				[],
	"10":				[],
	"11":				[],
	"12":				[],
	"13a":				[],
	"13b":				["text"],
	"14":				[],
	"15":				[],
	"16":				[],
	"17":				["text"],
	"business-name":	["text"],
};

const HTML_FORM = `
		<details class="taxform-details" id="f1099misc-XX-container">
			<summary class="taxform-summary">1099-MISC - Miscellaneous Information</summary>
			<div>&nbsp;</div>
			<div class="f1099-taxform-container">
				<!-- Header Section -->
				<div class="f1099-header-row">
					<div class="f1099-header-left">
						<label><input type="checkbox" disabled
							id="corrected" /> CORRECTED</label>
					</div>
					<div class="f1099-header-center">
						<div>OMB No. 1545-0115</div>
						<h1><span id="tax-year">202X</span></h1>
						<h2>Form 1099-MISC</h2>
					</div>
					<div class="f1099-header-right">
						<strong>Miscellaneous Information</strong>
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
							<textarea id="f1099misc-XX-payer"
								placeholder="Payer Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number"></textarea>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">PAYER&apos;S TIN</span>
								<input type="text" id="f1099misc-XX-ein"
									placeholder="12-3456789" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">RECIPIENT&apos;S TIN</span>
								<input type="text" id="f1099misc-XX-ssn"
									placeholder="123-45-6789" />
							</div>
						</div>

						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">RECIPIENT&apos;S name, street
								address, city or town, state, and ZIP code</span>
							<textarea id="f1099misc-XX-taxpayer"
								placeholder="Taxpayer&apos;s Name&#10;Street Address&#10;City, State, ZIP"></textarea>
						</div>

						<div class="f1099-box" style="border-bottom: none;">
							<span class="f1099-box-label">Account number (see
								instructions)</span>
							<input type="text" id="f1099misc-XX-account"
								placeholder="Optional Account #" />
						</div>
					</div>

					<!-- Right Column: Numbered Input Boxes -->
					<div class="f1099-col-right">
						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">1 Rents</span>
								<input type="text" id="f1099misc-XX-01"
									placeholder="0" />
							</div>
							<div class="f1099-box input-color">
								<span class="f1099-box-label">2 Royalties</span>
								<input type="text" id="f1099misc-XX-02"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">3 Other income</span>
								<input type="text" id="f1099misc-XX-03"
									placeholder="0" />
							</div>
							<div class="f1099-box input-color">
								<span class="f1099-box-label">4 Federal income tax
									withheld</span>
								<input type="text" id="f1099misc-XX-04"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">5 Fishing boat proceeds</span>
								<input type="text" id="f1099misc-XX-05"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">6 Medical and health care
									payments</span>
								<input type="text" id="f1099misc-XX-06"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">7 Payer made direct sales
									totaling $5,000 or more of consumer products to recipient
									for resale</span>
								<div class="f1099-checkbox-center">
									<input type="checkbox" id="f1099misc-XX-07" />
								</div>
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">8 Substitute payments in
									lieu of dividends or interest</span>
								<input type="text" id="f1099misc-XX-08"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">9 Crop insurance
									proceeds</span>
								<input type="text" id="f1099misc-XX-09"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">10 Gross proceeds paid to an
									attorney</span>
								<input type="text" id="f1099misc-XX-10"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">11 Fish purchased for
									resale</span>
								<input type="text" id="f1099misc-XX-11"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">12 Section 409A
									deferrals</span>
								<input type="text" id="f1099misc-XX-12"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">13a Cash tips</span>
								<input type="text" id="f1099misc-XX-13a"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">13b TTOC</span>
								<input type="text" id="f1099misc-XX-13b" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">14 Overtime compensation</span>
								<input type="text" id="f1099misc-XX-14"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">15 Nonqualified deferred
									compensation</span>
								<input type="text" id="f1099misc-XX-15"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box input-color" style="border-bottom: none;">
								<span class="f1099-box-label">16 State tax withheld</span>
								<input type="text" id="f1099misc-XX-16"
									placeholder="0" />
							</div>
							<div class="f1099-box" style="border-bottom: none;">
								<span class="f1099-box-label">17 State/state no.</span>
								<input type="text" id="f1099misc-XX-17"
									placeholder="State / ID" />
							</div>
						</div>
					</div>
				</div>		<!-- Main grid -->
			</div>		<!-- f1099-taxform-container -->
			<div class="f1099-footer-note">Form <strong>1099-MISC</strong></div>
			<div>&nbsp;</div>

			<div class="supplemental-line-150-400">
				<p>Name of Business (if applicable)</p>
				<input class="input-field left" type="text" spellcheck="false"
					size="45" id="f1099misc-XX-business-name" />
			</div>
			<div>&nbsp;</div>
		</details>
`;

export class F1099MISC extends TaxForm {
	static getHTML(uid) {
		if (!uid) {
			throw new Error(`F1099MISC.getHTML(): UID is undefined.`);
		}

		const html = HTML_FORM.replace(/XX/g, uid)
								.replace(/202X/g, TaxTable.getTaxYear());

		return [ `f1099misc-${uid}-container`, html ];
	}

	static getInputFromWeb(uid, raw = false) {
		//
		// Read the fields of the form from the web and return an object with the
		// information. Raw user input is only used to save and restore user input.
		//
		if (!uid) {
			throw new Error(`F1099MISC.getInputFromWeb(): UID is undefined.`);
		}

		const element = document.getElementById(`f1099misc-${uid}-container`);
		if (!element) {
			throw new Error(
				`F1099MISC.getInputFromWeb(): Element not found: f1099misc-${uid}-container`);
		}

		let inputs = {};

		for (const field_name of Object.keys(ELEMENTS)) {
			const value_type	= raw ? "raw" : ELEMENTS[field_name][0];
			const key_name		= field_name.replace(/-/g, "_");
			const element_id	= `f1099g-${uid}-${field_name}`;
			inputs[key_name]	= HTML.getUserInput(element_id, value_type);
		}

		return inputs;
	}

	constructor(formname) {
		Debug.enter("F1099MISC.Constructor()");
		super(formname);
		this.title = `1099-MISC - Miscellaneous Information`;

		this.lines["payer"]		= new Line("Payer");
		this.lines["ein"]		= new Line("EIN");
		this.lines["ssn"]		= new Line("SSN");
		this.lines["taxpayer"]	= new Line("Taxpayer");
		this.lines["account"]	= new Line("Account");
		this.lines["business_name"]	= new Line("Business Name");
		this.lines["01"]		= new Line("Rents");
		this.lines["02"]		= new Line("Royalties");
		this.lines["03"]		= new Line("Other income");
		this.lines["04"]		= new Line("Federal income tax withheld");
		this.lines["05"]		= new Line("Fishing boat proceeds");
		this.lines["06"]		= new Line("Medical and health care payments");
		this.lines["07"]		= new Line("Payer sold $5,000 of consumer products");
		this.lines["08"]		= new Line("Substitute payments for dividends or interest");
		this.lines["09"]		= new Line("Crop insurance proceeds");
		this.lines["10"]		= new Line("Gross proceeds paid to an attorney");
		this.lines["11"]		= new Line("Fish purchased for resale");
		this.lines["12"]		= new Line("Section 409A deferrals");
		this.lines["13a"]		= new Line("Cash tips");
		this.lines["13b"]		= new Line("TTOC");
		this.lines["14"]		= new Line("Overtime compensation");
		this.lines["15"]		= new Line("Nonqualified deferred compensation");
		this.lines["16"]		= new Line("State tax withheld");
		this.lines["17"]		= new Line("State/state no.");

		Debug.exit("F1099MISC.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F1099MISC.calculate()");

		this.calculated = true;

		Debug.exit("F1099MISC.calculate()");
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
