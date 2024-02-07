<?php
	
	$mysqli = new mysqli("localhost", "root", "", "saga");
	mysqli_set_charset($mysqli, "utf8");
	$idBudynku = $_POST['idBudynku'];
	
	if ($mysqli->connect_error) {
		die("Błąd połączenia z bazą danych: " . $mysqli->connect_error);
	}

	$query = "UPDATE budynek 
				SET procesStart = NULL,
				procesStop = NULL,
				proces = NULL,
				procesOpis = NULL,
				procesIlosc = NULL
				WHERE id = '$idBudynku' 
				LIMIT 1;";

	$mysqli->query($query);

	$mysqli->close();
?>
