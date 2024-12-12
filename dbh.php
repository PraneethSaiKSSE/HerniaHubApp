<?php
$host = "localhost"; 
$username = "root"; 
$password = "";  
$dbname = "hernia";

// Create connection using MySQLi
$conn = new mysqli($host, $username, $password, $dbname);
$baseUrl = "http://192.168.43.82/herniaapp/";

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
