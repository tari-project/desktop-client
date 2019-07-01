const electron = require("electron");
const path = require("path");
const fs = require("fs");

const filename = "contacts.json";

const parseDataFile = filePath => {
	try {
		return JSON.parse(fs.readFileSync(filePath));
	} catch (error) {
		return [];
	}
};

class ContactsStorage {
	constructor() {
		const userDataPath = electron.app.getPath("userData");
		this.path = path.join(userDataPath, filename);
		this.contacts = parseDataFile(this.path);
	}

	get() {
		return this.contacts;
	}

	update(contactObj) {
		//If userName exists, overwrite it's pubKey
		const existingIndex = this.contacts
			.map(c => c.userName)
			.indexOf(contactObj.userName);

		if (existingIndex > -1) {
			this.contacts[existingIndex] = contactObj;
		} else {
			this.contacts.push(contactObj);
		}

		this.contacts.sort((a, b) =>
			a.userName > b.userName ? 1 : b.userName > a.userName ? -1 : 0
		);

		fs.writeFileSync(this.path, JSON.stringify(this.contacts));
	}
}

module.exports = ContactsStorage;
