const crypto = require("crypto");

module.exports = pub_key => {
	return crypto
		.createHash("sha256")
		.update(pub_key)
		.digest("hex");
};
