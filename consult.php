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
    // Get JSON data from the request
    $data = json_decode(file_get_contents("php://input"), true);

    // Check if all required fields are present
    if (
        isset($data['reg']) && isset($data['name']) && isset($data['pid']) &&
        isset($data['poday']) && isset($data['genexm']) && isset($data['bp']) &&
        isset($data['pulse']) && isset($data['temp']) && isset($data['rr']) &&
        isset($data['spo2']) && isset($data['drain']) && isset($data['inpout']) &&
        isset($data['pallor']) && isset($data['clublym']) && isset($data['pa']) &&
        isset($data['rs']) && isset($data['cvs']) && isset($data['cns']) &&
        isset($data['locexm']) && isset($data['diag']) && isset($data['abx']) &&
        isset($data['spi_h2']) && isset($data['analg']) && isset($data['antipy']) &&
        isset($data['stool']) && isset($data['local']) && isset($data['thyroid']) &&
        isset($data['invest']) && isset($data['advice']) && isset($data['regnum'])
    ) {
        // Extract data from the request
        $reg = $data['reg'];
        $name = $data['name'];
        $pid = $data['pid'];
        $poday = $data['poday'];
        $genexm = $data['genexm'];
        $bp = $data['bp'];
        $pulse = $data['pulse'];
        $temp = $data['temp'];
        $rr = $data['rr'];
        $spo2 = $data['spo2'];
        $drain = $data['drain'];
        $inpout = $data['inpout'];
        $pallor = $data['pallor'];
        $clublym = $data['clublym'];
        $pa = $data['pa'];
        $rs = $data['rs'];
        $cvs = $data['cvs'];
        $cns = $data['cns'];
        $locexm = $data['locexm'];
        $diag = $data['diag'];
        $abx = $data['abx'];
        $spi_h2 = $data['spi_h2'];
        $analg = $data['analg'];
        $antipy = $data['antipy'];
        $stool = $data['stool'];
        $local = $data['local'];
        $thyroid = $data['thyroid'];
        $invest = $data['invest'];
        $advice = $data['advice'];
        $regnum = $data['regnum'];

        // Prepare SQL statement to prevent SQL injection
        $stmt = $conn->prepare(
            "INSERT INTO consult_notes (
                reg, name, pid, poday, genexm, bp, pulse, temp, rr, spo2, drain, inpout, pallor, clublym, pa, rs, cvs, cns, locexm, diag, abx, spi_h2, analg, antipy, stool, local, thyroid, invest, advice, regnum
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
        );
        $stmt->bind_param(
            "ssssssssssssssssssssssssss",
            $reg, $name, $pid, $poday, $genexm, $bp, $pulse, $temp, $rr, $spo2, $drain, $inpout, $pallor, $clublym, $pa, $rs, $cvs, $cns, $locexm, $diag, $abx, $spi_h2, $analg, $antipy, $stool, $local, $thyroid, $invest, $advice, $regnum
        );

        // Execute the query
        if ($stmt->execute()) {
            $response['status'] = "success";
            $response['message'] = "Data inserted successfully.";
        } else {
            $response['status'] = "error";
            $response['message'] = "Failed to insert data: " . $stmt->error;
        }

        // Close the prepared statement
        $stmt->close();
    } else {
        // Handle the case where any required field is missing
        $response['status'] = "error";
        $response['message'] = "Missing required fields.";
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
