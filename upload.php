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

$token = $_POST["token"];
$extension = $_POST["extension"];

$token = mysqli_real_escape_string($conn, $token);
$extension = mysqli_real_escape_string($conn, $extension);

if($extension == "PNG" || $extension == "JPG" || $extension == "JPEG" || $extension == "GIF" || $extension == "png" || $extension == "jpg" || $extension == "jpeg" || $extension == "gif"){
	$rightType = true;
}else{
	$rightType = false;
	echo "wrong";
}

$size = filesize($_FILES['file']['tmp_name']);

if($size < 5000000){
	$rightSize = true;
}else{
	$rightSize = false;
	echo "large";
}

if($rightType && $rightSize){
	// Get corresponding id for token
	$result = $conn->query("SELECT id 
		FROM users
		INNER JOIN sessions
		ON users.username = sessions.users_username
		WHERE token = '$token'
		LIMIT 1");
	$row = mysqli_fetch_row($result);
	$id = $row[0];

	if ( 0 < $_FILES['file']['error'] ) {
	    echo 'Error: ' . $_FILES['file']['error'] . '<br>';
	}else{
	    move_uploaded_file($_FILES['file']['tmp_name'], 'img/avatar/' . $id . "." . $extension);
	}

	// Send image info to database - alternatively at another time?
	$sql = "INSERT INTO extension (extension, users_id) 
		VALUES ('$extension', '$id') 
		ON DUPLICATE KEY 
		UPDATE extension = VALUES (extension)";
	$result = $conn->query($sql);

	echo 'img/avatar/' . $id . "." . $extension;
}


// Post file
/*$formdata = $_POST["formdata"];
$formdata = mysqli_real_escape_string($conn, $formdata);
echo $formdata;*/

/*$file = $_POST["file"];
$token = $_POST["token"];
$name = $_POST["name"];

$file = mysqli_real_escape_string($conn, $file);
$token = mysqli_real_escape_string($conn, $token);
$name = mysqli_real_escape_string($conn, $name);

$target_dir = "img/avatar/";
$target_file = basename($_FILES[$file]);
//$target_file = pathinfo('$target_file')["filename"], "\n";

echo $name;*/

// echo $file_to_upload;

// You have to get the filename in JS

?>