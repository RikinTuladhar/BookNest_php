<?php
include("../config.php");

// Allow requests from any origin
header("Access-Control-Allow-Origin: *");
// Allow specific methods (GET, POST, etc.)
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
// Allow specific headers (if needed)
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type");
$json = array();
$data = array();
$success = true;
if(isset($_GET['id']) && !empty($_GET['id']))
{
$id=mysqli_real_escape_string($link,$_GET['id']);
$query = mysqli_query($link,"DELETE FROM book where id='".$id."'");
if(!isset($query))
$success = false;
}

$json = array(
'status' => $success,
);

echo json_encode($json,JSON_PRETTY_PRINT);
?>