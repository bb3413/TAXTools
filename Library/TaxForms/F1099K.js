
import { Debug }		from "../Modules/Debug.js";
import { HTML }			from "../Modules/HTML.js";
import { Line }			from "../Classes/Line.js";
import { Objects }		from "../Modules/Objects.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_FORM = `
		<details class="taxform-details" id="f1099k-XX-container">
			<summary class="taxform-summary">1099-K - Payment Card and Third
				Party Network Transactions</summary>
			<div>&nbsp;</div>
			<div class="f1099-taxform-container">
				<!-- Header Section -->
				<div class="f1099-header-row">
					<div class="f1099-header-left">
						<label><input type="checkbox" disabled
							id="corrected" /> CORRECTED</label>
					</div>
					<div class="f1099-header-center">
						<div>OMB No. 1545-2205</div>
						<h1><span id="tax-year">202X</span></h1>
						<h2>Form 1099-K</h2>
					</div>
					<div class="f1099-header-right">
						<strong>Payment Card and Third Party Network Transactions</strong>
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
							<textarea id="f1099k-XX-payer"
								placeholder="Payer Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number">
							</textarea>
						</div>
			
						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">PAYER&apos;S TIN</span>
								<input type="text" id="f1099k-XX-ein"
									placeholder="12-3456789" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">TAXPAYER&apos;S TIN</span>
								<input type="text" id="f1099k-XX-ssn"
									placeholder="123-45-6789" />
							</div>
						</div>
			
						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">TAXPAYER&apos;S name, street
								address, city or town, state, and ZIP code</span>
							<textarea id="f1099k-XX-taxpayer"
								placeholder="Taxpayer&apos;s Name&#10;Street Address&#10;City, State, ZIP">
							</textarea>
						</div>

						<div class="f1099-box" style="border-bottom: none;">
							<span class="f1099-box-label">Account number (see
								instructions)</span>
							<input type="text" id="f1099k-XX-account"
								placeholder="Optional Account #" />
						</div>
					</div>
			
					<!-- Right Column: Numbered Input Boxes -->
					<div class="f1099-col-right">
						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">1a Gross amount of payment
									card/third party network transactions</span>
								<input type="text" id="f1099k-XX-01a"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">1b Card Not Present
									transactions</span>
								<input type="text" id="f1099k-XX-01b"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">1c Cash tips</span>
								<input type="text" id="f1099k-XX-01c"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">1d TTOC</span>
								<input type="text" id="f1099k-XX-01d" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">2 Merchant category code</span>
								<input type="text" id="f1099k-XX-02" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">3 Number of payment
									transactions</span>
								<input type="text" id="f1099k-XX-03"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">4 Federal income tax
									withheld</span>
								<input type="text" id="f1099k-XX-04"
									placeholder="0" />
							</div>
							<div class="f1099-box">
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">5a January</span>
								<input type="text" id="f1099k-XX-05a"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">5b February</span>
								<input type="text" id="f1099k-XX-05b"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">5c March</span>
								<input type="text" id="f1099k-XX-05c"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">5d April</span>
								<input type="text" id="f1099k-XX-05d"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">5e May</span>
								<input type="text" id="f1099k-XX-05e"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">5f June</span>
								<input type="text" id="f1099k-XX-05f"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">5g July</span>
								<input type="text" id="f1099k-XX-05g"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">5h August</span>
								<input type="text" id="f1099k-XX-05h"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">5i September</span>
								<input type="text" id="f1099k-XX-05i"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">5j October</span>
								<input type="text" id="f1099k-XX-05j"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">5k November</span>
								<input type="text" id="f1099k-XX-05k"
									placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">5l December</span>
								<input type="text" id="f1099k-XX-05l"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box input-color" style="border-bottom: none;">
								<span class="f1099-box-label">6 State income tax
									withheld</span>
								<input type="text" id="f1099k-XX-06"
									placeholder="0" />
							</div>
							<div class="f1099-box" style="border-bottom: none;">
								<span class="f1099-box-label">7/8 State/state no.</span>
								<input type="text" id="f1099k-XX-07"
									placeholder="State / ID" />
							</div>
						</div>
					</div>
				</div>		<!-- Main grid -->
			</div>		<!-- f1099-taxform-container -->
			<div class="f1099-footer-note">Form <strong>1099-K</strong></div>
			<div>&nbsp;</div>
		</details>
