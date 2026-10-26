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

	<link rel="stylesheet" href="TaxableSS.css" />
	<script type="module" src="TaxableSS.js"></script>
	<title>Taxable Social Security Calculator</title>
</head>

<body>
	<div class="taxtool-container" id="taxtool-container">
		<p class="version-number">Version: <a href="../Version/Version.html">
			<span id="tax-tools-version"></span></a></p>

		<h1 class="title" id="title">Taxable Social Security Calculator</h1>

		<p>This tool calculates the amount of Social Security that is taxable.
		Click <a href="TaxableSS-Help.html">this link</a> for more help with this tool.</p>

		<div class="table-3x">
			<p class="description-field-right">Filing Status</p>
			<select class="trigger input-field" id="FilingStatus"
					tooltipid="#FilingStatusTT">
				<option value="Single">Single</option>
				<option value="HoH">HoH</option>
				<option value="MFJ">MFJ</option>
				<option value="QSS">QSS</option>
				<option value="MFS">MFS</option>
			</select>
			<p>&nbsp;</p>
		</div>
		<div class="table-3x" id="LivedWithSpouseContainer">
			<p>Lived with Spouse</p>
			<input class="trigger checkbox" type="checkbox" id="LivedWithSpouse"
				tooltipid="#LivedWithSpouseTT" />
			<p>&nbsp;</p>
		</div>
		<div class="table-3x">
		   	<p>Social Security</p>
			<input class="trigger input-field" type="text" autofocus id="SocialSecurity"
				placeholder="0" tooltipid="#SocialSecurityTT" size="10" />
			<p>&nbsp;</p>

			<p>Income</p>
			<input class="trigger input-field" type="text" id="Income"
				placeholder="0" tooltipid="#IncomeTT" size="10" />
			<p>&nbsp;</p>

			<p>Tax-Exempt Interest</p>
			<input class="trigger input-field" type="text" id="TaxExemptInterest"
				placeholder="0" tooltipid="#TaxExemptInterestTT" size="10" />
			<p>&nbsp;</p>

			<p>Adjustments</p>
			<input class="trigger input-field" type="text" id="Adjustments"
				placeholder="0" tooltipid="#AdjustmentsTT" size="10" />
			<p>&nbsp;</p>

			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>

			<p>Taxable Social Security</p>
			<p class="trigger output-field" id="TaxableSocialSecurity"
				tooltipid="#TaxableSocialSecurityTT">0</p>
			<p class="trigger output-field percent-field" id="TaxablePercent"
				tooltipid="#TaxablePercentTT">0%</p>
		</div>

		<h3>Income Fields</h3>
		<p>Rather than entering taxable income in the Income field above, you can enter
		individual income values here. The sum of the fields entered here will replace the
		Income field above.</p>

		<div class="table-2x">
			<p class="description-field">Wages</p>
			<input class="trigger input-field" type="text" id="Wages"
				placeholder="0" tooltipid="#WagesTT" size="10" />

			<p class="description-field">Taxable Interest</p>
			<input class="trigger input-field" type="text" id="TaxableInterest"
				placeholder="0" tooltipid="#TaxableInterestTT" size="10" />

			<p class="description-field">Ordinary Dividends</p>
			<input class="trigger input-field" type="text" id="OrdinaryDividends"
				placeholder="0" tooltipid="#OrdinaryDividendsTT" size="10" />

			<p class="description-field">Retirement Accounts (taxable amount only)</p>
			<input class="trigger input-field" type="text" id="RetirementAccounts"
				placeholder="0" tooltipid="#RetirementAccountsTT" size="10" />

			<p class="description-field">Pensions, Annuities (taxable amount only)</p>
			<input class="trigger input-field" type="text" id="PensionsAndAnnuities"
				placeholder="0" tooltipid="#PensionsAndAnnuitiesTT" size="10" />

			<p class="description-field">Capital Gains</p>
			<input class="trigger input-field" type="text" id="CapitalGains"
				placeholder="0" tooltipid="#CapitalGainsTT" size="10" />

			<p class="description-field">Self-employment Income</p>
			<input class="trigger input-field" type="text" id="SelfEmploymentIncome"
			   	placeholder="0" tooltipid="#SelfEmploymentIncomeTT" size="10" />

			<p class="description-field">Other Income</p>
			<input class="trigger input-field" type="text" id="OtherIncome"
			   	placeholder="0" tooltipid="#OtherIncomeTT" size="10" />
		</div>

		<h3>Adjustments Fields</h3>
		<p>Rather than entering total adjustments in the Adjustments field above, you can
		enter individual adjustment values here. The sum of the fields entered here will
		replace the Adjustments field above.</p>

		<div class="table-2x">
			<p class="description-field">Educator Expenses</p>
			<input class="trigger input-field" type="text" id="EducatorExpenses"
			   	placeholder="0" tooltipid="#EducatorExpensesTT" size="10" />

			<p class="description-field">Health Savings Account Contributions</p>
			<input class="trigger input-field" type="text" id="HealthSavingsAccount"
			   	placeholder="0" tooltipid="#HealthSavingsAccountTT" size="10" />

			<p class="description-field">Self-Employment Tax Adjustment</p>
			<input class="trigger input-field" type="text" id="SelfEmploymentTaxAdjustment"
			   	placeholder="0" tooltipid="#SelfEmploymentTaxAdjustmentTT" size="10" />

			<p class="description-field">Self-Employed Health Insurance</p>
			<input class="trigger input-field" type="text" id="SelfEmployedHealthInsurance"
			   	placeholder="0" tooltipid="#SelfEmployedHealthInsuranceTT" size="10" />

			<p class="description-field">Early Withdrawal Penalty</p>
			<input class="trigger input-field" type="text" id="EarlyWithdrawalPenalty"
			   	placeholder="0" tooltipid="#EarlyWithdrawalPenaltyTT" size="10" />

			<p class="description-field">Alimony Paid</p>
			<input class="trigger input-field" type="text" id="AlimonyPaid"
			   	placeholder="0" tooltipid="#AlimonyPaidTT" size="10" />

			<p class="description-field">IRA Contributions</p>
			<input class="trigger input-field" type="text" id="IRAContributions"
			   	placeholder="0" tooltipid="#IRAContributionsTT" size="10" />

			<p class="description-field">Student Loan Interest</p>
			<input class="trigger input-field" type="text" id="StudentLoanInterest"
			   	placeholder="0" tooltipid="#StudentLoanInterestTT" size="10" />

			<p class="description-field">Other Adjustments</p>
			<input class="trigger input-field" type="text" id="OtherAdjustments"
			   	placeholder="0" tooltipid="#OtherAdjustmentsTT" size="10" />
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
		<?php include "TaxableSS-HelpInput.html"; ?>

	</div>
</body>
</html>
