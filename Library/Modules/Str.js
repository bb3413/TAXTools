
export const Str = {
	caseEqual,
	clean,
	downshift,
	empty,
	equal,
	prefixLines,
	upshift,
	wrap,
	wrapLines,
	upshiftFirst,
	camelCaseToEnglish,
	camelToSnakeCase,
	kebabToSnakeCase,
	snakeCaseToEnglish,
	snakeToCamelCase,
	snakeToKebabCase,
};

import { Ensure } from "../Modules/Ensure.js";

function caseEqual(s1, s2) {
	Ensure.isString(s1, "s1");
	Ensure.isString(s2, "s2");

	return s1.toLowerCase() === s2.toLowerCase();
}

function clean(s)  {
	Ensure.isString(s, "s");
	// Remove leading, trailing, and consecutive whitespace characters.
	return s.trim().replace(/\s+/g, " ");
}

function downshift(s) {
	Ensure.isString(s, "s");
	return s.toLowerCase();
}

function empty(s) {
	// Return true if:
	//		Null
	//		Undefined
	//		Empty ("")
	//		Contains only whitespace
	//
	// This helper is intentionally tolerant so callers can safely check
	// optional values without forcing a TypeError.
	if (s === null || s === undefined) {
		return true;
	}
	return !String(s).trim();
}

function equal(s1, s2) {
	Ensure.isString(s1, "s1");
	Ensure.isString(s2, "s2");
	return s1 === s2;
}

function prefixLines(prefix, str) {
	//
	// Add the prefix to the front of each string inside a string that contains multiple
	// lines (i.e., embedded newlines).
	//
	Ensure.isString(prefix, "prefix");
	Ensure.isString(str, "str");

	const lines = str.split("\n");
	for (let i = 0; i < lines.length; i++) {
		lines[i] = prefix + lines[i];
	}
	return lines.join("\n");
}

function upshift(s) {
	Ensure.isString(s, "s");
	return s.toUpperCase();
}

function wrap(str, maxLength = 80) {
	//
	// Wrap string into multiple lines by breaking on word boundaries.
	//
	Ensure.isString(str, "str");
	if (str === "") {
		return "";
	}
	if (!Number.isInteger(maxLength) || maxLength <= 0) {
		throw new TypeError("maxLength must be a positive integer.");
	}

	const leadingWhitespace = str.match(/^\s*/)[0];
	str = str.slice(leadingWhitespace.length);

	// Match words and the spaces following them
	const words = str.match(/\S+\s*/g) || [];
	const chunks = [];
	let currentChunk = "";

	for (const word of words) {
		// If a single word is somehow longer than the maxLength, we have to
		// force-break it.
		if (word.trim().length > maxLength) {
			if (currentChunk) chunks.push(currentChunk.trim());

			let remaining = word;
			while (remaining.length > maxLength) {
				chunks.push(remaining.slice(0, maxLength));
				remaining = remaining.slice(maxLength);
			}
			currentChunk = remaining;
			continue;
		}

		// Check if adding the next word exceeds the limit
		if ((currentChunk + word).trim().length > maxLength) {
			chunks.push(currentChunk.trim());
			currentChunk = word; // Start a new chunk with the current word
		} else {
			currentChunk += word;
		}
	}

	// Push the final remaining chunk if it exists
	if (currentChunk) {
		chunks.push(currentChunk.trim());
	}

	return leadingWhitespace + chunks.join("\n");
}

function wrapLines(str, maxLength = 80) {
	//
	// Wrap string with multiple lines (i.e., embedded newlines) into multiple lines by
	// breaking on word boundaries.
	//
	Ensure.isString(str, "str");
	const lines = str.split("\n");
	for (let i = 0; i < lines.length; i++) {
		lines[i] = wrap(lines[i], maxLength);
	}
	return lines.join("\n");
}

function upshiftFirst(str) {
	Ensure.isString(str, "str");
	if (str === "") {
		return "";
	}
	return str[0].toUpperCase() + str.slice(1);
}

function camelCaseToEnglish(name) {
	Ensure.isString(name, "name");
	if (name === "") {
		return "";
	}
	// Convert Camel case (abcDefGhi) to English (Abc def ghi) preserving acronyms.
	name = name
			// Insert space before capital letter when preceded by lowercase/number
			.replace(/([a-z0-9]+)([A-Z])/g, '$1 $2')
			// Insert space between acronym and starting word (e.g.,
			// "HTTPResponse" -> "HTTP Response")
			.replace(/([A-Z]+)([A-Z][a-z])/g, '$1 $2')
			// Insert space between letter followed by number
			.replace(/([A-Za-z]+)([0-9])/g, '$1 $2')
			// Insert space between number followed by letter
			.replace(/([0-9]+)([A-Za-z])/g, '$1 $2')
			.trim();

	name = upshiftFirst(name);
	return name;
}

function camelToSnakeCase(name) {
	Ensure.isString(name, "name");
	if (name === "") {
		return "";
	}
	// Convert camel case (abcDefGhi) to snake case (abc_def_ghi) preserving acronyms.
	return name
			// Insert underscore before capital letter when preceded by lowercase/number
			.replace(/([a-z0-9]+)([A-Z])/g, '$1_$2')
			// Insert underscore between acronym and starting word (e.g.,
			// "HTTPResponse" -> "HTTP Response")
			.replace(/([A-Z]+)([A-Za-z])/g, '$1_$2')
			// Insert underscore between letter followed by number
			.replace(/([A-Za-z]+)([0-9])/g, '$1_$2')
			// Insert underscore between number followed by letter
			.replace(/([0-9]+)([A-Za-z])/g, '$1_$2')
			.toLowerCase();
}

function kebabToSnakeCase(name) {
	Ensure.isString(name, "name");
	return name.replace(/-/g, "_");
}

function kebabToCamelCase(name) {
	Ensure.isString(name, "name");
	return snakeToCamelCase(name.replace(/-/g, "_"));
}

function snakeCaseToEnglish(name) {
	Ensure.isString(name, "name");
	if (name === "") {
		return "";
	}
	// Convert snake case (abc_def_ghi) to English (Abc def ghi).
	name = name.replace(/_/g, " ").trim();
	name = upshiftFirst(name);
	return name;
}

function snakeToCamelCase(name) {
	Ensure.isString(name, "name");
	if (name === "") {
		return "";
	}
	// Convert snake case (abc_def_ghi) to camel case (abcDefGhi).
	let newname = "";
	const words = name.split("_");
	for (const word of words) {
		if (newname === "") {
			newname = word;
		} else {
			newname += upshiftFirst(word);
		}
	}
	return newname;
}

function snakeToKebabCase(name) {
	Ensure.isString(name, "name");
	return name.replace(/_/g, "-");
}
