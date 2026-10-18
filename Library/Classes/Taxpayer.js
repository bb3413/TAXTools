
import { SINGLE, HOH, MFJ, QSS, MFS }	from "../TAXTools/TAXTools.js";
import { filingStatusToStr }			from "../TAXTools/TAXTools.js";
import { strToFilingStatus }			from "../TAXTools/TAXTools.js";

import { Dates }		from "../Modules/Dates.js";
import { Dependent }	from "../InputWorksheets/Dependent.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTML }			from "../Modules/HTML.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";
import { Str }			from "../Modules/Str.js";
import { Objects }		from "../Modules/Objects.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const FIELD_INFO = {
	// Element ID			Value Type
	"filing-status":		["text"],
	"taxpayers-name":		["text"],
	"street-address":		["text"],
	"city":					["text"],
	"state":				["text"],
	"zip-code":				["text"],
	"taxpayers-birthday":	["text"],
	"is-taxpayer-blind":	[],
	"taxpayer-has-ssn":		[],
	"taxpayer-has-itin":	[],		// Ignored

	// Spouse
	"spouses-birthday":		["text"],
	"months-lived-together":[],
	"is-spouse-blind":		[],
	"spouse-has-ssn":		[],
	"spouse-has-itin":		[],		// Ignored
};

let taxpayer = undefined;		// Global variable.

// This functions ignore an error when an element does not exist.
function putUserOutput(element_id, value, type = "number") {
	if (document.getElementById(element_id)) {
		HTML.putUserOutput(element_id, value, type);
	}
}

function initializeTaxpayer() {
	//
	// Create a new taxpayer and initialize it with information from the Web page.
	//
	const taxpayer = new Taxpayer();
		
	// Initialize the fields from the web page.
	for (const field_name of Object.keys(FIELD_INFO)) {
		const value_type	= FIELD_INFO[field_name][0];
		const key_name		= field_name.replace(/-/g, "_");
		if (document.getElementById(field_name)) {
			switch (key_name) {
				case "filing_status":
					taxpayer[key_name] = 
						strToFilingStatus(HTML.getUserInput(field_name, value_type));
					break;
				default:
					taxpayer[key_name] = HTML.getUserInput(field_name, value_type);
					break;
			}
		}
	}

	if (taxpayer.filing_status === MFJ) {
		if (taxpayer.months_lived_together === "") {
			taxpayer.months_lived_together = 12;
		} else {
			taxpayer.months_lived_together = Number(taxpayer.months_lived_together);
		}
	}

	return taxpayer;
}

export class Taxpayer {
	//
	// ---------------- Static Methods ----------------
	//
	static getValues(raw = false) {
		//
		// Copy values from the web page.
		//
		// The return parameter is an object that contains the name-value pairs for all the
		// fields copied from the web page.  Raw user input is only used to save and restore
		// user input.
		//
		let inputs = {};

		// Copy the fields from the web page.
		for (const field_name of Object.keys(FIELD_INFO)) {
			const key_name		= field_name.replace(/-/g, "_");
			const value_type	= raw ? "raw" : FIELD_INFO[field_name][0];
			if (document.getElementById(field_name)) {
				inputs[key_name] = HTML.getUserInput(field_name, value_type);
			}
		}

		return inputs;
	}

	static getFilingStatus() {
		if (taxpayer) {
			return taxpayer.filing_status;
		} else {
			return SINGLE;
		}
	}

	static getTaxpayer() {
		if (!taxpayer) {
			initializeTaxpayer();
		}
		return taxpayer;
	}

	static putValues(data) {
		//
		// Copy values to the web page.
		//
		// The input parameter is an object that contains the name-value pairs for all the
		// fields to copy to the web page.
		//
		Ensure.isObject(data);

		// Clean all the fields.
		for (const element_id of Object.keys(FIELD_INFO)) {
			if (document.getElementById(element_id)) {
				HTML.putElementValue(element_id, "");
			}
		}

		HTML.putElementValue("filing-status", "SINGLE");

		// Restore the fields that were saved.
		for (const key_name of Object.keys(data)) {
			const element_id = key_name.replace(/_/g, "-");
			if (document.getElementById(element_id)) {
				HTML.putElementValue(element_id, data[key_name]);
			}
		}	
	}

	static reset() {
		// Clear the fields on the web page.
		for (const element_id of Object.keys(FIELD_INFO)) {
			if (document.getElementById(element_id)) {
				HTML.putElementValue(element_id, "");
			}
		}

		taxpayer = undefined;
	}

	static resetCalculation() {
		taxpayer = undefined;
	}

	//
	// ---------------- Constructor ----------------
	//
	constructor() {
		taxpayer = this;

		this._filing_status					= SINGLE;
		this._taxpayers_name				= "";
		this._street_address				= "";		// Needed for sales tax
		this._city							= "";		// Needed for sales tax
		this._state							= "";
		this._zip_code						= "";		// Needed for sales tax
		this._taxpayers_birthday			= "";
		this._taxpayers_age					= 0;
		this._is_taxpayer_blind				= false;
		this._taxpayer_has_ssn				= true;		// Not an ITIN

		// Spouse
		this._spouses_birthday				= "";
		this._spouses_age					= 0;
		this._months_lived_together			= 12;		// Needed when filing MFS
		this._is_spouse_blind				= false;
		this._spouse_has_ssn				= true;		// Not an ITIN

		this._dependents					= [];
	}

