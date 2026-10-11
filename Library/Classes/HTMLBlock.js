
//
// This module ...
//
import { TAXTOOL_CONTAINER } from "../TAXTools/TAXTools.js";
import { Ensure }		from "../Modules/Ensure.js";

const FIELDS = {
	// Field Name	Value Type	Line	Description
	"name":			["text",	true,	"Blah blah blah"],
}

const HTML_CODE = `
`;

export class HTMLBlock {
	_change_handler(event) {
	}

	constructor(name) {
		this.name		= name;
		this.uid		= HTMLMgr.getMgr().getUID(name);
	}

	getValues(raw = false) {
		//
		// Get the value of all the FIELDS defined in the FIELDS object.
		//
		for (const field_name of Object.keys(FIELDS)) {
			const value_type	= raw ? "raw" : FIELDS[field_name][0];
			const key_name		= field_name.replace(/-/g, "_");
			const element_id	= `${this.name}-${this.uid}-${field_name}`;
			inputs[key_name]	= HTML.getUserInput(element_id, value_type);
		}

		return inputs;
	}

	install() {
		//
		// Insert the HTML into the web page.
		//
		HTML.addListener(TAXTOOL_CONTAINER, "change", _changeHandler);
	}

	putValue(field_name, value) {
		//
		// Put the value into the field on the web page.
		//
	}

	putValues(data) {
		//
		// Copy the value of all the FIELDS from the passed object to the fields on the
		// web page.
		//
	}

	uninstall() {
		//
		// Remove the blog from the web page.
		//
		HTML.removeListener(TAXTOOL_CONTAINER, "change", _changeHandler);
	}

	toString() {
	}
}
