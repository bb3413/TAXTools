
import { Ensure } from "../Modules/Ensure.js";

export const MAX_DOLLAR			= 99999999;
export const MIN_DOLLAR			= -99999999;

// The TAXTOOL_CONTAINER is the attribute ID of an HTML block element that encloses the
// entire web page. All TAXTools use the same IDs for the following containers.
export const TAXTOOL_CONTAINER			= "taxtool-container";
export const ERROR_MESSAGE_CONTAINER	= "error-message-container";
export const ERROR_MESSAGE_OUTPUT		= "error-message-output";
export const DEBUG_CONTAINER			= "debug-container";
export const DEBUG_OUTPUT				= "debug-output";

// URLs
export const TAXTOOLS_URL		= "https://www.bruceblinn.com/6-OtherStuff/Taxes/TAXTools/";
export const SALES_TAX_PROXY	= TAXTOOLS_URL + "Library/TAXTools/CDTFA-Proxy.php";

// Filing Status
export const SINGLE				= 0;
export const HOH				= 1;
export const MFJ				= 2;
export const QSS				= 3;
export const MFS				= 4;

// Which Taxpayer
export const TAXPAYER			= 0;
export const SPOUSE				= 1;

// Filenames for Save/Restore
export const AMT_SAVE_FILE				= "AMT.txt";
export const CA_SALES_TAX_SAVE_FILE		= "CA_SalesTax.txt";
export const ESTIMATED_TAX_SAVE_FILE	= "EstimatedTax.txt";
export const ESTIMATED_TAX_CA_SAVE_FILE	= "EstimatedTax_CA.txt";
export const SMALL_BUSINESS_SAVE_FILE	= "SmallBusiness.txt";
export const SS_TAXABLE_SAVE_FILE		= "TaxableSS.txt";
export const SS_LUMP_SUM_SAVE_FILE		= "LumpSumSS.txt";
export const STATE_REFUND_SAVE_FILE		= "StateRefund.txt";
export const TAX_PROGRAM_SAVE_FILE		= "TaxReturn.txt";

export function strToFilingStatus(filing_status) {
	Ensure.isString(filing_status);

	switch (filing_status.toUpperCase()) {
		case "SINGLE":	return SINGLE;
		case "HOH":		return HOH;
		case "MFJ":		return MFJ;
		case "QSS":		return QSS;
		case "MFS":		return MFS;
		default:
			throw new Error("TT.strToFilingStatus: Invalid filing_status: " + filing_status);
	}

	return 0;
}

export function filingStatusToStr(filing_status) {
	Ensure.isNumber(filing_status);

	switch (filing_status) {
		case SINGLE:	return "Single";
		case HOH:		return "HoH";
		case MFJ:		return "MFJ";
		case QSS:		return "QSS";
		case MFS:		return "MFS";
		default:
			throw new Error("TT.filingStatusToStr: Invalid filing_status: " + filing_status);
	}

	return "";
}

