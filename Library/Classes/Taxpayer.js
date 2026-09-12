
import { Dates }	from "../Modules/Dates.js";
import { HTML }		from "../Modules/HTML.js";
import { Str }		from "../Modules/Str.js";
import { Objects }	from "../Modules/Objects.js";
import { TaxTable }	from "../Modules/TaxTable.js";

const ELEMENT_IDS = {
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

	// Spouse
	"spouses-birthday":		["text"],
	"lived-with-spouse":	[],
	"is-spouse-blind":		[],
	"spouse-has-ssn":		[],
};

let taxpayer = undefined;		// Global variable.

// These two functions ignore an error when an element does not exist.
function getUserInput(element_id, default_value = 0) {
	if (document.getElementById(element_id)) {
		return HTML.getUserInput(element_id, default_value);
	} else {
		return default_value;
	}
}

function putUserOutput(element_id, value, type = "number") {
	if (document.getElementById(element_id)) {
		HTML.putUserOutput(element_id, value, type);
	}
}

function initializeTaxpayer() {
	//
	// Create a new taxpayer and initialize it with information from the Web page.
	//
	let inputs = {};

	const taxpayer = new Taxpayer();

	// Initialize the fields from the web page.
	for (const element_id of Object.keys(ELEMENT_IDS)) {
		const key_name = "_" + Str.kebabToSnakeCase(element_id);
		taxpayer[key_name] = getUserInput(element_id, ELEMENT_IDS[element_id][0]);
	}

	return taxpayer;
}

function formatFilingStatus(filing_status) {
	switch (filing_status) {
		case "SINGLE":	return "Single";
		case "HOH":		return "HoH";
		case "MFJ":		return "MFJ";
		case "QSS":		return "QSS";
		case "MFS":		return "MFS";
	}
}

function printLine(output, label, value) {
	output.push(label.padEnd(20, " ") + value);
}

export class Taxpayer {
	//
	// ---------------- Static Methods ----------------
	//
	static getUserInput() {
		let inputs = {};

		// Copy the fields from the web page.
		for (const field_name of Object.keys(ELEMENT_IDS)) {
			const value_type	= ELEMENT_IDS[field_name][0];
			const key_name		= field_name.replace(/-/g, "_");
			if (document.getElementById(field_name)) {
				inputs[key_name]= HTML.getUserInput(field_name, value_type);
			}
		}

		return inputs;
	}

	static getTaxpayer() {
		if (!taxpayer) {
			initializeTaxpayer();
		}
		return taxpayer;
	}

	static restoreUserInput(data) {
		// Clean all the fields.
		for (const element_id of Object.keys(ELEMENT_IDS)) {
			if (document.getElementById(element_id)) {
				HTML.putElementValue(element_id, "");
			}
		}

		// Restore the fields that were saved.
		for (const key_name of Object.keys(data)) {
			const element_id = key_name.replace(/_/g, "-");
			if (document.getElementById(element_id)) {
				HTML.putElementValue(element_id, data[key_name]);
			}
		}	
	}

	static reset() {
		// Clear the taxpayer fields on the web page.
		for (const element_id of Object.keys(ELEMENT_IDS)) {
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

		this._filing_status						= "Single";
		this._taxpayers_name					= "";
		this._street_address					= "";		// Needed for sales tax
		this._city								= "";		// Needed for sales tax
		this._state								= "";
		this._zip_code							= "";		// Needed for sales tax
		this._taxpayers_birthday				= "";
		this._taxpayers_age						= 0;
		this._is_taxpayer_blind					= false;
		this._taxpayer_has_ssn					= true;		// Not an ITIN

		// Spouse
		this._spouses_birthday					= "";
		this._spouses_age						= 0;
		this._lived_with_spouse					= true;		// Needed when filing MFS
		this._is_spouse_blind					= false;
		this._spouse_has_ssn					= true;		// Not an ITIN
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
	get lived_with_spouse() {			return this._lived_with_spouse};
	get is_spouse_blind() {				return this._is_spouse_blind};
	get spouse_has_ssn() {				return this._spouse_has_ssn};

	//
	// ---------------- Setter Methods ----------------
	//
	set filing_status(fs) {					this._filing_status		= fs.toUpperCase() }
	set taxpayers_name(name) {				this._taxpayers_name				= name }
	set street_address(str) {				this._street_address				= str }
	set city(str) {							this._city							= str }
	set state(str) {						this._state							= str }
	set zip_code(str) {						this._zip_code						= str }
	set is_taxpayer_blind(bool) {			this._is_taxpayer_blind				= bool }
	set taxpayer_has_ssn(bool) {			this._taxpayer_has_ssn				= bool }

	set lived_with_spouse(bool) {			this._lived_with_spouse				= bool }
	set is_spouse_blind(bool) {				this._is_spouse_blind				= bool }
	set spouse_has_ssn(bool) {				this._spouse_has_ssn				= bool }

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
			this._taxpayers_age			= age;
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
			this._spouses_birthday		= "";
			this._spouses_age			= age;
		}
	}

