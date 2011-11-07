<?php 
error_reporting(E_ALL);
/*
kdyz bude aplikace stahovat neco ze serveru, 
tak odpoved serveru bude vypadat asi nejak takto:

{
    'success': true,    
    'results': [
        {'id': 151, 'name': 'Přemysl Vyhnal'}, 
        {'id': 252, 'name': 'Jan Černý'}, 
        {'id': 366, 'name': 'Ondřej Šťastný'},
        {'id': 379, 'name': 'Jakub Podlaha'}
    ]
}
*/

// (hlavicky pro XHR pristup z jine domeny)

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: x-requested-with");


$results = array(
				array('id'=>1, 'name'=>'Přemysl Vyhnal'),
				array('id'=>2, 'name'=>'Jan Černý'),
				array('id'=>3, 'name'=>'Ondřej Šťastný'),
				array('id'=>4, 'name'=>'Jakub Podlaha')
				);
shuffle($results);

echo json_encode(array(
			'success'=>true,
			'results'=>$results));

