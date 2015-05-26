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

// Post token og code
$code = $_POST["code"];

$code = mysqli_real_escape_string($conn, $code);

// Slett tihørende rad
// Denne fremmednøkkelen har ON DELETE CASCADE constraint
$sql = "DELETE FROM droffs WHERE image = '$code'";
$result = $conn->query($sql);

echo "success";
?>