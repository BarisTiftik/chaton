<?php

    header("Access-Control-Allow-Origin: *");

    try {
        //$db = new PDO("mysql:host=localhost;dbname=chaton;charset=utf8","root","");
        $db = new PDO("mysql:host=dijkstra.ug.bcc.bilkent.edu.tr;dbname=baris_tiftik;charset=utf8","baris.tiftik","G7SkG9RC");
        //echo "successful";
    } catch (PDOException $e) {
        echo $e->getMessage();
    }

?>