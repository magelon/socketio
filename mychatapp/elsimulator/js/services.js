
	var stServices = angular.module('stServices',['ngResource']);
	
	stServices.factory('Char',['$resource',
		function($resource){
			return $resource('chars/:charId.json',{},{
				query:{method:'GET',params:{charId:'chars'},isArray:true}
				
			});
				
			
}]);