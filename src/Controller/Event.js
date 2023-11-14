import { SYSTEM_MESSAGE } from '../Constants/Message.js';
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

	static async #getUserVisitDate() {
		const userInput = await InputView.getUserInput(
			SYSTEM_MESSAGE.askDate,
			VarificatorManager.checkVisitDate,
		);

		return userInput;
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
		this.#menuBoard = new MenuBoard(MENU);
		this.#order = new Order(customerOrder, this.#menuBoard);
		this.#benefits = new Benefit(this.#order, this.#calendar);
		this.#bedge = new Bedge(this.#benefits.totalBenefits);
	}

	#showOrderList() {
		OutputView.printMessage(SYSTEM_MESSAGE.orderMenuTitle);
		this.#order.order.forEach((order) => {
			OutputView.printMessage(SYSTEM_MESSAGE.menuAndCount(order.name, order.count));
		});

		OutputView.printMessage(SYSTEM_MESSAGE.blank);
	}

	#showTotalCostBeforeDiscount() {
		OutputView.printMessage(SYSTEM_MESSAGE.beforeDiscountTitle);

		const totalPrice = StringUtil.formatNumber(this.#order.totalPrice);
		OutputView.printMessage(`${totalPrice}원`);

		OutputView.printMessage(SYSTEM_MESSAGE.blank);
	}

	#showGiftBenefit() {
		OutputView.printMessage(SYSTEM_MESSAGE.giftTitle);

		this.#benefits.printGiftList();

		OutputView.printMessage(SYSTEM_MESSAGE.blank);
	}

	#showBenefitList() {
		OutputView.printMessage(SYSTEM_MESSAGE.benefitTitle);

		this.#benefits.printAllBenefits();

		OutputView.printMessage(SYSTEM_MESSAGE.blank);
	}

	#showTotalBenefit() {
		OutputView.printMessage(SYSTEM_MESSAGE.totalBenefitTitle);

		this.#benefits.showTotalBenefits();

		OutputView.printMessage(SYSTEM_MESSAGE.blank);
	}

	#showTotalCostAfterDiscount() {
		OutputView.printMessage(SYSTEM_MESSAGE.afterDiscountTitle);

		const totalOrderPrice = this.#order.totalPrice;
		const totalBenefit = this.#benefits.totalBenefits;

		const totalPriceAfterDiscount = totalOrderPrice - totalBenefit;
		const formattedNumber = StringUtil.formatNumber(totalPriceAfterDiscount);

		OutputView.printMessage(`${formattedNumber}원`);

		OutputView.printMessage(SYSTEM_MESSAGE.blank);
	}

	#showEventBedge() {
		OutputView.printMessage(SYSTEM_MESSAGE.eventBedgeTitle);

		OutputView.printMessage(this.#bedge.bedge);
	}

	#showEventBenefit() {
		OutputView.printMessage(SYSTEM_MESSAGE.benefitPreview(this.#calendar.visitDate));
		this.#showOrderList();
		this.#showTotalCostBeforeDiscount();
		this.#showGiftBenefit();
		this.#showBenefitList();
		this.#showTotalBenefit();
		this.#showTotalCostAfterDiscount();
		this.#showEventBedge();
	}

	async play() {
		OutputView.printMessage(SYSTEM_MESSAGE.helloToCustomer);

		const visitDate = await handleException(Event.#getUserVisitDate);
		const customerOrder = await handleException(Event.#getUserOrder);

		this.#initalServiceInstance(visitDate, customerOrder);

		this.#showEventBenefit();
	}
}

export default Event;
