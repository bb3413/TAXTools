
import { Num }		from "../Classes/Num.js";
import { Str }		from "../Classes/Str.js";

// Values columns
const SINGLE	= 0;
const HOH		= 1;
const MFJ		= 2;
const QSS		= 3;
const MFS		= 4;

function getValuesCol(filing_status) {
	let col = 0;
	switch (filing_status) {
		case "SINGLE":	col = 0; break;
		case "HOH":		col = 1; break;
		case "MFJ":		col = 2; break;
		case "QSS":		col = 3; break;
		case "MFS":		col = 4; break;
		default:
			throw new Error("TT.getValueCol: Invalid filing_status: " + filing_status);
	}
	return col;
}


export class TaxTableTmpl {
	getBusinessMileageDeduction(miles) {
		return Math.round(miles * this.getTaxValue("BusinessMileage"));
	}

	getCharitableMileageDeduction(miles) {
		return Math.round(miles * this.getTaxValue("CharityMileage"));
	}

	getIncomeTaxFromTable(filing_status, income) {
		// Note: there is another named getIncomeTax() in
		// Library/IncomeTax.js.
		//
		// Find the tax baracket for the filing status and income, then compute
		// the tax:
		//
		//		((income - start_of_bracket) * tax_rate) + cumulative_tax
		//
		let tax  = 0;
		for (let row = 0; row < this.income_tax_table.length; row++) {
			if ((filing_status === this.income_tax_table[row][0]) &&
					income > this.income_tax_table[row][1] &&
					income <= this.income_tax_table[row][2]) {

				let start_of_bracket = this.income_tax_table[row][1];
				let tax_rate = this.income_tax_table[row][3] / 100;	// Convert to percent
				let cumulative_tax = this.cumulativeTax(this.income_tax_table, row);

				tax = ((income - start_of_bracket) * tax_rate) + cumulative_tax;
				break;
			}
		}

		return tax;
	}

	getMaxLTC(age) {
		// The medical deduction for long term care (LTC) premiums is restricted by
		// age. Return the maximum LTC premium the taxpayer can deduct.
		for (let row = 0; row < this.ltc_table.length; row++) {
			if (age >= this.ltc_table[row][0]) {
				return this.ltc_table[row][1];
			}
		}

		return 0;
	}

	getMedicalMileageDeduction(miles) {
		return Math.round(miles * this.getTaxValue("MedicalMileage"));
	}

	getRMDPeriod(age) {
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

	getSeniorDeduction(
		filing_status,
		agi,
		taxpayers_age				= 0,
		spouses_age					= 0)
	{
		let senior_deduction		= 0;
		let deduction				= 0
		let excess					= 0;
		const max_senior_deduction =
			this.getTaxValue("MaxSeniorDeduction", filing_status);
		const phase_out_start =
			this.getTaxValue("SeniorDeductionPhaseOut", filing_status);

		excess = Math.max(0, agi - phase_out_start);
		deduction = Math.round(Math.max(0, max_senior_deduction - (excess * 0.06)));

		if (taxpayers_age >= 65) {
			senior_deduction = deduction;
		}

		if (filing_status === "MFJ") {
			if (spouses_age >= 65) {
				senior_deduction += deduction;
			}
		}

		return senior_deduction;
	}

	getStandardDeduction(
		filing_status		= "SINGLE",
		taxpayers_age		= 0,
		spouses_age			= 0,
		is_taxpayer_blind	= false,
		is_spouse_blind		= false)
	{
		let std_deduction		= this.getTaxValue("StandardDeduction", filing_status)
		let std_deduction_extra	= this.getTaxValue("StandardDeductionExtra", filing_status)

		if (taxpayers_age >= 65)
			std_deduction += std_deduction_extra;
		if (is_taxpayer_blind)
			std_deduction += std_deduction_extra;

		if (filing_status === "MFJ") {
			if (spouses_age >= 65)
				std_deduction += std_deduction_extra;
			if (is_spouse_blind)
				std_deduction += std_deduction_extra;
		}

		return std_deduction;
	}

	getTaxValue(name, filing_status = "SINGLE") {
		if (!this.values[name]) {
			throw new Error("TT.getTaxValue(): Invalid tax value: " + name);
		}

		return this.values[name][getValuesCol(filing_status)]
	}

	getTaxYear() {
		// This is implemented as both a staticand instance method.
		return this.tax_year;
	}

	get_AMT_Exemption(filing_status, amt_income) {
		let exemption	= this.getTaxValue("AMT_Exemption", filing_status);
		let phase_out	= this.getTaxValue("AMT_ExemptionPhaseOut", filing_status);
		let excess		= 0;

		if (amt_income > phase_out) {
			excess = Math.round((amt_income - phase_out) * 0.25);
		}

		return Math.max(0, exemption - excess);
	}

	get_AMT_Tax(filing_status, income) {
		let tax = 0;
		for (let row = 0; row < this.amt_tax.length; row++) {
			if ((filing_status === this.amt_tax[row][0]) &&
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

	get_CA_Exemption(
		filing_status		= "SINGLE",
		taxpayers_age		= 0,
		spouses_age			= 0,
		is_taxpayer_blind	= false,
		is_spouse_blind		= false,
		num_dependents		= 0)
	{
		const personal_exemption	= this.getTaxValue("CA_PersonalExemption");
		const dependent_exemption	= this.getTaxValue("CA_DependentExemption");

		let exemption = personal_exemption;		// One exemption for the taxpayer.
		if (taxpayers_age >= 65)
			exemption += personal_exemption;
		if (is_taxpayer_blind)
			exemption += personal_exemption;

		if (filing_status === "MFJ") {
			exemption += personal_exemption;		// One exemption for the spouse.
			if (spouses_age >= 65)
				exemption += personal_exemption;
			if (is_spouse_blind)
				exemption += personal_exemption;
		}

	 	exemption += num_dependents * dependent_exemption;

		return exemption;
	}

	get_CA_IncomeTax(filing_status, income) {
		// Find the tax baracket for the filing status and income, then compute
		// the tax:
		//
		//		((income - start_of_bracket) * tax_rate) + cumulative_tax
		//

		// SINGLE and MFS are the same. MFJ and QSS are the same.
		switch (filing_status) {
			case "QSS":
				filing_status	= "MFJ";
				break;
			case "MFS":
				filing_status	= "SINGLE";
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

	get_CA_StandardDeduction(filing_status) {
		return this.getTaxValue("CA_StandardDeduction", filing_status);
	}

	get_CapGains_15_Start(filing_status) {
		return this.getTaxValue("CG_15PercentRangeStart", filing_status);
	}

	get_CapGains_20_Start(filing_status) {
		return this.getTaxValue("CG_20PercentRangeStart", filing_status);
	}

	get_SS_Start_50(filing_status) {
		return this.getTaxValue("SS_50PercentRangeStart", filing_status);
	}

	get_SS_50_Range(filing_status) {
		return this.getTaxValue("SS_50PercentRangeLength", filing_status);
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
		// This calculates the cumulative income tax for the pevious tax brackets.
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
