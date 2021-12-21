<?php
include "connect.php";
header("Access-Control-Allow-Origin: *");

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);

$id = $request->id;
$message = $request->text;
$date = $request->date;
$senderNum = $request->senderNum;
$receiverNum = $request->receiverNum;

$insert = $db->prepare("insert into message(id, text, date, sender_num, receiver_num) values (?, ?, ?, ?, ?)");

$insert->bindParam(1, $id, PDO::PARAM_INT);
$insert->bindParam(2, $message, PDO::PARAM_STR);
$insert->bindParam(3, $date, PDO::PARAM_STR);
$insert->bindParam(4, $senderNum, PDO::PARAM_STR);
$insert->bindParam(5, $receiverNum, PDO::PARAM_STR);

$control = $insert->execute();

if ($control) {
    echo "inserted!";
}
else {
    echo "error!";
}
?>