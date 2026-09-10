
import { Debug }		from "../Classes/Debug.js";
import { Line }			from "../Classes/Line.js";
import { HTML }			from "../Classes/HTML.js";
import { Str }			from "../Classes/Str.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Classes/TaxFormObj.js";
import { TaxTable }		from "../Classes/TaxTable.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";
import { IncTax }		from "../Worksheets/IncTax.js";
import { SSTax }		from "../Worksheets/SSTax.js";

const HTML_FORM = `
		<details class="taxform-details" id="f1040-XX-container">
			<summary class="taxform-summary">1040 - Individual Income Tax Return</summary>
			<div class="taxform-container">
				<div>&nbsp;</div>
				<div class="taxform-desc-string">
					<p>Taxpayer&apos;s Name</p>
					<input class="output-field left" readonly type="text"
						id="f1040-XX-taxpayers-name" size="10" placeholder="" />
				</div>
				<div class="taxform-desc-string">
					<p>Address</p>
					<input class="output-field left" readonly type="text"
						id="f1040-XX-street-address" size="10" placeholder="" />
				</div>
				<div class="taxform-desc-string">
					<p>City, State, Zip Code</p>
					<input class="output-field left" readonly type="text"
						id="f1040-XX-city-state-zip" size="10" placeholder="" />
				</div>
				<div class="taxform-lno-desc-shorttext">
					<p>Taxpayer&apos;s Birthday</p>
					<input class="output-field left" readonly type="text"
						id="f1040-XX-taxpayers-birthday" size="10" placeholder="mm/dd/yyy" />
				</div>
				<div class="taxform-lno-desc-shorttext">
					<p>Spouse&apos;s Birthday</p>
					<input class="output-field left" readonly type="text"
						id="f1040-XX-spouses-birthday" size="10" placeholder="mm/dd/yyy" />
				</div>
				<div class="taxform-lno-desc-shorttext">
					<p>Filing Status</p>
					<input class="output-field left" readonly type="text"
						id="f1040-XX-filing-status" size="10" placeholder="Single" />
				</div>

				<div>&nbsp;</div>
				<div class="f1040-checkboxes">
					<p class="right">Taxayer Is Blind</p>
					<input class="checkbox output-color" readonly type="checkbox"
						id="f1040-XX-taxpayer-is-blind" size="10" placeholder="0" />
					<p class="right">Spouse Is Blind</p>
					<input class="checkbox output-color" readonly type="checkbox"
						id="f1040-XX-spouse-is-blind" size="10" placeholder="0" />
				</div>

				<div>&nbsp;</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">1a</p>
					<p class="description">Total amount from Form(s) W-2, box 1</p>
					<p class="lineno">1a</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-01a" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">1b</p>
					<p class="description">Household employee wages not reported on
						Form(s) W-2</p>
					<p class="lineno">1b</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-01b" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">1c</p>
					<p class="description">Tip income not reported on line 1a</p>
					<p class="lineno">1c</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-01c" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">1d</p>
					<p class="description">Medicaid waiver payments not reported on
						Form(s) W-2</p>
					<p class="lineno">1d</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-01d" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">1e</p>
					<p class="description">Taxable dependent care benefits from
						Form 2441, line 26</p>
					<p class="lineno">1e</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-01e" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">1f</p>
					<p class="description">Employer-provided adoption benefits from
						Form 8839, line 31</p>
					<p class="lineno">1f</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-01f" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">1g</p>
					<p class="description">Wages from Form 8919, line 6</p>
					<p class="lineno">1g</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-01g" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">1h</p>
					<p class="description">Other earned income</p>
					<p class="lineno">1h</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-01h" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value-lno-value">
					<p class="lineno">1i</p>
					<p class="description">Nontaxable combat pay election</p>
					<p class="lineno">1i</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-01i" size="10" placeholder="0" />
					<p class="notused"></p>
					<p class="notused"></p>
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">1z</p>
					<p class="description">Add lines 1a through 1h</p>
					<p class="lineno">1z</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-01z" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value-label-lno-value">
					<p class="lineno">2a</p>
					<p class="description">Tax-exempt interest</p>
					<p class="lineno">2a</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-02a" size="10" placeholder="0" />
					<p class="label">Taxable interest</p>
					<p class="lineno">2b</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-02b" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value-label-lno-value">
					<p class="lineno">3a</p>
					<p class="description">Qualified dividends</p>
					<p class="lineno">3a</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-03a" size="10" placeholder="0" />
					<p class="label">Ordinary dividends</p>
					<p class="lineno">3b</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-03b" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value-label-lno-value">
					<p class="lineno">4a</p>
					<p class="description">IRA distributions</p>
					<p class="lineno">4a</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-04a" size="10" placeholder="0" />
					<p class="label">Taxable amount</p>
					<p class="lineno">4b</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-04b" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value-label-lno-value">
					<p class="lineno">5a</p>
					<p class="description">Pensions and annuities</p>
					<p class="lineno">5a</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-05a" size="10" placeholder="0" />
					<p class="label">Taxable amount</p>
					<p class="lineno">5b</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-05b" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value-label-lno-value">
					<p class="lineno">6a</p>
					<p class="description">Social security benefits</p>
					<p class="lineno">6a</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-06a" size="10" placeholder="0" />
					<p class="label">Taxable amount</p>
					<p class="lineno">6b</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-06b" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">7a</p>
					<p class="description">Capital gain or (loss)</p>
					<p class="lineno">7a</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-07a" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">8</p>
					<p class="description">Additional income from Schedule 1, line 10</p>
					<p class="lineno">8</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-08" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">9</p>
					<p class="description">Add lines 1z, 2b, 3b, 4b, 5b, 6b, 7a, and 8.
						This is your total income</p>
					<p class="lineno">9</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-09" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">10</p>
					<p class="description">Adjustments to income from Schedule 1, line 26</p>
					<p class="lineno">10</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-10" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">11a</p>
					<p class="description">Subtract line 10 from line 9. This is your
						adjusted gross income</p>
					<p class="lineno">11a</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-11a" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">11b</p>
					<p class="description">Amount from line 11a (adjusted gross income)</p>
					<p class="lineno">11b</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-11b" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">12e</p>
					<p class="description">Standard deduction or itemized deductions
						(from Schedule A)</p>
					<p class="lineno">12e</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-12e" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">13a</p>
					<p class="description">Qualified business income deduction from
						Form 8995 or Form 8995-A</p>
					<p class="lineno">13a</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-13a" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">13b</p>
					<p class="description">Additional deductions from
						Schedule 1-A, line 38</p>
					<p class="lineno">13b</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-13b" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">14</p>
					<p class="description">Add lines 12e, 13a, and 13b</p>
					<p class="lineno">14</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-14" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">15</p>
					<p class="description">Subtract line 14 from line 11b. If zero
						or less, enter -0-. This is your taxable income</p>
					<p class="lineno">15</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-15" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">16</p>
					<p class="description">Tax</p>
					<p class="lineno">16</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-16" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">17</p>
					<p class="description">Amount from Schedule 2, line 3</p>
					<p class="lineno">17</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-17" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">18</p>
					<p class="description">Add lines 16 and 17</p>
					<p class="lineno">18</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-18" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">19</p>
					<p class="description">Child tax credit or credit for other
						dependents from Schedule 8812</p>
					<p class="lineno">19</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-19" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">20</p>
					<p class="description">Amount from Schedule 3, line 8</p>
					<p class="lineno">20</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-20" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">21</p>
					<p class="description">Add lines 19 and 20</p>
					<p class="lineno">21</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-21" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">22</p>
					<p class="description">Subtract line 21 from line 18. If zero
						or less, enter -0-</p>
					<p class="lineno">22</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-22" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">23</p>
					<p class="description">Other taxes, including self-employment tax,
						from Schedule 2, line 21</p>
					<p class="lineno">23</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-23" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">24</p>
					<p class="description">Add lines 22 and 23. This is your total tax</p>
					<p class="lineno">24</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-24" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value-lno-value">
					<p class="lineno">25a</p>
					<p class="description">Federal income tax withheld from Form(s) W-2</p>
					<p class="lineno">25a</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-25a" size="10" placeholder="0" />
					<p class="notused"></p>
					<p class="notused"></p>
				</div>
				<div class="taxform-lno-desc-lno-value-lno-value">
					<p class="lineno">25b</p>
					<p class="description">Federal income tax withheld from Form(s) 1099</p>
					<p class="lineno">25b</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-25b" size="10" placeholder="0" />
					<p class="notused"></p>
					<p class="notused"></p>
				</div>
				<div class="taxform-lno-desc-lno-value-lno-value">
					<p class="lineno">25c</p>
					<p class="description">Federal income tax withheld from Other forms</p>
					<p class="lineno">25c</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-25c" size="10" placeholder="0" />
					<p class="notused"></p>
					<p class="notused"></p>
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">25d</p>
					<p class="description">Add lines 25a through 25c</p>
					<p class="lineno">25d</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-25d" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">26</p>
					<p class="description">2025 estimated tax payments and amount
						applied from 2024 return</p>
					<p class="lineno">26</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-26" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value-lno-value">
					<p class="lineno">27a</p>
					<p class="description">Earned income credit (EIC)</p>
					<p class="lineno">27a</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-27a" size="10" placeholder="0" />
					<p class="notused"></p>
					<p class="notused"></p>
				</div>
				<div class="taxform-lno-desc-lno-value-lno-value">
					<p class="lineno">28</p>
					<p class="description">Additional child tax credit (ACTC) from
						Schedule 8812</p>
					<p class="lineno">28</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-28" size="10" placeholder="0" />
					<p class="notused"></p>
					<p class="notused"></p>
				</div>
				<div class="taxform-lno-desc-lno-value-lno-value">
					<p class="lineno">29</p>
					<p class="description">American opportunity credit from
						Form 8863, line 8</p>
					<p class="lineno">29</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-29" size="10" placeholder="0" />
					<p class="notused"></p>
					<p class="notused"></p>
				</div>
				<div class="taxform-lno-desc-lno-value-lno-value">
					<p class="lineno">30</p>
					<p class="description">Refundable adoption credit from
						Form 8839, line 13</p>
					<p class="lineno">30</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-30" size="10" placeholder="0" />
					<p class="notused"></p>
					<p class="notused"></p>
				</div>
				<div class="taxform-lno-desc-lno-value-lno-value">
					<p class="lineno">31</p>
					<p class="description">Amount from Schedule 3, line 15</p>
					<p class="lineno">31</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-31" size="10" placeholder="0" />
					<p class="notused"></p>
					<p class="notused"></p>
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">32</p>
					<p class="description">Add lines 27a, 28, 29, 30, and 31.
						These are your total other payments and refundable credits</p>
					<p class="lineno">32</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-32" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">33</p>
					<p class="description">Add lines 25d, 26, and 32.
						These are your total payments</p>
					<p class="lineno">33</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-33" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">34</p>
					<p class="description">If line 33 is more than line 24,
						subtract line 24 from line 33. This is the amount you overpaid</p>
					<p class="lineno">34</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-34" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">35a</p>
					<p class="description">Amount of line 34 you want refunded to you.</p>
					<p class="lineno">35a</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-35a" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value-lno-value">
					<p class="lineno">36</p>
					<p class="description">Amount of line 34 you want applied to
						your 2026 estimated tax</p>
					<p class="lineno">36</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-36" size="10" placeholder="0" />
					<p class="notused"></p>
					<p class="notused"></p>
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno">37</p>
					<p class="description">Subtract line 33 from line 24.
						This is the amount you owe</p>
					<p class="lineno">37</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-37" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value-lno-value">
					<p class="lineno">38</p>
					<p class="description">Estimated tax penalty</p>
					<p class="lineno">38</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-38" size="10" placeholder="0" />
					<p class="notused"></p>
					<p class="notused"></p>
				</div>
				<div>&nbsp;</div>
			</div>
		</details>
`;

