<?php
// Include the database connection from dbh.php
require 'dbh.php';

// Fetching POST data
$patientId = $_POST['patientId'];
$pass = $_POST['pass'];
$cpass = $_POST['cpass'];

// Validate that passwords match
if ($pass === $cpass) {
    // Prepare the SQL query to update the password
    $stmt = $conn->prepare("UPDATE patientlogin SET pass = ?, cpass = ? WHERE patid = ?");
    $stmt->bind_param("ssi", $pass, $cpass, $patientId);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Password updated successfully."]);
    } else {
        echo json_encode(["success" => false, "message" => "Error updating password."]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Passwords do not match."]);
}

// Close the database connection
$conn->close();
?>
