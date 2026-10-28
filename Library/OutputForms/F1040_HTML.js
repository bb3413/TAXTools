
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
		<details class="taxform-details" id="f1040-XX">
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

const FIELD_INFO = {
	// Field Name	Value Type	Is Line	Description
	"01a":			["",		true,	"Wages"],
	"01b":			["",		true,	"Household Wages"],
	"01c":			["",		true,	"Tip Income"],
	"01d":			["",		true,	"Medicaid Waiver Payments"],
	"01e":			["",		true,	"Dependent Care Benefits"],
	"01f":			["",		true,	"Adoption Benefits"],
	"01g":			["",		true,	"Wages From Form 8919"],
	"01h":			["",		true,	"Other Earned Income"],
	"01i":			["",		true,	"Nontaxable Combat Pay"],
	"01z":			["",		true,	"Total Lines 1a-To1h"],
	"02a":			["",		true,	"Tax Exempt Interest"],
	"02b":			["",		true,	"Taxable Interest"],
	"03a":			["",		true,	"Qualified Dividends"],
	"03b":			["",		true,	"Ordinary Dividends"],
	"04a":			["",		true,	"IRA Distributions"],
	"04b":			["",		true,	"Taxable IRA"],
	"05a":			["",		true,	"Pensions And Annuities"],
	"05b":			["",		true,	"Taxable Pensions And Annuities"],
	"06a":			["",		true,	"Social Security Benefits"],
	"06b":			["",		true,	"Taxable Social Security"],
	"07a":			["",		true,	"Capital Gain"],
	"08":			["",		true,	"Additional Income"],
	"09":			["",		true,	"Total Income"],
	"10":			["",		true,	"Adjustments To Income"],
	"11a":			["",		true,	"Adjusted Gross Income"],
	"11b":			["",		true,	"Adjusted Gross Income"],
	"12e":			["",		true,	"Deductions"],
	"13a":			["",		true,	"QBI Deduction"],
	"13b":			["",		true,	"Additional Deductions"],
	"14":			["",		true,	"Total Deductions"],
	"15":			["",		true,	"Taxable Income"],
	"16":			["",		true,	"Income Tax"],
	"17":			["",		true,	"Additional Tax"],
	"18":			["",		true,	"Total Tax"],
	"19":			["",		true,	"Child Tax Credit"],
	"20":			["",		true,	"Nonrefundable Credits"],
	"21":			["",		true,	"Total Nonrefundable Credits"],
	"22":			["",		true,	"Tax Minus Nonrefundable Credits"],
	"23":			["",		true,	"Other Taxes"],
	"24":			["",		true,	"Total Tax"],
	"25a":			["",		true,	"Withholding From W2"],
	"25b":			["",		true,	"Withholding From 1099"],
	"25c":			["",		true,	"Other Withholding"],
	"25d":			["",		true,	"Total Withholding"],
	"26":			["",		true,	"Estimated Tax Payments"],
	"27a":			["",		true,	"Earned Income Credit"],
	"28":			["",		true,	"Additional Child Tax Credit"],
	"29":			["",		true,	"American Opportunity Credit"],
	"30":			["",		true,	"Refundable Adoption Credit"],
	"31":			["",		true,	"Additional Refundable Credits"],
	"32":			["",		true,	"Estimated Payments And Refundable Credits"],
	"33":			["",		true,	"Total Payments"],
	"34":			["",		true,	"Overpaid"],
	"35a":			["",		true,	"Refund"],
	"36":			["",		true,	"Apply To Next Years Tax"],
	"37":			["",		true,	"Amount Owed"],
	"38":			["",		true,	"Estimated Tax Penalty"],
}

export class F1040_HTML extends HTMLBlock {
	static getFieldInfo() {
		return FIELD_INFO;
	}

	static getHTML(uid) {
		return HTML_CODE.replace(/XX/g, uid)
							.replace(/202X/g, TaxTable.getTaxYear());
	}

	constructor() {
		super();
		this.name		= "f1040";
		this.uid		= HTMLMgr.getMgr().allocateUID(this.name);
		this.html		= F1040_HTML.getHTML(this.uid);
		this.fields		= F1040_HTML.getFieldInfo();
	}
}
