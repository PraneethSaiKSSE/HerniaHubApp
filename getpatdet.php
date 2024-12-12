<?php
require 'dbh.php'; // Include the database connection

header('Content-Type: application/json');

// Check if 'patid' parameter is provided
if (isset($_GET['patid'])) {
    $id = $_GET['patid'];

    // Prepare SQL statement to fetch patient details
    $sql = "SELECT * FROM patientlogin WHERE patid = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        echo json_encode($row);
    } else {
        echo json_encode(["error" => "No patient found with this ID"]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "ID parameter is required"]);
}

$conn->close();
?>
