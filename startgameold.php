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
$token = $_POST["token"];
$gamemode = $_POST["gamemode"];
$user = $_POST["user"];

$token = mysqli_real_escape_string($conn, $token);
$gamemode = mysqli_real_escape_string($conn, $gamemode);
$user = mysqli_real_escape_string($conn, $user);

// Check if index exists in table
$result = $conn->query("SELECT * FROM matchmaking WHERE sessions_token = '$token'");
$row = mysqli_fetch_row($result);

if(empty($row[0])){
	// Session does not exist
	$sql = "INSERT INTO matchmaking VALUES ('$gamemode', '$user', '$token', NULL)";
	$result = $conn->query($sql);

	echo "success";
}else{
	// Session exists
	echo "fail";
}
?>