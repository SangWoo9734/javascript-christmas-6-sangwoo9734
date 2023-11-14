import { EVENT_CONSTANTS } from '../Constants/Event.js';

class Calendar {
	#visitDate;

	constructor(visitDate) {
		this.#visitDate = new Date(EVENT_CONSTANTS.year, EVENT_CONSTANTS.month - 1, visitDate);
	}

	#isCristmasPeriod() {
		const date = this.#visitDate.getDate();
		return (
			date >= EVENT_CONSTANTS.cristmasEvent.startDate &&
			date <= EVENT_CONSTANTS.cristmasEvent.endDate
		);
	}

	#isWeekday() {
		const day = this.#visitDate.getDay();
		return day !== 5 && day !== 6;
	}

	#isSpecialDay() {
		const date = this.#visitDate.getDate();

		return EVENT_CONSTANTS.specialDates.includes(date);
	}

	get visitDate() {
		return this.#visitDate.getDate();
	}

	get dayBenefit() {
		return {
			isCristmasBenefit: this.#isCristmasPeriod(),
			isWeedayBenefit: this.#isWeekday(),
			isSpecialBenefit: this.#isSpecialDay(),
		};
	}
}

export default Calendar;
