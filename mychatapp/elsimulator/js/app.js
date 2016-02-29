

var stApp = angular.module('stApp', [

'ngRoute',
'Controllers',
'stServices',
'stAnimations'



]);

stApp.config(['$routeProvider',
	function($routeProvider){
		$routeProvider.
		when('/skillpage',{
			templateUrl: 'partials/charslist.html',
			controller: 'CharsListCtrl'
		}).
		when('/skillpage/:charId',{
			templateUrl:'partials/charimg.html',
			controller:'CharDetailCtrl'
		}).
		when('/skillpage/st/:charName',{
			templateUrl:'partials/skillspage.html',
			controller:'SkillCtrl'
		}).
		otherwise({
			redirectTo: '/skillpage'
		});
		
}]);
	
