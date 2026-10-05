
export const Objects = {
	isEmpty,
	isUsed,
	removeUnused,
	toString,
};

import { Ensure } from "../Modules/Ensure.js";

function isEmpty(obj) {
	return !Objects.isUsed(obj);
}

function isUsed(obj) {
	if (!obj || typeof obj !== "object") {
		return false;
	}

	for (const value of Object.values(obj)) {
		if ((value !== 0) && (value !== "") && (value !== false)) {
			return true;
		}
	}

	return false;
}

function removeUnused(obj) {
	if (!obj || typeof obj !== "object") {
		return {};
	}

	const newobj = {};
	for (const key of Object.keys(obj)) {
		const value = obj[key];
		if ((value !== 0) && (value !== "") && (value !== false)) {
			newobj[key] = value;
		}
	}

	return newobj;
}

function toString(obj, pad=65) {
	let str = [];

	for (const key of Object.keys(obj)) {
		let s = key.padEnd(pad, ".") + obj[key];
		str.push(s);
	}

	return str.join("\n");
}
