
import { SINGLE, HOH, MFJ, QSS, MFS }	from "../TAXTools/TAXTools.js";

import { Ensure }		from "../Modules/Ensure.js";
import { Num }			from "../Modules/Num.js";
import { Str }			from "../Modules/Str.js";
import { Taxpayer }		from "../Classes/Taxpayer.js";

export class TaxTableTmpl {
	getBusinessMileageDeduction(miles) {
		Ensure.isNumber(miles);
		return Math.round(miles * this.getTaxValue("BusinessMileage"));
	}

	getCharitableMileageDeduction(miles) {
		Ensure.isNumber(miles);
		return Math.round(miles * this.getTaxValue("CharityMileage"));
	}

	getIncomeTaxFromTable(income) {
		// Note: there is another function named getIncomeTax() in
		// Library/IncomeTax.js.
		//
		// Find the tax bracket for the filing status and income, then compute
		// the tax:
		//
		//		((income - start_of_bracket) * tax_rate) + cumulative_tax
		//
		Ensure.isNumber(income);

		const tp = Taxpayer.getTaxpayer();

		let tax  = 0;
		for (let row = 0; row < this.income_tax_table.length; row++) {
			if ((tp.filing_status === this.income_tax_table[row][0]) &&
					income > this.income_tax_table[row][1] &&
					income <= this.income_tax_table[row][2]) {

				let start_of_bracket = this.income_tax_table[row][1];
				let tax_rate = this.income_tax_table[row][3] / 100;	// Convert to percent
				let cumulative_tax = this.cumulativeTax(this.income_tax_table, row);

				tax = ((income - start_of_bracket) * tax_rate) + cumulative_tax;
				break;
			}
		}

		return Math.round(tax);
	}

	getMaxLTC(age) {
		// The medical deduction for long term care (LTC) premiums is restricted by
		// age. Return the maximum LTC premium the taxpayer can deduct.
		Ensure.isNumber(age);

		for (let row = 0; row < this.ltc_table.length; row++) {
			if (age >= this.ltc_table[row][0]) {
				return this.ltc_table[row][1];
			}
		}

		return 0;
	}

	getMedicalMileageDeduction(miles) {
		Ensure.isNumber(miles);
		return Math.round(miles * this.getTaxValue("MedicalMileage"));
	}

	getRetirementSavingsPhaseOut(agi) {
		Ensure.isNumber(agi);

		const tp = Taxpayer.getTaxpayer();
		let factor	= 0.0;
		let col;
		
		if (tp.filing_status === MFJ) {
			col = 2;
		} else if (tp.filing_status === HOH) {
			col = 3;
		} else {
			col = 4;
		}
	
		for (let row = 0; row < this.savings_credit_phase_out.length; row++) {
			if (agi > this.savings_credit_phase_out[row][0] &&
				agi <= this.savings_credit_phase_out[row][1]) {

				factor = this.savings_credit_phase_out[row][col];
				break;
			}
		}

		return factor;
	}

	getRMDPeriod(age) {
		Ensure.isNumber(age);
		
		let period = 0;

		if (age > 120) {
			period = 2;
		} else {
			for (let row = 0; row < this.rmd_period_table.length; row++) {
				if (age === this.rmd_period_table[row][0]) {
					period = this.rmd_period_table[row][1];
					break;
				}
			}
		}

		return period;
	}

	getSalesTaxDeduction(income, family_size) {
		Ensure.isNumber(income);
		Ensure.isNumber(family_size);

		family_size = Num.limit(family_size, 1, 6);
		if (!Number.isFinite(income)) {
			return 0;
		}

		let deduction	= 0;
		let col			= family_size + 1;

		for (let row = 0; row < this.sales_tax_table.length; row++) {
			if (income > this.sales_tax_table[row][0] &&
				income <= this.sales_tax_table[row][1]) {

				deduction = this.sales_tax_table[row][col];
				break;
			}
		}

		return deduction;
	}

