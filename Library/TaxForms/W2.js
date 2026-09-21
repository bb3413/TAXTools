
import { Debug }		from "../Modules/Debug.js";
import { HTML }			from "../Modules/HTML.js";
import { Line }			from "../Classes/Line.js";
import { Objects }		from "../Modules/Objects.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_FORM = `
		<details class="taxform-details" id="w2-XX-container">
			<summary class="taxform-summary">W-2 - Wage and Tax Statement</summary>
			<div>&nbsp;</div>
			<div class="f1099-taxform-container">
				<!-- Header Section -->
				<div class="f1099-header-row">
					<div class="w2-header-left input-color">
						<div>
							<label><input type="checkbox"
								id="w2-XX-is-taxpayer" />Taxpayer&apos;s W-2</label>
						</div>
						<div>
							<label><input type="checkbox"
								id="w2-XX-is-spouse" />Spouse&apos;s W-2</label>
						</div>
					</div>
					<div class="w2-header-center">
						<span class="f1099-box-label">Employee&apos;s social
							security number</span>
						<input type="text" id="w2-XX-ssn" placeholder="123-45-6789" />
					</div>
					<div class="w2-header-right">
						<div>OMB No. 1545-0029</div>
					</div>
				</div>

				<!-- Main Content Grid -->
				<div class="f1099-main-grid">
					<!-- Left Column: Payer & Recipient Info Inputs -->
					<div class="f1099-col-left">
						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">Employer&apos;s
									identification number (EIN)</span>
								<input type="text" id="w2-XX-ein"
									placeholder="12-3456789" />
							</div>
						</div>

						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">Employer&apos;s name, address,
								and ZIP code</span>
							<textarea id="w2-XX-payer"
								placeholder="Employer&apos;s Name&#10;Street Address&#10;City, State, ZIP&#10;Phone Number"></textarea>
						</div>

						<div class="f1099-box f1099-box-large">
							<span class="f1099-box-label">Employee&apos;s name, address,
								and ZIP code</span>
							<textarea id="w2-XX-taxpayer"
								placeholder="Taxpayer&apos;s Name&#10;Street Address&#10;City, State, ZIP"></textarea>
						</div>
					</div>

					<!-- Right Column: Numbered Input Boxes -->
					<div class="f1099-col-right">
						<div class="f1099-flex-row">
							<div class="f1099-box input-color">
								<span class="f1099-box-label">1 Wages, tips, other
									compensation</span>
								<input type="text" id="w2-XX-01" placeholder="0" />
							</div>
							<div class="f1099-box input-color">
								<span class="f1099-box-label">2 Federal income tax
									withheld</span>
								<input type="text" id="w2-XX-02" placeholder="0" />
							</div>
						</div>
						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">3 Social security wages</span>
								<input type="text" id="w2-XX-03" placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">4 Social security tax
									withheld</span>
								<input type="text" id="w2-XX-04" placeholder="0" />
							</div>
						</div>
						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">5 Medicare wages and
									tips</span>
								<input type="text" id="w2-XX-05" placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">6 Medicare tax withheld</span>
								<input type="text" id="w2-XX-06" placeholder="0" />
							</div>
						</div>
						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">7 Social security tips</span>
								<input type="text" id="w2-XX-07" placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">8 Allocated tips</span>
								<input type="text" id="w2-XX-08" placeholder="0" />
							</div>
						</div>
						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label"></span>
								<input type="text" id="w2-XX-09" placeholder="" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">10 Dependent care
									benefits</span>
								<input type="text" id="w2-XX-10" placeholder="0" />
							</div>
						</div>
						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">11 Non-qualified plans</span>
								<input type="text" id="w2-XX-11" placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label"></span>
								<input type="text" placeholder="" />
							</div>
						</div>
						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">13 Statutory employee</span>
								<div><input type="checkbox"
									id="w2-XX-13a" /></div>
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Retirement plan</span>
								<div><input type="checkbox"
									id="w2-XX-13b" /></div>
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Third party sick pay</span>
								<div><input type="checkbox" id="w2-XX-13c" /></div>
							</div>
						</div>
						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">12a Code</span>
								<input type="text" id="w2-XX-12a1" placeholder="" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Value</span>
								<input type="text" id="w2-XX-12a2" placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">14a Code</span>
								<input type="text" id="w2-XX-14a1" placeholder="" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Value</span>
								<input type="text" id="w2-XX-14a2" placeholder="0" />
							</div>
						</div>
						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">12b Code</span>
								<input type="text" id="w2-XX-12b1" placeholder="" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Value</span>
								<input type="text" id="w2-XX-12b2" placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">14b Code</span>
								<input type="text" id="w2-XX-14b1" placeholder="" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Value</span>
								<input type="text" id="w2-XX-14b2" placeholder="0" />
							</div>
						</div>
						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">12c Code</span>
								<input type="text" id="w2-XX-12c1" placeholder="" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Value</span>
								<input type="text" id="w2-XX-12c2" placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">14c Code</span>
								<input type="text" id="w2-XX-14c1" placeholder="" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Value</span>
								<input type="text" id="w2-XX-14c2" placeholder="0" />
							</div>
						</div>
						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">12d Code</span>
								<input type="text" id="w2-XX-12d1" placeholder="" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Value</span>
								<input type="text" id="w2-XX-12d2" placeholder="0" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">14d Code</span>
								<input type="text" id="w2-XX-14d1" placeholder="" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Value</span>
								<input type="text" id="w2-XX-14d2" placeholder="0" />
							</div>
						</div>
					</div>
				</div>		<!-- Main grid -->
				<div class="f1099-header-row">
					<div class="f1099-box">
						<span class="f1099-box-label">15 State ID number</span>
						<input type="text" id="w2-XX-15" placeholder="" />
					</div>
					<div class="f1099-box">
						<span class="f1099-box-label">16 State wages, tips</span>
						<input type="text" id="w2-XX-16" placeholder="" />
					</div>
					<div class="f1099-box input-color">
						<span class="f1099-box-label">17 State income tax</span>
						<input type="text" id="w2-XX-17" placeholder="" />
					</div>
					<div class="f1099-box">
						<span class="f1099-box-label">18 Local wages, tips</span>
						<input type="text" id="w2-XX-18" placeholder="" />
					</div>
					<div class="f1099-box">
						<span class="f1099-box-label">19 Loca income tax</span>
						<input type="text" id="w2-XX-19" placeholder="" />
					</div>
					<div class="f1099-box">
						<span class="f1099-box-label">20 Locaity name</span>
						<input type="text" id="w2-XX-20" placeholder="" />
					</div>
				</div>
			</div>		<!-- f1099-taxform-container -->
			<div class="f1099-footer-note">Form <strong>W-2</strong></div>
			<div>&nbsp;</div>
		</details>
