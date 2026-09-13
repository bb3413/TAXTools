<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<link rel="stylesheet" href="../Library/CSS/TAXTools.css" />
	<link rel="stylesheet" href="../Library/CSS/Tooltips.css" />
	<link rel="stylesheet" href="../Library/CSS/HTML.css" />

	<script type="module" src="../Library/TAXTools/TAXTools.js"></script>
	<script type="module" src="../Library/TAXTools/Tooltips.js"></script>
	<script type="module" src="../Version/Version.js"></script>

	<link rel="stylesheet" href="SmallBusiness.css" />
	<script type="module" src="SmallBusiness.js"></script>
	<title>Small Business Tax Calculator</title>
</head>

<body>
	<div class="tool-container">
		<p class="version-number">Version: <a href="../Version/Version.html">
			<span id="tax-tools-version"></span></a></p>

		<h1 class="title">Small Business Tax Calculator</h1>

		<p>This tool calculates the taxes for a small business. The blue fields are computed
		from the information you provide. The green fields are where you enter information.
		The first column shows where the information can be found on the tax return. Click
		<a href="SmallBusiness-Help.html">this link</a> for more help with this tool.</p>

		<div class="tax-calculation-box">
			<h3 class="tight">Tax Formula for Small Business</h3>
			<p class="tight">The net profit for a small business is calculated on Schedule C
			as shown in the formula below. This, in turn, shows the information that is needed
			to calculate the taxes for the small business.</p>

			<div class="tax-formula-container">
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>Gross Profit</p>
				<p>= Sales or Receipts - Returns and Allowances - Cost of Goods Sold</p>
				<p>Gross Income</p>
				<p>= Gross Profit + Other Income</p>
				<p>Net Profit</p>
				<p>= Gross Income - Total Expenses - Business Use of Home Expenses</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
			</div>

			<h3>Tax Calculation</h3>
			<div class="table-3x">
				<p class="location-field">Sched C, line 5</p>
			   	<p class="label-field">Gross Profit</p>
				<p class="trigger output-field" id="GrossProfit"
					tooltipid="#GrossProfitTT">0</p>

				<p class="location-field">Sched C, line 7</p>
			   	<p class="label-field">Gross Income</p>
				<p class="trigger output-field" id="GrossIncome"
					tooltipid="#GrossIncomeTT">0</p>

				<p class="location-field">1040 S1, line 3</p>
			   	<p class="label-field">Net Profit</p>
				<p class="trigger output-field" id="NetProfit"
					tooltipid="#NetProfitTT">0</p>

				<p class="location-field">1040 S2, line 4</p>
				<p class="label-field">Self-employment Tax</p>
				<p class="trigger output-field" id="SelfEmploymentTax"
					tooltipid="#SelfEmploymentTaxTT">0</p>

				<p class="location-field">1040, line 13a</p>
				<p class="label-field">Qualified Business Income Deduction</p>
				<p class="trigger output-field" id="QBI_Deduction"
					tooltipid="#QBI_DeductionTT">0</p>

				<p class="location-field">1040 S1, line 15</p>
				<p class="label-field">Self-employment Tax Adjustment</p>
				<p class="trigger output-field" id="SelfEmploymentTaxAdjustment"
					tooltipid="#SelfEmploymentTaxAdjustmentTT">0</p>

				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>

				<p class="location-field">Not Used</p>
				<p class="label-field">Net profit after SEHI</p>
				<p class="trigger output-field" id="NetProfitAfterSEHI"
					tooltipid="#NetProfitAfterSEHI_TT">0</p>

				<p class="location-field">1040 S1, line 17</p>
				<p class="label-field">Self-employed Health Insurance Adjustment</p>
				<p class="trigger output-field" id="SEHI_Adjustment"
					tooltipid="#SEHI_AdjustmentTT">0</p>

				<p class="location-field">Sched A, line 1</p>
				<p class="label-field">Medical Insurance Itemized Deduction</p>
				<p class="trigger output-field" id="MedicalDeduction"
					tooltipid="#MedicalDeductionTT">0</p>
			</div>
		</div>

		<h3>Income Fields</h3>
		<div class="table-3x">
			<p class="location-field">Sched C, line 1</p>
			<p class="label-field">Sales or Receipts</p>
			<input class="trigger input-field" type="text" id="Sales"
				placeholder="0" tooltipid="#SalesTT" size="10" />

			<p class="location-field">Sched C, line 2</p>
			<p class="label-field">Returns and Allowances</p>
			<input class="trigger input-field" type="text" id="Returns"
				placeholder="0" tooltipid="#ReturnsTT" size="10" />

			<p class="location-field">Sched C, line 4</p>
			<p class="label-field">Cost of Goods Sold</p>
			<input class="trigger input-field" type="text" id="Cost"
				placeholder="0" tooltipid="#CostTT" size="10" />

			<p class="location-field">Sched C, line 6</p>
			<p class="label-field">Other Income</p>
			<input class="trigger input-field" type="text" id="OtherIncome"
				placeholder="0" tooltipid="#OtherIncomeTT" size="10" />
			<p class="location-field">Sched C, line 30</p>

			<p class="label-field">Business Use of Home Expenses</p>
			<input class="trigger input-field" type="text" id="HomeOfficeExpense"
			   	placeholder="0" tooltipid="#HomeOfficeExpenseTT" size="10" />
		</div>

		<h3>Expense Fields</h3>
		<div class="table-3x">
			<p class="location-field"></p>
			<p class="label-field">Medical Insurance</p>
			<input class="trigger input-field" type="text" id="MedicalInsurance" size="10"
			   	placeholder="0" tooltipid="#MedicalInsuranceTT" />

			<p class="location-field">Sched C, line 8</p>
			<p class="label-field">Advertising</p>
			<input class="trigger input-field" type="text" id="Advertising" size="10"
			   	placeholder="0" tooltipid="#AdvertisingTT" />

			<p class="location-field">Sched C, line 9</p>
			<p class="label-field">Car and Truck</p>
			<input class="trigger input-field" type="text" id="CarAndTruck" size="10"
			   	placeholder="0" tooltipid="#CarAndTruckTT" />

			<p class="location-field">Sched C, line 9</p>
			<p class="label-field">Car and Truck Miles</p>
			<input class="trigger input-field" type="text" id="CarAndTruckMiles" size="10"
			   	placeholder="0" tooltipid="#CarAndTruckMilesTT" />

			<p class="location-field">Sched C, line 10</p>
			<p class="label-field">Commissions and Fees</p>
			<input class="trigger input-field" type="text" id="CommissionsAndFees" size="10"
			   	placeholder="0" tooltipid="#CommissionsAndFeesTT" />

			<p class="location-field">Sched C, line 11</p>
			<p class="label-field">Contract Labor</p>
			<input class="trigger input-field" type="text" id="ContractLabor" size="10"
			   	placeholder="0" tooltipid="#ContractLaborTT" />

			<p class="location-field">Sched C, line 12</p>
			<p class="label-field">Depletion</p>
			<input class="trigger input-field" type="text" id="Depletion" size="10"
			   	placeholder="0" tooltipid="#DepletionTT" />

			<p class="location-field">Sched C, line 13</p>
			<p class="label-field">Depreciation</p>
			<input class="trigger input-field" type="text" id="Depreciation" size="10"
			   	placeholder="0" tooltipid="#DepreciationTT" />

			<p class="location-field">Sched C, line 14</p>
			<p class="label-field">Employee Benefit Programs</p>
			<input class="trigger input-field" type="text" id="EmployeeBenefitPrograms"
				size="10"
			   	placeholder="0" tooltipid="#EmployeeBenefitProgramsTT" />

			<p class="location-field">Sched C, line 15</p>
			<p class="label-field">Insurance</p>
			<input class="trigger input-field" type="text" id="Insurance" size="10"
			   	placeholder="0" tooltipid="#InsuranceTT" />

			<p class="location-field">Sched C, line 16</p>
			<p class="label-field">Interest</p>
			<input class="trigger input-field" type="text" id="Interest" size="10"
			   	placeholder="0" tooltipid="#InterestTT" />

			<p class="location-field">Sched C, line 17</p>
			<p class="label-field">Legal and Professional Services</p>
			<input class="trigger input-field" type="text" id="ProfessionalServices"
				size="10"
			   	placeholder="0" tooltipid="#ProfessionalServicesTT" />

			<p class="location-field">Sched C, line 18</p>
			<p class="label-field">Office Expenses</p>
			<input class="trigger input-field" type="text" id="OfficeExpenses" size="10"
			   	placeholder="0" tooltipid="#OfficeExpensesTT" />

			<p class="location-field">Sched C, line 19</p>
			<p class="label-field">Pension and Profit Sharing Plans</p>
			<input class="trigger input-field" type="text" id="PensionPlan" size="10"
			   	placeholder="0" tooltipid="#PensionPlanTT" />

			<p class="location-field">Sched C, line 20</p>
			<p class="label-field">Rent or Lease</p>
			<input class="trigger input-field" type="text" id="Rent" size="10"
			   	placeholder="0" tooltipid="#RentTT" />

			<p class="location-field">Sched C, line 21</p>
			<p class="label-field">Repairs and Maintenance</p>
			<input class="trigger input-field" type="text" id="Repairs" size="10"
			   	placeholder="0" tooltipid="#RepairsTT" />

			<p class="location-field">Sched C, line 22</p>
			<p class="label-field">Supplies</p>
			<input class="trigger input-field" type="text" id="Supplies" size="10"
			   	placeholder="0" tooltipid="#SuppliesTT" />

			<p class="location-field">Sched C, line 23</p>
			<p class="label-field">Taxes and Licenses</p>
			<input class="trigger input-field" type="text" id="TaxesAndLicenses" size="10"
			   	placeholder="0" tooltipid="#TaxesAndLicensesTT" />

			<p class="location-field">Sched C, line 24</p>
			<p class="label-field">Travel and Meals</p>
			<input class="trigger input-field" type="text" id="Travel" size="10"
			   	placeholder="0" tooltipid="#TravelTT" />

			<p class="location-field">Sched C, line 25</p>
			<p class="label-field">Utilities</p>
			<input class="trigger input-field" type="text" id="Utilities" size="10"
			   	placeholder="0" tooltipid="#UtilitiesTT" />

			<p class="location-field">Sched C, line 26</p>
			<p class="label-field">Wages</p>
			<input class="trigger input-field" type="text" id="Wages" size="10"
			   	placeholder="0" tooltipid="#WagesTT" />

			<p class="location-field">Sched C, line 27</p>
			<p class="label-field">Other Expenses</p>
			<input class="trigger input-field" type="text" id="OtherExpenses" size="10"
			   	placeholder="0" tooltipid="#OtherExpensesTT" />

			<p class="location-field">Sched C, line 28</p>
			<p class="label-field">Total Expenses</p>
			<p class="trigger output-field" id="TotalExpenses"
				tooltipid="#TotalExpensesTT">0</p>
		</div>

		<!-- Display area for error messages. -->
		<div id="error-message-container">
			<p id="error-message-output"></p>
		</div>

		<!-- Display area for debugging information. -->
		<div id="debug-container">
			<h3>Debugging Output</h3>
			<pre id="debug-output"></pre>
		</div>

		<!-- Tooltips -->
		<?php include "SmallBusiness-HelpInput.html"; ?>

	</div>
</body>
</html>
