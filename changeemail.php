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
$pass = $_POST["pass"];
$email = $_POST["email"];
$token = $_POST["token"];

$pass = mysqli_real_escape_string($conn, $pass);
$email = mysqli_real_escape_string($conn, $email);
$token = mysqli_real_escape_string($conn, $token);

// Get corresponding password for token
$result = $conn->query("SELECT users.password
	FROM users
	INNER JOIN sessions
	ON users.username = sessions.users_username
	WHERE sessions.token = '$token'");
$row = mysqli_fetch_row($result);

// Verify password matches
$passDB = $row[0];

// Check if email is unique
$result = $conn->query("SELECT email FROM users WHERE email = '$email'");
$row = mysqli_fetch_row($result);

if(empty($row[0])){
	$uniqueemail = true;
}else{
	$uniqueemail = false;
}

if (password_verify($pass, $passDB) && $uniqueemail == true) {
	// Password matches

	$sql = "UPDATE users 
	SET email = '$email'
	WHERE password = '$passDB'";
	$result = $conn->query($sql);
	echo "success";
} else {
	if($uniqueemail == false){
		// Email is taken
		echo "taken";
	}else{
		// Password is wrong
		echo "wrong";
	}
}

?>