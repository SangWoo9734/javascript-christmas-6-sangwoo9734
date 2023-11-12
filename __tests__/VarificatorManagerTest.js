import { ERROR_MESSAGE } from '../src/Constants/Message';
import VarificatorManager from '../src/Util/VarificatorManager';

describe('VarificatorManager 테스트', () => {
	describe('checkVisitDate => 사용자가 입력한 방문일 값을 검증합니다.', () => {
		test.each([
			// givent
			['1'],
			['11'],
			['24'],
		])('유효한 값(%s)를 입력한 경우 테스트에 통과합니다.', (date) => {
			// when, then
			expect(() => VarificatorManager.checkVisitDate(date)).not.toThrow();
		});

		test.each([
			// givent
			['asdfas'],
			['   '],
			['-1'],
			['0'],
		])('유효한 값(%s)를 입력한 경우 테스트에 통과합니다.', (date) => {
			// when, then
			expect(() => VarificatorManager.checkVisitDate(date)).toThrow(ERROR_MESSAGE.prefix);
		});
	});

	describe('checkOrder => 사용자가 입력한 주문 메뉴와 메뉴의 수를 검증합니다.', () => {
		test.each([
			['티본스테이크-1,바비큐립-1,초코케이크-2,제로콜라-1'],
			['해산물파스타-2,레드와인-1,초코케이크-1'],
			['샴페인-1'],
		])('양식에 맞는 주문( "%s" )이 입력 되었을때 에러를 표시하지 않습니다.', (order) => {
			//when, then
			expect(() => VarificatorManager.checkOrder(order)).not.toThrow();
		});

		test.each([
			['해산물파스타-2,레드와인-1,초코케이크-0'],
			['해산물파스타-2,레드와인-1,초코케이크-'],
			['해산물파스타-2,레드와인-abc,초코케이크-1'],
			['해산물파스타-2,레드와인-1,고추바사삭-1'],
			['해산물파스타=2,레드와인=1,초코케이크=1'],
			['해산물파스타2,레드와인1,초코케이크1'],
		])('양식에 맞지 않는 주문( "%s" )이 입력 되었을때 에러를 표시합니다.', (order) => {
			//when, then
			expect(() => VarificatorManager.checkOrder(order)).toThrow(ERROR_MESSAGE.prefix);
		});
	});
});
