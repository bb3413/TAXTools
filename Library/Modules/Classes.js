
//
// This module provides utilities to manage the names of classes.
//
import { SINGLE, HOH, MFJ, QSS, MFS } from "../TAXTools/TAXTools.js";

import { Ensure }		from "../Modules/Ensure.js";

// Input Tax Forms
import { F1098E }		from "../InputForms/F1098E.js";
import { F1098VLI }		from "../InputForms/F1098VLI.js";
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
import { CA_HiIncDeductions }	from "../Worksheets/CA_HiIncDeductions.js";
import { CA_HiIncExemptions }	from "../Worksheets/CA_HiIncExemptions.js";
import { IncTax }			from "../Worksheets/IncTax.js";
import { IRADeduction }		from "../Worksheets/IRADeduction.js";
import { Refund }			from "../Worksheets/Refund.js";
import { SalesTax }			from "../Worksheets/SalesTax.js";
import { Simple }			from "../Worksheets/Simple.js";
import { SSTax }			from "../Worksheets/SSTax.js";
import { StudentLoan }		from "../Worksheets/StudentLoan.js";

// Input Worksheets
import { Assetitem }		from "../InputWorksheets/Assetitem.js";
import { Business }			from "../InputWorksheets/Business.js";
import { Dependent }		from "../InputWorksheets/Dependent.js";
import { Expenses }			from "../InputWorksheets/Expenses.js";
import { Income }			from "../InputWorksheets/Income.js";

// Web Pages
import { F1098E_HTML }		from "../InputForms/F1098E_HTML.js";
import { F1098VLI_HTML }	from "../InputForms/F1098VLI_HTML.js";
import { F1099C_HTML }		from "../InputForms/F1099C_HTML.js";
import { F1099DIV_HTML }	from "../InputForms/F1099DIV_HTML.js";
import { F1099G_HTML }		from "../InputForms/F1099G_HTML.js";
import { F1099INT_HTML }	from "../InputForms/F1099INT_HTML.js";
import { F1099K_HTML }		from "../InputForms/F1099K_HTML.js";
import { F1099MISC_HTML }	from "../InputForms/F1099MISC_HTML.js";
import { F1099NEC_HTML }	from "../InputForms/F1099NEC_HTML.js";
import { F1099OID_HTML }	from "../InputForms/F1099OID_HTML.js";
import { F1099R_HTML }		from "../InputForms/F1099R_HTML.js";
import { F1099S_HTML }		from "../InputForms/F1099S_HTML.js";
import { SSA1099_HTML }		from "../InputForms/SSA1099_HTML.js";
import { W2_HTML }			from "../InputForms/W2_HTML.js";

import { F1040_HTML }		from "../OutputForms/F1040_HTML.js";
import { F1040S1_HTML }		from "../OutputForms/F1040S1_HTML.js";
import { F1040S1A_HTML }	from "../OutputForms/F1040S1A_HTML.js";
import { F1040S2_HTML }		from "../OutputForms/F1040S2_HTML.js";
import { F1040S3_HTML }		from "../OutputForms/F1040S3_HTML.js";
import { F1040SA_HTML }		from "../OutputForms/F1040SA_HTML.js";
import { F1040SC_HTML }		from "../OutputForms/F1040SC_HTML.js";
import { F1040SD_HTML }		from "../OutputForms/F1040SD_HTML.js";
import { F1040SSE_HTML }	from "../OutputForms/F1040SSE_HTML.js";
import { F540_HTML }		from "../OutputForms/F540_HTML.js";
import { F540CA_HTML }		from "../OutputForms/F540CA_HTML.js";
import { F6251_HTML }		from "../OutputForms/F6251_HTML.js";
import { F7206_HTML }		from "../OutputForms/F7206_HTML.js";
import { F8880_HTML }		from "../OutputForms/F8880_HTML.js";

export const Classes = {
	createOnDemand,
	findClassName,
	getClass,
	isSingleton,
	isInputForm,
	isOutputForm,
	isWorksheet,
	listAllForms,
};

