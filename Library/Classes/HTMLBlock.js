
//
// This module ...
//
import { TAXTOOL_CONTAINER } from "../TAXTools/TAXTools.js";
import { Ensure }		from "../Modules/Ensure.js";

const FIELDS = {
	// Field Name	Value Type	Description
	"name":			["text",	"Blah blah blah"],
}

const HTML_CODE = `
`;

export class HTMLBlock {
	_change_handler(event) {
	}

	constructor(uid) {
		this name		= "";
		this uid		= 0;

		HTML.addListener(TAXTOOL_CONTAINER, "change", _changeHandler);
	}

	getElementID() {
	}

	getValue(field_name) {
		//
		// Get the value of a single element from the block.
		//
	}

	getValues() {
		//
		// Get the value of all the elements defined in the ELEMENTS object.
		//
		let values = {};
		return values;
	}

	install() {
	}

	putValue() {
	}

	putValues() {
	}

	uninstall() {
	}

	toString() {
	}
}
