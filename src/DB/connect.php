<?php

    header("Access-Control-Allow-Origin: *");

    try {
        $db = new PDO("mysql:host=localhost;dbname=chaton;charset=utf8","root","");
        //echo "successful";
    } catch (PDOException $e) {
        echo $e->getMessage();
    }

?>