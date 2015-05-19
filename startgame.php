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

// Post variables
$gamemode = $_POST["gamemode"];
$user = $_POST["user"];

$gamemode = mysqli_real_escape_string($conn, $gamemode);
$user = mysqli_real_escape_string($conn, $user);

// Henter bruker id
$result = $conn->query("SELECT id FROM users WHERE username = '$user'");
$row = mysqli_fetch_row($result);
$id = $row[0];

// Check if index exists in table
$result = $conn->query("SELECT gameid
	FROM games
	WHERE thetime > DATE_SUB(NOW(), INTERVAL 10 SECOND)
	GROUP BY gameid
	HAVING COUNT(gameid) < 2
	ORDER BY RAND()
	LIMIT 1");
$row = mysqli_fetch_row($result);
$ledigid = $row[0];

if(empty($ledigid)){
	// ingen søker

	// Lager ny gameid
	
	// Game id inkrementerer
	//$result = $conn->query("SELECT MAX(gameid) FROM games");
	//$row = mysqli_fetch_row($result);
	//$newgameid = $row[0] + 1;

	// Game id er random
	$newgameid = rand(10000,99999);

	// Lag ny rad i games med generert id
	$sql = "INSERT INTO games (gameid, users_id) VALUES ('$newgameid', '$id')";
	$result = $conn->query($sql);

	echo "poll";
}else{
	// Det er noen som søker

	// Lag ny rad i games med den ledige iden
	$sql = "INSERT INTO games (gameid, users_id) VALUES ('$ledigid', '$id')";
	$result = $conn->query($sql);
	echo "success," . $ledigid;
}
?>