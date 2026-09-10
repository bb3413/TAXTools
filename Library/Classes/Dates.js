
function getAge(start_date, end_date) { 
	// Determine the number of years between the start date and end date.
	const startday = getDateObject(start_date);
	const endday = getDateObject(end_date);

	if (!startday || !endday) {
		return 0;
	}

	const start_year = startday.getFullYear();
	const end_year = endday.getFullYear();
	const startday_end_year = new Date(startday);
	let age = end_year - start_year;

	startday_end_year.setFullYear(end_year);
	if (isBefore(endday, startday_end_year)) {
		age -= 1;
	}

	return age;
}

function getEndOfYearAge(birthday, year) {
	return getAge(birthday, new Date(year, 11, 31));	// Months atart at 0
}

function getLastYear() {
	return getThisYear() - 1;
}

function getTaxYear() {
	const today = new Date();
	const tax_day = new Date(getThisYear(), 3, 15);	// Months atart at 0

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

function getDateObject(date) {
	const d = date instanceof Date ? date : new Date(date);
	return Number.isNaN(d.getTime()) ? null : d;
}

function isBefore(date1, date2) {
	const d1 = getDateObject(date1);
	const d2 = getDateObject(date2);
	if (!d1 || !d2) {
		return false;
	}
	return d1.getTime() < d2.getTime();
}

function isValid(date) {
	return getDateObject(date) !== null;
}

export const Dates = {
	getAge,
	getEndOfYearAge,
	getLastYear,
	getTaxYear,
	getThisYear,
	getToday,
	getDateObject,
	isBefore,
	isValid
};

export {
	getAge,
	getEndOfYearAge,
	getLastYear,
	getTaxYear,
	getThisYear,
	getToday,
	getDateObject,
	isBefore,
	isValid
};

if (typeof window !== "undefined") {
	window.Dates ??= Dates;
}
