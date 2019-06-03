const os = require("os");
const fs = require("fs");
const path = require("path");
const cp = require("child_process");

const getProcessName = binName => {
	const filename = os.platform() === "win32" ? `${binName}.exe` : binName;
	const filePath = __dirname.includes("asar")
		? path.join(__dirname, "..", "..", "assets", "bin", os.platform(), filename)
		: path.join(__dirname, "..", "assets", "bin", os.platform(), filename);
	return fs.existsSync(filePath) ? filePath : filename;
};

module.exports.getProcessName = getProcessName;

async function startChildProcess(name, args, logger) {
	return new Promise((resolve, reject) => {
		const processName = getProcessName(name);
		logger.info(`Process name: ${processName}`);
		const childProcess = cp.spawn(processName, args);
		childProcess.stdout.on("data", data => {
			logger.info(`${name}: ${data}`);
			resolve(childProcess);
		});
		childProcess.stderr.on("data", data => {
			logger.error(`${name} Error: ${data}`);
			reject(new Error(data));
		});
		childProcess.on("error", reject);
	});
}

module.exports.startServerProcess = async function({ command, logger }) {
	const args = ["server", "run"];
	return startChildProcess(command, args, logger);
};