export class F1040 extends TaxForm {
	static getInputHTML(uid) {
		if (!uid) {
			throw new Error(`F1040.getInputHTML(): UID is undefined.`);
		}

		const html = HTML_FORM.replace(/XX/g, uid)
								.replace(/202X/g, TaxTable.getTaxYear())
								.replace(/readonly/g, "")
								.replace(/output-color/g, "")
								.replace(/output-field/g, "input-field");

		return [ `f1040-${uid}-container`, html ];
	}

	static getUserInput(uid) {
		//
		// Create a new instance and initialize it with information from the web page.
		//
		if (!uid) {
			throw new Error(`F1040.getUserInput(): UID is undefined.`);
		}

		const element = document.getElementById(`f1040-${uid}-container`);
		if (!element) {
			throw new Error(
				`F1040.getUserInput(): Element not found: f1040-${uid}-container`);
		}

		let inputs = {};

		inputs["01a"]		= HTML.getUserInput(`f1040-${uid}-01a`);
		inputs["01b"]		= HTML.getUserInput(`f1040-${uid}-01b`);
		inputs["01c"]		= HTML.getUserInput(`f1040-${uid}-01c`);
		inputs["01d"]		= HTML.getUserInput(`f1040-${uid}-01d`);
		inputs["01e"]		= HTML.getUserInput(`f1040-${uid}-01e`);
		inputs["01f"]		= HTML.getUserInput(`f1040-${uid}-01f`);
		inputs["01g"]		= HTML.getUserInput(`f1040-${uid}-01g`);
		inputs["01h"]		= HTML.getUserInput(`f1040-${uid}-01h`);
		inputs["01i"]		= HTML.getUserInput(`f1040-${uid}-01i`);
		inputs["01z"]		= HTML.getUserInput(`f1040-${uid}-01z`);
		inputs["02a"]		= HTML.getUserInput(`f1040-${uid}-02a`);
		inputs["02b"]		= HTML.getUserInput(`f1040-${uid}-02b`);
		inputs["03a"]		= HTML.getUserInput(`f1040-${uid}-03a`);
		inputs["03b"]		= HTML.getUserInput(`f1040-${uid}-03b`);
		inputs["04a"]		= HTML.getUserInput(`f1040-${uid}-04a`);
		inputs["04b"]		= HTML.getUserInput(`f1040-${uid}-04b`);
		inputs["05a"]		= HTML.getUserInput(`f1040-${uid}-05a`);
		inputs["05b"]		= HTML.getUserInput(`f1040-${uid}-05b`);
		inputs["06a"]		= HTML.getUserInput(`f1040-${uid}-06a`);
		inputs["06b"]		= HTML.getUserInput(`f1040-${uid}-06b`);
		inputs["07a"]		= HTML.getUserInput(`f1040-${uid}-07a`);
		inputs["08"]		= HTML.getUserInput(`f1040-${uid}-08`);
		inputs["09"]		= HTML.getUserInput(`f1040-${uid}-09`);
		inputs["10"]		= HTML.getUserInput(`f1040-${uid}-10`);
		inputs["11a"]		= HTML.getUserInput(`f1040-${uid}-11a`);
		inputs["11b"]		= HTML.getUserInput(`f1040-${uid}-11b`);
		inputs["12e"]		= HTML.getUserInput(`f1040-${uid}-12e`);
		inputs["13a"]		= HTML.getUserInput(`f1040-${uid}-13a`);
		inputs["13b"]		= HTML.getUserInput(`f1040-${uid}-13b`);
		inputs["14"]		= HTML.getUserInput(`f1040-${uid}-14`);
		inputs["15"]		= HTML.getUserInput(`f1040-${uid}-15`);
		inputs["16"]		= HTML.getUserInput(`f1040-${uid}-16`);
		inputs["17"]		= HTML.getUserInput(`f1040-${uid}-17`);
		inputs["18"]		= HTML.getUserInput(`f1040-${uid}-18`);
		inputs["19"]		= HTML.getUserInput(`f1040-${uid}-19`);
		inputs["20"]		= HTML.getUserInput(`f1040-${uid}-20`);
		inputs["21"]		= HTML.getUserInput(`f1040-${uid}-21`);
		inputs["22"]		= HTML.getUserInput(`f1040-${uid}-22`);
		inputs["23"]		= HTML.getUserInput(`f1040-${uid}-23`);
		inputs["24"]		= HTML.getUserInput(`f1040-${uid}-24`);
		inputs["25a"]		= HTML.getUserInput(`f1040-${uid}-25a`);
		inputs["25b"]		= HTML.getUserInput(`f1040-${uid}-25b`);
		inputs["25c"]		= HTML.getUserInput(`f1040-${uid}-25c`);
		inputs["25d"]		= HTML.getUserInput(`f1040-${uid}-25d`);
		inputs["26"]		= HTML.getUserInput(`f1040-${uid}-26`);
		inputs["27a"]		= HTML.getUserInput(`f1040-${uid}-27a`);
		inputs["28"]		= HTML.getUserInput(`f1040-${uid}-28`);
		inputs["29"]		= HTML.getUserInput(`f1040-${uid}-29`);
		inputs["30"]		= HTML.getUserInput(`f1040-${uid}-30`);
		inputs["31"]		= HTML.getUserInput(`f1040-${uid}-31`);
		inputs["32"]		= HTML.getUserInput(`f1040-${uid}-32`);
		inputs["33"]		= HTML.getUserInput(`f1040-${uid}-33`);
		inputs["34"]		= HTML.getUserInput(`f1040-${uid}-34`);
		inputs["35a"]		= HTML.getUserInput(`f1040-${uid}-35a`);
		inputs["36"]		= HTML.getUserInput(`f1040-${uid}-36`);
		inputs["37"]		= HTML.getUserInput(`f1040-${uid}-37`);
		inputs["38"]		= HTML.getUserInput(`f1040-${uid}-38`);

		if (!Objects.isUsed(inputs)) {
			return;
		}

		const f1040 = TaxFormObj.createForm("F1040");

		f1040.lines["01a"].user_value	= inputs["01a"]
		f1040.lines["01b"].user_value	= inputs["01b"]
		f1040.lines["01c"].user_value	= inputs["01c"]
		f1040.lines["01d"].user_value	= inputs["01d"]
		f1040.lines["01e"].user_value	= inputs["01e"]
		f1040.lines["01f"].user_value	= inputs["01f"]
		f1040.lines["01g"].user_value	= inputs["01g"]
		f1040.lines["01h"].user_value	= inputs["01h"]
		f1040.lines["01i"].user_value	= inputs["01i"]
		f1040.lines["01z"].user_value	= inputs["01z"]
		f1040.lines["02a"].user_value	= inputs["02a"]
		f1040.lines["02b"].user_value	= inputs["02b"]
		f1040.lines["03a"].user_value	= inputs["03a"]
		f1040.lines["03b"].user_value	= inputs["03b"]
		f1040.lines["04a"].user_value	= inputs["04a"]
		f1040.lines["04b"].user_value	= inputs["04b"]
		f1040.lines["05a"].user_value	= inputs["05a"]
		f1040.lines["05b"].user_value	= inputs["05b"]
		f1040.lines["06a"].user_value	= inputs["06a"]
		f1040.lines["06b"].user_value	= inputs["06b"]
		f1040.lines["07a"].user_value	= inputs["07a"]
		f1040.lines["08" ].user_value	= inputs["08"]
		f1040.lines["09" ].user_value	= inputs["09"]
		f1040.lines["10" ].user_value	= inputs["10"]
		f1040.lines["11a"].user_value	= inputs["11a"]
		f1040.lines["11b"].user_value	= inputs["11b"]
		f1040.lines["12e"].user_value	= inputs["12e"]
		f1040.lines["13a"].user_value	= inputs["13a"]
		f1040.lines["13b"].user_value	= inputs["13b"]
		f1040.lines["14" ].user_value	= inputs["14"]
		f1040.lines["15" ].user_value	= inputs["15"]
		f1040.lines["16" ].user_value	= inputs["16"]
		f1040.lines["17" ].user_value	= inputs["17"]
		f1040.lines["18" ].user_value	= inputs["18"]
		f1040.lines["19" ].user_value	= inputs["19"]
		f1040.lines["20" ].user_value	= inputs["20"]
		f1040.lines["21" ].user_value	= inputs["21"]
		f1040.lines["22" ].user_value	= inputs["22"]
		f1040.lines["23" ].user_value	= inputs["23"]
		f1040.lines["24" ].user_value	= inputs["24"]
		f1040.lines["25a"].user_value	= inputs["25a"]
		f1040.lines["25b"].user_value	= inputs["25b"]
		f1040.lines["25c"].user_value	= inputs["25c"]
		f1040.lines["25d"].user_value	= inputs["25d"]
		f1040.lines["26" ].user_value	= inputs["26"]
		f1040.lines["27a"].user_value	= inputs["27a"]
		f1040.lines["28" ].user_value	= inputs["28"]
		f1040.lines["29" ].user_value	= inputs["29"]
		f1040.lines["30" ].user_value	= inputs["30"]
		f1040.lines["31" ].user_value	= inputs["31"]
		f1040.lines["32" ].user_value	= inputs["32"]
		f1040.lines["33" ].user_value	= inputs["33"]
		f1040.lines["34" ].user_value	= inputs["34"]
		f1040.lines["35a"].user_value	= inputs["35a"]
		f1040.lines["36" ].user_value	= inputs["36"]
		f1040.lines["37" ].user_value	= inputs["37"]
		f1040.lines["38" ].user_value	= inputs["38"]
	}

