<?php
require 'dbh.php'; // Include the database connection

header('Content-Type: application/json');

// Prepare and execute SQL query to fetch all patients
$sql = "SELECT patid, name, image FROM patientlogin";
$result = $conn->query($sql);

$patients = array();
while ($row = $result->fetch_assoc()) {
    $patients[] = $row;
}

// Return patients data as JSON
echo json_encode($patients);

$conn->close();
?>
