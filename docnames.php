<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *'); // Allow access from all origins, adjust as needed

// Include the database connection
require 'dbh.php';

// Update SQL query to select both Name and Registration Number
$sql = "SELECT Name, `Registration Number` FROM doctorlogin";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $doctors = [];
    while ($row = $result->fetch_assoc()) {
        $doctors[] = [
            'label' => $row['Name'],
            'value' => $row['Registration Number']
        ];
    }
    echo json_encode($doctors);
} else {
    echo json_encode([]);
}

$conn->close();
?>
