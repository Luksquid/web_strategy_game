<?php
	
	session_start();
	$imie = $_POST['rImie'];
	$email = $_POST['rEmail'];
	$haslo = $_POST['rHaslo'];
	$mysqli = new mysqli("localhost","root","","saga");
	mysqli_set_charset($mysqli, "utf8");
	if ($mysqli->connect_error) 
	{
		die("Błąd połączenia z bazą danych: " . $mysqli->connect_error);
	}
	
	$sql = "INSERT INTO gracz(imie, email, haslo) VALUES ('$imie','$email','$haslo');";
	$stmt = $mysqli->prepare($sql);
	
	if ($stmt->execute())
	{
		$_SESSION['zarejestrowano'] = 1;
		echo "ok";
	} 
	else 
	{
		die("Błąd podczas wykonywania zapytania: " . $stmt->error);
	}
	$mysqli->close();
	header("Location: ../index.php");
	exit;
?>
	
