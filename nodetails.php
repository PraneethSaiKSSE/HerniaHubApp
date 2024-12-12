<?php
require 'dbh.php'; // Include the database connection

header('Content-Type: application/json');

// Get the data from the POST request
$data = json_decode(file_get_contents("php://input"), true);
$registration_number = isset($data['registrationNumber']) ? $data['registrationNumber'] : '';

if (empty($registration_number)) {
    echo json_encode(['error' => 'Registration number is required']);
    $conn->close();
    exit();
}

// Prepare SQL statement
$sql = "SELECT pid, comp, pic FROM not_treated WHERE dname = ?";
$stmt = $conn->prepare($sql);

if ($stmt) {
    $stmt->bind_param("s", $registration_number);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $details = $result->fetch_assoc();
        echo json_encode($details);
    } else {
        echo json_encode(['error' => 'No details found']);
    }

    $stmt->close();
} else {
    echo json_encode(['error' => 'Failed to prepare SQL statement']);
}

$conn->close();
?>
