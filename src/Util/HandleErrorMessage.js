import { ERROR_MESSAGE } from '../Constants/Message.js';

const createErrorMessage = (message) => `${ERROR_MESSAGE.prefix} ${message}`;

export default createErrorMessage;
