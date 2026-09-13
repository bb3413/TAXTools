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

	<link rel="stylesheet" href="AMT.css" />
	<script type="module" src="AMT.js"></script>
	<title>Alternative Minimum Tax Calculator</title>
</head>

<body>
	<div class="tool-container">
		<p class="version-number">Version: <a href="../Version/Version.html">
			<span id="tax-tools-version"></span></a></p>

		<h1 class="title">Alternative Minimum Tax Calculator</h1>

		<p>The Alternative Minimum Tax (AMT) is a separate tax calculation that is intended
		to prevent high-income taxpayers from not paying their fair share of taxes through
		an excess use of deductions and credits. Taxpayers with an AGI greater than the AMT
		exemption are required to calculate their income tax using both the standard income
		tax calculation and the AMT calculation and pay the higher amount.</p>

		<p>The AMT is calculated by starting with the adjusted gross income (AGI) from form
		1040, line 11b, then adding back certain deductions and adding some additional
		income. This amount is the AMT Income. Then, an AMT Exemption amount is determined
		based on the AMT Income. The AMT Income minus the AMT Exemption is taxed at 26% or
		28%, which is the amount of the AMT.</p>

		<p>To calculate the AMT using this tool, enter information from the federal tax
		return in the green fields. The amount of the AMT, if any, will be in the blue field
		at the bottom. Click <a href="AMT-Help.html"> this link</a> for more help with this
		tool.</p>

		<h2>Taxpayer Information</h2>
		<div class="table-3">
			<p>Tax Year</p>
			<select class="trigger input-field" id="tax-year" tooltipid="#tax-year-tt">
				<option value="2026">2026</option>
				<option value="2025">2025</option>
				<option value="2024">2024</option>
			</select>

			<p>Filing Status</p>
			<select class="trigger input-field" id="FilingStatus"
					tooltipid="#FilingStatusTT">
				<option value="Single">Single</option>
				<option value="HoH">HoH</option>
				<option value="MFJ">MFJ</option>
				<option value="QSS">QSS</option>
				<option value="MFS">MFS</option>
			</select>

			<p>Taxpayer's Birthday</p>
			<input class="trigger input-field" type="text" autofocus id="TaxpayersBirthday"
				placeholder="mm/dd/yyyy" tooltipid="#TaxpayersBirthdayTT" />

			<p>Taxpayer Is Blind</p>
			<input class="trigger checkbox" type="checkbox" id="TaxpayerIsBlind"
				tooltipid="#TaxpayerIsBlindTT" />
		</div>
		<div class="table-3" id="SpouseContainer">
			<p>Spouse's Birthday</p>
			<input class="trigger input-field" type="text" id="SpousesBirthday"
				 placeholder="mm/dd/yyyy" tooltipid="#SpousesBirthdayTT" />

			<p>Spouse Is Blind</p>
			<input class="trigger checkbox" type="checkbox" id="SpouseIsBlind"
				tooltipid="#SpouseIsBlindTT" />
		</div>

		<h2>Tax Information</h2>
		<div class="table-1">
			<p>1040, line 11b</p>
			<p>Adjusted Gross Income (AGI)</p>
			<input class="trigger input-field" type="text" id="AGI"
				placeholder="0" tooltipid="#AGITT" />

			<p>1040, line 3a</p>
			<p>Qualified Dividends</p>
			<input class="trigger input-field" type="text" id="QualifiedDividends"
				placeholder="0" tooltipid="#QualifiedDividendsTT" />

			<p>1040, line 7a</p>
			<p>Capital Gains</p>
			<input class="trigger input-field" type="text" id="CapitalGains"
				placeholder="0" tooltipid="#CapitalGainsTT" />

			<p>1040, line 15</p>
			<p>Taxable Income</p>
			<input class="trigger input-field" type="text" id="TaxableIncome"
				placeholder="0" tooltipid="#TaxableIncomeTT" />

			<p>1040, line 16</p>
			<p>Income Tax</p>
			<input class="trigger input-field" type="text" id="IncomeTax"
				placeholder="0" tooltipid="#IncomeTaxTT" />

			<p class="span-three">&nbsp;</p>

			<p>1040 SA, line 17</p>
			<p>Itemized Deduction</p>
			<input class="trigger input-field" type="text" id="ItemizedDeduction"
				placeholder="0" tooltipid="#ItemizedDeductionTT" />

			<p>1040 SA, line 7</p>
			<p>Taxes Paid Deduction</p>
			<input class="trigger input-field" type="text" id="TaxesPaidDeduction"
				placeholder="0" tooltipid="#TaxesPaidDeductionTT" />

			<p>1040, line 13a</p>
			<p>QBI Deduction</p>
			<input class="trigger input-field" type="text" id="QBIDeduction"
				placeholder="0" tooltipid="#QBIDeductionTT" />
		</div>

		<h2>Additions to AMT Income</h2>
		<div class="table-2">
			<p>Tax Refunds (subtraction)</p>
			<input class="trigger input-field" type="text" id="StateTaxRefund"
				placeholder="0" tooltipid="#StateTaxRefundTT" />

			<p>Investment Interest Expense</p>
			<input class="trigger input-field" type="text" id="InvestmentInterestExpense"
				placeholder="0" tooltipid="#InvestmentInterestExpenseTT" />

			<p>Depletion</p>
			<input class="trigger input-field" type="text" id="Depletion"
				placeholder="0" tooltipid="#DepletionTT" />

			<p>Net Operating Loss</p>
			<input class="trigger input-field" type="text" id="NetOperatingLoss"
				placeholder="0" tooltipid="#NetOperatingLossTT" />

			<p>Alternate Net Operating Loss (subtraction)</p>
			<input class="trigger input-field" type="text" id="AlternateNetOperatingLoss"
				placeholder="0" tooltipid="#AlternateNetOperatingLossTT" />

			<p>Private Activity Bonds Interest</p>
			<input class="trigger input-field" type="text" id="PrivateActivityBondsInterest"
				placeholder="0" tooltipid="#PrivateActivityBondsInterestTT" />

			<p>Qualified Small Business Stock</p>
			<input class="trigger input-field" type="text" id="QualifiedSmallBusinessStock"
				placeholder="0" tooltipid="#QualifiedSmallBusinessStockTT" />

			<p>Incentive Stock Options</p>
			<input class="trigger input-field" type="text" id="IncentiveStockOptions"
				placeholder="0" tooltipid="#IncentiveStockOptionsTT" />

			<p>Estates and Trusts</p>
			<input class="trigger input-field" type="text" id="EstatesAndTrusts"
				placeholder="0" tooltipid="#EstatesAndTrustsTT" />

			<p>Disposition of Property</p>
			<input class="trigger input-field" type="text" id="DispositionOfProperty"
				placeholder="0" tooltipid="#DispositionOfPropertyTT" />

			<p>Post 1986 Depreciation</p>
			<input class="trigger input-field" type="text" id="Post1986Depreciation"
				placeholder="0" tooltipid="#Post1986DepreciationTT" />

			<p>Passive Activities</p>
			<input class="trigger input-field" type="text" id="PassiveActivities"
				placeholder="0" tooltipid="#PassiveActivitiesTT" />

			<p>Loss Limitations</p>
			<input class="trigger input-field" type="text" id="LossLimitations"
				placeholder="0" tooltipid="#LossLimitationsTT" />

			<p>Circulation Costs</p>
			<input class="trigger input-field" type="text" id="CirculationCosts"
				placeholder="0" tooltipid="#CirculationCostsTT" />

			<p>Long-term Contracts</p>
			<input class="trigger input-field" type="text" id="LongTermContracts"
				placeholder="0" tooltipid="#LongTermContractsTT" />

			<p>Mining Costs</p>
			<input class="trigger input-field" type="text" id="MiningCosts"
				placeholder="0" tooltipid="#MiningCostsTT" />

			<p>Research Costs</p>
			<input class="trigger input-field" type="text" id="ResearchCosts"
				placeholder="0" tooltipid="#ResearchCostsTT" />

			<p>Installment Sales (subtraction)</p>
			<input class="trigger input-field" type="text" id="InstallmentSales"
				placeholder="0" tooltipid="#InstallmentSalesTT" />

			<p>Intangible Drilling Costs</p>
			<input class="trigger input-field" type="text" id="IntangibleDrillingCosts"
				placeholder="0" tooltipid="#IntangibleDrillingCostsTT" />

			<p>Other Income</p>
			<input class="trigger input-field" type="text" id="OtherIncome"
				placeholder="0" tooltipid="#OtherIncomeTT" />
		</div>

		<h2>Alternative Minimum Tax</h2>
		<div class="table-2">
			<p>AMT Income</p>
			<p class="trigger output-field" id="AMTIncome"
				tooltipid="#AMTIncomeTT">0</p>

			<p>AMT Exemption</p>
			<p class="trigger output-field" id="AMTExemption"
				tooltipid="#AMTExemptionTT">0</p>

			<p>Alternative Minimum Tax (AMT)</p>
			<p class="trigger output-field" id="AMT"
				tooltipid="#AMTTT">0</p>
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
		<?php include "AMT-HelpInput.html"; ?>
	</div>
</body>
</html>
