angular.module('birdquizz').controller('PartyController',
	['$scope','$http', '$rootScope',

	function($scope, $http, $rootScope){

		/*****  VERIFICATION QUE LE PSEUDO N'A PAS DEJA ETE RENTRE  *****/
		if(sessionStorage.pseudo==undefined){

			/*****  FONCTION CREATION PARTIE APRES AVOIR DONNE SON PSEUDO  *****/
			$scope.addParty=function(){

				/*****  VERIFICATION QUE LE PSEUDO ENVOYE N'EST PAS NUL  *****/
				if(!$scope.player.pseudo==''){

					/*****  APPEL D'UNE URL DE L'API POUR CREER UNE PARTIE AVEC LE PSEUDO EN PARAM  *****/
					$http.post($rootScope.route+'API/parties', { pseudo: $scope.player.pseudo })
					.then(function(response){

						/*****  PERMET DE SAVOIR QUE L'UILISATEUR A DEJA ENTRE SON PSEUDO  *****/
						$rootScope.played=true;

						/*****  SAUVEGARDE EN SESSION DU PSEUDO ET TOKEN QUI EST LA REPONSE DE L'URL APPELE  *****/
						sessionStorage.setItem("pseudo", $scope.player.pseudo);
						sessionStorage.setItem("token", response.data.Token);
					},function(error){
					
					});
				}else{

					/*****  INFORME L'UTILISATEUR QUE LE PSEUDO ENTRE EST INCORRECT  *****/
					alert(' Pseudo incorect ! ');
				}
			}
		}else{
			/*****  PERMET DE NE PLUS AFFICHER LA DIV QUI DEMANDE LE PSEUDO  *****/
			$rootScope.played=true;		
		}
	}]
);

