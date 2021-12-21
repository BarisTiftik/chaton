<?php
include "connect.php";
header("Access-Control-Allow-Origin: *");
error_reporting(E_ERROR);

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);

$senderNumber = $request->senderNumber;
$receiverNumber = $request->receiverNumber;

$query2 = $db->prepare("select p2.name, m2.text, m2.date
                    from message AS m2, person AS p2
                    where m2.sender_num = p2.phone_num AND (m2.sender_num = ? AND m2.receiver_num = ?)");

$query2->bindParam(1, $senderNumber, PDO::PARAM_INT);
$query2->bindParam(2, $receiverNumber, PDO::PARAM_INT);

$query2->execute();

while ($row2 = $query2->fetch(PDO::FETCH_ASSOC)) {
    $messages2[] = $row2;
}

$query1 = $db->prepare("select p1.name, m1.text, m1.date
                    from message AS m1, person AS p1
                    where m1.sender_num = p1.phone_num AND (m1.sender_num = ? AND m1.receiver_num = ?)");

$query1->bindParam(2, $senderNumber, PDO::PARAM_INT);
$query1->bindParam(1, $receiverNumber, PDO::PARAM_INT);

$query1->execute();

while ($row1 = $query1->fetch(PDO::FETCH_ASSOC)) {
    $messages1[] = $row1;
}

if($messages1 == null)
    $messages1 = array();
if($messages2 == null)
    $messages2 = array();

if($messages2 != $messages1)
    $result = array_merge($messages2, $messages1);
else
    $result = $messages2;


function date_compare($a, $b)
{
    $t1 = strtotime($a['date']);
    $t2 = strtotime($b['date']);
    return $t1 - $t2;
}

if(count($result) > 1)
    usort($result, 'date_compare');

echo json_encode($result);

?>