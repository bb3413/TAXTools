
//
// This is a template for all tax forms and worksheets.
//
import { Debug }		from "../Modules/Debug.js";
import { HTML }			from "../Modules/HTML.js";
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

		for (const index of index_list) {
			if (this.lines[index] !== undefined) {
				sum += this.lines[index].value;
			}
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
			if (this.lines[lineno] !== undefined && this.lines[lineno].value !== undefined) {
				return true;
			}
		}
		return false;
	}

	line(lineno) {
		const line = this.lines[lineno];
		return line ? line.value : 0;
	}

	min(...index_list) {
		const values = [];

		for (const index of index_list) {
			if (this.lines[index] !== undefined) {
				values.push(this.lines[index].value);
			}
		}

		return values.length ? Math.min(...values) : 0;
	}

	max(...index_list) {
		const values = [];

		for (const index of index_list) {
			if (this.lines[index] !== undefined) {
				values.push(this.lines[index].value);
			}
		}

		return values.length ? Math.max(...values) : 0;
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
		if (this.lines[index] === undefined) {
			return 0;
		}
		return Math.round(this.lines[index].value);
	}

	subtract(lineno1, lineno2) {
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

		const linenos = Object.keys(this.lines).sort();
		for (const lineno of linenos) {
			const line = this.lines[lineno];
			if (line && (line.value !== 0 || Debug.verbose())) {	// Skip empty lines.
				let s = `  line[${lineno}]`;
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
