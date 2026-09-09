
import { Classes }		from "../Classes/Classes.js";
import { HTML }			from "../Classes/HTML.js";
import { Str }			from "../Classes/Str.js";
import { TaxFormObj }	from "../Classes/TaxFormObj.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";

let indentation			= 0;
let debug_all			= false;
let strict				= false;
let verbose				= false;
let debug_used_keywords = [];
let trace_log			= [];

function keywordList() {
	const debug_keywords = [
		"Debug",
		"Strict",
		"Taxpayer",
		"Trace",
		"Verbose" ];

	// Keywords are the debug keywords plus the names of the tax forms and worksheets.
	return debug_keywords.concat(Classes.listAllForms());
}

function hideField(name) {
	// The debug field is an HTML area that display additional information when debugging 
	// is enabled.
	const debug_field = document.getElementById(name);
	if (debug_field) {
		// Only hide if element exists; non-existant element is not an error.
		HTML.hideElement(name);
	}
}

function showField(name) {
	// The debug field is an HTML area that display additional information when debugging
	// is enabled.
	const debug_field = document.getElementById(name);
	if (debug_field) {
		// Only show if element exists; non-existant element is not an error.
		HTML.showElement(name);
	}
}

export class Debug {
	static reset() {
		indentation				= 0;
		debug_all				= false;
		strict					= false;
		verbose					= false;
		debug_used_keywords		= [];
		trace_log				= [];
		HTML.putElementValue("debug-output", "");
		hideField("debug-container");
	}

	static getKeywords(input_string) {
		//
		// This function parses the input string to extract debugging keywords and return
		// whatever is left. The keywords are not case-sensitive and they may appear in any
		// order within the input string. You can use commas or whitespace to separate the
		// keywords and the value. The final string will have all commas and unnecessary
		// whitespace removed.
		//
		for (const keyword of keywordList()) {
			let regex = new RegExp(`\\b${keyword}\\b`, 'ig');
			if (input_string.match(regex)) {
				input_string = input_string.replace(regex, "");
				debug_used_keywords.push(keyword);
			}
		}

		if (debug_used_keywords.includes("Debug")) {
			debug_all = true;
		}

		// Replace double commas with one comma
		// Replace whitespae with a single space
		// Remove leading and trailing whitespace
		// Remove leading and trailing commas
		input_string = input_string.replace(/,\s*,/g, ",")
									.replace(/\s*/, " ")
									.trim()
									.replace(/^,\s*|\s*,$/g, "");
		return input_string;
	}

	static set_strict(bool = true) {
		strict = bool;
	}

	static strict() {
		if (strict || debug_used_keywords.includes("Strict")) {
			return true;
		} else {
			return false;
		}
	}

	static toString() {
		let str		= [];
		let s		= "";

		s = "Debug Options: " + debug_used_keywords;
		s = s.replace(/,/, ", ");	// Add a space after the comma
		str.push(s);

		if (trace_log.length > 0) {
			str.push("");
			str.push("Debug Trace Log");
			for (const line of trace_log) {
				str.push(line);
			}
		}

		return str.join("\n");
	}

	static turnOn() {
		// Turn on debugging after input has been proceessed and the debug keywords have
		// been collected.
		if (debug_used_keywords.length === 0) {
			return;
		}

		let output	= "";

		if (debug_all) {
			output += Debug.toString();
			output += "\n\n";
		}

		if (debug_all || debug_used_keywords.includes("Taxpayer")) {
			let tp = Taxpayer.getTaxpayer();
			if (tp) {
				output += tp.toString();
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

	static set_verbose(bool = true) {
		verbose = bool;
	}

	static verbose() {
		if (verbose || debug_used_keywords.includes("Verbose")) {
			return true;
		} else {
			return false;
		}
	}

	static warn(msg) {
		if (Debug.strict()) {
				console.log(msg);
		}
	}

	static verify(expression, message) {
		if (expression) {
			return true;
		} else {
			console.log(message);
			if (Debug.strict()) {
				throw new Error(message);
			}
			return false;
		}
	}

	//
	// Debug tracing functions.
	//
	// For files that want to use these functions, but may not alway have this file included,
	// put the following lines at the top of the file. It check whether the functions are
	// defined and, if not, defines them to be a dummy function that does nothing.
	//
	//		globalThis.dbgEnter ??= () => {};
	//		globalThis.dbgExit  ??= () => {};
	//		globalThis.dbgLog   ??= () => {};
	//
	static enter(name) {
		if (debug_used_keywords.includes("Trace")) {
			const spaces = " ".repeat(indentation * 2);
			indentation += 1;

			const str = `${spaces}> ${name}`;
			trace_log.push(str);
			// console.log(str);
		}
	}

	static exit(name) {
		if (debug_used_keywords.includes("Trace")) {
			indentation = Math.max(0, indentation - 1);
			const spaces = " ".repeat(indentation * 2);

			const str = `${spaces}< ${name}`;
			trace_log.push(str);
			// console.log(str);
		}
	}

	static log(message) {
		const spaces = " ".repeat(indentation * 2);

		const str = `${spaces}${message}`;
		trace_log.push(str);
		// console.log(str);
	}
}
