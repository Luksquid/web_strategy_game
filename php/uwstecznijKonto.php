<?php
	session_start();
	
	$mysqli = new mysqli("localhost","root","","saga");
	mysqli_set_charset($mysqli, "utf8");
	$idGracza = $_POST['idGracza'];

	$sql = "SELECT imie, email, haslo FROM gracz WHERE id=$idGracza;";
	
	$result = $mysqli->query($sql);
	$data = $result->fetch_assoc();
	$imie = $data['imie'];
	$email = $data['email'];
	$haslo = $data['haslo'];
		
	$sql1 = "DELETE FROM gracz WHERE id = $idGracza;";
	$mysqli->query($sql1);
	
	$sql2 = "INSERT INTO gracz(imie, email, haslo) VALUES ('$imie', '$email', '$haslo');";
	$mysqli->query($sql2);
	
	unset($_SESSION['id']);
	
	$mysqli->close();
?>