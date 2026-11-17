
//
// This module manages taxpayer information on the web. It assumes different tools may
// define different fields, but if a field is defined, it uses a common set of field IDs.
//

export const TaxpayerWeb = {
	clearFields,
	getValues,
	putValues,
};

import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTML }			from "../Modules/HTML.js";

import { strToFilingStatus }			from "../TAXTools/TAXTools.js";
import { filingStatusToStr }			from "../TAXTools/TAXTools.js";

const FIELD_INFO = {
	// Field Name			Value Type
	"filing-status":		["text"],
	"taxpayers-name":		["text"],
	"street-address":		["text"],
	"city":					["text"],
	"state":				["text"],
	"zip-code":				["text"],
	"taxpayers-birthday":	["text"],
	"is-taxpayer-blind":	[],
	"taxpayer-has-ssn":		[],
	"taxpayer-has-itin":	[],

	// Spouse
	"spouses-birthday":		["text"],
	"months-lived-together":[],
	"is-spouse-blind":		[],
	"spouse-has-ssn":		[],
	"spouse-has-itin":		[],
};

function clearFields() {
	//
	// Put default values in the fields on the web.
	//
	for (const element_id of Object.keys(FIELD_INFO)) {
		if (document.getElementById(element_id)) {
			HTML.putElementValue(element_id, "");
		}
	}

	if (document.getElementById("filing-status")) {
		HTML.putElementValue("filing-status", "SINGLE");
	}
}

function getValues(raw = false) {
	//
	// Copy values from the web page.
	//
	// The return parameter is an object that contains the name-value pairs for all the
	// fields copied from the web page.
	//
	const values = {};

	for (const field_name of Object.keys(FIELD_INFO)) {
		const key_name		= field_name.replace(/-/g, "_");
		const value_type	= raw ? "raw" : FIELD_INFO[field_name][0];
		if (HTML.isValidElementID(field_name)) {
			switch (key_name) {
				case "filing_status":
					const value = HTML.getUserInput(field_name, value_type);
					values[key_name] = strToFilingStatus(value);
					break;
				default:
					values[key_name] = HTML.getUserInput(field_name, value_type);
					break;
			}
		}
	}

	return values;
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
		const field_name	= key_name.replace(/_/g, "-");
		const value_type	= FIELD_INFO[field_name][0];
		if (HTML.isValidElementID(field_name)) {
			switch (key_name) {
				case "filing_status":
					const value = filingStatusToStr(values[key_name])
					HTML.putUserOutput(field_name, value, value_type);
					break;
				default:
					HTML.putUserOutput(field_name, values[key_name], value_type);
					break;
			}
		}
	}
}
