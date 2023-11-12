const CRISTMAS_EVENT_CONSTANTS = Object.freeze({
	startDate: 1,
	endDate: 25,
	minSaleCost: 1000,
	costIncreaseStandard: 100,
});

const EVENT_CONSTANTS = Object.freeze({
	month: 12,
	startDate: 1,
	endDate: 31,
	minOrderCost: 10000,
	minSaleCost: 1000,
	cristmasEvent: CRISTMAS_EVENT_CONSTANTS,
	costIncreaseStandard: 100,
	weekdaySaleCost: 2023,
	weekendSaleCost: 2023,
	specialSaleCost: 1000,
});

export default EVENT_CONSTANTS;
