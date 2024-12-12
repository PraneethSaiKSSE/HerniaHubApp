<?php
header('Content-Type: application/json');

// Include the database connection
require 'dbh.php';

// Get patient ID from query parameter
$patid = isset($_GET['patid']) ? $_GET['patid'] : '';

if (empty($patid)) {
    echo json_encode(array('status' => 'error', 'error' => 'Patient ID is missing'));
    $conn->close();
    exit();
}

// Prepare SQL statement
$sql = "SELECT docid, cpic, lpic, rpic FROM reports WHERE patid = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $patid);
$stmt->execute();
$result = $stmt->get_result();

// Prepare response
$response = array();
if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $response['status'] = 'success';
    $response['data'] = $row;
} else {
    $response['status'] = 'error';
    $response['error'] = 'No reports found for this patient ID';
}

// Close connection
$stmt->close();
$conn->close();

// Return JSON response
echo json_encode($response);
?>
