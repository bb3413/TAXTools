
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
	"07":				["text"],
	"08":				[],
	"09":				[],
	"10":				[],
	"11":				[],
	"12":				["text"],
	"14":				[],
};

const HTML_FORM = `
		<details class="taxform-details" id="f1099oid-XX-container">
			<summary class="taxform-summary">1099-OID - Original Issue Discount</summary>
			<div>&nbsp;</div>
			<div class="f1099-taxform-container">
				<!-- Header Section -->
				<div class="f1099-header-row">
					<div class="f1099-header-left">
						<label><input type="checkbox" disabled
							id="corrected" /> CORRECTED</label>
					</div>
					<div class="f1099-header-center">
						<div>OMB No. 1545-0117</div>
						<h1><span id="tax-year">202X</span></h1>
						<h2>Form 1099-OID</h2>
					</div>
					<div class="f1099-header-right">
						<strong>Original Issue Discount</strong>
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
							<textarea id="f1099oid-XX-payer"
								placeholder="Payer Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number"></textarea>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">PAYER&apos;S TIN</span>
								<input type="text" id="f1099oid-XX-ein"
									placeholder="12-3456789" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">RECIPIENT&apos;S TIN</span>
								<input type="text" id="f1099oid-XX-ssn"
									placeholder="123-45-6789" />
							</div>
						</div>

						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">RECIPIENT&apos;S name, street
								address, city or town, state, and ZIP code</span>
							<textarea id="f1099oid-XX-taxpayer"
								placeholder="Taxpayer&apos;s Name&#10;Street Address&#10;City, State, ZIP"></textarea>
						</div>

						<div class="f1099-box" style="border-bottom: none;">
							<span class="f1099-box-label">Account number (see
								instructions)</span>
							<input type="text" id="f1099oid-XX-account"
								placeholder="Optional Account #" />
						</div>
					</div>

					<!-- Right Column: Numbered Input Boxes -->
					<div class="f1099-col-right">
						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">1 Original issue discount for
									the year</span>
								<input type="text" id="f1099oid-XX-01"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">2 Other periodic
									interest</span>
								<input type="text" id="f1099oid-XX-02"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">3 Early withdrawal
									penalty</span>
								<input type="text" id="f1099oid-XX-03"
									placeholder="0" />
							</div>
							<div class="f1099-box input-color">
								<span class="f1099-box-label">4 Federal income tax
									withheld</span>
								<input type="text" id="f1099oid-XX-04"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">5 Market discount</span>
								<input type="text" id="f1099oid-XX-05"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">6  Acquisition premium</span>
								<input type="text" id="f1099oid-XX-06"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">7 Description</span>
								<textarea id="f1099oid-XX-07"></textarea>
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">8 Original issue discount
									on U.S. Treasury obligations</span>
								<input type="text" id="f1099oid-XX-08"
									placeholder="0" />
							</div>
							<div class="f1099-box input-color">
								<span class="f1099-box-label">9  Investment expenses</span>
								<input type="text" id="f1099oid-XX-09"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">10 Bond premium</span>
								<input type="text" id="f1099oid-XX-10"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">11 Tax-exempt OID</span>
								<input type="text" id="f1099oid-XX-11"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box" style="border-bottom: none;">
								<span class="f1099-box-label">12/13 State/state no.</span>
								<input type="text" id="f1099oid-XX-12"
									placeholder="State / ID" />
							</div>
							<div class="f1099-box input-color" style="border-bottom: none;">
								<span class="f1099-box-label">14 State tax withheld</span>
								<input type="text" id="f1099oid-XX-14"
									placeholder="0" />
							</div>

						</div>
					</div>
				</div>		<!-- Main grid -->
			</div>		<!-- f1099-taxform-container -->
			<div class="f1099-footer-note">Form <strong>1099-OID</strong></div>
			<div>&nbsp;</div>
		</details>
`;

export class F1099OID extends TaxForm {
	static getHTML(uid) {
		if (!uid) {
			throw new Error(`F1099OID.getHTML(): UID is undefined.`);
		}

		const html = HTML_FORM.replace(/XX/g, uid)
								.replace(/202X/g, TaxTable.getTaxYear());

		return [ `f1099oid-${uid}-container`, html ];
	}

	static getInputFromWeb(uid, raw = false) {
		//
		// Read the fields of the form from the web and return an object with the
		// information. Raw user input is only used to save and restore user input.
		//
		if (!uid) {
			throw new Error(`F1099OID.getInputFromWeb(): UID is undefined.`);
		}

		const element = document.getElementById(`f1099oid-${uid}-container`);
		if (!element) {
			throw new Error(
				`F1099OID.getInputFromWeb(): Element not found: f1099oid-${uid}-container`);
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
		Debug.enter("F1099OID.Constructor()");
		super(formname);
		this.title = `1099-OID - Original Issue Discount`;

		this.lines["payer"]		= new Line("Payer");
		this.lines["ein"]		= new Line("EIN");
		this.lines["ssn"]		= new Line("SSN");
		this.lines["taxpayer"]	= new Line("Taxpayer");
		this.lines["account"]	= new Line("Account");
		this.lines["01"]		= new Line("Original issue discount for the year");
		this.lines["02"]		= new Line("Other periodic interest");
		this.lines["03"]		= new Line("Early withdrawal penalty");
		this.lines["04"]		= new Line("Federal income tax withheld");
		this.lines["05"]		= new Line("Market discount");
		this.lines["06"]		= new Line("Acquisition premium");
		this.lines["07"]		= new Line("Description");
		this.lines["08"]		= new Line("OID on U.S. Treasury obligations");
		this.lines["09"]		= new Line("Investment expenses");
		this.lines["10"]		= new Line("Bond premium");
		this.lines["11"]		= new Line("Tax-exempt OID");
		this.lines["13"]		= new Line("State/state no.");
		this.lines["14"]		= new Line("State tax withheld");

		Debug.exit("F1099OID.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F1099OID.calculate()");

		this.calculated = true;

		Debug.exit("F1099OID.calculate()");
	}
}
