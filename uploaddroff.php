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

// Post image and token
/*$token = $_POST["token"];
$img = $_POST["img"];

$token = mysqli_real_escape_string($conn, $token);
$img = mysqli_real_escape_string($conn, $img);*/

// Vi bruker raw POST data fordi stackoverflow sa det
$filteredData = substr($GLOBALS['HTTP_RAW_POST_DATA'], strpos($GLOBALS['HTTP_RAW_POST_DATA'], ",")+1);

// Dekoder base64
$decodedData = base64_decode($filteredData);

// Filnavn og location
$path = "img/droffs/";
$code = md5(uniqid("blah", true));
$name = $code . ".png";
$file = $path . $name;

// Skriver filen
$fp = fopen( $file, 'wb' );
fwrite( $fp, $decodedData);
fclose( $fp );

/*$directory = "img/droffs/";
$img = str_replace('data:image/png;base64,', '', $img);
$img = str_replace(' ', '+', $img);
$data = base64_decode($img);
$file = $directory . "test.png";
$success = file_put_contents($file, $data);
header('Location: '.$_POST['return_url']);*/

echo $code;

// Post file
/*$formdata = $_POST["formdata"];
$formdata = mysqli_real_escape_string($conn, $formdata);
echo $formdata;*/

/*$file = $_POST["file"];
$token = $_POST["token"];
$name = $_POST["name"];

$file = mysqli_real_escape_string($conn, $file);
$token = mysqli_real_escape_string($conn, $token);
$name = mysqli_real_escape_string($conn, $name);

$target_dir = "img/avatar/";
$target_file = basename($_FILES[$file]);
//$target_file = pathinfo('$target_file')["filename"], "\n";

echo $name;*/

// echo $file_to_upload;

// You have to get the filename in JS

?>