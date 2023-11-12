import { SYSTEM_MESSAGE } from '../Constants/Message.js';
import handleException from '../Util/HandleException.js';
import VarificatorManager from '../Util/VarificatorManager.js';
import InputView from '../View/InputView.js';
import OutputView from '../View/OutputView.js';

class Event {
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

	async play() {
		// 환영 인사 출력
		OutputView.printMessage(SYSTEM_MESSAGE.helloToCustomer);

		// 손님 방문 날짜 입력
		const visitDate = await handleException(Event.#getUserVisitDate);

		// 손님 주문 메뉴 및 수량 입력
		const customerOrder = await handleException(Event.#getUserOrder);
	}
}

export default Event;
