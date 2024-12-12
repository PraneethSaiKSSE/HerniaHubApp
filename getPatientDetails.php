<?php
require 'dbh.php'; // Include the database connection

header('Content-Type: application/json');

// Check if 'patid' parameter is provided
if (isset($_GET['patid'])) {
    $patid = intval($_GET['patid']); // Ensure the ID is an integer

    // Prepare SQL statement to fetch patient details
    $sql = "SELECT patid, name, age, gender, address, mob, mail, image FROM patientlogin WHERE patid = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $patid); // Bind parameter as integer
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $patientDetails = $result->fetch_assoc();
        // Assuming 'image' column contains the relative path to the image
        echo json_encode(['success' => true, 'data' => $patientDetails]);
    } else {
        echo json_encode(['success' => false, 'message' => 'No patient found with the provided ID.']);
    }

    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'No ID provided.']);
}

$conn->close();
?>
