
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTML }			from "../Modules/HTML.js";
import { Line }			from "../Classes/Line.js";
import { Objects }		from "../Modules/Objects.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const ELEMENTS = {
	// Element ID		Value Type
	"is-spouses":		[""],
	"ssn":				["text"],
	"ein":				["text"],
	"payer":			["text"],
	"taxpayer":			["text"],
	"01":				[""],
	"02":				[""],
	"03":				[""],
	"04":				[""],
	"05":				[""],
	"06":				[""],
	"07":				[""],
	"08":				[""],
	"10":				[""],
	"11":				[""],
	"12a1":				["text"],
	"12a2":				[""],
	"12b1":				["text"],
	"12b2":				[""],
	"12c1":				["text"],
	"12c2":				[""],
	"12d1":				["text"],
	"12d2":				[""],
	"13a":				[""],
	"13b":				[""],
	"13c":				[""],
	"14a1":				["text"],
	"14a2":				[""],
	"14b1":				["text"],
	"14b2":				[""],
	"14c1":				["text"],
	"14c2":				[""],
	"14d1":				["text"],
	"14d2":				[""],
	"15":				["text"],
	"16":				[""],
	"17":				[""],
	"18":				[""],
	"19":				[""],
	"20":				["text"],
};

const HTML_FORM = `
		<details class="taxform-details" id="w2-XX-container">
			<summary class="taxform-summary">W-2 - Wage and Tax Statement</summary>
			<div>&nbsp;</div>

			<div class="taxform-owner">
				<input type="radio" name="w2-XX-owner"
					id="w2-XX-is-taxpayers" checked />
				<label for="w2-XX-is-taxpayers">
					Taxpayer&apos;s Tax Form</label>

				<input type="radio" name="w2-XX-owner"
					id="w2-XX-is-spouses" />
				<label for="w2-XX-is-spouses">
					Spouse&apos;s Tax Form</label>
				</div>
			</div>

			<div class="f1099-taxform-container">
				<!-- Header Section -->
				<div class="f1099-header-row">
					<div class="w2-header-left">
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
								<span class="f1099-box-label">9</span>
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
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">13 Statutory employee</span>
								<div><input type="checkbox" id="w2-XX-13a" /></div>
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Retirement plan</span>
								<div><input type="checkbox" id="w2-XX-13b" /></div>
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
								<span class="f1099-box-label">12b Code</span>
								<input type="text" id="w2-XX-12b1" placeholder="" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Value</span>
								<input type="text" id="w2-XX-12b2" placeholder="0" />
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
								<span class="f1099-box-label">12d Code</span>
								<input type="text" id="w2-XX-12d1" placeholder="" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Value</span>
								<input type="text" id="w2-XX-12d2" placeholder="0" />
							</div>
						</div>

						<div class="f1099-flex-row">
							<div class="f1099-box">
								<span class="f1099-box-label">14a Code</span>
								<input type="text" id="w2-XX-14a1" placeholder="" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Value</span>
								<input type="text" id="w2-XX-14a2" placeholder="0" />
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
								<span class="f1099-box-label">14c Code</span>
								<input type="text" id="w2-XX-14c1" placeholder="" />
							</div>
							<div class="f1099-box">
								<span class="f1099-box-label">Value</span>
								<input type="text" id="w2-XX-14c2" placeholder="0" />
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
					<div class="f1099-box input-color">
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
	static getHTML(uid) {
		if (!uid) {
			throw new Error(`W2.getHTML(): UID is undefined.`);
		}

		const html = HTML_FORM.replace(/XX/g, uid)
								.replace(/202X/g, TaxTable.getTaxYear());

		return [ `w2-${uid}-container`, html ];
	}

	static getInputFromWeb(uid, raw = false) {
		//
		// Read the fields of the form from the web and return an object with the
		// information. Raw user input is only used to save and restore user input.
		//
		if (!uid) {
			throw new Error(`W2.getInputFromWeb(): UID is undefined.`);
		}

		const element = document.getElementById(`w2-${uid}-container`);
		if (!element) {
			throw new Error(`W2.getInputFromWeb(): Element not found: w2-${uid}-container`);
		}

		let inputs = {};
		const form_id = "w2";

		for (const field_name of Object.keys(ELEMENTS)) {
			const value_type	= raw ? "raw" : ELEMENTS[field_name][0];
			const key_name		= field_name.replace(/-/g, "_");
			const element_id	= `${form_id}-${uid}-${field_name}`;
			inputs[key_name]	= HTML.getUserInput(element_id, value_type);
		}

		return inputs;
	}

	constructor(formname) {
		Debug.enter("W2.Constructor()");
		super(formname);

		this.title = `W-2 - Wage and Tax Statement`;

		this.lines["payer"]		= new Line("Employer");
		this.lines["ein"]		= new Line("EmployerEIN");
		this.lines["ssn"]		= new Line("SSN");
		this.lines["taxpayer"]	= new Line("Taxpayer");
		this.lines["01"]		= new Line("Wages");
		this.lines["02"]		= new Line("Federal Tax Withheld");
		this.lines["03"]		= new Line("Social Security Wages");
		this.lines["04"]		= new Line("Social Security Tax Withheld");
		this.lines["05"]		= new Line("Medicare Wages");
		this.lines["06"]		= new Line("Medicare Tax Withheld");
		this.lines["07"]		= new Line("Social Security Tips");
		this.lines["08"]		= new Line("Allocated Tips");
		this.lines["09"]		= new Line("Not Used");
		this.lines["10"]		= new Line("Dependent Care Benefits");
		this.lines["11"]		= new Line("Nonqualified Plans");
		this.lines["12a1"]		= new Line("Option A");
		this.lines["12a2"]		= new Line("Option A");
		this.lines["12b1"]		= new Line("Option B");
		this.lines["12b2"]		= new Line("Option B");
		this.lines["12c1"]		= new Line("Option C");
		this.lines["12c2"]		= new Line("Option C");
		this.lines["12d1"]		= new Line("Option D");
		this.lines["12d2"]		= new Line("Option D");
		this.lines["13a"]		= new Line("Statutory Employee");
		this.lines["13b"]		= new Line("Retirement Plan");
		this.lines["13c"]		= new Line("Third-Party Sick Plan");
		this.lines["14a1"]		= new Line("Other A");
		this.lines["14a2"]		= new Line("Other A");
		this.lines["14b1"]		= new Line("Other B");
		this.lines["14b2"]		= new Line("Other B");
		this.lines["14c1"]		= new Line("Other C");
		this.lines["14c2"]		= new Line("Other C");
		this.lines["14d1"]		= new Line("Other D");
		this.lines["14d2"]		= new Line("Other D");
		this.lines["15"]		= new Line("State Identification");
		this.lines["16"]		= new Line("State Wages");
		this.lines["17"]		= new Line("State Tax Withheld");
		this.lines["18"]		= new Line("Local Wages");
		this.lines["19"]		= new Line("Local Tax Withheld");
		this.lines["20"]		= new Line("Locality Name");

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

	getBox12(code) {
		let value = 0;

		if (String(this.line("12a1")).toUpperCase() === code) {
			value += this.line("12a2");
		}
		if (String(this.line("12b1")).toUpperCase() === code) {
			value += this.line("12b2");
		}
		if (String(this.line("12c1")).toUpperCase() === code) {
			value += this.line("12c2");
		}
		if (String(this.line("12d1")).toUpperCase() === code) {
			value += this.line("12d2");
		}

		return value;
	}
	
	getTipIncome() {
		return this.getBox12("TP");
	}

	getRetirementContributions() {
		return this.getBox12("D");
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
