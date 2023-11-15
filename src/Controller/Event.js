import { SYSTEM_MESSAGE, WARNING_MESSAGE } from '../Constants/Message.js';
import MENU from '../Constants/Menu.js';
import Order from '../Model/Order.js';
import handleException from '../Util/HandleException.js';
import VarificatorManager from '../Util/VarificatorManager.js';
import InputView from '../View/InputView.js';
import OutputView from '../View/OutputView.js';
import MenuBoard from '../Model/MenuBoard.js';
import Calendar from '../Model/Calendar.js';
import Benefit from './Benefit.js';
import Bedge from '../Model/Bedge.js';
import StringUtil from '../Util/StringUtil.js';

class Event {
	#calendar;

	#menuBoard;

	#order;

	#benefits;

	#bedge;

	constructor() {
		this.#menuBoard = new MenuBoard(MENU);
	}

	static async #getUserVisitDate() {
		const userInput = await InputView.getUserInput(
			SYSTEM_MESSAGE.askDate,
			VarificatorManager.checkVisitDate,
		);

		return userInput;
	}

	static #printMenu(menuData) {
		const { korTitle, menu } = menuData;

		OutputView.printMessage(`[${korTitle}]`);

		menu.forEach((menuInfo) => {
			const formattedMenuPrice = StringUtil.formatNumber(menuInfo.price);

			OutputView.printMessage(`- ${menuInfo.name} : ${formattedMenuPrice}원`);
		});

		OutputView.printMessage(SYSTEM_MESSAGE.blank);
	}

	#printAllMenu() {
		OutputView.printMessage(SYSTEM_MESSAGE.eventMenuTitle);

		Object.values(this.#menuBoard.menu).forEach((category) => {
			Event.#printMenu(category);
		});
	}

	static #printOrderWarning() {
		OutputView.printMessage(SYSTEM_MESSAGE.eventWarning);

		OutputView.printMessage(WARNING_MESSAGE.minOrderCost);
		OutputView.printMessage(WARNING_MESSAGE.onlyBeverage);
		OutputView.printMessage(WARNING_MESSAGE.maxMenuCount);
	}

	#printInfoForOrder() {
		OutputView.printMessage('--------------------------------------------');
		this.#printAllMenu();
		Event.#printOrderWarning();
		OutputView.printMessage('--------------------------------------------');
	}

	static async #getUserOrder() {
		const userOrder = await InputView.getUserInput(
			SYSTEM_MESSAGE.askOrder,
			VarificatorManager.checkOrder,
		);

		return userOrder;
	}

	#initalServiceInstance(visitDate, customerOrder) {
		this.#calendar = new Calendar(visitDate);
		this.#order = new Order(customerOrder, this.#menuBoard);
		this.#benefits = new Benefit(this.#order, this.#calendar);
		this.#bedge = new Bedge(this.#benefits.totalBenefits);
	}

	#printOrderList() {
		OutputView.printMessage(SYSTEM_MESSAGE.orderMenuTitle);
		this.#order.order.forEach((order) => {
			OutputView.printMessage(SYSTEM_MESSAGE.menuAndCount(order.name, order.count));
		});

		OutputView.printMessage(SYSTEM_MESSAGE.blank);
	}

	#printTotalCostBeforeDiscount() {
		OutputView.printMessage(SYSTEM_MESSAGE.beforeDiscountTitle);

		const totalPrice = StringUtil.formatNumber(this.#order.totalPrice);
		OutputView.printMessage(`${totalPrice}원`);

		OutputView.printMessage(SYSTEM_MESSAGE.blank);
	}

	#printGiftBenefit() {
		OutputView.printMessage(SYSTEM_MESSAGE.giftTitle);

		this.#benefits.printGiftList();

		OutputView.printMessage(SYSTEM_MESSAGE.blank);
	}

	#printBenefitList() {
		OutputView.printMessage(SYSTEM_MESSAGE.benefitTitle);

		this.#benefits.printAllBenefits();

		OutputView.printMessage(SYSTEM_MESSAGE.blank);
	}

	#printTotalBenefit() {
		OutputView.printMessage(SYSTEM_MESSAGE.totalBenefitTitle);

		this.#benefits.showTotalBenefits();

		OutputView.printMessage(SYSTEM_MESSAGE.blank);
	}

	#printTotalCostAfterDiscount() {
		OutputView.printMessage(SYSTEM_MESSAGE.afterDiscountTitle);

		const totalOrderPrice = this.#order.totalPrice;
		const totalBenefit = this.#benefits.totalBenefits;

		const totalPriceAfterDiscount = totalOrderPrice - totalBenefit;
		const formattedNumber = StringUtil.formatNumber(totalPriceAfterDiscount);

		OutputView.printMessage(`${formattedNumber}원`);

		OutputView.printMessage(SYSTEM_MESSAGE.blank);
	}

	#printEventBedge() {
		OutputView.printMessage(SYSTEM_MESSAGE.eventBedgeTitle);

		OutputView.printMessage(this.#bedge.bedge);
	}

	#printEventBenefit() {
		OutputView.printMessage(SYSTEM_MESSAGE.benefitPreview(this.#calendar.visitDate));
		this.#printOrderList();
		this.#printTotalCostBeforeDiscount();
		this.#printGiftBenefit();
		this.#printBenefitList();
		this.#printTotalBenefit();
		this.#printTotalCostAfterDiscount();
		this.#printEventBedge();
	}

	async play() {
		OutputView.printMessage(SYSTEM_MESSAGE.helloToCustomer);

		const visitDate = await handleException(Event.#getUserVisitDate);

		this.#printInfoForOrder();

		const customerOrder = await handleException(Event.#getUserOrder);

		this.#initalServiceInstance(visitDate, customerOrder);

		this.#printEventBenefit();
	}
}

export default Event;
