angular.module("catalogApp", ["controllers", "services", "filters"])
			 .config(function($locationProvider) {
			 	$locationProvider.html5Mode(true);
			 })
			 .run(function($rootScope, $location) {
			 		
			 		function setUrl(path) {
			 			switch(path) {
								case "/app/organizations":
									$rootScope.$broadcast("changeUrl", {
										type: "organizations"
									});
									break;
								case "/app/catalogs":
									$rootScope.$broadcast("changeUrl", {
										type: "catalogs"
									});
									break;
								case "/":
									$rootScope.$broadcast("changeUrl", {
										type: "about"
									});
									break;
							}
			 		}

			 		$rootScope.$on("$locationChangeSuccess", function(event) {
						var path = $location.path();
						setUrl(path);
			 		});
			 });
			