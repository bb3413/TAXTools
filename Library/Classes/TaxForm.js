
//
// This is a template for all tax forms and worksheets.
//
import { Debug }		from "../Classes/Debug.js";
import { HTML }			from "../Classes/HTML.js";
import { HTMLBuild }	from "../Classes/HTMLBuild.js";

export class TaxForm {
	constructor(formname) {
		this.formname		= formname;
		this.title			= formname;
		this.lines			= {};
		this.calculated		= false;		// True => need to call calculate().
	}

	add(...index_list) {
		let sum = 0;

		for (let index of index_list) {
			sum += this.lines[index].value
		}

		return sum;
	}

	getOutputHTML(uid) {
		let html	= this.toHTML(uid);
		let id		= `${this.formname.toLowerCase()}-${uid}-container`;
		return [ id, html ];
	}

	isUsed() {
		for (const lineno of Object.keys(this.lines)) {
			if (this.line(lineno)) {
				return true;
			}
		}
		return false;
	}

	line(lineno) {
		return this.lines[lineno].value;
	}

	min(...index_list) {
		let values = [];

		for (let index of index_list) {
			values.push(this.lines[index].value);
		}

		return Math.min(...values);
	}

	max(...index_list) {
		let values = [];

		for (let index of index_list) {
			values.push(this.lines[index].value);
		}

		return Math.max(...values);
	}

	putInformation(uid) {
		//
		// Copy the information from the instance to the output HTML.
		//
		const formname = this.formname.toLowerCase();

		if (!uid) {
			throw new Error(`${formname}.putInformation(): UID is undefined.`);
		}

		for (const lineno of Object.keys(this.lines)) {
			HTML.putUserOutput(`${formname}-${uid}-${lineno}`, this.line(lineno));
		}
	}

	round(index) {
		return Math.round(this.lines[index].value);
	}

	subtract(lineno1, lineno2) {
		return this.lines[lineno1].value - this.lines[lineno2].value;
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
			doc.startElement("div", "taxform-container");	// Start of taxform-contianer
				doc.addElement("div", "", "&nbsp;");		// Blank line
				for (const lineno of Object.keys(this.lines).sort()) {
					let attributes;
					let id;
					let line = this.lines[lineno];

					doc.startElement("div", "taxform-lno-desc-value");	// Start of line
						doc.addElement("p", "lineno", lineno);
						doc.addElement("p", "description", line.label);
						id=`${formname}-${uid}-${lineno}`;
						attributes = `readonly type="text" id="${id}" ` +
							'size="10" placeholder="0"';
						doc.addVoidElement("input", "output-field",	line.value, attributes);
					doc.stopElement("div");					// End of line
				}
				doc.addElement("div", "", "&nbsp;");		// Blank line
			doc.stopElement("div");							// End of taxform-contianer
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

		const linenos = Object.keys(this.lines).sort();
		for (const lineno of linenos) {
			let line = this.lines[lineno];
			if (line.value || Debug.verbose()) {	// Skip empty lines.
				let s = `	line[${lineno}]`;
				s = s.padEnd(18, " ") + line.label;
				s = s.padEnd(65, " ") + line.value;
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
