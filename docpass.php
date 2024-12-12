<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Include the database connection from dbh.php
require 'dbh.php';

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw POST data
    $postData = file_get_contents('php://input');
    // Decode the JSON data
    $request = json_decode($postData, true);

    try {
        // Check if registration number and plain text password are provided
        if (isset($request['registrationNumber']) && isset($request['password'])) {
            $registrationNumber = $request['registrationNumber'];
            $plainPassword = $request['password'];

            // Prepare SQL statement to update password
            $sql = "UPDATE doctorlogin SET pass = ? WHERE `Registration Number` = ?";
            
            // Initialize MySQLi statement
            if ($stmt = $conn->prepare($sql)) {
                // Bind parameters
                $stmt->bind_param("ss", $plainPassword, $registrationNumber);
                
                // Execute SQL statement
                $result = $stmt->execute();

                // Check if update was successful
                if ($result) {
                    $response = array('success' => true, 'message' => 'Password updated successfully.');
                } else {
                    $response = array('success' => false, 'message' => 'Update failed.');
                }

                // Close statement
                $stmt->close();
            } else {
                $response = array('success' => false, 'message' => 'Failed to prepare SQL statement.');
            }
        } else {
            $response = array('success' => false, 'message' => 'Missing parameters.');
        }

        // Encode response as JSON and send
        echo json_encode($response);
    } catch(Exception $e) {
        // Log error and send error response
        error_log('Error updating password: ' . $e->getMessage());
        $response = array('success' => false, 'message' => 'An error occurred while updating password.');
        echo json_encode($response);
    }

    // Close database connection
    $conn->close();
} else {
    // If request method is not POST, send error response
    $response = array('success' => false, 'message' => 'Invalid request method.');
    echo json_encode($response);
}
?>
