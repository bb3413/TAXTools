
import { HTML } from "../Modules/HTML.js";

const ELEMENTS = {
	// Element ID		Value Type
	"healthcare":			[],
	"dental":				[],
	"medicare":				[],
	"taxpayer-ltc":			[],
	"spouse-ltc":			[],

	"doctor":				[],
	"prescriptions":		[],
	"medical-aids":			[],
	"medical-facilities":	[],
	"nursing-services":		[],
	"medical-miles":		[],
	"other-medical":		[],

	"est-payments-federal":	[],
	"est-payments-state":	[],
	"property-tax":			[],
	"personal-property-tax":[],
	"extra-sales-tax":		[],

	"cash-donations":		[],
	"noncash-donations":	[],
	"charitable-miles":		[],

	"educator-taxpayer":	[],
	"educator-spouse":		[],
	"alimony-paid":			[],
	"divorce-date":			["text"],
	"tax-preparation":		[],
	"investment-expenses":	[],
};

export class Expenses {
	static getUserInput() {
		//
		// Read the fields from the web and return an object with the values.
		//
		let inputs = {};
		for (const field_name of Object.keys(ELEMENTS)) {
			const value_type	= ELEMENTS[field_name][0];
			const key_name		= field_name.replace(/-/g, "_");
			const element_id	= `expenses-${field_name}`;
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
			const element_id = `expenses-${field_name}`;
			if (document.getElementById(element_id)) {
				HTML.putUserOutput(element_id, inputs[key_name]);
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
