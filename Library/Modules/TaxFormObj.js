
//
// This module manages tax forms that have been created as objects.
//
export const TaxFormObj = {
	createForm,
	getForm,
	getForms,
	getOrCreateForm,
	getTextValue,
	getValue,
	reset,
	toConsole,
};

import { Classes }		from "../Modules/Classes.js";
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";

let instances = {};		// This variable is indexed by form name. For each form, it
						// returns an array with all the instances of that form.

//----------  Local Functions ---------------------------------------------------------------
function addForm(formname, form) {
	Ensure.isNonEmptyString(formname);
	Ensure.isObject(form);

	let form_list = instances[formname];
	if (!form_list) {
		// This is the first form of this type.
		instances[formname] = [];
		form_list = instances[formname];
	}

	if ((form_list.length > 0) && Classes.isSingleton(formname)) {
		throw new Error(`Singleton form ${formname} already exists; cannot add.`);
		return;
	}

	form_list.push(form);
}

//----------  Exported Functions ------------------------------------------------------------
function createForm(formname) {
	Ensure.isNonEmptyString(formname);

	const form_class = Classes.getClass(formname);

	if (form_class) {
		const form = new form_class(formname);
		addForm(formname, form);
		return form;
	}

	return undefined;
}

function getForm(formname) {
	//
	// Get an instance of a form.
	//
	Ensure.isNonEmptyString(formname);

	const form_list = instances[formname];
	if (!form_list) {
		return undefined;
	}
	if (form_list.length !== 1) {
		throw new Error(`Expected exactly one form.`);
	}

	return form_list[0];	// Return the form, not an array.
}

function getForms(formname = "") {
	//
	// Get all the form objects that have been created, or all the forms of a
	// particular type.
	//
	Ensure.isString(formname);

	if (formname !== "") {
		return (instances[formname] ? instances[formname] : []);
	} else {
		let all_forms = [];
		for (const formname of Object.keys(instances)) {
			all_forms = all_forms.concat(instances[formname]);
		}
		return all_forms;
	}
}

function getOrCreateForm(formname) {
	Ensure.isNonEmptyString(formname);

	return TaxFormObj.getForm(formname) || TaxFormObj.createForm(formname);
}

function getTextValue(formname, ...lineno) {
	//
	// This method will get a text value from a tax form. If the form does not exist,
	// it will try to create it. If it has not been calculated, it will be calculated.
	// If the form has not been implemented, "" will be returned. If there is more than
	// one instance of the form, the lines from all the instances are concatenated
	// together.
	//
	Ensure.isNonEmptyString(formname);

	Debug.enter(`TaxFormObj.getTextValue(${formname}, ${lineno})`);
	let str = "";
	let form_list = instances[formname];
	if (!form_list && Classes.createOnDemand(formname)) {
		// Try to create; not an error if it fails; it may be a form that is not
		// implemented yet.
		TaxFormObj.createForm(formname);
		form_list = instances[formname];
	}

	if (form_list) {
		for (const form of form_list) {
			if (!form.calculated) {
				form.calculate();
			}
			for (let ln of lineno) {
				if (form.lines[ln] !== undefined) {
					if (str) {
						str += " ";
					}
					str += form.lines[ln].value;
				}
			}
		}
	}
	Debug.exit(`TaxFormObj.getTextValue(${str})`);
	return str;
}

function getValue(formname, ...lineno) {
	//
	// This method will get a value from a tax form. If the form does not exist, it will
	// try to create it. If it has not been calculated, it will be calculated. If the
	// form has not been implemented, zero will be returned. If there is more than one
	// instance of the form, the lines from all the instances are added together.
	//
	Ensure.isNonEmptyString(formname);

	Debug.enter(`TaxFormObj.getValue(${formname}, ${lineno})`);
	let sum = 0;
	let form_list = instances[formname];
	if (!form_list && Classes.createOnDemand(formname)) {
		// Try to create; not an error if it fails; it may be a form that is not
		// implemented yet.
		TaxFormObj.createForm(formname);
		form_list = instances[formname];
	}

	if (form_list) {
		for (const form of form_list) {
			if (!form.calculated) {
				form.calculate();
			}
			for (let ln of lineno) {
				if (form.lines[ln] !== undefined) {
					sum += form.lines[ln].value;
				}
			}
		}
	}
	Debug.exit(`TaxFormObj.getValue(${sum})`);
	return isNaN(sum) ? 0 : sum;
}

function reset() {
	instances = {};
}

function toConsole() {
	const form_list = TaxFormObj.getForms();
	for (const form of form_list) {
		form.toConsole();
	}
}
