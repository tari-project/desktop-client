import { observable, action, decorate } from "mobx";
const { ipcRenderer } = window.require("electron");

class Contacts {
  contacts = null;

  constructor() {
  	this.loadContacts();

  	ipcRenderer.on("contacts-updated", (event, { result, error }) => {
  		if (error) {
  			console.error(error);
  			//TODO error management
  			return;
  		}

  		this.contacts = result;
  	});
  }

  addContact({ userName, pubKey }, onSuccess = () => {}, onError = () => {}) {
  	if (!userName || !pubKey) {
  		onError("Missing details.");
  		return;
  	}

  	ipcRenderer.send("save-contact", {
  		userName,
  		pubKey
  	});

  	onSuccess();
  }

  loadContacts() {
  	ipcRenderer.send("load-contacts", {});
  }
}

decorate(Contacts, {
	contacts: observable,
	appendToContacts: action,
	loadContacts: action
});

const contactsStore = new Contacts();

export default contactsStore;
