	// create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ui.bootstrap']);

	// configure our routes
	// scotchApp.config(function($routeProvider) {
	//     $routeProvider
	//     // route for the home page
	//         .when('/', {
	//         templateUrl: 'pages/search.html',
	//         controller: 'mainController'
	//     })
	// });

	// create the controller and inject Angular's $scope
	scotchApp.controller('mainController', function($scope, $http) {

	    $scope.filteredTodos = [], $scope.currentPage = 1, $scope.numPerPage = 15, $scope.maxSize = 15;
	    $scope.searchData = [];

	    // $scope.makeTodos = function() {
	    //     $scope.todos = [];
	    //     for (i = 1; i <= 1000; i++) {
	    //         $scope.todos.push({ text: 'todo ' + i, done: false });
	    //     }
	    // };
	    // $scope.makeTodos();



	    $scope.search = function(value, field) {
	        console.log('data', value, ' field ', field);
	        $http.get("/api/news?value=" + value + "&field=" + field)
	            .then(function(response) {
	                console.log('response', response);
	                $scope.searchData = response.data.data;
	                $scope.$watch('currentPage + numPerPage', function() {
	                    var begin = (($scope.currentPage - 1) * $scope.numPerPage),
	                        end = begin + $scope.numPerPage;

	                    $scope.filteredTodos = $scope.searchData.slice(begin, end);
	                });
	            });
	    }

	    $scope.viewNews = function(data) {
	        console.log('data', data);
	        $scope.viewSelected = data;
	        $scope.displayMe = true;
	    }

	    $scope.closeMe = function() {
	        $scope.displayMe = false;
	    }
	});
