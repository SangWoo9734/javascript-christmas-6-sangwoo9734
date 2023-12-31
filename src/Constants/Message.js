import { EVENT_CONSTANTS } from './Event.js';

const ERROR_MESSAGE = Object.freeze({
	prefix: '[ERROR]',
	invalidDate: '유효하지 않은 날짜입니다. 다시 입력해 주세요.',
	invalidOrder: '유효하지 않은 주문입니다. 다시 입력해 주세요.',
});

const SYSTEM_MESSAGE = Object.freeze({
	none: '없음',
	blank: '',
	helloToCustomer: `안녕하세요! 우테코 식당 ${EVENT_CONSTANTS.month}월 이벤트 플래너입니다.`,
	askDate: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
	askOrder:
		'주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
	menuAndCount: (menu, count) => `${menu} ${count}개`,
	benefitPreview: (date) =>
		`${EVENT_CONSTANTS.month}월 ${date}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!\n`,
	benefit: (benefitType, benefitCost) => `${benefitType} 할인: -${benefitCost}원`,
	eventMenuTitle: `<${EVENT_CONSTANTS.month}월 이벤트 기간 메뉴>`,
	eventWarning: '** 이벤트 안내 사항 **',
	orderMenuTitle: '<주문 메뉴>',
	beforeDiscountTitle: '<할인 전 총주문 금액>',
	giftTitle: '<증정 메뉴>',
	benefitTitle: '<혜택 내역>',
	totalBenefitTitle: '<총혜택 금액>',
	afterDiscountTitle: '<할인 후 예상 결제 금액>',
	eventBedgeTitle: `<${EVENT_CONSTANTS.month}월 이벤트 배지>`,
});

const WARNING_MESSAGE = Object.freeze({
	minOrderCost: `- 총주문 금액 ${EVENT_CONSTANTS.minOrderCost}원 이상부터 이벤트가 적용됩니다.`,
	onlyBeverage: '- 음료만 주문 시, 주문할 수 없습니다.',
	maxMenuCount: `- 메뉴는 한 번에 최대 ${EVENT_CONSTANTS.maxMenuCount}개까지만 주문할 수 있습니다.\n(e.g. 시저샐러드-1, 티본스테이크-1, 크리스마스파스타-1, 제로콜라-3, 아이스크림-1의 총개수는 7개)`,
});

export { ERROR_MESSAGE, SYSTEM_MESSAGE, WARNING_MESSAGE };
