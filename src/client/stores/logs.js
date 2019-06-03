import { observable, action, decorate } from "mobx";
const { ipcRenderer } = window.require("electron");

class Logs {
	logs = [];

	constructor() {
		ipcRenderer.on("logs", (event, log) => {
			this.appendToLogs(log);
		});

		ipcRenderer.send("load-logs");
	}

	appendToLogs(log) {
		this.logs.push(log);
	}
}

decorate(Logs, {
	logs: observable,
	appendToLogs: action
});

const logsStore = new Logs();

export default logsStore;
