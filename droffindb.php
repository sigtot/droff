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

// Post token og code
$code = $_POST["code"];
$token = $_POST["token"];

$code = mysqli_real_escape_string($conn, $code);
$token = mysqli_real_escape_string($conn, $token);

// Hent id med token
$result = $conn->query("SELECT users.id FROM sessions
INNER JOIN users
ON sessions.users_username = users.username 
WHERE sessions.token = '$token'");
$row = mysqli_fetch_row($result);

if (empty($row[0])){
	// Bruker finnes ikke
	echo "fail";
}else{
	// Bruker finnes

	// Putt bildeinfo i db
	$id = $row[0];
	$sql = "INSERT INTO droffs VALUES ('$id', '$code')";
	$result = $conn->query($sql);

	echo $id . " " . $code;;
}
?>