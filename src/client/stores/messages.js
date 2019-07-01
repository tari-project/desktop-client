import { observable, action, decorate } from "mobx";
import contactsStore from "./contacts";
const { ipcRenderer } = window.require("electron");

class Messages {
  id = null;

  currentContact = null;

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

  		new Notification(result.from, { body: result.text });

  		this.appendToMessages(result);
  	});
  }

  startChat(id) {
  	if (this.id !== id) {
  		this.messages = [];
  	}

  	this.id = id;

  	const { contacts } = contactsStore;
  	if (contacts) {
  		const currentContact = contacts.find(c => c.id === this.id);
  		if (currentContact) {
  			this.currentContact = currentContact;
  		}
  	}
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

  	const pubKey = this.currentContact ? this.currentContact.pubKey : "";

  	ipcRenderer.send("send-message", { text, pubKey });
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
	appendToMessages: action,
	startChat: action
});

const messagesStore = new Messages();

export default messagesStore;
