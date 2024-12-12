<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Include the database connection file
require 'dbh.php';

// Initialize response array
$response = array();

try {
    // Check if the form was submitted
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Handle the image upload
        if (isset($_FILES['dpic']) && $_FILES['dpic']['error'] === UPLOAD_ERR_OK) {
            $tmp_name = $_FILES['dpic']['tmp_name'];
            $filename = basename($_FILES['dpic']['name']);
            $upload_dir = 'uploads/';
            
            // Ensure the uploads directory exists
            if (!is_dir($upload_dir)) {
                mkdir($upload_dir, 0777, true);
            }
            
            $destination = $upload_dir . $filename;

            // Move the uploaded file
            if (move_uploaded_file($tmp_name, $destination)) {
                $dpic = $filename;
            } else {
                $dpic = null;
            }
        } else {
            $dpic = null;
        }

        // Get the form data
        $name = $_POST['name'];
        $dob = $_POST['dob'];
        $age = $_POST['age'];
        $sex = $_POST['sex'];
        $qualification = $_POST['qualification'];
        $registrationNumber = $_POST['registrationNumber'];
        $email = $_POST['email'];
        $mobileNumber = $_POST['mobileNumber'];
        $homeAddress = $_POST['homeAddress'];
        $workplace = $_POST['workplace'];

        // Prepare SQL statement to insert data into the database
        $sql = "INSERT INTO doctorlogin (Name, DOB, Age, Sex, Qualification, `Registration Number`, `Email-Id`, `Mobile Number`, `Home Address`, Workplace, dpic) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
        
        // Prepare and execute the SQL statement
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("sssssssssss", $name, $dob, $age, $sex, $qualification, $registrationNumber, $email, $mobileNumber, $homeAddress, $workplace, $dpic);
        $stmt->execute();

        // Check if the insertion was successful
        if ($stmt->affected_rows > 0) {
            $response['status'] = "success";
            $response['message'] = "Registration successful!";
        } else {
            $response['status'] = "error";
            $response['message'] = "Failed to register user";
        }

        // Close the prepared statement
        $stmt->close();
    } else {
        // Handle the case where any required field is missing
        $response['status'] = "error";
        $response['message'] = "Invalid request data";
    }
} catch (Exception $e) {
    // Handle exceptions
    $response['status'] = "error";
    $response['message'] = "An error occurred: " . $e->getMessage();
}

// Close the database connection
$conn->close();

// Respond with JSON
echo json_encode($response);
?>
