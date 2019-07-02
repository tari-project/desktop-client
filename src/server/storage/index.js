const { ipcMain } = require("electron");

const Contacts = require("./contacts");

const contacts = new Contacts();

const contactsUpdated = (win, logger) => {
	const contactsList = contacts.get();

	logger.info(`Load ${contactsList.length} contacts.`);

	win.webContents.send("contacts-updated", { result: contactsList });
};

const init = (win, logger) => {
	//Listening for messages from the frontend
	ipcMain.on("save-contact", (event, contactObj) => {
		logger.info(`Save contact: ${JSON.stringify(contactObj)}`);

		contacts.update(contactObj);

		contactsUpdated(win, logger);
	});

	ipcMain.on("load-contacts", () => {
		contactsUpdated(win, logger);
	});
};

module.exports.init = init;
