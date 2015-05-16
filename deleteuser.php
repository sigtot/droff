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
$pass = $_POST["pass"];
$token = $_POST["token"];

$pass = mysqli_real_escape_string($conn, $pass);
$token = mysqli_real_escape_string($conn, $token);

// Get corresponding password for token
$result = $conn->query("SELECT users.password, users.username
	FROM users
	INNER JOIN sessions
	ON users.username = sessions.users_username
	WHERE sessions.token = '$token'");
$row = mysqli_fetch_row($result);

// Verify password matches
$passDB = $row[0];
$user = $row[1];

if (password_verify($pass, $passDB)) {
	// Password matches

	// Delete avatar
	$sql = "DELETE avatar FROM avatar 
	INNER JOIN users
	ON users.id = avatar.users_id
	WHERE users.username = '$user'";
	$result = $conn->query($sql);

	// Delete any current og polling games
	$sql = "DELETE games FROM games 
	INNER JOIN users
	ON users.id = games.users_id
	WHERE users.username = '$user'";
	$result = $conn->query($sql);

	// Delete all sessions
	$sql = "DELETE FROM sessions
	WHERE users_username = '$user'";
	$result = $conn->query($sql);

	// Finally, delete the user
	$sql = "DELETE FROM users
	WHERE username = '$user'";
	$result = $conn->query($sql);

	// Burde laget constraints :/

/*
	DELETE games FROM games 
	INNER JOIN users
	ON users.id = games.users_id
	WHERE users.username = '$user';

	DELETE FROM sessions
	WHERE token = '$token';

	DELETE FROM users
	WHERE username = '$user';";
*/
	echo "success";
} else {
	// Password is wrong
	echo "wrong";
}

?>