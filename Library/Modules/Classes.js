
//
// This module provides utilities to manage the names of classes.
//
import { SINGLE, HOH, MFJ, QSS, MFS } from "../TAXTools/TAXTools.js";

import { Ensure }		from "../Modules/Ensure.js";

// Input Tax Forms
import { F1098E }		from "../InputForms/F1098E.js";		// Student loan interest
import { F1098VLI }		from "../InputForms/F1098VLI.js";	// Vehicle loan interest
import { F1099C }		from "../InputForms/F1099C.js";
import { F1099DIV }		from "../InputForms/F1099DIV.js";
import { F1099G }		from "../InputForms/F1099G.js";
import { F1099INT }		from "../InputForms/F1099INT.js";
import { F1099K }		from "../InputForms/F1099K.js";
import { F1099MISC }	from "../InputForms/F1099MISC.js";
import { F1099NEC }		from "../InputForms/F1099NEC.js";
import { F1099OID }		from "../InputForms/F1099OID.js";
import { F1099R }		from "../InputForms/F1099R.js";
import { F1099S }		from "../InputForms/F1099S.js";
import { SSA1099 }		from "../InputForms/SSA1099.js";
import { W2 }			from "../InputForms/W2.js";

// Output Tax Forms
import { F1040 }		from "../OutputForms/F1040.js";
import { F1040S1 }		from "../OutputForms/F1040S1.js";
import { F1040S1A }		from "../OutputForms/F1040S1A.js";
import { F1040S2 }		from "../OutputForms/F1040S2.js";
import { F1040S3 }		from "../OutputForms/F1040S3.js";
import { F1040SA }		from "../OutputForms/F1040SA.js";
import { F1040SC }		from "../OutputForms/F1040SC.js";
import { F1040SD }		from "../OutputForms/F1040SD.js";
import { F1040SSE }		from "../OutputForms/F1040SSE.js";	// Self-employment Tax
import { F540 }			from "../OutputForms/F540.js";		// California Income Tax
import { F540CA }		from "../OutputForms/F540CA.js";	// California Adjustments
import { F6251 }		from "../OutputForms/F6251.js";		// AMT worksheet
import { F7206 }		from "../OutputForms/F7206.js";		// Self-employment Health Ins
import { F8880 }		from "../OutputForms/F8880.js";		// Retirement Credit

// Worksheets
import { IncTax }		from "../Worksheets/IncTax.js";
import { SalesTax }		from "../Worksheets/SalesTax.js";
import { SSTax }		from "../Worksheets/SSTax.js";
import { StudentLoan }	from "../Worksheets/StudentLoan.js";
import { Refund }		from "../Worksheets/Refund.js";
import { CA_HiIncDeductions }	from "../Worksheets/CA_HiIncDeductions.js";
import { CA_HiIncExemptions }	from "../Worksheets/CA_HiIncExemptions.js";

// Input Worksheets
import { Assetitem }	from "../InputWorksheets/Assetitem.js";
import { Business }		from "../InputWorksheets/Business.js";
import { Dependent }	from "../InputWorksheets/Dependent.js";


const CLASS_NAME	= 0;
const INPUT			= 1;
const SINGLETON		= 2;
const ON_DEMAND		= 3;

