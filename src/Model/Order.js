class Order {
	#order;

	#menuBoard;

	constructor(order, menuBoard) {
		const orders = Order.orderFormatter(order);
		this.#menuBoard = menuBoard;
		this.#order = Order.#getOrderDataWithPrice(orders, menuBoard);
	}

	static orderFormatter(order) {
		const splittedOrders = order.split(',');
		const formattedOrder = splittedOrders.map((splittedOrder) => splittedOrder.split('-'));

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
		const allMenu = menuBoard.getAllMenuList();

		return this.#orderWithPrice(orders, allMenu);
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
