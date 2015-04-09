<?php
$servername = "localhost";
$username = "siguojbt_admin";
$password = "vg44feffx58h19xm9r";
$dbname = "siguojbt_database1";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection - does nothing at the moment, i think
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Post users credentials
$user = $_POST["username"];
$user = mysqli_real_escape_string($conn, $user);

// Get row
$result = $conn->query("SELECT username FROM users WHERE username = '$user' OR email = '$user'");
$row = mysqli_fetch_row($result);
if (empty($row[0])){
	// User does not exist
	echo "fail";
}else{
	// User exists
	$token = md5(uniqid($user, true));

	$sql = "INSERT INTO sessions VALUES ('$user', '$token')";
	$result = $conn->query($sql);

	echo "success," . $token;
}
?>