<?php
include("../config.php");

header("Content-Type: application/json");

$json = array();

if (isset($_GET['category_id'])) {
    $category_id = intval($_GET['category_id']);

    // Fetch subcategories for the given category ID
    $query = "SELECT * FROM subcategory WHERE category_id = $category_id";
    $result = mysqli_query($link, $query);

    if ($result) {
        while ($row = mysqli_fetch_assoc($result)) {
            $json[] = $row;
        }
    } else {
        $json['error'] = "Failed to fetch subcategories.";
    }
} else {
    $json['error'] = "Category ID not provided.";
}

echo json_encode($json, JSON_PRETTY_PRINT);
?>