`;

export class F1099K extends TaxForm {
	static createForm(uid) {
		//
		// Create a new form and initialize it with information from the Web page.
		// If the user hasn't entered any information, don't bother creating the form.
		//
		const inputs = F1099K.getUserInput(uid);
		if (!Objects.isUsed(inputs)) {
			return;
		}

		const newform = TaxFormObj.createForm("F1099K");

		for (const key of Object.keys(inputs)) {
			newform.lines[key].user_value = inputs[key];
		}

		return newform;
	}

	static getInputHTML(uid) {
		if (!uid) {
			throw new Error(`F1099K.getInputHTML(): UID is undefined.`);
		}

		const html = HTML_FORM.replace(/XX/g, uid)
								.replace(/202X/g, TaxTable.getTaxYear());

		return [ `f1099k-${uid}-container`, html ];
	}

	static getUserInput(uid) {
		//
		// Read the fields of the form from the web and return an object with the
		// information.
		//
		if (!uid) {
			throw new Error(`F1099K.getUserInput(): UID is undefined.`);
		}

		const element = document.getElementById(`f1099k-${uid}-container`);
		if (!element) {
			throw new Error(
				`F1099K.getUserInput(): Element not found: f1099k-${uid}-container`);
		}

		let inputs = {};

		inputs["payer"]		= HTML.getUserInput(`f1099k-${uid}-payer`,		"text");
		inputs["ein"]		= HTML.getUserInput(`f1099k-${uid}-ein`,		"text");
		inputs["ssn"]		= HTML.getUserInput(`f1099k-${uid}-ssn`,		"text");
		inputs["taxpayer"]	= HTML.getUserInput(`f1099k-${uid}-taxpayer`,	"text");
		inputs["account"]	= HTML.getUserInput(`f1099k-${uid}-account`,	"text");
		inputs["01a"]		= HTML.getUserInput(`f1099k-${uid}-01a`);
		inputs["01b"]		= HTML.getUserInput(`f1099k-${uid}-01b`);
		inputs["01c"]		= HTML.getUserInput(`f1099k-${uid}-01c`);
		inputs["01d"]		= HTML.getUserInput(`f1099k-${uid}-01d`,		"text");
		inputs["02"]		= HTML.getUserInput(`f1099k-${uid}-02`,			"text");
		inputs["03"]		= HTML.getUserInput(`f1099k-${uid}-03`);
		inputs["04"]		= HTML.getUserInput(`f1099k-${uid}-04`);
		inputs["05a"]		= HTML.getUserInput(`f1099k-${uid}-05a`);
		inputs["05b"]		= HTML.getUserInput(`f1099k-${uid}-05b`);
		inputs["05c"]		= HTML.getUserInput(`f1099k-${uid}-05c`);
		inputs["05d"]		= HTML.getUserInput(`f1099k-${uid}-05d`);
		inputs["05e"]		= HTML.getUserInput(`f1099k-${uid}-05e`);
		inputs["05f"]		= HTML.getUserInput(`f1099k-${uid}-05f`);
		inputs["05g"]		= HTML.getUserInput(`f1099k-${uid}-05g`);
		inputs["05h"]		= HTML.getUserInput(`f1099k-${uid}-05h`);
		inputs["05i"]		= HTML.getUserInput(`f1099k-${uid}-05i`);
		inputs["05j"]		= HTML.getUserInput(`f1099k-${uid}-05j`);
		inputs["05k"]		= HTML.getUserInput(`f1099k-${uid}-05k`);
		inputs["05l"]		= HTML.getUserInput(`f1099k-${uid}-05l`);
		inputs["06"]		= HTML.getUserInput(`f1099k-${uid}-06`);
		inputs["07"]		= HTML.getUserInput(`f1099k-${uid}-07`,			"text");

		return inputs;
	}

	constructor(formname) {
		Debug.enter("F1099K.Constructor()");
		super(formname);
		this.title = `1099-K - Payment Card and Third Party Network Transactions`;

		this.payer				= 0;
		this.ein				= 0;
		this.ssn				= 0;
		this.taxpayer			= 0;
		this.account			= 0;

		this.lines["01a"]		= new Line("Gross amount of payment card/third par");
		this.lines["01b"]		= new Line("Card Not Present transactions ");
		this.lines["01c"]		= new Line("Cash tips");
		this.lines["01d"]		= new Line("TTOC");
		this.lines["02"]		= new Line("Merchant category code");
		this.lines["03"]		= new Line("Number of payment transactions");
		this.lines["04"]		= new Line("Federal income tax withheld");
		this.lines["05a"]		= new Line("January");
		this.lines["05b"]		= new Line("February");
		this.lines["05c"]		= new Line("March");
		this.lines["05d"]		= new Line("April");
		this.lines["05e"]		= new Line("May");
		this.lines["05f"]		= new Line("June");
		this.lines["05g"]		= new Line("July");
		this.lines["05h"]		= new Line("August");
		this.lines["05i"]		= new Line("September");
		this.lines["05j"]		= new Line("October");
		this.lines["05k"]		= new Line("November");
		this.lines["05l"]		= new Line("December");
		this.lines["06"]		= new Line("State tax withheld");
		this.lines["07"]		= new Line("State/state no.");

		Debug.exit("F1099K.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F1099K.calculate()");

		this.calculated = true;

		Debug.exit("F1099K.calculate()");
	}
}
