<?php
header('Content-Type: application/json');

// Include the database connection file
require 'dbh.php';

// Prepare SQL query
$sql = "
    UPDATE doctorlogin 
    SET Name = ?, DOB = ?, Age = ?, Sex = ?, Qualification = ?, 
        `Email-Id` = ?, `Mobile Number` = ?, `Home Address` = ?, 
        WorkPlace = ?
    WHERE `Registration Number` = ?
";

$stmt = $conn->prepare($sql);
if (!$stmt) {
    echo json_encode(['success' => false, 'message' => 'Prepare failed: ' . $conn->error]);
    exit();
}

// Bind parameters
$stmt->bind_param(
    'ssssssssss',
    $_POST['Name'],
    $_POST['DOB'],
    $_POST['Age'],
    $_POST['Sex'],
    $_POST['Qualification'],
    $_POST['EmailId'],
    $_POST['MobileNumber'],
    $_POST['HomeAddress'],
    $_POST['WorkPlace'],
    $_POST['RegistrationNumber']
);

$result = $stmt->execute();
if ($result) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Execute failed: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
