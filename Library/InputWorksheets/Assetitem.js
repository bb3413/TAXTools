
// Classes
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";

// Modules
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
						<div class="assetsales-container" id="assetitem-XX">
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

const FIELD_INFO = {
	// Field Name		Value Type	Is Line	Description
	"long-term":		["",		false,	""],
	"name":				["text",	false,	""],
	"proceeds":			["",		false,	""],
	"basis":			["",		false,	""],
	"wash-sale":		["",		false,	""],
};

export class Assetitem extends HTMLBlock {
	static getFieldInfo() {
		return FIELD_INFO;
	}

	static getHTML(uid) {
		return HTML_CODE.replace(/XX/g, uid)
							.replace(/202X/g, TaxTable.getTaxYear());
	}

	constructor() {
		super();
		this.name		= "assetitem";
		this.uid		= HTMLMgr.getMgr().allocateUID(this.name);
		this.html		= Assetitem.getHTML(this.uid);
		this.fields		= Assetitem.getFieldInfo();
	}
}
