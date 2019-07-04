const grpc = require("grpc");
const fs = require("fs");
const path = require("path");

let client;

const getFilePath = filename => {
	const filePath = __dirname.includes("asar")
		? path.join(__dirname, "..", "..", "..", "..", "assets", "proto", filename)
		: path.join(__dirname, "..", "..", "..", "assets", "proto", filename);
	return fs.existsSync(filePath) ? filePath : filename;
};

const clientFactory = () => {
	if (!client) {
		const protoPath = getFilePath("wallet_rpc.proto");

		const argv = process.argv;
		const apiHost = argv[2] || "localhost:10001";

		const WalletService = grpc.load(protoPath).wallet_rpc.WalletRpc;
		client = new WalletService(apiHost, grpc.credentials.createInsecure());
	}

	return client;
};

module.exports = clientFactory;
