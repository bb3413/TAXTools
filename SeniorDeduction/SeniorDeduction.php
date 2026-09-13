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

	<link rel="stylesheet" href="SeniorDeduction.css" />
	<script type="module" src="SeniorDeduction.js"></script>
	<title>Enhanced Deduction for Seniors Calculator</title>
</head>

<body>
	<div class="tool-container">
		<p class="version-number">Version: <a href="../Version/Version.html">
			<span id="tax-tools-version"></span></a></p>

		<h1 class="title">Enhanced Deduction for Seniors Calculator</h1>

		<p>This tool calculates the Enhanced Deduction for Seniors. Seniors aged 65 and
		older can claim a deduction of up to $6,000 if they are single or $12,000 if they
		are married filing jointly. This deduction begins to phase out when AGI is over
		$75,000 for single taxpayers and $150,000 if married. This deduction is in addition
		to the existing standard deduction or itemized deductions.</p>

		<div class="table">
			<p>Tax Year</p>
			<input class="input-field" type="text" id="tax-year" value="0000" />

			<p class="label-field">Filing Status</p>
			<select class="trigger input-field" id="FilingStatus"
					tooltipid="#FilingStatusTT">
				<option value="Single">Single</option>
				<option value="HoH">HoH</option>
				<option value="MFJ">MFJ</option>
				<option value="QSS">QSS</option>
				<option value="MFS">MFS</option>
			</select>

		   	<p>Adjusted Gross Income (AGI)</p>
			<input class="input-field" type="text" autofocus id="AdjustedGrossIncome"
				placeholder="0" />

			<p>Taxpayer's Birthday</p>
			<input class="input-field" type="text" id="TaxpayersBirthday"
				placeholder="mm/dd/yyyy" />

			<p>Taxpayer's Age</p>
			<input class="input-field" type="text" id="TaxpayersAge"
				placeholder="0" />
		</div>

		<div  class="table" id="SpouseContainer">
		   	<p>Spouse's Birthday</p>
			<input class="input-field" type="text" id="SpousesBirthday"
				placeholder="mm/dd/yyyy" />

		   	<p>Spouse's Age</p>
		   	<input class="input-field" type="text" id="SpousesAge"
				placeholder="0" />
		</div>

		<div class="table">
			<p>&nbsp;</p>
			<p>&nbsp;</p>

			<p>Enhanced Deduction for Seniors</p>
			<p class="output-field" id="SeniorDeduction">0</p>
		</div>

		<p>&nbsp;</p>
		<h2>Description of Input Fields</h2>
		<div class="help-fields">
			<h4>Tax Year</h4>
			<p>This is the tax year for which the Enhanced Deduction for Seniors is
			calculated. This is not really necessary since the deduction is the same for
			every year that it is allowed.</p>

			<h4>Filing Status</h4>
			<p>This is your filing status. If the filing status is married filing jointly
			(MFJ), then
			the spouse, if over 65, will also be eligible for the senior deduction.</p>

			<h4>Adjusted Gross Income (AGI)</h4>
			<p>Adjusted gross income is taxable income minus adjustments. It is on the
			federal tax form 1040, line 11b.</p>

			<h4>Taxpayer's Birthday</h4>
			<p>You can enter either the taxpayer's birthday here or you can enter the
			taxpayer's age in the following field. The birthday, if entered, is used to
			determine the taxpayer's age, which will be computed and automatically entered
			in the following field.</p>

			<h4>Taxpayer's Age</h4>
			<p>This is the age of the taxpayer at the end of the tax year. You can enter
			either the taxpayer's birthday in the previous field or you can enter the
			taxpayer's age here. If you enter the taxpayer's age, the taxpayer's birthday in
			the previous field will be erased.</p>

			<h4>Spouse's Birthday</h4>
			<p>You can enter either the spouse's birthday here or you can enter the spouse's
			age in the following field. The birthday, if entered, is used to determine the
			spouse's age, which will be computed and automatically entered in the following
			field.</p>

			<p>This field is only shown if the filing status is MFJ (married filing
			jointly).</p>

			<h4>Spouse's Age</h4>
			<p>This is the age of the spouse at the end of the tax year. You can enter either
			the spouse's birthday in the previous field or you can enter the spouse's age
			here. If you enter the spouse's age, the spouse's birthday in the previous field
			will be erased.</p>

			<p>This field is only shown if the filing status is MFJ (married filing
			jointly).</p>
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
	</div>
</body>
</html>
