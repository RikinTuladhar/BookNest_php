<?php
session_start();
include("../config.php"); // Include your database connection file
$data = json_decode(file_get_contents('php://input'), true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the posted data
    $email = $data['email'];
    $password = $data['password'];

    // Query to check if the user exists
    $query = "SELECT * FROM users WHERE email = '$email'";
    $result = mysqli_query($link, $query);

    if (mysqli_num_rows($result) > 0) {
        $user = mysqli_fetch_assoc($result);

        // Verify the password
        if (password_verify($password, $user['password'])) {
            // Set session variables if needed

            echo json_encode([
                "status" => "User login successful",
                "message" => [
                    "id" => $user['id'],
                    "fullname" => $user['fullname'],
                    "email" => $user['email'],
                    "phone_number" => $user['phone_number'],
                    "address" => $user['address'],
                    "role" => $user['role']
                ]
            ]);
        } else {
            echo json_encode([
                "status" => "Invalid password",
            ]);
        }
    } else {
        echo json_encode([
            "status" => "User not found",
        ]);
    }
} else {
    echo json_encode([
        "status" => "Invalid request",
    ]);
}
?>