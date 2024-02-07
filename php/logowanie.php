<?php
	
	session_start();
	$email = $_POST['lEmail'];
	$haslo = $_POST['lHaslo'];
	$mysqli = new mysqli("localhost","root","","saga");
	mysqli_set_charset($mysqli, "utf8");	
	$query="SELECT id FROM gracz WHERE email = '$email' AND haslo = '$haslo' LIMIT 1;";
	
	$result = mysqli_query($mysqli,$query);
    $tekst = "0";
    while ($row = mysqli_fetch_row($result)) {
        $tekst = $row[0];
    }
	if($tekst!="0")
	{
		$_SESSION['id'] = $tekst;
		$mysqli->close();
		header("Location: ../glowna.php?idp=menu");
	}
	else
	{
		$_SESSION['blad'] = "1";
		$mysqli->close();
		header("Location: ../index.php");
	}
	exit;
?>
	
