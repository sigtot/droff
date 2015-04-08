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
$result = $conn->query("SELECT * FROM sessions WHERE username = '$user' AND token = '$token'");
$row = mysqli_fetch_row($result);

if(empty($row[0])){
	// User does not get logged in
	echo "fail";
}else{
	// User gets logged in
	echo "success";
}
?>