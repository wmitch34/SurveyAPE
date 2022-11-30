<!-- add a user to db if it does not already exist. Return negative message for failure, positive mesage for success -->
<?php
    $str_regObj = file_get_contents('php://input'); //receives raw data from HTTP request
    $data = json_decode($str_regObj);   //decodes JSON into PHP object
?>
