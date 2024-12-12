<?php
// Include the database connection file
require 'dbh.php';

// Set Content-Type header to application/json
header('Content-Type: application/json');

// Initialize response array
$response = array();

try {
    // Get patient ID from the query string
    $patientID = isset($_GET['patid']) ? trim($_GET['patid']) : null;

    if ($patientID) {
        // Prepare the SQL statement to prevent SQL injection
        $sql = "SELECT * FROM patientlogin WHERE patid = ?";
        $stmt = $conn->prepare($sql);
        
        if ($stmt === false) {
            throw new Exception('Prepare statement failed: ' . $conn->error);
        }

        // Bind the parameter and execute the statement
        $stmt->bind_param('i', $patientID);
        $stmt->execute();
        $result = $stmt->get_result(); // Get the result set

        if ($result->num_rows > 0) {
            // Fetch data as associative array
            $row = $result->fetch_assoc();
            echo json_encode($row);
        } else {
            http_response_code(404); // Set HTTP response code to 404
            echo json_encode(array('message' => 'Patient not found.'));
        }

        // Close the statement
        $stmt->close();
    } else {
        http_response_code(400); // Set HTTP response code to 400
        echo json_encode(array('message' => 'Missing patient ID.'));
    }
} catch (Exception $e) {
    http_response_code(500); // Set HTTP response code to 500
    echo json_encode(array('message' => 'Error fetching patient details: ' . $e->getMessage()));
}

// Close the database connection
$conn->close();
?>
