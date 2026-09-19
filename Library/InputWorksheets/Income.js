
import { HTML } from "../Modules/HTML.js";

const ELEMENTS = {
	// Element ID				Value Type
	"income-jury-duty":				[],
	"income-alimony-received":		[],
	"income-divorce-date":			[],
	"income-gambling":				[],

};

export class Income {
	static getUserInput() {
		//
		// Read the fields from the web and return an object with the values.
		//
		let inputs = {};
		for (const element_id of Object.keys(ELEMENTS)) {
			const value_type	= ELEMENTS[element_id][0];
			const key_name		= element_id.replace(/-/g, "_");
			if (document.getElementById(element_id)) {
				inputs[key_name] = HTML.getUserInput(element_id, value_type);
			}
		}

		return inputs;
	}

	static putUserInput(inputs) {
		//
		// Copy the value of the fields from the inputs object to the web.
		//
		for (const key_name of Object.keys(inputs)) {
			const element_id = key_name.replace(/_/g, "-");
			if (document.getElementById(element_id)) {
				HTML.putUserInput(element_id, inputs[key_name]);
			}
		}
	}

	static reset() {
		// Clear the fields on the web page.
		for (const element_id of Object.keys(ELEMENTS)) {
			if (document.getElementById(element_id)) {
				HTML.putElementValue(element_id, "");
			}
		}
	}
}
