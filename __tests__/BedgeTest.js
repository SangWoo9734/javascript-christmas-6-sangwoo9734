import Bedge from '../src/Model/Bedge';

describe('Bedge', () => {
	test.each([
		// given
		[4000, '없음'],
		[7000, '별'],
		[12000, '트리'],
		[24000, '산타'],
	])('%s원 혜택을 받은 경우, %s 배지를 획득한다.', (benefit, expectedBedge) => {
		// when
		const bedge = new Bedge(benefit);
		// then
		expect(bedge.bedge).toBe(expectedBedge);
	});
});
