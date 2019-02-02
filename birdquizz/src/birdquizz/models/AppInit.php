<?php
/*****  NAMESPACE  *****/
namespace birdquizz\models;

/*****  USE  *****/
use \Illuminate\Database\Capsule\Manager;

/*****  CLASS APPINIT  *****/
class AppInit{

	/*****  FONCTION BOOTELOQUENT  *****/
	public static function bootEloquent($file){

		/*****  CONF POUR CONNEXION A LA BASE  *****/
		$conf = parse_ini_file($file);

		/*****  INITIER L'OBJET MANAGER POUR CREER LA BDD SUR ELOQUENT  *****/
		$db = new Manager();
		$db->addConnection($conf);
		$db->setAsGlobal();
		$db->bootEloquent();
	}
}