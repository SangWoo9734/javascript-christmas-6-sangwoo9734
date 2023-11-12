import { ERROR_MESSAGE } from '../Constants/Message.js';
import EVENT_CONSTANTS from '../Constants/Event.js';
import createErrorMessage from './HandleErrorMessage.js';
import Varificator from './Varificator.js';

class VarificatorManager {
	static checkVisitDate(number) {
		if (
			Varificator.isInvalidNumber(number) ||
			Varificator.isNotNumberInRange(number, EVENT_CONSTANTS.endDate, EVENT_CONSTANTS.startDate)
		) {
			throw new Error(createErrorMessage(ERROR_MESSAGE.invalidDate));
		}
	}
}

export default VarificatorManager;
