//Create schemas and models
var mongoose = require("./../libs/mongoose.js"),
		orgsSchema = new mongoose.Schema({
			title: {type: String, required: true},
			info: {type: String},
			address: {type: String},
			phone: {type: String},
			num: {type: Number},
			other: {type: String},
			type: {type: mongoose.Schema.Types.ObjectId, required: true},
			manager: {type: mongoose.Schema.Types.ObjectId, required: true, unique: true},
			date: {type: Date, default: Date.now}
		});

module.exports = mongoose.model("Organization", orgsSchema);		
