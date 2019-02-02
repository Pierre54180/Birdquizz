angular.module('birdquizz').controller('RecapController', 
	['$scope', '$http', '$rootScope', 

	function($scope, $http, $rootScope){

		/*****  RECUPERATION DES DONNNES DE QUESTIONS ET DES BONNE REPONSES  *****/
		$scope.questions=$rootScope.questions;
		$scope.bonneRep=$rootScope.bonneRep;		

		/*****  FONCTION QUI PERMET DE RELANCER UNE PARTIE  *****/
		$scope.recommencer=function(){
			location.reload(); 	
		}	

		/*****  FONCTION POUR PARCOURIRE LES RESULTAT DE CHAQUE QUESTION  *****/
		function affiche(){
			/*****  INITIE I POUR PARCOURIRE LE TABLEAU  *****/ 
			var i=0;		
			
			/*****  FOREACH DE QUESTIONS  *****/
			$scope.questions.forEach(function(quest){
				
				/*****  RECUPERATION DES RESULTATS DES REPONSES  *****/
				quest.bonneRep=$scope.bonneRep[i];
				i++;				
			})
			return $scope.questions;			
		}
		/*****  APPEL DE LA FONCTION AFFICHE  *****/
		affiche();
	}
]);
