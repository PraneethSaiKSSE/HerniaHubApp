<?php
// Include the database connection file
include 'dbh.php';  // This replaces the connection code

// Get the JSON data from the request
$data = json_decode(file_get_contents("php://input"));

$user = $data->username;
$pass = $data->password;

// Query to check if the user exists in the database
$sql = "SELECT * FROM adminlogin WHERE user='$user' AND pass='$pass'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Credentials are correct
    echo json_encode(["success" => true, "message" => "Login Successful"]);
} else {
    // Credentials are incorrect
    echo json_encode(["success" => false, "message" => "Invalid username or password"]);
}

$conn->close();
?>
