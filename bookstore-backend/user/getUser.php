<?php
include("../config.php");
$json = array();
$data = array();
$success = true;
$query = mysqli_query($link, "SELECT * FROM users");
if (!isset($query))
    $success = false;

$total_rows = mysqli_num_rows($query);
if ($total_rows > 0) {


    while ($row = mysqli_fetch_array($query)) {

        $json[] = $row;

    }
}

echo json_encode($json, JSON_PRETTY_PRINT);
?>