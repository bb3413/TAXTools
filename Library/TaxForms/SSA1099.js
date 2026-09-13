
import { Debug }		from "../Modules/Debug.js";
import { HTML }			from "../Modules/HTML.js";
import { Line }			from "../Classes/Line.js";
import { Objects }		from "../Modules/Objects.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_FORM = `
		<details class="taxform-details" id="ssa1099-XX-container">
			<summary class="taxform-summary">SSA-1099 - Social Security Benefit
				Statement</summary>
			<div>&nbsp;</div>
			<div class="ssa-outside-header">Form SSA-1099 - Social Security
				Benefit Statement</div>
			<div class="f1099-taxform-container">
				<!-- Header Section -->
				<div class="f1099-header-row">
					<div class="ssa-header-left">
						<h1><span id="tax-year">202X</span></h1>
					</div>
					<div class="ssa-header-right">
						<ul>
							<li>Part of your Social Security benefits shown in box 5 may
								be taxable income.</li>
							<li>See the reverse for more information.</li>
						</ul>
					</div>
				</div>

				<div class="ssa-row-1">
					<div class="f1099-box ssa-border-right">
						<span class="f1099-box-label">Box 1. Name</span>
						<input type="text" id="ssa1099-XX-01"
							placeholder="Beneficiary&apos;s name" />
					</div>
					<div class="f1099-box">
						<span class="f1099-box-label">Box 2. Beneficiary&apos;s Social
							Security Number</span>
						<input type="text" id="ssa1099-XX-02"
							placeholder="123-45-6789" />
					</div>
				</div>

				<div class="ssa-row-2">
					<div class="f1099-box ssa-border-right">
						<span class="f1099-box-label">Box 3. Benefits Paid in 202X</span>
						<input type="text" id="ssa1099-XX-03"
							placeholder="0" />
					</div>
					<div class="f1099-box ssa-border-right">
						<span class="f1099-box-label">Box 4. Benefits Repaid to SSA in
							202X</span>
						<input type="text" id="ssa1099-XX-04"
							placeholder="0" />
					</div>
					<div class="f1099-box input-color">
						<span class="f1099-box-label">Box 5. Net Benefits for 202X (Box 3
							minus Box 4)</span>
						<input type="text" id="ssa1099-XX-05"
							placeholder="0" />
					</div>
				</div>

				<!-- Main Content Grid -->
				<div class="f1099-main-grid">
					<!-- Left Column: Payer & Recipient Info Inputs -->
					<div class="f1099-col-left">
						<div class="f1099-box f1099-box-large" style="border-bottom: none;">
							<h2 class="ssa-subheading">Description of Amount in Box 3</h2>
							<div class="ssa-label-group input-color">
								<label for="ssa-XX-03a">Medicare Part B:</label>
								<input type="text" id="ssa1099-XX-03a" name="ssa-XX-03a"
									placeholder="0" />
							</div>
							<div class="ssa-label-group input-color">
								<label for="ssa-XX-03b">Medicare Part D:</label>
								<input type="text" id="ssa1099-XX-03b" name="ssa-XX-03b"
									placeholder="0" />
							</div>
						</div>
					</div>

					<!-- Right Column: Numbered Input Boxes -->
					<div class="f1099-col-right">
						<div class="f1099-box f1099-box-large">
							<h2 class="ssa-subheading">Description of Amount in Box 4</h2>
						</div>
						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">Box 6. Voluntary Federal
									Income Tax Withheld</span>
								<input type="text" id="ssa1099-XX-06"
									placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">Box 7. Address</span>
								<input type="text" id="ssa1099-XX-07"
									placeholder="Beneficiary&apos;s address"/>
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box" style="border-bottom: none;">
								<span class="f1099-box-label">Box 8. Claim Number</span>
								<input type="text" id="ssa1099-XX-08"
									placeholder="Optional Account #" />
							</div>
						</div>
					</div>		<!-- f1099-col-right -->
				</div>		<!-- f1099-main-grid -->
			</div>		<!-- f1099-taxform-container -->
			<div class="f1099-footer-note">Form <strong>SSA-1099</strong></div>
			<div>&nbsp;</div>
		</details>
`;

export class SSA1099 extends TaxForm {
	static createForm(uid) {
		//
		// Create a new form and initialize it with information from the Web page.
		// If the user hasn't entered any information, don't bother creating the form.
		//
		const inputs = SSA1099.getUserInput(uid);
		if (!Objects.isUsed(inputs)) {
			return;
		}

		const newform = TaxFormObj.createForm("SSA1099");

		for (const key of Object.keys(inputs)) {
			newform.lines[key].user_value = inputs[key];
		}

		return newform;
	}

	static getInputHTML(uid) {
		//
		// Get the HTML code to display the tax form for inputting values. Return an array
		// with the element ID for the form's outer container and the HTML code.
		//
		if (!uid) {
			throw new Error(`SSA1099.getInputHTML(): UID is undefined.`);
		}

		const html = HTML_FORM.replace(/XX/g, uid)
								.replace(/202X/g, TaxTable.getTaxYear());

		return [ `ssa1099-${uid}-container`, html ];
	}

	static getUserInput(uid) {
		//
		// Read the fields of the form from the web and return an object with the
		// information.
		//
		if (!uid) {
			throw new Error(`SSA1099.getUserInput(): UID is undefined.`);
		}

		const element = document.getElementById(`ssa1099-${uid}-container`);
		if (!element) {
			throw new Error(
				`SSA1099.getUserInput(): Element not found: ssa1099-${uid}-container`);
		}

		let inputs = {};

		inputs["01"]	= HTML.getUserInput(`ssa1099-${uid}-01`, "text");
		inputs["02"]	= HTML.getUserInput(`ssa1099-${uid}-02`, "text");
		inputs["03a"]	= HTML.getUserInput(`ssa1099-${uid}-03a`);
		inputs["03b"]	= HTML.getUserInput(`ssa1099-${uid}-03b`);
		inputs["04"]	= HTML.getUserInput(`ssa1099-${uid}-04`);
		inputs["05"]	= HTML.getUserInput(`ssa1099-${uid}-05`);
		inputs["06"]	= HTML.getUserInput(`ssa1099-${uid}-06`);
		inputs["07"]	= HTML.getUserInput(`ssa1099-${uid}-07`, "text");
		inputs["08"]	= HTML.getUserInput(`ssa1099-${uid}-08`, "text");

		return inputs;
	}

	constructor(formname) {
		Debug.enter("SSA1099.Constructor()");
		super(formname);
		this.title = `SSA-1099 - Social Security Benefit Statement`;

		this.lines["01"]	= new Line("Name");
		this.lines["02"]	= new Line("Social Security Number");
		this.lines["03a"]	= new Line("Medicare Part B");
		this.lines["03b"]	= new Line("Medicare Part D");
		this.lines["04"]	= new Line("Benefits Repaid");
		this.lines["05"]	= new Line("Net Benefits");
		this.lines["06"]	= new Line("Federal Income Tax	 Withheld");
		this.lines["07"]	= new Line("Address");
		this.lines["08"]	= new Line("Claim Number");

		Debug.exit("SSA1099.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("SSA1099.calculate()");

		this.calculated = true;

		Debug.exit("SSA1099.calculate()");
	}
}
