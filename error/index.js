var util = require("util");
var http = require("http");

function HttpError(status, message) {
	Error.apply(this, arguments);
	this.status = status;
	this.message = message || http.STATUS_CODES[status] || "Error";
	Error.captureStackTrace(this, HttpError);
}

util.inherits(HttpError, Error);
HttpError.prototype.name = "HttpError";

exports.HttpError = HttpError;