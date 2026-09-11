
//
// This module manages tax forms that have been created as objects of the TaxForm class.
//
import { Classes }	from "../Modules/Classes.js";
import { Debug }	from "../Modules/Debug.js";


let instances = {};		// This variable is indexed by form name. For each form, it
						// returns an array with all the instances of that form.

const print_order = [
	"F1040",
	"F1040S1",
	"F1040S1A",
	"F1040S2",
	"F1040S3",
	"F1040SA",
	"F1040SB",
	"F1040SC",
	"F1040SD",
	"F1040SE",
	"F1040SSE",
	"F1041",
	"F1065B",
	"F1120S",
	"F2441",
	"F6251",
	"F7206",
	"F540",
	"F540CA",
];

function addForm(formname, form) {
	if (!formname) {
		throw new Error("TaxFormObj.addForm(): Form name is not set.");
	}

	let form_list = instances[formname];
	if (!form_list) {
		// This is the first form of this type.
		instances[formname] = [];
		form_list = instances[formname];
	}

	if ((form_list.length > 0) && Classes.isSingleton(formname)) {
		throw new Error(
			`TaxFormObj.addForm(): Singleton form ${formname} already exists; cannot add.`);
		return;
	}

	form_list.push(form);
}

function get1099RValue(lineno, ira) {
	//
	// Form 1099-R can be used for IRAs or pensions; see box 7b.
	//
	let sum = 0;
	const formname = "F1099R";
	let form_list = instances[formname];

	if (form_list) {
		for (const form of form_list) {
			if (!form.calculated) {
				form.calculate();
			}

			if ( (ira && form.lines["07b"]) || (!ira && !form.lines["07b"]) ) {
				sum += form.lines[lineno].value;
			}
		}
	}

	return sum;
}

const TaxFormObj = {
	reset() {
		instances = {};
	},

	createForm(formname) {
		const form_class = Classes.getClass(formname);

		if (form_class) {
			const form = new form_class(formname);
			addForm(formname, form);
			return form;
		}

		return undefined;
	},

	earnedIncome() {
		return TaxFormObj.getValue("F1040", "01z") +
			TaxFormObj.getValue("F1040S1", "03") +
			TaxFormObj.getValue("F1040S1", "06") +
			TaxFormObj.getValue("F1040S1", "08r") +
			TaxFormObj.getValue("F1040S1", "08t") +
			TaxFormObj.getValue("F1040S1", "08u") -
			TaxFormObj.getValue("F1040S1", "015");
	},

	formsInPrintOrder() {
		let forms = [];

		for (let formname of print_order) {
			let more_forms = TaxFormObj.getAllForms(formname);
			for (let next_form of more_forms) {
				forms.push(next_form);
			}
		}

		return forms;
	},

	getAllForms(formname = "") {
		// Get all the form objects that have been created, or all the forms of a
		// particular type.
		let all_forms = [];
		let formnames = [];

		if (formname) {
			formnames = [formname];
		} else {
			formnames = Object.keys(instances);
		}

		for (const formname of formnames) {
			let form_list = instances[formname];
			if (form_list) {
				for (const form of form_list) {
					all_forms.push(form);
				}
			}
		}
		return all_forms;
	},

	getForm(formname) {
		//
		// Get an instance of a form. If it has not been created, undefined will be returned.
		//
		let instance;
		let form_list = instances[formname];
		if (form_list) {
			if (form_list.length > 1) {
				throw new Error(
					`TaxFormObj.getForm(): More than one instance of form ${formname}.`);
			} else {
				instance = form_list[0];
			}
		}

		return instance;
	},

	getOrCreateForm(formname) {
		return TaxFormObj.getForm(formname) || TaxFormObj.createForm(formname);
	},

	getPensionValue(lineno) {
		return get1099RValue(lineno, false);
	},

	getIRAValue(lineno) {
		return get1099RValue(lineno, true);
	},

	getTextValue(formname, ...lineno) {
		// This method will get a text value from a tax form. If the form does not exist,
		// it will try to create it. If it has not been calculated, it will be calculated.
		// If the form has not been implemented, "" will be returned. If there is more than
		// one instance of the form, the lines from all the instances are concatinated
		// together.
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
	},

	getValue(formname, ...lineno) {
		// This method will get a value from a tax form. If the form does not exist, it wlll
		// try to create it. If it has not been calculated, it will be calculated. If the
		// form has not been implemented, zero will be returned. If there is more than one
		// instance of the form, the lines from all the instances are added together.
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
	},

	toConsole() {
		const form_list = TaxFormObj.getAllForms();
		for (const form of form_list) {
			form.toConsole();
		}
	},

	unearnedIncome() {
		return Math.max(0,
			TaxFormObj.getValue("F1040", "09") +
			TaxFormObj.getValue("F1040S1", "24j") -
			TaxFormObj.getValue("F1040", "01z") -
			TaxFormObj.getValue("F1040S1", "03") -
			TaxFormObj.getValue("F1040S1", "06") -
			TaxFormObj.getValue("F1040S1", "08a") -
			TaxFormObj.getValue("F1040S1", "08d") -
			TaxFormObj.getValue("F1040S1", "08u") -
			TaxFormObj.getValue("F1040S1", "18"));
	}
};

const {
	reset,
	createForm,
	earnedIncome,
	formsInPrintOrder,
	getAllForms,
	getForm,
	getOrCreateForm,
	getPensionValue,
	getIRAValue,
	getTextValue,
	getValue,
	toConsole,
	unearnedIncome
} = TaxFormObj;

export {
	TaxFormObj,
	reset,
	createForm,
	earnedIncome,
	formsInPrintOrder,
	getAllForms,
	getForm,
	getOrCreateForm,
	getPensionValue,
	getIRAValue,
	getTextValue,
	getValue,
	toConsole,
	unearnedIncome
};

if (typeof window !== "undefined") {
	window.TaxFormObj ??= TaxFormObj;
}
