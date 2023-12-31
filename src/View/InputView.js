import { Console } from '@woowacourse/mission-utils';

const InputView = {
	async getUserInput(message, varificateFunction) {
		const userInput = await Console.readLineAsync(message);
		varificateFunction(userInput);

		return userInput;
	},
};

export default InputView;
