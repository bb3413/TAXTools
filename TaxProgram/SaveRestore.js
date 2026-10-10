
// Classes
import { Container }	from "../Library/Classes/Container.js";
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
	// Global variables
	dependents_container,
	assetsale_items_container,
	input_taxforms_container,
	output_taxforms_container,

	// Functions
	addInputFormToWeb,
	changeHandler,
	processError,
	resetAll,
} from "./TaxProgram.js";

export {
	restoreUserDataHandler,
	saveUserDataHandler,
};

import { TAX_PROGRAM_SAVE_FILE }	from "../Library/TAXTools/TAXTools.js";

// If RAW is true, user input will be copied without changing (debug keywords, expression
// evaluation, etc. Set it to false to use normal processing of input.
const RAW = true;
let error_log = [];

function restoreAssetsaleItems(data) {
	if (!data || data.length === 0) {
		return;
	}

	assetsale_items_container.reset();		// Remove the four blank entries

	for (const assetitem_data of data) {
		try {
			const uid = Container.getUID("assetitem");
			const [ html_id, html ] = Assetitem.getHTML(uid);
			assetsale_items_container.addEntry(html_id, html);
			Assetitem.putUserOutputs(assetitem_data, uid);
		} catch (error) {
			error_log.push(`Error restoring asset/stock sale; ignoring.`);
			continue;
		}
	}
}

function restoreDependents(data) {
	if (!data || data.length === 0) {
		return;
	}

	for (const dependent_data of data) {
		try {
			const uid = Container.getUID("dependent");
			const [ html_id, html ] = Dependent.getHTML(uid);
			dependents_container.addEntry(html_id, html);
			Dependent.putUserOutputs(dependent_data, uid);
		} catch (error) {
			error_log.push(`Error restoring dependent; ignoring.`);
			continue;
		}
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
			error_log.push(`Unknown form "${formname}" in file, ignoring.`);
			continue;
		}

		const taxform_id = addInputFormToWeb(formname);
		let [ name, uid ] = Container.parseElementID(taxform_id);
		const element_id_prefix = `${name}-${uid}-`;
		for (const lineno of Object.keys(lines)) {
			try {
				HTML.putElementValue(
					element_id_prefix + lineno.replace(/_/g, "-"), lines[lineno]);
			} catch (error) {
				error_log.push(`Unknown line "${lineno}" in form ${formname}; ignoring.`);
				continue;
			}
		}
	}
}

function restoreExpenses(data) {
	try {
		Expenses.putUserOutput(data);
	} catch (error) {
		error_log.push(`Error restoring expense information; ignoring.`);
	}
}

function restoreTaxpayer(data) {
	try {
		Taxpayer.restoreUserInput(data);
	} catch (error) {
		error_log.push(`Error restoring taxpayer information; ignoring.`);
	}
}

function restoreIncome(data) {
	try {
		Income.putUserOutput(data);
	} catch (error) {
		error_log.push(`Error restoring income information; ignoring.`);
	}
}

function restoreUserData(data) {
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
		changeHandler();

		if (error_log !== []) {
			HTML.putElementValue("error-message-output", error_log.join("\n"));
			document.getElementById("error-message-output")
				.scrollIntoView({behavior: 'smooth', block: 'start'});
		}
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
		let inputs = Objects.removeUnused(Assetitem.getInputFromWeb(entry_uid));
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
		let inputs = Objects.removeUnused(Dependent.getInputFromWeb(entry_uid, RAW));
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
		let inputs = Objects.removeUnused(Classes.getInputFromWeb(formname, uid, RAW));
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
			"taxpayer":			Objects.removeUnused(Taxpayer.getInputFromWeb(RAW)),
			"dependents":		saveDependents(),
			"expenses":			Objects.removeUnused(Expenses.getInputFromWeb(RAW)),
			"income":			Objects.removeUnused(Income.getInputFromWeb(RAW)),
			"assetsale_items":	saveAssetsaleItems(),
			"input_forms":		saveInputForms(),
			"output_forms":		saveOutputForms(),
		};

		File.saveToFile(data, TAX_PROGRAM_SAVE_FILE);
	} catch (error) {
		processError(error)
	}
}
