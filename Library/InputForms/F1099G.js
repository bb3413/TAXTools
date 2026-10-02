
import { Debug }		from "../Modules/Debug.js";
import { HTML }			from "../Modules/HTML.js";
import { Line }			from "../Classes/Line.js";
import { Objects }		from "../Modules/Objects.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";
import { Refund }		from "../Worksheets/Refund.js";

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
	"11":				["text"],
	"12":				[],
	"prev-itemized":	[],
	"prev-5d":			[],
	"prev-5e":			[],
};

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
								placeholder="Payer Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number"></textarea>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">PAYER&apos;S TIN</span>
								<input type="text" id="f1099g-XX-ein"
									placeholder="12-3456789" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">RECIPIENT&apos;S TIN</span>
								<input type="text" id="f1099g-XX-ssn"
									placeholder="123-45-6789" />
							</div>
						</div>

						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">RECIPIENT&apos;S name, street
								address, city or town, state, and ZIP code</span>
							<textarea id="f1099g-XX-taxpayer"
								placeholder="Taxpayer&apos;s Name&#10;Street Address&#10;City, State, ZIP"></textarea>
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
									or f1099g income</span>
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

			<p>If this 1099-G has a value in box 2, it is for a tax refund from the state.
			It may or may not be taxable depending upon how it was used on last
			year&apos;s federal tax return. If you fill in the following fields with
			the information from last year&apos;s feferal tax return, this tool will
			determine how much of the refund is taxable; otherwise, the entire refund will
			be treated as taxable.</p>

			<div class="supplemental-line-400-40">
				<p>Schedule A, line 17 from last year&apos;s federal tax return</p>
				<input class="input-worksheet-row-value input-field"
					type="text" size="10" placeholder="0"
					id="f1099g-XX-prev-itemized" />
			</div>
			<div class="supplemental-line-400-40">
				<p>Schedule A, line 5d from last year&apos;s federal tax return</p>
				<input class="input-worksheet-row-value input-field"
					type="text" size="10" placeholder="0"
					id="f1099g-XX-prev-5d" />
			</div>
			<div class="supplemental-line-400-40">
				<p>Schedule A, line 5e from last year&apos;s federal tax return</p>
				<input class="input-worksheet-row-value input-field"
					type="text" size="10" placeholder="0"
					id="f1099g-XX-prev-5e" />
			</div>
			<div>&nbsp;</div>
		</details>
`;

export class F1099G extends TaxForm {
	static getHTML(uid) {
		//
		// Get a string that contains the form in HTML format and the element ID of an HTML
		// block the encloses the entire form.
		//
		if (!uid) {
			throw new Error(`F1099G.getHTML(): UID is undefined.`);
		}

		const html = HTML_FORM.replace(/XX/g, uid)
								.replace(/202X/g, TaxTable.getTaxYear());

		return [ `f1099g-${uid}-container`, html ];
	}

	static getInputFromWeb(uid, raw = false) {
		//
		// Read the fields of the form from the web and return an object with the
		// information. Raw user input is only used to save and restore user input.
		//
		if (!uid) {
			throw new Error(`F1099G.getInputFromWeb(): UID is undefined.`);
		}

		const element = document.getElementById(`f1099g-${uid}-container`);
		if (!element) {
			throw new Error(
				`F1099G.getInputFromWeb(): Element not found: f1099g-${uid}-container`);
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
		Debug.enter("F1099G.Constructor()");
		super(formname);
		this.title = `1099-G - Certain Government Payments`;

		// Variables for external input. These variables can be used to enter information
		// that does not come from another tax form.
		this.prev_5d			= 0;
		this.prev_5e			= 0;
		this.prev_itemized		= 0;

		this.lines["payer"]		= new Line("Payer");
		this.lines["ein"]		= new Line("EIN");
		this.lines["ssn"]		= new Line("SSN");
		this.lines["taxpayer"]	= new Line("Taxpayer");
		this.lines["account"]	= new Line("Account");
		this.lines["01"]		= new Line("Unemployment compensation");
		this.lines["02"]		= new Line("State tax refunds, credits, or offsets");
		this.lines["03"]		= new Line("Box 2 amount is for tax year");
		this.lines["04"]		= new Line("Federal income tax withheld");
		this.lines["05"]		= new Line("RTAA payments");
		this.lines["06"]		= new Line("Taxable grants");
		this.lines["07"]		= new Line("Agriculture payments");
		this.lines["08"]		= new Line("Check if box 2 is trade or f1099g income");
		this.lines["09"]		= new Line("Market gain");
		this.lines["10"]		= new Line("Family leave benefits");
		this.lines["11"]		= new Line("State/state no.");
		this.lines["12"]		= new Line("State tax withheld");

		// Locally defined line for external output.
		this.lines["taxable_refund"]	= new Line("Taxable state refund");
		this.lines["explanation"]		= new Line("Explanation of refund amount");

		Debug.exit("F1099G.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F1099G.calculate()");

		this.calculated = true;

		if (this.line("02")) {
			const refund = TaxFormObj.createForm("Refund");
			refund.sched_a_5d				= this.prev_5d;
			refund.sched_a_5e				= this.prev_5e;
			refund.itemized_deductions		= this.prev_itemized;
			refund.refund					= this.line("02");
			refund.calculate();

			// Locally defined line for external output.
			this.lines["taxable_refund"].value	= refund.taxable_amount;
			this.lines["explanation"].value		= refund.explanation;
		}

		Debug.exit("F1099G.calculate()");
	}

	loadInputFromWeb(inputs) {
		//
		// The inputs parameter is an object that contains all the input fields from the
		// form's web page. This method copies those fields to the corresponding locations
		// in this instance of the form.
		//
		for (const key of Object.keys(inputs)) {
			switch (key) {
				case "prev_itemized":
				case "prev_5d":
				case "prev_5e":
					this[key] = inputs[key];
					break;
				default:
					this.lines[key].user_value = inputs[key];
					break;
			}
		}
	}
}
