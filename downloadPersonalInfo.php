<?php
// Include the database connection file
require 'dbh.php';

// File: downloadPersonalInfo.php
header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=personal_info.csv');

// Query to fetch patient personal information
$query = "SELECT patid, name, age, gender, address, mob, mail FROM patientlogin";
$result = $conn->query($query);

// Open PHP output stream
$output = fopen('php://output', 'w');

// Add column headers
fputcsv($output, ['Patient ID', 'Name', 'Age', 'Gender', 'Address', 'Mobile', 'Email']);

// Add rows
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        fputcsv($output, $row);
    }
}

// Close connection
$conn->close();
fclose($output);
exit;
?>
