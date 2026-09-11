
function isUsed(obj) {
		if (!obj || typeof obj !== "object") {
			return false;
		}

		for (const value of Object.values(obj)) {
			if (value !== null && value !== undefined && value !== "") {
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
			if (value !== null && value !== undefined && value !== "") {
				newobj[key] = value;
			}
		}

		return newobj;
}

export const Objects = { isUsed, removeUnused };
export { isUsed, removeUnused };

if (typeof window !== "undefined") {
	window.Objects ??= Objects;
}
