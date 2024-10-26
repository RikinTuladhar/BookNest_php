<?php
include("./config.php");

// Set CORS headers to handle preflight requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Max-Age: 86400"); // Cache preflight response for 1 day

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$input = file_get_contents("php://input");
$data = json_decode($input, true);
$status = true;

// Check if required data is provided
if (isset($data['book_id']) && isset($data['user_id'])) {
    $book_id = intval($data['book_id']);
    $user_id = intval($data['user_id']);

    // Check if playcount already exists for this user and movie
    $isExistSql = "SELECT user_click FROM recommendation WHERE book_id = $book_id AND user_id = $user_id";
    $isExistResult = mysqli_query($link, $isExistSql);

    if ($isExistResult && mysqli_num_rows($isExistResult) > 0) {
        // Fetch current playcount and update it
        $row = mysqli_fetch_assoc($isExistResult);
        $updatedUserClick = $row['user_click'] + 1;

        $updateSql = "UPDATE recommendation SET user_click = $updatedUserClick WHERE book_id = $book_id AND user_id = $user_id";
        $updateResult = mysqli_query($link, $updateSql);

        if ($updateResult) {
            echo json_encode(["message" => "Click updated successfully."]);
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Failed to update Click."]);
        }
    } else {
        // Insert a new playcount record if it doesn't exist
        $insertSql = "INSERT INTO recommendation (user_click, book_id, user_id) VALUES (1, $book_id, $user_id)";
        $insertResult = mysqli_query($link, $insertSql);

        if ($insertResult) {
            echo json_encode(["message" => "Click inserted successfully."]);
        } else {
            http_response_code(400);
            echo json_encode(["message" => "Failed to insert Click."]);
        }
    }
} else {
    http_response_code(400);
    echo json_encode(["message" => "Invalid input. Movie ID and User ID are required."]);
}

?>
