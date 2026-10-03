
export class Ensure {
	static isNumber(param, msg="") {
		if (typeof param !== "number") {
			throw new TypeError("Expected a number" + (msg ? `: ${msg}` : "."));
		}
		
		return true;
	}

	static isString(param, msg="") {
		if (typeof param !== "string") {
			throw new TypeError("Expected a string" + (msg ? `: ${msg}` : "."));
		}
		
		return true;
	}

	static isArray(param, msg="") {
		if (!Array.isArray(param)) {
			throw new TypeError("Expected an array" + (msg ? `: ${msg}` : "."));
		}
		
		return true;
	}

	static isObject(param, msg="") {
		if (Array.isArray(param) || typeof param !== "object") {
			throw new TypeError("Expected an object" + (msg ? `: ${msg}` : "."));
		}
		
		return true;
	}

	static expression(expression, msg) {
		if (!expression) {
			throw new Error(msg);
		}
		
		return true;
	}
}