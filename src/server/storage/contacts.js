const electron = require("electron");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");

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
		//ID is just a hash of the public key
		contactObj.id = crypto
			.createHash("sha256")
			.update(contactObj.pubKey)
			.digest("hex");

		//Don't end up with duplicate public keys
		const existingIndex = this.contacts.map(c => c.id).indexOf(contactObj.id);

		if (existingIndex > -1) {
			this.contacts[existingIndex] = contactObj;
		} else {
			this.contacts.push(contactObj);
		}

		//Sort by screen name
		this.contacts.sort((a, b) =>
			a.screenName > b.screenName ? 1 : b.screenName > a.screenName ? -1 : 0
		);

		fs.writeFileSync(this.path, JSON.stringify(this.contacts));
	}
}

module.exports = ContactsStorage;
