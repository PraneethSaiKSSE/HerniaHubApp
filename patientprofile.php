<?php
// Include the database connection file
require 'dbh.php';

// Check if the request method is POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get POST data
    $data = json_decode(file_get_contents("php://input"), true);

    if (empty($data['patient_id'])) {
        // Patient ID is required
        $response = array(
            'success' => false,
            'message' => 'Patient ID is required'
        );
        header('Content-Type: application/json');
        echo json_encode($response);
        exit(); // Stop further execution
    }

    $patient_id = $data['patient_id'];

    // Prepare and execute SQL query to fetch patient details
    $sql = "SELECT * FROM patientlogin WHERE patid = ?";
    $stmt = $conn->prepare($sql);

    if ($stmt) {
        $stmt->bind_param("i", $patient_id);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            // Fetch patient details
            $row = $result->fetch_assoc();
            $patientDetails = array(
                'patid' => $row['patid'],
                'name' => $row['name'],
                'age' => $row['age'],
                // Add more fields as needed
            );

            // Return patient details as JSON response
            $response = array(
                'success' => true,
                'patientDetails' => $patientDetails
            );
        } else {
            // Patient not found
            $response = array(
                'success' => false,
                'message' => 'Patient not found'
            );
        }

        $stmt->close();
    } else {
        // Error preparing the SQL statement
        $response = array(
            'success' => false,
            'message' => "Error preparing SQL query: " . $conn->error
        );
    }

    // Close connection
    $conn->close();

    // Return response as JSON
    header('Content-Type: application/json');
    echo json_encode($response);
}
?>
