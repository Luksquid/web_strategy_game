<?php
	
	$mysqli = new mysqli("localhost", "root", "", "saga");
	mysqli_set_charset($mysqli, "utf8");
	$idLodzi = $_POST['idLodzi'];

	if ($mysqli->connect_error) {
		die("Błąd połączenia z bazą danych: " . $mysqli->connect_error);
	}

	$query = "DELETE FROM lodz WHERE id = $idLodzi";

	$mysqli->query($query);

	$mysqli->close();
?>