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

$user = mysqli_real_escape_string($conn, $user);

// Start spill hvis vi finner en rad med vår gameid men ikke vårt navn
// Altså en annen spiller

// Denne sql spørringen velger brukernavn,
// lager en join for lik gameid,
// begrenser resultatet til kun de gameidene som er lik vår egen gameid,
// som igjen må hentes gjennom en join
$result = $conn->query("SELECT users.username,games.gameid
	FROM users
	INNER JOIN games
	ON games.users_id=users.id
	WHERE games.gameid = 
		(SELECT games.gameid 
		FROM games
		INNER JOIN users
		ON games.users_id=users.id
		WHERE users.username = '$user')
	AND users.username <> '$user'");
$row = mysqli_fetch_row($result);

if(empty($row[0])){
	// Keep polling
	// Update with new NOW()
	$sql = "UPDATE games
	SET thetime = NOW()
	INNER JOIN users
	ON users.id = games.users_id
	WHERE users.username = '$user'";
	$result = $conn->query($sql);

}else{
	echo "matched," . $row[1];
}

?>