<?php
// Include the database connection file
require 'dbh.php';

// File: downloadMedicalInfo.php
header('Content-Type: text/csv; charset=utf-8');
header('Content-Disposition: attachment; filename=medical_info.csv');

// Query to fetch patient medical information
$query = "SELECT pid, date, comp, comps, dname, did FROM treated_patients";
$result = $conn->query($query);

// Open PHP output stream
$output = fopen('php://output', 'w');

// Add column headers
fputcsv($output, ['Patient ID', 'Date', 'Complaint', 'Complaints List', 'Doctor Name', 'Doctor ID']);

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
