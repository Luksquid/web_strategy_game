<?php
	
	$mysqli = new mysqli("localhost","root","","saga");
	mysqli_set_charset($mysqli, "utf8");
	$id = $_POST['id'];
	if ($mysqli->connect_error) {
		die("Błąd połączenia z bazą danych: " . $mysqli->connect_error);
	}

	$sql = "SELECT nazwa, proces FROM budynek WHERE id = '$id';";

	$result = $mysqli->query($sql);
	$data = $result->fetch_assoc(); 

	$mysqli->close();
	
	echo json_encode($data, JSON_UNESCAPED_UNICODE);
?>