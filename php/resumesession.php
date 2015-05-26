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

// Post brukernavn og token fra cookie
$user = $_POST["username"];
$token = $_POST["token"];

$user = mysqli_real_escape_string($conn, $user);
$token = mysqli_real_escape_string($conn, $token);

// Sjekk om denne sessino finnes
$result = $conn->query("SELECT * FROM sessions WHERE users_username = '$user' AND token = '$token'");
$row = mysqli_fetch_row($result);

// Hent avatar
$result = $conn->query("SELECT users_id, extension
	FROM avatar
	INNER JOIN users
	ON avatar.users_id=users.id
	WHERE users.id =  
		(SELECT users.id 
		FROM users
		INNER JOIN sessions
		ON users.username =sessions.users_username
		WHERE sessions.token = '$token')");
$rew = mysqli_fetch_row($result);

// Hent droffs
$result = $conn->query("SELECT image FROM droffs
INNER JOIN users
ON users.id = droffs.users_id
WHERE users.username = '$user'");

while ($ruw = mysqli_fetch_array($result, MYSQLI_NUM)) {
	$images .= implode("", $ruw) . ".";
}

$images = rtrim($images, ".");

if(empty($row[0])){
	// Bruker logges ikke inn
	echo "fail";
}else{
	// Bruker logges inn
	if(empty($rew[0])){
		echo "success";
	}else{
		echo "success,". $rew[0] . "." . $rew[1] . "," . $images;
	}
}
?>