<?php
require 'dbh.php'; // Include the database connection

header('Content-Type: application/json');

// Get patient ID from query parameter
$patientId = isset($_GET['patid']) ? $_GET['patid'] : null;

if ($patientId !== null) {
    // Prepare and execute SQL query to fetch patient details
    $sql = "SELECT name, age, gender, address, mob, mail, patid, `Registration Number` FROM patientlogin WHERE patid = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $patientId);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $patient = $result->fetch_assoc();
        echo json_encode($patient);
    } else {
        echo json_encode(null);
    }

    $stmt->close();
} else {
    echo json_encode(['error' => 'Patient ID is missing']);
}

$conn->close();
?>
