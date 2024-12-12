<?php
// Include the database connection file
include 'dbh.php';

// Get POST data
$data = json_decode(file_get_contents('php://input'), true); // Receive JSON data from React Native

// Ensure data is set and not null
$date = isset($data['date']) ? $data['date'] : null;
$time = isset($data['time']) ? $data['time'] : null;
$patid = isset($data['patid']) ? $data['patid'] : null;
$did = isset($data['did']) ? $data['did'] : null;

// Check if date, time, patid, and did are not null
if ($date && $time && $patid && $did) {
    // Prepare and bind
    $stmt = $conn->prepare("INSERT INTO appointments (date, time, patid, did, status) VALUES (?, ?, ?, ?, 'pending')");
    if ($stmt === false) {
        die("Prepare failed: " . $conn->error);
    }
    $stmt->bind_param("ssii", $date, $time, $patid, $did);

    // Execute the statement
    if ($stmt->execute()) {
        echo "Appointment Booked";
    } else {
        echo "Error: " . $stmt->error;
    }

    // Close statement
    $stmt->close();
} else {
    echo "Error: Date, time, patid, or did is null or not set.";
}

// Close connection
$conn->close();
?>
