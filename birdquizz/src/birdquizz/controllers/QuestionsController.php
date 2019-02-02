<?php
/*****  NAMESPACE  *****/
namespace birdquizz\controllers;

/*****  USE  *****/
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
use \birdquizz\models\AppInit as AppInit;
use \birdquizz\models\Party as Party;
use \birdquizz\models\Questions as Questions;
use \birdquizz\models\Reponses as Reponses;

/*****  CLASS QUESTIONSCONTROLLER  *****/
class QuestionsController extends AbstractController{

	/*****  FONCTION RECUPERER QUESTIONS ET REPONSES  ****/
	public function getQuestions(Request $req, Response $resp, $args){
		try {
			/*****  REQUETE POUR RECUPERER LES QUESTIONS  *****/
			$q = Questions::select('id','texte','type','url','info')->where('id_level', '=', $args['niveau'])->orderByRaw('RAND()')->take($args['nb'])->get();

			/*****  FOREACH SUR CHAQUE QUESTION RECUPERE  *****/
			foreach ($q as $question) {
				/*****  REQUETE POUR RECUPERER L'ID DES REPONSES DE LA QUESTION  *****/
				$r= Reponses::select('id')->where('id_questions', '=', $question["id"])->get();

				/*****  CREATION D'UN TABLEAU POUR LE RESULTAT DE LA PROCHAINE REQUETE  *****/
				$detail=[];
				
				/*****  FOREACH SUR CHAQUE REPONSE RECUPERE  *****/	
				foreach ($r as $reponse) {
					/*****  REQUETE POUR RECUPERER LES CHAMPS DES REPONSES DE LA QUESTION  *****/
					$rep= Reponses::select('id', 'label', 'valide','type','url')->where('id', '=', $reponse["id"])->get();
					
					/*****  FOREACH SUR CHAQUE DETAIL DES REPONSES RECUPERE POUR L'INSERER LES DONNEES DANS LE TABLEAU  *****/	
					foreach ($rep as $repon) {	
						$detail[] =["id"=> $repon['id'], "label"=>$repon['label'], "valide"=>$repon['valide'], "type"=>$repon['type'], "url"=>$repon['url']];
					}
				}
				/*****  AJOUT DES DONNES DE LA QUESTION AUX DONNES DES REPONSES DANS CE TABLEAU  *****/													
				$detail2[] = [ "Question"=>[ "id"=> $question["id"],"text"=> $question["texte"],"type"=> $question["type"],"url"=> $question["url"],"info"=> $question["info"],"Reponses"=>$detail ]];				
			}

			/*****  APPEL DE LA FONCTION JSON_SUCCESS  *****/
			$status = 200;								
			$content = json_encode(["Questions"=>$detail2]);	
			return $this->json_success($resp, $status, $content);
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
