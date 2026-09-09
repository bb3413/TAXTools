<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<link rel="stylesheet" href="../Library/CSS/TAXTools.css" />
	<link rel="stylesheet" href="../Library/CSS/Tooltips.css" />
	<link rel="stylesheet" href="../Library/CSS/HTML.css" />
	<link rel="stylesheet" href="../Library/CSS/TaxForms.css" />
	<link rel="stylesheet" href="../Library/CSS/F1099.css" />

	<script type="module" src="../Library/TAXTools/TAXTools.js"></script>
	<script type="module" src="../Library/TAXTools/Tooltips.js"></script>
	<script type="module" src="../Version/Version.js"></script>

	<script type="module" src="ShowForms.js"></script>
	<title>Show Tax Forms</title>
</head>

<body>
	<div class="tool-container" id="tool-container">
		<p class="version-number">Version: <a href="../Version/Version.html">
			<span id="tax-tools-version"></span></a></p>

		<h1 class="title" id="title">Show Tax Forms</h1>
		<p>This tools shows the tax forms that are currently implemented in the tax
		tools.</p>

		<h2>Input Tax Forms</h2>
		<!-- Display area for input tax forms. -->
		<div id="input-taxforms-container">
			<?php include "../Library/InputSheets/Taxpayer.html"; ?>
		</div>

		<h2>Output Tax Forms</h2>
		<!-- Display area for output tax forms. -->
		<div id="output-taxforms-container">
		</div>

		<!-- Display area for error messages. -->
		<div id="error-message-container">
			<p id="error-message-output"></p>
		</div>
	</div>
</body>
</html>
