<?php
include "connect.php";
header("Access-Control-Allow-Origin: *");
error_reporting(E_ERROR);

$query = $db->prepare("select * from person");
$query->execute();

while ($row = $query->fetch(PDO::FETCH_ASSOC)) {
    $users[] = $row;
}

echo json_encode($users);

?>