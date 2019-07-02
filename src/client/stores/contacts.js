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

  addContact({ screenName, pubKey }, onSuccess = () => {}, onError = () => {}) {
  	if (!screenName || !pubKey) {
  		onError("Missing details.");
  		return;
  	}

  	ipcRenderer.send("save-contact", {
  		screenName,
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
