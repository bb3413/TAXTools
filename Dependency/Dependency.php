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
	<style>
		.button-container {
			display:				flex;
			/* justify-content:		flex-end;	/* Align the div block to the right. */
			justify-content:		center;		/* Align the div block to the center. */
			align-items:			flex-end;	/* Align buttons on bottom edge. */
			gap:					5px;		/* Optional: adds space between buttons */
			margin-bottom:			3px;
		}
		.dependency-button {
			font-size:				18px;
			font-weight:			700;
			padding-top:			5px;
			padding-bottom:			5px;
			padding-left:			10px;
			padding-right:			10px;
			border-radius:			5px;
		}
	</style>
	<link rel="stylesheet" href="Dependency.css" />
	<script type="module" src="Dependency.js"></script>
	<title>Dependency Calculator</title>
</head>

<body>
	<div class="tool-container">
		<p class="version-number">Version: <a href="../Version/Version.html">
			<span id="tax-tools-version"></span></a></p>

		<div class="button-container">
			<input type="button" id="dependency-button" class="dependency-button"
				value="Calculate Dependencies" />
		</div>
		
		<!-- Display area for dependencies. -->
		<div id="output-message-container">
			<pre id="output-message"></pre>
		</div>
		
		<!-- Display area for error messages. -->
		<div id="error-message-container">
			<p id="error-message-output"></p>
		</div>
	</div>
</body>
</html>
