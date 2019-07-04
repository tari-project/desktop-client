import { observable, action, decorate } from "mobx";
import contactsStore from "./contacts";
const { ipcRenderer } = window.require("electron");

class Messages {
  id = null;

  currentContact = null;

  messages = null;

  constructor() {
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

  	const pub_key = this.currentContact ? this.currentContact.pub_key : "";

  	ipcRenderer.send("send-message", { text, pub_key });
  }

  appendToMessages(messageObj) {
  	if (!this.messages) {
  		this.messages = [];
  	}

  	//Update if ID exists
  	const existingIndex = this.messages.map(m => m.id).indexOf(messageObj.id);

  	if (existingIndex > -1) {
  		this.messages[existingIndex] = messageObj;
  	} else {
  		this.messages.push(messageObj);

  		if (!messageObj.isMe) {
  			//TODO switch back on when it stops being annoying
  			//new Notification(messageObj.from, { body: messageObj.text });
  		}
  	}
  }
}

decorate(Messages, {
	messages: observable,
	appendToMessages: action,
	startChat: action
});

const messagesStore = new Messages();

export default messagesStore;
