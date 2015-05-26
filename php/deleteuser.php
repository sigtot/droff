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

// Post passord og token
$pass = $_POST["pass"];
$token = $_POST["token"];

$pass = mysqli_real_escape_string($conn, $pass);
$token = mysqli_real_escape_string($conn, $token);

// Hent tilhørende passord for token
$result = $conn->query("SELECT users.password, users.username
	FROM users
	INNER JOIN sessions
	ON users.username = sessions.users_username
	WHERE sessions.token = '$token'");
$row = mysqli_fetch_row($result);

// Sjekk at passord matcher
$passDB = $row[0];
$user = $row[1];

if (password_verify($pass, $passDB)) {
	// Passord matcher

	// Disse tabellene har ikke ON DELETE CASCADE constraint
	// Derfor må jeg slette alle rader for brukeren før jeg sletter brukeren

	// Slett avatar
	$sql = "DELETE avatar FROM avatar 
	INNER JOIN users
	ON users.id = avatar.users_id
	WHERE users.username = '$user'";
	$result = $conn->query($sql);

	// Slett eventuelle kjørene eller polling spill
	$sql = "DELETE games FROM games 
	INNER JOIN users
	ON users.id = games.users_id
	WHERE users.username = '$user'";
	$result = $conn->query($sql);

	// Slett alle sessions
	$sql = "DELETE FROM sessions
	WHERE users_username = '$user'";
	$result = $conn->query($sql);

	// Til slutt, slett brukeren
	$sql = "DELETE FROM users
	WHERE username = '$user'";
	$result = $conn->query($sql);

	// Burde laget constraints :/

	echo "success";
} else {
	// Passord er feil
	echo "wrong";
}
?>