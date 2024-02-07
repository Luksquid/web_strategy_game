<?php
	
	$mysqli = new mysqli("localhost","root","","saga");
	mysqli_set_charset($mysqli, "utf8");
	$id = $_POST['id'];
	if ($mysqli->connect_error) {
		die("Błąd połączenia z bazą danych: " . $mysqli->connect_error);
	}

	$sql = "SELECT p.grafika AS 'grafika', p.imie AS 'imie', p.id AS 'id' FROM postac p, gracz g WHERE p.idGracza = g.id AND g.id = '$id' AND p.idBudynkuPracy is NULL;";
		
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