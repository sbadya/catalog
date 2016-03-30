/* Require modules */
var express = require("express"),
		http = require("http"),
		config = require("./config/"),
		path = require("path"),
		app = express(),
		HttpError = require("./error/").HttpError,
		logger = require("./libs/logger.js")(module),
		routing;

/* Create Server */
http.createServer(app).listen(config.get("port"), function() {
	logger.info("Server listening on " + config.get("port"));
});

/* Application's settings */
app.set("views", __dirname + "/views");
app.set("view engine", "jade");

app.use(express.favicon());

if(app.get("env") === "development") {
	app.use(express.logger("dev"));
} else {
	app.use(express.logger("default"));
}

/* Setting */
app.use(express.bodyParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(require("./middlewares/sendHttpError.js"));

/* Routing */
app.use(app.router);
require("./routes")(app);

app.use(function(req, res, next) {
	next(new HttpError(404, "Page not found!"));
});

/* Error Handler */
app.use(function(err, req, res, next) {
	
	if(typeof err === "number") {
		err = new HttpError(err);
	}

	if(!(err instanceof(HttpError))) {
		err = new HttpError(500);
	}

	err.url = req.path;
	logger.error("Error status: " + err.status + ", Error path: " + err.url + ", Error message: " + err.message);
	res.sendHttpError(err);
});