
import { Dates }	from "../Library/Classes/Dates.js";
import { HTML }		from "../Library/Classes/HTML.js";
import { Num }		from "../Library/Classes/Num.js";

let start			= "";
let end				= "";
let age				= 0;
let input_color		= "";
let output_color	= "";

function ageHandler(event) {
	try {
		HTML.putElementValue("error-message-output", "");

		age = HTML.getUserInput("Age", "text");
		if (age === "")
			return;

		age = Num.toInteger(age);

		if (start) {
			calculateEndDate(start, age);
		} else if (end) {
			calculateStartDate(end, age);
		}
	} catch (error) {
		HTML.putElementValue("error-message-output", error);
		console.log("Stack trace:", error.stack);
		document.getElementById("error-message-output")
			.scrollIntoView({ behavior: 'smooth', block: 'start' });
	}
}

function calculateAge(start, end) {
	age = Dates.getAge(start, end);
	HTML.putUserOutput("Age", age);

	HTML.changeBackgroundColor("Start",	input_color);
	HTML.changeBackgroundColor("End",	input_color);
	HTML.changeBackgroundColor("Age",	output_color);
}

function calculateEndDate(start, age) {
	const start_date	= new Date(start);
	const end_date		= new Date(start);
	const start_year	= start_date.getFullYear();

	end_date.setYear(start_year + age);
	end = end_date.toLocaleDateString();
	HTML.putUserOutput("End", end);

	HTML.changeBackgroundColor("Start",	input_color);
	HTML.changeBackgroundColor("End",	output_color);
	HTML.changeBackgroundColor("Age",	input_color);
}

function calculateStartDate(end, age) {
	const end_date		= new Date(end);
	const start_date	= new Date(end);
	const end_year		= end_date.getFullYear();

	start_date.setYear(end_year - age);
	start = start_date.toLocaleDateString();
	HTML.putUserOutput("Start", start);

	HTML.changeBackgroundColor("Start",	output_color);
	HTML.changeBackgroundColor("End",	input_color);
	HTML.changeBackgroundColor("Age",	input_color);
}

function endHandler(event) {
	try {
		HTML.putElementValue("error-message-output", "");

		end = HTML.getUserInput("End", "text");
		if (!Dates.getDateObject(end)) {
			if (end) {
				throw new Error("Invalid date: " + end);
			}
			return;
		}

		if (start) {
			calculateAge(start, end);
		} else if (age) {
			calculateStartDate(end, age);
		}
	} catch (error) {
		HTML.putElementValue("error-message-output", error);
		console.log("Stack trace:", error.stack);
		document.getElementById("error-message-output").scrollIntoView();
	}
}

function startHandler(event) {
	try {
		HTML.putElementValue("error-message-output", "");

		start = HTML.getUserInput("Start", "text");
		if (!Dates.getDateObject(start)) {
			if (start) {
				throw new Error("Invalid date: " + start);
			}
			return;
		}

		if (end) {
			calculateAge(start, end);
		} else if (age) {
			calculateEndDate(start, age);
		}
	} catch (error) {
		HTML.putElementValue("error-message-output", error);
		console.log("Stack trace:", error.stack);
		document.getElementById("error-message-output").scrollIntoView();
	}
}

document.addEventListener("DOMContentLoaded", () => {
	// Wait for the DOM to be fully loaded before trying to access any elements.

	HTML.addListener("Start",	"change",	startHandler);
	HTML.addListener("End",		"change",	endHandler);
	HTML.addListener("Age",		"change",	ageHandler);

	output_color	= HTML.getCSSGlobalVariable("--output-color");
	input_color		= HTML.getCSSGlobalVariable("--input-color");

	end = new Date().toLocaleDateString();	// Today's date
	HTML.putUserOutput("End", end);
});
