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

	<link rel="stylesheet" href="StateTaxRefund.css" />
	<script type="module" src="StateTaxRefund.js"></script>
	<title>State Income Tax Refund Calculator</title>
</head>

<body>
	<div class="tool-container">
		<p class="version-number">Version: <a href="../Version/Version.html">
			<span id="tax-tools-version"></span></a></p>

		<h1 class="title">State Income Tax Refund Calculator</h1>

		<p>A state income tax refund is only taxable to the extent that the taxpayer
		benefited from claiming the state income tax as a deduction on the previous year's
		tax return. This tool calculates the amount of the tax refund that is taxable on this
		year's federal tax return.</p>

		<p>The blue fields are computed from the information you provide. The green fields
		are where you enter information. Click <a href="StateTaxRefund-Help.html">this
		link</a> for more help with this tool.</p>

		<div class="table-1">
			<p>Previous Tax Year</p>
			<select class="trigger input-field" id="CurrentTaxYear"
				tooltipid="#CurrentTaxYearTT">
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
		<div class="table-1" id="SpouseContainer">
			<p>Spouse's Birthday</p>
			<input class="trigger input-field" type="text" id="SpousesBirthday"
				placeholder="mm/dd/yyyy" tooltipid="#SpousesBirthdayTT" />
			<p>Spouse Is Blind</p>
			<input class="trigger checkbox" type="checkbox" id="SpouseIsBlind"
				tooltipid="#SpouseIsBlindTT" />
		</div>
		<div class="table-1">
			<p>&nbsp;</p>
			<p>&nbsp;</p>
			<p>State Tax Refund</p>
			<input class="trigger input-field" type="text" id="StateTaxRefund"
				placeholder="0" tooltipid="#StateTaxRefundTT" />
		</div>

		<h2>Schedule A Information from Previous Year</h2>

		<div class="table-1">
			<p>State Income Tax</p>
			<input class="trigger input-field" type="text" id="StateIncomeTax"
				placeholder="0" tooltipid="#StateIncomeTaxTT" />
			<p>Sales Tax</p>
			<input class="trigger input-field" type="text" id="SalesTax"
				placeholder="0" tooltipid="#SalesTaxTT" />
			<p>Sales Was Tax Used</p>
			<input class="trigger checkbox" type="checkbox" id="SalesTaxUsed"
				tooltipid="#SalesTaxUsedTT" />
			<p>Real Estate Taxes</p>
			<input class="trigger input-field" type="text" id="RealEstateTaxes"
				placeholder="0" tooltipid="#RealEstateTaxesTT" />
			<p>Personal Property Taxes</p>
			<input class="trigger input-field" type="text" id="PersonalPropertyTaxes"
				placeholder="0" tooltipid="#PersonalPropertyTaxesTT" />
			<p>Total Itemized Deductions</p>
			<input class="trigger input-field" type="text" id="ItemizedDeductions"
				placeholder="0" tooltipid="#ItemizedDeductionsTT" />
		</div>

		<h2>Taxable Amount of the Refund</h2>
		<div class="table-1">
			<p>Taxable Amount</p>
			<p class="trigger output-field" id="TaxableAmount"
				tooltipid="#TaxableAmountTT">0</p>
		</div>
		<div class="table-2">
			<p>Explanation</p>
			<p class="trigger" id="Explanation"
				tooltipid="#ExplanationTT"></p>
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
		<?php include "StateTaxRefund-HelpInput.html"; ?>

	</div>
</body>
</html>
