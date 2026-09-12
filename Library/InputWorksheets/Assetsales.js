
import { HTML }			from "../Modules/HTML.js";
import { Objects }		from "../Modules/Objects.js";
import { Str }			from "../Modules/Str.js";

const HTML_WORKSHEET = `
		<details class="taxform-details" id="assetsales-XX-container">
			<summary class="taxform-summary">Asset / Stock Sales</summary>
			<div>
				<input class="add-asset-sale-button center-text" type="button"
					id="add-asset-sale-button" value="Add Entry" />
			</div>
			<div class="input-worksheet-container">
				<div class="assetsales-container assetsales-header">
					<p class="center-text">Long Term</p>
					<p></p>
					<p></p>
					<p></p>
					<p></p>
				</div>
				<div class="assetsales-container assetsales-header">
					<p class="center-text">Transaction</p>
					<p>Name</p>
					<p>Proceeds</p>
					<p>Cost Basis</p>
					<p>Wash Sale</p>
				</div>
				<div id="assetsales-container">
				</div>
			</div>		<!-- input-worksheet-container -->
			<div>&nbsp;</div>
		</details>
`;

export class Assetsales {
	static getInputHTML(uid = 1) {
		if (!uid) {
			throw new Error(`Assetsales.getInputHTML(): UID is undefined.`);
		}

		const html = HTML_WORKSHEET.replace(/XX/g, uid);

		return [ `assetsales-${uid}-container`, html ];
	}

	static getUserInput(uid) {
		return {};
	}
}
