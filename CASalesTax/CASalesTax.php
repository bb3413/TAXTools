<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
	<link rel="stylesheet" href="../Library/CSS/TAXTools.css" />
	<link rel="stylesheet" href="../Library/CSS/Tooltips.css" />
	<link rel="stylesheet" href="../Library/CSS/HTML.css" />

	<script type="module" src="../Library/TAXTools/TAXTools.js"></script>
	<script type="module" src="../Library/TAXTools/Tooltips.js"></script>
	<script type="module" src="../Version/Version.js"></script>

	<link rel="stylesheet" href="CASalesTax.css" />
	<script type="module" src="CASalesTax.js"></script>
	<title>California Sales Tax Calculator</title>
</head>

<body>
	<div class="tool-container">
		<p class="version-number">Version: <a href="../Version/Version.html">
			<span id="tax-tools-version"></span></a></p>

		<h1 class="title">California Sales Tax Calculator</h1>

		<p>This tool will show the sales tax percentage for the address. You must enter
		a valid value in all three address fields.</p>

		<p>&nbsp;</p>
		<div class="table">
	   		<p class="input-label">Street Address</p>
			<input class="input-field left" type="text" autofocus id="StreetAddress" />

			<p class="input-label">City</p>
			<input class="input-field left" type="text" id="City" />

			<p class="input-label">State</p>
			<input class="input-field left" type="text" id="State"
				placeholder="California" readonly />

			<p class="input-label">Zip Code</p>
			<input class="input-field left" type="text" id="ZipCode"  />
		</div>

		<div class="button-container">
			<button class="button lookup-button" id="LookupButton">Lookup</button>
		</div>

		<div class="table">
			<p class="output-label">Sales Tax Rate</p>
			<p class="output-field left" id="SalesTaxRate"></p>
			<p>&nbsp;</p>
			<p>&nbsp;</p>
		</div>

		<!-- Display area for error messages. -->
		<div id="error-message-container">
			<p id="error-message-output"></p>
		</div>
	</div>
</body>
</html>
