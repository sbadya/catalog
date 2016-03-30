var winston = require("winston");
var ENV = process.env.NODE_ENV;

function getLogger(module) {
	var path = module.filename.split("/").slice(-2).join("/");
	var path_len = __dirname.split("/").length;
	var log_dir = __dirname.split("/").slice(0, path_len - 1).join("/") + "/log";

	return new winston.Logger({
		transports: [
			new winston.transports.Console({
				colorize: true,
				json: true,
				level: ENV === "development" ? "debug" : "error",
				label: path
			}),
			new winston.transports.File({
				filename: log_dir + "/catalog.log",
				level: "debug",
				json: true,
				label: path,
				timestamp: function() {
					var full = new Date(),
							date = full.getDate(),	
							month = full.getMonth(),
							year = full.getFullYear(),
							hour = full.getHours(),
							minutes = full.getMinutes(),
							seconds = full.getSeconds();

					if(date < 10) {
						date = "0" + date;
					}

					if(month < 10) {
						month = "0" + month;
					}

					if(hour < 10) {
						hour = "0" + hour;
					}

					if(minutes < 10) {
						minutes = "0" + minutes;
					}

					if(seconds < 10) {
						seconds = "0" + seconds;
					}

					return date + "-" + month + "-" + year + "T" + hour + ":" + minutes + ":" + seconds;
				}
			})
		]
	});
}

module.exports = getLogger;