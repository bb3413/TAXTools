
//
// This module ...
//

export const HTMLMgr = {
	getMgr,
	reset,
};

import { Ensure }		from "../Modules/Ensure.js";

// The blocks object is indexed by block name. For each block, it contains an array with all
// the instances of that block.
let blocks = {};
// The next_uid object is indexed by block name. For each block, it contains the value of the
// next UID to assign for that block name.
let next_uid = {};
let html_block_mgr = undefined;

export HTMLBlockMgr {
	constructor() {
		html_block_mgr = this;
	}

	static getMgr() {
		if (!html_block_mgr) {
			html_block_mgr = new HTMLBlockMgr();
		}
		return html_block_mgr;
	}

	getUID(block_name) {
		// Get a number that is unique to the name.
		Ensure.isNonEmptyString(block_name);

		let uid = next_uid[block_name];

		if (uid) {
			next_uid[block_name]++;
		} else {
			uid = 1;
			next_uid[block_name] = 2;
		}

		return uid;
	}

	reset() {
		for (const block_name of Object.keys(blocks)) {
			const block_list = blocks[block_name];
			for (const block of block_list) {
				block.uninstall();
			}
		}
		let blocks = {};
		let next_uid = {};
		let html_block_mgr = undefined;
	}
}