<?php
/*****  NAMESPACE  *****/
namespace birdquizz\models;

/*****  CLASS LEVEL DE LA TABLE LEVEL DE LA BDD  *****/
class Level extends \Illuminate\Database\Eloquent\Model {

	/*****  ATTRIBUTS DE LA CLASSE  *****/
	protected $table = 'level';
	protected $primarykey = 'id';

	/*****  FONCTION QUESTIONLEVEL POUR CREER LA RELATION CLE ETRANGERE DE LA TABLE QUESTIONS A LA CLE PRIMAIRE DE LA TABLE LEVEL  *****/
	public function questionlevel(){
		return $this->belongsTo('\birdquizz\models\Questions', 'id_level');
	}
}