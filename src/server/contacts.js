const { ipcMain } = require("electron");
const client = require("./api/client")();
const pubKeyToUserID = require("./helpers/pubKeyToUserID");

let currentContacts = [];

const getContactByPubKey = pub_key => {
	const contact = currentContacts.find(c => c.pub_key === pub_key);
	if (!contact) {
		return null;
	}

	return contact;
};

const syncContacts = (win, logger) => {
	client.GetContacts({}, (error, result) => {
		if (!error && result) {
			const { contacts } = result;
			if (contacts) {
				//Add an ID to each contact for routing references
				contacts.forEach(c => {
					c.id = pubKeyToUserID(c.pub_key);
				});

				currentContacts = contacts;

				logger.info(`Synced ${contacts.length} contacts.`);
				win.webContents.send("contacts-updated", { result: contacts });
			}
		} else {
			logger.error(error || result);
		}
	});
};

const init = (win, logger) => {
	//Listening for messages from the frontend
	ipcMain.on("save-contact", (event, contactObj) => {
		client.AddContact(contactObj, (error, result) => {
			if (!error && result.success) {
				logger.info(result);
				logger.info(`Contact: ${JSON.stringify(contactObj)}`);
				syncContacts(win, logger);
			} else {
				logger.error(error || result);
			}
		});
	});

	ipcMain.on("load-contacts", () => {
		syncContacts(win, logger);
	});
};

module.exports.init = init;
module.exports.getContactByPubKey = getContactByPubKey;
