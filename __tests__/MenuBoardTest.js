import MenuBoard from '../src/Model/MenuBoard.js';

describe('MenuBoard', () => {
	// given
	const menu = {
		food: {
			korTitle: '음식',
			menu: [
				{
					name: '양송이수프',
					price: 6000,
				},
				{
					name: '타파스',
					price: 5500,
				},
				{
					name: '시저샐러드',
					price: 8000,
				},
			],
		},
		drink: {
			korTitle: '음료',
			menu: [
				{
					name: '제로콜라',
					price: 3000,
				},
				{
					name: '레드와인',
					price: 60000,
				},
				{
					name: '샴페인',
					price: 25000,
				},
			],
		},
	};
	let menuBoard;

	beforeEach(() => {
		// when
		menuBoard = new MenuBoard(menu);
	});

	test('모든 메뉴를 불러올 수 있다.', () => {
		// given
		const result = [
			{
				name: '양송이수프',
				price: 6000,
			},
			{
				name: '타파스',
				price: 5500,
			},
			{
				name: '시저샐러드',
				price: 8000,
			},
			{
				name: '제로콜라',
				price: 3000,
			},
			{
				name: '레드와인',
				price: 60000,
			},
			{
				name: '샴페인',
				price: 25000,
			},
		];

		// then
		expect(menuBoard.allMenuList).toEqual(result);
	});

	test('특정 카테고리의 메뉴만 불러올 수 있다.', () => {
		// given
		const category = 'food';
		const result = ['양송이수프', '타파스', '시저샐러드'];

		// then
		expect(menuBoard.getAllNameInCategory(category)).toEqual(result);
	});

	test('메뉴 이름을 검색할 수 있다.', () => {
		// given
		const menuName = '제로콜라';
		const result = {
			name: '제로콜라',
			price: 3000,
		};

		// then
		expect(menuBoard.searchMenu(menuName)).toEqual(result);
	});
});
