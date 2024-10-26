<?php
session_start(); // Start the session
header('Content-Type: application/json');

// Destroy the session
if (session_destroy()) {
    echo json_encode(['status' => 'success', 'message' => 'Logged out successfully.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Logout failed.']);
}
?>
