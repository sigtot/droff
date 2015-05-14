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

// Post users credentials
$oldpass = $_POST["oldpass"];
$newpass = $_POST["newpass"];
$token = $_POST["token"];

$oldpass = mysqli_real_escape_string($conn, $oldpass);
$newpass = mysqli_real_escape_string($conn, $newpass);
$token = mysqli_real_escape_string($conn, $token);

// Get last ID
$result = $conn->query("SELECT * FROM users WHERE username = '$user' OR email = '$user'");
$row = mysqli_fetch_row($result);

$result = $conn->query("SELECT extension FROM avatar WHERE users_id = '$row[0]'");
$rew = mysqli_fetch_row($result);

// Verify password matches
$passDB = $row[2];

if (password_verify($pass, $passDB)) {
    if(empty($rew[0])){
        echo 'success,' . $row[1];
    }else{
        echo 'success,' . $row[1] . "," . $row[0] . "." . $rew[0]; // Eks. "success,sigtot,2.png"
    }
} else {
    echo 'fail';
}

?>