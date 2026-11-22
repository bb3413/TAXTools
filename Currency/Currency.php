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

	<link rel="stylesheet" href="Currency.css" />
	<script type="module" src="Currency.js"></script>
	<title>Currency Exchange Calculator</title>
</head>

<body>
	<div class="taxtool-container" id="taxtool-container">
		<p class="version-number">Version: <a href="../Version/Version.html">
			<span id="tax-tools-version"></span></a></p>

		<h1 class="title" id="title">Currency Exchange Calculator Calculator</h1>

		<p>The Currency Exchange Calculator will translate monetary values between various
		foreign currencies and U.S. dollars. Enter an amount in any of the monetary fields
		below and the other three will be calculated. The
		<a href="https://www.irs.gov/individuals/international-taxpayers/yearly-average-currency-exchange-rates">
		IRS&apos;s yearly average currency exchange rates</a> are used for the
		calculation.</p>

		<h3>Formula</h3>
		<div class="formula">
			<div>
				U.S. Dollars
			</div>
			<div>
				= Foreign Currency / Exchange Rate
			</div>
			<div>
				Foreign Currency
			</div>
			<div>
				= U.S. Dollars * Exchange Rate
			</div>
		</div>

		<p>&nbsp;</p>
		<div class="table">
			<p>Tax Year</p>
			<select class="button right" id="tax-year" >
				<option value="2026">2026</option>
				<option value="2025">2025</option>
				<option value="2024">2024</option>
			</select>

			<p>&nbsp;</p>
			<p>&nbsp;</p>
		   	<p>U.S. Dollars</p>
			<input class="input-field" type="text" autofocus id="us-dollars"
				placeholder="0" />
			<p>Canada Dollars</p>
			<input class="input-field" type="text" autofocus id="canada-dollars"
				placeholder="0" />
			<p>Euros</p>
			<input class="input-field" type="text" autofocus id="euros"
				placeholder="0" />
			<p>UK Pounds</p>
			<input class="input-field" type="text" autofocus id="uk-pounds"
				placeholder="0" />
		</div>
	</div>
</body>
</html>
