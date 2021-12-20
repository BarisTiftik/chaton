<?php
include "connect.php";
header("Access-Control-Allow-Origin: *");
error_reporting(E_ERROR);

$postdata = file_get_contents("php://input");

$request = json_decode($postdata);

$senderNumber = $request->senderNumber;
$receiverNumber = $request->receiverNumber;


/*$query = $db->prepare("select distinct sender.name as sender_name, sender.phone_num as sender_phone_num,
                receiver.name as receiver_name, receiver.phone_num as receiver_phone_num, 
                msg.text, msg.date 
from message msg inner join person sender on msg.sender_num = sender.phone_num
                  inner join person receiver on msg.receiver_num = receiver.phone_num;
                       ");*/

/*$query = $db->prepare("select  message.sender, u1.name as sender_name, message.receiver, u2.name as receiver_name
                        from message
                        inner join person u1 on u1.phone_num = message.sender_num
                        inner join person u2 on u2.phone_num = message.receiver_num;
                       ");*/

/*$query = $db->prepare("select m.*, s.name as sender_name, r.name as receiver_name
                        from message AS m
                        join person AS s on m.sender_num = ?
                        join person AS r on m.receiver_num = ?;
                       ");*/

/*
$query = $db->prepare("select * 
                       from message AS m, person AS p
                       where ( m.sender_num = p.phone_num OR m.receiver_num = p.phone_num ) AND 
                       ( (m.sender_num = ? AND m.receiver_num = ?) OR (m.sender_num = ? AND m.receiver_num = ?) )");
 */

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

$result = array_merge($messages2, $messages1);


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