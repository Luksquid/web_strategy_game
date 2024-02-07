<?php
	
	$mysqli = new mysqli("localhost","root","","saga");
	mysqli_set_charset($mysqli, "utf8");
	$idGracza = $_POST['idGracza'];
	$nazwa = $_POST['nazwa'];
	
	$sql0 = "
		SELECT
			proces,
			CASE
				WHEN TIMEDIFF(procesStop, NOW()) < '00:00:00' THEN 0
				ELSE 1
			END AS 'czas'
		FROM budynek
		WHERE nazwa = 'dlugiDom' AND idGracza = $idGracza;
		";
	
	$result0 = $mysqli->query($sql0);
	$data0 = $result0->fetch_assoc();
	
	$koniecEtapu = $data0['czas'];
	$proces = $data0['proces'];
	
	if($proces != null)
	{
		$sql00 = "SELECT polecenie FROM etap WHERE id=$proces;";
		
		$result00 = $mysqli->query($sql00);
		$data00 = $result00->fetch_assoc();
		
		if($koniecEtapu == 0 || $data00['polecenie'] == 'Start')
		{
			$sql1 = "
				SELECT e.id, e.nazwaWyprawy, e.polecenie, e.tekst, e.czasTrwania, e.opcja1id, e.opcja2id, e.opcja3id, e.opcja1nazwa, e.opcja2nazwa, e.opcja3nazwa, e.walka 
					FROM etap e, wyprawa w
					WHERE w.idEtapu = e.id
					AND w.idGracza = $idGracza
					AND e.nazwaWyprawy = '$nazwa';
				";
			
			$result1 = $mysqli->query($sql1);

			$data1 = array();

			if ($result1) {
				while ($row = $result1->fetch_assoc()) {
					$data1[] = $row;
				}
			} else {
				echo "Błąd zapytania: " . $mysqli->error;
			}	
		}
		else
		{
			$sql1 = "
				SELECT e.id, e.nazwaWyprawy, e.polecenie, e.tekst, e.czasTrwania, e.opcja1id, e.opcja2id, e.opcja3id, e.opcja1nazwa, e.opcja2nazwa, e.opcja3nazwa, e.walka 
					FROM etap e, wyprawa w
					WHERE w.idEtapu = e.id
					AND w.idGracza = $idGracza
					AND e.nazwaWyprawy = '$nazwa'
					AND e.id != $proces;
				";
			
			$result1 = $mysqli->query($sql1);

			$data1 = array();

			if ($result1) {
				while ($row = $result1->fetch_assoc()) {
					$data1[] = $row;
				}
			} else {
				echo "Błąd zapytania: " . $mysqli->error;
			}	
		}
	}
	else
	{
		$sql1 = "
			SELECT e.id, e.nazwaWyprawy, e.polecenie, e.tekst, e.czasTrwania, e.opcja1id, e.opcja2id, e.opcja3id, e.opcja1nazwa, e.opcja2nazwa, e.opcja3nazwa, e.walka 
				FROM etap e, wyprawa w
				WHERE w.idEtapu = e.id
				AND w.idGracza = $idGracza
				AND e.nazwaWyprawy = '$nazwa';
			";
		
		$result1 = $mysqli->query($sql1);

		$data1 = array();

		if ($result1) {
			while ($row = $result1->fetch_assoc()) {
				$data1[] = $row;
			}
		} else {
			echo "Błąd zapytania: " . $mysqli->error;
		}	
	}
	
	echo json_encode($data1, JSON_UNESCAPED_UNICODE);
	$mysqli->close();
?>