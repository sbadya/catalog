angular.module("filters", [])
			 .filter("filterTypes", function($filter) {
			 		return function(types, searchType) {
			 			return $filter("filter")(types, function(type) {
			 				if(!searchType) {
								return true;
							}

 							return  type
 												.title.toLowerCase()
 												.indexOf(searchType.toLowerCase()) > -1;
			 			});
			 		};
			 })
			 .filter("filterManagers", function($filter) {
			 		return function(managers, searchManager) {
			 			if(angular.isArray(managers)) {
				 			return $filter("filter")(managers, function(manager) {
				 				if(!searchManager) {
				 					return true;
				 				}
				 				searchManager = searchManager.toLowerCase();

				 				var name = manager.name.toLowerCase(),
				 						surname = manager.surname.toLowerCase(),
				 						patronymic = manager.patronymic.toLowerCase();

				 				return name.indexOf(searchManager) > -1 ||
				 							 surname.indexOf(searchManager)	 > -1 ||
				 							 patronymic.indexOf(searchManager) > -1;	
				 			});
			 			} else {
			 				return managers;
			 			}
			 		};
			 })
			 .filter("editManager", function() {
			 	return function(manager) {
			 		if(manager) {
			 			return manager.surname + " " + manager.name.charAt(0) + "." + 
			 		manager.patronymic.charAt(0) + ".";
			 		}
			 	};
			 });