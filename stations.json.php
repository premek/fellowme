<?php 
// kdyz bude aplikace stahovat neco ze serveru, 
// tak odpoved serveru bude vypadat asi nejak takto:
// (hlavicky pro XHR pristup z jine domeny)

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: x-requested-with");
?>
{
    'success': true,    
    'results': [
        {'id': 1, 'played_date': 4, 'name': 'Led Zeppelin'}, 
        {'id': 2, 'played_date': 3, 'name': 'The Rolling Stones'}, 
        {'id': 3, 'played_date': 2, 'name': 'Daft Punk'}
    ]
}
