
export const Alert = { slowAlert };
export { slowAlert };

import { Ensure } from "../Modules/Ensure.js";

function slowAlert(message) {
	// Wrap the alert in a brief timeout so it moves behind refreshing the
	// display in priority; allow the SalesTaxRate field to finish being cleared.
	const text = message === undefined ? "" : String(message);
	setTimeout(() => { alert(text); }, 10);
}

