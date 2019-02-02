<?php
/*****  NAMESPACE  *****/
namespace birdquizz\controllers;

/*****  USE  *****/
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \RandomLib\Factory;
use \birdquizz\models\AppInit as AppInit;
use \birdquizz\models\Party as Party;
use \birdquizz\models\Questions as Questions;

/*****  CLASS PARTYCONTROLLER  *****/
class PartyController extends AbstractController{

	/*****  FONCTION CREER UNE PARTIE  ****/
	public function createParty(Request $req, Response $resp, $args){
		try {	
			/*****  RECUPERATION DATA PASSE DANS LE BODY  *****/
			$data = $req->getParsedBody();
			
			/*****  VERIFICATION DE L'EXISTENCE DE DATA DANS LE BODY  *****/
			if(empty($data)) {
				return $this->json_error($resp, 400, 'Bad Request : missing data (Pseudo)');
			}

			/*****  INITIER UNE NOUVELLE PARTIE  *****/
			$party = new Party; 

			/*****  CREATION D'UN TOKEN  *****/
			$tokenFactory = new Factory;
			$generator = $tokenFactory->getMediumStrengthGenerator();
			$randomString = $generator->generateString(32, 'abcdefghijklmnopqrstuvwyz123456789');

			/*****  AJOUT DANS L'OBJET PARTIE DU TOKEN ET PSEUDO  *****/
			$party->token = $randomString;
			$party->pseudo = filter_var($data['pseudo']);
			
			/*****  SAUVEGARDE DE L'OBJET DANS LA BDD  *****/
			$party->save();

			/*****  APPEL DE LA FONCTION JSON_SUCCESS  *****/
			$status = 200;
			$content = json_encode(["Token"=>$party->token]);
            $resp = $resp->withHeader('Authorization',$party->token);
			$this->json_success($resp, $status, $content);
		}
		catch(\Exception $e)
		{
			/*****  APPEL DE LA FONCTION JSON_ERROR *****/
			$status = 404;
			$content = json_encode(["error"=> "ressource not found : ".$this->c['router']->pathfor('party')]);
			$this->json_error($resp, $status, $content);
		}
	}
}



