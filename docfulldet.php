<?php
// Connect to your database
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "hernia";

try {
  $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
  $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

  // Get doctor ID from the query string
  $doctorID = isset($_GET['RegistrationNumber']) ? trim($_GET['RegistrationNumber']) : null;

  if ($doctorID) {
    // Prepare the SQL statement to prevent SQL injection
    $sql = "SELECT * FROM doctorlogin WHERE `Registration Number` = :registrationNumber"; // Adjusted SQL statement
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':registrationNumber', $doctorID, PDO::PARAM_STR); // Adjusted parameter binding

    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC); // Fetch data as associative array

    if ($result) {
      // Encode data as JSON and remove any potential output before it
      ob_start(); // Start output buffering
      echo json_encode($result);
      $json = ob_get_clean(); // Get buffered output and clean buffer
      echo $json; // Send the encoded JSON data
    } else {
      echo json_encode(array('message' => 'Doctor not found.')); // No doctor found message
    }
  } else {
    echo json_encode(array('message' => 'Missing Doctor ID.')); // Missing ID message
  }
} catch(PDOException $e) {
  echo json_encode(array('message' => 'Error fetching doctor details: ' . $e->getMessage()));
}

$conn = null;
?>
