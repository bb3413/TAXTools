
// Classes
import { HTMLMgr }	from "../Library/Classes/HTMLMgr.js";

// Modules
import { Classes }		from "../Library/Modules/Classes.js";
import { File }			from "../Library/Modules/File.js";
import { HTML }			from "../Library/Modules/HTML.js";
import { Objects }		from "../Library/Modules/Objects.js";
import { TaxFormObj }	from "../Library/Modules/TaxFormObj.js";
import { Taxpayer }		from "../Library/Classes/Taxpayer.js";

// Input Worksheets
import { Assetitem }	from "../Library/InputWorksheets/Assetitem.js";
import { Business }		from "../Library/InputWorksheets/Business.js";
import { Dependent }	from "../Library/InputWorksheets/Dependent.js";
import { Expenses }		from "../Library/InputWorksheets/Expenses.js";
import { Income }		from "../Library/InputWorksheets/Income.js";

import {
	addInputForm,
	resetAll,
} from "./TaxProgram.js";

import { TAX_PROGRAM_SAVE_FILE }	from "../Library/TAXTools/TAXTools.js";
import { ERROR_MESSAGE_OUTPUT }		from "../Library/TAXTools/TAXTools.js";

// If RAW is true, user input will be copied without changing (debug keywords, expression
// evaluation, etc. Set it to false to use normal processing of input.
const RAW = true;
let error_log = [];

function restoreAssetsaleItems(assetsales) {
	//
	// The assetsales parameter is an array of name-value pair objects.
	//
	if (!assetsales || assetsales.length === 0) {
		return;
	}

	const hm = HTMLMgr.getMgr();

	// Remove the four blank entries
	const blocks = HTMLMgr.getBlocks("assetitem");
	for (const block of blocks) {
		hm.removeBlock(block);
	}

	for (const values of assetsales) {
		try {
			const block =
				hm.createAndAddBlock("Assetitem", ASSETSALES_CONTAINER, "beforeend");
			block.putValues(values);
		} catch (error) {
			error_log.push(`Error restoring asset/stock sale; ignoring.`);
			continue;
		}
	}
}

function restoreData(data) {
	//
	// This function is called when the user restores the input fields from a file.
	// The data that was copied from the file is passed a parameter.
	//
	try {
		error_log = [];

		const tool = HTML.getUserInput("title", "text");
		if (data.tool_name !== tool) {
			throw new Error(`File was saved from the ${data.tool}. ` +
				"It cannot be restored by this tool.");
		}

		resetAll();		// Start over, reset everything.

		HTML.putUserOutput("tax-year", data.tax_year, "text");
		restoreTaxpayer(data.taxpayer);
		restoreDependents(data.dependents);
		restoreExpenses(data.expenses);
		restoreIncome(data.income);
		restoreAssetsaleItems(data.assetsale_items);
		restoreInputForms(data.input_forms);

		if (error_log.length !== 0) {
			HTML.putElementValue(ERROR_MESSAGE_OUTPUT, error_log.join("\n"));
			HTML.scrollTo(ERROR_MESSAGE_OUTPUT);
		}
	} catch (error) {
		Ensure.processError(error);
	}
}

function restoreDataHandler(event) {
	//
	// The file selection dialog gets a list of files, but only one should be passed
	// in our case; select the first file and ignore the rest.
	//
	const filename = event.target.files[0];
	if (!filename) {
		throw new Error("No file selected.");
		return;
	}

	File.restoreFromFile(filename, restoreData);
}

function restoreDependents(dependents) {
	//
	// The dependents parameter is an array of name-value pair objects.
	//
	if (!dependents || dependents.length === 0) {
		return;
	}

	const hm = HTMLMgr.getMgr();
	for (const dependent_values of dependents) {
		try {
			const block =
				hm.createAndAddBlock("Dependent", DEPENDENTS_CONTAINER, "beforeend");
			block.putValues(dependent_values);
		} catch (error) {
			error_log.push(`Error restoring dependent; ignoring.`);
			continue;
		}
	}
}

function restoreInputForms(forms) {
	//
	// The forms parameter is an array of name-value pair objects.
	// Array of: { formName: { fieldName: fieldValue } }
	//
	if (!forms || forms.length === 0) {
		return;
	}

	const hm = HTMLMgr.getMgr();
	let formname;
	let form_values;

	for (const forminfo of forms) {
		try {
			formname	= forminfo[0];
			form_values	= forminfo[1];

			if (!Classes.isInputForm(formname)) {
				error_log.push(`Unknown form "${formname}" in file, ignoring.`);
				continue;
			}
		
			const block = addInputForm(formname);
			block.putValues(form_values);
		} catch {
			error_log.push(`Error restoring form: ${formname}; ignoring.`);
		}
	}
}