// Column Numbers
const INPUT			= 0;
const WORKSHEET		= 1;
const SINGLETON		= 2;
const ON_DEMAND		= 3;

const form_info = {
	// Input Tax Forms									Create on
	// Name					Input	Worksheet	Single	Demand
	"F1098E":				[ true,		false,	false,	false	],
	"F1098VLI":				[ true,		false,	false,	false	],
	"F1099C":				[ true,		false,	false,	false	],
	"F1099DIV":				[ true,		false,	false,	false	],
	"F1099G":				[ true,		false,	false,	false	],
	"F1099INT":				[ true,		false,	false,	false	],
	"F1099K":				[ true,		false,	false,	false	],
	"F1099MISC":			[ true,		false,	false,	false	],
	"F1099NEC":				[ true,		false,	false,	false	],
	"F1099OID":				[ true,		false,	false,	false	],
	"F1099R":				[ true,		false,	false,	false	],
	"F1099S":				[ true,		false,	false,	false	],
	"SSA1099":				[ true,		false,	false,	false	],
	"W2":					[ true,		false,	false,	false	],

	// Output Tax Forms									Create on
	// Name					Input	Worksheet	Single	Demand
	"F1040":				[ false,	false,	true,	true	],
	"F1040S1":				[ false,	false,	true,	true	],
	"F1040S1A":				[ false,	false,	true,	true	],
	"F1040S2":				[ false,	false,	true,	true	],
	"F1040S3":				[ false,	false,	true,	true	],
	"F1040SA":				[ false,	false,	true,	true	],
	"F1040SC":				[ false,	false,	false,	false	],
	"F1040SD":				[ false,	false,	true,	false	],
	"F1040SSE":				[ false,	false,	false,	true	],
	"F540":					[ false,	false,	true,	true	],
	"F540CA":				[ false,	false,	true,	true	],
	"F6251":				[ false,	false,	true,	false	],
	"F7206":				[ false,	false,	true,	false	],
	"F8880":				[ false,	false,	true,	true	],

    // Worksheets										Create on
    // Name                 Input   Worksheet	Single  Demand
    "CA_HiIncDeductions":   [ false,	true,	true,   true    ],
    "CA_HiIncExemptions":   [ false,	true,	true,   true    ],
    "IncTax":               [ false,	true,	true,   true    ],
    "IRADeduction":         [ false,	true,	false,  true    ],
    "Refund":               [ false,	true,	true,   true    ],
    "SalesTax":             [ false,	true,	true,   true    ],
    "Simple":               [ false,	true,	false,  true    ],
    "SSTax":                [ false,	true,	true,   true    ],
    "StudentLoan":          [ false,	true,	true,   true    ],
};

