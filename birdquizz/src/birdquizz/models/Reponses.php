<?php 
/*****  NAMESPACE  *****/
namespace birdquizz\models;

/*****  CLASS REPONSES DE LA TABLE REPONSES DE LA BDD  *****/
class Reponses extends \Illuminate\Database\Eloquent\Model {

	/*****  ATTRIBUTS DE LA CLASSE  *****/
	protected $table = 'reponses';
	protected $primarykey = 'id';

	/*****  FONCTION QUESTIONRESPONSE POUR CREER LA RELATION CLE ETRANGERE DE LA TABLE REPONSES A LA CLE PRIMAIRE DE LA TABLE QUESTIONS  *****/
	public function questionResponse(){
		return $this->belongsTo('\birdquizz\models\Questions', 'id_questions');
	}
}