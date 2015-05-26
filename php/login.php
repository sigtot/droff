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

// Post brukernavn og passord
$user = $_POST["username"];
$pass = $_POST["password"];

$user = mysqli_real_escape_string($conn, $user);
$pass = mysqli_real_escape_string($conn, $pass);

// Tabellen har ikke AUTO_INCREMENT
// Inkrementerer i php i steden

// Hent forige ID
$result = $conn->query("SELECT * FROM users WHERE username = '$user' OR email = '$user'");
$row = mysqli_fetch_row($result);

$result = $conn->query("SELECT extension FROM avatar WHERE users_id = '$row[0]'");
$rew = mysqli_fetch_row($result);

// Sjekk at passord matcher
$passDB = $row[2];

// Hent droffs
$result = $conn->query("SELECT image FROM droffs
INNER JOIN users
ON users.id = droffs.users_id
WHERE users.username = '$user'");

while ($ruw = mysqli_fetch_array($result, MYSQLI_NUM)) {
    $images .= implode("", $ruw) . ".";
}

$images = rtrim($images, ".");

if (password_verify($pass, $passDB)) {
    if(empty($rew[0])){
        echo 'success,' . $row[1];
    }else{
        echo 'success,' . $row[1] . "," . $row[0] . "." . $rew[0] . "," . $images;
    }
} else {
    echo 'fail';
}
?>