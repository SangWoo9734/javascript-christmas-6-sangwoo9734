import EVENT_CONSTANTS from './Event.js';

const ERROR_MESSAGE = Object.freeze({
	prefix: '[ERROR]',
	invalidDate: '유효하지 않은 날짜입니다. 다시 입력해 주세요.',
});

const SYSTEM_MESSAGE = Object.freeze({
	none: '없음',
	helloToCustomer: `안녕하세요! 우테코 식당 ${EVENT_CONSTANTS.month}월 이벤트 플래너입니다.`,
	askDate: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
});

export { ERROR_MESSAGE, SYSTEM_MESSAGE };
