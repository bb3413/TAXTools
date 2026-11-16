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

	<link rel="stylesheet" href="../Library/CSS/HelpFields.css" />
	<link rel="stylesheet" href="EIC.css" />
	<script type="module" src="EIC.js"></script>
	<title>Earned Income Credit Calculator</title>
</head>

<body>
	<div class="taxtool-container" id="taxtool-container">
		<p class="version-number">Version: <a href="../Version/Version.html">
			<span id="tax-tools-version"></span></a></p>

		<h1 class="title" id="title">Earned Income Credit Calculator</h1>

		<p>The earned income credit (EIC) is a tax credit for the working poor. It is
		based on the amount of earned income, number of dependents, and the filing status
		of the taxpayer. Generally, earned income includes employee compensation from
		working and net earnings from self-employment. It does not include interest,
		dividends, pension benefits, or profit from the sale of assets (e.g., stocks or
		home).</p>

		<p>The credit is calculated by multiplying the allowed amount of earned income by
		the EIC percentage. If the earned income is too high, the amount of the credit is
		reduced by a percentage of the amount over the phase out limit.</p>

		<pre class="formula-container">
    Earned Income Allowed     = MIN(Total Earned Income, Earned Income Limit)
    Maximum Credit            = Earned Income Allowed * EIC Percentage
    IF (Total Earned Income > Earned Income Allowed)
        Phaseout Amount       = Total Earned Income - Start of Phaseout
        EIC                   = Maximum Credit - (Phaseout Amount * Phaseout Percentage)
    ELSE
        EIC                   = Maximum Credit
		</pre>

		<h2>Taxpayer Qualifications</h2>
		<p></p>

		<h2>Dependent Qualifications</h2>
		<p></p>

		<div class="table">
			<p>Tax Year</p>
			<select class="button" id="tax-year" >
				<option value="2026">2026</option>
				<option value="2025">2025</option>
				<option value="2024">2024</option>
			</select>

			<p class="description-field-right">Filing Status</p>
			<select class="button" id="filing-status">
				<option value="SINGLE">Single</option>
				<option value="HOH">HoH</option>
				<option value="MFJ">MFJ</option>
				<option value="QSS">QSS</option>
				<option value="MFS">MFS</option>
			</select>
		
		   	<p>Earned Income</p>
			<input class="input-field" type="text" autofocus id="earned-income"
				placeholder="0" />

			<p>Number of Qualified Dependents</p>
			<input class="input-field" type="text" id="num-dependents"
				placeholder="0" />

			<p>&nbsp;</p>
			<p>&nbsp;</p>

			<p>EIC</p>
			<p class="output-field" id="eic">0</p>

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
