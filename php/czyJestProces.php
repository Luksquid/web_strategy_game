<?php
	$mysqli = new mysqli("localhost","root","","saga");
	mysqli_set_charset($mysqli, "utf8");
	$idBudynku = $_POST['idBudynku'];

	if ($mysqli->connect_error) {
		die("Błąd połączenia z bazą danych: " . $mysqli->connect_error);
	}

	$sql = "SELECT proces FROM budynek WHERE id = '$idBudynku';";
		
	$result = $mysqli->query($sql);
	$data = $result->fetch_assoc(); 

	$mysqli->close();
	
	echo $data['proces'];
?>