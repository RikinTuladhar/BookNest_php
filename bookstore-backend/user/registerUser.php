<?php
include("../config.php");
error_reporting(E_ALL);
ini_set('display_errors', 1);

$response = array();
$success = true;
$error_message = "";

// Read the input data
$data = json_decode(file_get_contents('php://input'), true);

// Validate required fields
if (isset($data['fullname'], $data['email'], $data['password'], $data['phone_number'], $data['address'], $data['role'])) {
    $fullname = $data['fullname'];
    $email = $data['email'];
    $password = $data['password'];
    $phone_number = $data['phone_number'];
    $address = $data['address'];
    $role = $data['role'];

    // Hash the password for security
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);

    // Insert data into the database
    $query = mysqli_query($link, "INSERT INTO users (fullname, email, password, phone_number, address,role) VALUES ('$fullname', '$email', '$hashed_password', '$phone_number', '$address','$role')");

    if (!$query) {
        $success = false;
        $error_message = mysqli_error($link);
        error_log("SQL Error: " . $error_message);
    }
} else {
    $success = false;
    $error_message = "Required fields are missing.";
}

// Prepare the JSON response
$json = array(
    'status' => $success ? "User registered successfully!" : "Something went wrong",
    'error' => isset($error_message) ? $error_message : ""
);

header('Content-Type: application/json');
echo json_encode($json);
?>