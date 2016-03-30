var Organization = require("./../../models/organizations.js"),
		mongoose = require("./../../libs/mongoose.js"),
		Manager = require("./../../models/managers.js"),
		Type = require("./../../models/types.js"),
		async = require("async"),
		convertDate = require("./../../libs/convertDate.js").convertDate;
		
module.exports = function(app) {
	app.put("/app/organizations/:id", function(req, res, next) {
		var id = req.params.id,
		org = req.body;

		org.num = +org.num || 0;
		org.type = mongoose.Types.ObjectId(org.type._id);
		org.manager = mongoose.Types.ObjectId(org.manager._id)
		org.date = convertDate(org.date);

		async.waterfall([
			function(callback) {
				Organization.findOne({manager: org.manager}, function(err, result) {
					callback(err, result);
				});		
			},

			function(result, callback) {
				if(result) {
					if(org._id === result._id.toString()) {
						Organization.remove({_id: org._id}, function(err, result) {
							callback(err, null);
						});
					} else {
						callback(null, {isManager: true});
					} 
				} else {
					Organization.remove({_id: org._id}, function(err, result) {
						callback(err, null);
					});
				}
			},
			function(arg, callback) {
				if(arg) {
					callback(null, arg);
				} else {
					Organization.create(org, function(err, result) {
						callback(err, result);
					});
				}
			}
			], function(err, result) {
				if(err) {
					return next(err);
				}

				res.json(result);
			});
	});
};