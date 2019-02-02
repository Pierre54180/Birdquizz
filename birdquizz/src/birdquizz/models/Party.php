<?php
/*****  NAMESPACE  *****/
namespace birdquizz\models;

/*****  CLASS PARTY DE LA TABLE PARTY DE LA BDD  *****/
class Party extends \Illuminate\Database\Eloquent\Model {

	/*****  ATTRIBUTS DE LA CLASSE  *****/
	protected $table = 'party';
	protected $primarykey = 'id';
	public $timestamps = false;
}