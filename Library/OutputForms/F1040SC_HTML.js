
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
		<details class="taxform-details" id="f1040sc-XX-container">
			<summary class="taxform-summary">
				Schedule C - Profit and Loss From Business</summary>
			<div class="taxform-container">
				<div>&nbsp;</div>
				<div class="taxform-desc-string">
					<p>Business Name</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-name" size="10" placeholder="" />
				</div>
				<div class="taxform-section-container">
					<p class="section-part">Part I</p>
					<p class="section-title">Income</p>
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno noborder">1</p>
					<p class="description noborder"">Gross receipts or sales"</p>
					<p class="lineno">1</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-01" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno noborder">2</p>
					<p class="description noborder">Returns and allowances</p>
					<p class="lineno">2</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-02" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno noborder">3</p>
					<p class="description noborder">Subtract line 2 from line 1</p>
					<p class="lineno">3</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-03" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno noborder">4</p>
					<p class="description noborder">Cost of goods sold (from line 42)</p>
					<p class="lineno">4</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-04" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno noborder">5</p>
					<p class="description noborder">Gross profit. Subtract line 4
						from line 3</p>
					<p class="lineno">5</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-05" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno noborder">6</p>
					<p class="description noborder">Other income, including federal
						and state gasoline or fuel tax credit or refund</p>
					<p class="lineno">6</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-06" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno noborder">7</p>
					<p class="description noborder">Gross income. Add lines 5 and 6</p>
					<p class="lineno">7</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-07" size="10" placeholder="0" />
				</div>

				<div class="taxform-section-container">
					<p class="section-part">Part II</p>
					<p class="section-title">Expenses</p>
				</div>
				<div class="taxform-lno-desc-lno-value-lno-desc-lno-value">
					<p class="lineno noborder">8</p>
					<p class="description noborder">Advertising</p>
					<p class="lineno">8</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-08" size="10" placeholder="0" />

					<p class="lineno noborder">18</p>
					<p class="description noborder">Office expense</p>
					<p class="lineno">18</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-18" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value-lno-desc-lno-value">
					<p class="lineno noborder">9</p>
					<p class="description noborder">Car and truck expenses</p>
					<p class="lineno">9</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-09" size="10" placeholder="0" />

					<p class="lineno noborder">19</p>
					<p class="description noborder">Pension and profit-sharing plans</p>
					<p class="lineno">19</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-19" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value-lno-desc-lno-value">
					<p class="lineno noborder">10</p>
					<p class="description noborder">Commissions and fees</p>
					<p class="lineno">10</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-10" size="10" placeholder="0" />

					<p class="lineno noborder">20a</p>
					<p class="description noborder">Rent or lease Vehicles, machinery,
						and equipment</p>
					<p class="lineno">20a</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-20a" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value-lno-desc-lno-value">
					<p class="lineno noborder">11</p>
					<p class="description noborder">Contract labor</p>
					<p class="lineno">11</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-11" size="10" placeholder="0" />

					<p class="lineno noborder">20b</p>
					<p class="description noborder">Rent or lease Other business property</p>
					<p class="lineno">20b</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-20b" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value-lno-desc-lno-value">
					<p class="lineno noborder">11</p>
					<p class="description noborder">Car and truck expenses</p>
					<p class="lineno">11</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-11" size="10" placeholder="0" />

					<p class="lineno noborder">21</p>
					<p class="description noborder">Repairs and maintenance</p>
					<p class="lineno">21</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-21" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value-lno-desc-lno-value">
					<p class="lineno noborder">12</p>
					<p class="description noborder">Depletion</p>
					<p class="lineno">12</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-12" size="10" placeholder="0" />

					<p class="lineno noborder">22</p>
					<p class="description noborder">Supplies</p>
					<p class="lineno">22</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-22" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value-lno-desc-lno-value">
					<p class="lineno noborder">13</p>
					<p class="description noborder">Depreciation and section
						179 expense deduction</p>
					<p class="lineno">13</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-13" size="10" placeholder="0" />

					<p class="lineno noborder">23</p>
					<p class="description noborder">Taxes and licenses</p>
					<p class="lineno">23</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-23" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value-lno-desc-lno-value">
					<p class="lineno noborder">14</p>
					<p class="description noborder">Employee benefit programs</p>
					<p class="lineno">14</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-14" size="10" placeholder="0" />

					<p class="lineno noborder">24a</p>
					<p class="description noborder">Travel</p>
					<p class="lineno">24a</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-24a" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value-lno-desc-lno-value">
					<p class="lineno noborder">15</p>
					<p class="description noborder">Insurance (other than health)</p>
					<p class="lineno">15</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-15" size="10" placeholder="0" />

					<p class="lineno noborder">24b</p>
					<p class="description noborder">Deductible meals</p>
					<p class="lineno">24b</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-24b" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value-lno-desc-lno-value">
					<p class="lineno noborder">16a</p>
					<p class="description noborder">Mortgage Interest</p>
					<p class="lineno">16a</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-16a" size="10" placeholder="0" />

					<p class="lineno noborder">25</p>
					<p class="description noborder">Utilities</p>
					<p class="lineno">25</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-25" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value-lno-desc-lno-value">
					<p class="lineno noborder">16b</p>
					<p class="description noborder">Other Interest</p>
					<p class="lineno">16b</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-16b" size="10" placeholder="0" />

					<p class="lineno noborder">26</p>
					<p class="description noborder">Wages</p>
					<p class="lineno">26</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-26" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value-lno-desc-lno-value">
					<p class="lineno noborder">17</p>
					<p class="description noborder">Legal and professional services</p>
					<p class="lineno">17</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-17" size="10" placeholder="0" />

					<p class="lineno noborder">27a</p>
					<p class="description noborder">Energy efficient commercial
						bldgs deduction</p>
					<p class="lineno">27a</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-27a" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value-lno-desc-lno-value">
					<p>&nbsp;</p>
					<p>&nbsp;</p>
					<p>&nbsp;</p>
					<p>&nbsp;</p>

					<p class="lineno noborder">27b</p>
					<p class="description noborder">Other expenses</p>
					<p class="lineno">27b</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-27b" size="10" placeholder="0" />
				</div>

				<hr />
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno noborder">28</p>
					<p class="description noborder">Total expenses before expenses
						for business use of home. Add lines 8 through 27b</p>
					<p class="lineno">28</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-28" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno noborder">29</p>
					<p class="description noborder">Tentative profit or (loss). Subtract
						line 28 from line 7</p>
					<p class="lineno">29</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-29" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno noborder">30</p>
					<p class="description noborder">Expenses for business use of
						your home</p>
					<p class="lineno">30</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-30" size="10" placeholder="0" />
				</div>
				<div class="taxform-lno-desc-lno-value">
					<p class="lineno noborder">31</p>
					<p class="description noborder">Net profit or (loss). Subtract
						line 30 from line 29</p>
					<p class="lineno">31</p>
					<input class="output-field" readonly type="text"
						id="f1040sc-XX-31" size="10" placeholder="0" />
				</div>
				<div>&nbsp;</div>
			</div>
			<div>&nbsp;</div>
		</details>
