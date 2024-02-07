<?php
	
	$mysqli = new mysqli("localhost", "root", "", "saga");
	mysqli_set_charset($mysqli, "utf8");
	$idPostaci = $_POST['idPostaci'];
	$idBudynku = $_POST['idBudynku'];

	if ($mysqli->connect_error) {
		die("Błąd połączenia z bazą danych: " . $mysqli->connect_error);
	}

	$query = "UPDATE postac SET idBudynkuPracy = '$idBudynku' WHERE id = '$idPostaci' LIMIT 1";

	$mysqli->query($query);

	$mysqli->close();
?>
