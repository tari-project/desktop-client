const { BrowserWindow } = require("electron");
let { app } = require("electron");
const { ipcMain } = require("electron");
const path = require("path");
const electronLog = require("electron-log");
const url = require("url");

const messaging = require("./server/messaging");

//TODO move constants into a config.js
const isDev = process.env.ELECTRON_ENV === "development"; //FIXME this isn't setting true for development
const port = process.env.PORT ? process.env.PORT - 100 : 3000;
process.env.ELECTRON_START_URL = `http://localhost:${port}`; //TODO only set this is we're not in development

const {
	startServerProcess,
	getProcessName
} = require("./server/child-processes");

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let tariServerProcess;

let logQueue = [];
let logsReady = false;

const sendLog = log => {
	if (win && logsReady) {
		win.webContents.send("logs", log);
	} else {
		logQueue.push(log);
	}
};

const logger = {
	info: msg => {
		electronLog.info(msg);
		sendLog(msg);
	},
	error: msg => {
		electronLog.error(msg);
		sendLog(`ERROR: ${msg}`);
	}
};

//Call this from the client to let the server know it's ready to start receiving output
ipcMain.on("load-logs", () => {
	logQueue.map(line => win && win.webContents.send("logs", line));
	logQueue = [];
	logsReady = true;
});

const startTari = async () => {
	try {
		tariServerProcess = await startServerProcess({
			command: "tari",
			logger
		});

		logger.info("Got tariServerProcess");
	} catch (err) {
		logger.error(`Caught Error When Starting tari: ${err}`);
	}
};

function createWindow() {
	win = new BrowserWindow({
		width: 800,
		height: 450,
		backgroundColor: "#5e38a0",
		webPreferences: {
			nodeIntegration: true
		}
	});

	win.loadURL(
		process.env.ELECTRON_START_URL ||
			url.format({
				pathname: path.join(__dirname, "/../public/index.html"),
				protocol: "file:",
				slashes: true
			})
	);
}

app.on("ready", () => {
	createWindow();

	logger.info("App ready");

	//startTari(); //TODO place back when working

	//Listening for requests from the frontend
	messaging.init(win, logger);
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	app.quit();
});

app.on("quit", () => {
	console.log("KILL processes.");
	tariServerProcess && tariServerProcess.kill("SIGINT");
});

app.on("closed", () => {
	app = null;
});
