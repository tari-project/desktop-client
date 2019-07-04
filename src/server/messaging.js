const { ipcMain } = require("electron");
const client = require("./api/client")();
const { getContactByPubKey } = require("./contacts");

let currentReceivedCount = 0;

//Rendering client recieves these messages
const receiveMessage = (win, logger, result) => {
	win.webContents.send("message-receive", { result });
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

					received_messages.forEach(m => {
						const contact = getContactByPubKey(m.source_pub_key);
						const from = contact ? contact.screen_name : "?";

						const result = {
							id: m.id,
							from,
							text: m.message
						};

						receiveMessage(win, logger, result);
					});
				}
			} else {
				logger.error(error || result);
			}
		});
	}, 1000);
};

module.exports.init = init;