function restoreExpenses(expense_values) {
	//
	// The expense_values parameter is a single name-value pair object.
	//

	const hm = HTMLMgr.getMgr();

	try {
		const block = hm.getBlock("expenses");
		block.putValues(expense_values);
	} catch (error) {
		error_log.push(`Error restoring expense information; ignoring.`);
	}
}

function restoreIncome(income_values) {
	//
	// The income_values parameter is a single name-value pair object.
	//
	const hm = HTMLMgr.getMgr();

	try {
		const block = hm.getBlock("income");
		block.putValues(income_values);
	} catch (error) {
		error_log.push(`Error restoring income information; ignoring.`);
	}
}

function restoreTaxpayer(taxpayer_values) {
	//
	// The taxpayer_values parameter is a single name-value pair object.
	//

	try {
		Taxpayer.putValues(taxpayer_values);
	} catch (error) {
		error_log.push(`Error restoring taxpayer information; ignoring.`);
	}
}

function saveAssetsaleItems() {
	//
	// Saves an array of name-value pair objects.
	//
	const hm = HTMLMgr.getMgr();

	let asset_values = [];

	for (const block of hm.getBlocks("assetitem")) {
		const values = Objects.removeUnused(block.getValues(RAW));
		if (Objects.isUsed(values)) {
			asset_values.push(values);
		}
	}

	return asset_values;
}

function saveDataHandler(event) {
	//
	// This function is called when the user wants to save the information entered by the
	// user to a file.
	//
	try {
		const data = {
			"tool_name":		HTML.getUserInput("title", "text"),
			"version":			HTML.getUserInput("tax-tools-version", "text"),
			"todays_date":		new Date().toLocaleDateString(),
			"tax_year":			HTML.getUserInput("tax-year", "text"),
			"taxpayer":			saveTaxpayer(),
			"dependents":		saveDependents(),
			"expenses":			saveExpenses(),
			"income":			saveIncome(),
			"assetsale_items":	saveAssetsaleItems(),
			"input_forms":		saveInputForms(),
			"output_forms":		saveOutputForms(),
		};

		File.saveToFile(data, TAX_PROGRAM_SAVE_FILE);
	} catch (error) {
		Ensure.processError(error);
	}
}

function saveDependents() {
	//
	// Saves an array of name-value pair objects.
	//
	const hm = HTMLMgr.getMgr();

	let dependent_values = [];

	for (const block of hm.getBlocks("dependent")) {
		const values = Objects.removeUnused(block.getValues(RAW));
		if (Objects.isUsed(values)) {
			dependent_values.push(values);
		}
	}

	return dependent_values;
}

function saveExpenses() {
	//
	// Saves an object of name-value pairs.
	//
	const hm		= HTMLMgr.getMgr();
	const block		= hm.getBlock("expenses");
	const values	= block.getValues(RAW);
	return Objects.removeUnused(values);
}

function saveIncome() {
	//
	// Saves an object of name-value pairs.
	//
	const hm		= HTMLMgr.getMgr();
	const block		= hm.getBlock("income");
	const values	= block.getValues(RAW);
	return Objects.removeUnused(values);
}

function saveInputForms() {
	//
	// Saves an array of name-value pair objects.
	// Array of: { formName: { fieldName: fieldValue } }
	//
	const hm = HTMLMgr.getMgr();

	let forms = [];

	// For each form.
	for (const block of hm.getBlocks()) {
		const formname = block.getFormname();
		if (Classes.isInputForm(formname)) {
			const values = Objects.removeUnused(block.getValues(RAW));
			if (Objects.isUsed(values)) {
				forms.push( [ formname, values ] );
			}
		}
	}

	return forms;		// Array of name-value pair objects
}

function saveOutputForms() {
	//
	// Saves an array of name-value pair objects.
	// Array of: { formName: { fieldName: fieldValue } }
	//
	const hm = HTMLMgr.getMgr();

	let forms = [];

	// For each form.
	for (const block of hm.getBlocks()) {
		const formname = block.getFormname();
		if (Classes.isOutputForm(formname)) {
			const values = Objects.removeUnused(block.getValues(RAW));
			if (Objects.isUsed(values)) {
				forms.push( [ formname, values ] );
			}
		}
	}

	return forms;
}

function saveTaxpayer() {
	//
	// Saves an object of name-value pairs.
	//
	const values = Taxpayer.getValues(RAW);
	return Objects.removeUnused(values);
}

document.addEventListener("DOMContentLoaded", () => {
	//
	// Wait for the DOM to be fully loaded before trying to access any elements.
	//
	HTML.addListener("save-button",	"click",  saveDataHandler);
	HTML.addListener("input-file",	"change", restoreDataHandler);
});