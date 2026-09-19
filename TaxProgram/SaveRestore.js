
import { Classes }		from "../Library/Modules/Classes.js";
import { Container }	from "../Library/Classes/Container.js";
import { Dependent }	from "../Library/Classes/Dependent.js";
import { File }			from "../Library/Modules/File.js";
import { HTML }			from "../Library/Modules/HTML.js";
import { Objects }		from "../Library/Modules/Objects.js";
import { TaxFormObj }	from "../Library/Modules/TaxFormObj.js";
import { Taxpayer }		from "../Library/Classes/Taxpayer.js";

import { Assetitem }	from "../Library/InputWorksheets/Assetitem.js";
import { Expenses }		from "../Library/InputWorksheets/Expenses.js";
import { Income }		from "../Library/InputWorksheets/Income.js";

import { TAX_PROGRAM_SAVE_FILE }	from "../Library/TAXTools/TAXTools.js";

import {
	// Global variables
	dependents_container,
	assetsale_items_container,
	input_taxforms_container,
	output_taxforms_container,
	// Functions
	addInputFormToWeb,
	processError,
	resetAll,
} from "./TaxProgram.js";

export {
	restoreUserDataHandler,
	saveUserDataHandler,
};

function restoreAssetsaleItems(data) {
	if (!data || data.length === 0) {
		return;
	}

	assetsale_items_container.reset();		// Remove the four blank entries

	for (const assetitem_data of data) {
		const uid = Container.getUID("assetitem");
		const [ html_id, html ] = Assetitem.getInputHTML(uid);
		assetsale_items_container.addEntry(html_id, html);
		Assetitem.putUserInputs(assetitem_data, uid);
	}
}

function restoreDependents(data) {
	if (!data || data.length === 0) {
		return;
	}

	for (const dependent_data of data) {
		const uid = Container.getUID("dependent");
		const [ html_id, html ] = Dependent.getInputHTML(uid);
		dependents_container.addEntry(html_id, html);
		Dependent.putUserInputs(dependent_data, uid);
	}
}

function restoreInputForms(data) {
	if (!data || data.length === 0) {
		return;
	}

	for (const forminfo of data) {
		let formname	= forminfo[0];
		let lines		= forminfo[1];

		if (!Classes.isInputForm(formname)) {
			throw new Error(`restoreUserData(): ${formname} ` +
				"is not an input form, cannot restore.");
		}

		const taxform_id = addInputFormToWeb(formname);
		let [ name, uid ] = Container.parseElementID(taxform_id);
		const element_id_prefix = `${name}-${uid}-`;
		for (const lineno of Object.keys(lines)) {
			HTML.putElementValue(element_id_prefix + lineno, lines[lineno]);
		}
	}
}

function restoreUserData(data) {
	//
	// This function is called when the user restores the input fields from a file.
	// The data that was copied from the file is passed a parameter.
	//
	try {
		const tool = HTML.getUserInput("title", "text");
		if (data.tool_name !== tool) {
			throw new Error(`Restored data file is intended for the ${data.tool} tool.`);
		}

		resetAll();		// Start over, reset everything.

		HTML.putUserOutput("tax-year", data.tax_year, "text");
		Taxpayer.restoreUserInput(data.taxpayer);
		restoreDependents(data.dependents);
		Expenses.putUserInput(data.expenses);
		Income.putUserInput(data.income);
		restoreAssetsaleItems(data.assetsale_items);
		restoreInputForms(data.input_forms);
	} catch (error) {
		processError(error);
	}
}

function restoreUserDataHandler(event) {
	//
	// The file selection dialog gets a list of files, but only one should be passed
	// in our case; select the first file and ignore the rest.
	//
	const filename = event.target.files[0];
	if (!filename) {
		throw new Error("No file selected.");
		return;
	}

	File.restoreFromFile(filename, restoreUserData);
}

function saveAssetsaleItems() {
	let user_values = [];

	for (let entry_id of assetsale_items_container.getEntries()) {
		let [ entry_name, entry_uid ] = Container.parseElementID(entry_id);
		let inputs = Objects.removeUnused(Assetitem.getUserInput(entry_uid));
		if (Objects.isUsed(inputs)) {
			user_values.push(inputs);
		}
	}

	return user_values;
}

function saveDependents() {
	let user_values = [];

	for (let entry_id of dependents_container.getEntries()) {
		let [ entry_name, entry_uid ] = Container.parseElementID(entry_id);
		let inputs = Objects.removeUnused(Dependent.getUserInput(entry_uid));
		if (Objects.isUsed(inputs)) {
			user_values.push(inputs);
		}
	}

	return user_values;
}

function saveInputForms() {
	// Return array of: formName: [ formIndex, lineNumber, value ]
	// This method is used to save the current state to a file. It only saves the
	// values on the input form web pages.
	let user_values = [];

	// For each form.
	for (let taxform_id of input_taxforms_container.getEntries()) {
		let [ formname, uid ] = Container.parseElementID(taxform_id);
		formname = formname.toUpperCase();
		let inputs = Objects.removeUnused(Classes.getUserInput(formname, uid));
		if (Objects.isUsed(inputs)) {
			user_values.push( [ formname, inputs ] );
		}
	}

	return user_values;
}

function saveOutputForms() {
	// Return array of: formName: [ formIndex, { lineNumber: value } }
	// This method is used to save the current state to a file. It only saves the
	// values in the tax form objects.
	let user_values = [];

	// For each form.
	for (const form of TaxFormObj.getAllForms()) {
		if (!Classes.isOutputForm(form.formname)) {
			continue;
		}

		let outputs = {};
		for (const lineno of Object.keys(form.lines)) {
			if (form.lines[lineno].value) {
				outputs[lineno] = form.lines[lineno].value;
			}
		}
		if (Objects.isUsed(outputs)) {
			user_values.push( [ form.formname, outputs ] );
		}
	}

	return user_values;
}

function saveUserDataHandler(event) {
	//
	// This function is called when the user wants to save the information entered by the user
	// to a file.
	//
	try {
		const data = {
			"tool_name":		HTML.getUserInput("title", "text"),
			"version":			HTML.getUserInput("tax-tools-version", "text"),
			"todays_date":		new Date().toLocaleDateString(),
			"tax_year":			HTML.getUserInput("tax-year", "text"),
			"taxpayer":			Objects.removeUnused(Taxpayer.getUserInput()),
			"dependents":		saveDependents(),
			"expenses":			Objects.removeUnused(Expenses.getUserInput()),
			"income":			Objects.removeUnused(Income.getUserInput()),
			"assetsale_items":	saveAssetsaleItems(),
			"input_forms":		saveInputForms(),
			"output_forms":		saveOutputForms(),
		};

		File.saveToFile(data, TAX_PROGRAM_SAVE_FILE);
	} catch (error) {
		processError(error)
	}
}
