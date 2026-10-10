
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { Line }			from "../Classes/Line.js";
import { HTML }			from "../Modules/HTML.js";
import { Str }			from "../Modules/Str.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { TaxInfo }		from "../Modules/TaxInfo.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";
import { TaxTable }		from "../Modules/TaxTable.js";
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
					<p class="right">Taxpayer Is Blind</p>
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
					<p class="not-used"></p>
					<p class="not-used"></p>
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
					<p class="not-used"></p>
					<p class="not-used"></p>
				</div>
				<div class="taxform-lno-desc-lno-value-lno-value">
					<p class="lineno">25b</p>
					<p class="description">Federal income tax withheld from Form(s) 1099</p>
					<p class="lineno">25b</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-25b" size="10" placeholder="0" />
					<p class="not-used"></p>
					<p class="not-used"></p>
				</div>
				<div class="taxform-lno-desc-lno-value-lno-value">
					<p class="lineno">25c</p>
					<p class="description">Federal income tax withheld from Other forms</p>
					<p class="lineno">25c</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-25c" size="10" placeholder="0" />
					<p class="not-used"></p>
					<p class="not-used"></p>
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
					<p class="not-used"></p>
					<p class="not-used"></p>
				</div>
				<div class="taxform-lno-desc-lno-value-lno-value">
					<p class="lineno">28</p>
					<p class="description">Additional child tax credit (ACTC) from
						Schedule 8812</p>
					<p class="lineno">28</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-28" size="10" placeholder="0" />
					<p class="not-used"></p>
					<p class="not-used"></p>
				</div>
				<div class="taxform-lno-desc-lno-value-lno-value">
					<p class="lineno">29</p>
					<p class="description">American opportunity credit from
						Form 8863, line 8</p>
					<p class="lineno">29</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-29" size="10" placeholder="0" />
					<p class="not-used"></p>
					<p class="not-used"></p>
				</div>
				<div class="taxform-lno-desc-lno-value-lno-value">
					<p class="lineno">30</p>
					<p class="description">Refundable adoption credit from
						Form 8839, line 13</p>
					<p class="lineno">30</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-30" size="10" placeholder="0" />
					<p class="not-used"></p>
					<p class="not-used"></p>
				</div>
				<div class="taxform-lno-desc-lno-value-lno-value">
					<p class="lineno">31</p>
					<p class="description">Amount from Schedule 3, line 15</p>
					<p class="lineno">31</p>
					<input class="output-field" readonly type="text"
						id="f1040-XX-31" size="10" placeholder="0" />
					<p class="not-used"></p>
					<p class="not-used"></p>
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
					<p class="not-used"></p>
					<p class="not-used"></p>
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
					<p class="not-used"></p>
					<p class="not-used"></p>
				</div>
				<div>&nbsp;</div>
			</div>
		</details>