const class_map = {
	// Input Tax Forms										Create on
	// Name					Class			Input	Single	Demand
	"F1098E":				[ F1098E,		true,	false,	false	],
	"F1098VLI":				[ F1098VLI,		true,	false,	false	],
	"F1099C":				[ F1099C,		true,	false,	false	],
	"F1099DIV":				[ F1099DIV,		true,	false,	false	],
	"F1099G":				[ F1099G,		true,	false,	false	],
	"F1099INT":				[ F1099INT,		true,	false,	false	],
	"F1099K":				[ F1099K,		true,	false,	false	],
	"F1099MISC":			[ F1099MISC,	true,	false,	false	],
	"F1099NEC":				[ F1099NEC,		true,	false,	false	],
	"F1099OID":				[ F1099OID,		true,	false,	false	],
	"F1099R":				[ F1099R,		true,	false,	false	],
	"F1099S":				[ F1099S,		true,	false,	false	],
	"SSA1099":				[ SSA1099,		true,	false,	false	],
	"W2":					[ W2,			true,	false,	false	],

	// Output Tax Forms										Create on
	// Name					Class			Input	Single	Demand
	"F1040":				[ F1040,		false,	true,	true	],
	"F1040S1":				[ F1040S1,		false,	true,	true	],
	"F1040S1A":				[ F1040S1A,		false,	true,	true	],
	"F1040S2":				[ F1040S2,		false,	true,	true	],
	"F1040S3":				[ F1040S3,		false,	true,	true	],
	"F1040SA":				[ F1040SA,		false,	true,	true	],
	"F1040SC":				[ F1040SC,		false,	false,	false	],
	"F1040SD":				[ F1040SD,		false,	true,	false	],
	"F1040SSE":				[ F1040SSE,		false,	false,	true	],
	"F540":					[ F540,			false,	true,	true	],
	"F540CA":				[ F540CA,		false,	true,	true	],
	"F6251":				[ F6251,		false,	true,	false	],
	"F7206":				[ F7206,		false,	true,	false	],
	"F8880":				[ F8880,		false,	true,	true	],

	// Worksheets											Create on
	// Name					Class			Input	Single	Demand
	"IncTax":				[ IncTax,		false,	true,	true	],
	"Refund":				[ Refund,		false,	true,	true	],
	"SalesTax":				[ SalesTax,		false,	true,	true	],
	"Simple":				[ SalesTax,		false,	false,	true	],
	"SSTax":				[ SSTax,		false,	false,	true	],
	"StudentLoan":			[ StudentLoan,	false,	false,	true	],
	"CA_HiIncDeductions":	[ CA_HiIncDeductions,	false,	true,	true	],
	"CA_HiIncExemptions":	[ CA_HiIncExemptions,	false,	true,	true	],

	// Input Worksheets
	"Assetitem":			[ Assetitem,	true,	false,	false	],
	"Business":				[ Business,		true,	false,	false	],
	"Dependent":			[ Dependent,	true,	false,	false	],
};

