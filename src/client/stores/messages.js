import { observable, action, computed, decorate } from "mobx";
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

  setCurrentUser(id) {
  	this.id = id;
  	this.currentContact = null;

  	const { contacts } = contactsStore;
  	if (contacts) {
  		const currentContact = contacts.find(c => c.id === this.id);
  		if (currentContact) {
  			this.currentContact = currentContact;
  		}
  	} else {
  		//Contacts not loaded yet, check again
  		setTimeout(() => this.setCurrentUser(id), 500);
  	}
  }

  refreshMessages() {
  	ipcRenderer.send("start-message-poling", {});
  }

  sendMessage(text) {
  	this.appendToMessages({
  		id: Math.floor(Math.random() * 99999),
  		text,
  		screen_name: "Me",
  		isMe: true,
  		conversation_id: this.currentContact.id
  	});

  	const pub_key = this.currentContact ? this.currentContact.pub_key : "";

  	ipcRenderer.send("send-message", { text, pub_key });
  }

  get currentMessages() {
  	const messages = [];

  	if (this.messages) {
  		this.messages.forEach(m => {
  			if (this.currentContact && this.currentContact.id === m.conversation_id) {
  				messages.push(m);
  			}
  		});
  	}

  	return messages;
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
	setCurrentUser: action,
	currentMessages: computed
});

const messagesStore = new Messages();

export default messagesStore;
