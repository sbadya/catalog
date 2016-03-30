module.exports = function(app) {
	app.delete("/app/catalogs/:catalog", function(req, res, next) {
		var model = req.model,
				id = req.query.id;

			model.remove({_id: id}, function(err, result) {
				if(err) {
					return next(err);
				}

				res.json(result);

			});	
	});
};