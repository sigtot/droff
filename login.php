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
$user = $_POST["username"];
$pass = $_POST["password"];

$user = mysqli_real_escape_string($conn, $user);
$pass = mysqli_real_escape_string($conn, $pass);

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
    //echo "<script type='text/javascript'>alert('Welcome back " . $user . ".')</script>";
} else {
    echo 'fail';
    //echo "<script type='text/javascript'>alert('Invalid password or username')</script>";
}


/*echo "Connected successfully" . "<br>";
if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        echo $row["id"]. " - Name: " . $row["name"]. " - Length in seconds: " . $row["length"]. "<br>";
    }
} else {
    echo "0 results";
}*/
?>