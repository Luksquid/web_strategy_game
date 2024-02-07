<?php
	
	$email = $_POST["email"];
	$mysqli = new mysqli("localhost","root","","saga");
	mysqli_set_charset($mysqli, "utf8");
	$query="SELECT COUNT(id) FROM gracz WHERE email = '$email' LIMIT 1";
	$result = mysqli_query($mysqli,$query);
    $tekst = "";
    while ($row = mysqli_fetch_row($result)) {
        $tekst .= $row[0] . "\n";
    }
	echo $tekst;
?>