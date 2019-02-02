angular.module('birdquizz').controller('QuestionsController', 
	['$scope', '$http', '$rootScope', 

	function($scope, $http, $rootScope){
		/*****  AJOUT AUTHORIZATION AVEC LE TOKEN  *****/
        $http.defaults.headers.common.Authorization = sessionStorage.token;

        /*****  AFFICHER LE PSEUDO ENREGISTRER EN SESSION  *****/
		$scope.pseudo = sessionStorage.pseudo;

		/*****  REUCPEARTION DE L'HEURE DU LANCEMENT DE LA PARTIE  *****/
		$rootScope.time = new Date();
		
		/*****  APPEL D'UNE URL DE L'API POUR RECUPERE DES QUESTIONS EN FONCTION DU NIVEAU SELECTIONNE  *****/
		$http.get($rootScope.route+'API/partie/questions/10/niveau/'+$rootScope.niveau)
		.then(function(response){

			/*****  RECUPEARATION DES DONNEES DE L'URL  *****/
			response.data.Questions.forEach(function(data){	
				$rootScope.questions.push(data.Question);					
			});

			/*****  SEPARATION DES DEUX TYPES DE QUSTIONS  *****/
			if($rootScope.questions[$rootScope.i].type==2){
				sessionStorage.setItem("question", $rootScope.questions[$rootScope.i].text);
				sessionStorage.setItem("url", $rootScope.questions[$rootScope.i].url);
				sessionStorage.setItem("info", $rootScope.questions[$rootScope.i].info);
				$rootScope.repPhoto=1;
			}else{
				sessionStorage.setItem("question", $rootScope.questions[$rootScope.i].text);
				sessionStorage.setItem("info", $rootScope.questions[$rootScope.i].info);
				$rootScope.repPhoto=0;
			}

			/*****  RECUPEARATION DES REPONSES  *****/
			sessionStorage.setItem("reponses", JSON.stringify($rootScope.questions[$rootScope.i].Reponses));

			/*****  AFFICHAGE DES DONNES  *****/				
			$rootScope.quest = sessionStorage.question;
			$rootScope.url = sessionStorage.url;
			$rootScope.info = sessionStorage.info;
			$rootScope.rep = angular.fromJson(sessionStorage.reponses);
			$rootScope.rep = shuffle(shuffle($rootScope.rep));
			$rootScope.serie=true;
		},function(error){
						
		});
		
		/*****  FONCTION POUR METTRE LES REPONSES A DES POSITIONS ALEATOIRE  *****/		
		function shuffle(a)
		{
		   	var j = 0;
		   	var valI = '';
		   	var valJ = valI;
		   	var l = a.length - 1;
		   	while(l > -1)
		   	{
				j = Math.floor(Math.random() * l);
				valI = a[l];
				valJ = a[j];
				a[l] = valJ;
				a[j] = valI;
				l = l - 1;
			}
			return a;
		}
		
		/*****  FONCTION VERIFICATION DE LA REPONSE  *****/
		$scope.verifReponse=function($valide){

			/*****  VERIFICATION SI LA REPONSE EST BONNE OU FAUSSE  *****/
			if($valide==1){

				/*****  VERIFICATION DE LA REPONSE ET DU CLIC  *****/
				if($rootScope.clic==false){
					$rootScope.score=$rootScope.score+1;
					$rootScope.clic=true;
					$rootScope.bonneRep.push("V");
				}	

				/*****  CHANGEMENT DE COULEUR EN VERT DE LA BONNE REPONSE  *****/
				var rep1 = document.getElementsByClassName('rep1');
				var i;
				for (i = 0; i < rep1.length; i++) {
				    rep1[i].classList.add("goodAnswerText");
				}

				/*****  CHANGEMENT DE COULEUR EN ROUGE DES MAUVAISES REPONSES  *****/
				var rep0 = document.getElementsByClassName('rep0');
				var i;
				for (i = 0; i < rep0.length; i++) {
				    rep0[i].classList.add("wrongAnswerText");
				}	

				/*****  CHANGEMENT DE COULEUR DE LA BORDURE EN VERT DE LA BONNE IMAGE  *****/
				var repImage1 = document.getElementsByClassName('repImage1');
				var i;
				for (i = 0; i < repImage1.length; i++) {
				    repImage1[i].classList.add("goodAnswerImage");
				}

				/*****  CHANGEMENT DE COULEUR DE LA BORDURE EN ROUGE DES MAUVAISES IMAGES  *****/
				var repImage0 = document.getElementsByClassName('repImage0');
				var i;
				for (i = 0; i < repImage0.length; i++) {
				    repImage0[i].classList.add("wrongAnswerImage");
				}	

			}else{

				/*****  VERIFICATION DE LA REPONSE ET DU CLIC  *****/
				if($rootScope.clic==false){
					$rootScope.clic=true;
					$rootScope.bonneRep.push("X");
				}

				/*****  CHANGEMENT DE COULEUR EN VERT DE LA BONNE REPONSE  *****/
				var rep1 = document.getElementsByClassName('rep1');
				var i;
				for (i = 0; i < rep1.length; i++) {
				    rep1[i].classList.add("goodAnswerText");
				}

				/*****  CHANGEMENT DE COULEUR EN ROUGE DES MAUVAISES REPONSES  *****/
				var rep0 = document.getElementsByClassName('rep0');
				var i;
				for (i = 0; i < rep0.length; i++) {
				    rep0[i].classList.add("wrongAnswerText");
				}

				/*****  CHANGEMENT DE COULEUR DE LA BORDURE EN VERT DE LA BONNE IMAGE  *****/
				var repImage1 = document.getElementsByClassName('repImage1');
				var i;
				for (i = 0; i < repImage1.length; i++) {
				    repImage1[i].classList.add("goodAnswerImage");
				}

				/*****  CHANGEMENT DE COULEUR DE LA BORDURE EN ROUGE DES MAUVAISES IMAGES  *****/
				var repImage0 = document.getElementsByClassName('repImage0');
				var i;
				for (i = 0; i < repImage0.length; i++) {
				    repImage0[i].classList.add("goodAnswerImage");
				}		
			}
		}

		/*****  FONCTION POUR CHANGER DE QUESTION  *****/
		$scope.nextQuestion=function(){
			
			/***** VARIABLES POUR SAVOIR LA QUESTION  *****/
			$rootScope.i=$rootScope.i+1;
			
			/*****  VERIFICATION DU NOMBRE DE QUESTION PASSE  *****/
			if($rootScope.i<10){
				
				/*****  SEPARATION DES DEUX TYPES DE QUSTIONS  *****/
				if($rootScope.questions[$rootScope.i].type==2){
					sessionStorage.setItem("question", $rootScope.questions[$rootScope.i].text);
					sessionStorage.setItem("url", $rootScope.questions[$rootScope.i].url);
					sessionStorage.setItem("info", $rootScope.questions[$rootScope.i].info);
					$rootScope.repPhoto=1;
				}else{
					sessionStorage.setItem("question", $rootScope.questions[$rootScope.i].text);
					sessionStorage.setItem("info", $rootScope.questions[$rootScope.i].info);
					$rootScope.repPhoto=0;
				}
				/*****  RECUPEARATION DES REPONSES  *****/
				sessionStorage.setItem("reponses", JSON.stringify($rootScope.questions[$rootScope.i].Reponses));

				/*****  AFFICHAGE DES DONNES  *****/				
				$rootScope.quest = sessionStorage.question;
				$rootScope.url = sessionStorage.url;
				$rootScope.rep = angular.fromJson(sessionStorage.reponses);
				$rootScope.clic=false;
				$rootScope.info = sessionStorage.info;
				$rootScope.rep = shuffle(shuffle($rootScope.rep));
			}else{
				/*****  AFFICHAGE DU TABLEAU RECAPITULATIF  *****/
				$rootScope.recap=true;
				$rootScope.serie=true;
				$rootScope.quiz=false;
				$rootScope.i=0;
				$rootScope.clic=false;

				/*****  CALCULE DU TEMPS MIS EN MINUTE ET SECONDE + AFFICHAGE  *****/
				var time = new Date();
				var tempsecoule = time - $rootScope.time;
				var total = Math.round(tempsecoule / 1000);

				if (total >= 60){
					var minute = parseInt(Math.abs(total / 60));
					total = total - (minute * 60);
					$rootScope.min = minute;
				}
				var seconde = total;
				$rootScope.sec = seconde;
			}
		}	
	}]
);