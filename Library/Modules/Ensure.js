
//
// The functions in this module are used to validate parameters. They all throw an exception
// if they fail. Most if the functions return the parameter unchanged if they succeed. The
// exceptions are the expression checks return true and the following functions return an
// object.
//
//		isValidElementID()	returns an element object
//		isValidDate()		returns an date object
//
// There are several similar function listed below that return true or false to indicate
// success or failure.
//
//		Dates.isValid()
//		HTML.isValidElementID()
//		Num.isNum()
//		Objects.isUsed()
//		Objects.isEmpty()
//		Str.empty()
//		TaxForm._ensureValidLine() - throws exception if not valid
//		TaxTable.isValidTaxYear()
//
export const Ensure = {
	isArray,
	isNumber,
	isObject,
	isString,
	isType,

	isFilingStatus,
	isNonEmptyString,
	isNonZeroNumber,
	isTaxpayer,
	isValidDate,
	isValidElementID,
	isValidNumber,

	expression,
	isFalse,
	isTrue,
};

import { SINGLE, HOH, MFJ, QSS, MFS }	from "../TAXTools/TAXTools.js";
import { TAXPAYER, SPOUSE }				from "../TAXTools/TAXTools.js";

import { Dates }		from "../Modules/Dates.js";
import { Num }			from "../Modules/Num.js";

//
//-----  Check validity of basic variable types  --------------------------------------------
//
function isArray(param, param_name="") {
	if (!Array.isArray(param)) {
		param_name = param_name ? param_name : "value";
		throw new TypeError(`Expected ${param_name} to be an array.`);
	}
		
	return param;
}

function isNumber(param, param_name="") {
	if ((typeof param !== "number") || (!Number.isFinite(param))) {
		param_name = param_name ? param_name : "value";
		throw new TypeError(`Expected ${param_name} to be a number.`);
	}
	
	return param;
}

function isObject(param, param_name="") {
	if (Array.isArray(param) || typeof param !== "object") {
		param_name = param_name ? param_name : "value";
		throw new TypeError(`Expected ${param_name} to be an object.`);
	}
		
	return param;
}

function isString(param, param_name="") {
	if (typeof param !== "string") {
		param_name = param_name ? param_name : "value";
		throw new TypeError(`Expected ${param_name} to be a string.`);
	}
		
	return param;
}

function isType(param, type, param_name="") {
	// typeof: "string", "number", "boolean", "undefined", "object", "bigint", "symbol",
	// "function". For historical reasons, typeof null === "object".
	if (typeof param === type) {
		param_name = param_name ? param_name : "value";
		throw new TypeError(`Expected ${param_name} to be a ${type}.`);
	}

	return param;
}

//
//-----  Check validity of complex variable types  ------------------------------------------
//
function isFilingStatus(param, param_name="") {
	isNumber(param, param_name);

	switch (param) {
		case SINGLE:
		case HOH:
		case MFJ:
		case QSS:
		case MFJ:
			break;
		default:
			param_name = param_name ? param_name : "value";
			throw new TypeError(`Expected ${param_name} to be a filing status constant.`);
	}

	return param;
}

function isNonEmptyString(param, param_name="") {
	if ((typeof param !== "string") || (param === "")) {
		param_name = param_name ? param_name : "value";
		throw new TypeError(`Expected ${param_name} to be a non-empty string.`);
	}
		
	return param;
}

function isNonZeroNumber(param, param_name="") {
	if ((typeof param !== "number") || (!Number.isFinite(param)) || (param === 0)) {
		param_name = param_name ? param_name : "value";
		throw new TypeError(`Expected ${param_name} to be a non-zero number.`);
	}
	
	return param;
}

function isTaxpayer(param, param_name="") {
	isNumber(param, param_name);

	switch (param) {
		case TAXPAYER:
		case SPOUSE:
			break;
		default:
			param_name = param_name ? param_name : "value";
			throw new TypeError(`Expected ${param_name} to be a taxpayer constant.`);
	}

	return param;
}

function isValidDate(date, msg="") {
	date = Dates.getDateObject(date);
	if (!date) {
		throw new TypeError(msg ? msg : ("Invalid date: " + date));
	}

	return date;
}

function isValidElementID(element_id, msg="") {
	const element = document.getElementById(element_id);
	if (!element) {
		throw new TypeError(msg ? msg : ("Invalid element ID: " + element_id));
	}

	return element;
}

function isValidNumber(num, msg="") {
	if (!Num.isNum(num)) {
		throw new TypeError(msg ? msg : ("Invalid number: " + num));
	}

	return num;
}

//
//-----  Expression evaluation checks  ------------------------------------------------------
//
function expression(expression, msg="") {
	if (!expression) {
		throw new Error(msg ? msg : "Expected expression to be true.");
	}
	
	return true;
}

function isFalse(expression, msg="") {
	if (expression) {
		throw new Error(msg ? msg : "Expected expression to be false.");
	}

	return true;
}

function isTrue(expression, msg="") {
	if (!expression) {
		throw new Error(msg ? msg : "Expected expression to be true.");
	}

	return true;
}
