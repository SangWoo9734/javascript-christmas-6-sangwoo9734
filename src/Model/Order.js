class Order {
	static orderFormatter(order) {
		const splittedOrders = order.split(',');
		const formattedOrder = splittedOrders.map((splittedOrder) => splittedOrder.split('-'));

		return formattedOrder;
	}
}

export default Order;
