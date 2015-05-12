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

// Post cookie contents
$user = $_POST["username"];
$token = $_POST["token"];

$user = mysqli_real_escape_string($conn, $user);
$token = mysqli_real_escape_string($conn, $token);

// Check if index exists in table
$result = $conn->query("SELECT * FROM sessions WHERE users_username = '$user' AND token = '$token'");
$row = mysqli_fetch_row($result);

// Get avatar
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

if(empty($row[0])){
	// User does not get logged in
	echo "fail";
}else{
	// User gets logged in
	if(empty($rew[0])){
		echo "success";
	}else{
		echo "success,". $rew[0] . "." . $rew[1]; // Eks. "success,2.png"
	}
}
?>