	//
	// ---------------- Getter Methods ----------------
	//
	get filing_status() {				return this._filing_status};
	get taxpayers_name() {				return this._taxpayers_name};
	get street_address() {				return this._street_address};
	get city() {						return this._city};
	get state() {						return this._state};
	get zip_code() {					return this._zip_code};
	get taxpayers_birthday() {			return this._taxpayers_birthday};
	get taxpayers_age() {				return this._taxpayers_age};
	get is_taxpayer_blind() {			return this._is_taxpayer_blind};
	get taxpayer_has_ssn() {			return this._taxpayer_has_ssn};

	get spouses_birthday() {			return this._spouses_birthday};
	get spouses_age() {					return this._spouses_age};
	get months_lived_together() {		return this._months_lived_together};
	get is_spouse_blind() {				return this._is_spouse_blind};
	get spouse_has_ssn() {				return this._spouse_has_ssn};

	//
	// ---------------- Setter Methods ----------------
	//
	set filing_status(fs) {				this._filing_status		= fs }
	set taxpayers_name(name) {			this._taxpayers_name	= name }
	set street_address(str) {			this._street_address	= str }
	set city(str) {						this._city				= str }
	set state(str) {					this._state				= str }
	set zip_code(str) {					this._zip_code			= str }
	set is_taxpayer_blind(bool) {		this._is_taxpayer_blind	= bool }
	set taxpayer_has_ssn(bool) {		this._taxpayer_has_ssn	= bool }

	set months_lived_together(num) {	this._months_lived_together	= num }
	set is_spouse_blind(bool) {			this._is_spouse_blind	= bool }
	set spouse_has_ssn(bool) {			this._spouse_has_ssn	= bool }

	set taxpayers_birthday(birthday) {
		if (birthday === null || birthday === undefined) { return; }
		this._taxpayers_birthday = birthday;
		this._taxpayers_age =
			Math.max(0, Dates.getEndOfYearAge(birthday, TaxTable.getTaxYear()));
	}

	set taxpayers_age(age) {
		if (age === null || age === undefined) { return; }
		if (age !== 0) {
			this._taxpayers_birthday	= "";
			this._taxpayers_age		= age;
		}
	}

	set spouses_birthday(birthday) {
		if (birthday === null || birthday === undefined) { return; }
		this._spouses_birthday = birthday;
		this._spouses_age =
			Math.max(0, Dates.getEndOfYearAge(birthday, TaxTable.getTaxYear()));
	}

	set spouses_age(age) {
		if (age === null || age === undefined) { return; }
		if (age !== 0) {
			this._spouses_birthday	= "";
			this._spouses_age		= age;
		}
	}

	//
	// ---------------- Utility Methods ----------------
	//
	addDependent(inputs) {
		Ensure.isObject(inputs);
		this._dependents.push(new Dependent(inputs));
	}

	familySize() {
		let size = 1;	// Taxpayer
		if (this._filing_status === MFJ) {
			size++;		// Spouse
		}

		size += this._dependents.length;

		return size;
	}

	isMarried() {
		switch (this.filing_status) {
			case MFJ:	return true;
			case MFS:	return true;
		}
		return false;
	}

	fillIn1040() {
		//
		// Put the taxpayer information on the output form 1040.
		//
		const hm	= HTMLMgr.getMgr();
		const block = hm.getBlock("f1040");
		const id	= block.getID();

		HTML.putUserOutput(`${id}-filing-status`,
			filingStatusToStr(this._filing_status), "text");
		HTML.putUserOutput(`${id}-taxpayers-name`,
			this._taxpayers_name, "text");
		HTML.putUserOutput(`${id}-street-address`,
			this._street_address, "text");
		if (!Str.empty(this._city)) {
			const state = this._state ? this._state : "CA";
			HTML.putUserOutput(`${id}-city-state-zip`,
				`${this._city}, ${state} ${this._zip_code}`.trim(), "text");
		} else {
			HTML.putUserOutput(`${id}-city-state-zip`,"", "text");
		}

		if (!Str.empty(this._taxpayers_birthday)) {
			HTML.putUserOutput(`${id}-taxpayers-birthday`,
				`${this._taxpayers_birthday} (Age ${this._taxpayers_age})`, "text");
		} else {
			HTML.putUserOutput(`${id}-taxpayers-birthday`, " ", "text");
		}
		if (!Str.empty(this._spouses_birthday)) {
			HTML.putUserOutput(`${id}-spouses-birthday`,
				`${this._spouses_birthday} (Age ${this._spouses_age})`, "text");
		} else {
			HTML.putUserOutput(`${id}-spouses-birthday`, " ", "text");
		}
		HTML.putUserOutput(`${id}-taxpayer-is-blind`,
			this._is_taxpayer_blind ? "X" : "", "text");
		HTML.putUserOutput(`${id}-spouse-is-blind`,
			this._is_spouse_blind ? "X" : "", "text");
	}

	toString() {
		let str		= [];
		let title	= [];

		title.push(`Taxpayer`);

		const fields = Object.keys(this);
		for (const field of fields) {
			if ((this._filing_status !== MFJ) && field.match(/spouse/i)) {
				continue;
			}
			if (field === "_dependents") {
				continue;
			}

			let value = this[field];
			if (value) {	// Skip empty lines.
				let s = "  " + Str.snakeCaseToEnglish(field);
				s = s.padEnd(65, " ") + value;
				str.push(s);
			}
		}

		if (str.length > 0) {
			str = title.concat(str);
			str.push("");
			str.push("");
			return str.join("\n");
		} else {
			return "";
		}
	}
}
