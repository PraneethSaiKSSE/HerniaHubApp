<?php
// Include the database connection file
require 'dbh.php';

// Get POST data
$data = json_decode(file_get_contents('php://input'), true);

// Ensure data is set and not null
$patid = isset($data['patid']) ? $data['patid'] : null;
$date = isset($data['date']) ? $data['date'] : null;
$time = isset($data['time']) ? $data['time'] : null;
$status = isset($data['status']) ? $data['status'] : null;

if ($patid !== null && $date !== null && $time !== null && $status !== null) {
    // Prepare and execute SQL query to update status
    $stmt = $conn->prepare("UPDATE appointments SET status = ? WHERE patid = ? AND date = ? AND time = ?");
    $stmt->bind_param("siss", $status, $patid, $date, $time);

    // Execute the statement
    if ($stmt->execute()) {
        echo json_encode(array("success" => true));
    } else {
        echo json_encode(array("success" => false, "message" => "Error updating status."));
    }

    // Close statement
    $stmt->close();
} else {
    echo json_encode(array("success" => false, "message" => "Patient ID, date, time, or status is null or not set."));
}

// Close connection
$conn->close();
?>
