
import { Debug }		from "../Modules/Debug.js";
import { Line }			from "../Classes/Line.js";
import { TaxForm }		from "../Classes/TaxForm.js";
import { TaxFormObj }	from "../Modules/TaxFormObj.js";


export class F1040S3 extends TaxForm {
	constructor(formname) {
		Debug.enter("F1040S3.Constructor()");
		super(formname);
		this.title = `Schedule 3 - Additional Credits and Payments`;

		// Non-refundable Credits
		this.lines["01"]	= new Line("Foreign Tax Credit");
		this.lines["02"]	= new Line("Child and Dependent Care Credit");
		this.lines["03"]	= new Line("Education Credit");
		this.lines["04"]	= new Line("Retirement Savings Credit");
		this.lines["05a"]	= new Line("Residential Clean Energy Credit");
		this.lines["05b"]	= new Line("Energy Efficient Home Credit");
		this.lines["06a"]	= new Line("General Business Credit");
		this.lines["06b"]	= new Line("Credit for Prior Year Minimum Tax");
		this.lines["06c"]	= new Line("Adoption Credit");
		this.lines["06d"]	= new Line("Credit for Elderly or Disabled");
		this.lines["06e"]	= new Line("Reserved for Future Use");
		this.lines["06f"]	= new Line("Clean Vehicle Credit");
		this.lines["06g"]	= new Line("Mortgage Interest Credit");
		this.lines["06h"]	= new Line("DC Homebuyer Credit");
		this.lines["06i"]	= new Line("EV Credit");
		this.lines["06j"]	= new Line("Refueling Property Credit");
		this.lines["06k"]	= new Line("Tax Credit Bond Holder Credit");
		this.lines["06l"]	= new Line("Partner's Additional Reporting");
		this.lines["06m"]	= new Line("Used EV Credit");
		this.lines["06z"]	= new Line("Non-refundable Credits Not Listed");
		this.lines["07"]	= new Line("Total Other Non-refundable Credits");
		this.lines["08"]	= new Line("Total Non-refundable Credits");

		// Other Payments and Refundable Credits
		this.lines["09"]	= new Line("PTC");
		this.lines["10"]	= new Line("Amount Paid with Extension Request");
		this.lines["11"]	= new Line("Excess SS Withheld");
		this.lines["12"]	= new Line("Tax on Fuels Credit");
		this.lines["13a"]	= new Line("Undistributed LT Gains");
		this.lines["13b"]	= new Line("Section 1341 Credit");
		this.lines["13c"]	= new Line("Payment from Form 3800");
		this.lines["13d"]	= new Line("Deferred 965 Tax Liability");
		this.lines["13z"]	= new Line("Other Refundable Credits");
		this.lines["14"]	= new Line("Total Other Refundable Credits");
		this.lines["15"]	= new Line("Total Refundable Credits");

		Debug.exit("F1040S3.Constructor()");
	}

	calculate() {
		if (this.calculated) {
			throw new Error(`${this.formname} already calculated.`);
		}

		Debug.enter("F1040S3.calculate()");
		this.calculated = true;

/*		foreignTaxCredt = TaxFormObj.getValue("F1099INT", "xx") +
									TaxFormObj.getValue("F1099DIV", "xx") +
									TaxFormObj.getValue("F1041", "xx") +
									TaxFormObj.getValue("F1165", "xx");
		if foreignTaxCredt < 300 per spouse
			1040S3[1] = foreignTaxCredt
		else
			1040S3[1] f1116[35]
*/
		// Non-refundable Credits
		this.lines["01"].value	= TaxFormObj.getValue("F1116", "xx");	// Foreign Credit"
		this.lines["02"].value	= TaxFormObj.getValue("F2441", "11");	// Child Care Credit
		this.lines["03"].value	= TaxFormObj.getValue("F8863", "19");	// Education Credit
		this.lines["04"].value	= TaxFormObj.getValue("F8880", "xx");	// Retirement Credit
		this.lines["05a"].value	= TaxFormObj.getValue("F5695", "15");	// Energy Credit
		this.lines["05b"].value	= TaxFormObj.getValue("F5695", "32");	// Energy Credit
		this.lines["06a"].value	= TaxFormObj.getValue("F3800", "xx");	// Business Credit
		this.lines["06b"].value	= TaxFormObj.getValue("F8801", "25");	// Minimum Tax Credit
		this.lines["06c"].value	= TaxFormObj.getValue("F8839", "xx");	// Adoption Credit
		this.lines["06d"].value	= TaxFormObj.getValue("F1040SR", "xx");	// Elderly/Disabled
		this.lines["06e"].value	= 0;									// Reserved
		this.lines["06f"].value	= TaxFormObj.getValue("F8936", "xx");	// Clean Vehicle
		this.lines["06g"].value	= TaxFormObj.getValue("F8396", "xx");	// Mortgage Int
		this.lines["06h"].value	= TaxFormObj.getValue("F8859", "xx");	// DC Homebuyer
		this.lines["06i"].value	= TaxFormObj.getValue("F8834", "xx");	// EV Credit
		this.lines["06j"].value	= TaxFormObj.getValue("F8911", "xx");	// Refueling Credit
		this.lines["06k"].value	= TaxFormObj.getValue("F8912", "xx");	// Bond Holder Credit
		this.lines["06l"].value	= TaxFormObj.getValue("F8978", "14");	// Partner's
		this.lines["06m"].value	= TaxFormObj.getValue("F8936", "xx");	// Used EV Credit
		this.lines["06z"].value	= 0;	// Non-refundable Credits Not Listed
		this.lines["07"].value	= this.add("06a","06b","06c","06d",
										   "06e","06f","06g","06h",
										   "06i","06j","06k","06l",
										   "06m","06z");	// Other Non-refundable Credits
		this.lines["08"].value	= this.add("01","02","03","04",
										   "05a","07");		// Total Non-refundable Credits

		// Other Payments and Refundable Credits
		this.lines["09"].value	= TaxFormObj.getValue("F8962", "xx");	// PTC
		this.lines["10"].value	= 0;								// Extension Request
		this.lines["11"].value	= 0;								// Excess SS Withheld
		this.lines["12"].value	= TaxFormObj.getValue("F4136", "xx");	// Tax on Fuels 
		this.lines["13a"].value	= TaxFormObj.getValue("F2439", "xx");	// LT Gains
		this.lines["13b"].value	= 0;								// Section 1341 Credit
		this.lines["13c"].value	= TaxFormObj.getValue("F3800", "06");	// Form 3800
		this.lines["13d"].value	= 0;								// Deferred Liability
		this.lines["13z"].value	= 0;								// Other Refundable
		this.lines["14"].value	= this.add("13a","13b","13c",
										   	"13d","13z");	// Other Refundable Credits
		this.lines["15"].value	= this.add("09","10","11","12","14");	// Refundable Credits

		Debug.exit("F1040S3.calculate()");
	}
}
