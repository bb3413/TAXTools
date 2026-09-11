
import { Debug }		from "../Modules/Debug.js";
import { HTML }			from "../Modules/HTML.js";
import { Line }			from "../Classes/Line.js";
import { Objects }		from "../Modules/Objects.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";

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
								placeholder="Payer Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number">
							</textarea>
						</div>
			
						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">PAYER&apos;S TIN</span>
								<input type="text" id="f1099oid-XX-ein"
									placeholder="12-3456789" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">TAXPAYER&apos;S TIN</span>
								<input type="text" id="f1099oid-XX-ssn"
									placeholder="123-45-6789" />
							</div>
						</div>
			
						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">TAXPAYER&apos;S name, street
								address, city or town, state, and ZIP code</span>
							<textarea id="f1099oid-XX-taxpayer"
								placeholder="Taxpayer&apos;s Name&#10;Street Address&#10;City, State, ZIP">
							</textarea>
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
	static createForm(uid) {
		//
		// Create a new form and initialize it with information from the Web page.
		// If the user hasn't entered any information, don't bother creating the form.
		//
		const inputs = F1099OID.getUserInput(uid);
		if (!Objects.isUsed(inputs)) {
			return;
		}

		const newform = TaxFormObj.createForm("F1099OID");

		for (const key of Object.keys(inputs)) {
			newform.lines[key].user_value = inputs[key];
		}

		return newform;
	}

	static getInputHTML(uid) {
		if (!uid) {
			throw new Error(`F1099OID.getInputHTML(): UID is undefined.`);
		}

		const html = HTML_FORM.replace(/XX/g, uid)
								.replace(/202X/g, TaxTable.getTaxYear());

		return [ `f1099oid-${uid}-container`, html ];
	}

	static getUserInput(uid) {
		//
		// Read the fields of the form from the web and return an object with the
		// information.
		//
		if (!uid) {
			throw new Error(`F1099OID.getUserInput(): UID is undefined.`);
		}

		const element = document.getElementById(`f1099oid-${uid}-container`);
		if (!element) {
			throw new Error(
				`F1099OID.getUserInput(): Element not found: f1099oid-${uid}-container`);
		}

		let inputs = {};

		inputs["payer"]		= HTML.getUserInput(`f1099oid-${uid}-payer`,	"text");
		inputs["ein"]		= HTML.getUserInput(`f1099oid-${uid}-ein`,		"text");
		inputs["ssn"]		= HTML.getUserInput(`f1099oid-${uid}-ssn`,		"text");
		inputs["taxpayer"]	= HTML.getUserInput(`f1099oid-${uid}-taxpayer`,	"text");
		inputs["account"]	= HTML.getUserInput(`f1099oid-${uid}-account`,	"text");
		inputs["01"]		= HTML.getUserInput(`f1099oid-${uid}-01`);
		inputs["02"]		= HTML.getUserInput(`f1099oid-${uid}-02`);
		inputs["03"]		= HTML.getUserInput(`f1099oid-${uid}-03`);
		inputs["04"]		= HTML.getUserInput(`f1099oid-${uid}-04`);
		inputs["05"]		= HTML.getUserInput(`f1099oid-${uid}-05`);
		inputs["06"]		= HTML.getUserInput(`f1099oid-${uid}-06`);
		inputs["07"]		= HTML.getUserInput(`f1099oid-${uid}-07`,		"text");
		inputs["08"]		= HTML.getUserInput(`f1099oid-${uid}-08`);
		inputs["09"]		= HTML.getUserInput(`f1099oid-${uid}-09`);
		inputs["10"]		= HTML.getUserInput(`f1099oid-${uid}-10`);
		inputs["11"]		= HTML.getUserInput(`f1099oid-${uid}-11`);
		inputs["13"]		= HTML.getUserInput(`f1099oid-${uid}-13`,		"text");
		inputs["14"]		= HTML.getUserInput(`f1099oid-${uid}-14`);

		return inputs;
	}

	constructor(formname) {
		Debug.enter("F1099OID.Constructor()");
		super(formname);
		this.title = `1099-OID - Original Issue Discount`;

		this.payer				= 0;
		this.ein				= 0;
		this.ssn				= 0;
		this.taxpayer			= 0;
		this.account			= 0;

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