	//
	// ---------------- Utility Methods ----------------
	//
	familySize() {
		let size = 1;	// Taxpayer
		if (this.filing_status === "MFJ") {
			size++;		// Spouse
		}

/*
		let dependents = TaxFormWeb.getForm("Dependents");
		for (const dependent of dependents) {
			if (Objects.isUsed(dependent)) {
				size += dependents.length;
			}
		}
*/
		return size;
	}

	putTaxpayerInformation() {
		//
		// Put the taxpayer information on the output form 1040.
		//
		HTML.putUserOutput("f1040-1-filing-status",
			formatFilingStatus(this.filing_status), "text");
		HTML.putUserOutput("f1040-1-taxpayers-name",
			this.taxpayers_name, "text");
		HTML.putUserOutput("f1040-1-street-address",
			this.street_address, "text");
		if (this.city) {
			const state = this.state ? this.state : "CA";
			HTML.putUserOutput("f1040-1-city-state-zip",
				`${this.city}, ${state} ${this.zip_code}`.trim(), "text");
		} else {
			HTML.putUserOutput("f1040-1-city-state-zip","", "text");
		}

		if (this.taxpayers_birthday) {
			HTML.putUserOutput("f1040-1-taxpayers-birthday",
				`${this.taxpayers_birthday} (Age ${this.taxpayers_age})`, "text");
		} else {
			HTML.putUserOutput("f1040-1-taxpayers-birthday", "", "text");
		}
		if (this.spouses_birthday) {
			HTML.putUserOutput("f1040-1-spouses-birthday",
				`${this.spouses_birthday} (Age ${this.spouses_age})`, "text");
		} else {
			HTML.putUserOutput("f1040-1-spouses-birthday", "", "text");
		}
		HTML.putUserOutput("f1040-1-taxpayer-is-blind",
			this.is_taxpayer_blind ? "X" : "", "text");
		HTML.putUserOutput("f1040-1-spouse-is-blind",
			this.is_spouse_blind ? "X" : "", "text");
	}

	toPrint() {
		let lines	= [];
		const state	= this.state ? this.state : "CA";

		printLine(lines, "Filing Status",		this.filing_status);
		lines.push("");

		printLine(lines, "Taxpayer's Name",		this.taxpayers_name);
		printLine(lines, "Street Address",		this.street_address);
		printLine(lines, "City, State, Zip",	`${this.city}, state ${this.zip_code}`);
		printLine(lines, "Taxpayer's Birthday",
			`${this.taxpayers_birthday}, Age: ${this.taxpayers_age}`);
		printLine(lines, "Taxpayer Is Blind",	this.is_taxpayer_blind);

		if (this.filing_status === "MFJ") {
			printLine(lines, "Spouse's Birthday",
				`${this.spouses_birthday}, Age: ${this.spouses_age}`);
			printLine(lines, "Spouse Is Blind",	this.is_spouse_blind);
		}
		lines.push("");
		return lines.join("\n");
	}

	toString() {
		let str		= [];
		let title	= [];

		title.push(`Taxpayer`);

		const fields = Object.keys(this);
		for (const field of fields) {
			let value = this[field];
			if ((this.filing_status !== "MFJ") && field.match(/spouse/i)) {
				continue;
			}
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
