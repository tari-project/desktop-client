import { observable, action, decorate } from "mobx";
const { ipcRenderer } = window.require("electron");

class Conversations {
  id = null;

  conversations = null;

  constructor() {
  	ipcRenderer.on("conversations_updated", (event, { result, error }) => {
  		if (error) {
  			console.error(error);
  			//TODO error management
  			return;
  		}

  		this.conversations = result;
  	});
  }
}

decorate(Conversations, {
	conversations: observable
});

const conversationsStore = new Conversations();

export default conversationsStore;
