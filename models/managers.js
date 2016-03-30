//Create schemas and models
var mongoose = require("./../libs/mongoose.js"),
		managersSchema = new mongoose.Schema({
			surname: {type: String, required: true},
			name: {type: String, required: true},
			patronymic: {type: String}
		});

module.exports = mongoose.model("Manager", managersSchema);		