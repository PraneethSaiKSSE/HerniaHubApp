<?php
header('Content-Type: application/json');

// Include the database connection
require 'dbh.php';

// Get parameters from query
$patid = isset($_GET['patid']) ? $_GET['patid'] : '';
$status = isset($_GET['status']) ? $_GET['status'] : '';

if (empty($patid) || empty($status)) {
    echo json_encode(array('success' => false, 'error' => 'Missing parameters'));
    $conn->close();
    exit();
}

// Prepare SQL statement
$sql = "SELECT date, time, did FROM appointments WHERE status = ? AND patid = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("ss", $status, $patid);
$stmt->execute();
$result = $stmt->get_result();

// Fetch appointments
$appointments = array();
while ($row = $result->fetch_assoc()) {
    $appointments[] = $row;
}

// Prepare response
$response = array('success' => true, 'data' => $appointments);
echo json_encode($response);

// Close statement and connection
$stmt->close();
$conn->close();
?>
