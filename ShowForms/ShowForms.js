
import { HTMLMgr }		from "../Library/Classes/HTMLMgr.js";
import { Classes }		from "../Library/Modules/Classes.js";
import { Ensure }		from "../Library/Modules/Ensure.js";
import { HTML }			from "../Library/Modules/HTML.js";

const INPUT_TAXFORMS_CONTAINER			= "input-taxforms-container";
const OUTPUT_TAXFORMS_CONTAINER			= "output-taxforms-container";

function addInputForm(formname) {
	const hm = HTMLMgr.getMgr();

	try {
		hm.createAndAddBlock(formname + "_HTML", INPUT_TAXFORMS_CONTAINER, "beforeend");
	} catch {
		throw new Error(`Error loading input form: ${formname}`);
	}
}

function addOutputForm(formname) {
	const hm = HTMLMgr.getMgr();

	try {
		const html_block = hm.createBlock(formname + "_HTML");
		hm.addBlock(html_block, OUTPUT_TAXFORMS_CONTAINER, "beforeend");
	} catch {
		throw new Error(`Error loading output form: ${formname}`);
	}
}

function showHandler(event) {
	try {
		for (const formname of Classes.listAllForms()) {
			// console.log(`Showing ${formname}`);
			if (Classes.isInputForm(formname)) {
				addInputForm(formname);
			}

			if (Classes.isOutputForm(formname)) {
				addOutputForm(formname);
			}
		}
	} catch (error) {
		Ensure.processError(error);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	showHandler();
});
