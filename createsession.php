<?php
/*
Oppsett:
	
Når man logger inn eller signer opp sendes brukernavnet
fra login.php eller signup.php, via ajax, til denne filen.

Denne filen hasher 

*/

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
$user = $_POST["username"];
$user = mysqli_real_escape_string($conn, $user);

// Get row
$result = $conn->query("SELECT username FROM users WHERE username = '$user'");
$row = mysqli_fetch_row($result);
if (empty($row[0])){
	// User does not exist
	echo "fail";
}else{
	// User exists
	$result = $conn->query("SELECT username FROM sessions WHERE username = '$user'");
	$row = mysqli_fetch_row($result);
	if(empty($row[0])){
		// Session does not exist
		echo "success";

		// Rename cookie coloumn to hash coloumn or something
		// Generate and insert hash and username into table
		// Echo hash to javacript to add the cookie to the browser

	}else{
		// Session exists
		echo "session exists";
	}
}


?>