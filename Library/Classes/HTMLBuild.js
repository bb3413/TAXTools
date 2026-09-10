
//
// This module can be used to build a chunk of HTML code and insert
// it into the current web page (DOM).
//

export class HTMLBuild {
	constructor() {
		this._htmldoc		= [];
		this._id			= "";
		this._indent_level	= 0;
	}

	//
	// Getter methods
	//
	get htmldoc() {	return this._htmldoc };
	get id() {		return this._id };
	get indent() {	return "\t".repeat(this._indent_level * 1) };

	//
	// Setter methods
	//
	set htmldoc(doc) {
		if (typeof doc === "string") {
			this._htmldoc = [ doc ];
		} else if (Array.isArray(doc)) {
			// Careful; this is only a reference to the doc, so it can still be
			// modified outside the object.
			this._htmldoc = doc;
		} else {
			throw new Error("HTMLBuild.set htmldoc(): Invalid parameter.");
		}
	}

	set id(str) {
		this._id = str;
	}

	//
	// Methods
	//
	addElement(element, css_class, str, attributes="") {
		// Add a container element. Container elements wrap their value between start
		// and end tags.
		if (css_class) {
			attributes += attributes ? " " : "";
			attributes += `class="${css_class}"`
		}

		const line = `${this.indent}<${element} ${attributes}>${str}</${element}>`;
		this.htmldoc.push(line);
	}

	addVoidElement(element, css_class, str="", attributes="") {
		// Void elements do not have closing tags, so they specify their value in an
		// attribute.
		if (css_class) {
			attributes += attributes ? " " : "";
			attributes += `class="${css_class}"`
		}

		if (str || !attributes.match(/placeholder/i)) {
			attributes += attributes ? " " : "";
			attributes += `value="${str}"`
		}

		const line = `${this.indent}<${element} ${attributes} />`;
		this.htmldoc.push(line);
	}

	putAfter(element_id) {
		if (this.id) {
			throw new Error(`HTMLBuild.putAfter(): Document already put.`);
		}
		this.id = "HTMLBuildID-" + Math.floor(Math.random() * 1000);
		const start	= `<div id=${this.id}>\n`;
		const stop	= "</div>\n";
		const where	= "afterend";		// beforebegin, afterbegin, beforeend, afterend
		const whole_doc = start + this.htmldoc.join("\n") + stop;

		const element = document.getElementById(element_id);
		if (!element) {
			throw new Error(`HTMLBuild.putAfter(): Cannot find element(${element_id}).`);
		}
		element.insertAdjacentHTML(where, whole_doc);
		this.added = true;
	}

	remove() {
		if (!this.id) {
			return;	// Already removed.
		}
		const element = document.getElementById(this.id);
		if (element) {
			element.remove();
			this.id = "";
		} else {
			throw new Error(`HTMLBuild.remove(): Cannot find element to remove(${this.id})`);
		}
	}

	stopElement(element) {
		this._indent_level = Math.max(0, this._indent_level - 1);

		const line = `${this.indent}</${element}>`;
		this.htmldoc.push(line);
	}

	startElement(element, css_class="", str="", attributes="") {
		if (css_class) {
			attributes += attributes ? " " : "";
			attributes += `class="${css_class}"`
		}
		const line = `${this.indent}<${element} ${attributes}>${str}`;
		this.htmldoc.push(line);

		this._indent_level += 1;
	}

	toString() {
		return this.htmldoc.join("\n");
	}
}
