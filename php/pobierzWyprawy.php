<?php
	
	$mysqli = new mysqli("localhost","root","","saga");
	mysqli_set_charset($mysqli, "utf8");
	$idGracza = $_POST['idGracza'];

	if ($mysqli->connect_error) {
		die("Błąd połączenia z bazą danych: " . $mysqli->connect_error);
	}

	$sql = "
		SELECT DISTINCT e.nazwaWyprawy
			FROM etap e
			JOIN wyprawa w ON e.id = w.idEtapu
			WHERE w.idGracza = $idGracza;
		";
		
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
	
	echo json_encode($data);
?>