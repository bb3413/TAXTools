
import { Classes }		from "../Library/Modules/Classes.js";
import { Container }	from "../Library/Classes/Container.js";
import { HTML }			from "../Library/Modules/HTML.js";
import { TaxFormObj }	from "../Library/Modules/TaxFormObj.js";

let worksheet_container;
let input_taxforms_container;
let output_taxforms_container;
let asset_sales_container;

function addInputForm(formname) {
	let uid = Container.getUID(formname);
	let [ taxform_id, html ] = Classes.getInputHTML(formname, uid);
	input_taxforms_container.addEntry(taxform_id, html);
}

function addOutputForm(formname) {
	let form = TaxFormObj.createForm(formname);
	let uid = Container.getUID(form.formname);
	let [ taxform_id, html ] = form.getOutputHTML(uid);
	output_taxforms_container.addEntry(taxform_id, html);
	form.putInformation(uid);
}

function showHandler(event) {
	try {
		worksheet_container			= new Container("input-worksheets-container");
		input_taxforms_container	= new Container("input-taxforms-container");
		output_taxforms_container	= new Container("output-taxforms-container");
		asset_sales_container		= new Container("assetsales-container");

		for (const formname of Classes.listAllForms()) {
			console.log(`Showing ${formname}`);
			if (Classes.isInputForm(formname)) {
				addInputForm(formname);
			}

			if (Classes.isOutputForm(formname)) {
				addOutputForm(formname);
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
	showHandler();
});
