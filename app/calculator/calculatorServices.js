
	var calculateService = function($http){
		var calculate = function(model){
			return $http.post('https://api2.divorcemate.com/msc/api/calculator/calculate', model)
					.then(function (response) {
						return response.data;
	        		})
	        		 .catch(function (message) {
	                    console.error('Service Erron on calculation', message);
	                });
		};

		return {
			calculate: calculate
		};

	};	

	var module = angular.module("mscApp");
	module.factory('calculateService', calculateService);
	//angular.module('mscApp').factory('calculateService', calculateService);
