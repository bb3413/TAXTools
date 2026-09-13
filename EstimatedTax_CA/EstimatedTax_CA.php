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

	<link rel="stylesheet" href="EstimatedTax_CA.css" />
	<script type="module" src="EstimatedTax_CA.js"></script>
	<title>California Estimated Tax Calculator</title>
</head>

<body>
	<div class="tool-container">
		<h1 class="title" id="Title">California Estimated Tax Calculator</h1>
		<h2 class="title">for the Tax Year
			<select id="tax-year" class="trigger" tooltipid="#tax-year-tt">
				<option value="2026">2026</option>
				<option value="2025">2025</option>
				<option value="2024">2024</option>
			</select>
		</h2>
		<p>This tool is intended to help you determine how much California income tax you
		would owe given the data you provide. The California income tax is based on the
		federal adjusted gross income (AGI), and then, additions and subtractions are made to
		account for differences in the federal and state tax laws. This means you need to
		provide and accurate estimate of the federal AGI and some of the values that were
		used to calculate it.</p>

		<p>The blue fields are computed from the information you provide. The green fields
		are where you enter information. The first column shows where the information can be
		found in the tax return. Click <a href="EstimatedTax_CA-Help.html">this link</a> for
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
				<input class="trigger input-field left" type="text" size="10"
					id="TaxpayersName" spellcheck="false" tooltipid="#TaxpayersNameTT" />

				<p class="label-field right">Version</p>
				<p class="trigger output-field" tooltipid="#tax-tools-version-tt">
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
				<p class="trigger output-field" id="TodaysDate"
					tooltipid="#TodaysDateTT">0</p>

				<p class="label-field right">Taxpayer's Birthday</p>
				<input class="trigger input-field left" type="text" size="36"
					placeholder="mm/dd/yyyy" id="TaxpayersBirthday"
					tooltipid="#TaxpayersBirthdayTT" />

				<p class="label-field right">Taxpayer's Age</p>
				<p class="trigger output-field" id="TaxpayersAge"
					tooltipid="#TaxpayersAgeTT">0</p>

				<p class="label-field right">Spouse's Birthday</p>
				<input class="trigger input-field left" type="text" size="36"
					placeholder="mm/dd/yyyy" id="SpousesBirthday"
					tooltipid="#SpousesBirthdayTT" />

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
				<p>540, line 17, State AGI</p>
				<p>= Federal AGI - Subtractions + Additions</p>
				<p>540, line 19, Taxable Income</p>
				<p>= State AGI - Deductions</p>
				<p>540, line 31, Income Tax</p>
				<p>= Tax on Taxable Income</p>
				<p>540, line 64, Total Tax</p>
				<p>= Income Tax - Exemptions - Non-refundable Credits + Other Taxes</p>
				<p>540, line 111, Refund / Amount Due</p>
				<p>= Payments + Refundable Credits - Total Tax</p>
			</div>

			<h3>Estimated Tax Calculation</h3>
			<div class="taxpayer-data-container">
				<p>540, line 11</p>
				<p>Exemptions</p>
				<p class="trigger output-field" id="Exemptions"
					tooltipid="#ExemptionsTT">0</p>
				<p>540, line 14</p>
				<p>Subtractions</p>
				<p class="trigger output-field" id="Subtractions"
					tooltipid="#SubtractionsTT">0</p>
				<p>540, line 16</p>
				<p>Additions</p>
				<p class="trigger output-field" id="Additions"
					tooltipid="#AdditionsTT">0</p>
				<p>540, line 18</p>
				<p>Deductions</p>
				<p class="trigger output-field" id="Deductions"
					tooltipid="#DeductionsTT">0</p>
				<p>540, line 47</p>
				<p>Non-refundable Credits</p>
				<p class="trigger output-field" id="NonrefundableCredits"
					tooltipid="#NonrefundableCreditsTT">0</p>
				<p>540, line 74-77</p>
				<p>Refundable Credits</p>
				<p class="trigger output-field" id="RefundableCredits"
					tooltipid="#RefundableCreditsTT">0</p>
				<p>540, line 61-63</p>
				<p>Other Taxes</p>
				<p class="trigger output-field" id="OtherTaxes"
					tooltipid="#OtherTaxesTT">0</p>
				<p>540, line 78</p>
				<p>Payments</p>
				<p class="trigger output-field" id="Payments"
					tooltipid="#PaymentsTT">0</p>

				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>&nbsp;</p>
				<p>540, line 17</p>
				<p>State AGI</p>
				<p class="trigger output-field" id="StateAGI"
					tooltipid="#StateAGITT">0</p>
				<p>540, line 19</p>
				<p>Taxable Income</p>
				<p class="trigger output-field" id="TaxableIncome"
					tooltipid="#TaxableIncomeTT">0</p>
				<p>540, line 31</p>
				<p>Income Tax</p>
				<p class="trigger output-field" id="IncomeTax"
					tooltipid="#IncomeTaxTT">0</p>
				<p>540, line 64</p>
				<p>Total Tax</p>
				<p class="trigger output-field" id="TotalTax"
					tooltipid="#TotalTaxTT">0</p>
				<p>540, line 111-115</p>
				<p>Refund (+) / Amount Due (-)</p>
				<p class="trigger output-field" id="RefundAmountDue"
					tooltipid="#RefundAmountDueTT">0</p>
				<p>540-ES</p>
				<p>Estimated Payment April (30%)</p>
				<p class="trigger output-field" id="AprilPayment"
					tooltipid="#EstimatedPaymentsTT">0</p>
				<p>540-ES</p>
				<p>Estimated Payment June (40%)</p>
				<p class="trigger output-field" id="JunePayment"
					tooltipid="#EstimatedPaymentsTT">0</p>
				<p>540-ES</p>
				<p>Estimated Payment September (0%)</p>
				<p class="trigger output-field" id="SeptemberPayment"
					tooltipid="#EstimatedPaymentsTT">0</p>
				<p>540-ES</p>
				<p>Estimated Payment January (30%)</p>
				<p class="trigger output-field" id="JanuaryPayment"
					tooltipid="#EstimatedPaymentsTT">0</p>
			</div>
		</div>

		<h2 class="title">Input Data</h2>
		<div class="taxpayer-data-container">
			<p>540, line 13</p>
			<p>Federal AGI</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="FederalAGI"
				tooltipid="#FederalAGITT" />

			<p>540, line 10</p>
			<p>Number of Dependents</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="NumberOfDependents"
				tooltipid="#NumberOfDependentsTT" />
		</div>

		<h3>Subtractions from Federal AGI</h3>
		<div class="taxpayer-data-container">
			<p>CA 540, part IA, line 2</p>
			<p>Interest on U. S. Treasury Obligations</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="USTreasuryObligations"
				tooltipid="#USTreasuryObligationsTT" />

			<p>CA 540, part IA, line 5</p>
			<p>Military Retirement Income</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="MilitaryRetirementIncome"
				tooltipid="#MilitaryRetirementIncomeTT" />

			<p>CA 540, part IA, line 6b</p>
			<p>Taxable Social Security</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="TaxableSocialSecurity"
				tooltipid="#TaxableSocialSecurityTT" />

			<p>CA 540, part IB, line 1</p>
			<p>State Tax Refund</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="StateTaxRefund"
				tooltipid="#StateTaxRefundTT" />

			<p>CA 540, part IB, line 7</p>
			<p>Unemployment Income</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="UnemploymentIncome"
				tooltipid="#UnemploymentIncomeTT" />

			<p>CA 540, part IB, line 8b</p>
			<p>California Lottery Winnings</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="CaliforniaLotteryWinnings"
				tooltipid="#CaliforniaLotteryWinningsTT" />

			<p>CA 540, part IB, line 8f</p>
			<p>Non-qualified HSA Distributions</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="NonqualifiedHSADistributions"
				tooltipid="#NonqualifiedHSADistributionsTT" />

			<p>CA 540, part IC, line 19</p>
			<p>Alimony Paid</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="AlimonyPaid"
				tooltipid="#AlimonyPaidTT" />

			<p>CA 540, part IC, line 24</p>
			<p>Other Subtractions</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="OtherSubtractions"
				tooltipid="#OtherSubtractionsTT" />
		</div>

		<h3>Additions to Federal AGI</h3>
		<div class="taxpayer-data-container">
			<p>CA 540, part IA, line 1h</p>
			<p>HSA Employer Contributions</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="HSAEmployerContributions"
				tooltipid="#HSAEmployerContributionsTT" />

			<p>CA 540, part IB, line 2</p>
			<p>Alimony Received</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="AlimonyReceived"
				tooltipid="#AlimonyReceivedTT" />

			<p>CA 540, part IB, line 8c</p>
			<p>Home Loan Debt Cancellation</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="HomeLoanDebtCancellation"
				tooltipid="#HomeLoanDebtCancellationTT" />

			<p>CA 540, part IB, line 8c</p>
			<p>Employer Paid Student Loan Payments</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="EmployerPaidStudentLoanPayments"
				tooltipid="#EmployerPaidStudentLoanPaymentsTT" />

			<p>CA 540, part IC, line 11</p>
			<p>Educator Expenses</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="EducatorExpenses"
				tooltipid="#EducatorExpensesTT" />

			<p>CA 540, part IC, line 13</p>
			<p>HSA Contributions</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="HSAContributions"
				tooltipid="#HSAContributionsTT" />

			<p>CA 540, part IC, line 20</p>
			<p>IRA Contributions</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="IRAContributions"
				tooltipid="#IRAContributionsTT" />

			<p>CA 540, part IC, line 24</p>
			<p>Other Additions</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="OtherAdditions"
				tooltipid="#OtherAdditionsTT" />
		</div>

		<h3>Itemized Deductions</h3>
		<div class="taxpayer-data-container">
			<p>CA 540, part II, line 17</p>
			<p>Federal Itemized Deductions</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="FederalItemizedDeductions"
				tooltipid="#FederalItemizedDeductionsTT" />

			<p>CA 540, part II, line 5a</p>
			<p>State Income Tax or Sales Tax</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="StateIncomeTax"
				tooltipid="#StateIncomeTaxTT" />

			<p>CA 540, part II, line 4</p>
			<p>Qualified HSA Distributions</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="QualifiedHSADistributions"
				tooltipid="#QualifiedHSADistributionsTT" />

			<p>CA 540, part II, line 5e</p>
			<p>SALT Limit Excess</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="SALTLimitExcess"
				tooltipid="#SALTLimitExcessTT" />

			<p>CA 540, part II, line 8a</p>
			<p>Home Mortgage Interest Limit</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="HomeMortgageInterestLimit"
				tooltipid="#HomeMortgageInterestLimitTT" />

			<p>CA 540, part II, line 20</p>
			<p>Tax Preparation Fee</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="TaxPreparationFee"
				tooltipid="#TaxPreparationFeeTT" />

			<p>CA 540, part II, line 21</p>
			<p>Safe Deposit Box</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="SafeDepositBox"
				tooltipid="#SafeDepositBoxTT" />

			<p>CA 540, part II, line 21</p>
			<p>Investment Fee</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="InvestmentFee"
				tooltipid="#InvestmentFeeTT" />

			<p>CA 540, part II, line 16</p>
			<p>Other Deductions</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="OtherDeductions"
				tooltipid="#OtherDeductionsTT" />
		</div>

		<h3>Other Taxes, Interest, and Penalties</h3>
		<div class="taxpayer-data-container">
			<p>540, line 92</p>
			<p>Shared Responsibility Penalty</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="SharedResponsibilityPenalty"
				tooltipid="#SharedResponsibilityPenaltyTT" />

			<p>540, line 112</p>
			<p>Interest and Penalties</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="InterestAndPenalties"
				tooltipid="#InterestAndPenaltiesTT" />

			<p>540, line 113</p>
			<p>Underpayment of Estimated Tax</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="UnderpaymentOfEstimatedTax"
				tooltipid="#UnderpaymentOfEstimatedTaxTT" />

			<p>540, line 91</p>
			<p>Use Tax</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="UseTax"
				tooltipid="#UseTaxTT" />

			<p>540, line 63</p>
			<p>Other Taxes</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="MiscellaneousTaxes"
				tooltipid="#MiscellaneousTaxesTT" />
		</div>

		<h3>Non-refundable Credits</h3>
		<div class="taxpayer-data-container">
			<p>540, line 40</p>
			<p>Child and Dependent Care Credit</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="ChildCareCredit"
				tooltipid="#ChildCareCreditTT" />

			<p>540, line 46</p>
			<p>Renter's Credit</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="RentersCredit"
				tooltipid="#RentersCreditTT" />

			<p>540, line 45</p>
			<p>Other Non-refundable Credits</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="OtherNonrefundableCredits"
				tooltipid="#OtherNonrefundableCreditsTT" />
		</div>

		<h3>Refundable Credits</h3>
		<div class="taxpayer-data-container">
			<p>540, line 75</p>
			<p>Earned Income Tax Credit (EITC)</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="EITC"
				tooltipid="#EITCTT" />

			<p>540, line 76</p>
			<p>Young Child Tax Credit</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="YoungChildTaxCredit"
				tooltipid="#YoungChildTaxCreditTT" />

			<p>540, line 77</p>
			<p>Foster Youth Tax Credit</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="FosterYouthTaxCredit"
				tooltipid="#FosterYouthTaxCreditTT" />

			<p>540, line 78</p>
			<p>Other Refundable Credits</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="OtherRefundableCredits"
				tooltipid="#OtherRefundableCreditsTT" />
		</div>

		<h3>Payments</h3>
		<div class="taxpayer-data-container">
			<p>540, line 71</p>
			<p>Withholding</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="Withholding"
				tooltipid="#WithholdingTT" />

			<p>540, line 72</p>
			<p>Estimated Payments</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="EstimatedPayments"
				tooltipid="#EstimatedPaymentsTT" />

			<p>540, line 78</p>
			<p>Other Payments</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="OtherPayments"
				tooltipid="#OtherPaymentsTT" />
		</div>

		<h3>Contributions</h3>
		<div class="taxpayer-data-container">
			<p>540, line 110</p>
			<p>Contributions</p>
			<input class="trigger input-field" type="text" size="10"
				placeholder="0" id="Contributions"
				tooltipid="#ContributionsTT" />
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
		<?php include "EstimatedTax_CA-HelpInput.html"; ?>
	</div>
</body>
</html>
