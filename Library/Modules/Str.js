
const _expectString = (value, name = "value") => {
	if (typeof value !== "string") {
		throw new TypeError(`${name} must be a string.`);
	}
	return value;
};

const caseEqual = (s1, s2) => {
	s1 = _expectString(s1, "s1");
	s2 = _expectString(s2, "s2");
	return s1.toLowerCase() === s2.toLowerCase();
};

const clean = (s) => {
	s = _expectString(s, "s");
	// Remove leading, trailing, and consecutive whitespace characters.
	return s.trim().replace(/\s+/g, " ");
};

const downshift = (s) => {
	s = _expectString(s, "s");
	return s.toLowerCase();
};

const empty = (s) => {
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
};

const equal = (s1, s2) => {
	s1 = _expectString(s1, "s1");
	s2 = _expectString(s2, "s2");
	return s1 === s2;
};

const prefixLines = (prefix, str) => {
	//
	// Add the prefix to the front of each string inside a string that contains multiple
	// lines (i.e., embedded newlines).
	//
	prefix	= _expectString(prefix, "prefix");
	str		= _expectString(str, "str");

	const lines = str.split("\n");
	for (let i = 0; i < lines.length; i++) {
		lines[i] = prefix + lines[i];
	}
	return lines.join("\n");
};

const upshift = (s) => {
	s = _expectString(s, "s");
	return s.toUpperCase();
};

const wrap = (str, maxLength = 80) => {
	//
	// Wrap string into multiple lines by breaking on word boundaries.
	//
	str = _expectString(str, "str");
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
};

const wrapLines = (str, maxLength = 80) => {
	//
	// Wrap string with multiple lines (i.e., embedded newlines) into multiple lines by
	// breaking on word boundaries.
	//
	str = _expectString(str, "str");
	const lines = str.split("\n");
	for (let i = 0; i < lines.length; i++) {
		lines[i] = wrap(lines[i], maxLength);
	}
	return lines.join("\n");
};

const upshiftFirst = (str) => {
	str = _expectString(str, "str");
	if (str === "") {
		return "";
	}
	return str[0].toUpperCase() + str.slice(1);
};

const camelCaseToEnglish = (name) => {
	name = _expectString(name, "name");
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
};

const camelToSnakeCase = (name) => {
	name = _expectString(name, "name");
	if (name === "") {
		return "";
	}
	// Convert camel case (abcDefGhi) to snake case (abc_def_ghi) preserving acronyms.
	return name
			// Insert underbar before capital letter when preceded by lowercase/number
			.replace(/([a-z0-9]+)([A-Z])/g, '$1_$2')
			// Insert underbar between acronym and starting word (e.g.,
			// "HTTPResponse" -> "HTTP Response")
			.replace(/([A-Z]+)([A-Za-z])/g, '$1_$2')
			// Insert underbar between letter followed by number
			.replace(/([A-Za-z]+)([0-9])/g, '$1_$2')
			// Insert underbar between number followed by letter
			.replace(/([0-9]+)([A-Za-z])/g, '$1_$2')
			.toLowerCase();
};

const kebabToSnakeCase = (name) => {
	name = _expectString(name, "name");
	return name.replace(/-/g, "_");
};

const kebabToCamelCase = (name) => {
	name = _expectString(name, "name");
	return snakeToCamelCase(name.replace(/-/g, "_"));
};

const snakeCaseToEnglish = (name) => {
	name = _expectString(name, "name");
	if (name === "") {
		return "";
	}
	// Convert snake case (abc_def_ghi) to English (Abc def ghi).
	name = name.replace(/_/g, " ").trim();
	name = upshiftFirst(name);
	return name;
};

const snakeToCamelCase = (name) => {
	name = _expectString(name, "name");
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
};

const snakeToKebabCase = (name) => {
	name = _expectString(name, "name");
	return name.replace(/_/g, "-");
};

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

export {
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
