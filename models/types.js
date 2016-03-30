//Create schemas and models
var mongoose = require("./../libs/mongoose.js"),
		typesSchema = new mongoose.Schema({
			title: {type: String, required: true, unique: true}
		});

module.exports = mongoose.model("Type", typesSchema);
