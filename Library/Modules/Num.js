
import { Eval }		from "../Modules/Eval.js";
import { Str }		from "../Modules/Str.js";

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

export class Num {
	static format(num) {
		// Convert a number to a comma separated string, formatted for output.
		return _expectFiniteNumber(num, "num").toLocaleString();
	}

	static isNum(num) {
		// Returns true if num is a valid finite number; otherwise, false.
		if (num === null || num === undefined || num === "") {
			return false;
		}
		const n = Number(num);
		return Number.isFinite(n);
	}

	static limit(value, minval = null, maxval = null) {
		value = _coerceFiniteNumber(value, "value");

		if (minval !== null && minval !== undefined && minval !== "") {
			value = Math.max(value, _coerceFiniteNumber(minval, "minval"));
		}

		if (maxval !== null && maxval !== undefined && maxval !== "") {
			value = Math.min(value, _coerceFiniteNumber(maxval, "maxval"));
		}

		return value;
	}

	static toInteger(str) {
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
}
