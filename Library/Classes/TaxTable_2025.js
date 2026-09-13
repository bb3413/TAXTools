
import { MAX_DOLLAR, MIN_DOLLAR }	from "../TAXTools/TAXTools.js";
import { TaxTableTmpl }				from "../Classes/TaxTableTmpl.js";

export class TaxTable_2025 extends TaxTableTmpl {
	//
	// Tax Tables for the Tax Year 2025
	//
	// This file contain tax information that is specific to the tax year 2025. Symbolic
	// names in this file begin with "TY25" so the names do not conflict with corresponding
	// symbols used for other tax years.
	//
	// This file contains the following tax tables. They are listed in the order they are
	// declared in this file:
	//
	//	TYxx_values					Table of miscellaneous constant values
	//	TYxx_amt_tax				AMT tax brackets
	//	TYxx_income_tax_table		Income tax brackets
	//	TYxx_ltc_table				LTCinsurance deduction amounts
	//	TYxx_sales_tax_table		Sales tax deduction amounts
	//	TYxx_ca_income_tax_table	California income tax brackets
	//

	tax_year = 2025;

	//
	// This table contains constant tax values.
	//
	values = {
		// 	Name						SINGLE			HOH			MFJ			QSS			MFS
		"BusinessMileage":				[ 0.70,			0.70,		0.70,		0.70,		0.70		],
		"CharityMileage":				[ 0.14,			0.14,		0.14,		0.14,		0.14		],
		"MedicalMileage":				[ 0.21,			0.21,		0.21,		0.21,		0.21		],

		"MaxCapitalLoss":				[ -3000,		-3000,		-3000,		-3000,		-1500		],
		"MaxEducatorExpenses":			[ 300,			300,		600,		300,		300			],
		"MaxTaxedSS":					[ 176100,		176100,		176100,		176100,		176100		],
		"MaxSALT":						[ 40000,		40000,		40000,		40000,		20000		],
		"MaxStudentLoanInterest":		[ 2500,			2500,		2500,		2500,		0			],

		// OBBA deductions				SINGLE			HOH			MFJ			QSS			MFS
		"MaxCarLoanInterestDeduction":	[ 10000,		10000,		10000,		10000,		10000		],
		"CarLoanInterestPhaseOut":		[ 100000,		100000,		200000,		100000,		100000		],
		"MaxOvertimeDeduction":			[ 12500,		12500,		25000,		12500,		0			],
		"OvertimeDeductionPhaseOut":	[ 150000,		150000,		300000,		150000,		150000		],
		"MaxTipsDeduction":				[ 25000,		25000,		25000,		25000,		0			],
		"TipsDeductionPhaseOut":		[ 150000,		150000,		300000,		150000,		150000		],
		"MaxSeniorDeduction":			[ 6000,			6000,		6000,		6000,		0			],
		"SeniorDeductionPhaseOut":		[ 75000,		75000,		150000,		75000,		75000		],

		// Non-refundable credits		SINGLE			HOH			MFJ			QSS			MFS
		"MaxAmericanOppCreditNoRefund":	[ MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR,	0			],
		"MaxChildAndDependentCareCredit":[ MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR,	0			],
		"MaxChildTaxCredit":			[ MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR	],
		"MaxForeignTaxCredit":			[ 300,			300,		600,		300,		300			],
		"MaxLifetimeLearningCredit":	[ 2000,			2000,		2000,		2000,		0			],
		"MaxResidentialEnergyCredit":	[ MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR	],
		"MaxRetirementSavingsCredit":	[ 1000,			1000,		2000,		1000,		1000		],

		// Refundable credits			SINGLE			HOH			MFJ			QSS			MFS
		"MaxAmericanOppCreditRefundable":[ MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR,	0			],
		"MaxCreditForOtherDependents":	[ MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR	],
		"MaxEarnedIncomeCredit":		[ 61555,		61555,		68675,		61555,		0			],
		"MaxPremiumTaxCredit":			[ MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR,	0			],

		// AMT							SINGLE			HOH			MFJ			QSS			MFS
		"AMT_Exemption":				[ 88100,		88100,		137000,		137000,		68650		],
		"AMT_ExemptionPhaseOut":		[ 626350,		626350,		1252700,	1252700,	609350		],

		// Capital gains ranges			SINGLE			HOH			MFJ			QSS			MFS
		"CG_15PercentRangeStart":		[ 48350,		64750,		96700,		96700,		48350		],
		"CG_20PercentRangeStart":		[ 533400,		566700,		600050,		600050,		300000		],

		// Social Security 50% range	SINGLE			HOH			MFJ			QSS			MFS
		"SS_50PercentRangeStart":		[ 25000,		25000,		32000,		25000,		25000		],
		"SS_50PercentRangeEnd":			[ 34000,		34000,		44000,		34000,		34000		],
		"SS_50PercentRangeLength":		[ 9000,			9000,		12000,		9000,		9000		],

		// Standard deduction
		"StandardDeduction":			[ 15750,		23625,		31500,		31500,		15750		],
		"StandardDeductionExtra":		[ 2000,			2000,		1600,		1600,		1600		],

		// California constants			SINGLE			HOH			MFJ			QSS			MFS
		"CA_PersonalExemption":			[ 153,			153,		153,		153,		153			],
		"CA_DependentExemption":		[ 475,			475,		475,		475,		475			],
		"CA_StandardDeduction":			[ 5706,			11412,		11412,		11412,		5706		],
		"CA_BaseSalesTax":				[ 7.25,			7.25,		7.25,		7.25,		7.25		],
		"CA_RentersCredit":				[ 60,			120,		120,		120,		60			],
		"CA_HiIncPhaseout":				[ 252203,		378310,		504411,		504411,		252203		],

	};

