<?php

// Include the database connection
require 'dbh.php';

// Get input data from request
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

// Ensure that both username and password are provided
if (isset($request->username) && isset($request->password)) {
  $username = $request->username;
  $password = $request->password;

  // Prepare SQL statement to fetch user from database
  $stmt = $conn->prepare("SELECT `Registration Number`, `pass` FROM `doctorlogin` WHERE `Registration Number` = ?");
  $stmt->bind_param("s", $username);
  $stmt->execute();
  $result = $stmt->get_result();

  // Check if user exists
  if ($result->num_rows == 1) {
    // Fetch hashed password from database
    $row = $result->fetch_assoc();
    $hashedPassword = $row['pass'];

    // Verify password
    if (password_verify($password, $hashedPassword)) {
      // Password is correct, return success response
      $response = array("success" => true);
    } else {
      // Password is incorrect
      $response = array("success" => false, "message" => "Incorrect password.");
    }
  } else {
    // User not found
    $response = array("success" => false, "message" => "User not found.");
  }
} else {
  // Missing username or password
  $response = array("success" => false, "message" => "Username or password not provided.");
}

// Return JSON response
header('Content-Type: application/json');
echo json_encode($response);

// Close database connection
$stmt->close();
$conn->close();

?>
