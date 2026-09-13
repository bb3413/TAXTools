
import { MAX_DOLLAR, MIN_DOLLAR }	from "../TAXTools/TAXTools.js";
import { TaxTableTmpl }				from "../Classes/TaxTableTmpl.js";

export class TaxTable_2024 extends TaxTableTmpl {
	//
	// Tax Tables for the Tax Year 2024
	//
	// This file contain tax information that is specific to the tax year 2024. Symbolic
	// names in this file begin with "TY24" so the names do not conflict with corresponding
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

	tax_year = 2024;

	//
	// This table contains constant tax values.
	//
	values = {
		// 	Name						SINGLE			HOH			MFJ			QSS			MFS
		"BusinessMileage":				[ 0.67,			0.67,		0.67,		0.67,		0.67		],
		"CharityMileage":				[ 0.14,			0.14,		0.14,		0.14,		0.14		],
		"MedicalMileage":				[ 0.21,			0.21,		0.21,		0.21,		0.21		],

		"MaxCapitalLoss":				[ -3000,		-3000,		-3000,		-3000,		-1500		],
		"MaxEducatorExpenses":			[ 300,			300,		600,		300,		300			],
		"MaxTaxedSS":					[ 176100,		176100,		176100,		176100,		176100		],
		"MaxSALT":						[ 10000,		10000,		10000,		10000,		10000		],
		"MaxStudentLoanInterest":		[ 2500,			2500,		2500,		2500,		0			],

		// OBBA deductions				SINGLE			HOH			MFJ			QSS			MFS
		"MaxCarLoanInterestDeduction":	[ 0,			0,			0,			0,			0			],
		"CarLoanInterestPhaseOut":		[ 0,			0,			0,			0,			0			],
		"MaxOvertimeDeduction":			[ 0,			0,			0,			0,			0			],
		"OvertimeDeductionPhaseOut":	[ 0,			0,			0,			0,			0			],
		"MaxTipsDeduction":				[ 0,			0,			0,			0,			0			],
		"TipsDeductionPhaseOut":		[ 0,			0,			0,			0,			0			],
		"MaxSeniorDeduction":			[ 0,			0,			0,			0,			0			],
		"SeniorDeductionPhaseOut":		[ 0,			0,			0,			0,			0			],

		// Non-refundable credits			SINGLE			HOH			MFJ			QSS			MFS
		"MaxAmericanOppCreditNoRefund":	[ MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR,	0			],
		"MaxChildAndDependentCareCredit":[ MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR,	0			],
		"MaxChildTaxCredit":			[ MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR	],
		"MaxForeignTaxCredit":			[ 300,			300,		600,		300,		300			],
		"MaxLifetimeLearningCredit":	[ 2000,			2000,		2000,		2000,		0			],
		"MaxResidentialEnergyCredit":	[ MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR	],
		"MaxRetirementSavingsCredit":	[ 1000,			1000,		2000,		1000,		1000		],

		// Refundable credits				SINGLE			HOH			MFJ			QSS			MFS
		"MaxAmericanOppCreditRefundable":[ MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR,	0			],
		"MaxCreditForOtherDependents":	[ MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR	],
		"MaxEarnedIncomeCredit":		[ 59899,		59899,		66819,		59899,		0			],
		"MaxPremiumTaxCredit":			[ MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR,	MAX_DOLLAR,	0			],

		// AMT							SINGLE			HOH			MFJ			QSS			MFS
		"AMT_Exemption":				[ 85700,		85700,		133500,		133500,		66650		],
		"AMT_ExemptionPhaseOut":		[ 609350,		609350,		1218700,	1218700,	609350		],

		// Capital gains ranges			SINGLE			HOH			MFJ			QSS			MFS
		"CG_15PercentRangeStart":		[ 47025,		63000,		94050,		94050,		47025		],
		"CG_20PercentRangeStart":		[ 518900,		551350,		583750,		583750,		291850		],

		// Social Security 50% range	SINGLE			HOH			MFJ			QSS			MFS
		"SS_50PercentRangeStart":		[ 25000,		25000,		32000,		25000,		25000		],
		"SS_50PercentRangeEnd":			[ 34000,		34000,		44000,		34000,		34000		],
		"SS_50PercentRangeLength":		[ 9000,			9000,		12000,		9000,		9000		],

		// Standard deduction
		"StandardDeduction":			[ 14600,		21900,		29200,		29200,		14600		],
		"StandardDeductionExtra":		[ 1950,			1950,		1550,		1550,		1550		],

		// California constants			SINGLE			HOH			MFJ			QSS			MFS
		"CA_PersonalExemption":			[ 149,			149,		149,		149,		149			],
		"CA_DependentExemption":		[ 447,			447,		447,		447,		447			],
		"CA_StandardDeduction":			[ 5540,			11080,		11080,		11080,		5540		],
		"CA_BaseSalesTax":				[ 7.25,			7.25,		7.25,		7.25,		7.25		],
		"CA_RentersCredit":				[ 60,			120,		120,		120,		60			],
		"CA_HiIncPhaseout":				[ 244857,		367291,		489719,		489719,		244857		],
	};

