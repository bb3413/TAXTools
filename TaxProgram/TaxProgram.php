<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<link rel="stylesheet" href="../Library/CSS/TAXTools.css" />
	<link rel="stylesheet" href="../Library/CSS/Tooltips.css" />
	<link rel="stylesheet" href="../Library/CSS/HTML.css" />
	<link rel="stylesheet" href="../Library/CSS/TaxForms.css" />
	<link rel="stylesheet" href="../Library/CSS/F1099.css" />
	<link rel="stylesheet" href="../Library/CSS/InputWorksheets.css" />

	<script type="module" src="../Library/TAXTools/TAXTools.js"></script>
	<script type="module" src="../Library/TAXTools/Tooltips.js"></script>
	<script type="module" src="../Version/Version.js"></script>

	<link rel="stylesheet" href="TaxProgram.css" />
	<script type="module" src="TaxProgram.js"></script>
	<title>Tax Return Calculator</title>
</head>

<body>
	<div class="tool-container" id="tool-container">
		<p class="version-number">Version: <a href="../Version/Version.html">
			<span id="tax-tools-version"></span></a></p>

		<h1 class="title" id="title">Tax Return Calculator</h1>
		<h2 class="title">for the Tax Year
			<select id="tax-year" class="trigger" tooltipid="#tax-year-tt">
				<option value="2026">2026</option>
				<option value="2025">2025</option>
				<option value="2024">2024</option>
			</select>
		</h2>

		<p>&nbsp;</p>
		<p>This is a simple income tax return calculation tool. There are a number of forms
		that resemble the forms you receive to report your tax information.
		This is where you input your information. When you are finished entering
		your tax information, press the Calculate button and the tool will calculate
		your income tax and display the relevant tax forms. Click
		<a href="TaxProgram-Help.html"> this link</a> for more help with this tool.</p>

		<p>You can use the Save and Restore buttons to save the information you have entered
		and restore it again later.</p>

		<div class="button-container flex-right">
			<!-- Save Button -->
			<input type="button" id="save-button" class="trigger button save-button"
				value="Save" tooltipid="#save-button-tt" />

			<!-- Restore Button -->
			<input type="file" id="input-file" accept=".txt" style="display: none;" />
			<label for="input-file" class="trigger button restore-button"
				tooltipid="#restore-button-tt">Restore</label>
		</div>

		<div class="taxpayer-info-short-line">
			<p>Filing Status</p>
			<select class="trigger input-field left" id="filing-status"
					tooltipid="#filing-status-tt">
				<option value="SINGLE">Single</option>
				<option value="HOH">HoH</option>
				<option value="MFJ">MFJ</option>
				<option value="QSS">QSS</option>
				<option value="MFS">MFS</option>
			</select>
		</div>
		<div class="taxpayer-info-long-line">
			<p>Taxpayer's Name</p>
			<input class="trigger input-field left" type="text" autofocus
				spellcheck="false" size="45"
				id="taxpayers-name" tooltipid="#taxpayers-name-tt" />
		</div>
		<div class="taxpayer-info-long-line">
			<p>Street Address</p>
			<input class="input-field left" type="text" id="street-address" />
		</div>
		<div class="taxpayer-info-long-line">
			<p>City</p>
			<input class="input-field left" type="text" id="city" />
		</div>
		<div class="taxpayer-info-long-line">
			<p>State</p>
			<input class="input-field left" type="text" id="state"
				placeholder="California" readonly />
		</div>
		<div class="taxpayer-info-short-line">
			<p>Zip Code</p>
			<input class="input-field left" type="text" id="zip-code"  />
		</div>
		<div class="taxpayer-info-short-line">
			<p>Taxpayer's Birthday</p>
			<input class="trigger input-field left" type="text"
				id="taxpayers-birthday" size="36"
				placeholder="mm/dd/yyyy" tooltipid="#taxpayers-birthday-tt" />
		</div>
		<div class="taxpayer-info-short-line">
			<p>Taxpayer Is Blind</p>
			<input class="trigger checkbox" type="checkbox" id="is-taxpayer-blind"
				tooltipid="#is-taxpayer-blind-tt" />
		</div>
		<div class="taxpayer-info-long-line">
			<p>Has SSN</p>
			<div>
				<input type="radio" id="taxpayer-has-ssn" name="taxpayer-has-ssn" checked />
				<label for="taxpayer-has-ssn">SSN</label>
				<input type="radio" id="taxpayer-has-itin" name="taxpayer-has-ssn" />
				<label for="taxpayer-has-itin">ITIN</label>
			</div>
		</div>

		<!----------  Spouse  ---------->
		<div>&nbsp;</div>
		<div id="spouse-container">
			<div class="taxpayer-info-short-line">
				<p>Spouse's Birthday</p>
				<input class="trigger input-field left" type="text"
					id="spouses-birthday" size="36"
					placeholder="mm/dd/yyyy" tooltipid="#spouses-birthday-tt" />
			</div>
			<div class="taxpayer-info-short-line">
				<p>Months Lived Together</p>
				<input class="input-field left" type="text" id="lived-with-spouse"
					placeholder="12" />
			</div>
			<div class="taxpayer-info-short-line">
				<p>Spouse Is Blind</p>
				<input class="trigger checkbox" type="checkbox" id="is-spouse-blind"
					tooltipid="#is-spouse-blind-tt" />
			</div>
			<div class="taxpayer-info-long-line">
				<p>Has SSN</p>
				<div>
					<input type="radio" id="spouse-has-ssn" name="spouse-has-ssn" checked />
					<label for="spouse-has-ssn">SSN</label>
					<input type="radio" id="spouse-has-itin" name="spouse-has-ssn" />
					<label for="spouse-has-itin">ITIN</label>
				</div>
			</div>
		</div>

		<div>&nbsp;</div>
		<div>&nbsp;</div>
		<div class="button-container">
			<!-- Calculate Button -->
			<input type="button" id="calculate-button"
				class="trigger button calculate-button"
				value="Calculate Tax Return" tooltipid="#calculate-button-tt" />
		</div>

		<p>&nbsp;</p>
		<div class="input-form-header">
			<h2>Enter Tax Information</h2>
			<select id="add-form-button" class="trigger" tooltipid="#add-form-button-tt">
				<option value="" hidden disabled selected>Enter Tax Form</option>
				<option value="W2">			W-2</option>
				<option value="SSA1099">	SSA-1099</option>
				<option value="F1099C">		1099-C</option>
				<option value="F1099DIV">	1099-DIV</option>
				<option value="F1099G">		1099-G</option>
				<option value="F1099INT">	1099-INT</option>
				<option value="F1099K">		1099-K</option>
				<option value="F1099MISC">	1099-MISC</option>
				<option value="F1099NEC">	1099-NEC</option>
				<option value="F1099OID">	1099-OID</option>
				<option value="F1099R">		1099-R</option>
				<option value="F1099S">		1099-S</option>
			</select>

			<input type="button" id="dependent-button"
				class="trigger button dependent-button"
				value="Enter a Dependent" tooltipid="#dependent-button-tt" />
		</div>

		<!-- Display area for input tax forms. -->
		<div id="input-worksheets-container">
		</div>
		<div id="input-taxforms-container">
		</div>

		<p>&nbsp;</p>
		<!-- Display area for output tax forms. -->
		<div id="output-taxforms-container">
			<h2>Tax Return</h2>
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
		<?php include "TaxProgram-HelpInput.html"; ?>
	</div>
</body>
</html>
