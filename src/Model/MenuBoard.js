class MenuBoard {
	#menu;

	constructor(menu) {
		this.#menu = menu;
	}

	getAllNameInCategory(category) {
		return this.#menu[category].menu.map((menu) => menu.name);
	}

	searchMenu(name) {
		return this.allMenuList.find((menu) => menu.name === name);
	}

	get menu() {
		return this.#menu;
	}

	get allMenuList() {
		let menuList = [];

		Object.keys(this.#menu).forEach((category) => {
			menuList = [...menuList, ...this.#menu[category].menu];
		});

		return menuList;
	}
}

export default MenuBoard;
