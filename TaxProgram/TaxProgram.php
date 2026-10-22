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
	<link rel="stylesheet" href="TaxProgram.css" />

	<script type="module" src="../Library/TAXTools/TAXTools.js"></script>
	<script type="module" src="../Library/TAXTools/Tooltips.js"></script>
	<script type="module" src="../Version/Version.js"></script>
	
	<script type="module" src="SaveRestore.js"></script>
	<script type="module" src="TaxProgram.js"></script>
	<title>Tax Return Calculator</title>
</head>

<body>
	<div class="taxtool-container" id="taxtool-container">
		<div class="border title-container">
			<p class="trigger version-number" tooltipid="#tax-tools-version-tt">
				Version: <a href="../Version/Version.html">
					<span id="tax-tools-version"></span></a></p>

			<h1 class="title" id="title">Tax Return Calculator</h1>
			<h2 class="subtitle">for the Tax Year
				<select id="tax-year" class="trigger button tax-year"
						tooltipid="#tax-year-tt">
					<option value="2026">2026</option>
					<option value="2025">2025</option>
					<option value="2024">2024</option>
				</select>
			</h2>

			<p>This is a simple income tax calculation tool. It is vastly incomplete and only
			capable of processing the most common tax situations. It is only intended for tax
			planning and analysis, not for filing your taxes.</p>

			<p>Tax information is entered on a variety of worksheets and tax forms at the
			bottom of this page. You can click on the heading of any worksheet or tax form to
			alternately expand or collapse that form. After your tax information has been
			entered, press the Calculate button to create a simulated tax return. Click
			<a href="TaxProgram-Help.html">this link</a> for more help with this tool.</p>
		</div>	<!-- title-container -->

		<div class="border taxpayer-container">
			<div class="save-restore-container">
				<!-- Save Button -->
				<input type="button" id="save-button" class="trigger button save-button"
					value="Save" tooltipid="#save-button-tt" />

				<!-- Restore Button -->
				<input type="file" id="input-file" accept=".txt" style="display: none;" />
				<label for="input-file" class="trigger button restore-button"
					tooltipid="#restore-button-tt">Restore</label>
			</div>

			<div class="taxpayer-info-150-100">
				<p>Filing Status</p>
				<select class="trigger input-color left pointer" id="filing-status"
						tooltipid="#filing-status-tt">
					<option value="SINGLE">Single</option>
					<option value="HOH">HoH</option>
					<option value="MFJ">MFJ</option>
					<option value="QSS">QSS</option>
					<option value="MFS">MFS</option>
				</select>
			</div>
			<div class="taxpayer-info-150-400">
				<p>Taxpayer&apos;s Name</p>
				<input class="trigger input-field left" type="text" autofocus
					spellcheck="false" size="45" id="taxpayers-name"
					tooltipid="#taxpayers-name-tt" />
			</div>
			<div class="taxpayer-info-150-400">
				<p>Street Address</p>
				<input class="trigger input-field left" type="text" id="street-address"
					tooltipid="#street-address-tt" />
			</div>
			<div class="taxpayer-info-150-400">
				<p>City</p>
				<input class="trigger input-field left" type="text" id="city"
					tooltipid="#street-address-tt" />
			</div>
			<div class="taxpayer-info-150-400">
				<p>State</p>
				<input class="trigger input-field left" type="text" id="state"
					placeholder="California" readonly
					tooltipid="#street-address-tt" />
			</div>
			<div class="taxpayer-info-150-100">
				<p>Zip Code</p>
				<input class="trigger input-field left" type="text" id="zip-code"
					tooltipid="#street-address-tt"  />
			</div>
			<div class="taxpayer-info-150-100">
				<p>Taxpayer&apos;s Birthday</p>
				<input class="trigger input-field left" type="text"
					id="taxpayers-birthday" size="36"
					placeholder="mm/dd/yyyy"
					tooltipid="#taxpayers-birthday-tt" />
			</div>
			<div class="taxpayer-info-150-100">
				<p>Taxpayer Is Blind</p>
				<input class="trigger checkbox" type="checkbox" id="is-taxpayer-blind"
					tooltipid="#is-taxpayer-blind-tt" />
			</div>
			<div class="taxpayer-info-150-400">
				<p>Has SSN</p>
				<div class="trigger" tooltipid="#taxpayer-has-ssn-tt">
					<label class="radio-button">
						<input type="radio" name="taxpayer-has-ssn"
							id="taxpayer-has-ssn" checked />
						SSN
					</label>
					<label class="radio-button">
						<input type="radio" name="taxpayer-has-ssn"
							id="taxpayer-has-itin" />
						ITIN
					</label>
				</div>
			</div>

			<!----------  Spouse  ---------------------------------------------------------->
			<div class="border spouse-container">
				<div id="spouse-container">
					<div class="taxpayer-info-150-100">
						<p>Spouse&apos;s Birthday</p>
						<input class="trigger input-field left" type="text"
							id="spouses-birthday" size="36"
							placeholder="mm/dd/yyyy"
							tooltipid="#taxpayers-birthday-tt" />
					</div>
					<div class="taxpayer-info-150-100">
						<p>Months Lived Together</p>
						<input class="trigger input-field left" type="text"
							id="lived-with-spouse"
							placeholder="12"
							tooltipid="#lived-with-spouse-tt" />
					</div>
					<div class="taxpayer-info-150-100">
						<p>Spouse Is Blind</p>
						<input class="trigger checkbox" type="checkbox" id="is-spouse-blind"
							tooltipid="#is-taxpayer-blind-tt" />
					</div>

					<div class="taxpayer-info-150-400">
						<p>Has SSN</p>
						<div class="trigger" tooltipid="#spouse-has-ssn-tt">
							<label class="radio-button">
								<input type="radio" name="spouse-has-ssn"
									id="spouse-has-ssn" checked />
								SSN
							</label>
							<label class="radio-button">
								<input type="radio" name="spouse-has-ssn"
									id="spouse-has-itin" />
								ITIN
							</label>
						</div>
					</div>

				</div>
			</div>	<!-- spouse-container -->

			<!----------  Dependents  ------------------------------------------------------>
			<div class="border dependent-container">
				<input type="button" class="trigger button dependent-button"
					id="dependent-button" value="Add Dependent"
					tooltipid="#dependent-button-tt" />
			</div>	<!-- dependent-container -->
		</div>	<!-- taxpayer-container -->

		<!----------  Input Container  ----------------------------------------------------->
		<div class="border input-container">
			<div class="input-header">
				<h2>Enter Tax Information Here</h2>
				<select class="trigger button input-form-button" id="input-form-button"
						tooltipid="#input-form-button-tt">
					<option value="None" hidden disabled selected>Add Tax Form</option>
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
					<option value="F1098E">		1098-E</option>
					<option value="F1098VLI">	1098-VLI</option>
					<option value="Business">	Small Business</option>
				</select>
			</div>

			<!-- Display area for expenses -->
			<div id="expenses-container">
			</div>

			<!-- Display area for income -->
			<div id="income-container">
			</div>

			<!-- Display area for asset/stock sales -->
			<details class="taxform-details" id="sales-container">
				<summary class="trigger taxform-summary" tooltipid="#sales-summary-tt">
					Sale of Stocks/Assets</summary>
				<div>
					<input class="trigger button add-assetsale-button" type="button"
						id="add-assetsale-button" value="Add Entry"
							tooltipid="#add-assetsale-button-tt" />
				</div>
				<div class="assetsales-container assetsales-header">
					<p class="center-text">Long Term</p>
					<p></p>
					<p></p>
					<p></p>
					<p></p>
				</div>
				<div class="assetsales-container assetsales-header">
					<p class="center-text">Transaction</p>
					<p>Name</p>
					<p>Proceeds</p>
					<p>Cost Basis</p>
					<p>Wash Sale</p>
				</div>
				<!-- Display area for individual sales. -->
				<div id="assetsales-container">
				</div>
				<div>&nbsp;</div>
			</details>

			<!-- Display area for input forms -->
			<div id="input-taxforms-container">
			</div>
		</div>	<!-- input-container -->

		<!----------  Output Container  ---------------------------------------------------->
		<div class="border output-container">
			<!-- Calculate Button -->
			<div class="calculate-button-container">
				<input type="button" class="trigger button calculate-button"
					id="calculate-button" value="Calculate Tax Return"
					tooltipid="#calculate-button-tt" />
			</div>

			<!-- Tax Return -->
			<div id="output-taxforms-container">
				<h2>Tax Return</h2>
			</div>
		</div>	<!-- output-container -->

		<!----------  Error Messages, Debugging, and Tooltips  ----------------------------->
		<div class="border error-message-container" id="error-message-container">
			<pre id="error-message-output"></pre>
		</div>	<!-- error-message-container -->

		<div class="border debug-container" id="debug-container">
			<h3>Debugging Output</h3>
			<pre id="debug-output"></pre>
		</div>	<!-- debug-container -->

		<?php include "TaxProgram-HelpInput.html"; ?>
	</div>
</body>
</html>
