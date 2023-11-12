import OutputView from '../View/OutputView.js';

const handleException = async (action) => {
	let success = false;

	do {
		try {
			const result = await action();
			success = true;

			return result;
		} catch (error) {
			OutputView.printMessage(error.message);
		}
	} while (!success);
};

export default handleException;