const Classes = {
	createOnDemand(formname) {
		// When getValue() or getTextValue() is called, the default is to return 0 or "" if
		// the form has not been created. However, some forms get input from other forms and
		// need to be created and calculated before the value is returned. This array lists
		// those forms
		if (class_map[formname]) {
			return class_map[formname][ON_DEMAND];
		} else {
			return false;
		}
	},

	getClass(classname) {
		if (class_map[classname]) {
			return class_map[classname][CLASS_NAME];
		} else {
			return undefined;
		}
	},

	findClassName(name) {
		// Case insensitive conversion of name to classname.
		if (!name || typeof name !== "string") {
			throw new TypeError("name must be a non-empty string.");
		}

		name = name.toUpperCase();
		for (const classname of Object.keys(class_map)) {
			if (name === classname.toUpperCase()) {
				return classname;
			}
		}

		throw new Error(`Classes.findClassName(): ${name} not found.`);
	},

	getHTML(classname, ...rest) {
		if (!classname || typeof classname !== "string") {
			throw new TypeError("classname must be a non-empty string.");
		}

		// This method allows you to call the static method getHTML() by classname.
		switch (classname) {
			case "F1098E":		return F1098E.getHTML(...rest);
			case "F1098VLI":	return F1098VLI.getHTML(...rest);
			case "F1099C":		return F1099C.getHTML(...rest);
			case "F1099DIV":	return F1099DIV.getHTML(...rest);
			case "F1099G":		return F1099G.getHTML(...rest);
			case "F1099INT":	return F1099INT.getHTML(...rest);
			case "F1099K":		return F1099K.getHTML(...rest);
			case "F1099MISC":	return F1099MISC.getHTML(...rest);
			case "F1099NEC":	return F1099NEC.getHTML(...rest);
			case "F1099OID":	return F1099OID.getHTML(...rest);
			case "F1099R":		return F1099R.getHTML(...rest);
			case "F1099S":		return F1099S.getHTML(...rest);
			case "SSA1099":		return SSA1099.getHTML(...rest);
			case "W2":			return W2.getHTML(...rest);

			case "Assetitem":	return Assetitem.getHTML(...rest);
			case "Business":	return Business.getHTML(...rest);
			case "Dependent":	return Dependent.getHTML(...rest);
			default:
				throw new Error(`Classes.getHTML(): unimplemented form: ${classname}`);
		}
	},

	getInputFromWeb(classname, ...rest) {
		if (!classname || typeof classname !== "string") {
			throw new TypeError("classname must be a non-empty string.");
		}

		// This method allows you to call the static method getInputFromWeb() by classname.
		switch (classname) {
			case "F1098E":		return F1098E.getInputFromWeb(...rest);
			case "F1098VLI":	return F1098VLI.getInputFromWeb(...rest);
			case "F1099C":		return F1099C.getInputFromWeb(...rest);
			case "F1099DIV":	return F1099DIV.getInputFromWeb(...rest);
			case "F1099G":		return F1099G.getInputFromWeb(...rest);
			case "F1099INT":	return F1099INT.getInputFromWeb(...rest);
			case "F1099K":		return F1099K.getInputFromWeb(...rest);
			case "F1099MISC":	return F1099MISC.getInputFromWeb(...rest);
			case "F1099NEC":	return F1099NEC.getInputFromWeb(...rest);
			case "F1099OID":	return F1099OID.getInputFromWeb(...rest);
			case "F1099R":		return F1099R.getInputFromWeb(...rest);
			case "F1099S":		return F1099S.getInputFromWeb(...rest);
			case "SSA1099":		return SSA1099.getInputFromWeb(...rest);
			case "W2":			return W2.getInputFromWeb(...rest);

			case "Assetitem":	return Assetitem.getInputFromWeb(...rest);
			case "Business":	return Business.getInputFromWeb(...rest);
			case "Dependent":	return Dependent.getInputFromWeb(...rest);
			default:
				throw new Error(`Classes.getInputFromWeb(): unimplemented form: ${classname}`);
		}
	},

	isSingleton(classname) {
		if (!classname || typeof classname !== "string") {
			throw new TypeError("classname must be a non-empty string.");
		}
		if (class_map[classname]) {
			return class_map[classname][SINGLETON];
		} else {
			return true;
		}
	},

	isInputForm(formname) {
		if (!formname || typeof formname !== "string") {
			throw new TypeError("formname must be a non-empty string.");
		}
		if (class_map[formname]) {
			return class_map[formname][INPUT];
		} else {
			return false;
		}
	},

	isOutputForm(formname) {
		return !isInputForm(formname);
	},

	listAllForms() {
		// Return array with the names of the supported tax forms and worksheets.
		// The debug module uses this as a list of keywords.
		return Object.keys(class_map);
	},

	loadInputFromWeb(classname, ...rest) {
		if (!classname || typeof classname !== "string") {
			throw new TypeError("classname must be a non-empty string.");
		}

		// This method allows you to call the static method loadInputFromWeb() by classname.
		switch (classname) {
			case "F1098E":		return F1098E.loadInputFromWeb(...rest);
			case "F1098VLI":	return F1098VLI.loadInputFromWeb(...rest);
			case "F1099C":		return F1099C.loadInputFromWeb(...rest);
			case "F1099DIV":	return F1099DIV.loadInputFromWeb(...rest);
			case "F1099G":		return F1099G.loadInputFromWeb(...rest);
			case "F1099INT":	return F1099INT.loadInputFromWeb(...rest);
			case "F1099K":		return F1099K.loadInputFromWeb(...rest);
			case "F1099MISC":	return F1099MISC.loadInputFromWeb(...rest);
			case "F1099NEC":	return F1099NEC.loadInputFromWeb(...rest);
			case "F1099OID":	return F1099OID.loadInputFromWeb(...rest);
			case "F1099R":		return F1099R.loadInputFromWeb(...rest);
			case "F1099S":		return F1099S.loadInputFromWeb(...rest);
			case "SSA1099":		return SSA1099.loadInputFromWeb(...rest);
			case "W2":			return W2.loadInputFromWeb(...rest);
			default:
				throw new Error(
					`Classes.loadInputFromWeb(): unimplemented form: ${classname}`);
		}
	},
};

const {
	createOnDemand,
	findClassName,
	getClass,
	getHTML,
	getInputFromWeb,
	isSingleton,
	isInputForm,
	isOutputForm,
	listAllForms,
	loadInputFromWeb,
} = Classes;

export {
	Classes,
	createOnDemand,
	findClassName,
	getClass,
	getHTML,
	getInputFromWeb,
	isSingleton,
	isInputForm,
	isOutputForm,
	listAllForms,
	loadInputFromWeb,
};

if (typeof window !== "undefined") {
	window.Classes ??= Classes;
}
