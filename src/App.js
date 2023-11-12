import Event from './Controller/Event.js';

class App {
	#event;

	constructor() {
		this.#event = new Event();
	}

	async run() {
		await this.#event.play();
	}
}

export default App;
