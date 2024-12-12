<?php
// Include the database connection from dbh.php
require 'dbh.php';

// Function to fetch doctor details by registration number
function getDoctorDetails($connection, $registrationNumber) {
    // Sanitize input to prevent SQL injection
    $registrationNumber = mysqli_real_escape_string($connection, $registrationNumber);
    
    // Query to fetch doctor details based on registration number
    $query = "SELECT * FROM doctorlogin WHERE `Registration Number` = '$registrationNumber'";
    
    $result = mysqli_query($connection, $query);
    
    if (mysqli_num_rows($result) > 0) {
        // Doctor found, return details
        $doctorDetails = mysqli_fetch_assoc($result);
        return $doctorDetails;
    } else {
        // Doctor not found
        return null;
    }
}

// Get JSON data from POST request
$json_data = file_get_contents('php://input');

// Decode JSON data
$data = json_decode($json_data, true);

// Check if registration number is provided in the request
if (isset($data['registration_number'])) {
    $registrationNumber = $data['registration_number'];
    
    // Fetch doctor details
    $doctorDetails = getDoctorDetails($conn, $registrationNumber);  // $conn is initialized in dbh.php
    
    if ($doctorDetails) {
        // Doctor details found, return as JSON response
        echo json_encode(array("success" => true, "doctorDetails" => $doctorDetails));
    } else {
        // Doctor not found with provided registration number
        echo json_encode(array("success" => false, "message" => "Doctor not found"));
    }
} else {
    // Registration number not provided in the request
    echo json_encode(array("success" => false, "message" => "Registration number not provided"));
}

// Close connection
mysqli_close($conn);
?>
