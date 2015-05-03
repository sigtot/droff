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

// Post cookie contents
$user = $_POST["user"];
$token = $_POST["token"];

$user = mysqli_real_escape_string($conn, $user);
$token = mysqli_real_escape_string($conn, $token);

// Fetch gamemode
$result = $conn->query("SELECT * FROM matchmaking WHERE sessions_token = '$token'");
$row = mysqli_fetch_row($result);

$gamemode = $row[0];

// Sjekk etter flere enn 2 spillere i matchmaking
$result = $conn->query("SELECT COUNT(*) FROM matchmaking WHERE gamemode = '$gamemode'");
$row = mysqli_fetch_row($result);

$amount = $row[0];

// Det finnes en annen bruker som søker
if($amount >= 2){
	// Fetch token til en tilfeldig partner
	$result = $conn->query("SELECT sessions_token, sessions_users_username
		FROM matchmaking 
		WHERE gamemode = '$gamemode' AND sessions_token <> '$token'
		ORDER BY RAND() 
		LIMIT 1");
	$row = mysqli_fetch_row($result);
	$partnertoken = $row[0];

	// Generer firebase key
	$firebasekey = "dummy";

	// Finn usernames
	$partneruser = 	$row[1];
	// Legg til deg og partneren i games

	// Vi vet ikke om denne sqlen går gjennom eller ikke
	// Hvis noen andre har lagt oss til i games tidligere,
	// skjer ingenting
	$sql = "INSERT INTO games VALUES ('$user', '$token', '$partneruser', '$partnertoken', '$firebasekey')";
	$result = $conn->query($sql);

	if(!$result){
		echo "no";
	}else{
		echo "yes";
	}
	
}

// Sjekk etter token i games

// Update timestamp

// Echo msg
?>