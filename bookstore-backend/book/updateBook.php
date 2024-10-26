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
    $id = (int)$decoded_data['id'];
    $title = mysqli_real_escape_string($link, $decoded_data['title']);
    $price = mysqli_real_escape_string($link, $decoded_data['price']);
    $original_price = mysqli_real_escape_string($link, $decoded_data['original_price']);
    $image = mysqli_real_escape_string($link, $decoded_data['image']);
    $book_condition = mysqli_real_escape_string($link, $decoded_data['book_condition']);
    $description = mysqli_real_escape_string($link, $decoded_data['description']);
    $category_id = (int)$decoded_data['category_id'];
    $subcategory_id = (int)$decoded_data['subcategory_id'];

    // SQL query to update the book
    $query = mysqli_query($link, "
        UPDATE book SET 
            title = '$title',
            price = '$price',
            original_price = '$original_price',
            image = '$image',
            book_condition = '$book_condition',
            description = '$description',
            category_id = '$category_id',
            subcategory_id = '$subcategory_id'
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
