<?php
	
	$mysqli = new mysqli("localhost", "root", "", "saga");
	mysqli_set_charset($mysqli, "utf8");
	$idGracza = $_POST['idGracza'];

	if ($mysqli->connect_error) {
		die("Błąd połączenia z bazą danych: " . $mysqli->connect_error);
	}
	
	$query2 = "UPDATE magazyn SET łaskaBogów=łaskaBogów+20, żywność = żywność - 10 WHERE idGracza = '$idGracza';";
	$mysqli->query($query2);
	
	$mysqli->close();
?>
