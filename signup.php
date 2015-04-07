<?php
$servername = "localhost";
$username = "siguojbt_admin";
$password = "vg44feffx58h19xm9r";
$dbname = "siguojbt_database1";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Get last ID
$result = $conn->query("SELECT MAX(id) FROM users");
$row = mysqli_fetch_row($result);

// Check connection - does nothing at the moment, i think
if ($conn->connect_error) {
    die("Could not establish a connection to the database" . $conn->connect_error);
}

// Post users credentials
$user = $_POST["username"];
$pass = $_POST["password"];
$email = $_POST["email"];
$newid = $row[0] + 1;

$user = mysqli_real_escape_string($conn, $user);
$pass = mysqli_real_escape_string($conn, $pass);
$email = mysqli_real_escape_string($conn, $email);

$result = $conn->query("SELECT * FROM users WHERE username = '$user' OR email = '$email'");
$row = mysqli_fetch_row($result);

if(empty($row[1])) {
	// Hverken brukernavn eller email er registrert før
	$options = [
		"cost" => 11,
	];

	$hash = password_hash($pass, PASSWORD_BCRYPT, $options);

	$sql = "INSERT INTO users VALUES ('$newid', '$user', '$hash', '$email')";
	$result = $conn->query($sql);
	echo "success";
} elseif ($user == $row[1] && $email != $row[3]){
	// Brukernavnet et tatt
	echo "userExists";
} elseif ($email == $row[3] && $user != $row[1]){
	// Emailen er tatt
	echo "emailExists";
} elseif ($user == $row[1] && $email == $row[3]){
	// Begge er tatt
	echo "bothExist";
} else {
	// Error
	echo "fail";
}
/*if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo $row["id"]. " - Name: " . $row["name"]. " - Length in seconds: " . $row["length"]. "<br>";
    }
} else {
    echo "0 results";
}*/
?>