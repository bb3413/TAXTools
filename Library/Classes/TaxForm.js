 
//
// This is a template for all tax forms and worksheets.
//
import { TAXPAYER, SPOUSE }	from "../TAXTools/TAXTools.js";

import { Ensure }		from "../Modules/Ensure.js";
import { HTML }			from "../Modules/HTML.js";
import { HTMLBuild }	from "../Classes/HTMLBuild.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";

export class TaxForm {
	_ensureValidLine(lineno) {
		if ((typeof lineno !== "string") || (this.lines[lineno] === undefined)) {
			throw new Error(`Reference to undefined line: ${lineno}`);
		}

		return true;
	}

	constructor(formname) {
		Ensure.isString(formname);

		this.formname			= formname;
		this.title				= formname;
		this.calculated			= false;		// False => need to call calculate().
		this.is_spouses			= false;
		this.lines				= {};
	}

	add(...line_list) {
		let sum = 0;

		for (const lineno of line_list) {
			this._ensureValidLine(lineno);
			sum += this.lines[lineno].value;
		}

		return sum;
	}

	getHTML(uid) {
		Ensure.isNumber(uid);

		let html	= this.toHTML(uid);
		let id		= `${this.formname.toLowerCase()}-${uid}-container`;
		return [id, html];
	}

	isTaxpayers(who) {
		//
		// Tax forms belong to either the taxpayer or, if married, the spouse. Not all forms
		// collect this information. Any form that is not explicitly marked as belonging to
		// the spouse, will belong to the taxpayer.
		//
		Ensure.isNumber(who);

		const is_spouses = this.lines["is_spouses"] && this.lines["is_spouses"].value;
		if ((who === SPOUSE) && is_spouses) {
			return true;
		} else {
			return false;
		}
	}

	isUsed() {
		//
		// The form contains at least one non-empty line.
		//
		for (const lineno of Object.keys(this.lines)) {
			if (this.lines[lineno].value) {
				return true;
			}
		}
		return false;
	}

	line(lineno) {
		this._ensureValidLine(lineno);
		return this.lines[lineno].value;
	}

	loadInputFromWeb(inputs) {
		//
		// The inputs parameter is an object that contains all the input fields from the
		// form's web page. This method copies those fields to the corresponding locations
		// in this instance of the form.
		//
		// Forms that have additional fields on the web page besides the line values, they
		// will need to override this method (see form 1099-G for an example).
		//
		Ensure.isObject(inputs);

		for (const key of Object.keys(inputs)) {
			this._ensureValidLine(key);
			this.lines[key].user_value = inputs[key];
		}
	}

	min(...line_list) {
		//
		// Given a list of line numbers, return the value of the line with the
		// smallest value.
		//
		const values = [];

		for (const lineno of line_list) {
			this._ensureValidLine(lineno);
			values.push(this.lines[lineno].value);
		}

		return values.length ? Math.min(...values) : 0;
	}

	max(...line_list) {
		//
		// Given a list of line numbers, return the value of the line with the
		// largest value.
		//
		const values = [];

		for (const lineno of line_list) {
			this._ensureValidLine(lineno);
			values.push(this.lines[lineno].value);
		}

		return values.length ? Math.max(...values) : 0;
	}

	putInformation(uid) {
		//
		// Copy the information from the instance to the output HTML.
		//
		Ensure.isNumber(uid);

		const formname = this.formname.toLowerCase();

		for (const lineno of Object.keys(this.lines)) {
			HTML.putUserOutput(`${formname}-${uid}-${lineno}`, this.line(lineno));
		}
	}

	recalculate() {
		this.calculated = false;
		this.calculate();
	}

	round(lineno) {
		this._ensureValidLine(lineno);
		return Math.round(this.lines[lineno].value);
	}

	subtract(lineno1, lineno2) {
		this._ensureValidLine(lineno1);
		this._ensureValidLine(lineno2);

		return this.line(lineno1) - this.line(lineno2);
	}

	toConsole() {
		console.log(this.toString());
	}

	toHTML(uid = "99") {
		const formname	= this.formname.toLowerCase();
		const doc		= new HTMLBuild();

		doc.startElement("details", "taxform-details", "",
				`id="${formname}-${uid}-container"`);	// Start of details
			doc.addElement("summary", "taxform-summary", this.title);
			doc.startElement("div", "taxform-container");	// Start of taxform-container
				doc.addElement("div", "", "&nbsp;");		// Blank line
				for (const lineno of Object.keys(this.lines).sort()) {
					let attributes;
					let id;
					let line = this.lines[lineno];
					let placeholder = 0;
					if (typeof line.value === "string") {
						placeholder = "";
					}

					doc.startElement("div", "taxform-lno-desc-value");	// Start of line
						doc.addElement("p", "lineno", lineno);
						doc.addElement("p", "description", line.label);
						id=`${formname}-${uid}-${lineno}`;
						attributes = `readonly type="text" id="${id}" ` +
							`size="10" placeholder="${placeholder}"`;
						doc.addVoidElement("input", "output-field",
							String(line.value), attributes);
					doc.stopElement("div");					// End of line
				}
				doc.addElement("div", "", "&nbsp;");		// Blank line
			doc.stopElement("div");							// End of taxform-container
		doc.stopElement("details");							// End of details

		return doc.toString();
	}

	toPrint() {
		return this.toString();
	}

	toString() {
		let str		= [];
		let title	= [];

		title.push(`Form: ${this.formname}`);

		// Convert attributes
		for (const key of Object.keys(this)) {
			switch (key) {
				case "lines":
				case "formname":
				case "title":
				case "calculated":
					break;
				default:
					// Skip empty lines.
					if ((this[key] !== 0) && (this[key] !== "") && (this[key] !== false)) {
						let s = `  ${key}`;
						s = s.padEnd(65, ".") + this[key];
						str.push(s);
					}
					break;
			}	
		}

		// Convert lines
		const linenos = Object.keys(this.lines).sort();
		for (const lineno of linenos) {
			const line = this.lines[lineno];
			// Skip empty lines.
			if (line && (line.value !== 0) && (line.value !== "") && (line.value!==false)) {
				let s = `  line[${lineno}]`;
				s = s.padEnd(18, " ") + line.label;
				s = s.padEnd(65, ".") + line.value;
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
