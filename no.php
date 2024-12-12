<?php
require 'dbh.php'; // Include the database connection

// Enable error reporting for debugging (remove in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $response = array();

    // Get the data from the POST request
    $pid = $_POST['pid']; // Patient ID
    $comp = $_POST['comp']; // Complaint
    $dname = $_POST['dname']; // Doctor Name

    // Check if an image was uploaded
    if (isset($_FILES['image']) && $_FILES['image']['error'] === UPLOAD_ERR_OK) {
        $image = $_FILES['image'];
        $uploadDir = 'uploads/'; // Directory to save the uploaded image
        $imageName = basename($image['name']);
        $uploadFilePath = $uploadDir . $imageName;

        // Ensure the upload directory exists
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        // Move the uploaded image to the uploads directory
        if (move_uploaded_file($image['tmp_name'], $uploadFilePath)) {
            // Insert the data into the database
            $sql = "INSERT INTO not_treated (pid, comp, dname, pic) VALUES (?, ?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param('ssss', $pid, $comp, $dname, $imageName);

            if ($stmt->execute()) {
                $response['status'] = 'success';
                $response['message'] = 'Report uploaded successfully';
            } else {
                $response['status'] = 'error';
                $response['message'] = 'Failed to insert data into the database';
            }

            $stmt->close();
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Failed to move the uploaded image. Error: ' . error_get_last()['message'];
        }
    } else {
        $response['status'] = 'error';
        $response['message'] = 'No image uploaded or there was an error uploading the image. Error: ' . $_FILES['image']['error'];
    }

    // Send the response back to the client
    echo json_encode($response);
}

$conn->close();
?>
