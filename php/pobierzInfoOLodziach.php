<?php
	
	$mysqli = new mysqli("localhost","root","","saga");
	mysqli_set_charset($mysqli, "utf8");
	$idPortu = $_POST['idPortu'];


	if ($mysqli->connect_error) {
		die("Błąd połączenia z bazą danych: " . $mysqli->connect_error);
	}
	$sql = "SELECT id, nazwa, typ, iloscMiejsc, grafika FROM lodz WHERE idPortu=$idPortu;";

		
	$result = $mysqli->query($sql);

	$data = array();

	if ($result) {
		while ($row = $result->fetch_assoc()) {
			$data[] = $row;
		}
	} else {
		echo "Błąd zapytania: " . $mysqli->error;
	}
	
	$mysqli->close();
	
	echo json_encode($data, JSON_UNESCAPED_UNICODE);
?>