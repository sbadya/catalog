// Routing
module.exports = function(app) {
	require("./main.js")(app);
	require("./organizations/get-orgs.js")(app);
	require("./organizations/get-org.js")(app);
	require("./organizations/add-org.js")(app);
	require("./organizations/del-org.js")(app);
	require("./organizations/upd-org.js")(app);

	require("./catalogs/all-req.js")(app);
	require("./catalogs/add-catalog.js")(app);
	require("./catalogs/get-catalogs.js")(app);
	require("./catalogs/del-catalog.js")(app);
	
};