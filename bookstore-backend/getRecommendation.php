<?php
// Enable PHP headers for CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET,POST,DELETE,PUT,OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

include("./config.php"); // Database connection

// Function to calculate cosine similarity between two books
function cosine_similarity($bookA, $bookB, $link) {
    $stmt = $link->prepare(
        "SELECT user_id, book_id, user_click FROM recommendation WHERE book_id = ? OR book_id = ?"
    );
    $stmt->bind_param("ii", $bookA, $bookB); // Bind parameters
    $stmt->execute();
    $result = $stmt->get_result();
    $data = $result->fetch_all(MYSQLI_ASSOC);

    $playcountA = [];
    $playcountB = [];

    foreach ($data as $row) {
        if ($row['book_id'] == $bookA) {
            $playcountA[$row['user_id']] = $row['user_click'];
        } else if ($row['book_id'] == $bookB) {
            $playcountB[$row['user_id']] = $row['user_click'];
        }
    }

    $commonUsers = array_intersect_key($playcountA, $playcountB);
    if (empty($commonUsers)) {
        return 0;
    }

    $dotProduct = 0;
    $normA = 0;
    $normB = 0;

    foreach ($commonUsers as $user => $playcount) {
        $dotProduct += $playcountA[$user] * $playcountB[$user];
        $normA += pow($playcountA[$user], 2);
        $normB += pow($playcountB[$user], 2);
    }

    return $dotProduct / (sqrt($normA) * sqrt($normB));
}

// Function to get book recommendations for a specific user
function get_recommendations($user_id, $link) {
    $stmt = $link->prepare("SELECT book_id FROM recommendation WHERE user_id = ?");
    $stmt->bind_param("i", $user_id); // Bind user ID
    $stmt->execute();
    $result = $stmt->get_result();
    $userBooks = $result->fetch_all(MYSQLI_ASSOC);

    if (empty($userBooks)) {
        return [];
    }

    $stmt = $link->prepare(
        "SELECT id FROM book WHERE id NOT IN (
            SELECT book_id FROM recommendation WHERE user_id = ?)"
    );
    $stmt->bind_param("i", $user_id); // Bind user ID
    $stmt->execute();
    $result = $stmt->get_result();
    $otherBooks = $result->fetch_all(MYSQLI_ASSOC);

    if (empty($otherBooks)) {
        return [];
    }

    $booksSimilarities = [];

    // Calculate similarities between user's books and other books
    foreach ($userBooks as $userBook) {
        foreach ($otherBooks as $otherBook) {
            $similarity = cosine_similarity($userBook['book_id'], $otherBook['id'], $link);
            if ($similarity > 0) {
                $booksSimilarities[$otherBook['id']] = $similarity;
            }
        }
    }

    arsort($booksSimilarities);
    return array_keys($booksSimilarities); // Return book IDs sorted by similarity
}

// Main logic to handle requests
if (isset($_GET['user_id'])) {
    $user_id = intval($_GET['user_id']); // Get user ID from query

    if ($user_id > 0) {
        $recommendations = get_recommendations($user_id, $link); // Fetch recommendations

        if (!empty($recommendations)) {
            $recommendation_details = [];

            foreach ($recommendations as $book_id) {
                // Fetch book details by ID
                $stmt = $link->prepare("SELECT id, title, image FROM book WHERE id = ?");
                $stmt->bind_param("i", $book_id); // Bind book ID
                $stmt->execute();
                $result = $stmt->get_result();
                $book = $result->fetch_assoc();

                if ($book) {
                    $recommendation_details[] = [
                        'id' => $book['id'],
                        'title' => $book['title'],
                        'image' => $book['image'],
                        'price'=>$book['price'] ?? "Price not given",
                    ];
                }
            }

            // Return recommendations as JSON
            echo json_encode([
                'status' => 'success',
                'recommendations' => $recommendation_details
            ]);
        } else {
            echo json_encode([
                'status' => 'no_recommendations',
                'message' => 'No recommendations found for this user.'
            ]);
        }
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Invalid user ID.'
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'User ID not provided.'
    ]);
}
?>