	//
	// Alternative Minimum Tax (AMT)
	//
	amt_tax = [
		//				Start of	End of		Subtract	Rate
		//				Bracket		Bracket					Percent
		[ "SINGLE",		0,			239100,		0,			26	],
		[ "SINGLE",		239100,		MAX_DOLLAR,	4782,		28	],

		[ "HOH",		0,			239100,		0,			26	],
		[ "HOH",		239100,		MAX_DOLLAR,	4782,		28	],

		[ "MFJ",		0,			232600,		0,			26	],
		[ "MFJ",		232600,		MAX_DOLLAR,	4782,		28	],

		[ "QSS",		0,			232600,		0,			26	],
		[ "QSS",		232600,		MAX_DOLLAR,	4782,		28	],

		[ "MFS",		0,			119550,		0,			26	],
		[ "MFS",		119550,		MAX_DOLLAR,	2391,		28	],
	];

	//
	// Income Tax Table
	//
	// The income tax is computed by finding the bracket where the filing status
	// matches and the income is within the bracket. The tax is computed by
	// subtracting the start of the bracket from the income to determine the amount
	// of income within the bracket. Multiply that amount by the tax rate and add
	// the cumulative tax.
	//
	// The cumulative tax is the cumulative amount of tax from each of the previous
	// brackets.
	//
	income_tax_table = [
		// Filing		Start of	End of		Rate
		// Status		Bracket		Bracket		Percent
		[ "SINGLE",		0,			11925,		10 ],
		[ "SINGLE",		11925,		48475,		12 ],
		[ "SINGLE",		48475,		103350,		22 ],
		[ "SINGLE",		103350,		197300,		24 ],
		[ "SINGLE",		197300,		250525,		32 ],
		[ "SINGLE",		250525,		626350,		35 ],
		[ "SINGLE",		626350,		MAX_DOLLAR,	37 ],

		[ "HOH",		0,			17000,		10 ],
		[ "HOH",		17000,		64850,		12 ],
		[ "HOH",		64850,		103350,		22 ],
		[ "HOH",		103350,		197300,		24 ],
		[ "HOH",		197300,		250500,		32 ],
		[ "HOH",		250500,		626350,		35 ],
		[ "HOH",		626350,		MAX_DOLLAR,	37 ],

		[ "MFJ",		0,			23850,		10 ],
		[ "MFJ",		23850,		96950,		12 ],
		[ "MFJ",		96950,		206700,		22 ],
		[ "MFJ",		206700,		394600,		24 ],
		[ "MFJ",		394600,		501050,		32 ],
		[ "MFJ",		501050,		751600,		35 ],
		[ "MFJ",		751600,		MAX_DOLLAR,	37 ],

		[ "QSS",		0,			23850,		10 ],
		[ "QSS",		23850,		96950,		12 ],
		[ "QSS",		96950,		206700,		22 ],
		[ "QSS",		206700,		394600,		24 ],
		[ "QSS",		394600,		501050,		32 ],
		[ "QSS",		501050,		751600,		35 ],
		[ "QSS",		751600,		MAX_DOLLAR,	37 ],

		[ "MFS",		0,			11925,		10 ],
		[ "MFS",		11925,		48475,		12 ],
		[ "MFS",		48475,		103350,		22 ],
		[ "MFS",		103350,		197300,		24 ],
		[ "MFS",		197300,		250525,		32 ],
		[ "MFS",		250525,		375800,		35 ],
		[ "MFS",		375800,		MAX_DOLLAR,	37 ],
	];

	//
	// Long Term Care Premiums
	//
	// The amount of the deduction for long term care (LTC) insurance premiums
	// is limited by the age of the person.
	//
	ltc_table = [
		// 			Maximum
		// Age		Premium
		[	71,		6020	],
		[	61,		4810	],
		[	51,		1800	],
		[	41,		900		],
		[	0,		480		],
	];

