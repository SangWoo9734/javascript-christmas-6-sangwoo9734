import { SYSTEM_MESSAGE } from '../Constants/Message.js';
import handleException from '../Util/HandleException.js';
import VarificatorManager from '../Util/VarificatorManager.js';
import InputView from '../View/InputView.js';
import OutputView from '../View/OutputView.js';

class Event {
	async getUserVisitDate() {
		const userInput = await InputView.getUserInput(
			SYSTEM_MESSAGE.askDate,
			VarificatorManager.checkVisitDate,
		);

		return userInput;
	}

	async play() {
		// 환영 인사 출력
		OutputView.printMessage(SYSTEM_MESSAGE.helloToCustomer);

		// 손님 방문 날짜 입력
		await handleException(() => this.getUserVisitDate());
	}
}

export default Event;
