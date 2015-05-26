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

// Tabellen har ikke AUTO_INCREMENT
// Inkrementerer insteden i php

// Hent forige ID
$result = $conn->query("SELECT MAX(id) FROM users");
$row = mysqli_fetch_row($result);

// Post bruker credentials
$user = $_POST["username"];
$pass = $_POST["password"];
$email = $_POST["email"];
$newid = $row[0] + 1;

$user = mysqli_real_escape_string($conn, $user);
$pass = mysqli_real_escape_string($conn, $pass);
$email = mysqli_real_escape_string($conn, $email);

$result = $conn->query("SELECT * FROM users WHERE username = '$user'");
$row = mysqli_fetch_row($result);

$result = $conn->query("SELECT * FROM users WHERE email = '$email'");
$otherrow = mysqli_fetch_row($result);

if(empty($row[1])) {
	// Brukernavn er ikke registrert før
	$userTaken = false;
} else {
	$userTaken = true;
}

if(empty($otherrow[1])) {
	// Email er ikke registrert før
	$emailTaken = false;
} 	else {
	$emailTaken = true;
}

if($userTaken == false && $emailTaken == false){
	$options = [
		"cost" => 11,
	];

	$hash = password_hash($pass, PASSWORD_BCRYPT, $options);

	$sql = "INSERT INTO users VALUES ('$newid', '$user', '$hash', '$email')";
	$result = $conn->query($sql);
	echo "success";
}	elseif ($userTaken == false && $emailTaken == true){
	// Emailen er tatt
	echo "emailExists";
}	elseif ($userTaken == true && $emailTaken == false){
	// Brukernavnet et tatt
	echo "userExists";
}	elseif ($userTaken == true && $emailTaken == true){
	// Begge er tatt
	echo "bothExist";
}	else{
	// Error
	echo "fail";
}
?>