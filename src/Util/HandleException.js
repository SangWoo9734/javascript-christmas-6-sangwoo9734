import OutputView from '../View/OutputView.js';

const handleException = async (action) => {
	let result;
	let success = false;

	do {
		try {
			result = await action();

			success = true;
		} catch (error) {
			OutputView.printMessage(error.message);
		}
	} while (!success);
	return result;
};

export default handleException;
