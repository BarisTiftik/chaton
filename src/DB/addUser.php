<?php
include "connect.php";
header("Access-Control-Allow-Origin: *");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);

$name = $request->name;
$phoneNum = $request->phoneNum;

$insert = $db->prepare("insert into person(name, phone_num) values (?, ?)");

$insert->bindParam(1, $name, PDO::PARAM_STR);
$insert->bindParam(2, $phoneNum, PDO::PARAM_STR, 11);

$control = $insert->execute();

if ($control) {
    echo "inserted!";
}
else {
    echo "error!";
}
?>