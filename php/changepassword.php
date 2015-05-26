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

// Post users credentials
$oldpass = $_POST["oldpass"];
$newpass = $_POST["newpass"];
$token = $_POST["token"];

$oldpass = mysqli_real_escape_string($conn, $oldpass);
$newpass = mysqli_real_escape_string($conn, $newpass);
$token = mysqli_real_escape_string($conn, $token);

// Hent tilhørende passord for token
$result = $conn->query("SELECT users.password
	FROM users
	INNER JOIN sessions
	ON users.username = sessions.users_username
	WHERE sessions.token = '$token'");
$row = mysqli_fetch_row($result);

$passDB = $row[0];

// Sjekk at passord matcher
if (password_verify($oldpass, $passDB)) {
	// Passord matcher
	$options = [
		"cost" => 11,
	];

	$hash = password_hash($newpass, PASSWORD_BCRYPT, $options);

	$sql = "UPDATE users 
	SET password = '$hash'
	WHERE password = '$passDB'
	";
	$result = $conn->query($sql);
	echo "success";
} else {
	// Passord er feil
	echo "wrong";
}

?>