<?php
// Include the database connection file
require 'dbh.php';

// Debug: Check received parameters
error_log("Received parameters: " . print_r($_GET, true));

// Check if patid is set
if (isset($_GET['patid'])) {
    // Retrieve patid from the request URL
    $patid = $_GET['patid'];

    // Prepare SQL query to fetch image path from patientlogin table
    $sql_image = "SELECT image FROM patientlogin WHERE patid = ?";
    $stmt = $conn->prepare($sql_image);

    if ($stmt) {
        $stmt->bind_param("s", $patid);
        $stmt->execute();
        $result_image = $stmt->get_result();

        $response = array();

        // Check if there is a result
        if ($result_image->num_rows > 0) {
            // Image path found, fetch it
            $row_image = $result_image->fetch_assoc();
            $imagePath = $row_image['image'];

            // Log the retrieved image path
            error_log("Retrieved image path: " . $imagePath);

            // Construct full image URL using baseUrl from dbh.php and append 'images/' directory
            $fullImagePath = $baseUrl . 'images/' . $imagePath;

            // Store the image URL in the response
            $response['success'] = true;
            $response['image'] = $fullImagePath;

            // Log the image URL
            error_log("Full image URL: " . $fullImagePath);
        } else {
            // Image not found in the database
            $response['success'] = false;
            $response['message'] = 'No image found for the provided ID';
        }

        $stmt->close();
    } else {
        // Error preparing the SQL query
        $response['success'] = false;
        $response['message'] = "Error preparing SQL query: " . $conn->error;
    }
} else {
    // Handle the case where patid is not provided
    $response['success'] = false;
    $response['message'] = 'ID not provided';
}

// Close connection
$conn->close();

// Return response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
