
import { Dates }		from "../Modules/Dates.js";
import { Num }			from "../Modules/Num.js";

export class Ensure {
	//
	// Variable type checks.
	//
	static isArray(param, param_name="") {
		if (!Array.isArray(param)) {
			param_name = param_name ? param_name : "value";
			throw new TypeError(`Expected ${param_name} to be an array.`);
		}
		
		return param;
	}

	static isNumber(param, param_name="") {
		if ((typeof param !== "number") || (!Number.isFinite(param))) {
			param_name = param_name ? param_name : "value";
			throw new TypeError(`Expected ${param_name} to be a number.`);
		}
		
		return param;
	}

	static isObject(param, param_name="") {
		if (Array.isArray(param) || typeof param !== "object") {
			param_name = param_name ? param_name : "value";
			throw new TypeError(`Expected ${param_name} to be an object.`);
		}
		
		return param;
	}

	static isString(param, param_name="") {
		if (typeof param !== "string") {
			param_name = param_name ? param_name : "value";
			throw new TypeError(`Expected ${param_name} to be a string.`);
		}
		
		return param;
	}

	static isType(param, type, param_name="") {
		// typeof: "string", "number", "boolean", "undefined", "object", "bigint", "symbol",
		// "function". For historical reasons, typeof null === "object".
		if (typeof param === type) {
			param_name = param_name ? param_name : "value";
			throw new TypeError(`Expected ${param_name} to be a ${type}.`);
		}

		return param;
	}

	//
	// Check validity of complex variable type.
	//
	static isValidDate(date, msg="") {
		if (!Dates.isValid(date)) {
			throw new TypeError(msg ? msg : ("Invalid date: " + date));
		}

		return date;
	}
	
	static isValidElementID(element_id, msg="") {
		const element = document.getElementById(element_id);
		if (!element) {
			throw new TypeError(msg ? msg : ("Invalid element ID: " + element_id));
		}

		return element;
	}

	static isValidNumber(num, msg="") {
		if (!Num.isNum(num)) {
			throw new TypeError(msg ? msg : ("Invalid number: " + num));
		}

		return num;
	}

	//
	// Expression evaluation checks.
	//
	static expression(expression, msg="") {
		if (!expression) {
			throw new Error(msg ? msg : "Expected expression to be true.");
		}
		
		return true;
	}

	static isFalse(expression, msg="") {
		if (expression) {
			throw new Error(msg ? msg : "Expected expression to be false.");
		}

		return true;
	}

	static isTrue(expression, msg="") {
		if (!expression) {
			throw new Error(msg ? msg : "Expected expression to be true.");
		}

		return true;
	}
}