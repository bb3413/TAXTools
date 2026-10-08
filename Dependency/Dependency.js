
import { Ensure }	from "../Library/Modules/Ensure.js";
import { HTML }		from "../Library/Modules/HTML.js";
import { Str }		from "../Library/Modules/Str.js";

// The source depends on the destination so the destination must be calculated first.
const DEPENDENCIES = {
	// Source		Destination - line being referenced
	"F1040.01a":	[ "W2.01" ],
	"F1040.01b":	[],
	"F1040.01c":	[],
	"F1040.01d":	[],
	"F1040.01e":	[ "F2441.26" ],
	"F1040.01f":	[ "F8839.26" ],
	"F1040.01g":	[ "F8919.06" ],
	"F1040.01h":	[],
	"F1040.01i":	[],
	"F1040.01z":	[ "F1040.01a", "F1040.01b", "F1040.01c", "F1040.01d", "F1040.01e", "F1040.01f", "F1040.01g", "F1040.01h" ],
	"F1040.02a":	[ "F1099INT.08", "F1099OID.11", "F1099DIV.12" ],
	"F1040.02b":	[ "F1099INT.01", "F1099OID.03", "F1099DIV.01" ],
	"F1040.03a":	[ "F1099DIV.01b" ],
	"F1040.03b":	[ "F1099DIV.01a" ],
	"F1040.04a":	[ "F1099R.01" ],
	"F1040.04b":	[ "F1099R.02a", "F8606.15c", "F8606.18", "F8606.25c" ],
	"F1040.05a":	[ "F1099R.01" ],
	"F1040.05b":	[ "F1099R.02a" ],
	"F1040.06a":	[ "SSAF1099.05" ],
	"F1040.06b":	[ "SSTax.18" ],
	"F1040.07a":	[ "F1099DIV.02a", "F1040SD.16", "F1040SD.21" ],
	"F1040.08":		[ "F1040S1.10" ],
	"F1040.09":		[ "F1040.01z", "F1040.02b", "F1040.03b", "F1040.04b", "F1040.05b", "F1040.06b", "F1040.07a", "F1040.08" ],
	"F1040.10":		[ "F1040S1.26" ],
	"F1040.11a":	[ "F1040.09", "F1040.10" ],
	"F1040.11b":	[ "F1040.11a" ],
	"F1040.12e":	[ "F1040SA.17" ],
	"F1040.13a":	[ "F8995.15" ],
	"F1040.13b":	[ "F1040S1A.38" ],
	"F1040.14":		[ "F1040.12e", "F1040.13a", "F1040.13b" ],
	"F1040.15":		[ "F1040.11b", "F1040.14" ],
	"F1040.16":		[ "IncTax.25" ],
	"F1040.17":		[ "F1040S2.03" ],
	"F1040.18":		[ "F1040.16", "F1040.17" ],
	"F1040.19":		[ "F8812.14" ],
	"F1040.20":		[ "F1040S3.08" ],
	"F1040.21":		[ "F1040.19", "F1040.20" ],
	"F1040.22":		[ "F1040.18", "F1040.21" ],
	"F1040.23":		[ "F1040S2.21" ],
	"F1040.24":		[ "F1040.22", "F1040.23" ],
	"F1040.25a":	[ "W2.02" ],
	"F1040.25b":	[ "F1099INT.04", "F1099DIV.04", "F1099G.04", "F1099K.04", "F1099MISC.04", "F1099NEC.04", "F1099OID.04", "F1099R.04", "SSAF1099.06" ],
	"F1040.25c":	[ "F8959.24" ],
	"F1040.25d":	[ "F1040.25a", "F1040.25b", "F1040.25c" ],
	"F1040.26":		[],
	"F1040.27a":	[ "EIC.XX" ],
	"F1040.28":		[ "F8812.27" ],
	"F1040.29":		[ "F8863.08" ],
	"F1040.30":		[ "F8839.13" ],
	"F1040.31":		[ "F1040S3.15" ],
	"F1040.32":		[ "F1040.27a", "F1040.28", "F1040.29", "F1040.30", "F1040.31" ],
	"F1040.33":		[ "F1040.25d", "F1040.26", "F1040.32" ],
	"F1040.34":		[ "F1040.33", "F1040.24" ],
	"F1040.35a":	[ "F1040.34", "F1040.36" ],
	"F1040.36":		[],
	"F1040.37":		[ "F1040.24", "F1040.33" ],
	"F1040.38":		[ "Penalty.XX" ],

	"F1040S1.01":	[ "F1099G.02" ],
	"F1040S1.02a":	[],
	"F1040S1.02b":	[],
	"F1040S1.03":	[ "F1040sc.31" ],
	"F1040S1.04":	[],
	"F1040S1.05":	[],
	"F1040S1.06":	[],
	"F1040S1.07":	[ "F1099G.01" ],
	"F1040S1.08a":	[],
	"F1040S1.08b":	[],
	"F1040S1.08c":	[],
	"F1040S1.08d":	[ "F2555.xx" ],
	"F1040S1.08e":	[ "F8853.xx" ],
	"F1040S1.08f":	[ "F8889.16" ],
	"F1040S1.08g":	[ "F8889.20" ],
	"F1040S1.08h":	[],
	"F1040S1.08i":	[],
	"F1040S1.08j":	[],
	"F1040S1.08k":	[],
	"F1040S1.08l":	[],
	"F1040S1.08m":	[],
	"F1040S1.08n":	[],
	"F1040S1.08o":	[],
	"F1040S1.08p":	[],
	"F1040S1.08q":	[],
	"F1040S1.08r":	[],
	"F1040S1.08s":	[ "W2.XX" ],
	"F1040S1.08t":	[],
	"F1040S1.08u":	[],
	"F1040S1.08v":	[],
	"F1040S1.08z":	[],
	"F1040S1.09":	[ "F1040S1.08a", "F1040S1.08b", "F1040S1.08c", "F1040S1.08d", "F1040S1.08e", "F1040S1.08f", "F1040S1.08g", "F1040S1.08h", "F1040S1.08i", "F1040S1.08j", "F1040S1.08k", "F1040S1.08l", "F1040S1.08m", "F1040S1.08n", "F1040S1.08o", "F1040S1.08p", "F1040S1.08q", "F1040S1.08r", "F1040S1.08s", "F1040S1.08t", "F1040S1.08u", "F1040S1.08v", "F1040S1.08z" ],
	"F1040S1.10":	[ "F1040S1.01", "F1040S1.02a", "F1040S1.03", "F1040S1.04", "F1040S1.05", "F1040S1.06", "F1040S1.07", "F1040S1.09" ],
	"F1040S1.11":	[],
	"F1040S1.12":	[],
	"F1040S1.13":	[ "F8889.13" ],
	"F1040S1.14":	[],
	"F1040S1.15":	[ "F1040SSE.13" ],
	"F1040S1.16":	[],
	"F1040S1.17":	[],
	"F1040S1.18":	[ "F1099INT.02" ],
	"F1040S1.19a":	[],
	"F1040S1.19b":	[],
	"F1040S1.19c":	[],
	"F1040S1.20":	[ "F1040.09", "F1040S1.11", "F1040S1.12", "F1040S1.14", "F1040S1.14", "F1040S1.15", "F1040S1.16", "F1040S1.17", "F1040S1.18", "F1040S1.19a", "F1040S1.23", "F1040S1.25" ],
	"F1040S1.21":	[ "F1099E.01", "F1040.09", "F1040S1.11", "F1040S1.12", "F1040S1.13", "F1040S1.14", "F1040S1.15", "F1040S1.16", "F1040S1.17", "F1040S1.18", "F1040S1.19a", "F1040S1.20", "F1040S1.23", "F1040S1.25" ],
	"F1040S1.22":	[],
	"F1040S1.23":	[],
	"F1040S1.24a":	[],
	"F1040S1.24b":	[],
	"F1040S1.24c":	[],
	"F1040S1.24d":	[],
	"F1040S1.24e":	[],
	"F1040S1.24f":	[],
	"F1040S1.24g":	[],
	"F1040S1.24h":	[],
	"F1040S1.24i":	[],
	"F1040S1.24j":	[],
	"F1040S1.24k":	[],
	"F1040S1.24z":	[],
	"F1040S1.25":	[ "F1040S1.24a", "F1040S1.24b", "F1040S1.24c", "F1040S1.24d", "F1040S1.24e", "F1040S1.24f", "F1040S1.24g", "F1040S1.24h", "F1040S1.24i", "F1040S1.24j", "F1040S1.24k", "F1040S1.24z" ],
	"F1040S1.26":	[ "F1040S1.11", "F1040S1.12", "F1040S1.13", "F1040S1.14", "F1040S1.15", "F1040S1.16", "F1040S1.17", "F1040S1.18", "F1040S1.19a", "F1040S1.20", "F1040S1.21", "F1040S1.22", "F1040S1.23", "F1040S1.25" ],
};

