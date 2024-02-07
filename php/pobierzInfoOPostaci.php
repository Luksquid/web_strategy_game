<?php
	
	$mysqli = new mysqli("localhost","root","","saga");
	mysqli_set_charset($mysqli, "utf8");
	$idPostaci = $_POST['idPostaci'];

	if ($mysqli->connect_error) {
		die("Błąd połączenia z bazą danych: " . $mysqli->connect_error);
	}
	
	$sql = "SELECT imie, maxHp, sila, zwinnosc, imieOjca, plec, hp, grafika, helm, tarcza, bron FROM postac WHERE id = $idPostaci;";
	
	$data = $mysqli->query($sql);
	$row = $data->fetch_assoc();
	$mysqli->close();
	
	echo json_encode($row, JSON_UNESCAPED_UNICODE);
?>