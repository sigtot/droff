<?php
$servername = "localhost";
$username = "siguojbt_admin";
$password = "vg44feffx58h19xm9r";
$dbname = "siguojbt_database1";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Post token from cookie
$token = $_POST["token"];
$token = mysqli_real_escape_string($conn, $token);

// Remove the corresponding session index to the user logging out
$sql = "DELETE FROM sessions WHERE token = '$token'";
$result = $conn->query($sql);

echo "smooth";

?>