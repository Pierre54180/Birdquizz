angular.module('birdquizz').service('Reponses', ['$http',
	function($http){
		var Reponses= function(data){
			this.id = data.id;
			this.label = data.label;
			this.valeur = data.valeur;
		}
		return Reponses;
}]);