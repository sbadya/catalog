module.exports = function(app) {
	app.get("/app/catalogs/:catalog", function(req, res, next) {
		var model = req.model;

		model.aggregate([{"$match": {}}], function(err, result) {
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