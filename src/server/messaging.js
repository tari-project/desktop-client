const { ipcMain } = require("electron");

//Rendering client recieves these messages
const receiveMessage = (win, logger, result) => {
	logger.info(`Message received: ${result.text}`);
	win.webContents.send("message-receive", { result });
};

//TODO Remove this and uninstall lorem-ipsum after testing
//npm uninstall --save-dev lorem-ipsum
const receiveRandomTestMessage = (win, logger) => {
	const loremIpsum = require("lorem-ipsum").loremIpsum;

	const result = {
		id: Math.floor(Math.random() * 99999),
		from: "Server Steve",
		text: loremIpsum()
	};

	receiveMessage(win, logger, result);
};

const init = (win, logger) => {
	//Listening for messages from the frontend
	ipcMain.on("send-message", (event, args) => {
		const { text } = args;

		logger.info(`Message received from client: ${text}`);

		//TODO implement actual sending here
		setTimeout(() => {
			//Test response to the message just sent
			event.sender.send("message-response", {
				result: true,
				error: null
			});

			receiveRandomTestMessage(win, logger);
		}, 500);
	});

	//Test for receiving dummy messages every 10s
	setInterval(() => {
		receiveRandomTestMessage(win, logger);
	}, 10000);
};

module.exports.init = init;
