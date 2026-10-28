
import { Debug }		from "../Modules/Debug.js";
import { Ensure }		from "../Modules/Ensure.js";
import { HTMLBlock }	from "../Classes/HTMLBlock.js";
import { HTMLMgr }		from "../Classes/HTMLMgr.js";
import { TaxTable }		from "../Modules/TaxTable.js";

const HTML_CODE = `
`;

const FIELD_INFO = {
	// Field Name	Value Type	Is Line	Description
	"01ad":			["",		true,	"Short-term proceeds from 1099-B"],
	"01ae":			["",		true,	"Short-term cost from 1099-B"],
	"01ag":			["",		true,	"Short-term adjustments from 1099-B"],
	"01ah":			["",		true,	"Short-term gain or loss from 1099-B"],
	// Box A or G checked
	"01bd":			["",		true,	"Short-term proceeds from 8949"],
	"01be":			["",		true,	"Short-term cost from 8949"],
	"01bg":			["",		true,	"Short-term adjustments from 8949"],
	"01bh":			["",		true,	"Short-term gain or loss from 8949"],
	// Box B or H checked
	"02d":			["",		true,	"Short-term proceeds from 8949"],
	"02e":			["",		true,	"Short-term cost from 8949"],
	"02g":			["",		true,	"Short-term adjustments from 8949"],
	"02h":			["",		true,	"Short-term gain or loss from 8949"],
	// Box C or I checked.
	"03d":			["",		true,	"Short-term proceeds from 8949"],
	"03e":			["",		true,	"Short-term cost from 8949"],
	"03g":			["",		true,	"Short-term adjustments from 8949"],
	"03h":			["",		true,	"Short-term gain or loss from 8949"],

	"04":			["",		true,	"Short-term gain from 6252, 4684, 6781, 8824"],
	"05":			["",		true,	"Net short-term from K-1"],
	"06":			["",		true,	"Short-term capital loss carryover"],
	"07":			["",		true,	"Net short-term capital gain"],

	"08ad":			["",		true,	"Long-term proceeds from 1099-B"],
	"08ae":			["",		true,	"Long-term cost from 1099-B"],
	"08ag":			["",		true,	"Long-term adjustments from 1099-B"],
	"08ah":			["",		true,	"Long-term gain or loss from 1099-B"],
	// Box D or J checked
	"08bd":			["",		true,	"Long-term proceeds from 8949"],
	"08be":			["",		true,	"Long-term cost from 8949"],
	"08bg":			["",		true,	"Long-term adjustments from 8949"],
	"08bh":			["",		true,	"Long-term gain or loss from 8949"],
	// Box E or K checked
	"09d":			["",		true,	"Long-term proceeds from 8949"],
	"09e":			["",		true,	"Long-term cost from 8949"],
	"09g":			["",		true,	"Long-term adjustments from 8949"],
	"09h":			["",		true,	"Long-term gain or loss from 8949"],
	// Box F or L checked
	"10d":			["",		true,	"Long-term proceeds from 8949"],
	"10e":			["",		true,	"Long-term cost from 8949"],
	"10g":			["",		true,	"Long-term adjustments from 8949"],
	"10h":			["",		true,	"Long-term gain or loss from 8949"],

	"11":			["",		true,	"LT Gain from 4797, 2439, 6252, 4684, 6781, 8824"],
	"12":			["",		true,	"Net long-term gain from K-1"],
	"13":			["",		true,	"Capital gain distribution"],
	"14":			["",		true,	"Long-term capital loss carryover"],
	"15":			["",		true,	"Net long-term capital gain"],
	"16":			["",		true,	"Total Gain or loss"],
	"17":			["",		true,	"Lines 15 and 16 > 0"],
	"18":			["",		true,	"28% Rate Gain worksheet, line 7"],
	"19":			["",		true,	"Un-recaptured Section 1250 worksheet, line 18"],
	"20":			["",		true,	"Lines 18 and 19 = 0"],
	"21":			["",		true,	"Line 16 < 0"],
	"22":			["",		true,	"Qualified dividends"],
}

export class F1040SD_HTML extends HTMLBlock {
	static getFieldInfo() {
		return FIELD_INFO;
	}

	static getHTML(uid) {
		throw new Error("getHTML() not implemented for F1040SD.");
	}

	constructor() {
		super();
		this.name		= "f1040sd";
		this.uid		= HTMLMgr.getMgr().allocateUID(this.name);
		this.html		= "";
		this.fields		= F1040SD_HTML.getFieldInfo();
	}
}
