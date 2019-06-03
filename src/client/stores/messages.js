import { observable, action, decorate } from "mobx";
const { ipcRenderer } = window.require("electron");

class Messages {
	messages = null;

	constructor() {
		console.log("Listening for new messages");
		this.refreshMessages();

		ipcRenderer.on("message-response", (event, { result, error }) => {
			if (error) {
				console.error(error);
				//TODO error management
				return;
			}

			//A sent message was successful
		});

		ipcRenderer.on("message-receive", (event, { result, error }) => {
			if (error) {
				console.error(error);
				//TODO error management
				return;
			}

			//new Notification(result.from, { body: result.text });

			this.appendToMessages(result);
		});
	}

	refreshMessages() {
		ipcRenderer.send("start-message-poling", {});
	}

	sendMessage(text) {
		this.appendToMessages({
			id: Math.floor(Math.random() * 99999),
			text,
			from: "Me",
			isMe: true
		});

		ipcRenderer.send("send-message", { text });
	}

	appendToMessages(messageObj) {
		if (!this.messages) {
			this.messages = [];
		}

		this.messages.push(messageObj);
	}
}

decorate(Messages, {
	messages: observable,
	appendToMessages: action
});

const messagesStore = new Messages();

export default messagesStore;
