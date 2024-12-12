<?php
require 'dbh.php'; // Include the database connection

header('Content-Type: application/json');

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

// Ensure data is set and not null
$registrationNumber = isset($data['registrationNumber']) ? $data['registrationNumber'] : null;

if ($registrationNumber !== null) {
    // Prepare and execute SQL query to fetch appointments
    $stmt = $conn->prepare("SELECT date, time, patid FROM appointments WHERE did = ? AND status = 'pending'");
    $stmt->bind_param("i", $registrationNumber);

    // Execute the statement
    if ($stmt->execute()) {
        $result = $stmt->get_result();
        $appointments = array();

        while ($row = $result->fetch_assoc()) {
            $appointments[] = $row;
        }

        // Return appointments as JSON
        echo json_encode(array("appointments" => $appointments));
    } else {
        echo json_encode(array("success" => false, "message" => "Error fetching appointments."));
    }

    // Close statement
    $stmt->close();
} else {
    echo json_encode(array("success" => false, "message" => "Registration number is null or not set."));
}

// Close connection
$conn->close();
?>
