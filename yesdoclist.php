<?php
// Include the database connection file
require 'dbh.php';

// Prepare and execute SQL query
$sql = "SELECT Name, `Registration Number` FROM doctorlogin";
$result = $conn->query($sql);

$doctors = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $doctors[] = $row;
    }
} else {
    // Return an empty array if no results are found
    $doctors = [];
}

// Close connection
$conn->close();

// Set content type to JSON and output the result
header('Content-Type: application/json');
echo json_encode($doctors);
?>
