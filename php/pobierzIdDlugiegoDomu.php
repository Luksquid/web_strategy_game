<?php
	
	$mysqli = new mysqli("localhost","root","","saga");
	mysqli_set_charset($mysqli, "utf8");
	$id = $_POST['id'];

	if ($mysqli->connect_error) {
		die("Błąd połączenia z bazą danych: " . $mysqli->connect_error);
	}

	$sql = "SELECT id FROM budynek WHERE nazwa='dlugiDom' AND idGracza='$id';";
		
	$result = $mysqli->query($sql);
	$data = $result->fetch_assoc(); 

	echo $data['id'];
	$mysqli->close();
?>