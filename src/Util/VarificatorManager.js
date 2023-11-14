import { ERROR_MESSAGE } from '../Constants/Message.js';
import { EVENT_CONSTANTS } from '../Constants/Event.js';
import createErrorMessage from './HandleErrorMessage.js';
import Varificator from './Varificator.js';
import Order from '../Model/Order.js';

class VarificatorManager {
	static checkVisitDate(number) {
		if (
			Varificator.isInvalidNumber(number) ||
			Varificator.isNotNumberInRange(number, EVENT_CONSTANTS.endDate, EVENT_CONSTANTS.startDate)
		) {
			throw new Error(createErrorMessage(ERROR_MESSAGE.invalidDate));
		}
	}

	static checkOrder(order) {
		if (Varificator.isInvalidOrderformat(order)) {
			throw new Error(createErrorMessage(ERROR_MESSAGE.invalidOrder));
		}
		const formattedOrder = Order.orderFormatter(order);
		if (
			Varificator.isMenusNotInMenuBoard(formattedOrder) ||
			Varificator.isInvalidMenuCount(formattedOrder) ||
			Varificator.isDuplicatedMenu(formattedOrder) ||
			Varificator.isOverMaxMenuCount(formattedOrder)
		) {
			throw new Error(createErrorMessage(ERROR_MESSAGE.invalidOrder));
		}
	}
}

export default VarificatorManager;
