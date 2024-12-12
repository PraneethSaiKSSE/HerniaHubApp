<?php
// Include the database connection file
require 'dbh.php';

// Set Content-Type header to application/json
header('Content-Type: application/json');

// Get the POST data
$data = json_decode(file_get_contents('php://input'), true);
$registration_number = isset($data['registration_number']) ? $data['registration_number'] : null;

if ($registration_number) {
    // Prepare and bind
    $stmt = $conn->prepare("SELECT patid FROM patientlogin WHERE `Registration Number` = ?");
    if ($stmt === false) {
        echo json_encode(array("error" => "Failed to prepare statement: " . $conn->error));
        exit;
    }

    $stmt->bind_param("s", $registration_number);

    // Execute the statement
    $stmt->execute();

    // Get the result
    $result = $stmt->get_result();

    $patientIDs = array();

    if ($result->num_rows > 0) {
        // Output data of each row
        while($row = $result->fetch_assoc()) {
            $patientIDs[] = $row["patid"];
        }
    } else {
        echo json_encode(array("patientIDs" => []));
        exit;
    }

    // Close the statement
    $stmt->close();
} else {
    echo json_encode(array("error" => "Registration number not provided"));
    exit;
}

// Close the connection
$conn->close();

// Encode IDs as JSON for secure transfer
echo json_encode(array("patientIDs" => $patientIDs));
?>
