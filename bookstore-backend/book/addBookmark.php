<?php
include("../config.php");

// Enable detailed error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set default response values
$response = ['status' => 'Success', 'error' => ''];

// Read and decode input data
$data = json_decode(file_get_contents('php://input'), true);

// Check if required fields are present
if (isset($data['book_id'], $data['buyer_id'], $data['seller_id'], $data['Flag'])) {
    $book_id = mysqli_real_escape_string($link, $data['book_id']);
    $buyer_id = mysqli_real_escape_string($link, $data['buyer_id']);
    $seller_id = mysqli_real_escape_string($link, $data['seller_id']);
    $Flag = mysqli_real_escape_string($link, $data['Flag']);

    // Check if bookmark already exists
    $checkQuery = "SELECT * FROM bookmark WHERE book_id='$book_id' AND buyer_id='$buyer_id' AND seller_id='$seller_id'";
    $result = mysqli_query($link, $checkQuery);

    if (mysqli_num_rows($result) > 0) {
        $response['status'] = 'Failure';
        $response['error'] = 'Already bookmarked';
    } else {
        // Insert new bookmark entry
        $insertQuery = "INSERT INTO bookmark (book_id, buyer_id, seller_id, Flag) VALUES ('$book_id', '$buyer_id', '$seller_id', '$Flag')";
        if (!mysqli_query($link, $insertQuery)) {
            $response['status'] = 'Failure';
            $response['error'] = 'SQL Error: ' . mysqli_error($link);
            error_log($response['error']);
        }
    }
} else {
    $response['status'] = 'Failure';
    $response['error'] = 'Required fields are missing.';
}

// Send JSON response
header('Content-Type: application/json');
echo json_encode($response);
?>