const class_map = {
	// Input forms
	"F1098E":				F1098E,
	"F1098VLI":				F1098VLI,
	"F1099C":				F1099C,
	"F1099DIV":				F1099DIV,
	"F1099G":				F1099G,
	"F1099INT":				F1099INT,
	"F1099K":				F1099K,
	"F1099MISC":			F1099MISC,
	"F1099NEC":				F1099NEC,
	"F1099OID":				F1099OID,
	"F1099R":				F1099R,
	"F1099S":				F1099S,
	"SSA1099":				SSA1099,
	"W2":					W2,

	// Output Tax Forms
	"F1040":				F1040,
	"F1040S1":				F1040S1,
	"F1040S1A":				F1040S1A,
	"F1040S2":				F1040S2,
	"F1040S3":				F1040S3,
	"F1040SA":				F1040SA,
	"F1040SC":				F1040SC,
	"F1040SD":				F1040SD,
	"F1040SSE":				F1040SSE,
	"F540":					F540,
	"F540CA":				F540CA,
	"F6251":				F6251,
	"F7206":				F7206,
	"F8880":				F8880,

	// Worksheets
	"CA_HiIncDeductions":	CA_HiIncDeductions,
	"CA_HiIncExemptions":	CA_HiIncExemptions,
	"IncTax":				IncTax,
	"IRADeduction":			IRADeduction,
	"Refund":				Refund,
	"SalesTax":				SalesTax,
	"Simple":				Simple,
	"SSTax":				SSTax,
	"StudentLoan":			StudentLoan,

	// Input Worksheets
	"Assetitem":			Assetitem,
	"Business":				Business,
	"Dependent":			Dependent,
	"Expenses":				Expenses,
	"Income":				Income,

	// Web Pages
	"F1098E_HTML":			F1098E_HTML,
	"F1098VLI_HTML":		F1098VLI_HTML,
	"F1099C_HTML":			F1099C_HTML,
	"F1099DIV_HTML":		F1099DIV_HTML,
	"F1099G_HTML":			F1099G_HTML,
	"F1099INT_HTML":		F1099INT_HTML,
	"F1099K_HTML":			F1099K_HTML,
	"F1099MISC_HTML":		F1099MISC_HTML,
	"F1099NEC_HTML":		F1099NEC_HTML,
	"F1099OID_HTML":		F1099OID_HTML,
	"F1099R_HTML":			F1099R_HTML,
	"F1099S_HTML":			F1099S_HTML,
	"SSA1099_HTML":			SSA1099_HTML,
	"W2_HTML":				W2_HTML,

	"F1040_HTML":			F1040_HTML,
	"F1040S1_HTML":			F1040S1_HTML,
	"F1040S1A_HTML":		F1040S1A_HTML,
	"F1040S2_HTML":			F1040S2_HTML,
	"F1040S3_HTML":			F1040S3_HTML,
	"F1040SA_HTML":			F1040SA_HTML,
	"F1040SC_HTML":			F1040SC_HTML,
	"F1040SD_HTML":			F1040SD_HTML,
	"F1040SSE_HTML":		F1040SSE_HTML,
	"F540_HTML":			F540_HTML,
	"F540CA_HTML":			F540CA_HTML,
	"F6251_HTML":			F6251_HTML,
	"F7206_HTML":			F7206_HTML,
	"F8880_HTML":			F8880_HTML,
};

function createOnDemand(formname) {
	// When getValue() or getTextValue() is called, the default is to return 0 or "" if
	// the form has not been created. However, some forms get input from other forms and
	// need to be created and calculated before the value is returned. This array lists
	// those forms.
	Ensure.isNonEmptyString(formname);

	if (form_info[formname]) {
		return form_info[formname][ON_DEMAND];
	} else {
		return false;
	}
}

function getClass(classname) {
	// Get class reference from the class name.
	Ensure.isNonEmptyString(classname);

	return class_map[classname];
}

function findClassName(name) {
	// Case insensitive conversion of name to classname.
	Ensure.isNonEmptyString(name);

	name = name.toUpperCase();
	for (const classname of Object.keys(class_map)) {
		if (name === classname.toUpperCase()) {
			return classname;
		}
	}

	throw new Error(`${name} not found.`);
}

function isSingleton(classname) {
	Ensure.isNonEmptyString(classname);
	
	if (form_info[classname]) {
		return form_info[classname][SINGLETON];
	} else {
		return true;
	}
}

function isInputForm(formname) {
	Ensure.isNonEmptyString(formname);

	if (form_info[formname]) {
		return form_info[formname][INPUT];
	} else {
		return false;
	}
}

function isOutputForm(formname) {
	Ensure.isNonEmptyString(formname);

	if (form_info[formname]) {
		return ((!form_info[formname][INPUT]) && (!form_info[formname][WORKSHEET]));
	} else {
		return false;
	}
}

function isWorksheet(sheet_name) {
	Ensure.isNonEmptyString(sheet_name);

	if (form_info[sheet_name]) {
		return form_info[sheet_name][WORKSHEET];
	} else {
		return false;
	}
}

function listAllForms() {
	// Return array with the names of the supported tax forms and worksheets.
	// The debug module uses this as a list of keywords.
	return Object.keys(form_info);
}
