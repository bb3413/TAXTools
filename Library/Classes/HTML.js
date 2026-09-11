
import { Debug }	from "../Classes/Debug.js";
import { Num }		from "../Classes/Num.js";

const HTML = {
	closeDetails(element_id) {
		const element = document.getElementById(element_id);
		if (element) {
			element.open = false;
			// Another option: element.removeAttribute('open');
		}
	},

	closeAllDetails() {
		const elements = document.querySelectorAll("details");
		for (const element of elements) {
			if (element) {
				element.open = false;
				// Another option: element.removeAttribute('open');
			}
		}
	},

	openDetails(element_id) {
		const element = document.getElementById(element_id);
		if (element) {
			element.open = true;
		}
	},
	//-----  Show/hide element  ---------------------------------
	showElement(element_id) {
		const element = document.getElementById(element_id);
		if (!Debug.verify(element, "showElement: Element not found: " + element_id)) return;

		element.classList.remove('hidden');
	},

	hideElement(element_id) {
		const element = document.getElementById(element_id);
		if (!Debug.verify(element, "hideElement: Element not found: " + element_id)) return;

		element.classList.add('hidden');
	},

	//---- Change background/foreground color  ----------------------------------
	changeBackgroundColor(element_id, color) {
		const element = document.getElementById(element_id);
		if (!Debug.verify(element, "changeBackgroundColor: Element not found: " + element_id)) return;

		element.style.background = color;
	},

	changeTextColor(element_id, color) {
		const element = document.getElementById(element_id);
		if (!Debug.verify(element, "changeTextColor: Element not found: " + element_id)) return;

		element.style.color = color;
	},

	//-----  Get/put user input/output---------------------------------
	getUserInput(element_id, default_value = 0) {
		let value = HTML.getElementValue(element_id);
		if (typeof value === "boolean") {
			return value;
		}

		// Maybe some tools do not include the debug code.
		if (typeof Debug.getKeywords === "function") {
			// Extract debug keywords and return what is left.
			value = Debug.getKeywords(value);
		}

		if (default_value === "text") {
			return value;
		}

		// Process dollar sign, commas, and mathmatical expressions.
		return Num.toInteger(value);
	},

	putUserOutput(element_id, value, type = "") {
		if (type === "dollars") {
			// Add commas and prepend with dollar sign.
			HTML.putElementValue(element_id,
				"$" + Num.format(typeof value === "number" ? value : 0));

		} else if (typeof value === "number") {
			// Add commas.
			HTML.putElementValue(element_id, Num.format(value));

		} else {	// tpye === "text"
			// Put the value as is.
			HTML.putElementValue(element_id,
				value===undefined ? "" : value);
		}
	},

	//-----  Get/put element value  ---------------------------------
	//
	// Elements designed for user input, <inout>, <select> (drop down lists), and
	// <textarea>, have their content in the "value" attribute. Check boxes and radio
	// buttons have "true" or "false" in the "checked" attribute.
	//
	// Other elements use "textContent" and "innerText". The "textContent" attribute
	// returns the content of the element. The "innerText" attribute is not used often;
	// it returns the content as it is displayed. If the elemenet is hidden, it won"t
	// return the content.
	//
	getElementValue(element_id) {
		const element = document.getElementById(element_id);
		if (!Debug.verify(element, 
				"getElementValue: Element not found: " + element_id)) return;

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
	},

	putElementValue(element_id, value) {
		const element = document.getElementById(element_id);
		if (!Debug.verify(element, "putElementValue: Element not found: " + element_id)) return;

		if (String(element.placeholder) === String(value)) {
			value = "";
		}

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
	},

	//-----  Get/Put the Summary line in a <details> container.  -------------------------------
	findSummary(details_id) {
		if (!details_id) {
			return null;
		}
		return document.querySelector(`#${details_id} summary`);
	},

	getSummary(details_id) {
		const summary = HTML.findSummary(details_id);
		return summary ? summary.textContent : "";
	},

	putSummary(details_id, value) {
		const summary = HTML.findSummary(details_id);
		if (summary) {
			summary.textContent = value ?? "";
		}
	},

	//-----  Miscellaneous utility functions  ---------------------------------
	addListener(element_id, event, handler) {
		const element = document.getElementById(element_id);
		if (!Debug.verify(element, "addListener: Element not found: " + element_id)) return;

		element.addEventListener(event, handler);
	},

	getCSSGlobalVariable(variableName) {
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
	},

	remove(element_id) {
		const element = document.getElementById(element_id);
		if (element) {
			element.remove();
		}
	}
};

const {
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
	remove
} = HTML;

export {
	HTML,
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
	remove
};

if (typeof window !== "undefined") {
	window.HTML ??= HTML;
}
