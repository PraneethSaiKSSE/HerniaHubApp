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
    // Check if all required fields are set
    if (isset($_POST['patid']) && isset($_FILES['file'])) {
        // Get the patient id
        $patid = $_POST['patid'];

        // Handle image upload
        $imageDirectory = "demo/images/";
        $imageFileName = uniqid() . ".jpeg"; // Generate a unique file name for the image
        $imagePath = $imageDirectory . $imageFileName;

        if (move_uploaded_file($_FILES['file']['tmp_name'], $imagePath)) {
            // Prepare SQL statement to update the image in the database
            $sql = "UPDATE patientlogin SET image = ? WHERE patid = ?";

            // Prepare and execute the SQL statement
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("si", $imageFileName, $patid);
            $stmt->execute();

            // Check if the update was successful
            if ($stmt->affected_rows > 0) {
                $response['status'] = "success";
                $response['message'] = "Image updated successfully!";
            } else {
                $response['status'] = "error";
                $response['message'] = "Failed to update image or no changes made.";
            }

            // Close the prepared statement
            $stmt->close();
        } else {
            // Failed to save image
            $response['status'] = "error";
            $response['message'] = "Failed to save image";
            error_log("Failed to move uploaded file: " . $_FILES['file']['error']);
        }
    } else {
        // Handle the case where any required field is missing
        $response['status'] = "error";
        $response['message'] = "Missing required fields";
    }
} catch (Exception $e) {
    // Handle exceptions
    $response['status'] = "error";
    $response['message'] = "An error occurred: " . $e->getMessage();
    error_log("Exception occurred: " . $e->getMessage());
}

// Close the database connection
$conn->close();

// Respond with JSON
echo json_encode($response);
?>
