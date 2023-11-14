import MENU from '../src/Constants/Menu';
import MenuBoard from '../src/Model/MenuBoard';
import Order from '../src/Model/Order';

describe('Order', () => {
	test('OrderFormatter => 주문텍스트가 들어오면 주문 리스트로 변환한다.', () => {
		// given
		const userOrder = '해물파스타-1,제로콜라-1';
		const result = [
			['해물파스타', '1'],
			['제로콜라', '1'],
		];

		// when, then
		expect(Order.orderFormatter(userOrder)).toEqual(result);
	});

	test('Order 인스턴스는 주문 데이터를 가지고 있다.', () => {
		// given
		const userOrder = '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1';
		const menuBoard = new MenuBoard(MENU);
		const result = [
			{
				name: '티본스테이크',
				count: 1,
				totalPrice: 55000,
			},
			{
				name: '바비큐립',
				count: 1,
				totalPrice: 54000,
			},
			{
				name: '초코케이크',
				count: 2,
				totalPrice: 30000,
			},
			{
				name: '제로콜라',
				count: 1,
				totalPrice: 3000,
			},
		];

		// when
		const order = new Order(userOrder, menuBoard);

		// then
		expect(order.order).toEqual(result);
	});

	test('Order 인스턴스는 전체 주문 금액을 계산한다.', () => {
		// given
		const userOrder = '티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1';
		const menuBoard = new MenuBoard(MENU);
		const result = 142000;

		// when
		const order = new Order(userOrder, menuBoard);

		// then
		expect(order.totalPrice).toBe(result);
	});
});
