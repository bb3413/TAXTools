 
//
// This module ...
//
import { TAXPAYER, SPOUSE }	from "../TAXTools/TAXTools.js";
import { Ensure }		from "../Modules/Ensure.js";

export class TaxForm {
	constructor(formname) {
		this.calculated			= false;
		this.owner				= TAXPAYER;
		this.lines				= {};
	}

	calculate() {
		formname.getFields
	}
}
