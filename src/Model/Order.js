class Order {
	#order;

	constructor(order, menuBoard) {
		const orders = Order.orderFormatter(order);
		this.#order = Order.#getOrderDataWithPrice(orders, menuBoard);
	}

	static orderFormatter(order) {
		const splittedOrders = order.split(',');
		const formattedOrder = splittedOrders.map((splittedOrder) => splittedOrder.trim().split('-'));

		return formattedOrder;
	}

	static #orderWithPrice(orders, allMenu) {
		const orderData = [];

		orders.forEach((order) => {
			const [name, count] = order;
			const { price } = allMenu.find((menu) => menu.name === name);
			orderData.push({
				name,
				count: Number(count),
				totalPrice: count * price,
			});
		});

		return orderData;
	}

	static #getOrderDataWithPrice(orders, menuBoard) {
		const allMenu = menuBoard.allMenuList;

		return this.#orderWithPrice(orders, allMenu);
	}

	searchMenuInOrder(menuName) {
		return this.#order.find((order) => order.name === menuName);
	}

	get totalPrice() {
		return this.#order.reduce(
			(accumulator, currentValueders) => accumulator + currentValueders.totalPrice,
			0,
		);
	}

	get order() {
		return this.#order;
	}
}

export default Order;
