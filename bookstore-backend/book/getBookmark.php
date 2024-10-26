<?php
include("../config.php");

// Initialize response array
$json = [];
$success = true;

// Get the user ID from the query parameter and validate it
if (isset($_GET['id']) && !empty($_GET['id'])) {
    $user_id = intval($_GET['id']); // Ensure it's an integer to prevent SQL injection

    // Query to select the bookmark details based on the seller ID
    $query = mysqli_query($link, "
        SELECT 
            bm.id AS id, 
            bm.book_id AS bookid, 
            b.title AS bookTitle, 
            b.posted_date AS posted_date, 
            u.email AS email
        FROM 
            bookmark bm
        JOIN 
            book b ON bm.book_id = b.id
        JOIN 
            users u ON bm.buyer_id = u.id
        WHERE 
            bm.seller_id = $user_id;
    ");

    // Check if the query was successful
    if ($query) {
        if (mysqli_num_rows($query) > 0) {
            // Fetch the bookmark data
            while ($row = mysqli_fetch_assoc($query)) {
                $json[] = [
                    "id" => $row["id"],
                    "bookid" => $row['bookid'],
                    "bookTitle" => $row['bookTitle'],
                    "posted_date" => $row['posted_date'],
                    "email" => $row['email']
                ];
            }
        } else {
            $success = false; // No bookmarks found for the given seller ID
            $json = ["message" => "No bookmarks found for the given seller ID."];
        }
    } else {
        $success = false; // Query failed
        $json = ["message" => mysqli_error($link)]; // Log the SQL error
    }
} else {
    $success = false; // Invalid or missing user ID
    $json = ["message" => "Invalid or missing user ID."];
}

// Send the response back to the client
header('Content-Type: application/json');
echo json_encode([
    "success" => $success,
    "data" => $json
]);
?>