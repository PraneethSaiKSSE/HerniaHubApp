<?php
include 'dbh.php'; // Include your database connection

// Fetching POST data
$data = json_decode(file_get_contents("php://input"), true);

$patid = $data['patid'];
$name = $data['name'];
$address = $data['address'];
$mob = $data['mob'];
$mail = $data['mail'];

// Prepare the SQL query to update the patient profile
$stmt = $conn->prepare("UPDATE patientlogin SET name = ?, address = ?, mob = ?, mail = ? WHERE patid = ?");
$stmt->bind_param("ssssi", $name, $address, $mob, $mail, $patid);

if ($stmt->execute()) {
    echo json_encode(["success" => true, "message" => "Profile updated successfully."]);
} else {
    echo json_encode(["success" => false, "message" => "Error updating profile."]);
}

$stmt->close();
$conn->close();
?>
