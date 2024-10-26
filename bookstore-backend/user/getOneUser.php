<?php
include("../config.php");

$json = array();
$success = true;

// Check if 'id' parameter is provided
if (isset($_GET['id'])) {
    $user_id = mysqli_real_escape_string($link, $_GET['id']); // Sanitize the input to prevent SQL injection

    // Query to fetch the user by id
    $query = mysqli_query($link, "SELECT id, fullname, email, phone_number, address FROM users WHERE id = '$user_id'");

    if (!$query) {
        $success = false;
        echo json_encode(["success" => $success, "error" => mysqli_error($link)]);
        exit();
    }

    // Check if the user was found
    if (mysqli_num_rows($query) > 0) {
        $json = mysqli_fetch_assoc($query); // Fetch the user data
        echo json_encode(["success" => true, "user" => $json], JSON_PRETTY_PRINT);
    } else {
        echo json_encode(["success" => false, "message" => "User not found"]);
    }
} else {
    echo json_encode(["success" => false, "message" => "User ID not provided"]);
}
?>