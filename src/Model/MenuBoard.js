import MENU from '../Constants/Menu.js';

class MenuBoard {
	#menu;

	constructor() {
		this.#menu = MENU;
	}

	getAllMenuList() {
		let menuList = [];

		Object.keys(this.#menu).forEach((category) => {
			menuList = [...menuList, ...this.#menu[category].menu];
		});

		return menuList;
	}
}

export default MenuBoard;
