
import { Classes }		from "../Library/Classes/Classes.js";
import { File }			from "../Library/Classes/File.js";
import { HTML }			from "../Library/Classes/HTML.js";
import { TaxFormObj }	from "../Library/Classes/TaxFormObj.js";

const header = `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<link rel="stylesheet" href=
		"https://www.bruceblinn.com/6-OtherStuff/Taxes/TAXToolsDev/Library/CSS/TAXTools.css" />
	<link rel="stylesheet" href=
		"https://www.bruceblinn.com/6-OtherStuff/Taxes/TAXToolsDev/Library/CSS/TaxForms.css" />
	<link rel="stylesheet" href=
		"https://www.bruceblinn.com/6-OtherStuff/Taxes/TAXToolsDev/Library/CSS/F1099.css" />
	<title>Save Tax Forms</title>
</head>

<body>
	<div class="tool-container" id="ToolContainer">
	<!---------------------------------------------------------------------------->
`;

const trailer = `
	<!---------------------------------------------------------------------------->
	</div>
</body>
</html>
`;

async function saveInputForm(formname) {
	let [ form_id, html ] = Classes.getInputHTML(formname, 1);
	let page = header + html.replace(/<details /g, "<details open ") + trailer;
	await File.saveToFile(page, `${formname}.html`, false);
}

async function saveOutputForm(formname) {
	let form = TaxFormObj.getOrCreateForm(formname);
	let [ form_id, html ] = form.getOutputHTML(1);
	let page = header + html.replace(/<details /g, "<details open ") + trailer;
	await File.saveToFile(page, `${formname}.html`, false);
}

async function saveHandler(event) {
	try {
		for (const formname of Classes.listAllForms()) {
			if (Classes.isInputForm(formname)) {
				await saveInputForm(formname);
			}

			if (Classes.isOutputForm(formname)) {
				await saveOutputForm(formname);
			}
		}
	} catch (error) {
		HTML.putElementValue("error-message-output", error);
		console.log("Stack trace:", error.stack);
		document.getElementById("error-message-output")
			.scrollIntoView({behavior: 'smooth', block: 'start'});
	}
}

document.addEventListener("DOMContentLoaded", () => {
	document.getElementById("save-button").addEventListener("click", saveHandler);
});
