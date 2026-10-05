
export const HTML = {
	closeDetails,
	closeAllDetails,
	openDetails,

	showElement,
	hideElement,

	changeBackgroundColor,
	changeTextColor,

	getUserInput,
	putUserOutput,

	getElementValue,
	putElementValue,

	findSummary,
	getSummary,
	putSummary,

	addListener,
	getCSSGlobalVariable,
	remove,
	setFocus,
};

import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { Num }			from "../Modules/Num.js";

function closeDetails(element_id) {
	const element = Ensure.isValidElementID(element_id);
	element.open = false;
}

function closeAllDetails() {
	const elements = document.querySelectorAll("details");
	for (const element of elements) {
		element.open = false;
	}
}

function openDetails(element_id) {
	const element = Ensure.isValidElementID(element_id);
	element.open = true;
}

//-----  Show/hide element  -----------------------------------------------------------------
function showElement(element_id) {
	const element = Ensure.isValidElementID(element_id);
	element.classList.remove('hidden');
}

function hideElement(element_id) {
	const element = Ensure.isValidElementID(element_id);
	element.classList.add('hidden');
}

//---- Change background/foreground color  --------------------------------------------------
function changeBackgroundColor(element_id, color) {
	const element = Ensure.isValidElementID(element_id);
	element.style.background = color;
}

function changeTextColor(element_id, color) {
	const element = Ensure.isValidElementID(element_id);
	element.style.color = color;
}

//-----  Get/put user input/output  ---------------------------------------------------------
function getUserInput(element_id, type = "") {
	// type = "", "text", or "raw"
	let value = HTML.getElementValue(element_id);
	if ((type === "raw") || (typeof value === "boolean")) {
		return value;
	}

	// Maybe some tools do not include the debug code.
	if (typeof Debug.getKeywords === "function") {
		// Extract debug keywords and return what is left.
		value = Debug.getKeywords(value);
	}

	if (type === "text") {
		return value;
	}

	// Process dollar sign, commas, and mathematical expressions.
	return Num.toInteger(value);
}

function putUserOutput(element_id, value, type = "") {
	// type = "", "text", or "raw"
	if ((type !== "text") && (typeof value === "number")) {
		// Add commas.
		HTML.putElementValue(element_id, Num.format(value));

	} else {	// type is "text" or "raw"
		// Put the value as is.
		HTML.putElementValue(element_id,
			(value === undefined) ? "" : value);
	}
}

//-----  Get/put element value  -------------------------------------------------------------
//
// Elements designed for user input, <inout>, <select> (drop down lists), and
// <textarea>, have their content in the "value" attribute. Check boxes and radio
// buttons have "true" or "false" in the "checked" attribute.
//
// Other elements use "textContent" and "innerText". The "textContent" attribute
// returns the content of the element. The "innerText" attribute is not used often;
// it returns the content as it is displayed. If the element is hidden, it won"t
// return the content.
//
function getElementValue(element_id) {
	const element = Ensure.isValidElementID(element_id);

	if (element.type === "checkbox" || element.type === "radio") {
		return element.checked;
	}

	if (element.tagName === "SELECT" && element.multiple) {
		// If multiple selections are possible, value only gets the first one.
		// This functions returns them all.
		return Array.from(element.selectedOptions).map(opt => opt.value);
	}

	if ("value" in element) {
		// Get input, textarea, and selects elements.
		return element.value;
	}

	// Get other elements (div, span, p).
	return element.textContent;
}

function putElementValue(element_id, value) {
	const element = Ensure.isValidElementID(element_id);

	if (element.type === "checkbox" || element.type === "radio") {
		element.checked = Boolean(value);
		return;
	}

	if (element.tagName === "SELECT" && element.multiple && Array.isArray(value)) {
		// Restore selection where multiple selections are possible.
		for (const opt of Array.from(element.options)) {
			opt.selected = value.includes(opt.value);
		}
		return;
	}

	if ("value" in element) {
		// Restore input, textarea, and selects elements.
		element.value = value;
		return;
	}

	// Restore other elements (e.g., div, span, p).
	element.textContent = value;
	return;
}

//-----  Get/Put the Summary line in a <details> container.  --------------------------------
function findSummary(details_id) {
	if (!details_id) {
		return null;
	}
	return document.querySelector(`#${details_id} summary`);
}

function getSummary(details_id) {
	const summary = HTML.findSummary(details_id);
	return summary ? summary.textContent : "";
}

function putSummary(details_id, value) {
	const summary = HTML.findSummary(details_id);
	if (summary) {
		summary.textContent = value ?? "";
	}
}

//-----  Miscellaneous utility functions  ---------------------------------------------------
function addListener(element_id, event, handler) {
	const element = Ensure.isValidElementID(element_id);
	element.addEventListener(event, handler);
}

function getCSSGlobalVariable(variableName) {
	//
	// if you define a global variable in CSS, for example:
	//		:root {
	//			--background-color:			#AAAAAA;	// Gray
	//		}
	//
	// Then, if you pass "--background-color" to this function, it will
	// look up the variable and return "#AAAAAA".
	//

	// Read the CSS variable from the root (or from a specific element)
	const rootStyles = getComputedStyle(document.documentElement);
	const value = rootStyles.getPropertyValue(variableName).trim();

	return value;
}

function remove(element_id) {
	const element = Ensure.isValidElementID(element_id);
	element.remove();
}

function setFocus(element_id) {
	const element = Ensure.isValidElementID(element_id);
	element.focus();
}