	getStandardDeduction(taxpayers_age = -1, spouses_age = -1) {
		const tp = Taxpayer.getTaxpayer();

		let std_deduction		= this.getTaxValue("StandardDeduction")
		let std_deduction_extra	= this.getTaxValue("StandardDeductionExtra")

		taxpayers_age	= taxpayers_age !== -1 ? taxpayers_age : tp.taxpayers_age;
		spouses_age		= spouses_age !== -1 ? spouses_age : tp.spouses_age;

		if (taxpayers_age >= 65)
			std_deduction += std_deduction_extra;
		if (tp.is_taxpayer_blind)
			std_deduction += std_deduction_extra;

		if (tp.filing_status === MFJ) {
			if (spouses_age >= 65)
				std_deduction += std_deduction_extra;
			if (tp.is_spouse_blind)
				std_deduction += std_deduction_extra;
		}

		return std_deduction;
	}

	getTaxValue(name) {
		Ensure.isString(name);

		const tp = Taxpayer.getTaxpayer();

		if (!this.values[name]) {
			throw new Error(`Invalid tax value: ${name}`);
		}

		return this.values[name][tp.filing_status]
	}

	getTaxYear() {
		// This is implemented as both a static and instance method.
		return this.tax_year;
	}

	get_AMT_Exemption(amt_income) {
		Ensure.isNumber(amt_income);

		let exemption	= this.getTaxValue("AMT_Exemption");
		let phase_out	= this.getTaxValue("AMT_ExemptionPhaseOut");
		let excess		= 0;

		if (amt_income > phase_out) {
			excess = Math.round((amt_income - phase_out) * 0.25);
		}

		return Math.max(0, exemption - excess);
	}

	get_AMT_Tax(income) {
		Ensure.isNumber(income);

		const tp = Taxpayer.getTaxpayer();
		let tax = 0;
		for (let row = 0; row < this.amt_tax.length; row++) {
			if ((tp.filing_status === this.amt_tax[row][0]) &&
					income > this.amt_tax[row][1] &&
					income <= this.amt_tax[row][2]) {

				let tax_rate = this.amt_tax[row][4] / 100;	// Convert to percent
				let subtract = this.amt_tax[row][3];

				tax = (income * tax_rate) - subtract;
				break;
			}
		}

		return Math.round(tax);
	}

	get_CA_IncomeTax(income) {
		// Find the tax bracket for the filing status and income, then compute
		// the tax:
		//
		//		((income - start_of_bracket) * tax_rate) + cumulative_tax
		//
		Ensure.isNumber(income);

		const tp = Taxpayer.getTaxpayer();

		// SINGLE and MFS are the same. MFJ and QSS are the same.
		let filing_status = tp.filing_status;
		switch (filing_status) {
			case QSS:
				filing_status	= MFJ;
				break;
			case MFS:
				filing_status	= SINGLE;
				break;
		}

		let tax = 0;
		for (let row = 0; row < this.ca_income_tax_table.length; row++) {
			if ((filing_status === this.ca_income_tax_table[row][0]) &&
					income > this.ca_income_tax_table[row][1] &&
					income <= this.ca_income_tax_table[row][2]) {

				let start_of_bracket = this.ca_income_tax_table[row][1];
				let tax_rate = this.ca_income_tax_table[row][3] / 100;	// Convert to percent
				let cumulative_tax = this.cumulativeTax(this.ca_income_tax_table, row);

				tax = ((income - start_of_bracket) * tax_rate) + cumulative_tax;
				break;
			}
		}

		return Math.round(tax);
	}

	isValidTaxYear(tax_year) {
		switch (Number(tax_year)) {
			case 2026:
			case 2025:
			case 2024:
				return true;
				break;
			default:
				return false;
				break;
		}
	}

	cumulativeTax(table, curr_row) {
		// This calculates the cumulative income tax for the previous tax brackets.
		// The table is constructed with each tax bracket in a separate row. The state and
		// federal income tax tables are laid out the same so this works for both
		// of them.
		let start_row			= curr_row;
		let	start_of_bracket	= 0;
		let end_of_bracket		= 0;
		let rate				= 0;
		let total				= 0;

		// Scan for the bracket that starts at $0.
		while ((start_row > 0) && (table[start_row][1] !== 0)) {
			--start_row;
		}

		for (let row = start_row; row < curr_row; row++) {
			start_of_bracket	= table[row][1];
			end_of_bracket		= table[row][2];
			rate				= table[row][3] / 100;	// Convert to percent
			total += Math.round((end_of_bracket - start_of_bracket) * rate);
		}

		return total;
	}
}
