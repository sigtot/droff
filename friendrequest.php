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
$user = $_POST["user"];
$friend = $_POST["friend"];

$user = mysqli_real_escape_string($conn, $user);
$friend = mysqli_real_escape_string($conn, $friend);

// Get corresponding ids to usernames
$result = $conn->query("SELECT id FROM users WHERE username = '$user'");
$row = mysqli_fetch_row($result);
$userid = $row[0];

$result = $conn->query("SELECT id FROM users WHERE username = '$friend'");
$row = mysqli_fetch_row($result);
$friendid = $row[0];

$sql = "INSERT INTO friends (users_id, friend_id) 
	VALUES ('$userid', '$friendid')";
$result = $conn->query($sql);

echo $user . $userid . " " . $friend . $friendid;

?>