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

// Post file
$file = $_POST["file"];
$token = $_POST["token"];

$token = mysqli_real_escape_string($conn, $token);
$file = mysqli_real_escape_string($conn, $file);

// Get corresponding id for token
$result = $conn->query("SELECT id 
	FROM users
	INNER JOIN sessions
	ON users.username = sessions.users_username
	WHERE token = '$token'
	LIMIT 1;");
$row = mysqli_fetch_row($result);
$id = $row[0];

$target_dir = "img/avatar/";
//$target_file = $target_dir . basename($_FILES[$file]);
//$target_file = pathinfo('$target_file')["filename"], "\n";

$path_parts = pathinfo($file);
echo $path_parts['filename'], "\n";

$sql = "INSERT INTO avatar (avatar, users_id) 
	VALUES ('$target_file', '$id') 
	ON DUPLICATE KEY 
	UPDATE avatar = VALUES (avatar)";
$result = $conn->query($sql);

// echo $file_to_upload;

// You have to get the filename in JS

?>