`;

export class W2 extends TaxForm {
	static createForm(uid) {
		//
		// Create a new form and initialize it with information from the Web page.
		// If the user hasn't entered any information, don't bother creating the form.
		//
		const inputs = W2.getUserInput(uid);
		if (!Objects.isUsed(inputs)) {
			return;
		}

		const newform = TaxFormObj.createForm("W2");

		for (const key of Object.keys(inputs)) {
			newform.lines[key].user_value = inputs[key];
		}

		return newform;
	}

	static getInputHTML(uid) {
		if (!uid) {
			throw new Error(`W2.getInputHTML(): UID is undefined.`);
		}

		const html = HTML_FORM.replace(/XX/g, uid)
								.replace(/202X/g, TaxTable.getTaxYear());

		return [ `w2-${uid}-container`, html ];
	}

	static getUserInput(uid) {
		//
		// Read the fields of the form from the web and return an object with the
		// information.
		//
		if (!uid) {
			throw new Error(`W2.getUserInput(): UID is undefined.`);
		}

		const element = document.getElementById(`w2-${uid}-container`);
		if (!element) {
			throw new Error(`W2.getUserInput(): Element not found: w2-${uid}-container`);
		}

		let inputs = {};

		inputs["is_taxpayer"]	= HTML.getUserInput(`w2-${uid}-is-taxpayer`);
		inputs["is_spouse"]		= HTML.getUserInput(`w2-${uid}-is-spouse`);
		inputs["payer"]		= HTML.getUserInput(`w2-${uid}-payer`,		"text");
		inputs["ein"]		= HTML.getUserInput(`w2-${uid}-ein`,		"text");
		inputs["ssn"]		= HTML.getUserInput(`w2-${uid}-ssn`,		"text");
		inputs["taxpayer"]	= HTML.getUserInput(`w2-${uid}-taxpayer`,	"text");
		inputs["01"]		= HTML.getUserInput(`w2-${uid}-01`);
		inputs["02"]		= HTML.getUserInput(`w2-${uid}-02`);
		inputs["03"]		= HTML.getUserInput(`w2-${uid}-03`);
		inputs["04"]		= HTML.getUserInput(`w2-${uid}-04`);
		inputs["05"]		= HTML.getUserInput(`w2-${uid}-05`);
		inputs["06"]		= HTML.getUserInput(`w2-${uid}-06`);
		inputs["07"]		= HTML.getUserInput(`w2-${uid}-07`);
		inputs["08"]		= HTML.getUserInput(`w2-${uid}-08`);
		inputs["09"]		= HTML.getUserInput(`w2-${uid}-09`);
		inputs["10"]		= HTML.getUserInput(`w2-${uid}-10`);
		inputs["11"]		= HTML.getUserInput(`w2-${uid}-11`);
		inputs["12a1"]		= HTML.getUserInput(`w2-${uid}-12a1`, "text");
		inputs["12a2"]		= HTML.getUserInput(`w2-${uid}-12a2`);
		inputs["12b1"]		= HTML.getUserInput(`w2-${uid}-12b1`, "text");
		inputs["12b2"]		= HTML.getUserInput(`w2-${uid}-12b2`);
		inputs["12c1"]		= HTML.getUserInput(`w2-${uid}-12c1`, "text");
		inputs["12c2"]		= HTML.getUserInput(`w2-${uid}-12c2`);
		inputs["12d1"]		= HTML.getUserInput(`w2-${uid}-12d1`, "text");
		inputs["12d2"]		= HTML.getUserInput(`w2-${uid}-12d2`);
		inputs["13a"]		= HTML.getUserInput(`w2-${uid}-13a`);
		inputs["13b"]		= HTML.getUserInput(`w2-${uid}-13b`);
		inputs["13c"]		= HTML.getUserInput(`w2-${uid}-13c`);
		inputs["14a1"]		= HTML.getUserInput(`w2-${uid}-14a1`, "text");
		inputs["14a2"]		= HTML.getUserInput(`w2-${uid}-14a2`);
		inputs["14b1"]		= HTML.getUserInput(`w2-${uid}-14b1`, "text");
		inputs["14b2"]		= HTML.getUserInput(`w2-${uid}-14b2`);
		inputs["14c1"]		= HTML.getUserInput(`w2-${uid}-14c1`, "text");
		inputs["14c2"]		= HTML.getUserInput(`w2-${uid}-14c2`);
		inputs["14d1"]		= HTML.getUserInput(`w2-${uid}-14d1`, "text");
		inputs["14d2"]		= HTML.getUserInput(`w2-${uid}-14d2`);
		inputs["15"]		= HTML.getUserInput(`w2-${uid}-15`, "text");
		inputs["16"]		= HTML.getUserInput(`w2-${uid}-16`);
		inputs["17"]		= HTML.getUserInput(`w2-${uid}-17`);
		inputs["18"]		= HTML.getUserInput(`w2-${uid}-18`);
		inputs["19"]		= HTML.getUserInput(`w2-${uid}-19`);
		inputs["20"]		= HTML.getUserInput(`w2-${uid}-20`, "text");

		return inputs;
	}

	constructor(formname) {
		Debug.enter("W2.Constructor()");
		super(formname);

		this.title = `W-2 - Wage and Tax Statement`;

		this.lines["is_taxpayer"]	= new Line("Taxpayer's W-2");
		this.lines["is_spouse"]		= new Line("Spouse's W-2");
		this.lines["payer"]			= new Line("Employer");
		this.lines["ein"]			= new Line("EmployerEIN");
		this.lines["ssn"]			= new Line("SSN");
		this.lines["taxpayer"]		= new Line("Taxpayer");
		this.lines["01"]	= new Line("Wages");
		this.lines["02"]	= new Line("Federal Tax Withheld");
		this.lines["03"]	= new Line("Social Security Wages");
		this.lines["04"]	= new Line("Social Security Tax Withheld");
		this.lines["05"]	= new Line("Medicare Wages");
		this.lines["06"]	= new Line("Medicare Tax Withheld");
		this.lines["07"]	= new Line("Social Security Tips");
		this.lines["08"]	= new Line("Allocated Tips");
		this.lines["09"]	= new Line("Not Used");
		this.lines["10"]	= new Line("Dependent Care Benefits");
		this.lines["11"]	= new Line("Nonqualified Plans");
		this.lines["12a1"]	= new Line("Option A");
		this.lines["12a2"]	= new Line("Option A");
		this.lines["12b1"]	= new Line("Option B");
		this.lines["12b2"]	= new Line("Option B");
		this.lines["12c1"]	= new Line("Option C");
		this.lines["12c2"]	= new Line("Option C");
		this.lines["12d1"]	= new Line("Option D");
		this.lines["12d2"]	= new Line("Option D");
		this.lines["13a"]	= new Line("Statutory Employee");
		this.lines["13b"]	= new Line("Retirement Plan");
		this.lines["13c"]	= new Line("Third-Party Sick Plan");
		this.lines["14a1"]	= new Line("Other A");
		this.lines["14a2"]	= new Line("Other A");
		this.lines["14b1"]	= new Line("Other B");
		this.lines["14b2"]	= new Line("Other B");
		this.lines["14c1"]	= new Line("Other C");
		this.lines["14c2"]	= new Line("Other C");
		this.lines["14d1"]	= new Line("Other D");
		this.lines["14d2"]	= new Line("Other D");
		this.lines["15"]	= new Line("State Identification");
		this.lines["16"]	= new Line("State Wages");
		this.lines["17"]	= new Line("State Tax Withheld");
		this.lines["18"]	= new Line("Local Wages");
		this.lines["19"]	= new Line("Local Tax Withheld");
		this.lines["20"]	= new Line("Locality Name");

		Debug.exit("W2.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("W2.calculate()");

		this.calculated = true;
		const tt = TaxTable.getTaxTable();
		const tp = Taxpayer.getTaxpayer();

		Debug.exit("W2.calculate()");
	}

	getRetirementContributions() {
		let contributions = 0;
		
		if (String(this.line("12a1")).toUpperCase() === "D") {
			contributions += this.line("12a2");
		}
		if (String(this.line("12b1")).toUpperCase() === "D") {
			contributions += this.line("12b2");
		}
		if (String(this.line("12c1")).toUpperCase() === "D") {
			contributions += this.line("12c2");
		}
		if (String(this.line("12d1")).toUpperCase() === "D") {
			contributions += this.line("12d2");
		}

		return contributions;
	}

	isTaxpayersW2() {
		const tp = Taxpayer.getTaxpayer();

		if (tp.filing_status !== "MFJ") {
			return true;
		} else if (!this.line("is_taxpayer") && !this.line("is_spouse")) {
			return true;
		} else if (this.line("is_taxpayer") && this.line("is_spouse")) {
			return false;
		}

		return this.line("is_taxpayer");
	}
}
