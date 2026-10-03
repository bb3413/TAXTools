
import { Dates }		from "../Modules/Dates.js";
import { Num }			from "../Modules/Num.js";

export class Ensure {

	//
	// Variable type checks.
	//
	static isArray(param, msg="") {
		if (!Array.isArray(param)) {
			throw new TypeError(msg ? msg : "Expected an array.");
		}
		
		return true;
	}

	static isNumber(param, msg="") {
		if (typeof param !== "number") {
			throw new TypeError(msg ? msg : "Expected a number.");
		}
		
		return true;
	}

	static isObject(param, msg="") {
		if (Array.isArray(param) || typeof param !== "object") {
			throw new TypeError(msg ? msg : "Expected an object.");
		}
		
		return true;
	}

	static isString(param, msg="") {
		if (typeof param !== "string") {
			throw new TypeError(msg ? msg : "Expected a string.");
		}
		
		return true;
	}

	static isType(variable, type, msg="") {
		// typeof: "string", "number", "boolean", "undefined", "object", "bigint", "symbol",
		// "function". For historical reasons, typeof null === "object".
		if (typeof variable === type) {
			throw new TypeError(msg ? msg : `Expected ${variable} to be a ${type}.`);
		}

		return true;
	}

	//
	// Check validity of complex variable type.
	//
	static isValidDate(date, msg="") {
		if (!Dates.isValid(date)) {
			throw new TypeError(msg ? msg : ("Invalid date: " + date));
		}

		return true;
	}
	
	static isValidElementID(element_id, msg="") {
		const element = document.getElementById(element_id);
		if (!element) {
			throw new TypeError(msg ? msg : ("Invalid element ID: " + element_id));
		}

		return true;
	}

	static isValidNumber(num, msg="") {
		if (!Num.isNum(num)) 
			throw new TypeError(msg ? msg : ("Invalid number: " + num));
		}

		return true;
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