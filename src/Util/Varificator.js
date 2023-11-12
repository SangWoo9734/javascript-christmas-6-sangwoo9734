const Varificator = {
	isNotNumber(value) {
		return Number.isNaN(value);
	},

	isDecimal(value) {
		return Number(value) % 1 !== 0;
	},

	isNotPlus(value) {
		return Number(value) <= 0;
	},

	isInvalidNumber(value) {
		return this.isNotNumber(value) || this.isDecimal(value) || this.isNotPlus(value);
	},
	isNotNumberInRange(number, maxRange, minRange) {
		return number > maxRange || number < minRange;
	},
};

export default Varificator;
