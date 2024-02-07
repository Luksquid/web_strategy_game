<?php
	
	$mysqli = new mysqli("localhost","root","","saga");
	mysqli_set_charset($mysqli, "utf8");
	$nrGracza = $_POST['idGracza'];
	
	if ($mysqli->connect_error)
	{
		die("Błąd połączenia z bazą danych: " . $mysqli->connect_error);
	}

	$sql = "SELECT topory, miecze, tarcze, hełmy AS 'helmy', kotwice, drewno, żelazo AS 'zelazo', wełna AS 'welna', żywność AS 'zywnosc', skóra AS 'skora', złoto AS 'zloto', łaskaBogów AS 'laskaBogow' FROM magazyn WHERE idGracza = '$nrGracza';";

	$result = $mysqli->query($sql);
	$data = $result->fetch_assoc(); 

	$mysqli->close();
	
	echo json_encode($data, JSON_UNESCAPED_UNICODE);
?>