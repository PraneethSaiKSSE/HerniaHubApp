<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Include the database connection file
require 'dbh.php';

// Initialize response array
$response = array();

try {
    // Check if all required fields are set
    if (isset($_POST['patid']) && isset($_POST['docid']) &&
        isset($_FILES['cpic']) && isset($_FILES['lpic']) && isset($_FILES['rpic'])) {
        
        // Get the data from the form fields
        $patid = $_POST['patid'];
        $docid = $_POST['docid'];

        // Handle image uploads
        $imageDirectory = "reports_images/";
        if (!is_dir($imageDirectory)) {
            mkdir($imageDirectory, 0777, true);
        }

        $cpicFileName = uniqid() . "_cpic.jpeg";
        $lpicFileName = uniqid() . "_lpic.jpeg";
        $rpicFileName = uniqid() . "_rpic.jpeg";

        $cpicPath = $imageDirectory . $cpicFileName;
        $lpicPath = $imageDirectory . $lpicFileName;
        $rpicPath = $imageDirectory . $rpicFileName;

        // Move uploaded files to the server
        if (move_uploaded_file($_FILES['cpic']['tmp_name'], $cpicPath) &&
            move_uploaded_file($_FILES['lpic']['tmp_name'], $lpicPath) &&
            move_uploaded_file($_FILES['rpic']['tmp_name'], $rpicPath)) {
            
            // Prepare SQL statement to insert data into the database
            $sql = "INSERT INTO reports (patid, docid, cpic, lpic, rpic) VALUES (?, ?, ?, ?, ?)";

            // Prepare and execute the SQL statement
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sssss", $patid, $docid, $cpicFileName, $lpicFileName, $rpicFileName);
            $stmt->execute();

            // Check if the insertion was successful
            if ($stmt->affected_rows > 0) {
                $response['status'] = "success";
                $response['message'] = "Reports submitted successfully!";
            } else {
                $response['status'] = "error";
                $response['message'] = "Failed to submit reports";
            }

            // Close the prepared statement
            $stmt->close();
        } else {
            // Failed to save images
            $response['status'] = "error";
            $response['message'] = "Failed to save images";
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
}

// Close the database connection
$conn->close();

// Respond with JSON
echo json_encode($response);
?>
