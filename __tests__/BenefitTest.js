import MENU from '../src/Constants/Menu';
import Benefit from '../src/Controller/Benefit';
import Calendar from '../src/Model/Calendar';
import MenuBoard from '../src/Model/MenuBoard';
import Order from '../src/Model/Order';

describe('Benefit', () => {
	test.each([
		[3, '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1', 31246],
		[4, '티본스테이크-1,바비큐립-1', 1300],
		[26, '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1', 29046],
	])('%s일에 %s를 주문했을 때의 총 혜택 금액을 계산할 수 있다.', (first, second, third) => {
		// given
		const visitDate = first;
		const userOrder = second;
		const result = third;

		// when
		const calendar = new Calendar(visitDate);
		const menuBoard = new MenuBoard(MENU);
		const order = new Order(userOrder, menuBoard);

		const benefit = new Benefit(order, calendar);

		// then
		expect(benefit.totalBenefits).toBe(result);
	});

	test.each([
		[3, '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1', 6246],
		[4, '티본스테이크-1,바비큐립-1', 1300],
		[26, '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1', 4046],
	])('%s일에 %s를 주문했을 때의 실제 차감되는 금액을 계산할 수 있다.', (first, second, third) => {
		// given
		const visitDate = first;
		const userOrder = second;
		const result = third;

		// when
		const calendar = new Calendar(visitDate);
		const menuBoard = new MenuBoard(MENU);
		const order = new Order(userOrder, menuBoard);

		const benefit = new Benefit(order, calendar);

		// then
		expect(benefit.discountBenefit).toBe(result);
	});
});
