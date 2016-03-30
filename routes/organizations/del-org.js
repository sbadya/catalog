var Organization = require("./../../models/organizations.js");

module.exports = function(app) {
	app.delete("/app/organizations/:id", function(req, res, next) {
		var id = req.params.id;	
		
		Organization.remove({_id: id}, function(err) {
			if(err) {
				return next(err);
			}

			res.end();
		});
	});
};