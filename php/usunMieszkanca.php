<?php
	
	$mysqli = new mysqli("localhost", "root", "", "saga");
	mysqli_set_charset($mysqli, "utf8");
	$id = $_POST['idPostaci'];

	if ($mysqli->connect_error) {
		die("Błąd połączenia z bazą danych: " . $mysqli->connect_error);
	}

	$query = "UPDATE postac SET idDomu = NULL WHERE id = '$id'";

	$mysqli->query($query);

	$mysqli->close();
?>
