<?php
// Include the database connection and base URL
require 'dbh.php';

// Check if registrationNumber is set
if (isset($_GET['registrationNumber'])) {
    // Retrieve registration number from the request URL
    $registrationNumber = $_GET['registrationNumber'];

    // Prepare SQL query to fetch image path from doctorlogin table
    $sql_image = "SELECT dpic FROM doctorlogin WHERE `Registration Number` = ?";
    $stmt = $conn->prepare($sql_image);

    if ($stmt) {
        $stmt->bind_param("s", $registrationNumber);
        $stmt->execute();
        $result_image = $stmt->get_result();

        $response = array();

        // Check if there is a result
        if ($result_image->num_rows > 0) {
            // Image path found, fetch it
            $row_image = $result_image->fetch_assoc();
            $imagePath = $row_image['dpic'];

            // Construct full image URL using base URL from dbh.php and appending the /uploads/ directory
            $fullImagePath = $baseUrl . "uploads/" . $imagePath;

            // Store the image URL in the response
            $response['success'] = true;
            $response['image'] = $fullImagePath;
        } else {
            // Image not found in the database
            $response['success'] = false;
            $response['message'] = 'No image found for the provided registration number';
        }

        $stmt->close();
    } else {
        // Error preparing the SQL query
        $response['success'] = false;
        $response['message'] = "Error preparing SQL query: " . $conn->error;
    }
} else {
    // Handle the case where registrationNumber is not provided
    $response['success'] = false;
    $response['message'] = 'Registration number not provided';
}

// Close connection
$conn->close();

// Return response as JSON
header('Content-Type: application/json');
echo json_encode($response);
?>
