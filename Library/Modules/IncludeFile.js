
//
// This function allows an HTML file to include another file using a statement
// like this:
//
//		<div include-file="filename"> Missing IncludeFile.js </div>
//
// The way this works is the function scans the document for HTML elements with
// the attribute "include-file". Any element that is found is replaced with the
// file named as the value of the attribute.
//
// Problems:
//		- Do not use document.write() in an included file; it will wipe out the
//			entire page.
//		- If the HTML file is opened by double clicking on it, the fetch command
//			will fail for security reasons. The file needs to be loaded from a
//			server.
//

async function loadIncludes(container = document, depth = 0) {
	const MAX_DEPTH = 5; // Prevent accidental recursion
	if (depth > MAX_DEPTH) {
		console.error("Recursive include limit reached. Check for circular references.");
		return;
	}

	// Find all the special include statements.
	const elements = container.querySelectorAll("[include-file]");

	const tasks = Array.from(elements).map(async (el) => {
		const filename = el.getAttribute("include-file");
		try {
			const response = await fetch(filename);
			const file_content = await response.text();

			// Insert the included file content into the element.
			el.innerHTML = file_content;
			el.removeAttribute("include-file"); // Not really necessary

			// Manually execute any script elements found in the included file.
			// This is necessary if there are script elements in the included file.
			// The browser parses them into the document, but does not execute
			// them for security reasons. This block creates a new script element,
			// copies the contents of the old script element, and appends the new
			// script element to the document, which the browser will execute when it
			// is added.
			const scripts = el.querySelectorAll("script");
			scripts.forEach(oldScript => {
				const newScript = document.createElement("script");

				// Copy all attributes (like src, type, etc.)
				Array.from(oldScript.attributes).forEach(attr => {
					newScript.setAttribute(attr.name, attr.value);
				});

				// Copy the actual code inside the script tag
				newScript.appendChild(document.createTextNode(oldScript.innerHTML));

				// Append it to the document to trigger its execution
				oldScript.parentNode.replaceChild(newScript, oldScript);
			});

			// Recursively call to search the new file.
			await loadIncludes(el, depth + 1);
		} catch (error) {
			console.error(`Failed to load ${filename}:`, error);
			// Put an error message where the file should have been included.
			el.innerHTML = `<span style="color:red">Error loading ${filename}</span>`;
		}
	});

	// Wait for all includes at the current level (and their children) to finish
	await Promise.all(tasks);

	// Initialization code for other JavaScript files may start running before this
	// function has finished loading the include files. That is, the DOMContentLoaded
	// event has occurred, but this function is still loading files. This section
	// resend the DOMContentLoaded event so they JavaScripts will re-execute their
	// initialization code.
	//
	// Since this function is recursive, only trigger this event when the top level
	// is finished.
	if (depth === 0) {
		// console.log("All nested includes finished. Triggering DOMContentLoaded.");
		const DOMReadyEvent = new Event("DOMContentLoaded", {
			bubbles: true,
			cancelable: true
		});

		// Most shared scripts listen to document, but some listen to window
		document.dispatchEvent(DOMReadyEvent);
		window.dispatchEvent(DOMReadyEvent);
	}
}

const IncludeFile = {
	loadIncludes
};

// The following statement does not work because it will invoke loadIncludes() as the
// event handler, which, in turn, causes it to receive an event object as its first
// parameter.
//
// window.onload = loadIncludes;
//
// Instead, this statement passes an anonymous function as the event handler, which,
// in turn, calls loadIncludes() without a parameter so loadIncludes() will use its
// default parameter values.
if (typeof window !== "undefined") {
	window.onload = () => loadIncludes();
	window.IncludeFile ??= IncludeFile;
}

export { IncludeFile, loadIncludes };
