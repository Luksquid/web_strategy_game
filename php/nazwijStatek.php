<?php
	
	$mysqli = new mysqli("localhost", "root", "", "saga");
	mysqli_set_charset($mysqli, "utf8");
	$id = $_POST['idLodzi'];
	$nazwaLodzi = $_POST['nazwa'];
	mysqli_set_charset($mysqli, "utf8");
	if ($mysqli->connect_error) {
		die("Błąd połączenia z bazą danych: " . $mysqli->connect_error);
	}

	$query = "UPDATE lodz SET nazwa = '$nazwaLodzi' WHERE id = $id;";

	$mysqli->query($query);

	$mysqli->close();
?>
