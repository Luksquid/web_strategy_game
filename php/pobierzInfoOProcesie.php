<?php
	
	$mysqli = new mysqli("localhost","root","","saga");
	mysqli_set_charset($mysqli, "utf8");
	$id = $_POST['id'];

	if ($mysqli->connect_error) {
		die("Błąd połączenia z bazą danych: " . $mysqli->connect_error);
	}
	$sql = "
		SELECT b.proces, b.procesStop AS 'procesStop',TIMEDIFF(b.procesStop, NOW()) AS 'czas', TIMESTAMPDIFF(SECOND, procesStart, procesStop) AS 'ileRazem',  TIMESTAMPDIFF(SECOND, NOW(), procesStop) AS 'ileZostalo'
			FROM budynek b
			WHERE b.id = '$id';
		";
		
	$data = $mysqli->query($sql);
	$row = $data->fetch_assoc();
	$mysqli->close();
	
	echo json_encode($row, JSON_UNESCAPED_UNICODE);
?>