
//
// This module manages the HTMLBlock objects. Each HTML block is a single chunk of
// HTML code that can be dynamically added or removed from the web page. This module
// keeps track of all the dynamically added HTML code.
//
import { Classes }		from "../Modules/Classes.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTML }			from "../Modules/HTML.js";

// The loaded_blocks object is indexed by block name. For each block name, it contains an
// array with all the instances of that block.
let loaded_blocks	= {};
let next_uid		= 0;
let html_mgr		= undefined;

export class HTMLMgr {
	constructor() {
		html_mgr = this;
	}

	addBlock(block, parent_id, where) {
		//
		// Add the HTML block into the web page. The parent_id parameter is the
		// element_id of the element to insert the HTML Block next to. The where parameter
		// indicates the relative position parent and must be one of the following strings:
		// beforebegin, afterbegin, beforeend, afterend.
		//
		Ensure.isObject(block);
		Ensure.isNonEmptyString(parent_id);
		Ensure.isNonEmptyString(where);

		// Add the block to the list of installed blocks.
		if (!loaded_blocks[block.name]) {
			loaded_blocks[block.name] = [];
		}
		loaded_blocks[block.name].push(block);

		// Put the HTML on the web page.
		const element = Ensure.isValidElementID(parent_id);
		element.insertAdjacentHTML(where, block.html);
	}

	allocateUID() {
		//
		// Get a unique ID for a block.
		//
		return next_uid++;
	}

	createBlock(block_class_name) {
		//
		// Create an HTML block given a string with its class name.
		//
		Ensure.isNonEmptyString(block_class_name);

		const classname = Classes.getClass(block_class_name);
		const block = new classname();

		return block;
	}

	createAndAddBlock(block_class_name, parent_id, where) {
		//
		// Create an HTML block given a string with its class name. Then, add it to the web
		// page. The parent_id is the element_id of the element to insert the HTML Block
		// next to. The where parameter indicates the relative position to the parent and
		// must be one of the following strings: beforebegin, afterbegin, beforeend,
		// afterend.
		//
		Ensure.isNonEmptyString(block_class_name);
		Ensure.isNonEmptyString(parent_id);
		Ensure.isNonEmptyString(where);

		const block = this.createBlock(block_class_name);
		this.addBlock(block, parent_id, where);

		return block;
	}

	getBlock(block_name) {
		Ensure.isString(block_name);

		const block_list = loaded_blocks[block_name];
		if (!block_list) {
			return undefined;
		}
		if (block_list.length !== 1) {
			throw new Error(`Expected exactly one block.`);
		}

		return block_list[0];	// Return the block, not an array.
	}

	getBlocks(block_name = "") {
		//
		// Return an array of blocks with the block name.
		//
		Ensure.isString(block_name);

		if (block_name !== "") {
			return loaded_blocks[block_name] ? loaded_blocks[block_name] : [];
		} else {
			let block_list = [];
			for (const block_name of Object.keys(loaded_blocks)) {
				block_list = block_list.concat(loaded_blocks[block_name]);
			}
			return block_list;
		}
	}

	static getMgr() {
		//
		// There is only one instance of the HTMLMgr. This static method will return a
		// reference to that instance.
		//
		if (!html_mgr) {
			html_mgr = new HTMLMgr();
		}
		return html_mgr;
	}

	lastBlock(block_name) {
		//
		// Find the last block of a particular type. This is used to add a block following
		// the last block of its type.
		//
		Ensure.isNonEmptyString(block_name);

		const block_list = loaded_blocks[block_name];
		let block = undefined;

		if (block_list && block_list.length > 0) {
			block = block_list[block_list.length - 1];
		}

		return block;
	}
	
	removeBlock(block) {
		Ensure.isObject(block);

		let block_list = loaded_blocks[block.name];
		const index = block_list.indexOf(block);
		if (index === -1) {
			throw new Error(`Cannot find block to remove: ${block.name}`);
		}
		
		block_list = [...block_list.slice(0, index), ...block_list.slice(index+1)];
		loaded_blocks[block.name] = block_list;

		HTML.remove(block.getID());
	}

	removeOutputForms() {
		for (const block of this.getBlocks()) {
			const formname = block.getFormname();
			if (Classes.isOutputForm(formname)) {
				this.removeBlock(block);
			}
		}
	}

	reset() {
		//
		// Reset to the HTMLMgr to its original state.
		//
		for (const block_name of Object.keys(loaded_blocks)) {
			const block_list = loaded_blocks[block_name];
			for (const block of block_list) {
				HTML.remove(block.getID());
			}
		}

		loaded_blocks	= {};
		next_uid		= 0;
		html_mgr		= undefined;
	}
}