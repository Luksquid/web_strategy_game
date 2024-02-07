<?php
	
	$mysqli = new mysqli("localhost","root","","saga");
	mysqli_set_charset($mysqli, "utf8");
	$id = $_POST['id'];
	$nazwa = $_POST['nazwa'];
	

	if ($mysqli->connect_error) {
		die("Błąd połączenia z bazą danych: " . $mysqli->connect_error);
	}

	$sql = "
		SELECT b.id, TIMEDIFF(b.procesStop, NOW()) AS 'czas', b.proces
			FROM (
				SELECT b.id, b.procesStop, b.proces
				FROM gracz g, budynek b
				WHERE g.id = b.idGracza
				AND g.id = '$id'
				AND b.nazwa = '$nazwa'
			) AS b;
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
	
	echo json_encode($data, JSON_UNESCAPED_UNICODE);
?>