	constructor(formname) {
		Debug.enter("F1040.Constructor()");
		super(formname);
		this.title = `1040 - Individual Income Tax Return`;

		// This field can be used to enter information that does not come from another
		// tax form.
		this.estimated_payments	= 0;

		this.lines["01a"]	= new Line("Wages");
		this.lines["01b"]	= new Line("Household Wages");
		this.lines["01c"]	= new Line("Tip Income");
		this.lines["01d"]	= new Line("Medicaid Waiver Payments");
		this.lines["01e"]	= new Line("Dependent Care Benefits");
		this.lines["01f"]	= new Line("Adoption Benefits");
		this.lines["01g"]	= new Line("Wages From Form 8919");
		this.lines["01h"]	= new Line("Other Earned Income");
		this.lines["01i"]	= new Line("Nontaxable Combat Pay");
		this.lines["01z"]	= new Line("Total Lines 1a-To1h");
		this.lines["02a"]	= new Line("Tax Exempt Interest");
		this.lines["02b"]	= new Line("Taxable Interest");
		this.lines["03a"]	= new Line("Qualified Dividends");
		this.lines["03b"]	= new Line("Ordinary Dividends");
		this.lines["04a"]	= new Line("IRA Distributions");
		this.lines["04b"]	= new Line("Taxable IRA");
		this.lines["05a"]	= new Line("Pensions And Annuities");
		this.lines["05b"]	= new Line("Taxable Pensions And Annuities");
		this.lines["06a"]	= new Line("Social Security Benefits");
		this.lines["06b"]	= new Line("Taxable Social Security");
		this.lines["07a"]	= new Line("Capital Gain");
		this.lines["08"]	= new Line("Additional Income");
		this.lines["09"]	= new Line("Total Income");
		this.lines["10"]	= new Line("Adjustments To Income");
		this.lines["11a"]	= new Line("Adjusted Gross Income");
		this.lines["11b"]	= new Line("Adjusted Gross Income");
		this.lines["12e"]	= new Line("Deductions");
		this.lines["13a"]	= new Line("QBI Deduction");
		this.lines["13b"]	= new Line("Additional Deductions");
		this.lines["14"]	= new Line("Total Deductions");
		this.lines["15"]	= new Line("Taxable Income");
		this.lines["16"]	= new Line("Income Tax");
		this.lines["17"]	= new Line("Additional Tax");
		this.lines["18"]	= new Line("Total Tax");
		this.lines["19"]	= new Line("Child Tax Credit");
		this.lines["20"]	= new Line("Nonrefundable Credits");
		this.lines["21"]	= new Line("Total Nonrefundable Credits");
		this.lines["22"]	= new Line("Tax Minus Nonrefundable Credits");
		this.lines["23"]	= new Line("Other Taxes");
		this.lines["24"]	= new Line("Total Tax");
		this.lines["25a"]	= new Line("Withholding From W2");
		this.lines["25b"]	= new Line("Withholding From 1099");
		this.lines["25c"]	= new Line("Other Withholding");
		this.lines["25d"]	= new Line("Total Withholding");
		this.lines["26"]	= new Line("Estimated Tax Payments");
		this.lines["27a"]	= new Line("Earned Income Credit");
		this.lines["28"]	= new Line("Additional Child Tax Credit");
		this.lines["29"]	= new Line("American Opportunity Credit");
		this.lines["30"]	= new Line("Refundable Adoption Credit");
		this.lines["31"]	= new Line("Additional Refundable Credits");
		this.lines["32"]	= new Line("Estimated Payments And Refundable Credits");
		this.lines["33"]	= new Line("Total Payments");
		this.lines["34"]	= new Line("Overpaid");
		this.lines["35a"]	= new Line("Refund");
		this.lines["36"]	= new Line("Apply To Next Years Tax");
		this.lines["37"]	= new Line("Amount Owed");
		this.lines["38"]	= new Line("Estimated Tax Penalty");

		Debug.exit("F1040.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F1040.calculate()");
		this.calculated = true;
		const tt = TaxTable.getTaxTable();
		const tp = Taxpayer.getTaxpayer();

		// User input values are already set. If this calculation modifies one of
		// those values, it will be ignored.
		this.lines["01a"].value	= TaxFormObj.getValue("W2", "01");		// Wages
		this.lines["01b"].value	= 0;									// Household ages
		this.lines["01c"].value	= 0;									// Tip Income
		this.lines["01d"].value	= 0;									// MWP
		this.lines["01e"].value	= TaxFormObj.getValue("F2441", "26");	// Dep Care Benefits
		this.lines["01f"].value	= TaxFormObj.getValue("F8839", "31");	// Adoption Benefits
		this.lines["01g"].value	= TaxFormObj.getValue("F8919", "06");	// Wages from f8919
		this.lines["01h"].value	= 0;									// Other Earned Inc
		this.lines["01i"].value	= 0;									// Nontaxed Combat
		this.lines["01z"].value	= this.add("01a","01b","01c","01d","01e","01f","01g","01h");
		this.lines["02a"].value	= TaxFormObj.getValue("F1099INT",	"08") +	// Tax-exempt int
									TaxFormObj.getValue("F1099OID",	"11");
		this.lines["02b"].value	= TaxFormObj.getValue("F1099INT",	"01") +	// Taxable Int
									TaxFormObj.getValue("F1099OID",	"01");
		this.lines["03a"].value	= TaxFormObj.getValue("F1099DIV",	"01b");	// Qualified Divs
		this.lines["03b"].value	= TaxFormObj.getValue("F1099DIV",	"01a");	// Ordinary Divs
		this.lines["04a"].value	= TaxFormObj.getIRAValue("01");				// IRA Dist
		this.lines["04b"].value	= TaxFormObj.getIRAValue("02a") +			// Taxable IRA
									TaxFormObj.getValue("F8606",	"15c") +
									TaxFormObj.getValue("F8606",	"18") +
									TaxFormObj.getValue("F8606",	"25c");
		this.lines["05a"].value	= TaxFormObj.getPensionValue("01");			// Pensions
		this.lines["05b"].value	= TaxFormObj.getPensionValue("02a");		// Pensions
		this.lines["06a"].value	= TaxFormObj.getValue("SSA1099",	"05");	// SS Benefits
		this.lines["06b"].value = 0;  // DELAY INITIALIZATION UNTIL LATER

		this.lines["07a"].value	= TaxFormObj.getValue("F1040SD",		"16") +	// Cap Gain
									TaxFormObj.getValue("F1040SD",	"21");
		this.lines["08"].value	= TaxFormObj.getValue("F1040S1",		"10");	// Other Inc

		// Reorder fields for dependency. Taxable SS, which is on 1040 line 6b, depends
		// on 1040 lines 1z, 2a, 2b, 3b, 4b, 5b, 6a, 7, 8, and 10. And, 1040 line 9
		// depends on Taxable SS.
		this.lines["10"].value	= TaxFormObj.getValue("F1040S1", "26");	// Adj to Income
		this.lines["06b"].value	= TaxFormObj.getValue("SSTax", "19");	// Taxable SS

		// Resume normal order
		// Total Income
		this.lines["09"].value	= this.add("01z","02b","03b","04b","05b","06b","07a","08");
		this.lines["11a"].value	= this.subtract("09", "10");			// AGI
		this.lines["11b"].value	= this.line("11a");						// AGI

		const itemized_deductions	= TaxFormObj.getValue("F1040SA", "17");
		const standard_deduction	= tt.getStandardDeduction(
			tp.filing_status,
			tp.taxpayers_age,
			tp.spouses_age,
			tp.is_taxpayer_blind,
			tp.is_spouse_blind);

		this.lines["12e"].value	= Math.max(standard_deduction, itemized_deductions);
/*
		if (this.line("11a") -
			TaxFormObj.getValue(
				"F1040S1", "13") - this.line("12e") < 3rd tax bracket limit) {
			this.lines["13a"].value = TaxFormObj.getValue("F8995", "15");
		} else {
			this.lines["13a"].value = TaxFormObj.getValue("F8995a", "19");
		}
*/
		this.lines["13a"].value	= TaxFormObj.getValue("F8995", "15");	// QBI Deduction
		this.lines["13b"].value	= TaxFormObj.getValue("F1040S1A", "38");// Additional Deducts
		this.lines["14"].value	= this.add("12e","13a","13b");			// Total Deductions
		this.lines["15"].value	= Math.max(0, this.subtract("11b", "14"));	// Taxable Income
		this.lines["16"].value	= TaxFormObj.getValue("IncTax", "25");	// Income Tax
		this.lines["17"].value	= TaxFormObj.getValue("F1040S2", "03");	// Additional Tax
		this.lines["18"].value	= this.add("16", "17");					// Total Tax
		this.lines["19"].value	= TaxFormObj.getValue("F8812", "14");	// Child Tax Credit
		this.lines["20"].value	= TaxFormObj.getValue("F1040S3", "08");	// Non-refund Creds
		this.lines["21"].value	= this.add("19", "20");
		this.lines["22"].value	= Math.max(0, this.subtract("18", "21"));// Tax - NR Credits
		this.lines["23"].value	= TaxFormObj.getValue("F1040S2", "21");	// Other Taxes
		this.lines["24"].value	= this.add("22", "23");					// Total Tax
		this.lines["25a"].value	= TaxFormObj.getValue("W2", "02");		// W2 Witholding
		this.lines["25b"].value	= TaxFormObj.getValue("F1099INT", "04") +
									TaxFormObj.getValue("F1099DIV", "04") +
									TaxFormObj.getValue("F1099G", "04") +
									TaxFormObj.getValue("F1099K", "04") +
									TaxFormObj.getValue("F1099MISC", "04") +
									TaxFormObj.getValue("F1099NEC", "04") +
									TaxFormObj.getValue("F1099OID", "04") +
									TaxFormObj.getValue("F1099R", "04") +
									TaxFormObj.getValue("SSA1099", "06");// 1099 Withholding
		this.lines["25c"].value	= TaxFormObj.getValue("F8959", "24");	// Other withholding
		this.lines["25d"].value	= this.add("25a", "25b", "25c");		// Total Withholding
		this.lines["26"].value	= this.estimated_payments;				// Estimated payments
		this.lines["27a"].value	= TaxFormObj.getValue("EIC", "xx");		// EIC
		this.lines["28"].value	= TaxFormObj.getValue("F8812", "27");	// Additional CTC
		this.lines["29"].value	= TaxFormObj.getValue("F8863", "08");	// Amer Opp Cred
		this.lines["30"].value	= TaxFormObj.getValue("F8839", "13");	// Refund Adopt Cred
		this.lines["31"].value	= TaxFormObj.getValue("F1040S3", "15");	// Other Refund Creds
		this.lines["32"].value	= this.add("27a","28","29","30","31");	// Estimated Payments
		this.lines["33"].value	= this.add("25d","26","32");			// Total Payments
		if (this.line("33") > this.line("24")) {
			this.lines["34"].value	= this.subtract("33", "24");		// Overpaid
			this.lines["35a"].value	= this.subtract("34", "36");		// Refund
			this.lines["36"].value	= 0;								// Apply to next year
		} else {
			this.lines["37"].value	= this.subtract("24", "33");		// Amount Owed
			this.lines["38"].value	= TaxFormObj.getValue("Penalty", "xx");	// EstTax Penalty
		}
		Debug.exit("F1040.calculate()");
	}

	getOutputHTML(uid) {
		if (!uid) {
			throw new Error(`${this.formname}.getOutputHTML(): UID is undefined.`);
		}

		const html = HTML_FORM.replace(/XX/g, uid)
								.replace(/202X/g, TaxTable.getTaxYear());

		return [ `f1040-${uid}-container`, html ];
	}
}
