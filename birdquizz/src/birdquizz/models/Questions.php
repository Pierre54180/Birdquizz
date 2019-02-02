<?php
/*****  NAMESPACE  *****/
namespace birdquizz\models;

/*****  CLASS QUESTIONS DE LA TABLE QUESTIONS DE LA BDD  *****/
class Questions extends \Illuminate\Database\Eloquent\Model {

	/*****  ATTRIBUTS DE LA CLASSE  *****/
	protected $table = 'questions';
	protected $primarykey = 'id';

	/*****  FONCTION LEVELQUESTION POUR CREER LA RELATION CLE ETRANGERE DE LA TABLE QUESTIONS A LA CLE PRIMAIRE DE LA TABLE LEVEL  *****/
	public function levelQuestion(){
		return $this->hasOne('\birdquizz\models\Level', 'id_level');
	}

	/*****  FONCTION HAVERESPONSES POUR CREER LA RELATION CLE ETRANGERE DE LA TABLE REPONSES A LA CLE PRIMAIRE DE LA TABLE QUESTIONS  *****/
	public function haveResponses(){
		return $this->hasMany('\birdquizz\models\Reponses', 'id_questions');
	}
}