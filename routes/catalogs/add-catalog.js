var Type = require("./../../models/types.js"),
		Manager = require("./../../models/managers.js");
		
module.exports = function(app) {
	app.post("/app/catalogs/:catalog", function(req, res, next) {
		var model = req.model,		
				object;

		if(model === Type) {
			object = new Type({
				title: req.body.title
			});
	
		} else if(model === Manager) {
				object = new Manager({
					surname: req.body.surname,
					name: req.body.name,
					patronymic: req.body.patronymic
				});

		} 

		model.create(object, function(err, result) {
			if(err) {
				return next(err);
			}

			res.json(result);
		});
	});
};