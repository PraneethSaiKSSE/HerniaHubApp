<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json');

// Include the database connection
include 'dbh.php';  // This includes the connection logic from dbh.php

// Initialize response array
$response = array();

try {
    // Check if all required fields are set
    if (isset($_POST['pid']) && isset($_POST['date']) && isset($_POST['comp']) &&
        isset($_POST['comps']) && isset($_POST['dname']) && isset($_POST['did']) &&
        isset($_FILES['pic'])) {
        
        // Get the data from the form fields
        $pid = $_POST['pid'];
        $date = $_POST['date'];
        $comp = $_POST['comp'];
        $comps = $_POST['comps'];
        $dname = $_POST['dname'];
        $did = $_POST['did'];

        // Handle image upload
        $imageDirectory = "uploaded_images/";
        if (!is_dir($imageDirectory)) {
            mkdir($imageDirectory, 0777, true);
        }

        $picFileName = uniqid() . "_pic.jpeg";
        $picPath = $imageDirectory . $picFileName;

        // Move uploaded file to the server
        if (move_uploaded_file($_FILES['pic']['tmp_name'], $picPath)) {
            
            // Prepare SQL statement to insert data into the database
            $sql = "INSERT INTO treated_patients (pid, date, comp, comps, pic, dname, did) VALUES (?, ?, ?, ?, ?, ?, ?)";

            // Prepare and execute the SQL statement
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("sssssss", $pid, $date, $comp, $comps, $picFileName, $dname, $did);
            $stmt->execute();

            // Check if the insertion was successful
            if ($stmt->affected_rows > 0) {
                $response['status'] = "success";
                $response['message'] = "Form submitted successfully!";
            } else {
                $response['status'] = "error";
                $response['message'] = "Failed to submit form";
            }

            // Close the prepared statement
            $stmt->close();
        } else {
            // Failed to save image
            $response['status'] = "error";
            $response['message'] = "Failed to save image";
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
