<?php
// Include the database connection file
require 'dbh.php';

// Function to fetch patient details by id
function getPatientDetails($connection, $patid) {
    // Sanitize input to prevent SQL injection
    $patid = mysqli_real_escape_string($connection, $patid);
    
    // Query to fetch patient details based on id
    $query = "SELECT * FROM patientlogin WHERE patid = '$patid'";
    $result = mysqli_query($connection, $query);
    
    if ($result) {
        if (mysqli_num_rows($result) > 0) {
            // Patient found, return details
            $patientDetails = mysqli_fetch_assoc($result);
            return $patientDetails;
        } else {
            // Patient not found
            return null;
        }
    } else {
        // Query error
        return null;
    }
}

// Get JSON data from POST request
$json_data = file_get_contents('php://input');

// Decode JSON data
$data = json_decode($json_data, true);

// Check if id is provided in the request
if (isset($data['patid'])) {
    $id = $data['patid'];
    
    // Fetch patient details
    $patientDetails = getPatientDetails($conn, $id);
    
    if ($patientDetails) {
        // Patient details found, return as JSON response
        echo json_encode(array("success" => true, "patientDetails" => $patientDetails));
    } else {
        // Patient not found with provided id
        echo json_encode(array("success" => false, "message" => "Patient not found"));
    }
} else {
    // id not provided in the request
    echo json_encode(array("success" => false, "message" => "Patient ID not provided"));
}

// Close connection
mysqli_close($conn);
?>
