<?php

// Include the database connection from dbh.php
require 'dbh.php';

// SQL query to fetch doctor registration numbers
$sql = "SELECT `Registration Number` FROM doctorlogin"; // Using backticks for column name with space

$result = $conn->query($sql);

$DoctorIDs = array();

if ($result->num_rows > 0) {
  // Output data of each row
  while($row = $result->fetch_assoc()) {
    $DoctorIDs[] = $row["Registration Number"];
  }
} else {
  echo json_encode(array("message" => "No Doctor IDs found"));
}

$conn->close();

// Encode IDs as JSON for secure transfer
echo json_encode(array("DoctorIDs" => $DoctorIDs));

?>
