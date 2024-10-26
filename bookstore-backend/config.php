<?php
$hostName="localhost" ; // Machine on which MySQL Database is running
$userName="root";             // Database User Login
$password="password" ;             // Database User Password
$databaseName = "bookstore" ;       // Database name
$link=@mysqli_connect($hostName, $userName, $password);
if(!isset($link))
die("Database connection error!");
mysqli_select_db($link,$databaseName);
mysqli_query($link,"SET NAMES 'utf8'");

// Allow requests from any origin
header("Access-Control-Allow-Origin: *");
// Allow specific methods (GET, POST, etc.)
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
// Allow specific headers (if needed)
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type");

?>