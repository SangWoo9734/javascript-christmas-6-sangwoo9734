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

	describe('isNotNumberInRange => 숫자가 범위 내에 있는 숫자인지 판다한다.', () => {
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
});
