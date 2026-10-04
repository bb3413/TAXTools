
import { Ensure }		from "../Modules/Ensure.js";
import { HTML }			from "../Modules/HTML.js";

const ELEMENTS = {
	// Element ID			Value Type
	"jury-duty":			[],
	"alimony-received":		[],
	"divorce-date":			["text"],
	"gambling":				[],

};

export class Income {
	static getInputFromWeb(raw = false) {
		//
		// Read the fields from the web and return an object with the values. Raw user input
		// is only used to save and restore user input.
		//
		let inputs = {};
		for (const field_name of Object.keys(ELEMENTS)) {
			const value_type	= raw ? "raw" : ELEMENTS[field_name][0];
			const key_name		= field_name.replace(/-/g, "_");
			const element_id	= `income-${field_name}`;
			inputs[key_name]	= HTML.getUserInput(element_id, value_type);
		}

		return inputs;
	}

	static putUserOutput(inputs) {
		//
		// Copy the value of the fields from the inputs object to the web.
		//
		for (const key_name of Object.keys(inputs)) {
			const field_name = key_name.replace(/_/g, "-");
			const element_id = `income-${field_name}`;
			if (document.getElementById(element_id)) {
				HTML.putUserOutput(element_id, inputs[key_name]);
			}
		}
	}

	static reset() {
		// Clear the fields on the web page.
		for (const field_name of Object.keys(ELEMENTS)) {
			const element_id = `income-${field_name}`;
			if (document.getElementById(element_id)) {
				HTML.putElementValue(element_id, "");
			}
		}
	}
}
