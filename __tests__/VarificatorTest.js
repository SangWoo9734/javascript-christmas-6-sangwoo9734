import Varificator from '../src/Util/Varificator';

describe('Varificator', () => {
	describe('isInvalidNumebr => 입력값이 양의 정수인지 아닌지 판단한다.', () => {
		test.each([
			// given
			['1'],
			[1],
		])('%s는 숫자이다.', (value) => {
			// when, then

			expect(Varificator.isInvalidNumber(value)).toBe(false);
		});

		test.each([
			// given
			['-1'],
			['0.5'],
			['ㄹ'],
			[undefined],
		])('%s는 양의 정수가 아니다.', (value) => {
			// when, then

			expect(Varificator.isInvalidNumber(value)).toBe(true);
		});
	});

	describe('isNotNumberInRange => 숫자가 범위 내에 있는 숫자인지 판단한다.', () => {
		test.each([
			// given
			[8],
			[12],
		])('%s는 범위 내에 있는 숫자이다.', (value) => {
			// when, then
			const maxRange = 20;
			const minRange = 1;

			expect(Varificator.isNotNumberInRange(value, maxRange, minRange)).toBe(false);
		});

		test.each([
			// given
			[3],
			[20],
		])('%s는 범위 밖에 있는 숫자이다.', (value) => {
			// when, then
			const maxRange = 10;
			const minRange = 5;

			expect(Varificator.isNotNumberInRange(value, maxRange, minRange)).toBe(true);
		});
	});

	describe('isInvalidOrderformat => 주문이 주문 양식에 맞는지 판단한다.', () => {
		// given
		test.each([
			['해산물파스타-2,레드와인-11,초코케이크-1'],
			['고추바사삭-2'],
			['포테이토피자-2,레드와인-1,사이다-2,치즈스파게티-1'],
		])('%s는 주문 양식과 일치한다.', (order) => {
			// when, then
			expect(Varificator.isInvalidOrderformat(order)).toBe(false);
		});

		test.each([
			// given
			['해산물파스타-2,레드와인-11,초코케이크-'],
			['고추바사삭-2,'],
			['포테이토피자-2,레'],
			['포테이토피자-ㅇㄹㄴ,'],
		])('%s는 주문 양식과 일치하지 않는다.', (order) => {
			// when, then
			expect(Varificator.isInvalidOrderformat(order)).toBe(true);
		});
	});

	describe('isMenuNotInMenuBoard => 메뉴판에 있는 메뉴인지 판단한다.', () => {
		test.each([
			// given
			['제로콜라-1', [['제로콜라', '1']]],
			[
				'레드와인-1,시저샐러드-1',
				[
					['레드와인', '1'],
					['시저샐러드', '1'],
				],
			],
			[
				'샴페인-1,타파스-1,해산물파스타-1',
				[
					['샴페인', '1'],
					['타파스', '1'],
					['해산물파스타', '1'],
				],
			],
		])('주문 "%s"는 메뉴판에 있는 메뉴만 주문했다.', (_, order) => {
			// when, then
			expect(Varificator.isMenusNotInMenuBoard(order)).toBe(false);
		});

		test.each([
			// given
			['사이다-1', [['사이다', '1']]],
			[
				'레드와인-1,고추바사삭-1',
				[
					['레드와인', '1'],
					['고추바사삭', '1'],
				],
			],
			[
				'샴페인-1,타파스-1,해산물파스타-1',
				[
					['샴페인', '1'],
					['치킨무', '1'],
					['해산물파스타', '1'],
				],
			],
		])('주문 "%s"는 메뉴판에 없는 메뉴를 포함하고 있다.', (_, order) => {
			// when, then
			expect(Varificator.isMenusNotInMenuBoard(order)).toBe(true);
		});
	});

	describe('isInvalidMenuCount => 주문한 메뉴의 개수가 유효한 개수인지 판단한다.', () => {
		test.each([
			// given
			[
				'레드와인-1,시저샐러드-11',
				[
					['레드와인', '1'],
					['시저샐러드', '11'],
				],
			],
			[
				'샴페인-12,타파스-1,해산물파스타-1323',
				[
					['샴페인', '12'],
					['타파스', '1'],
					['해산물파스타', '1323'],
				],
			],
		])('주문 "%s"는 메뉴중 메뉴의 개수가 유효하다..', (_, order) => {
			// when, then
			expect(Varificator.isInvalidMenuCount(order)).toBe(false);
		});

		test.each([
			// given
			['제로콜라-ㅁ', [['제로콜라', 'ㅁ']]],
			[
				'레드와인-1,시저샐러드-1.1',
				[
					['레드와인', '1'],
					['시저샐러드', '1.1'],
				],
			],
			[
				'샴페인-0,타파스-1,해산물파스타-1323',
				[
					['샴페인', '0'],
					['타파스', '1'],
					['해산물파스타', '1323'],
				],
			],
		])('주문 "%s"는 메뉴중 메뉴의 개수가 유효하지 않다.', (_, order) => {
			// when, then
			expect(Varificator.isInvalidMenuCount(order)).toBe(true);
		});
	});

	describe('isDuplicatedMenu => 주문 중 중복된 메뉴가 있는지 판단한다.', () => {
		test.each([
			// given
			[
				'레드와인-1,시저샐러드-1',
				[
					['레드와인', '1'],
					['시저샐러드', '1'],
				],
			],
			[
				'샴페인-1,타파스-1,해산물파스타-1323',
				[
					['샴페인', '1'],
					['타파스', '1'],
					['해산물파스타', '2'],
				],
			],
		])('주문 "%s"는 메뉴중 중복된 메뉴가 없다.', (_, order) => {
			// when, then
			expect(Varificator.isDuplicatedMenu(order)).toBe(false);
		});

		test.each([
			// given
			[
				'레드와인-1,레드와인-4',
				[
					['레드와인', '1'],
					['레드와인', '4'],
				],
			],
			[
				'해산물파스타-1,타파스-1,해산물파스타-1323',
				[
					['해산물파스타', '1'],
					['타파스', '1'],
					['해산물파스타', '1323'],
				],
			],
		])('주문 "%s"는 메뉴중 메뉴의 개수가 유효하지 않다.', (_, order) => {
			// when, then
			expect(Varificator.isDuplicatedMenu(order)).toBe(true);
		});
	});

	describe('isOverMaxMenuCount => 주문한 메뉴 총 개수가 최대 메뉴 개수를 초과하는지 확인한다.', () => {
		test.each([
			// given
			[
				'시저샐러드-1,티본스테이크-1,크리스마스파스타-1,제로콜라-3,아이스크림-1',
				[
					['시저샐러드', '1'],
					['티본스테이크', '1'],
					['크리스마스파스타', '1'],
					['제로콜라', '3'],
					['아이스크림', '1'],
				],
			],
			[
				'타파스-2, 바비큐립-4, 샴페인-14',
				[
					['타파스', '2'],
					['바비큐립', '4'],
					['샴페인', '14'],
				],
			],
		])('%s는 최대 메뉴 개수를 초과하지 않는다.', (_, value) => {
			// when, then
			expect(Varificator.isOverMaxMenuCount(value)).toBe(false);
		});

		test.each([
			// given
			[
				'시저샐러드-1,티본스테이크-1,크리스마스파스타-1,제로콜라-3,아이스크림-16',
				[
					['시저샐러드', '2'],
					['티본스테이크', '4'],
					['크리스마스파스타', '1'],
					['제로콜라', '1'],
					['아이스크림', '16'],
				],
			],
			[
				'시저샐러드-2,티본스테이크-4,크리스마스파스타-1,타파스-2,바비큐립-4,샴페인-1,아이스크림-1,초코케이크-2',
				[
					['시저샐러드', '2'],
					['티본스테이크', '4'],
					['크리스마스파스타', '1'],
					['타파스', '2'],
					['바비큐립', '4'],
					['샴페인', '1'],
					['아이스크림', '5'],
					['초코케이크', '2'],
				],
			],
		])('%s는 최대 메뉴 개수를 초과한다.', (_, value) => {
			// when, then
			expect(Varificator.isOverMaxMenuCount(value)).toBe(true);
		});
	});

	describe('isMenuOnlyBeverage => 음료만 주문했는지 확인한다.', () => {
		test.each([
			// given
			[
				'시저샐러드-1,티본스테이크-1,크리스마스파스타-1',
				[
					['시저샐러드', '1'],
					['티본스테이크', '1'],
					['제로콜라', '1'],
				],
			],
			[
				'타파스-2,바비큐립-4,샴페인-1',
				[
					['타파스', '2'],
					['바비큐립', '4'],
					['샴페인', '1'],
				],
			],
		])('%s는 음료만 시키지 않았다.', (_, value) => {
			// when, then
			expect(Varificator.isMenuOnlyBeverage(value)).toBe(false);
		});

		test.each([
			// given
			['제로콜라-1', [['제로콜라', '1']]],
			[
				'제로콜라-1,샴페인-1',
				[
					['제로콜라', '1'],
					['샴페인', '1'],
				],
			],
			[
				'제로콜라-1,레드와인-1,샴페인-1',
				[
					['제로콜라', '1'],
					['레드와인', '1'],
					['샴페인', '1'],
				],
			],
		])('%s는 음료만 주문했다.', (_, value) => {
			// when, then
			expect(Varificator.isMenuOnlyBeverage(value)).toBe(true);
		});
	});
});