	//
	// Alternative Minimum Tax (AMT)
	//
	amt_tax = [
		//				Start of	End of		Subtract	Rate
		//				Bracket		Bracket					Percent
		[ "SINGLE",		0,			232600,		0,			26	],
		[ "SINGLE",		239100,		MAX_DOLLAR,	4782,		28	],

		[ "HOH",		0,			232600,		0,			26	],
		[ "HOH",		239100,		MAX_DOLLAR,	4782,		28	],

		[ "MFJ",		0,			232600,		0,			26	],
		[ "MFJ",		232600,		MAX_DOLLAR,	4782,		28	],

		[ "QSS",		0,			232600,		0,			26	],
		[ "QSS",		232600,		MAX_DOLLAR,	4782,		28	],

		[ "MFS",		0,			116300,		0,			26	],
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
		[ "SINGLE",		0,			11600,		10 ],
		[ "SINGLE",		11600,		47150,		12 ],
		[ "SINGLE",		47150,		100525,		22 ],
		[ "SINGLE",		100525,		191950,		24 ],
		[ "SINGLE",		191950,		243725,		32 ],
		[ "SINGLE",		243725,		609350,		35 ],
		[ "SINGLE",		609350,		MAX_DOLLAR,	37 ],

		[ "HOH",		0,			16550,		10 ],
		[ "HOH",		16550,		63100,		12 ],
		[ "HOH",		63100,		100500,		22 ],
		[ "HOH",		100500,		191950,		24 ],
		[ "HOH",		191950,		243725,		32 ],
		[ "HOH",		243725,		609350,		35 ],
		[ "HOH",		609350,		MAX_DOLLAR,	37 ],

		[ "MFJ",		0,			23200,		10 ],
		[ "MFJ",		23200,		94300,		12 ],
		[ "MFJ",		94300,		201050,		22 ],
		[ "MFJ",		201050,		383900,		24 ],
		[ "MFJ",		383900,		487450,		32 ],
		[ "MFJ",		487450,		731200,		35 ],
		[ "MFJ",		731200,		MAX_DOLLAR,	37 ],

		[ "QSS",		0,			23200,		10 ],
		[ "QSS",		23200,		94300,		12 ],
		[ "QSS",		94300,		201050,		22 ],
		[ "QSS",		201050,		383900,		24 ],
		[ "QSS",		383900,		487450,		32 ],
		[ "QSS",		487450,		731200,		35 ],
		[ "QSS",		731200,		MAX_DOLLAR,	37 ],

		[ "MFS",		0,			11600,		10 ],
		[ "MFS",		11600,		47150,		12 ],
		[ "MFS",		47150,		100525,		22 ],
		[ "MFS",		100525,		191950,		24 ],
		[ "MFS",		191950,		243725,		32 ],
		[ "MFS",		243725,		365600,		35 ],
		[ "MFS",		365600,		MAX_DOLLAR,	37 ],
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
		[	71,		5880	],
		[	61,		4710	],
		[	51,		1760	],
		[	41,		880		],
		[	0,		470		],
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
		[ 0,		20000,		406,	469,	511,	544,	571,	610		],
		[ 20000,	30000,		555,	640,	698,	742,	780,	832		],
		[ 30000,	40000,		627,	723,	789,	839,	881,	940		],
		[ 40000,	50000,		687,	793,	864,	920,	966,	1030	],
		[ 50000,	60000,		740,	853,	930,	990,	1039,	1109	],
		[ 60000,	70000,		786,	907,	988,	1051,	1104,	1178	],
		[ 70000,	80000,		828,	955,	1041,	1107,	1163,	1240	],
		[ 80000,	90000,		866,	999,	1089,	1158,	1216,	1298	],
		[ 90000,	100000,		901,	1040,	1133,	1206,	1266,	1351	],
		[ 100000,	120000,		948,	1093,	1192,	1268,	1331,	1420	],
		[ 120000,	140000,		1007,	1162,	1266,	1347,	1415,	1509	],
		[ 140000,	160000,		1062,	1224,	1334,	1420,	1491,	1590	],
		[ 160000,	180000,		1111,	1281,	1396,	1485,	1560,	1664	],
		[ 180000,	200000,		1157,	1334,	1454,	1547,	1624,	1733	],
		[ 200000,	225000,		1204,	1388,	1513,	1610,	1690,	1803	],
		[ 225000,	250000,		1254,	1446,	1575,	1676,	1760,	1878	],
		[ 250000,	275000,		1300,	1499,	1634,	1738,	1825,	1947	],
		[ 300000,	MAX_DOLLAR,	1594,	1838,	2003,	2131,	2237,	2386	],
	];

