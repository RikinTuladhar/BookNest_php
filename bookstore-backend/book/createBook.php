<?php
include("../config.php");
error_reporting(E_ALL);
ini_set('display_errors', 1);

$response = array();
$success = true;
$error_message = "";

// Create the uploads directory if it doesn't exist
$upload_dir = "C:/xampp/htdocs/BookNest/bookstore-frontend/public/uploads";
if (!file_exists($upload_dir)) {
    mkdir($upload_dir, 0777, true);
}

// Handle image upload
$image = null; // Initialize image variable
if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
    $image = $_FILES['image']['name'];
    $target_path = $upload_dir . "/" . basename($image);

    if (!move_uploaded_file($_FILES['image']['tmp_name'], $target_path)) {
        $success = false;
        $error_message = "Error moving uploaded file.";
        error_log($error_message);
    }
} else {
    if ($_FILES['image']['error'] !== UPLOAD_ERR_NO_FILE) {
        $success = false;
        $error_message = "Image upload error: " . $_FILES['image']['error'];
        error_log($error_message);
    }
}

// Read and process the data
$data = $_POST; // Use $_POST because we are using FormData

// Ensure all required fields are present
if (
    isset(
    $data['title'],
    $data['original_price'],
    $data['price'],
    $data['book_condition'],
    $data['description'],
    $data['category_id'],
    $data['subcategory_id'],
    $data['user_id'] // Ensure user_id is included
)
) {
    $title = $data['title'];
    $original_price = $data['original_price'];
    $price = $data['price'];
    $book_condition = $data['book_condition'];
    $description = $data['description'];
    $category_id = $data['category_id'];
    $subcategory_id = $data['subcategory_id'];
    $user_id = $data['user_id'];

    // Prepare and execute the SQL query using prepared statements
    $stmt = $link->prepare("INSERT INTO book (title, price, original_price, image, book_condition, description, category_id, subcategory_id, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssissssii", $title, $price, $original_price, $image, $book_condition, $description, $category_id, $subcategory_id, $user_id);

    if ($stmt->execute()) {
        $success = true; // Book added successfully
    } else {
        $success = false;
        $error_message = $stmt->error; // Capture error message
        error_log("SQL Error: " . $error_message);
    }

    $stmt->close(); // Close the statement
} else {
    $success = false;
    $error_message = "Missing required fields.";
    error_log($error_message);
}

// Prepare the JSON response
$json = array(
    'status' => $success ? "Book added successfully!" : "Something went wrong: " . $error_message,
    'error' => $error_message
);

header('Content-Type: application/json');
echo json_encode($json);
?>