import Calendar from '../src/Model/Calendar';

describe('Calendar', () => {
	test('캘린더 인스턴스는 방문 일자 값을 가지고 있다.', () => {
		// given
		const visitDate = 10;

		// when
		const calendar = new Calendar(visitDate);

		// then
		expect(calendar.visitDate).toBe(10);
	});

	test('캘린더 인스턴스는 방문일에 받을 수 있는 혜택 여부를 알 수 있다.', () => {
		// given
		const visitDate = 25;
		// when
		const calendar = new Calendar(visitDate);

		// then
		expect(calendar.dayBenefit).toEqual({
			isCristmasBenefit: true,
			isWeekdayBenefit: true,
			isSpecialBenefit: true,
		});
	});
});
