
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
import { HTML }		from "../Classes/HTML.js";
import { Str }		from "../Classes/Str.js";

// Web pages need unique IDs to include in their element IDs to avoid name collisions
// when the same HTML code is added more than once. Thnext_uid variable is indexed by
// name so each name has its own series of UIDs starting at 1.
let next_uid = {};

export class Container {
	constructor(container_id) {
		this.container_id	= container_id;
		this.entry_ids		= [];
	}

	addEntry(html_id, html) {
		let where_id	= this.container_id;	// ID of block to inset after.
		let where		= "beforeend";	// beforebegin, afterbegin, beforeend, afterend

		let last_found = -1;
		let new_name = html_id.split("-")[0];

		// Find the last block with the same name.
		for (let i = 0; i < this.entry_ids.length; i++) {
			const old_name = this.entry_ids[i].split('-')[0];
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
		element.insertAdjacentHTML(where, html);
	}

	getEntries() {
		return this.entry_ids;
	}

	removeEntry(html_id) {
		this.entry_ids = this.entry_ids.filter(item => item !== html_id);
		HTML.remove(html_id);
	}

	reset() {
		for (const container_id of this.entry_ids) {
			document.getElementById(container_id).remove();
			const [ name, uid ] = Container.parseElementID(container_id);
			next_uid[Str.upshiftFirst(name)]--;
		}
		this.entry_ids = [];
	}

	//
	// Static entries for managing UIDs.
	//
	static getUID(name) {
		// Get a number that is unique to the name.
		let uid = next_uid[name];

		if (uid) {
			next_uid[name]++;
		} else {
			uid = 1;
			next_uid[name] = 2;
		}

		return uid;
	}

	static parseElementID(element_id) {
		// Returns:  [ name, uid ]
		const parts = element_id.split("-");
		return [ parts[0], parts[1].replace(/-/g, "") ];
	}

	static reset() {
		next_uid = {};
	}
}
