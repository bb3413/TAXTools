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

	<link rel="stylesheet" href="CASalesTaxDeduction.css" />
	<script type="module" src="CASalesTaxDeduction.js"></script>
	<title>California Sales Tax Deduction Calculator</title>
</head>

<body>
	<div class="tool-container">
		<p class="version-number">Version: <a href="../Version/Version.html">
			<span id="tax-tools-version"></span></a></p>

		<h1 class="title">California Sales Tax Deduction Calculator</h1>

		<p>This tool calculates the amount of the sales tax deduction you are allowed. On
		Schedule A, Itemized Deductions, you have a choice of taking a deduction for the
		state and local taxes you paid (for example, state income tax withheld from wages)
		or an estimate of the total sales tax you paid throughout the year, whichever is
		greater.</p>

		<p>The amount of the sales tax deduction you are allowed is estimated based on the
		following four values.</p>
		<ul>
			<li>Where you live</li>
			<li>Amount of spendable income</li>
			<li>Number of people in your family</li>
			<li>Sales tax paid on large purchases</li>
		</ul>

		<p>Where you live determines the sales tax rate that you pay. Some states do not
		have any sales tax, while others have as much as 10%. In addition, many counties and
		cities add an additional amount to the sales tax. Note: this tool can only calculate
		the sales tax deduction for taxpayers living in California.</p>

		<p>Your spendable income is based on your total income, not just your taxable income.
		The more spendable income you have, the more you are likely to spend. Therefore, the
		IRS created a table with the allowable sales tax deduction based on spendable income
		and family size.</p>

		<p>Finally, the IRS table cannot take into account the sales tax you pay on large
		purchases that do not occur very often (for example, buying a car). If you make a
		large purchase, you can add the sales tax from that purchase into the calculation for
		the sales tax deduction.</p>

		<div class="table-1">
			<p class="span-three">&nbsp;</p>

			<p>Tax Year</p>
			<select class="trigger input-field left" id="tax-year" tooltipid="#tax-year-tt">
				<option value="2026">2026</option>
				<option value="2025">2025</option>
				<option value="2024">2024</option>
			</select>
			<p>&nbsp;</p>

	   		<p>Street Address</p>
			<input class="input-field left span-two" type="text" autofocus
				id="StreetAddress" />

			<p>City</p>
			<input class="input-field left span-two" type="text" id="City" />
			
			<p>State</p>
			<input class="input-field left" type="text" id="State"
				placeholder="California" readonly />
			<p>&nbsp;</p>

			<p>Zip Code</p>
			<input class="input-field left" type="text" id="ZipCode"  />
			<p>&nbsp;</p>

			<p>Family Size</p>
			<input class="trigger input-field" type="text" id="FamilySize"
				tooltipid="#FamilySizeTT" placeholder="1" />
			<p>&nbsp;</p>

			<p>Extra Sales Tax</p>
			<input class="trigger input-field" type="text" id="ExtraSalesTax"
				tooltipid="#ExtraSalesTaxTT" placeholder="0" />
			<p>&nbsp;</p>
		</div>

		<h2>Spendable Income</h2>
		<div class="table-2">
			<p>1040, line 1z</p>
			<p>Wages</p>
			<input class="trigger input-field" type="text" id="Wages"
				placeholder="0" size="10" tooltipid="#WagesTT" />

			<p>1040, line 2a</p>
			<p>Tax-exempt Interest</p>
			<input class="trigger input-field" type="text" id="TaxExemptInterest"
				placeholder="0" size="10" tooltipid="#TaxExemptInterestTT" />

			<p>1040, line 2b</p>
			<p>Taxable Interest</p>
			<input class="trigger input-field" type="text" id="TaxableInterest"
				placeholder="0" size="10" tooltipid="#TaxableInterestTT" />

			<p>1040, line 3a</p>
			<p>Qualified Dividends</p>
			<input class="trigger input-field" type="text" id="QualifiedDividends"
				placeholder="0" size="10" tooltipid="#QualifiedDividendsTT" />

			<p>1040, line 3b</p>
			<p>Ordinary Dividends</p>
			<input class="trigger input-field" type="text" id="OrdinaryDividends"
				placeholder="0" size="10" tooltipid="#OrdinaryDividendsTT" />

			<p>1040, line 4a, 5a</p>
			<p>Retirement Accounts (total amount received: 1099-R, box 1)</p>
			<input class="trigger input-field" type="text" id="RetirementAccounts"
				placeholder="0" size="10" tooltipid="#RetirementAccountsTT" />

			<p>1040, line 6a</p>
			<p>Social Security (total amount received: SSA-1099, box 5)</p>
			<input class="trigger input-field" type="text" id="SocialSecurity"
				placeholder="0" size="10" tooltipid="#SocialSecurityTT" />

			<p>1040, line 7a</p>
			<p>Capital Gains</p>
			<input class="trigger input-field" type="text" id="CapitalGains"
				placeholder="0" size="10" tooltipid="#CapitalGainsTT" />

			<p>1040, line 7</p>
			<p>Self-employment Income</p>
			<input class="trigger input-field" type="text" id="SelfEmploymentIncome"
				placeholder="0" size="10" tooltipid="#SelfEmploymentIncomeTT" />

			<p>1040, line 8</p>
			<p>Other Income</p>
			<input class="trigger input-field" type="text" id="OtherIncome"
				placeholder="0" size="10" tooltipid="#OtherIncomeTT" />

			<p>&nbsp;</p>
			<p>Total Spendable Income</p>
			<p class="trigger output-field" id="TotalSpendableIncome"
				tooltipid="#TotalSpendableIncomeTT">0</p>

			<p class="span-three">&nbsp;</p>
			<p>Sales Tax Deduction</p>
			<p>&nbsp;</p>
			<p class="trigger output-field" id="SalesTaxDeduction"
				tooltipid="#SalesTaxDeductionTT">0</p>
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
		<?php include "CASalesTaxDeduction-Debug.html"; ?>
	</div>
</body>
</html>
