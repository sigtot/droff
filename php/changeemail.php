<?php
$servername = "localhost";
$username = "siguojbt_admin";
$password = "vg44feffx58h19xm9r";
$dbname = "siguojbt_database1";

// Lag tilkobling
$conn = new mysqli($servername, $username, $password, $dbname);

// Test tilkoblingen
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

// Hent tilhørende passord for token
$result = $conn->query("SELECT users.password
	FROM users
	INNER JOIN sessions
	ON users.username = sessions.users_username
	WHERE sessions.token = '$token'");
$row = mysqli_fetch_row($result);

$passDB = $row[0];

// Sjekk om email er unik
$result = $conn->query("SELECT email FROM users WHERE email = '$email'");
$row = mysqli_fetch_row($result);

if(empty($row[0])){
	$uniqueemail = true;
}else{
	$uniqueemail = false;
}

// Sjekk om passord matcher
if (password_verify($pass, $passDB) && $uniqueemail == true) {
	// Passord matcher

	$sql = "UPDATE users 
	SET email = '$email'
	WHERE password = '$passDB'";
	$result = $conn->query($sql);
	echo "success";
} else {
	if($uniqueemail == false){
		// Email er tatt
		echo "taken";
	}else{
		// Password er feil
		echo "wrong";
	}
}

?>