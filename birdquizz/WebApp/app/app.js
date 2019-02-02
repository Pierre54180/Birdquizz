angular.module('birdquizz', []).run(['$rootScope',function($rootScope){
	/*****  TOUT LES ROOTSCOPE NECESSAIRE POUR LES UTILISER DANS CHAQUE CONTROLLER  *****/
	$rootScope.played=false;
	$rootScope.pseudo=null;
	$rootScope.questions = [];
	$rootScope.reponses = [];
	$rootScope.i = 0;
	$rootScope.niveau=0;
	$rootScope.repPhoto = 0;
	$rootScope.clic=false;
	$rootScope.serie=false;
	$rootScope.quiz=false;
	$rootScope.score=0;
	$rootScope.bonneRep=[];
	$rootScope.time=0;
	$rootScope.min=0;
	$rootScope.sec=0;
	$rootScope.route = 'http://localhost:8888/birdquizz/';
}]);
