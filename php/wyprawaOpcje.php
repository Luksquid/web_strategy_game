<?php
	
	$mysqli = new mysqli("localhost","root","","saga");
	mysqli_set_charset($mysqli, "utf8");
	$idGracza = $_POST['idGracza'];
	$nazwa = $_POST['nazwa'];
	
	$sql = "
		SELECT
			proces,
			CASE
				WHEN TIMEDIFF(procesStop, NOW()) < '00:00:00' THEN 0
				ELSE 1
			END AS 'czas'
		FROM budynek
		WHERE nazwa = 'dlugiDom' AND idGracza = $idGracza;
		";
	
	$result = $mysqli->query($sql);
	$data = $result->fetch_assoc();
	
	$koniecEtapu = $data['czas'];
	echo $koniecEtapu;
	
	$mysqli->close();
?>