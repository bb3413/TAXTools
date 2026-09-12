
import { Classes }		from "../Modules/Classes.js";
import { Container }	from "../Classes/Container.js";
import { HTML }			from "../Modules/HTML.js";
import { Str }			from "../Modules/Str.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";

let indentation			= 0;
let debug_all			= false;
let strict_enabled		= false;
let verbose_enabled		= false;
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
	return debug_keywords.concat(Classes.listAllForms(), Container.listAllContainers());
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

const Debug = {
	reset() {
		indentation = 0;
		debug_all = false;
			strict_enabled = false;
			verbose_enabled = false;
		debug_used_keywords = [];
		trace_log = [];
		HTML.putElementValue("debug-output", "");
		hideField("debug-container");
	},

	getKeywords(input_string) {
		//
		// This function parses the input string to extract debugging keywords and return
		// whatever is left. The keywords are not case-sensitive and they may appear in any
		// order within the input string. You can use commas or whitespace to separate the
		// keywords and the value. The final string will have all commas and unnecessary
		// whitespace removed.
		//
		for (const keyword of keywordList()) {
			const regex = new RegExp(`\\b${keyword}\\b`, 'ig');
			if (input_string && input_string.match(regex)) {
				input_string = input_string.replace(regex, "");
				debug_used_keywords.push(keyword);
			}
		}

		if (debug_used_keywords.includes("Debug")) {
			debug_all = true;
		}

		// Replace double commas with one comma
		// Replace whitespace with a single space
		// Remove leading and trailing whitespace
		// Remove leading and trailing commas
		input_string = input_string.replace(/,\s*,/g, ",")
			.replace(/\s+/g, " ")
			.trim()
			.replace(/^,\s*|\s*,$/g, "");
		return input_string;
	},

	set_strict(bool = true) {
			strict_enabled = bool;
	},

	strict() {
			if (strict_enabled || debug_used_keywords.includes("Strict")) {
			return true;
		} else {
			return false;
		}
	},

	toString() {
		let str = [];
		let s = "";

		s = "Debug Options: " + debug_used_keywords;
		s = s.replace(/,/, ", "); // Add a space after the comma
		str.push(s);

		if (trace_log.length > 0) {
			str.push("");
			str.push("Debug Trace Log");
			for (const line of trace_log) {
				str.push(line);
			}
		}

		return str.join("\n");
	},

	turnOn() {
		// Turn on debugging after input has been proceessed and the debug keywords have
		// been collected.
		if (debug_used_keywords.length === 0) {
			return;
		}

		let output = "";

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

		for (const container of Container.getContainers()) {
			if (debug_all || debug_used_keywords.includes(container.name)) {
				output += container.toString();
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
	},

	set_verbose(bool = true) {
			verbose_enabled = bool;
	},

	verbose() {
			if (verbose_enabled || debug_used_keywords.includes("Verbose")) {
			return true;
		} else {
			return false;
		}
	},

	warn(msg) {
		if (Debug.strict()) {
			console.log(msg);
		}
	},

	verify(expression, message) {
		if (expression) {
			return true;
		} else {
			console.log(message);
			if (Debug.strict()) {
				throw new Error(message);
			}
			return false;
		}
	},

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
	enter(name) {
		if (debug_used_keywords.includes("Trace")) {
			const spaces = " ".repeat(indentation * 2);
			indentation += 1;

			const str = `${spaces}> ${name}`;
			trace_log.push(str);
			// console.log(str);
		}
	},

	exit(name) {
		if (debug_used_keywords.includes("Trace")) {
			indentation = Math.max(0, indentation - 1);
			const spaces = " ".repeat(indentation * 2);

			const str = `${spaces}< ${name}`;
			trace_log.push(str);
			// console.log(str);
		}
	},

	log(message) {
		const spaces = " ".repeat(indentation * 2);

		const str = `${spaces}${message}`;
		trace_log.push(str);
		// console.log(str);
	}
};

const {
	reset,
	getKeywords,
	set_strict,
	strict,
	toString,
	turnOn,
	set_verbose,
	verbose,
	warn,
	verify,
	enter,
	exit,
	log
} = Debug;

export {
	Debug,
	reset,
	getKeywords,
	set_strict,
	strict,
	toString,
	turnOn,
	set_verbose,
	verbose,
	warn,
	verify,
	enter,
	exit,
	log
};

if (typeof window !== "undefined") {
	window.Debug ??= Debug;
}
