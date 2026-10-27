
//
// This module must be initialized by calling the initialize() function and passing the
// filename to use when saving the file, an object with the names and type of every field
// to be saved/restored, and a reference to a function that will reset the tool to its
// original state.
//
// In addition the fields "tax-tools-version", "title", TAXTOOLS_CONTAINER, and
// ERROR_MESSAGE_OUTPUT need to exist in the HTML file.
//
// You should also add tooltips for "save-button-tt" and "restore-button-tt".
//

export const SaveRestore = {
	initialize,
};

import { Ensure }	from "../Modules/Ensure.js";
import { File }		from "../Modules/File.js";
import { HTML }		from "../Modules/HTML.js";

import { TAXTOOL_CONTAINER } 	from "../TAXTools/TAXTools.js";
import { ERROR_MESSAGE_OUTPUT } from "../TAXTools/TAXTools.js";

let error_log		= [];
let save_file_name	= undefined;
let field_info		= undefined;
let reset_func		= undefined;

function getValues() {
	//
	// Copy values from the web page.
	//
	// The return parameter is an object that contains the name-value pairs for all the
	// fields copied from the web page.
	//
	const values = {};

	for (const element_id of Object.keys(field_info)) {
		const key_name		= element_id.replace(/-/g, "_");
		values[key_name]	= HTML.getElementValue(element_id);
	}

	return values;
}

function initialize(file, fields, reset_all) {
	Ensure.isNonEmptyString(file);
	Ensure.isObject(fields);
	Ensure.isFunction(reset_all);

	save_file_name	= file;
	field_info		= fields;
	reset_func		= reset_all;
}

function putValues(values) {
	//
	// Copy values to the web page.
	//
	// The input parameter is an object that contains the name-value pairs for all the
	// fields to copy to the web page.
	//
	Ensure.isObject(values);

	for (const key_name of Object.keys(values)) {
		const element_id	= key_name.replace(/_/g, "-");
		const value_type	= field_info[element_id][0];
		HTML.putUserOutput(element_id, values[key_name], value_type);
	}
}

function restoreData(data) {
	//
	// This function is called when the user restores the input fields from a file.
	// The data that was copied from the file is passed a parameter.
	//
	try {
		error_log = [];

		const tool = HTML.getElementValue("title");
		if (data.tool_name !== tool) {
			throw new Error(`File was saved from the ${data.tool_name}. ` +
				"It cannot be restored by this tool.");
		}

		reset_func();										// Start over, reset everything.
		putValues(data.values);								// Put the new values
		HTML.dispatchEvent(TAXTOOL_CONTAINER, "change");	// Update the tool

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

function saveDataHandler(event) {
	//
	// This function is called when the user wants to save the information entered by the
	// user to a file.
	//
	try {
		const data = {
			"tool_name":		HTML.getElementValue("title"),
			"version":			HTML.getElementValue("tax-tools-version"),
			"creation_date":	new Date().toLocaleDateString(),
			"values":			getValues(),
		};

		File.saveToFile(data, save_file_name);
	} catch (error) {
		Ensure.processError(error);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	//
	// Wait for the DOM to be fully loaded before trying to access any elements.
	//
	HTML.addListener("save-button",	"click",  saveDataHandler);
	HTML.addListener("input-file",	"change", restoreDataHandler);
});