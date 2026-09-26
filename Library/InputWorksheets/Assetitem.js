
import { HTML }			from "../Modules/HTML.js";
import { Objects }		from "../Modules/Objects.js";
import { Str }			from "../Modules/Str.js";

const ELEMENTS = {
	// Element ID			Value Type
	"long-term":			[],
	"name":					["text"],
	"proceeds":				[],
	"basis":				[],
	"wash-sale":			[],
};

const HTML_WORKSHEET = `
						<div class="assetsales-container" id="assetitem-XX-container">
							<input class="trigger input-field" type="checkbox"
								id="assetitem-XX-long-term" size="10"
								tooltipid="#assetitem-long-term-tt" />
							<input class="trigger input-field left" type="text"
								id="assetitem-XX-name" size="10" placeholder=""
								tooltipid="#assetitem-name-tt" />
							<input class="trigger input-field" type="text"
								id="assetitem-XX-proceeds" size="10" placeholder="0"
								tooltipid="#assetitem-proceeds-tt" />
							<input class="trigger input-field" type="text"
								id="assetitem-XX-basis" size="10" placeholder="0"
								tooltipid="#assetitem-basis-tt" />
							<input class="trigger input-field" type="text"
								id="assetitem-XX-wash-sale" size="10" placeholder="0"
								tooltipid="#assetitem-wash-sale-tt" />
						</div>
`;

export class Assetitem {
	static getInputHTML(uid) {
		if (!uid) {
			throw new Error(`Assetitem.getInputHTML(): UID is undefined.`);
		}

		const html = HTML_WORKSHEET.replace(/XX/g, uid);

		return [ `assetitem-${uid}-container`, html ];
	}

	static getUserInput(uid) {
		//
		// Read the fields of the worksheet from the web and return an object with the
		// values.
		//
		if (!uid) {
			throw new Error(`Assetitem.getUserInput(): UID is undefined.`);
		}

		// Make sure the worksheet exists.
		const element = document.getElementById(`assetitem-${uid}-container`);
		if (!element) {
			throw new Error(
				`Assetitem.getUserInput(): Element not found: assetitem-${uid}-container`);
		}

		let inputs = {};
		for (const field_name of Object.keys(ELEMENTS)) {
			const value_type	= ELEMENTS[field_name][0];
			const key_name		= field_name.replace(/-/g, "_");
			const element_id	= `assetitem-${uid}-${field_name}`;
			inputs[key_name]	= HTML.getUserInput(element_id, value_type);
		}

		return inputs;
	}

	static putUserOutput(inputs, uid) {
		//
		// Copy the value of the fields from the inputs object to the web.
		//
		for (const key_name of Object.keys(inputs)) {
			const element_name	= key_name.replace(/_/g, "-");
			const element_id	= `assetitem-${uid}-${element_name}`;
			if (document.getElementById(element_id)) {
				HTML.putUserOutput(element_id, inputs[key_name]);
			}
		}
	}
}
