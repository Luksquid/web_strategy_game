<?php
	
	$mysqli = new mysqli("localhost", "root", "", "saga");
	mysqli_set_charset($mysqli, "utf8");
	$idGracza = $_POST['idGracza'];
	$idPostaci = $_POST['idPostaci'];

	if ($mysqli->connect_error) {
		die("Błąd połączenia z bazą danych: " . $mysqli->connect_error);
	}

	$query = "DELETE FROM postac WHERE id = '$idPostaci'";
	$mysqli->query($query);
	
	$query2 = "UPDATE magazyn SET łaskaBogów=łaskaBogów+30 WHERE idGracza = '$idGracza';";
	$mysqli->query($query2);
	
	$mysqli->close();
?>
