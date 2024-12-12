<?php

// Include the database connection
include 'dbh.php';  // This includes the connection logic from dbh.php

// Check if username and password are provided
if (isset($_POST['username']) && isset($_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Prepare SQL statement to prevent SQL injection
    $stmt = $conn->prepare("SELECT * FROM patientlogin WHERE patid=? AND pass=?");
    $stmt->bind_param("ss", $username, $password);

    // Execute query
    $stmt->execute();
    
    // Store result
    $result = $stmt->get_result();

    // If the result has at least one row, login is successful
    if ($result->num_rows > 0) {
        echo json_encode(array("success" => true));
    } else {
        echo json_encode(array("success" => false, "message" => "Incorrect username or password."));
    }

    // Close prepared statement
    $stmt->close();
} else {
    // If username or password is not provided, return error
    echo json_encode(array("success" => false, "message" => "Username and password are required."));
}

// Close connection
$conn->close();
?>
