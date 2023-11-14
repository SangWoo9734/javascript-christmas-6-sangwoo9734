import StringUtil from '../src/Util/StringUtil';

describe('', () => {
	test.each([
		// given
		['10', '10'],
		['1000', '1,000'],
		['1000000', '1,000,000'],
		['1000000000', '1,000,000,000'],
	])('%s를 입력받으면 표기법에 따라 숫자 포멧을 수정한다.', (number, formattedNumber) => {
		// when, then
		expect(StringUtil.formatNumber(number)).toBe(formattedNumber);
	});
});
