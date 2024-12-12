<?php
header('Content-Type: application/json');

// Include the database connection
require 'dbh.php';

// Get registration number from query parameter
$doctorId = isset($_GET['doctorId']) ? $_GET['doctorId'] : '';

if (empty($doctorId)) {
    echo json_encode(array('status' => 'error', 'error' => 'Doctor ID is missing'));
    $conn->close();
    exit();
}

// Escape the input to prevent SQL injection
$doctorId = $conn->real_escape_string($doctorId);

// Prepare SQL statement
$sql = "SELECT dpic FROM doctorlogin WHERE `Registration Number` = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $doctorId);
$stmt->execute();
$result = $stmt->get_result();

// Prepare response
$response = array();
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $response['status'] = 'success';
    $response['imagePath'] = $baseUrl . "uploads/". $row['dpic']; // Use the base URL from dbh.php
} else {
    $response['status'] = 'error';
    $response['error'] = 'No image found for this registration number';
}

// Close connection
$stmt->close();
$conn->close();

// Return JSON response
echo json_encode($response);
?>
