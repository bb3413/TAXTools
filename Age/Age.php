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

	<link rel="stylesheet" href="Age.css" />
	<script type="module" src="Age.js"></script>
	<title>Age Calculator</title>
</head>

<body>
	<div class="taxtool-container">
		<p class="version-number">Version: <a href="../Version/Version.html">
			<span id="tax-tools-version"></span></a></p>

		<h1 class="title">Age Calculator</h1>

		<p>This tool is primarily intended to calculate a person's age, but is can be used
		to determine the number of years between any two dates. Or, you can enter one of the
		dates and the age and the tool will determine the other date. Basically, you can
		enter any two fields, and the tool will determine the other one.</p>

		<p>&nbsp;</p>
		<div class="table">
	   		<p>Start Date</p>
			<input type="text" autofocus id="Start" placeholder="mm/dd/yyyy" size="12" />

			<p>End Date</p>
			<input type="text" id="End" placeholder="mm/dd/yyyy" size="12" />

			<p>Age</p>
			<input type="text" id="Age" size="12" />
		</div>

		<!-- Display area for error messages. -->
		<div id="error-message-container">
			<p id="error-message-output"></p>
		</div>
	</div>
</body>
</html>
