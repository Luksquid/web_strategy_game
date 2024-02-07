<?php
	
	$mysqli = new mysqli("localhost","root","","saga");
	mysqli_set_charset($mysqli, "utf8");
	$idGracza = $_POST['idGracza'];

	if ($mysqli->connect_error) {
		die("Błąd połączenia z bazą danych: " . $mysqli->connect_error);
	}

	$sql = "
		SELECT 
			(SELECT ROUND(m.żywność/COUNT(p.id), 1) 
				FROM magazyn m, postac p, gracz g 
				WHERE p.idGracza = g.id 
				AND m.idGracza = g.id 
				AND g.id = $idGracza) AS 'racje',
			(SELECT COUNT(p.id) 
				FROM postac p, gracz g 
				WHERE p.idGracza = g.id 
				AND g.id = 3) AS 'populacja',
			(SELECT COUNT(b.id) 
				FROM budynek b, gracz g 
				WHERE b.idGracza = g.id 
				AND g.id = $idGracza) AS 'zabudowania',
			(SELECT ROUND(AVG(sila), 1) 
				FROM postac 
				WHERE idGracza = $idGracza) AS 'sredniaSila',
			(SELECT ROUND(AVG(zwinnosc), 1) 
				FROM postac 
				WHERE idGracza = $idGracza) AS 'sredniaZwinnosc',
			(SELECT COUNT(id) 
				FROM lodz 
				WHERE idGracza = $idGracza) AS 'flota',
			(SELECT SUM(iloscMiejsc) 
				FROM lodz 
				WHERE idGracza = $idGracza) AS 'miejscaLodzi',
			(SELECT COUNT(p.id) 
				FROM postac p, gracz g, budynek b 
				WHERE p.idGracza = g.id AND p.idBudynkuPracy = b.id 
				AND b.idGracza = g.id 
				AND b.nazwa = 'dlugiDom' 
				AND g.id = $idGracza) AS 'populacjaHirdu',
			(SELECT COUNT(w.idGracza) 
				FROM wyprawa w, gracz g 
				WHERE w.idGracza = g.id 
				AND g.id = $idGracza) AS 'wyprawy';
		";
	$result = $mysqli->query($sql);

	if ($result) {
		$data = $result->fetch_assoc();
	} else {
		echo "Błąd zapytania: " . $mysqli->error;
	}

	$mysqli->close();
	echo json_encode($data);
?>