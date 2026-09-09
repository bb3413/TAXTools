
/* There is one version number that is used for all the tax tools. This is useful because
 * there is a lot of shared code between the tools. The shared code is in the Library
 * folders.
 *
 * This file defines the version mnumber of the tax tools in the variable below. The variable
 * can be displayed in HTML code using a section of code similar to this:
 *
 *		<p class="version-number">Version: <a href="../Version/Version.html">
 *			<span id="tax-tools-version"></span></a></p>
 *
 * In addition to inserting the version number in the paragraph, this code makes the version
 * number a clickable link so that when it is clicked, the version log is displayed.
 */

const tax_tools_version		= "2025.15.022@";

function Initialize() {
	// Find the version number by its ID.
	 const version_element = document.getElementById("tax-tools-version");

	// If it exist on the current page, update the version text.
	if (version_element) {
		version_element.textContent = tax_tools_version;
	}
}

// Startup code
if (document.readyState === "loading") {
	// The DOM is still loading, wait for it to finish
	document.addEventListener("DOMContentLoaded", Initialize);
} else {
	// The DOM is already loaded
	Initialize();
}
