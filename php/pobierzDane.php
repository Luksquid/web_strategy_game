<?php
	$mysqli = new mysqli("localhost","root","","saga");
	$mysqli->set_charset("utf8");
	$id = $_POST['id'];

	if ($mysqli->connect_error) {
		die("Błąd połączenia z bazą danych: " . $mysqli->connect_error);
	}

	$sql = "SELECT g.imie, m.złoto, m.żelazo, m.drewno, m.żywność, m.skóra, m.wełna, m.łaskaBogów FROM gracz g, magazyn m WHERE m.idGracza = g.id AND g.id = '$id';";
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
	header('Content-Type: application/json');
	echo json_encode($data, JSON_UNESCAPED_UNICODE);
?>
