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

	async play() {
		OutputView.printMessage(SYSTEM_MESSAGE.helloToCustomer);

		const visitDate = await handleException(Event.#getUserVisitDate);
		const customerOrder = await handleException(Event.#getUserOrder);

		this.#initalServiceInstance(visitDate, customerOrder);
	}
}

export default Event;
