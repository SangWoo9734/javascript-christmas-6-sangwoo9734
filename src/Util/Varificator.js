import { EVENT_CONSTANTS } from '../Constants/Event.js';
import MENU from '../Constants/Menu.js';
import MenuBoard from '../Model/MenuBoard.js';

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

	isInvalidOrderformat(order) {
		const orderRegex = /^([ㄱ-ㅎㅏ-ㅣ가-힣\w\s]+-\d+)+(,([ㄱ-ㅎㅏ-ㅣ가-힣\w\s]+-\d+)+)*$/g;

		return !orderRegex.test(order);
	},

	isMenusNotInMenuBoard(orders) {
		const menuBoard = new MenuBoard(MENU);
		const menuList = menuBoard.allMenuList;

		return orders.some((order) => menuList.findIndex((menu) => order[0] === menu.name) === -1);
	},

	isInvalidMenuCount(orders) {
		const menuCounts = orders.map((menu) => menu[1]);

		return menuCounts.some((count) => this.isInvalidNumber(count));
	},

	isDuplicatedMenu(orders) {
		const menuNames = orders.map((menu) => menu[0]);

		return new Set(menuNames).size !== menuNames.length;
	},

	isOverMaxMenuCount(orders) {
		const menuCount = orders.reduce(
			(accumulator, currentValue) => accumulator + Number(currentValue[1]),
			0,
		);

		return menuCount > EVENT_CONSTANTS.maxMenuCount;
	},
};

export default Varificator;
