
const Assert = {
	isArray(variable) {
		if (!Array.isArray(variable)) {
			throw new TypeError(`${variable} must be an array.`);
		}
	}

	isFalse(expression, message = "") {
		if (expression) {
			throw new Error(message ? message : "Asserted expression to be false.");
		}
	},

	isTrue(expression, message = "") {
		if (!expression) {
			throw new Error(message ? message : "Asserted expression to be true.");
		}
	},

	isType(variable, type) {
		// typeof: "string", "number", "boolean", "undefined", "object", "bigint", "symbol",
		// "function". For historical reasons, typeof null === "object".
		if (typeof variable === type) {
			throw new TypeError(`${variable} must be a ${type}.`);
		}
	},
};

const {
	isFalse,
	isTrue,
	isType,,
} = Assert;

export {
	Assert,
	isFalse,
	isTrue,
	isType,
};