`;

export class F1040 extends TaxForm {
	constructor(formname) {
		Debug.enter("F1040.Constructor()");
		super(formname);
		this.title	= `1040 - Individual Income Tax Return`;
		this.sstax	= TaxFormObj.createForm("SSTax");
		this.inctax	= TaxFormObj.createForm("IncTax");

		// Variables for external input. This variable is be used to enter information
		// that does not come from another tax form.
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

		// Abbreviations
		const tt = TaxTable.getTaxTable();
		const tp = Taxpayer.getTaxpayer();
		const getValue = TaxFormObj.getValue;

		this.sstax.resetCalculated();
		this.inctax.resetCalculated();

		this.lines["01a"].value	= getValue("W2", "01");	// Wages
		this.lines["01b"].value	= 0;					// Household ages
		this.lines["01c"].value	= 0;					// Tip Income
		this.lines["01d"].value	= 0;					// MWP
		this.lines["01e"].value	= getValue("F2441", "26");	// Dep Care Benefits
		this.lines["01f"].value	= getValue("F8839", "31");	// Adoption Benefits
		this.lines["01g"].value	= getValue("F8919", "06");	// Wages from f8919
		this.lines["01h"].value	= 0;					// Other Earned Inc
		this.lines["01i"].value	= 0;					// Nontaxed Combat
		this.lines["01z"].value	= this.add("01a","01b","01c","01d","01e","01f","01g","01h");
		this.lines["02a"].value	=						// Tax exempt interest =
			getValue("F1099INT",	"08") +				// Tax-exempt interest
			getValue("F1099OID",	"11") +				// Tax-exempt OID
			getValue("F1099DIV",	"12");				// Tax-exempt interest dividends
		this.lines["02b"].value	=						// Taxable interest
			getValue("F1099INT",	"01") +				// Interest income
			getValue("F1099INT",	"03") +				// Interest on US treasuries
			getValue("F1099OID",	"01") +				// Original issue discount
			getValue("F1099OID",	"02") +				// OID - other periodic interest
			getValue("F1099OID",	"06");				// OID - acquisition premium
		this.lines["03a"].value	= getValue("F1099DIV", "01b");	// Qualified Dividends
		this.lines["03b"].value	= getValue("F1099DIV", "01a");	// Ordinary Dividends
		this.lines["04a"].value	= TaxInfo.getIRAValue("01");	// Total IRA Distributions
		this.lines["04b"].value	=
			TaxInfo.getIRAValue("02a") +				// Taxable IRA Distributions
			getValue("F8606",	"15c") +
			getValue("F8606",	"18") +
			getValue("F8606",	"25c");
		this.lines["05a"].value	= TaxInfo.getPensionValue("01");	// Total Pension
		this.lines["05b"].value	= TaxInfo.getPensionValue("02a");	// Taxable Pension
		this.lines["06a"].value	= getValue("SSA1099",	"05");		// Total SS Benefits

		// this.lines["06b"].value	= 0;  // DELAY INITIALIZATION UNTIL LATER

		// Capital gains
		this.lines["07a"].value	=
			getValue("F1099DIV", "02a") +
			Math.max(0, getValue("F1040SD", "16")) +			// One of these is 0
			getValue("F1040SD", "21");							// One of these is 0
		this.lines["08"].value	= getValue("F1040S1",	"10");	// Other Income

		// Reorder fields for dependency. Taxable SS, which is on 1040 line 6b, depends
		// on 1040 lines 1z, 2a, 2b, 3b, 4b, 5b, 6a, 7, 8, and 10. And, 1040 line 9
		// depends on Taxable SS.
		this.lines["10"].value	= getValue("F1040S1", "26");	// Adjustments to Income
		this.lines["06b"].value	= this.sstax.calculate();		// Taxable SS

		// Resume normal order
		// Total Income
		this.lines["09"].value	= this.add("01z","02b","03b","04b","05b","06b","07a","08");
		this.lines["11a"].value	= this.subtract("09", "10");	// AGI
		this.lines["11b"].value	= this.line("11a");				// AGI
		const standard_deduction =
			tt.getStandardDeduction(
				tp.filing_status,
				tp.taxpayers_age,
				tp.spouses_age,
				tp.is_taxpayer_blind,
				tp.is_spouse_blind);
		this.lines["12e"].value	= Math.max(standard_deduction, getValue("F1040SA", "17"));
		this.lines["13a"].value	= getValue("F8995", "15");		// QBI Deduction
		this.lines["13b"].value	= getValue("F1040S1A", "38");	// Additional Deducts
		this.lines["14"].value	= this.add("12e","13a","13b");	// Total Deductions
		this.lines["15"].value	= Math.max(0, this.subtract("11b", "14"));	// Taxable Income
		this.lines["16"].value	= this.inctax.calculate();		// Income Tax
		this.lines["17"].value	= getValue("F1040S2", "03");	// Additional Tax
		this.lines["18"].value	= this.add("16", "17");			// Total Tax
		this.lines["19"].value	= getValue("F8812", "14");		// Child Tax Credit
		this.lines["20"].value	= getValue("F1040S3", "08");	// Non-refund Creds
		this.lines["21"].value	= this.add("19", "20");
		this.lines["22"].value	= Math.max(0, this.subtract("18", "21"));	// Tax - Credits
		this.lines["23"].value	= getValue("F1040S2", "21");	// Other Taxes
		this.lines["24"].value	= this.add("22", "23");			// Total Tax
		this.lines["25a"].value	= getValue("W2", "02");			// W2 Witholding
		this.lines["25b"].value	=								// 1099 Withholding
			getValue("F1099INT", "04") +
			getValue("F1099DIV", "04") +
			getValue("F1099G", "04") +
			getValue("F1099K", "04") +
			getValue("F1099MISC", "04") +
			getValue("F1099NEC", "04") +
			getValue("F1099OID", "04") +
			getValue("F1099R", "04") +
			getValue("SSA1099", "06");
		this.lines["25c"].value	= getValue("F8959", "24");			// Other withholding
		this.lines["25d"].value	= this.add("25a", "25b", "25c");	// Total Withholding
		this.lines["26"].value	= this.estimated_payments;			// Estimated payments
		this.lines["27a"].value	= getValue("EIC", "xx");			// EIC
		this.lines["28"].value	= getValue("F8812", "27");			// Additional CTC
		this.lines["29"].value	= getValue("F8863", "08");			// Amer Opp Cred
		this.lines["30"].value	= getValue("F8839", "13");			// Refund Adopt Cred
		this.lines["31"].value	= getValue("F1040S3", "15");		// Other Refund Creds
		this.lines["32"].value	= this.add("27a","28","29","30","31");	// Estimated Payments
		this.lines["33"].value	= this.add("25d","26","32");		// Total Payments
		if (this.line("33") > this.line("24")) {
			this.lines["34"].value	= this.subtract("33", "24");	// Overpaid
			this.lines["35a"].value	= this.subtract("34", "36");	// Refund
			this.lines["36"].value	= 0;							// Apply to next year
		} else {
			this.lines["37"].value	= this.subtract("24", "33");	// Amount Owed
			this.lines["38"].value	= getValue("Penalty", "xx");	// EstTax Penalty
		}
		Debug.exit("F1040.calculate()");
	}

	getHTML(uid) {
		if (!uid) {
			throw new Error(`${this.formname}.getHTML(): UID is undefined.`);
		}

		const html = HTML_FORM.replace(/XX/g, uid)
								.replace(/202X/g, TaxTable.getTaxYear());

		return [ `f1040-${uid}-container`, html ];
	}
}
