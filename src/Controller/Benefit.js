import { EVENT_CONSTANTS } from '../Constants/Event.js';
import MENU from '../Constants/Menu.js';
import MenuBoard from '../Model/MenuBoard.js';
import StringUtil from '../Util/StringUtil.js';
import OutputView from '../View/OutputView.js';
import { SYSTEM_MESSAGE } from '../Constants/Message.js';

class Benefit {
	#order;

	#calendar;

	#benefits;

	#menuBoard;

	#benefitPrice;

	constructor(order, calendar) {
		this.#order = order;
		this.#calendar = calendar;
		this.#benefits = calendar.dayBenefit;
		this.#menuBoard = new MenuBoard(MENU);

		this.#benefitPrice = this.#checkBenefits();
	}

	#cristmasBenefit() {
		const { minSaleCost, costIncreaseStandard } = EVENT_CONSTANTS.cristmasEvent;

		if (this.#benefits.isCristmasBenefit) {
			return minSaleCost + costIncreaseStandard * (this.#calendar.visitDate - 1);
		}

		return 0;
	}

	#printCristmasBenefitMessage() {
		if (this.#benefitPrice.cristmas > 0) {
			const formattedPrice = StringUtil.formatNumber(this.#benefitPrice.cristmas);
			OutputView.printMessage(SYSTEM_MESSAGE.benefit('크리스마스 디데이', formattedPrice));
		}
	}

	#weekBenefit() {
		let totalSaleCost = 0;
		const saleCategory = this.#benefits.isWeekdayBenefit ? 'dessert' : 'main';
		const saleMenu = this.#menuBoard.getAllNameInCategory(saleCategory);

		this.#order.order.forEach((menu) => {
			if (saleMenu.includes(menu.name)) {
				const menuCount = this.#order.searchMenuInOrder(menu.name).count;

				totalSaleCost += EVENT_CONSTANTS.weekdaySaleCost * menuCount;
			}
		});

		return totalSaleCost;
	}

	#printWeekBenefitMessage() {
		if (this.#benefitPrice.week > 0) {
			const formattedPrice = StringUtil.formatNumber(this.#benefitPrice.week);
			const prefix = this.#benefits.isWeekdayBenefit ? '평일' : '주말';

			OutputView.printMessage(SYSTEM_MESSAGE.benefit(prefix, formattedPrice));
		}
	}

	#specialBenefit() {
		return this.#benefits.isSpecialBenefit ? EVENT_CONSTANTS.specialSaleCost : 0;
	}

	#printSpecialBenefitMessage() {
		if (this.#benefitPrice.special > 0) {
			const formattedPrice = StringUtil.formatNumber(this.#benefitPrice.special);

			OutputView.printMessage(SYSTEM_MESSAGE.benefit('특별', formattedPrice));
		}
	}

	#giftBenefit() {
		const totalOrderPrice = this.#order.totalPrice;
		const giftPrice = this.#menuBoard.searchMenu(EVENT_CONSTANTS.gift).price;

		return totalOrderPrice > EVENT_CONSTANTS.orderCostForGift ? giftPrice : 0;
	}

	printGiftList() {
		const message =
			this.#benefitPrice.gift > 0
				? `${EVENT_CONSTANTS.gift} ${EVENT_CONSTANTS.giftQuantity}개`
				: SYSTEM_MESSAGE.none;

		OutputView.printMessage(message);
	}

	#printGiftBenefitMessage() {
		if (this.#benefitPrice.gift > 0) {
			const formattedPrice = StringUtil.formatNumber(this.#benefitPrice.gift);

			OutputView.printMessage(`증정 이벤트: -${formattedPrice}원`);
		}
	}

	#checkBenefits() {
		return this.#order.totalPrice >= EVENT_CONSTANTS.minOrderCost
			? {
					cristmas: this.#cristmasBenefit(),
					week: this.#weekBenefit(),
					special: this.#specialBenefit(),
					gift: this.#giftBenefit(),
			  }
			: {
					cristmas: 0,
					week: 0,
					special: 0,
					gift: 0,
			  };
	}

	printAllBenefits() {
		if (Object.values(this.#benefitPrice).every((price) => price === 0)) {
			OutputView.printMessage(SYSTEM_MESSAGE.none);
			return;
		}

		this.#printCristmasBenefitMessage();
		this.#printWeekBenefitMessage();
		this.#printSpecialBenefitMessage();
		this.#printGiftBenefitMessage();
	}

	showTotalBenefits() {
		const formattedPrice = StringUtil.formatNumber(this.totalBenefits);

		OutputView.printMessage(`${formattedPrice !== '0' ? '-' : ''}${formattedPrice}원`);
	}

	get totalBenefits() {
		return Object.values(this.#benefitPrice).reduce(
			(accumulator, current) => accumulator + current,
			0,
		);
	}

	get discountBenefit() {
		return this.totalBenefits - this.#benefitPrice.gift;
	}
}

export default Benefit;
