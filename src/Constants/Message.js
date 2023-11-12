import EVENT_CONSTANTS from './Event.js';

const ERROR_MESSAGE = Object.freeze({
	prefix: '[ERROR]',
	invalidDate: '유효하지 않은 날짜입니다. 다시 입력해 주세요.',
	invalidOrder: '유효하지 않은 주문입니다. 다시 입력해 주세요.',
});

const SYSTEM_MESSAGE = Object.freeze({
	none: '없음',
	helloToCustomer: `안녕하세요! 우테코 식당 ${EVENT_CONSTANTS.month}월 이벤트 플래너입니다.`,
	askDate: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
	askOrder:
		'주문하실 메뉴를 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
});

export { ERROR_MESSAGE, SYSTEM_MESSAGE };
