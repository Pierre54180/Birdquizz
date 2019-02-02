<?php
/*****  NAMESPACE  *****/
namespace birdquizz\controllers;

/*****  USE  *****/
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

/*****  CLASS ABASTRACT  *****/
class AbstractController{
	/*****  ATTRIBUTS DE LA CLASSE  *****/
	protected $c = null;

	/*****  CONSTRUCTEUR  *****/
	public function __construct ( \Slim\Container $c=null){
		$this->c = $c;
	}

	/*****  FONCTION RETURN EN CAS DE SUCCES  *****/
	public function json_success( Response $resp, $code, $content){
		$resp = $resp->withStatus($code)->withHeader('Content-Type', 'application/json:charset=utf8');
        $resp->getBody()->write($content);
		return $resp;
	}

	/*****  FONCTION RETURN EN CAS D'ERREUR  *****/
	public function json_error(Response $resp, $code, $msg){
		$resp = $resp->withStatus($code)->withHeader('Content-Type', 'application/json:charset=utf8');
		$resp->getBody()->write($msg);
		return $resp;
	}
}