	//
	// Table of RMD periods
	//
	// RMD Table III - Uniform Lifetime Table
	//
	rmd_period_table = [
		//			Distribution
		// 	Age		Period
		[	72,		27.4,	],
		[	73,		26.5,	],
		[	74,		25.5,	],
		[	75,		24.6,	],
		[	76,		23.7,	],
		[	77,		22.9,	],
		[	78,		22.0,	],
		[	79,		21.1,	],
		[	80,		20.2,	],
		[	81,		19.4,	],
		[	82,		18.5,	],
		[	83,		17.7,	],
		[	84,		16.8,	],
		[	85,		11.6,	],
		[	86,		15.2,	],
		[	87,		14.4,	],
		[	88,		13.7,	],
		[	89,		12.9,	],
		[	90,		12.2,	],
		[	91,		11.5,	],
		[	92,		10.8,	],
		[	93,		10.1,	],
		[	94,		9.5,	],
		[	95,		8.9,	],
		[	96,		8.4,	],
		[	97,		7.8,	],
		[	98,		7.3,	],
		[	99,		6.8,	],
		[	100,	6.4,	],
		[	101,	6.0,	],
		[	102,	5.6,	],
		[	103,	5.2,	],
		[	104,	4.9,	],
		[	105,	4.6,	],
		[	106,	4.3,	],
		[	107,	4.1,	],
		[	108,	3.9,	],
		[	109,	3.7,	],
		[	110,	3.5,	],
		[	111,	3.4,	],
		[	112,	3.3,	],
		[	113,	3.1,	],
		[	114,	3.0,	],
		[	115,	2.9,	],
		[	116,	2.9,	],
		[	117,	2.7,	],
		[	118,	2.5,	],
		[	119,	2.3,	],
		[	120,	2.0,	],
	];

	//
	// Sales Tax Table
	//
	// This is the IRS table for determining the sales tax deduction for California.
	//
	// The information in this table comes from the instructions for schedule A at
	// https://www.irs.gov/pub/irs-pdf/i1040sca.pdf.
	//
	sales_tax_table = [
		//										Family Size
		// Income Range			1		2		3		4		5		>5
		[ 0,		20000,		412,	476,	519,	552,	580,	619		],
		[ 20000,	30000,		564,	650,	709,	754,	792,	845		],
		[ 30000,	40000,		637,	734,	801,	852,	895,	955		],
		[ 40000,	50000,		698,	805,	877,	934,	981,	1046	],
		[ 50000,	60000,		752,	866,	944,	1005,	1055,	1126	],
		[ 60000,	70000,		798,	921,	1003,	1067,	1121,	1196	],
		[ 70000,	80000,		841,	970,	1057,	1124,	1181,	1259	],
		[ 80000,	90000,		879,	1015,	1106,	1176,	1235,	1318	],
		[ 90000,	100000,		915,	1056,	1151,	1225,	1286,	1372	],
		[ 100000,	120000,		963,	1110,	1211,	1288,	1352,	1442	],
		[ 120000,	140000,		1023,	1180,	1286,	1368,	1437,	1532	],
		[ 140000,	160000,		1079,	1243,	1355,	1442,	1514,	1615	],
		[ 160000,	180000,		1128,	1301,	1418,	1508,	1584,	1690	],
		[ 180000,	200000,		1175,	1355,	1477,	1571,	1649,	1760	],
		[ 200000,	225000,		1223,	1410,	1537,	1635,	1716,	1831	],
		[ 225000,	250000,		1274,	1469,	1600,	1702,	1787,	1907	],
		[ 250000,	275000,		1320,	1522,	1659,	1765,	1853,	1977	],
		[ 275000,	300000,		1365,	1574,	1715,	1825,	1915,	2043	],
		[ 300000,	MAX_DOLLAR,	1619,	1867,	2034,	2164,	2272,	2423	],
	];

	//
	// California Income Tax Table
	//
	// SINGLE and MFS are the same. MFJ and QSS are the same.
	//
	ca_income_tax_table = [
		// Filing		Start of	End of		Rate
		// Status		Bracket		Bracket		Percent
		[ "SINGLE",		0,			11079,		1.0		],
		[ "SINGLE",		11079,		26264,		2.0		],
		[ "SINGLE",		26264,		41452,		4.0		],
		[ "SINGLE",		41452,		57542,		6.0		],
		[ "SINGLE",		57542,		72724,		8.0		],
		[ "SINGLE",		72724,		371479,		9.3		],
		[ "SINGLE",		371479,		445771,		10.3	],
		[ "SINGLE",		445771,		742953,		11.3	],
		[ "SINGLE",		742953,		MAX_DOLLAR,	12.3	],

		[ "HOH",		0,			22173,		.0		],
		[ "HOH",		22173,		52530,		2.0		],
		[ "HOH",		52530,		67716,		4.0		],
		[ "HOH",		67716,		83805,		6.0		],
		[ "HOH",		83805,		98990,		8.0		],
		[ "HOH",		98990,		505208,		9.3		],
		[ "HOH",		505208,		606251,		10.3	],
		[ "HOH",		606251,		1010417,	11.3	],
		[ "HOH",		1010417,	MAX_DOLLAR,	12.3	],

		[ "MFJ",		0,			22158,		1.0		],
		[ "MFJ",		22158,		52528,		2.0		],
		[ "MFJ",		52528,		82904,		4.0		],
		[ "MFJ",		82904,		115084,		6.0		],
		[ "MFJ",		115084,		145448,		8.0		],
		[ "MFJ",		145448,		742958,		9.3		],
		[ "MFJ",		742958,		891542,		10.3	],
		[ "MFJ",		891542,		1485906,	11.3	],
		[ "MFJ",		1485906,	MAX_DOLLAR,	12.3	],
	];
}
