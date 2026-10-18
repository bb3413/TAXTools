
//
// This module manages individual blocks of HTML that can be dynamilcally added
// to the current web page (DOM).
//
import { TAXTOOL_CONTAINER } from "../TAXTools/TAXTools.js";
import { Classes }		from "../Modules/Classes.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTML }			from "../Modules/HTML.js";

export class HTMLBlock {
	constructor() {
		this.name		= "";
		this.uid		= 0;
		this.html		= undefined;
		this.fields		= undefined;
	}

	clearValues() {
		//
		// Clear the fields on the web page.
		//
		for (const field_name of Object.keys(this.fields)) {
			const element_id = `${this.name}-${this.uid}-${field_name}`;
			HTML.putElementValue(element_id, "");
		}
	}

	getFormname() {
		return Classes.findClassName(this.name);
	}

	getID() {
		//
		// Get the element ID of the block.
		//
		return `${this.name}-${this.uid}`
	}

	getValues(raw = false) {
		//
		// Copy values from the web page.
		//
		// The return parameter is an object that contains the name-value pairs for all the
		// fields copied from the web page.
		//
		Ensure.isObject(this.fields);

		const values = {};

		for (const field_name of Object.keys(this.fields)) {
			const key_name		= field_name.replace(/-/g, "_");
			const value_type	= raw ? "raw" : this.fields[field_name][0];
			const element_id	= `${this.name}-${this.uid}-${field_name}`;
			values[key_name]	= HTML.getUserInput(element_id, value_type);
		}

		return values;
	}

	putValues(values) {
		//
		// Copy values to the web page.
		//
		// The input parameter is an object that contains the name-value pairs for all the
		// fields to copy to the web page.
		//
		Ensure.isObject(values);

		for (const key_name of Object.keys(values)) {
			const field_name	= key_name.replace(/_/g, "-");
			const value_type	= this.fields[field_name][0];
			const element_id	= `${this.name}-${this.uid}-${field_name}`;
			HTML.putUserOutput(element_id, values[key_name], value_type);
		}
	}
}