var Organization = require("./../../models/organizations.js"),
		mongoose = require("./../../libs/mongoose.js"),
		Manager = require("./../../models/managers.js"),
		Type = require("./../../models/types.js"),
		async = require("async");
		
module.exports = function(app) {
		app.get("/app/organizations/:id", function(req, res, next) {
		var id, org, obj = {};

		try {
			id = mongoose.Types.ObjectId(req.params.id);
		} catch(err) {
			 return next(err);
		}
	
		async.waterfall([
			function(callback) {
				Organization.findById(id, function(err, result) {
					if(err) {
						return callback(err);
					}

					org = result;

					callback(null, result.type, result.manager);
				});
			},
			function(type, manager, callback) {
				async.parallel([
					function(callback) {
						Type.findById(type, function(err, result) {
							if(err) {
								return callback(err);
							}

							obj.type = result;
							callback(null);

						});
					},
					function(callback) {
						Manager.findById(manager, function(err, result) {
							if(err) {
								return callback(err);
							}

							obj.manager = result;
							callback(null);
						});
					}
				], function(err, results) {
						if(err) {
							return callback(err);
						}

						callback(null);
				});
			} 
		], function(err, result) {
				if(err) {
					return next(err);
				}
				
				res.json({
					org: org,
					obj: obj
				});
		});
	});
};