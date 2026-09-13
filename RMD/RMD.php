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
	<link rel="stylesheet" href="RMD.css" />
	<script type="module" src="RMD.js"></script>
	<title>Required Minimum Distribution Calculator</title>
</head>

<body>
	<div class="tool-container">
		<p class="version-number">Version: <a href="../Version/Version.html">
			<span id="tax-tools-version"></span></a></p>

		<h1 class="title">Required Minimum Distribution Calculator</h1>

		<p>You cannot keep retirement funds in retirement accounts indefinitely. In general,
		you have to start taking withdrawals from your Traditional IRA, SIMPLE IRA, SEP
		IRA, or retirement plan account when you reach age 73. The Required Minimum
		Distribution (RMD) is the minimum amount you must withdraw from your account each
		year, but you can withdraw more than the minimum required amount.</p>

		<p>The amount of the required minimum distribution is the account balance as of
		the end of the immediately preceding calendar year divided by a distribution period
		from the Uniform Lifetime Table (this is an IRS table that can be found in IRS
		Publication 590B, Distributions from Individual Retirement Arrangements).</p>

		<p>This tool calculates the Required Minimum Distribution (RMD) for the owner of
		retirement account. NOTE: If your spouse is more than 10 years younger than you and
		is the sole beneficiary of your retirement account, do not use this tool; there is a
		more beneficial calculation you can use that stretches out the distributions over a
		longer period of time.</p>

		<div class="table">
			<p>Tax Year</p>
			<input class="input-field" type="text" id="tax-year" value="0000" />

		   	<p>Retirement Account Balance</p>
			<input class="input-field" type="text" autofocus id="IRATotal"
				placeholder="0" />

			<p>Taxpayer's Birthday</p>
			<input class="input-field" type="text" id="TaxpayersBirthday"
				placeholder="mm/dd/yyyy" />

			<p>Taxpayer's Age</p>
			<input class="input-field" type="text" id="TaxpayersAge"
				placeholder="0" />

			<p>&nbsp;</p>
			<p>&nbsp;</p>

			<p>Required Minimum Distribution</p>
			<p class="output-field" id="RMD">0</p>
		</div>

		<h2>Description of Input Fields</h2>
		<div class="help-fields">
			<h4>Tax Year</h4>
			<p>This is the tax year that the RMD is taken. It defaults to the current tax
			year. This is only used to compute the age of the taxpayer at the end of the tax
			year.</p>

			<h4>Retirement Account Balance</h4>
			<p>This is the value of your retirement account on the last day of the previous
			tax year. Since you do not need to withdraw your RMD from each retirement account
			separately, you can enter the total value of all your retirement accounts to find
			your total RMD.</p>

			<h4>Taxpayer's Birthday</h4>
			<p>You can enter either the taxpayer's birthday here or you can enter the
			taxpayer's age in the following field. The birthday, if entered, is used to
			determine the taxpayer's age, which will be computed and automatically entered
			in the following field.</p>

			<h4>Taxpayer's Age</h4>
			<p>You can enter either the taxpayer's birthday in the previous field or you can
			enter the taxpayer's age here. If you enter the taxpayer's age, the taxpayer's
			birthday in the previous field will be erased.</p>

			<p>This is the age of the taxpayer at the end of the year the RMD is taken
			(i.e., the end of the tax year). The intent of the RMD is for the taxpayer to
			withdraw all the funds from the retirement account during the taxpayer's
			lifetime; therefore, the taxpayer's age is needed to determine the number of
			years over which the RMDs should be taken.</p>
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
