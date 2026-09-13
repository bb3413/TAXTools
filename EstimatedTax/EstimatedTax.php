<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8" />
	<link rel="stylesheet" href="../Library/CSS/TAXTools.css" />
	<link rel="stylesheet" href="../Library/CSS/Tooltips.css" />
	<link rel="stylesheet" href="../Library/CSS/HTML.css" />

	<script type="module" src="../Library/TAXTools/TAXTools.js"></script>
	<script type="module" src="../Library/TAXTools/Tooltips.js"></script>
	<script type="module" src="../Version/Version.js"></script>

	<link rel="stylesheet" href="EstimatedTax.css" />
	<script type="module" src="EstimatedTax.js"></script>
	<title>Federal Estimated Tax Calculator</title>
</head>

<body>
	<div class="tool-container">
		<h1 class="title" id="Title">Federal Estimated Tax Calculator</h1>
		<h2 class="title">for the Tax Year
			<select id="tax-year" class="trigger" tooltipid="#tax-year-tt">
				<option value="2026">2026</option>
				<option value="2025">2025</option>
				<option value="2024">2024</option>
			</select>
		</h2>
		<p>This tool is intended to help you determine how much federal income tax you
		would owe given the data you provide. Unlike a program for doing your taxes, which
		performs many more calculations, this tool just computes the amount of the tax
		given the values you enter. This allows you to experiment with different values to
		see the effect on your taxes.</p>

		<p>The blue fields are computed from the information you provide. The green fields
		are where you enter information. The first column shows where the information can be
		found in the tax return. Click <a href="EstimatedTax-Help.html">this link</a> for
		more help with this tool.</p>

		<div class="save-restore-container">
			<!-- Save Button -->
			<input type="button" id="SaveButton" class="trigger button save-button"
				value="Save" tooltipid="#SaveButtonTT" />

			<!-- Restore Button -->
			<input type="file" id="InputFile" accept=".txt" style="display: none;" />
			<label for="InputFile" class="trigger button restore-button"
				tooltipid="#RestoreButtonTT">Restore</label>
		</div>

		<div class="taxpayer-info-box">
			<div class="taxpayer-info-container">
				<p class="label-field right">Taxpayer's Name</p>
				<input class="trigger input-field left" type="text" id="TaxpayersName"
					spellcheck="false" size="36" tooltipid="#TaxpayersNameTT" />

				<p class="label-field right">Version</p>
				<p class="trigger output-field right" tooltipid="#tax-tools-version-tt">
					<a href="../Version/Version.html">
						<span id="tax-tools-version"></span></a>
				</p>

				<p class="label-field right">Filing Status</p>
				<select class="trigger input-field left" id="FilingStatus"
					tooltipid="#FilingStatusTT">
					<option value="Single">Single</option>
					<option value="HoH">HoH</option>
					<option value="MFJ">MFJ</option>
					<option value="QSS">QSS</option>
					<option value="MFS">MFS</option>
				</select>

				<p class="label-field right">Today's Date</p>
				<p class="trigger output-field right" id="TodaysDate"
					tooltipid="#TodaysDateTT">0</p>

				<p class="label-field right">Taxpayer's Birthday</p>
				<input class="trigger input-field left" type="text"
					id="TaxpayersBirthday" size="36"
					placeholder="mm/dd/yyyy" tooltipid="#TaxpayersBirthdayTT" />

				<p class="label-field right">Taxpayer's Age</p>
				<p class="trigger output-field" id="TaxpayersAge"
					tooltipid="#TaxpayersAgeTT">0</p>

				<p class="label-field right">Spouse's Birthday</p>
				<input class="trigger input-field left" type="text"
					id="SpousesBirthday" size="36"
					placeholder="mm/dd/yyyy" tooltipid="#SpousesBirthdayTT" />

				<p class="label-field right">Spouse's Age</p>
				<p class="trigger output-field" id="SpousesAge"
					tooltipid="#SpousesAgeTT">0</p>
			</div>

			<h3>Tax Formula</h3>
			<p>The tax formula below describes, at a high level, how the tax is calculated.
			The value of each item in the tax formula is shown in the Estimated Tax
			Calculation. You can see a brief description of any of the items by moving the
			mouse over the calculated value in the Estimated Tax Calculation.</p>

			<div class="tax-formula-container">
				<p>Total Income</p>
				<p>= Income from all sources - Non-taxable Income</p>
				<p>Adjusted Gross Income</p>
				<p>= Total Income - Adjustments</p>
				<p>Taxable Income</p>
				<p>= Adjusted Gross Income - Deductions</p>
				<p>Total Tax</p>
				<p>= Tax on Taxable Income + Other Taxes - Non-refundable Credits</p>
				<p>Refund / Amount Due</p>
				<p>= Payments + Refundable Credits - Total Tax</p>
				<p>Estimated Quarterly Tax Payments</p>
				<p>= (Estimated Payments - Amount Due) / 4</p>
			</div>

			<h3>Estimated Tax Calculation</h3>
			<div class="data-line">
				<p>1040, line 9</p>
				<p>Total Income</p>
				<p class="trigger output-field" tooltipid="#TotalIncomeTT"
					id="TotalIncome">0</p>
			</div>

			<div class="data-line">
				<p>1040, line 10</p>
				<p>Adjustments</p>
				<p class="trigger output-field" tooltipid="#AdjustmentsTT"
					id="Adjustments">0</p>
			</div>

			<div class="data-line">
				<p>1040, line 11</p>
				<p>Adjusted Gross Income</p>
				<p class="trigger output-field" tooltipid="#AdjustedGrossIncomeTT"
					id="AdjustedGrossIncome">0</p>
			</div>

			<div class="data-line">
				<p>1040, line 14</p>
				<p>Deductions</p>
				<p class="trigger output-field" tooltipid="#DeductionsTT"
					id="Deductions">0</p>
			</div>

			<div class="data-line">
				<p>1040, line 15</p>
				<p>Taxable Income</p>
				<p class="trigger output-field" tooltipid="#TaxableIncomeTT"
					id="TaxableIncome">0</p>
			</div>

			<div class="data-line">
				<p>1040, line 16</p>
				<p>Tax on Taxable Income</p>
				<p class="trigger output-field" tooltipid="#TaxOnTaxableIncomeTT"
					id="TaxOnTaxableIncome">0</p>
			</div>

			<div class="data-line">
				<p>1040, line 23</p>
				<p>Other Taxes</p>
				<p class="trigger output-field" tooltipid="#TotalOtherTaxesTT"
					id="TotalOtherTaxes">0</p>
			</div>

			<div class="data-line">
				<p>1040, line 20</p>
				<p>Non-refundable Credits</p>
				<p class="trigger output-field" tooltipid="#NonrefundableCreditsTT"
					id="NonrefundableCredits">0</p>
			</div>

			<div class="data-line">
				<p>1040, line 24</p>
				<p>Total Tax</p>
				<p class="trigger output-field" tooltipid="#TotalTaxTT"
					id="TotalTax">0</p>
			</div>

			<div class="data-line">
				<p>1040, line 32</p>
				<p>Refundable Credits</p>
				<p class="trigger output-field" tooltipid="#RefundableCreditsTT"
					id="RefundableCredits">0</p>
			</div>

			<div class="data-line">
				<p>1040, line 25, 26</p>
				<p>Payments</p>
				<p class="trigger output-field" tooltipid="#PaymentsTT"
					id="Payments">0</p>
			</div>

			<div class="data-line">
				<p>1040, line 34, 37</p>
				<p>Refund(+) / Amount Due(-)</p>
				<p class="trigger output-field" tooltipid="#AmountDueTT"
					id="AmountDue">0</p>
			</div>

			<div class="data-line">
				<p>1040-ES</p>
				<p>Estimated Quarterly Tax Payments</p>
				<p class="trigger output-field" tooltipid="#EstimatedTaxTT"
					id="EstimatedTax">0</p>
			</div>
		</div>

		<h2 class="title">Input Data</h2>
		<h3>Income</h3>
		<div class="data-line">
			<p>1040, line 1z</p>
			<p>Wages</p>
			<input class="trigger input-field" type="text"
				tooltipid="#WagesTT"
				id="Wages" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>1040, line 2a</p>
			<p>Tax-exempt Interest</p>
			<input class="trigger input-field" type="text"
				tooltipid="#TaxExemptInterestTT"
				id="TaxExemptInterest" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>1040, line 2b</p>
			<p>Taxable Interest</p>
			<input class="trigger input-field" type="text"
				tooltipid="#TaxableInterestTT"
				id="TaxableInterest" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>1040, line 3a</p>
			<p>Qualified Dividends</p>
			<input class="trigger input-field" type="text"
				tooltipid="#QualifiedDividendsTT"
				id="QualifiedDividends" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>1040, line 3b</p>
			<p>Ordinary Dividends</p>
			<input class="trigger input-field" type="text"
				tooltipid="#OrdinaryDividendsTT"
				id="OrdinaryDividends" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>1040, line 4b-5b</p>
			<p>Retirement Accounts, Pensions, Annuities (taxable amount only)</p>
			<input class="trigger input-field" type="text"
				tooltipid="#RetirementAccountsTT"
				id="RetirementAccounts" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>1040, line 6a</p>
			<p>Social Security (total amount received: SSA-1099, box 5)</p>
			<input class="trigger input-field" type="text"
				tooltipid="#SocialSecurityTT"
				id="SocialSecurity" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>1040, line 7a</p>
			<p>Capital Gains</p>
			<input class="trigger input-field" type="text"
				tooltipid="#CapitalGainsTT"
				id="CapitalGains" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>1040, line 8</p>
			<p>Self-employment Income</p>
			<input class="trigger input-field" type="text"
				tooltipid="#SelfEmploymentIncomeTT"
				id="SelfEmploymentIncome" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>1040, line 8</p>
			<p>Other Income</p>
			<input class="trigger input-field" type="text"
				tooltipid="#OtherIncomeTT"
				id="OtherIncome" placeholder="0" size="10" />
		</div>

		<h3>Other Taxes</h3>
		<div class="data-line">
			<p>1040 S2, line 4</p>
			<p>Self-employment Tax</p>
			<input class="trigger input-field" type="text"
				tooltipid="#SelfEmploymentTaxTT"
				id="SelfEmploymentTax" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>1040 S2, line 8</p>
			<p>Early Withdrawal Tax</p>
			<input class="trigger input-field" type="text"
				tooltipid="#EarlyWithdrawalTaxTT"
				id="EarlyWithdrawalTax" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>1040, line 23</p>
			<p>Other Taxes</p>
			<input class="trigger input-field" type="text"
				tooltipid="#OtherTaxesTT"
				id="OtherTaxes" placeholder="0" size="10" />
		</div>

		<h3>Adjustments</h3>
		<div class="data-line">
			<p>1040 S1, line 11</p>
			<p>Educator Expenses</p>
			<input class="trigger input-field" type="text"
				tooltipid="#EducatorExpensesTT"
				id="EducatorExpenses" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>1040 S1, line 13</p>
			<p>Health Savings Account Contributions</p>
			<input class="trigger input-field" type="text"
				tooltipid="#HealthSavingsAccountTT"
				id="HealthSavingsAccount" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>1040 S1, line 15</p>
			<p>Self-employment Tax Adjustment</p>
			<input class="trigger input-field" type="text"
				tooltipid="#SelfEmploymentTaxAdjustmentTT"
				id="SelfEmploymentTaxAdjustment" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>1040 S1, line 17</p>
			<p>Self-employed Health Insurance</p>
			<input class="trigger input-field" type="text"
				tooltipid="#SelfEmployedHealthInsuranceTT"
				id="SelfEmployedHealthInsurance" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>1040 S1, line 18</p>
			<p>Early Withdrawal Penalty</p>
			<input class="trigger input-field" type="text"
				tooltipid="#EarlyWithdrawalPenaltyTT"
				id="EarlyWithdrawalPenalty" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>1040 S1, line 19</p>
			<p>Alimony Paid</p>
			<input class="trigger input-field" type="text"
				tooltipid="#AlimonyPaidTT"
				id="AlimonyPaid" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>1040 S1, line 20</p>
			<p>IRA Contributions</p>
			<input class="trigger input-field" type="text"
				tooltipid="#IRAContributionsTT"
				id="IRAContributions" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>1040 S1, line 21</p>
			<p>Student Loan Interest</p>
			<input class="trigger input-field" type="text"
				tooltipid="#StudentLoanInterestTT"
				id="StudentLoanInterest" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>1040 S1, line 25</p>
			<p>Other Adjustments</p>
			<input class="trigger input-field" type="text"
				tooltipid="#OtherAdjustmentsTT"
				id="OtherAdjustments" placeholder="0" size="10" />
		</div>

		<h3>Deductions (non-itemized)</h3>
		<div class="data-line">
			<p>1040, line 13a</p>
			<p>Qualified Business Income Deduction</p>
			<input class="trigger input-field" type="text"
				tooltipid="#QualifiedBusinessIncomeDeductionTT"
				id="QualifiedBusinessIncomeDeduction" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>1040 S1-A, line 13</p>
			<p>Qualified Tips Deduction</p>
			<input class="trigger input-field" type="text"
				tooltipid="#QualifiedTipsDeductionTT"
				id="QualifiedTipsDeduction" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>1040 S1-A, line 21</p>
			<p>Qualified Overtime Deduction</p>
			<input class="trigger input-field" type="text"
				tooltipid="#QualifiedOvertimeDeductionTT"
				id="QualifiedOvertimeDeduction" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>1040 S1-A, line 30</p>
			<p>Car Loan Interest Deduction</p>
			<input class="trigger input-field" type="text"
				tooltipid="#CarLoanInterestDeductionTT"
				id="CarLoanInterestDeduction" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>1040 S1-A, line 37</p>
			<p>Enhanced Deduction for Seniors</p>
			<input class="trigger input-field" type="text"
				tooltipid="#SeniorDeductionTT"
				id="SeniorDeduction" placeholder="0" size="10" />
		</div>

		<h3>Deductions</h3>
		<div class="data-line">
			<p>Schedule A, line 1</p>
			<p>Medical Insurance</p>
			<input class="trigger input-field" type="text"
				tooltipid="#MedicalInsuranceTT"
				id="MedicalInsurance" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>Schedule A, line 1</p>
			<p>Doctor Visits</p>
			<input class="trigger input-field" type="text"
				tooltipid="#DoctorVisitsTT"
				id="DoctorVisits" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>Schedule A, line 1</p>
			<p>Prescription Medication</p>
			<input class="trigger input-field" type="text"
				tooltipid="#PrescriptionDrugsTT"
				id="PrescriptionDrugs" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>Schedule A, line 1</p>
			<p>Medical Aids</p>
			<input class="trigger input-field" type="text"
				tooltipid="#MedicalAidsTT"
				id="MedicalAids" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>Schedule A, line 1</p>
			<p>Long Term Care Insurance (taxpayer)</p>
			<input class="trigger input-field" type="text"
				tooltipid="#LTCTaxpayerTT"
				id="LTCTaxpayer" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>Schedule A, line 1</p>
			<p>Long Term Care Insurance (spouse)</p>
			<input class="trigger input-field" type="text"
				tooltipid="#LTCSpouseTT"
				id="LTCSpouse" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>Schedule A, line 1</p>
			<p>Medical Miles</p>
			<input class="trigger input-field" type="text"
				tooltipid="#MedicalMilesTT"
				id="MedicalMiles" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>Schedule A, line 1</p>
			<p>Other Medical Expenses</p>
			<input class="trigger input-field" type="text"
				tooltipid="#OtherMedicalExpensesTT"
				id="OtherMedicalExpenses" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>Schedule A, line 5a</p>
			<p>State Income Tax</p>
			<input class="trigger input-field" type="text"
				tooltipid="#StateIncomeTaxTT"
				id="StateIncomeTax" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>Schedule A, line 5a</p>
			<p>Sales Tax</p>
			<input class="trigger input-field" type="text"
				tooltipid="#SalesTaxTT"
				id="SalesTax" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>Schedule A, line 5b</p>
			<p>Real Estate Property Tax</p>
			<input class="trigger input-field" type="text"
				tooltipid="#RealEstatePropertyTaxTT"
				id="RealEstatePropertyTax" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>Schedule A, line 5c</p>
			<p>Personal Property Tax</p>
			<input class="trigger input-field" type="text"
				tooltipid="#PersonalPropertyTaxTT"
				id="PersonalPropertyTax" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>Schedule A, line 10</p>
			<p>Mortgage Interest</p>
			<input class="trigger input-field" type="text"
				tooltipid="#MortgageInterestTT"
				id="MortgageInterest" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>Schedule A, line 11</p>
			<p>Cash Gifts to Charity</p>
			<input class="trigger input-field" type="text"
				tooltipid="#CashGiftsToCharityTT"
				id="CashGiftsToCharity" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>1040 S1-A, line 10</p>
			<p>Non-cash Gifts to Charity</p>
			<input class="trigger input-field" type="text"
				tooltipid="#NoncashGiftsToCharityTT"
				id="NoncashGiftsToCharity" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p></p>
			<p>Qualified Charitable Distribution</p>
			<input class="trigger input-field" type="text"
				tooltipid="#QualifiedCharitableDistributionTT"
				id="QualifiedCharitableDistribution" placeholder="0" size="10" />
		</div>

		<h3>Non-refundable Credits</h3>
		<div class="data-line">
			<p>Schedule 3, line 3</p>
			<p>American Opportunity Credit (non-refundable part)</p>
			<input class="trigger input-field" type="text"
				tooltipid="#AmericanOppCreditNoRefundTT"
				id="AmericanOppCreditNoRefund" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>Schedule 3, line 2</p>
			<p>Child and Dependent Care Credit</p>
			<input class="trigger input-field" type="text"
				tooltipid="#ChildCareCreditTT"
				id="ChildCareCredit" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>1040, line 19</p>
			<p>Child Tax Credit</p>
			<input class="trigger input-field" type="text"
				tooltipid="#ChildTaxCreditTT"
				id="ChildTaxCredit" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>Schedule 3, line 1</p>
			<p>Foreign Tax Credit</p>
			<input class="trigger input-field" type="text"
				tooltipid="#ForeignTaxCreditTT"
				id="ForeignTaxCredit" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>Schedule 3, line 3</p>
			<p>Lifetime Learning Credit</p>
			<input class="trigger input-field" type="text"
				tooltipid="#LifetimeLearningCreditTT"
				id="LifetimeLearningCredit" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>Schedule 3, line 5</p>
			<p>Residential Energy Credit</p>
			<input class="trigger input-field" type="text"
				tooltipid="#ResidentialEnergyCreditTT"
				id="ResidentialEnergyCredit"
				placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>Schedule 3, line 4</p>
			<p>Retirement Savings Contribution Credit</p>
			<input class="trigger input-field" type="text"
				tooltipid="#RetirementSavingsCreditTT"
				id="RetirementSavingsCredit" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>Schedule 3, line 6</p>
			<p>Other Non-refundable Credits</p>
			<input class="trigger input-field" type="text"
				tooltipid="#OtherNonrefundableCreditsTT"
				id="OtherNonrefundableCredits" placeholder="0" size="10" />
		</div>

		<h3>Refundable Credits</h3>
		<div class="data-line">
			<p>Schedule 3, line 3</p>
			<p>American Opportunity Credit (refundable part)</p>
			<input class="trigger input-field" type="text"
				tooltipid="#AmericanOppCreditRefundableTT"
				id="AmericanOppCreditRefundable" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>1040, line 19</p>
			<p>Credit for Other Dependents</p>
			<input class="trigger input-field" type="text"
				tooltipid="#CreditForOtherDependentsTT"
				id="CreditForOtherDependents" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>1040, line 27</p>
			<p>Earned Income Credit</p>
			<input class="trigger input-field" type="text"
				tooltipid="#EarnedIncomeCreditTT"
				id="EarnedIncomeCredit" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>Schedule 3, line 9</p>
			<p>Premium Tax Credit</p>
			<input class="trigger input-field" type="text"
				tooltipid="#PremiumTaxCreditTT"
				id="PremiumTaxCredit" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>Schedule 3, line 13</p>
			<p>Other Refundable Credits</p>
			<input class="trigger input-field" type="text"
				tooltipid="#OtherRefundableCreditsTT"
				id="OtherRefundableCredits" placeholder="0" size="10" />
		</div>

		<h3>Payments</h3>
		<div class="data-line">
			<p>1040, line 25d</p>
			<p>Withholding</p>
			<input class="trigger input-field" type="text"
				tooltipid="#WithholdingTT"
				id="Withholding" placeholder="0" size="10" />
		</div>

		<div class="data-line">
			<p>1040, line 26</p>
			<p>Estimated Taxes Paid</p>
			<input class="trigger input-field" type="text"
				tooltipid="#EstimatedTaxPaidTT"
				id="EstimatedTaxPaid" placeholder="0" size="10" />
		</div>

		<!-- Display area for error messages. -->
		<div id="error-message-container">
			<p id="error-message-output"></p>
		</div>

		<!-- Display area for debugging information. -->
		<div id="debug-container">
			<h3>Debugging Output</h3>
			<pre id="debug-output"></pre>
		</div>

		<!-- Tooltips -->
		<?php include "EstimatedTax-HelpInput.html"; ?>
	</div>
</body>
</html>
