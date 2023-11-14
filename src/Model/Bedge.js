import { EVENT_BEDGE } from '../Constants/Event.js';
import { SYSTEM_MESSAGE } from '../Constants/Message.js';

class Bedge {
	bedge;

	constructor(price) {
		this.bedge = Bedge.#initalBedge(price);
	}

	static #initalBedge(price) {
		if (price < EVENT_BEDGE.level1.stendard) {
			return SYSTEM_MESSAGE.none;
		}
		if (price >= EVENT_BEDGE.level1.stendard && price < EVENT_BEDGE.level2.stendard) {
			return EVENT_BEDGE.level1.bedge;
		}
		if (price >= EVENT_BEDGE.level2.stendard && price < EVENT_BEDGE.level3.stendard) {
			return EVENT_BEDGE.level2.bedge;
		}
		return EVENT_BEDGE.level3.bedge;
	}
}

export default Bedge;
