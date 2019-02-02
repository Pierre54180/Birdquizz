<?php
require '../vendor/autoload.php';

/*****  USE  *****/	
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \birdquizz\models\AppInit as AppInit;
use \birdquizz\controllers\PartyController as Party;
use \birdquizz\controllers\QuestionsController as Questions;

/*****  INITIALISATION ELOQUENT  *****/
AppInit::bootEloquent('../conf/conf.ini');

/*****  INITIER CONF POUR SLIM  *****/
$conf=['settings'=>['displayErrorDetails'=>true]];

/*****  INITIER SLIM  *****/
$app = new \Slim\App(new \Slim\Container($conf));


/*****  FONCTION VERIFICATION DU TOKEN  *****/
function checkToken ( Request $rq, Response $rs, callable $next ) {
    $token = $rq->getHeader('Authorization');
	try {
		\birdquizz\models\Party::where('token', '=',$token)->firstOrFail();
		return $next($rq, $rs);
	}
	catch (\Exception $e)
	{
		$status = 403;
		$content = json_encode(['error'=>'no token or invalid token']);
		$ab = new \birdquizz\controllers\AbstractController;
		return $ab->json_error($rs, $status, $content);
	};
}

/*****  ROUTE CREATION PARTIE  *****/
$app->post('/parties[/]',
	function (Request $req, Response $resp, $args) {
		return (new Party($this))
			->createParty($req, $resp, $args);
	}
)->setName('party');

/*****  ROUTE RECUPERATION QUESTIONS/REPONSES  *****/
$app->get('/partie/questions/{nb}/niveau/{niveau}',
	function (Request $req, Response $resp, $args) {
		return (new Questions($this))
			->getQuestions($req, $resp, $args);
	}
)->setName('GetQuestions')->add('checkToken');

$app->run();
