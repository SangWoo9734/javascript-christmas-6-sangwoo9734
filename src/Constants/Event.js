const CRISTMAS_EVENT_CONSTANTS = Object.freeze({
	startDate: 1,
	endDate: 25,
	minSaleCost: 1000,
	costIncreaseStandard: 100,
});

const SPECIAL_DATES = Object.freeze([3, 10, 17, 24, 25, 31]);

const EVENT_BEDGE = Object.freeze({
	level1: {
		bedge: '별',
		stendard: 5000,
	},
	level2: {
		bedge: '트리',
		stendard: 10000,
	},
	level3: {
		bedge: '산타',
		stendard: 20000,
	},
});

const EVENT_CONSTANTS = Object.freeze({
	year: 2023,
	month: 12,
	startDate: 1,
	endDate: 31,
	minOrderCost: 10000,
	minSaleCost: 1000,
	cristmasEvent: CRISTMAS_EVENT_CONSTANTS,
	specialDates: SPECIAL_DATES,
	costIncreaseStandard: 100,
	weekdaySaleCost: 2023,
	weekendSaleCost: 2023,
	specialSaleCost: 1000,
	gift: '샴페인',
});

export { EVENT_CONSTANTS, EVENT_BEDGE };