let loop_control = [];

function printLine(line, indentation) {
	let lines		= [];
	const spaces	= " ".repeat(indentation * 2);

	if (loop_control.includes(line) && DEPENDENCIES[line]) {
		lines.push(`${spaces}${line}: DEPENDENCY LOOP`);
	} else {
		lines.push(`${spaces}${line}`);
		loop_control.push(line);
		indentation += 1;
		if (DEPENDENCIES[line]) {
			for (const dependency of DEPENDENCIES[line]) {
				lines = lines.concat(printLine(dependency, indentation));
			}
		}
	}

	return lines;
}

function printDependencyTree(form) {
	let lines = [];
	for (const line of Object.keys(DEPENDENCIES).sort()) {
		if (line.startsWith(`${form}.`)) {
			loop_control = [];
			lines = lines.concat(printLine(line, 0));
		}
	}
	return lines;
}

function dependencyHandler(event) {
	try {
		const tree = printDependencyTree("F1040");
		HTML.putElementValue("output-message", tree.join("\n"));

	} catch (error) {
		HTML.putElementValue("error-message-output", error);
		console.log("Stack trace:", error.stack);
		document.getElementById("error-message-output").scrollIntoView();
	}
}

document.addEventListener("DOMContentLoaded", () => {
	HTML.addListener("dependency-button", "click", dependencyHandler);
});
