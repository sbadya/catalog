var Organization = require("./../../models/organizations.js"),
		mongoose = require("./../../libs/mongoose.js"),
		async = require("async"),
		convertDate = require("./../../libs/convertDate.js").convertDate;

module.exports = function(app) {
	app.post("/app/organizations", function(req, res, next) {
		var date = req.body.date,
		org = req.body;	

		org.num = +org.num || 0;
		org.type = mongoose.Types.ObjectId(org.type._id);
		org.manager = mongoose.Types.ObjectId(org.manager._id)
		org.date = convertDate(org.date);
		
		async.waterfall([
			function(callback) {
				Organization.aggregate([{"$match": {"manager": org.manager}}], function(err, result) {
					callback(err, result);
				});
			},
			function(result, callback) {
				if(!result.length) {
					Organization.create(org, function(err, result) {
						callback(err, result);
					});
				} else {
					callback(null, {isManager: true});
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