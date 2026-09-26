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
		<h2 class="subtitle">for the Tax Year
			<select id="tax-year" class="trigger tax-year" tooltipid="#tax-year-tt">
				<option value="2026">2026</option>
				<option value="2025">2025</option>
				<option value="2024">2024</option>
			</select>
		</h2>

		<p>This is a simple income tax return calculation tool. It is a vastly incomplete
		tool and only capable of processing the most common tax situations. It is only
		intended for tax planning, not for filing your taxes.</p>

		<p>Tax information is entered on a variety of worksheets and tax forms at the bottom
		of this page. You can click on the heading of any worksheet or tax form to alternately
		expand or collapse that form. After your tax information has been entered, press the
		Calculate button to create a simulated tax return. Click
		<a href="TaxProgram-Help.html">this link</a> for more help with this tool.</p>

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
				id="taxpayers-name"
				tooltipid="#taxpayers-name-tt" />
		</div>
		<div class="taxpayer-info-long-line">
			<p>Street Address</p>
			<input class="trigger input-field left" type="text" id="street-address"
				tooltipid="#street-address-tt" />
		</div>
		<div class="taxpayer-info-long-line">
			<p>City</p>
			<input class="trigger input-field left" type="text" id="city"
				tooltipid="#city-tt" />
		</div>
		<div class="taxpayer-info-long-line">
			<p>State</p>
			<input class="trigger input-field left" type="text" id="state"
				placeholder="California" readonly
				tooltipid="#state-tt" />
		</div>
		<div class="taxpayer-info-short-line">
			<p>Zip Code</p>
			<input class="trigger input-field left" type="text" id="zip-code"
				tooltipid="#zip-code-tt"  />
		</div>
		<div class="taxpayer-info-short-line">
			<p>Taxpayer's Birthday</p>
			<input class="trigger input-field left" type="text"
				id="taxpayers-birthday" size="36"
				placeholder="mm/dd/yyyy"
				tooltipid="#taxpayers-birthday-tt" />
		</div>
		<div class="taxpayer-info-short-line">
			<p>Taxpayer Is Blind</p>
			<input class="trigger checkbox" type="checkbox" id="is-taxpayer-blind"
				tooltipid="#is-taxpayer-blind-tt" />
		</div>
		<div class="taxpayer-info-long-line">
			<p>Has SSN</p>
			<div>
				<input type="radio" name="taxpayer-has-ssn" id="taxpayer-has-ssn" checked
					class="trigger"
					tooltipid="#taxpayer-has-ssn-tt" />
				<label for="taxpayer-has-ssn">SSN</label>
				<input type="radio" name="taxpayer-has-ssn" id="taxpayer-has-itin"
					class="trigger"
					tooltipid="#taxpayer-has-itin-tt" />
				<label for="taxpayer-has-itin">ITIN</label>
			</div>
		</div>

		<!----------  Spouse  ---------------------------------------------------------------->
		<div>&nbsp;</div>
		<div id="spouse-container">
			<div class="taxpayer-info-short-line">
				<p>Spouse's Birthday</p>
				<input class="trigger input-field left" type="text"
					id="spouses-birthday" size="36"
					placeholder="mm/dd/yyyy"
					tooltipid="#spouses-birthday-tt" />
			</div>
			<div class="taxpayer-info-short-line">
				<p>Months Lived Together</p>
				<input class="trigger input-field left" type="text" id="lived-with-spouse"
					placeholder="12"
					tooltipid="#lived-with-spouse-tt" />
			</div>
			<div class="taxpayer-info-short-line">
				<p>Spouse Is Blind</p>
				<input class="trigger checkbox" type="checkbox" id="is-spouse-blind"
					tooltipid="#is-spouse-blind-tt" />
			</div>
			<div class="taxpayer-info-long-line">
				<p>Has SSN</p>
				<div>
					<input type="radio" name="spouse-has-ssn" id="spouse-has-ssn" checked
						class="trigger"
						tooltipid="#spouse-has-ssn-tt" />
					<label for="spouse-has-ssn">SSN</label>
					<input type="radio" name="spouse-has-ssn" id="spouse-has-itin"
						class="trigger"
						tooltipid="#spouse-has-itin-tt" />
					<label for="spouse-has-itin">ITIN</label>
				</div>
			</div>
		</div>

		<!----------  Dependents  ------------------------------------------------------------>
		<input type="button" class="trigger button add-dependent-button"
			id="add-dependent-button" value="Add Dependent"
			tooltipid="#add-dependent-button-tt" />
			
		<!-- Display area for dependents. -->
		<div id="dependents-container">
		</div>

		<div class="button-container">
			<!-- Calculate Button -->
			<input type="button" class="trigger button calculate-button"
				id="calculate-button" value="Calculate Tax Return"
				tooltipid="#calculate-button-tt" />
		</div>

		<div class="input-form-header">
			<h2>Enter Tax Information Here</h2>
			<select class="trigger selection-button" id="add-form-button"
					tooltipid="#add-form-button-tt">
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
				<option value="Business">	Small Business</option>
				<option value="F1098VLI">	1099-VLI</option>
			</select>
		</div>

		<!----------  Expenses  -------------------------------------------------------------->
		<details class="taxform-details" id="expenses-container">
			<summary class="taxform-summary">Expenses</summary>
			<div class="input-worksheet-container">
				<h3>Medical Insurance Premiums</h3>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Healthcare</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-healthcare"
						size="10" placeholder="0"
						tooltipid="#expenses-healthcare-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Dental, Vision</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-dental"
						size="10" placeholder="0"
						tooltipid="#expenses-dental-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Medicare</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-medicare"
						size="10" placeholder="0"
						tooltipid="#expenses-medicare-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">LTC Taxpayer</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-taxpayer-ltc"
						size="10" placeholder="0"
						tooltipid="#expenses-taxpayer-ltc-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">LTC Spouse</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-spouse-ltc"
						size="10" placeholder="0"
						tooltipid="#expenses-spouse-ltc-tt" />
				</div>

				<h3>Other Medical Expenses</h3>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Payments to Doctors,
						Dentists, etc.</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-doctor"
						size="10" placeholder="0"
						tooltipid="#expenses-doctor-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Prescriptions</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-prescriptions"
						size="10" placeholder="0"
						tooltipid="#expenses-prescriptions-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Medical Aids (glasses,
						hearing aids, etc.)</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-medical-aids"
						size="10" placeholder="0"
						tooltipid="#expenses-medical-aids-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Medical Facilities</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-medical-facilities"
						size="10" placeholder="0"
						tooltipid="#expenses-medical-facilities-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Nursing Services</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-nursing-services"
						size="10" placeholder="0"
						tooltipid="#expenses-nursing-services-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Medical Miles Driven</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-medical-miles"
						size="10" placeholder="0"
						tooltipid="#expenses-medical-miles-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Other Medical Expenses</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-other-medical"
						size="10" placeholder="0"
						tooltipid="#expenses-other-medical-tt" />
				</div>

				<h3>Taxes Paid</h3>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Estimated Payments - Federal</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-est-payments-federal"
						size="10" placeholder="0"
						tooltipid="#expenses-est-payments-federal-tt" />
				</div>

				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Estimated Payments - State</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-est-payments-state"
						size="10" placeholder="0"
						tooltipid="#expenses-est-payments-state-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Property Tax</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-property-tax"
						size="10" placeholder="0"
						tooltipid="#expenses-property-tax-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Personal Property Tax</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-personal-property-tax"
						size="10" placeholder="0"
						tooltipid="#expenses-personal-property-tax-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Extra Sales tax</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-extra-sales-tax"
						size="10" placeholder="0"
						tooltipid="#expenses-extra-sales-tax-tt" />
				</div>

				<h3>Charitable Donations</h3>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Cash Donations to Charity</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-cash-donations"
						size="10" placeholder="0"
						tooltipid="#expenses-cash-donations-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Non-cash Donations to
						Charity</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-noncash-donations"
						size="10" placeholder="0"
						tooltipid="#expenses-noncash-donations-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Miles Driven for Charity</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-charitable-miles"
						size="10" placeholder="0"
						tooltipid="#expenses-charitable-miles-tt" />
				</div>

				<h3>Other Expenses</h3>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Educator Expense - Taxpayer</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-educator-taxpayer"
						size="10" placeholder="0"
						tooltipid="#expenses-educator-taxpayer-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Educator Expense - Spouse</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-educator-spouse"
						size="10" placeholder="0"
						tooltipid="#expenses-educator-spouse-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Alimony Paid</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-alimony-paid"
						size="10" placeholder="0"
						tooltipid="#expenses-alimony-paid-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Divorce Date</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-divorce-date"
						size="10" placeholder="mm/dd/yyyy"
						tooltipid="#expenses-divorce-date-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Tax Preparation Fees</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-tax-preparation"
						size="10" placeholder="0"
						tooltipid="#expenses-tax-preparation-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Investment Expenses</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="expenses-investment-expenses"
						size="10" placeholder="0"
						tooltipid="#expenses-investment-expenses-tt" />
				</div>
				<p>&nbsp;</p>
			</div>
		</details>

		<!----------  Income  ---------------------------------------------------------------->
		<details class="taxform-details" id="income-container">
			<summary class="taxform-summary">Income Not on a Tax Form</summary>
			<div class="input-worksheet-container">
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Jury Duty</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="income-jury-duty"
						size="10" placeholder="0"
						tooltipid="#income-jury-duty-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Alimony Received</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="income-alimony-received"
						size="10" placeholder="0"
						tooltipid="#income-alimony-received-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Divorce Data</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="income-divorce-date"
						size="10" placeholder="mm/dd/yyyy"
						tooltipid="#income-divorce-date-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Gambling Winnings</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="income-gambling"
						size="10" placeholder="0"
						tooltipid="#income-gambling-tt" />
				</div>
				<div class="input-worksheet-row">
					<div class="input-worksheet-row-label">Other Income</div>
					<input class="trigger input-worksheet-row-value input-field"
						type="text" id="income-other"
						size="10" placeholder="0"
						tooltipid="#income-other-tt" />
				</div>
			</div>		<!-- input-worksheet-container -->
			<div>&nbsp;</div>
		</details>

		<!----------  Asset/Stock Sales  ----------------------------------------------------->
		<details class="taxform-details" id="assetsales-container">
			<summary class="taxform-summary">Asset/Stock Sales</summary>
			<div>
				<input class="trigger add-asset-sale-button center-text" type="button"
					id="add-asset-sale-button" value="Add More Entries"
						tooltipid="#add-asset-sale-button-tt" />
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
			<div id="assetsale-items-container">
			</div>
			<div>&nbsp;</div>
		</details>

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
