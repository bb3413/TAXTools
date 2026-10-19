<!DOCTYPE html>
<html lang="en">
<head>
</head>

<body>
	<div class="taxtool-container" id="taxtool-container">
		<div class="title-container">
		</div>

		<div class="taxpayer-container">
			<div class="spouse-container">
			</div>
			<div class="dependent-container">
			</div>
		</div>
			
		<div class="input-container">
		</div>

		<div class="output-container">
		</div>

		<div class="error-message-container">
		</div>

		<div class="debug-container">
		</div>
		

		<!----------  Spouse  -------------------------------------------------------------->
		<div>&nbsp;</div>
		<div id="spouse-container">
		</div>

		<!----------  Dependents  ---------------------------------------------------------->
		<input type="button" class="trigger button add-dependent-button"
			id="add-dependent-button" value="Add Dependent"
			tooltipid="#add-dependent-button-tt" />
			
		<!-- Display area for dependents. -->
		<div id="dependents-container">
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
				<option value="F1098E">		1098-E</option>
				<option value="F1098VLI">	1098-VLI</option>
				<option value="Business">	Small Business</option>
			</select>
		</div>

		<!----------  Expenses  ------------------------------------------------------------>
		<!-- Display area for expenses. -->
		<div id="expenses-container">
		</div>

		<!----------  Income  -------------------------------------------------------------->
		<!-- Display area for income. -->
		<div id="income-container">
		</div>

		<!----------  Stock/Asset Sales  --------------------------------------------------->
		<details class="taxform-details" id="sales-container">
			<summary class="trigger taxform-summary" tooltipid="#sales-summary-tt">
				Sale of Stocks/Assets</summary>
			<div>
				<input class="trigger add-assetsale-button center-text" type="button"
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

		<!----------  Input Tax Forms  ----------------------------------------------------->
		<div id="input-taxforms-container">
		</div>

		<!----------  Calculate Button  ---------------------------------------------------->
		<p>&nbsp;</p>
		<div class="button-container">
			<input type="button" class="trigger button calculate-button"
				id="calculate-button" value="Calculate Tax Return"
				tooltipid="#calculate-button-tt" />
		</div>

		<!----------  Tax Return  ---------------------------------------------------------->
		<div id="output-taxforms-container">
			<h2>Tax Return</h2>
		</div>

		<!-- Display area for error messages. -->
		<div id="error-message-container">
			<pre id="error-message-output"></pre>
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