	//
	// California Income Tax Table
	//
	// SINGLE and MFS are the same. MFJ and QSS are the same.
	//
	ca_income_tax_table = [
		// Filing		Start of	End of		Rate
		// Status		Bracket		Bracket		Percent
		[ "SINGLE",		0,			10756,		1		],
		[ "SINGLE",		10756,		25499,		2		],
		[ "SINGLE",		25499,		40245,		4		],
		[ "SINGLE",		40245,		55866,		6		],
		[ "SINGLE",		55866,		70606,		8		],
		[ "SINGLE",		70606,		360659,		9.3		],
		[ "SINGLE",		360659,		432787,		10.3	],
		[ "SINGLE",		432787,		721314,		11.3	],
		[ "SINGLE",		721314,		MAX_DOLLAR,	12.3	],

		[ "HOH",		0,			21527,		1		],
		[ "HOH",		21527,		51000,		2		],
		[ "HOH",		51000,		65744,		4		],
		[ "HOH",		65744,		81364,		6		],
		[ "HOH",		81364,		96107,		8		],
		[ "HOH",		96107,		490493,		9.3		],
		[ "HOH",		490493,		588593,		10.3	],
		[ "HOH",		588593,		980987,		11.3	],
		[ "HOH",		980987,		MAX_DOLLAR,	12.3	],

		[ "MFJ",		0,			21512,		1		],
		[ "MFJ",		21512,		50998,		2		],
		[ "MFJ",		50998,		80490,		4		],
		[ "MFJ",		80490,		111732,		6		],
		[ "MFJ",		111732,		141212,		8		],
		[ "MFJ",		141212,		721318,		9.3		],
		[ "MFJ",		721318,		865574,		10.3	],
		[ "MFJ",		865574,		1442628,	11.3	],
		[ "MFJ",		1442628,	MAX_DOLLAR,	12.3	],
	];
}
