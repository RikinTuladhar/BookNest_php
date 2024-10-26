<?php
include("../config.php");

header("Content-Type: application/json");

$json = array();

// Fetch all categories with the count of books
$query = "
    SELECT c.id, c.name, COUNT(b.id) AS bookCount
    FROM category c
    LEFT JOIN book b ON c.id = b.category_id
    GROUP BY c.id
";
$result = mysqli_query($link, $query);

if ($result) {
    while ($row = mysqli_fetch_assoc($result)) {
        $json[] = $row;
    }
} else {
    $json['error'] = "Failed to fetch categories.";
}

// If no categories are found, you can return an empty array
if (empty($json)) {
    $json = [];
}

echo json_encode($json, JSON_PRETTY_PRINT);
?>
