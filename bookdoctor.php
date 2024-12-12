<?php
header('Content-Type: application/json');

// Include the database connection file
include 'dbh.php';

// Fetch doctor details
$sql = "SELECT Name, `Registration Number`, Qualification, WorkPlace FROM doctorlogin";
$result = $conn->query($sql);

$doctors = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $doctors[] = $row;
    }
} else {
    echo json_encode([]);
}

// Close connection
$conn->close();

// Return the doctor details as JSON
echo json_encode($doctors);
?>
