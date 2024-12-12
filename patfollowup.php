<?php
require 'dbh.php'; // Include the database connection

header('Content-Type: application/json');

// Prepare and execute SQL query to fetch all patient details
$sql = "SELECT name, patid, mob, image FROM patientlogin";
$result = $conn->query($sql);

$patients = [];

// Check if there are any rows returned
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $patients[] = $row;
    }
}

// Return patient details as JSON
echo json_encode($patients);

$conn->close();
?>
