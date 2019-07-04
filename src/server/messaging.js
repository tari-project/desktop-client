const { ipcMain } = require("electron");
const client = require("./api/client")();
const { getContactByPubKey } = require("./contacts");
const pubKeyToUserID = require("./helpers/pubKeyToUserID");

let currentReceivedCount = 0;
const currentConversations = [];

//Rendering client recieves these messages
const receiveMessage = (win, result) => {
	win.webContents.send("message-receive", { result });
};

const updateConversations = (win, screen_name, messageObj) => {
	const conversation = {
		screen_name,
		last_message: messageObj.message,
		id: pubKeyToUserID(messageObj.source_pub_key)
	};

	const existingIndex = currentConversations
		.map(c => c.id)
		.indexOf(conversation.id);

	if (existingIndex > -1) {
		currentConversations[existingIndex] = conversation;
	} else {
		currentConversations.push(conversation);
	}

	win.webContents.send("conversations_updated", {
		result: currentConversations
	});
};

const init = (win, logger) => {
	//Listening for messages from the frontend
	ipcMain.on("send-message", (event, args) => {
		const { text, pub_key } = args;

		client.SendTextMessage(
			{ dest_pub_key: pub_key, message: text },
			(error, result) => {
				event.sender.send("message-response", {
					result,
					error
				});

				if (!error && result.success) {
					logger.info(`Sent new message:`);
					logger.info(result);
				} else {
					logger.error(error || result);
				}
			}
		);

		logger.info(`Sent message "${text}" to pub_key "${pub_key}"`);
	});

	//Polling messages
	setInterval(() => {
		client.GetTextMessages({}, (error, result) => {
			if (!error && result) {
				const { received_messages } = result;
				if (received_messages) {
					//Just log new when new messages arrive
					if (currentReceivedCount < received_messages.length) {
						logger.info(
							`Synced ${received_messages.length} received messages.`
						);
						currentReceivedCount = received_messages.length;
					}

					received_messages.forEach(messageObj => {
						const contact = getContactByPubKey(messageObj.source_pub_key);
						const screen_name = contact ? contact.screen_name : "?";

						receiveMessage(win, {
							id: messageObj.id,
							screen_name,
							text: messageObj.message,
							conversation_id: pubKeyToUserID(messageObj.source_pub_key)
						});
						updateConversations(win, screen_name, messageObj);
					});
				}
			} else {
				logger.error(error || result);
			}
		});
	}, 400);
};

module.exports.init = init;
