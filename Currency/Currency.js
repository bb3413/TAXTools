
import { HTML }			from "../Library/Modules/HTML.js";
import { TaxTable }		from "../Library/Modules/TaxTable.js";

let input_color				= "";
let output_color			= "";

let canada_exchange_rate	= 0;
let euro_exchange_rate		= 0;
let pound_exchange_rate		= 0;
let us_dollars				= 0;

function convert() {
	HTML.putUserOutput("us-dolars",		Math.round(us_dollars));
	HTML.putUserOutput("canada-dolars",	Math.round(us_dollars * canada_exchange_rate));
	HTML.putUserOutput("euros",			Math.round(us_dollars * euro_exchange_rate));
	HTML.putUserOutput("uk-pounds",		Math.round(us_dollars * pound_exchange_rate));
}

function fromUSDollars(event) {
	us_dollars = HTML.getUserInput("us-dolars");

	HTML.changeBackgroundColor("us-dolars",		input_color);
	HTML.changeBackgroundColor("canada-dolars",	output_color);
	HTML.changeBackgroundColor("euros",			output_color);
	HTML.changeBackgroundColor("uk-pounds",		output_color);

	convert();	// Convert from US to others denominations.
}

function fromCanadaDollars(event) {
	us_dollars = HTML.getUserInput("canada-dolars") / canada_exchange_rate;

	HTML.changeBackgroundColor("us-dolars",		output_color);
	HTML.changeBackgroundColor("canada-dolars",	input_color);
	HTML.changeBackgroundColor("euros",			output_color);
	HTML.changeBackgroundColor("uk-pounds",		output_color);

	convert();	// Convert from US to others denominations.
}

function fromEuros(event) {
	us_dollars = HTML.getUserInput("euro") / euro_exchange_rate;

	HTML.changeBackgroundColor("us-dolars",		output_color);
	HTML.changeBackgroundColor("canada-dolars",	output_color);
	HTML.changeBackgroundColor("euros",			input_color);
	HTML.changeBackgroundColor("uk-pounds",		output_color);

	convert();	// Convert from US to others denominations.
}

function fromPounds(event) {
	us_dollars = HTML.getUserInput("uk-pounds") / pound_exchange_rate;

	HTML.changeBackgroundColor("us-dolars",		output_color);
	HTML.changeBackgroundColor("canada-dolars",	output_color);
	HTML.changeBackgroundColor("euros",			output_color);
	HTML.changeBackgroundColor("uk-pounds",		input_color);

	convert();	// Convert from US to others denominations.
}

function taxYearHandler(event) {
	const tax_year = HTML.getUserInput("tax-year");
	const tt = TaxTable.getTaxTable(tax_year);

	canada_exchange_rate	= tt.getTaxValue("CanadaExchangeRate");
	euro_exchange_rate		= tt.getTaxValue("EuroExchangeRate");
	pound_exchange_rate		= tt.getTaxValue("PoundExchangeRate");

	HTML.putElementValue("us-dolars",		"");
	HTML.putElementValue("canada-dolars",	"");
	HTML.putElementValue("euros",			"");
	HTML.putElementValue("uk-pounds",		"");

	HTML.changeBackgroundColor("us-dolars",		input_color);
	HTML.changeBackgroundColor("canada-dolars",	input_color);
	HTML.changeBackgroundColor("euros",			input_color);
	HTML.changeBackgroundColor("uk-pounds",		input_color);
}

document.addEventListener("DOMContentLoaded", () => {
	//
	// Wait for the DOM to be fully loaded before trying to access any elements.
	//

	// Listen for changes to the input data.
	HTML.addListener("tax-year",		"change", taxYearHandler);
	HTML.addListener("us-dolars",		"change", fromUSDollars);
	HTML.addListener("canada-dolars",	"change", fromCanadaDollars);
	HTML.addListener("euros",			"change", fromEuros);
	HTML.addListener("uk-pounds",		"change", fromPounds);

	output_color	= HTML.getCSSGlobalVariable("--output-color");
	input_color		= HTML.getCSSGlobalVariable("--input-color");

	// Initialize the exchange rates.
	taxYearHandler();	// Initialize
});
