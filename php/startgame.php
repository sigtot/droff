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

// Post variabler
$gamemode = $_POST["gamemode"]; // Denne variablen kan brukes om jeg vil utvide til flere gamemodes
$user = $_POST["user"];

$gamemode = mysqli_real_escape_string($conn, $gamemode);
$user = mysqli_real_escape_string($conn, $user);

// Henter bruker id
$result = $conn->query("SELECT id FROM users WHERE username = '$user'");
$row = mysqli_fetch_row($result);
$id = $row[0];

// Slett tidligere spill
$sql = "DELETE FROM games WHERE users_id = '$id'";
$result = $conn->query($sql);

// Sjekk etter søkere

// Index til en søkende bruker må være mindre enn 10 sek gammel
// Må ha unik id
$result = $conn->query("SELECT gameid, users_id
	FROM games
	WHERE thetime > DATE_SUB(NOW(), INTERVAL 10 SECOND)
	GROUP BY gameid
	HAVING COUNT(gameid) < 2
	ORDER BY RAND()
	LIMIT 1");
$row = mysqli_fetch_row($result);
$ledigid = $row[0];
$partnerid = $row[1];

if(empty($ledigid)){
	// Ingen søker

	// Lager ny gameid
	
	// Game id er random
	$newgameid = rand(10000,99999);

	// Lag ny rad i games med generert id
	$sql = "INSERT INTO games (gameid, users_id) VALUES ('$newgameid', '$id')";
	$result = $conn->query($sql);

	echo "poll";
}else{
	// Det er noen som søker

	// Hent navn og avatar
	$result = $conn->query("SELECT users.username, avatar.extension
	FROM users
	LEFT JOIN avatar
	ON users.id = avatar.users_id
	WHERE users.id = '$partnerid'");
	$row = mysqli_fetch_row($result);

	$partner = $row[0];
	$avatar = $partnerid . "." . $row[1]; // eks. 2.jpg

	// Lag ny rad i games med den ledige iden
	$sql = "INSERT INTO games (gameid, users_id) VALUES ('$ledigid', '$id')";
	$result = $conn->query($sql);
	echo "success," . $ledigid . "," . $partner . "," . $avatar;
}
?>