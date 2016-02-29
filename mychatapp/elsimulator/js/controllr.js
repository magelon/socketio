var Controllers = angular.module('Controllers', []);

Controllers.controller('CharsListCtrl', ['$scope','Char',
function ($scope,Char) {
	$scope.chars= Char.query();
	
}]);


Controllers.controller('CharDetailCtrl',['$scope','$routeParams','Char',
	function($scope,$routeParams,Char){

		
		$scope.char=Char.get({charId:$routeParams.charId},function(data){

		$scope.mainImageUrl=data.images[0];
});
		


		$scope.setImage = function(imageUrl){
		$scope.mainImageUrl = imageUrl;
	}		

}]);


Controllers.controller('SkillCtrl',['$scope','$routeParams','Char',
	function($scope,$routeParams,Char){
	
			$scope.char=Char.get({charId:$routeParams.charName},function(data){

			$scope.skill0=data.skills[0];
			$scope.skillinfo0=data.skillinfo[0];
			
			$scope.skill1=data.skills[1];
			$scope.skillinfo1=data.skillinfo[1];				

			$scope.skill2=data.skills[2];
			$scope.skillinfo2=data.skillinfo[2];

			});
}]);


