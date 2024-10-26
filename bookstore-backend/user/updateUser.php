<?php
include("../config.php");

// Initialize response array
$json = array();
$success = true;

// Read raw POST data
$data = file_get_contents('php://input');

// Decode the JSON data
$decoded_data = json_decode($data, true);

// Check if 'id' is set and not empty
if (isset($decoded_data['id']) && !empty($decoded_data['id'])) {
    $id = (int) $decoded_data['id'];
    $fullname = mysqli_real_escape_string($link, $decoded_data['full_name']);
    $email = mysqli_real_escape_string($link, $decoded_data['email']);
    $phone_number = mysqli_real_escape_string($link, $decoded_data['phone_number']);
    $address = mysqli_real_escape_string($link, $decoded_data['address']);


    // SQL query to update the book
    $query = mysqli_query($link, "
        UPDATE users SET 
            fullname = '$fullname',
            email = '$email',
            phone_number = '$phone_number',
            address = '$address'
        WHERE id = $id
    ");

    if (!$query) {
        $success = false;
    }
} else {
    $success = false; // If ID is not set or empty
}

// Prepare response
$json = array(
    'status' => $success
);

// Return response in JSON format
echo json_encode($json, JSON_PRETTY_PRINT);
?>