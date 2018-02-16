	// create the module and name it scotchApp
	var scotchApp = angular.module('scotchApp', ['ngRoute', 'ui.bootstrap']);

	// configure our routes
	scotchApp.config(function($routeProvider, $locationProvider) {
	    $locationProvider.html5Mode(true);

	    $routeProvider
	        .when('/', {
	            templateUrl: 'view/home.html'
	        })
	        .when('/contents', {
	            templateUrl: 'view/content.html'
	        })
	        .when('/about', {
	            templateUrl: 'view/about.html'
	        })
	        .otherwise({
	            redirectTo: '/'
	        });
	});
	// /:no/:date

	// create the controller and inject Angular's $scope


	scotchApp.controller('mainController', function($scope, $http, $sce) {

	    $scope.filteredTodos = [], $scope.currentPage = 1, $scope.numPerPage = 10, $scope.maxSize = 5;
	    $scope.searchData = [];

	    loadLatestNews();

	    function loadLatestNews() {
	        $scope.loading = true;

	        $http.get("/api/latestNews")
	            .then(function(response) {
	                console.log('response', response);
	                $scope.searchData = response.data.data;
	                $scope.loading = false;
	                $scope.$watch('currentPage + numPerPage', function() {
	                    var begin = (($scope.currentPage - 1) * $scope.numPerPage),
	                        end = begin + $scope.numPerPage;
	                    $scope.filteredTodos = $scope.searchData.slice(begin, end);
	                });
	            });
	    }

	    $scope.search = function(value, field) {
	        $scope.loading = true;
	        console.log('data', value, ' field ', field);
	        $http.get("/api/news?value=" + value + "&field=" + field)
	            .then(function(response) {
	                console.log('response', response);
	                $scope.searchData = response.data.data;
	                $scope.loading = false;
	                $scope.$watch('currentPage + numPerPage', function() {
	                    var begin = (($scope.currentPage - 1) * $scope.numPerPage),
	                        end = begin + $scope.numPerPage;

	                    $scope.filteredTodos = $scope.searchData.slice(begin, end);
	                });
	            });
	    }

	    $scope.viewNews = function(data) {
	        console.log('data', data);
	        $scope.viewSelected = $sce.trustAsHtml(data.contents);
	    }

	    $scope.viewDate = false;
	    $scope.displaySearch = function(field) {
	        console.log('field', field);
	        if (field == "date") {
	            $scope.viewDate = true;
	        } else {
	            $scope.viewDate = false;
	        }
	    }

	});