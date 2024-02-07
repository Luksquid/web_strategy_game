<?php
	
	$mysqli = new mysqli("localhost","root","","saga");
	mysqli_set_charset($mysqli, "utf8");
	$idPortu = $_POST['idPortu'];

	if ($mysqli->connect_error) {
		die("Błąd połączenia z bazą danych: " . $mysqli->connect_error);
	}
	$sql = "SELECT COUNT(l.id) AS 'liczbaLodzi'
			FROM lodz l, budynek b
			WHERE l.idPortu = b.id 
			AND b.id=$idPortu";
	$data = $mysqli->query($sql);
	$row = $data->fetch_assoc();
	$mysqli->close();
	
	echo json_encode($row, JSON_UNESCAPED_UNICODE);
?>