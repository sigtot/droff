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

// Post brukernavn og vennenavn
$user = $_POST["user"];
$friend = $_POST["friend"];

$user = mysqli_real_escape_string($conn, $user);
$friend = mysqli_real_escape_string($conn, $friend);

// Hent tilhørende id for brukernavn
$result = $conn->query("SELECT id FROM users WHERE username = '$user'");
$row = mysqli_fetch_row($result);
$userid = $row[0];

$result = $conn->query("SELECT id FROM users WHERE username = '$friend'");
$row = mysqli_fetch_row($result);
$friendid = $row[0];

// Sett inn i friends tabell
$sql = "INSERT INTO friends (users_id, friend_id) 
	VALUES ('$userid', '$friendid')";
$result = $conn->query($sql);

echo $user . $userid . " " . $friend . $friendid;

?>