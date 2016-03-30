var Organization = require("./../../models/organizations.js");

module.exports = function(app) {
	app.get("/app/organizations", function(req, res, next) {

		Organization.aggregate([{"$match": {}}], function(err, result) {
			if(err) {
				return next(err);
			}
			
			if(!result.length) {
				res.end();
			} else {
					res.json(result);
			}
		});
	});
};