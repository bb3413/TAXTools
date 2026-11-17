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

		<p>The earned income credit (EIC) is a tax credit for low-income, working taxpayers.
		The amount of the credit is based on earned income, the number of dependents, and
		the filing status of the taxpayer. Generally, earned income consists if employee
		compensation from working and net earnings from self-employment. It does not include
		interest, dividends, pension benefits, or profit from the sale of assets (such as
		stocks).</p>

		<p>The credit is calculated by multiplying the allowed amount of earned income by
		the EIC percentage. If the earned income is too high, the amount of the credit is
		reduced by a percentage of the amount over the phase out limit.</p>

		<h2>Taxpayer Qualifications</h2>
		<ul>
			<li>You (and your spouse) have a valid Social Security number.</li>
			<li>You (and your spouse) are a U.S. citizen or resident alien all year.</li>
			<li>You are not filing Form 2555, Foreign Earned Income.</li>
			<li>You unearned income cannot be greater than
				<span id="unearned-income">the current limit</span>.</li>
			<li>You are not the qualifying child of another taxpayer.</li>
			<li>If you have no dependents, you must be at least 25 and under 65 years old.</li>
		</ul>

		<h2>Dependent Qualifications</h2>
		<ul>
			<li>Is a qualifying child of the taxpayer, except the support test is not required.</li>
			<li>Has a valid Social Security number.</li>
			<li>Is not claimed by another taxpayer as a dependent for EIC.</li>
		</ul>

		<h2>EIC Calculation</h2>
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
			<input class="input-field left" type="text" autofocus id="earned-income"
				placeholder="0" />

			<p>Number of Qualified Dependents</p>
			<input class="input-field left" type="text" id="num-dependents"
				placeholder="0" />

			<p>&nbsp;</p>
			<p>&nbsp;</p>

			<p>Earned Income Credit</p>
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
