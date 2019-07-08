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

  addContact(
  	{ screen_name, pub_key, address },
  	onSuccess = () => {},
  	onError = () => {}
  ) {
  	if (!screen_name || !pub_key || !address) {
  		onError("Missing details.");
  		return;
  	}

  	ipcRenderer.send("save-contact", {
  		screen_name,
  		pub_key,
  		address
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
