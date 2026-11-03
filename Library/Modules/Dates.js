
export const Dates = {
	getAge,
	getDateObject,
	getEndOfYearAge,
	getLastYear,
	getPreviousDay,
	getTaxYear,
	getThisYear,
	getToday,
	isBefore,
	isEqual,
	isValid,
};

import { Ensure } from "../Modules/Ensure.js";

function getAge(start_date, end_date) {
	// Determine the number of years between the start date and end date.
	// Note; you turn one on the day before your birthday; hence the use of
	// getPreviousDay().
	// const start_day	= getPreviousDay(start_date);
	const start_day	= getDateObject(start_date);
	const end_day	= getDateObject(end_date);

	if (!isValid(start_day) || !isValid(end_day)) {
		return 0;
	}

	const start_year = start_day.getFullYear();
	const end_year = end_day.getFullYear();
	const start_day_end_year = new Date(start_day);
	let age = end_year - start_year;

	start_day_end_year.setFullYear(end_year);
	if (isBefore(end_day, start_day_end_year)) {
		age -= 1;
	}

	return age;
}

function getDateObject(date) {
	const d = date instanceof Date ? date : new Date(date);
	return Number.isNaN(d.getTime()) ? null : d;
}

function getEndOfYearAge(birthday, year) {
	if (!isValid(birthday)) {
		return 0;
	}
	return getAge(birthday, new Date(year, 11, 31));	// Months start at 0
}

function getLastYear() {
	return getThisYear() - 1;
}

function getPreviousDay(date) {
	const day_before = getDateObject(date);
	if (day_before) {
		day_before.setDate(day_before.getDate() - 1);
	}
	return day_before;
}

function getTaxYear() {
	const today		= new Date();
	const tax_day	= new Date(getThisYear(), 3, 15);	// Months start at 0

	if (today < tax_day) {
		return getLastYear();
	}
	return getThisYear();
}

function getThisYear() {
	return new Date().getFullYear();
}

function getToday() {
	// Return today's date formatted according to the user's locale.
	return new Date().toLocaleDateString();
}

function isBefore(date1, date2) {
	const d1 = getDateObject(date1);
	const d2 = getDateObject(date2);

	if (!isValid(d1) || !isValid(d2)) {
		return false;
	}
	return d1.getTime() < d2.getTime();
}

function isEqual(date1, date2) {
	const d1 = getDateObject(date1);
	const d2 = getDateObject(date2);

	if (!isValid(d1) || !isValid(d2)) {
		return false;
	}
	return d1.getTime() === d2.getTime();
}

function isValid(date) {
	return getDateObject(date) !== null;
}
