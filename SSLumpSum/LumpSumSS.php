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

	<link rel="stylesheet" href="LumpSumSS.css" />
	<script type="module" src="LumpSumSS.js"></script>
	<title>Social Security Lump Sum Calculator</title>
</head>

<body>
	<div class="tool-container">
		<p class="version-number">Version: <a href="../Version/Version.html">
			<span id="tax-tools-version"></span></a></p>

		<h1 class="title">Social Security Lump Sum Calculator</h1>

		<p>This tool calculates the amount of Social Security that is taxable when the
		taxpayer receives a lump sum (retroactive) payment. There are two methods for
		calculating the taxable amount of a lump sum payment. The payment can either be left
		as part of the Social Security payments for the current year, or if the payment is
		for benefits in a previous year, you may be able to reduce the taxable amount by
		determining how much of the payment would have been taxable if you had received it in
		the year it was intended.</p>

		<p>Click <a href="LumpSumSS-Help.html">this link</a> for more help with this
		tool.</p>

		<div class="calculations">
			<h2>Social Security Current Year</h2>
			<div class="table-3x">
				<p class="description-field-right">Filing Status</p>
				<select class="trigger input-field" id="FilingStatus-0"
					tooltipid="#FilingStatus-0-TT">
					<option value="Single">Single</option>
					<option value="HoH">HoH</option>
					<option value="MFJ">MFJ</option>
					<option value="QSS">QSS</option>
					<option value="MFS">MFS</option>
				</select>
				<p>&nbsp;</p>

				<p>Social Security</p>
				<input class="trigger input-field" type="text" autofocus
					id="SocialSecurity-0"
					placeholder="0" tooltipid="#SocialSecurity-0-TT"
					size="10" />
				<p>&nbsp;</p>

				<p class="description-field">Income</p>
				<input class="trigger input-field" type="text"
					id="Income-0"
					placeholder="0" tooltipid="#Income-0-TT"
					size="10" />
				<p>&nbsp;</p>

				<p>Tax-Exempt Interest</p>
				<input class="trigger input-field" type="text"
					id="TaxExemptInterest-0"
					placeholder="0" tooltipid="#TaxExemptInterest-0-TT"
					ize="10" />
				<p>&nbsp;</p>

				<p>Adjustments</p>
				<input class="trigger input-field" type="text"
					id="Adjustments-0"
					placeholder="0" tooltipid="#Adjustments-0-TT"
					size="10" />
				<p>&nbsp;</p>

				<p>Taxable Social Security (if taxed in current year)</p>
				<p class="trigger output-field" id="TaxableSocialSecurity-0"
					tooltipid="#TaxableSocialSecurity-0-TT">0</p>
				<p class="trigger output-field percent-field" id="TaxablePercent-0"
					tooltipid="#TaxablePercent-0-TT">0%</p>

				<p>Alternate Calculation Method (if taxed in year owed)</p>
				<p class="trigger output-field" id="TaxableSocialSecurityAlt"
					tooltipid="#TaxableSocialSecurityAlt-TT">0</p>
				<p class="trigger output-field percent-field" id="TaxablePercentAlt"
					tooltipid="#TaxablePercentAlt-TT">0%</p>
			</div>

			<h2>Lump Sum Payment #1</h2>
			<div class="table-3x">
				<p class="description-field-right">Filing Status from Previous Year</p>
				<select class="trigger input-field" id="FilingStatus-1"
					tooltipid="#FilingStatus-1-TT">
					<option value="Single">Single</option>
					<option value="HoH">HoH</option>
					<option value="MFJ">MFJ</option>
					<option value="QSS">QSS</option>
					<option value="MFS">MFS</option>
				</select>
				<p>&nbsp;</p>

				<p>Lump Sum Payment Amount (SSA-1099, box 3)</p>
				<input class="trigger input-field" type="text"
					id="LumpSum-1"
					placeholder="0" tooltipid="#LumpSum-1-TT"
					size="10" />
				<p>&nbsp;</p>

				<p>AGI from Previous Year (1040, line 11)</p>
				<input class="trigger input-field" type="text"
					id="AGI-1"
					placeholder="0" tooltipid="#AGI-1-TT"
					size="10" />
				<p>&nbsp;</p>

				<p>Tax-Exempt Interest from Previous Year (1040, line 2a)</p>
				<input class="trigger input-field" type="text"
					id="TaxExemptInterest-1"
					placeholder="0" tooltipid="#TaxExemptInterest-1-TT"
					size="10" />
				<p>&nbsp;</p>

				<p>Total Social Security from Previous Year (1040, line 6a)</p>
				<input class="trigger input-field" type="text"
					id="SocialSecurityReceivedReported-1"
			 		placeholder="0" tooltipid="#SocialSecurityReceivedReported-1-TT"
					size="10" />
				<p>&nbsp;</p>

				<p>Taxable Social Security from Previous Year (1040, line 6b)</p>
				<input class="trigger input-field" type="text"
					id="SocialSecurityTaxableReported-1"
					placeholder="0" tooltipid="#SocialSecurityTaxableReported-1-TT"
					size="10" />
				<p>&nbsp;</p>

				<p>Taxable Social Security</p>
				<p class="trigger output-field" id="TaxableSocialSecurityNew-1"
					tooltipid="#TaxableSocialSecurityNew-1-TT">0</p>
				<p class="trigger output-field percent-field" id="TaxablePercent-1"
					tooltipid="#TaxablePercent-1-TT">0%</p>
			</div>

			<h2>Lump Sum Payment #2</h2>
			<div class="table-3x">
				<p class="description-field-right">Filing Status from Previous Year</p>
				<select class="trigger input-field" id="FilingStatus-2"
					tooltipid="#FilingStatus-1-TT">
					<option value="Single">Single</option>
					<option value="HoH">HoH</option>
					<option value="MFJ">MFJ</option>
					<option value="QSS">QSS</option>
					<option value="MFS">MFS</option>
				</select>
				<p>&nbsp;</p>

				<p>Lump Sum Payment Amount (SSA-1099, box 3)</p>
				<input class="trigger input-field" type="text"
					id="LumpSum-2"
					placeholder="0" tooltipid="#LumpSum-1-TT"
					size="10" />
				<p>&nbsp;</p>

				<p>AGI from Previous Year (1040, line 11)</p>
				<input class="trigger input-field" type="text"
					id="AGI-2"
					placeholder="0" tooltipid="#AGI-1-TT"
					size="10" />
				<p>&nbsp;</p>

				<p>Tax-Exempt Interest from Previous Year (1040, line 2a)</p>
				<input class="trigger input-field" type="text"
					id="TaxExemptInterest-2"
					placeholder="0" tooltipid="#TaxExemptInterest-1-TT"
					size="10" />
				<p>&nbsp;</p>

				<p>Total Social Security from Previous Year (1040, line 6a)</p>
				<input class="trigger input-field" type="text"
					id="SocialSecurityReceivedReported-2"
					placeholder="0" tooltipid="#SocialSecurityReceivedReported-1-TT"
					size="10" />
				<p>&nbsp;</p>

				<p> Taxable Social Security from Previous Year (1040, line 6b)</p>
				<input class="trigger input-field" type="text"
					id="SocialSecurityTaxableReported-2"
					placeholder="0" tooltipid="#SocialSecurityTaxableReported-1-TT"
					size="10" />
				<p>&nbsp;</p>

				<p>Taxable Social Security</p>
				<p class="trigger output-field" id="TaxableSocialSecurityNew-2"
					tooltipid="#TaxableSocialSecurityNew-1-TT">0</p>
				<p class="trigger output-field percent-field" id="TaxablePercent-2"
					tooltipid="#TaxablePercent-1-TT">0%</p>
			</div>
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
		<?php include "LumpSumSS-HelpInput.html"; ?>

	</div>
</body>
</html>
