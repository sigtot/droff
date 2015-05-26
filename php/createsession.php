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

// Post brukernavn
$user = $_POST["username"];
$user = mysqli_real_escape_string($conn, $user);

// Hent rad
$result = $conn->query("SELECT username FROM users WHERE username = '$user' OR email = '$user'");
$row = mysqli_fetch_row($result);
if (empty($row[0])){
	// Bruker finnes ikke
	echo "fail";
}else{
	// Bruker finnes
	$token = md5(uniqid($user, true));

	$sql = "INSERT INTO sessions VALUES ('$user', '$token')";
	$result = $conn->query($sql);

	echo "success," . $token;
}
?>