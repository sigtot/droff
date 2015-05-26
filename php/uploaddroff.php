<?php
$servername = "localhost";
$username = "siguojbt_admin";
$password = "vg44feffx58h19xm9r";
$dbname = "siguojbt_database1";

// Lag tilkobling
$conn = new mysqli($servername, $username, $password, $dbname);

// Sjekk tilkoblingen
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

// Henter raw POST data
$filteredData = substr($GLOBALS['HTTP_RAW_POST_DATA'], strpos($GLOBALS['HTTP_RAW_POST_DATA'], ",")+1);

// Dekoder base64
$decodedData = base64_decode($filteredData);

// Filnavn og location
$path = "../img/droffs/";
$code = md5(uniqid("blah", true));
$name = $code . ".png";
$file = $path . $name;

// Skriver filen
$fp = fopen( $file, 'wb' );
fwrite( $fp, $decodedData);
fclose( $fp );

echo $code;
?>