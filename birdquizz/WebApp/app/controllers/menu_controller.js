angular.module('birdquizz').controller('MenuController', 
	['$scope', '$http', '$rootScope', 

	function($scope, $http, $rootScope){

		/*****  AFFICHER LE PSEUDO ENREGISTRER EN SESSION  *****/
		$scope.pseudo = sessionStorage.pseudo;	

		/*****  ENREGISTREMENT DU NIVEAU CHOISI ET LANCEMENT DU QUIZZ  *****/
		$scope.SendNiveau=function($niveau){
			$rootScope.niveau=$niveau;
			$rootScope.quiz=true;
		}
	}
]);
