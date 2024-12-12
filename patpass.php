<?php
// Include the database connection file
require 'dbh.php'; // Ensure the path is correct and points to your dbh.php file

// Query to fetch patient ids
$sql = "SELECT patid FROM patientlogin";
$result = $conn->query($sql);

// Initialize an array to store patient IDs
$patientIds = array();

if ($result->num_rows > 0) {
    // Fetch all rows and store in array
    while($row = $result->fetch_assoc()) {
        $patientIds[] = $row;
    }
}

// Output as JSON
echo json_encode($patientIds);

// Close connection (optional if dbh.php already closes it)
$conn->close();
?>
