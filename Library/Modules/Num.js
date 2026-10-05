
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

const _expectFiniteNumber = (value, name = "value") => {
	if (typeof value !== "number" || !Number.isFinite(value)) {
		throw new TypeError(`${name} must be a finite number.`);
	}
	return value;
};

const _coerceFiniteNumber = (value, name = "value") => {
	if (value === null || value === undefined || value === "") {
		throw new TypeError(`${name} must be a finite number.`);
	}
	const num = Number(value);
	if (!Number.isFinite(num)) {
		throw new TypeError(`${name} must be a finite number.`);
	}
	return num;
};

function format(num) {
	// Convert a number to a comma separated string, formatted for output.
	return _expectFiniteNumber(num, "num").toLocaleString();
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
	value = _coerceFiniteNumber(value, "value");

	if (min_val !== null && min_val !== undefined && min_val !== "") {
		value = Math.max(value, _coerceFiniteNumber(min_val, "min_val"));
	}

	if (max_val !== null && max_val !== undefined && max_val !== "") {
		value = Math.min(value, _coerceFiniteNumber(max_val, "max_val"));
	}

	return value;
}

function round2(num) {
	// Round to a string with 2 decimal places, then convert back to a number.
	return  parseFloat(num.toFixed(2));
}

function toInteger(str) {
	// Convert the string to a number. If the string contains commas, dollar
	// signs, or whitespace they will be removed. The string is then evaluated
	// as a mathematical expression. The string will then be converted to a
	// number or zero if it is not a number. Then, it will be rounded to the
	// nearest whole number.
	if (str === null || str === undefined) {
		return 0;
	}
	if (typeof str !== "string") {
		throw new TypeError("str must be a string.");
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
