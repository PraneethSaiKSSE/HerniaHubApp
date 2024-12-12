<?php
// Include the database connection and base URL
require 'dbh.php';

// Check if the 'patid' parameter is provided
if (isset($_GET['patid'])) {
    $patid = $_GET['patid'];

    // Prepare the SQL query to fetch consultation data for the given patient ID
    $stmt = $conn->prepare("SELECT * FROM consult_notes WHERE pid = ?");
    $stmt->bind_param("s", $patid);  // Bind the 'patid' parameter

    // Execute the statement
    $stmt->execute();

    // Get the result set
    $result = $stmt->get_result();

    // Check if there are any records
    if ($result->num_rows > 0) {
        // Fetch all records as an associative array
        $consultData = $result->fetch_all(MYSQLI_ASSOC);

        // Return the data as JSON
        echo json_encode([
            "status" => "success",
            "data" => $consultData
        ]);
    } else {
        // No records found
        echo json_encode([
            "status" => "error",
            "error" => "No records found"
        ]);
    }

    // Close the statement
    $stmt->close();
} else {
    // If the 'patid' parameter is not provided
    echo json_encode([
        "status" => "error",
        "error" => "No patient ID provided"
    ]);
}

// Close the database connection
$conn->close();
?>
