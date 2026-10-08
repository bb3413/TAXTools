
export const Debug = {
	reset,
	getKeywords,
	toString,
	turnOn,

	// Trace functions
	enter,
	exit,
	reftrace,
	log,
};

import { Classes }		from "../Modules/Classes.js";
import { Container }	from "../Classes/Container.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTML }			from "../Modules/HTML.js";
import { Str }			from "../Modules/Str.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";

let indentation			= 0;
let debug_all			= false;
let debug_used_keywords = [];
let debug_log			= [];

//----------  Local Functions ---------------------------------------------------------------
function keywordList() {
	const debug_keywords = [
		"Containers",
		"Debug",
		"References",
		"Taxpayer",
		"Trace",
	 ];

	// Keywords are the debug keywords plus the names of the tax forms and worksheets.
	return debug_keywords.concat(Classes.listAllForms());
}

function removeKeyword(text, keyword) {
	//
	// This function parses the text string to extract the keyword and return whatever is
	// left. The keyword is not case-sensitive and is delimited with whitespace, a comma or
	// both. The text string may contain newline characters. If the keyword is present, it
	// will be removed and replaced as follows:
	//
	// 1.	If the keyword and the delimiting characters are on a line by itself, the
	//		line will be removed.
	// 2.	If the keyword and the delimiting characters are at the end of a line, they
	//		should be removed, but the newline should not be removed.
	// 3.	If there is a comma before the keyword, the keyword and the delimiting
	//		characters should be replaced with a comma and a single space.
	// 4.	Otherwise, the keyword and the delimiting characters should be replaced with
	//		a single space.
	//
	Ensure.isString(text);
	Ensure.isString(keyword);

	const pattern = new RegExp(
		// Rule 1: Alone on line
		`^[ \\t]*,?[ \\t]*${keyword}[ \\t]*,?[ \\t]*$(\\r?\\n)?` +
		// Rule 2 & 3: End of line with comma
		`|,[ \\t]*${keyword}[ \\t]*(?=$|\\r?\\n)` +
		// Rule 2: End of line without comma
		`|[ \\t]*${keyword}[ \\t]*(?=$|\\r?\\n)` +
		// Rule 3: Middle with comma
		`|,[ \\t]*${keyword}[ \\t]*,?` +
		// Rule 4: Standard middle replacement
		`|[ \\t]*${keyword}[ \\t]*,?`,
		'gmi'
	);

	const updatedText = text.replace(pattern, (match) => {
		// Rule 1: Match contains only the keyword, delimiters (commas/whitespace), and
		// optional line breaks
		const textWithoutKeyword = match.replace(
									new RegExp(keyword, 'i'), '').replace(/[,\s\r\n]/g, '');
		if (textWithoutKeyword === '') {
			return '';
		}

		if (match.startsWith(',')) return ', '; // Rule 3
		return ' ';								// Rule 4 / Fallback
	});

	const wasFound = updatedText !== text;

	return [updatedText, wasFound];
}

function hideField(name) {
	// The debug field is an HTML area that display additional information when debugging
	// is enabled.
	Ensure.isString(name);

	// It is not an error if it does not exist.
	const debug_field = document.getElementById(name);
	if (debug_field) {
		// Only hide if element exists; non-existent element is not an error.
		HTML.hideElement(name);
	}
}

function showField(name) {
	// The debug field is an HTML area that display additional information when debugging
	// is enabled.
	Ensure.isString(name);

	// It is not an error if it does not exist.
	const debug_field = document.getElementById(name);
	if (debug_field) {
		// Only show if element exists; non-existent element is not an error.
		HTML.showElement(name);
	}
}

//----------  Exported Functions ------------------------------------------------------------
function reset() {
	indentation			= 0;
	debug_all			= false;
	debug_used_keywords	= [];
	debug_log			= [];

	HTML.putElementValue("debug-output", "");
	hideField("debug-container");
}

function getKeywords(input_string) {
	//
	// This function parses the input string to extract debugging keywords and return
	// whatever is left. The keywords are not case-sensitive and they may appear in any
	// order within the input string. You can use commas or whitespace to separate the
	// keywords and the value.
	//
	Ensure.isString(input_string);

	for (const keyword of keywordList()) {
		let wasRemoved = false;
		[input_string, wasRemoved] = removeKeyword(input_string, keyword);
		if (wasRemoved) {
			debug_used_keywords.push(keyword);
		}
	}

	if (debug_used_keywords.includes("Debug")) {
		debug_all = true;
	}

	return input_string;
}

function toString() {
	let str = [];
	let s = "";

	s = "Debug Options: " + debug_used_keywords;
	s = s.replace(/,/, ", "); // Add a space after the comma
	str.push(s);

	if (debug_log.length > 0) {
		str.push("");
		str.push("Debug Message Log");
		for (const line of debug_log) {
			str.push(line);
		}
	}

	return str.join("\n");
}

function turnOn() {
	// Turn on debugging after input has been processed and the debug keywords have
	// been collected.
	if (debug_used_keywords.length === 0) {
		return;
	}

	let output = "";

	if (debug_all ||
			debug_used_keywords.includes("Trace") ||
			debug_used_keywords.includes("References")) {
		output += Debug.toString();
		output += "\n\n";
	}

	if (debug_all || debug_used_keywords.includes("Taxpayer")) {
		let tp = Taxpayer.getTaxpayer();
		if (tp) {
			output += tp.toString();
		}
	}

	if (debug_all || debug_used_keywords.includes("Containers")) {
		for (const container of Container.getContainers()) {
			// Skip the output tax forms. If they exist, they will be printed by the next
			// section.
			if (container.container_id !== "output-taxforms-container") {
				output += container.toString();
			}
		}
	}

	for (const form of TaxFormObj.getAllForms()) {
		if (debug_all || debug_used_keywords.includes(form.formname)) {
			output += form.toString();
		}
	}

	output = Str.wrapLines(output);

	const element = document.getElementById("debug-output");
	if (!element) {
		throw new Error("Debug.turnOn: The \"debug-output\" HTML element is missing.");
	} else {
		HTML.putElementValue("debug-output", output);
		showField("debug-container");
	}
}

//
//-----  Trace Functions  -----------------------------------------------------------
//
// For files that want to use these functions, but may not alway have this file included,
// put the following lines at the top of the file. It check whether the functions are
// defined and, if not, defines them to be a dummy function that does nothing.
//
//		globalThis.dbgEnter ??= () => {};
//		globalThis.dbgExit  ??= () => {};
//		globalThis.dbgLog   ??= () => {};
//
function enter(name) {
	if (debug_used_keywords.includes("Trace")) {
		Ensure.isString(name);

		const spaces = " ".repeat(indentation * 2);
		indentation += 1;

		const str = `${spaces}> ${name}`;
		debug_log.push(str);
		// console.log(str);
	}
}

function exit(name) {
	if (debug_used_keywords.includes("Trace")) {
		Ensure.isString(name);

		indentation = Math.max(0, indentation - 1);
		const spaces = " ".repeat(indentation * 2);

		const str = `${spaces}< ${name}`;
		debug_log.push(str);
		// console.log(str);
	}
}

function reftrace(message) {
	if (debug_used_keywords.includes("References")) {
		Ensure.isString(message);

		const spaces = " ".repeat(indentation * 2);

		const str = `${spaces}${message}`;
		debug_log.push(str);
		// console.log(str);
	}
}

function log(message) {
	Ensure.isString(message);

	const spaces = " ".repeat(indentation * 2);

	const str = `${spaces}${message}`;
	debug_log.push(str);
	// console.log(str);
}
