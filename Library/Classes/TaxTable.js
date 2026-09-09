
import { Dates }			from "../Classes/Dates.js";
import { TaxTable_2024 }	from "../Classes/TaxTable_2024.js";
import { TaxTable_2025 }	from "../Classes/TaxTable_2025.js";
import { TaxTable_2026 }	from "../Classes/TaxTable_2026.js";

let tax_table		= undefined;
let tax_table_year	= undefined;

export class TaxTable {
	static getTaxTable(tax_year) {
		if (!tax_year) {
			// If the tax year as not specified, return the current tax table.
			return tax_table;
		}

		tax_year = Number(tax_year);
		if (tax_table && (tax_table_year === tax_year)) {
			// If the parameters match the current tax table, return it.
			return tax_table;
		}

		tax_table		= undefined;
		tax_table_year	= tax_year;

		if (tax_year === 2024) {
			tax_table = new TaxTable_2024();
		} else if (tax_year === 2025) {
			tax_table = new TaxTable_2025();
		} else if (tax_year === 2026) {
			tax_table = new TaxTable_2026();
		} else {
			throw new Error(`Invalid tax year: ${tax_year}`);
		}

		return tax_table;
	}

	static getTaxYear() {
		// This is implemented as both a staticand instance method.
		return tax_table_year || Dates.getTaxYear();
	}

	static reset() {
		tax_table		= undefined;
		tax_table_year	= undefined;
	}
}
