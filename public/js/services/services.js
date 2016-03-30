angular.module("services", [])
			 .constant("baseUrl", "app/")
			 .constant("orgsUrl", "app/organizations")
			 .constant("catalogsUrl", "app/catalogs")
			 .constant("defaultOuterPartial", "/partials/about.html")
			 .constant("defaultInnerPartial", "/partials/organizations.html")
			 .constant("defaultItem", "organizations")
			 .factory("Partial", function(defaultOuterPartial, defaultInnerPartial, defaultItem) {
			 		var partial= {};
			 		
			 		function setPartial(outer, inner, activeItem) {
	 					partial.outerPartial = outer || defaultOuterPartial;
	 					partial.innerPartial = inner || defaultInnerPartial;
	 					partial.activeItem = activeItem || defaultItem;
			 		}
			 		return {
			 			loadPartial: function(type) {
			 				if(type === "organizations") {
			 					setPartial("/partials/karkas.html", "/partials/organizations.html", "organizations");
			 				} else if(type === "catalogs") {
			 					  setPartial("/partials/karkas.html", "/partials/catalogs.html", "catalogs");
			 				} else {
			 						setPartial();
			 				}

			 				return partial;
			 			}
			 		};
			 })
			 .service("CRUD", function CRUD($http) {
				 	// GET
				 	CRUD.prototype.getItems = function(url) {
				 		return $http.get(url);
				 	};
				 	//POST
				 	CRUD.prototype.addItem = function(url, item) {
				 		return $http.post(url, item);
				 	};
				 	//DELETE
				 	CRUD.prototype.deleteItem = function(url) {
				 		return $http.delete(url);
				 	};
			 })
			 .service("Organizations", function(CRUD, $http) {
			 		var Organizations = function() {};
			 		Organizations.prototype = Object.create(CRUD.constructor.prototype);
			 		// GET
			 		Organizations.prototype.getItem = function(url) {
			 			return $http.get(url);
			 		};
			 		//PUT
			 		Organizations.prototype.updateItem = function(url, newItem) {
			 			return $http.put(url, newItem);
			 		};

			 		return new Organizations();
			 })
			 .service("Catalogs", function(CRUD) {
				 var Catalogs = function() {};
				 Catalogs.prototype = Object.create(CRUD.constructor.prototype);

				 return new Catalogs();
			 })
			 .factory("Bridge", function() {
			 		var methods = {};

			 		return {
			 			getMethods: function() {
			 				return methods;
			 			},

			 			setMethod: function(title, method) {
			 				methods[title] = method;
			 			}
			 		};
			 });