
function isUsed(obj) {
	if (!obj || typeof obj !== "object") {
		return false;
	}

	for (const value of Object.values(obj)) {
		if (value) {
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
		if (value) {
			newobj[key] = value;
		}
	}

	return newobj;
}

function toString(obj, pad=65) {
	let str = [];

	for (const key of Object.keys(obj)) {
		let s = key.padEnd(pad, " ") + obj[key];
		str.push(s);
	}

	return str.join("\n");
}

export const Objects = {
	isUsed,
	removeUnused,
	toString,
};

export {
	isUsed,
	removeUnused,
	toString,
};
