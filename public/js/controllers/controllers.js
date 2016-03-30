angular.module("controllers", ["services"])
	.controller("mainCtrl", function($scope, $location, $log, baseUrl, Partial, CRUD, Bridge) {
		$scope.title = {};
		$scope.baseUrl = baseUrl;
		$scope.items = {
			organizations: [],
			types: [],
			managers: []
		};

		var loadPartial = function(type) {
			var partial = Partial.loadPartial(type);
			$scope.outerPartial = partial.outerPartial;
			$scope.innerPartial = partial.innerPartial;
			$scope.activeItem = partial.activeItem;
		};

		$scope.loadPartial = function(type) {
			$location.url(baseUrl + type);
		};

		$scope.$on("changeUrl", function(event, args) {
			loadPartial(args.type);
		});

		/* CRUD */
		
		/*
			1. Get organizations, types, managers
		*/
		function getItems(url, callback) {
			callback = callback || function() {};
				CRUD.getItems(url)
						.then(function(resolve) {
								callback(resolve.data);
						}, function(error) {
								$log.error(error.status, error.statusText);
						});
		
		}

		/*
			2. Add organization, type, manager
		*/
		function addItem(url, item, callback) {
			var copy;
			callback = callback || function() {};

			if(!item) {
				return;
			}

			copy = angular.copy(item);

			CRUD.addItem(url, copy)
					.then(function(resolve) {
						callback(resolve.data);
					}, function(error) {
							$log.error(error.status, error.statusText);
					});				
			} 

		/*
			3. Delete organization, type, manager
		*/
		function deleteItem(url, callback) {
			callback = callback || function() {};

			CRUD.deleteItem(url)
					.then(function(resolve) {
						callback();
					}, function(error) {
							$log.error(error.status, error.statusText);
					});
		}

		//Controllers' bridge
		Bridge.setMethod("getItems", getItems);
		Bridge.setMethod("addItem", addItem);
		Bridge.setMethod("deleteItem", deleteItem);
	})
	.controller("organizationsCtrl", function($scope, $log, $filter, $location, Organizations, Bridge, catalogsUrl, orgsUrl) {

		var methods = Bridge.getMethods();

		$scope.url = orgsUrl;
		$scope.catalogsUrl = catalogsUrl;
		$scope.org = {};

		$scope.select = function(item) {
			$scope.selected = item;
		};

		$scope.check = function(item, type) {
			if(!item) {
				alert("Запись не выбрана!");
				return;
			}

			$scope.org[type] = item;
			$scope.selected = null;
			$scope.isHideTypeDialog = $scope.isHideManagerDialog = $scope.isHideOverlay = true;
		};

		$scope.showCatalogItems = function(url, type) {
			if($scope.items[type].length === 0) {
				methods.getItems(url, function(data) {
					$scope.items[type] = data || [];
				});
			}
		};

		/* CRUD */

		function getItems() {
			if($scope.items.organizations.length === 0) {
				methods.getItems($scope.url, function(data) {
					$scope.items.organizations = data || [];
				});
			}
		}
		
		$scope.addItem = function(item, form) {
			if(!item.manager || !item.type) {
				alert("Не выбран тип или руководитель!");
				return;
			}

			methods.addItem($scope.url, item, function(data) {
				if(data.isManager) {
					alert("Данный человек уже руководит другой организацией!");
				} else {
					$scope.items.organizations.push(data);
					form.$setPristine();
					item = $scope.org = null;
				}
			});
		};

		$scope.deleteItem = function(url, currItem) {
			methods.deleteItem(url, function() {
				angular.forEach($scope.items.organizations, function(item) {
									 			if(currItem._id === item._id) {
									 				var pos = $scope.items.organizations.indexOf(item);
									 				$scope.items.organizations.splice(pos, 1);
									 				$scope.org = null;
													$location.url($scope.url);
									 				return;
									 			}
									 		});
			});
		};

		$scope.getItem = function(url) {
			
			Organizations.getItem(url)
									 .then(function(resolve) {
									 		$scope.org = resolve.data.org;
									 		$scope.org.manager = resolve.data.obj.manager;
									 		$scope.org.type = resolve.data.obj.type;
									 		$scope.org.date = $filter("date")($scope.org.date, "dd.MM.yyyy");
									 }, function(error) {
									 			$log.error(error.status, error.statusText);
									 });   	
		};

		$scope.updateItem = function(url, newItem) {
			if(!newItem.manager || !newItem.type) {
				alert("Не выбран тип или руководитель!");
				return;
			}

			Organizations.updateItem(url, newItem)
									 .then(function(resolve) {
									 		if(resolve.data.isManager) {
									 			alert("Данный человек уже руководит другой организацией!");
									 			return;
									 		}
									 		angular.forEach($scope.items.organizations, function(item) {
									 			if(resolve.data._id === item._id) {
									 				var pos = $scope.items.organizations.indexOf(item);
									 				$scope.items.organizations.splice(pos, 1, resolve.data);
									 				return;
									 			}
									 		});
									 }, function(err) {
									 			$log.error(error.status, error.statusText);
									 });	
		};
		getItems();
	})
	.controller("catalogsCtrl", function($scope, $location, catalogsUrl, Bridge) {
		var methods = Bridge.getMethods();

		$scope.url = catalogsUrl;
		
		$scope.select = function(item) {
			$scope.selected = item;
			$location.search("id", item._id);
		};

		/* CRUD */
		
		$scope.getItems = function(url, type) {
			if($scope.items[type].length === 0) {
				methods.getItems(url, function(data) {
					$scope.items[type] = data || [];
				});
			}
		};

		$scope.addItem = function(url, type, item) {
			methods.addItem(url, item, function(data) {
				$scope.items[type].push(data);
				$scope.isHideOverlay = $scope.isHideType = $scope.isHideManager = true;
				item = $scope.type = $scope.manager = null;
			});
		};

		$scope.deleteItem = function(url, type, item) {
			url += "?id=" + item._id;
			methods.deleteItem(url, function() {
				$scope.items[type].splice($scope.items[type].indexOf(item), 1);
				$scope.selected = null;
				$location.search("");
			});
		};

	});