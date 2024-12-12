<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Include the database connection file
include 'dbh.php';  // This replaces the manual database connection code

// Initialize response array
$response = array();

try {
    // Check if a specific registration number is requested
    if (isset($_GET['registration_number'])) {
        $registrationNumber = $_GET['registration_number'];

        // Fetch details for the specific registration number using a prepared statement to prevent SQL injection
        $query = "SELECT * FROM doctorlogin WHERE `Registration Number` = ?";
        $stmt = $conn->prepare($query);
        $stmt->bind_param("s", $registrationNumber);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result && $result->num_rows > 0) {
            // Fetch and return the details as JSON
            $row = $result->fetch_assoc();
            $response = $row;
        } else {
            throw new Exception("Registration details not found");
        }
    } else {
        // Fetch all registration numbers
        $query = "SELECT `Registration Number` FROM doctorlogin";
        $result = $conn->query($query);

        if ($result && $result->num_rows > 0) {
            // Fetch and store all registration numbers
            $registrationNumbers = array();
            while ($row = $result->fetch_assoc()) {
                $registrationNumbers[] = $row['Registration Number'];
            }
            $response = $registrationNumbers;
        } else {
            throw new Exception("No registration details found");
        }
    }
} catch (Exception $e) {
    // Handle exceptions
    $response['error'] = $e->getMessage();
}

// Close the database connection
$conn->close();

// Respond with JSON
echo json_encode($response);
?>
