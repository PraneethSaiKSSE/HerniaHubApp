<?php
// Include the database connection file
require 'dbh.php';

// Initialize response array
$response = array();

// Fetch doctor names from the database
$sql = "SELECT Name FROM doctorlogin"; // Assuming 'Name' is the column name
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Array to store doctor names
    $doctorNames = array();

    // Fetch each row and add doctor name to the array
    while ($row = $result->fetch_assoc()) {
        $doctorNames[] = $row['Name'];
    }

    // Return the array of doctor names as JSON response
    $response = array(
        'success' => true,
        'doctorNames' => $doctorNames
    );
} else {
    // No doctor names found
    $response = array(
        'success' => false,
        'message' => 'No doctor names found'
    );
}

// Close connection
$conn->close();

// Respond with JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
