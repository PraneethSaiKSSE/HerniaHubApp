<?php
header('Content-Type: application/json');

// Include the database connection file
require 'dbh.php';

if (isset($_GET['RegistrationNumber'])) {
    $registrationNumber = $_GET['RegistrationNumber'];

    // Use backticks around the column name to handle spaces
    $sql = "SELECT * FROM doctorlogin WHERE `Registration Number` = ?";
    $stmt = $conn->prepare($sql);
    
    if ($stmt) {
        $stmt->bind_param("s", $registrationNumber);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            echo json_encode($row);
        } else {
            echo json_encode(["error" => "No doctor found with this Registration Number"]);
        }

        $stmt->close();
    } else {
        echo json_encode(["error" => "Failed to prepare statement"]);
    }
} else {
    echo json_encode(["error" => "RegistrationNumber parameter is required"]);
}

$conn->close();
?>
