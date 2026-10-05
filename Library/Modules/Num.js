
export const Num = {
	format,
	isNum,
	limit,
	round2,
	toInteger,
};

import { Ensure }		from "../Modules/Ensure.js";
import { Eval }			from "../Modules/Eval.js";
import { Str }			from "../Modules/Str.js";

function format(num) {
	// Convert a number to a comma separated string, formatted for output.
	Ensure.isNumber(num);
	return num.toLocaleString();
}

function isNum(num) {
	// Returns true if num is a valid finite number; otherwise, false.
	if (num === null || num === undefined || num === "") {
		return false;
	}
	const n = Number(num);
	return Number.isFinite(n);
}

function limit(value, min_val = null, max_val = null) {
	Ensure.isNumber(value);
	
	if (isNum(min_val)) {
		value = Math.max(value, min_val);
	}
	if (isNum(max_val)) {
		value = Math.max(value, max_val);
	}

	return value;
}

function round2(num) {
	// Round to a string with 2 decimal places, then convert back to a number.
	Ensure.isNumber(value);
	return parseFloat(num.toFixed(2));
}

function toInteger(str) {
	// Convert the string to a number. If the string contains commas, dollar
	// signs, or whitespace they will be removed. The string is then evaluated
	// as a mathematical expression. The string will then be converted to a
	// number or zero if it is not a number. Then, it will be rounded to the
	// nearest whole number.
	if (str === null || str === undefined || str === "") {
		return 0;
	}
	if (typeof str !== "string") {
		throw new TypeError("toInteger: parameter must be a string.");
	}

	const clean_str = str.replace(/[$,\s]/g, "");
	if (Str.empty(clean_str))
		return 0;

	let num;
	try {
		num = Eval.expression(clean_str);
	} catch {
		return 0;
	}

	if (!Number.isFinite(num))
		num = 0;

	return Math.round(num);
}
