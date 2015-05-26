<?php
$servername = "localhost";
$username = "siguojbt_admin";
$password = "vg44feffx58h19xm9r";
$dbname = "siguojbt_database1";

// Lag tilkobling
$conn = new mysqli($servername, $username, $password, $dbname);

// Sjekk tilkobling
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

// Post token fra cookie
$token = $_POST["token"];
$token = mysqli_real_escape_string($conn, $token);

// Slett tilhørende rad i session til token
$sql = "DELETE FROM sessions WHERE token = '$token'";
$result = $conn->query($sql);

echo "smooth";

?>