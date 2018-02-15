	// create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ngRoute']);

	// configure our routes
	scotchApp.config(function($routeProvider) {
	    $routeProvider
	    // route for the home page
	        .when('/', {
	        templateUrl: 'pages/search.html',
	        controller: 'mainController'
	    })
	});

	// create the controller and inject Angular's $scope
	scotchApp.controller('mainController', function($scope, $http) {

	    $scope.search = function(value, field) {
	        console.log('data', value, ' field ', field);
	        $http.get("/api/news?value=" + value + "&field=" + field)
	            .then(function(response) {
	                console.log('response', response);
	                $scope.searchData = response.data.data;
	            });
	    }

	});