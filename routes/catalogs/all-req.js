var Type = require("./../../models/types.js"),
		Manager = require("./../../models/managers.js"),
		HttpError = require("./../../error/").HttpError;
		
module.exports = function(app) {
	app.all("/app/catalogs/:catalog", function(req, res, next) {
		var catalog = req.params.catalog;

		if(catalog === "types") {
			req.model = Type;
		} else if(catalog === "managers") {
			req.model = Manager;
		} else {
			return next(new HttpError(404, "Page not found!"));
		}

		next();

	});
};