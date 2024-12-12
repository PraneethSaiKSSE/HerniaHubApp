<?php
header('Content-Type: application/json');

// Include the database connection file
require 'dbh.php';

// Get registration number from POST request
$data = json_decode(file_get_contents("php://input"), true);
$registration_number = isset($data['registrationNumber']) ? $data['registrationNumber'] : null;

if ($registration_number) {
    // Fetch patient details
    $sql = "SELECT pid, date, comp, comps, pic, dname FROM treated_patients WHERE did = ?";
    $stmt = $conn->prepare($sql);
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
    echo json_encode(['error' => 'Registration number is missing']);
}

$conn->close();
?>
