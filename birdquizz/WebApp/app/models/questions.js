angular.module('birdquizz').service('Questions', ['$http',
	function($http){
		var Questions= function(data){
			this.id = data.id;
			this.text = data.text;
		}
		return Questions;
}]);