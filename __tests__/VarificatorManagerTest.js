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
});
