
//
// This module manages blocks of HTML code that are added to the web page. The container
// is an existing, empty, HTML container on the web page that has been assigned a unique ID.
//
//		<div id="name-of-container">
//		</div>
//
// When a block of HTML code is added to the container, it must also be an HTML container
// with a unique ID. The ID of an entry should be prefixed with the name of the entry
// (id="name-somethingElse"). New entries will be added to the end of the container, unless
// there is already an enrty with the same name, in which case, the entry will be added
// after the last entry with the same name.
//
import { HTML }		from "../Modules/HTML.js";
import { Objects }	from "../Modules/Objects.js";
import { Str }		from "../Modules/Str.js";

// Web pages need unique IDs to include in their element IDs to avoid name collisions
// when the same HTML code is added more than once. The next_uid variable is indexed by
// classname so each class instance has its own series of UIDs starting at 1.
let next_uid = {};
let containers = [];

export class Container {
	constructor(container_id) {
		this.container_id	= container_id;
		this.entry_ids		= [];
		containers.push(this);
	}

	addEntry(html_id, html) {
		//
		// Add an entry into the container and insert its HTML into the web page element
		// identified by the container ID.
		//
		if (!html_id || !html) {
			throw new TypeError("Container.addEntry(): Missing parameter.");
		}

		let where_id	= this.container_id;	// ID of block to inset after.
		let where		= "beforeend";	// beforebegin, afterbegin, beforeend, afterend

		let last_found = -1;
		let new_name = html_id.split("-")[0];

		// Find the last block with the same name.
		for (let i = 0; i < this.entry_ids.length; i++) {
			const entry_id = this.entry_ids[i];
			const old_name = entry_id.split('-')[0];
			if (new_name === old_name) {
				last_found = i;
			}
		}

		if (last_found === -1) {
			this.entry_ids.push(html_id);	// Add to the end of the entries.
		} else {
			// Insert the new block after the last block with the same name.
			where_id	= this.entry_ids[last_found];
			where		= "afterend";
			this.entry_ids.splice(last_found+1, 0, html_id);
		}

		// Insert the HTML in the web page.
		const element = document.getElementById(where_id);
		if (!element) {
			throw new TypeError("Container.addEntry(): Logic error.");
		} else {
			element.insertAdjacentHTML(where, html);
		}
	}

	getEntries() {
		return this.entry_ids;
	}

	removeEntry(html_id) {
		this.entry_ids = this.entry_ids.filter(id => id !== html_id);
		HTML.remove(html_id);
	}

	reset() {
		for (const entry_id of this.entry_ids) {
			document.getElementById(entry_id).remove();
			const [ name, uid ] = Container.parseElementID(entry_id);
			const classname = Classes.findClassName(name);
			next_uid[Str.upshiftFirst(classname)]--;
		}
		this.entry_ids = [];
	}

	toString() {
		let str = [];
		str.push("Container ID: " + this.container_id);
		for (const entry_id of this.entry_ids) {
			const [ name, uid ] = Container.parseElementID(entry_id);
			const classname = Classes.findClassName(name);
			if (Classes.isInputForm(classname)) {
				str.push("  Entry: " + name);
				let inputs = Classes.getUserInput(classname, uid);
				if (Objects.isUsed(inputs)) {
					inputs = Objects.removeUnused(inputs);
					str.push(
						Str.prefixLines("    ", Objects.toString(inputs, 61)));
				}
			}
		}

		return str.join("\n") + "\n\n";
	}

	//
	// Static entries for managing UIDs.
	//
	static getContainers() {
		return containers;
	}

	static getUID(classname) {
		// Get a number that is unique to the name.
		let uid = next_uid[classname];

		if (uid) {
			next_uid[classname]++;
		} else {
			uid = 1;
			next_uid[classname] = 2;
		}

		return uid;
	}

	static listAllContainers() {
		// List the names of the containers for Debug.js.
		return containers.map(container => container.name);
	}

	static parseElementID(element_id) {
		// Returns:  [ name, uid ]
		if (!element_id || typeof element_id !== "string") {
			throw new TypeError("Container.parseElementID(): Logic error.");
		}
		const parts = element_id.split("-");
		const name = parts[0] || "";
		const uid = parts.length > 1 ? parts[1] : "0";
		return [ name, uid ];
	}

	static reset() {
		next_uid = {};
		containers = [];
	}
}
