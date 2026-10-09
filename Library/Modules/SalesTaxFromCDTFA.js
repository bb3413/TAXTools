
export { fetchSalesTaxRate };

import { TAXTOOLS_URL, SALES_TAX_PROXY } from "../TAXTools/TAXTools.js";
import { Ensure } from "../Modules/Ensure.js";

async function fetchSalesTaxRate(address, city, zip) {
	// encodeURIComponent handles spaces and special characters like "#" safely
	const cleanAddress	= encodeURIComponent(address.trim());
	const cleanCity		= encodeURIComponent(city.trim());
	const cleanZip		= encodeURIComponent(zip.trim());
	let salesTaxRate	= 0;

	// Accessing the cdtfa.ca.gov server from the client results in a security error. The
	// proxy script runs on our server and accesses the cdtfa.ca.gov server for us.
	const url = SALES_TAX_PROXY +
		`?address=${cleanAddress}&city=${cleanCity}&zip=${cleanZip}`;

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Server responded with status: ${response.status}`);
		}

		const data = await response.json();
		if (data && data.taxRateInfo && data.taxRateInfo.length > 0) {
			salesTaxRate = (data.taxRateInfo[0].rate * 100).toFixed(3);
			console.log("Sales Tax Rate: ",			salesTaxRate);
			console.log("Sales Tax County: ",		data.taxRateInfo[0].county);
			console.log("Sales Tax Jurisdiction: ",	data.taxRateInfo[0].jurisdiction);
		}
	} catch (error) {
		console.error("fetchSalesTaxRate() Error:", error);
	}

	return salesTaxRate;
}
