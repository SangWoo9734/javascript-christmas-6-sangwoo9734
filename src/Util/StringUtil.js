const StringUtil = {
	formatNumber(money) {
		return new Intl.NumberFormat('en-US').format(money);
	},
};

export default StringUtil;