`;

const FIELD_INFO = {
	// Field Name	Value Type	Is Line	Description
	"name":			["",		true,	"Business Name"],

	// Income
	"01":			["",		true,	"Gross Receipts or Sales"],
	"02":			["",		true,	"Returns and Allowances"],
	"03":			["",		true,	"Line 1 - Line 2"],
	"04":			["",		true,	"Cost of Goods Sold"],
	"05":			["",		true,	"Gross Profit"],
	"06":			["",		true,	"Other Income"],
	"07":			["",		true,	"Gross Income"],

	// Expenses
	"08":			["",		true,	"Advertising"],
	"09":			["",		true,	"Car and Truck Expense"],
	"10":			["",		true,	"Commission and Fees"],
	"11":			["",		true,	"Contract Labor"],
	"12":			["",		true,	"Depletion"],
	"13":			["",		true,	"Depreciation"],
	"14":			["",		true,	"Employee Benefit Programs"],
	"15":			["",		true,	"Insurance"],
	"16a":			["",		true,	"Mortgage Interest"],
	"16b":			["",		true,	"Other Interest"],
	"17":			["",		true,	"Professional Services"],
	"18":			["",		true,	"Office Expenses"],
	"19":			["",		true,	"Pension Plan"],
	"20a":			["",		true,	"Rent Machinery"],
	"20b":			["",		true,	"Rent Other"],
	"21":			["",		true,	"Repairs and Maintenance"],
	"22":			["",		true,	"Supplies"],
	"23":			["",		true,	"Taxes and Licenses"],
	"24a":			["",		true,	"Travel"],
	"24b":			["",		true,	"Travel Meals"],
	"25":			["",		true,	"Utilities"],
	"26":			["",		true,	"Wages"],
	"27a":			["",		true,	"Energy Efficiency Deduction"],
	"27b":			["",		true,	"Other Expense"],

	"28":			["",		true,	"Total Expenses"],
	"29":			["",		true,	"Tentative profit"],
	"30":			["",		true,	"Business Use of Home Expense"],
	"31":			["",		true,	"Net Profit"],
}

export class F1040SC_HTML extends HTMLBlock {
	static getFieldInfo() {
		return FIELD_INFO;
	}

	static getHTML(uid) {
		return HTML_CODE.replace(/XX/g, uid)
							.replace(/202X/g, TaxTable.getTaxYear());
	}

	constructor() {
		super();
		this.name		= "f1040sc";
		this.uid		= HTMLMgr.getMgr().allocateUID(this.name);
		this.html		= F1040SC_HTML.getHTML(this.uid);
		this.fields		= F1040SC_HTML.getFieldInfo();
	}
}
