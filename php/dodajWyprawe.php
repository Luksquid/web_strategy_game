<?php
	
	$mysqli = new mysqli("localhost","root","","saga");
	mysqli_set_charset($mysqli, "utf8");
	$idGracza = $_POST['idGracza'];
	
	$sql00 = "
		SELECT proces 
		FROM budynek 
		WHERE budynek.nazwa = 'dlugiDom' 
		AND idGracza = $idGracza;";
	
	$result00 = $mysqli->query($sql00);
	$data00 = $result00->fetch_assoc();
		
	if($data00['proces'] != null)
	{
		echo 'Wyprawa już trwa';
		exit;
	}
	
	$sql0 = "
		SELECT
			CASE
				WHEN COALESCE((SELECT SUM(iloscMiejsc) FROM lodz WHERE idGracza = $idGracza), 0) >= COALESCE((SELECT COUNT(p.id) FROM postac p, budynek b, gracz g WHERE p.idBudynkuPracy = b.id AND b.idGracza = g.id AND g.id = $idGracza AND b.nazwa = 'dlugiDom'), 0) THEN 0
				ELSE 1
			END AS 'porownanie';";
	
	$result0 = $mysqli->query($sql0);
	$data0 = $result0->fetch_assoc();
	
	if($data0['porownanie'] == 1)
	{
		echo 'Posiadana liczba łodzi nie pomieści całego hirdu';
		exit;
	}
	
	if ($mysqli->connect_error) {
		die("Błąd połączenia z bazą danych: " . $mysqli->connect_error);
	}

	$sql = "
		SELECT id, czasTrwania
		FROM etap
		WHERE polecenie = 'Start' AND NOT EXISTS (
			SELECT 1
			FROM wyprawa w
			WHERE w.idEtapu = etap.id AND w.idGracza = $idGracza
		)
		LIMIT 1;
		";
	$result = $mysqli->query($sql);
	$data = $result->fetch_assoc();
	if(!isset($data['id']))
	{
		echo 'Brak wypraw do odbycia';
		exit;
	}
	
	$idEtapu = $data['id'];
	
	$sql11 = "
		SELECT
			@rand_value := COALESCE(ROUND(RAND(), 1), 0) AS prawdopodobienstwo,
			CASE
				WHEN łaskaBogów < 50 AND @rand_value <= 0.5 THEN 0
				WHEN łaskaBogów < 50 AND @rand_value > 0.5 THEN 1
				WHEN łaskaBogów >= 50 AND łaskaBogów < 100 AND @rand_value <= 0.7 THEN 0
				WHEN łaskaBogów >= 50 AND łaskaBogów < 100 AND @rand_value > 0.7 THEN 1
				WHEN łaskaBogów >= 100 THEN 0
			END AS szansa
		FROM
			(SELECT łaskaBogów FROM magazyn WHERE idGracza = $idGracza) AS magazyn;
	";
	$result11 = $mysqli->query($sql11);
	$data11 = $result11->fetch_assoc();
	$wypadek = $data11['szansa'];
	
	if($wypadek == 1)
	{
		$sql1 = "
			DELETE l, p 
				FROM lodz l, postac p, gracz g, budynek b 
				WHERE l.idGracza = g.id 
				AND p.idGracza = g.id 
				AND p.idBudynkuPracy = b.id 
				AND b.idGracza = g.id 
				AND b.nazwa = 'dlugiDom' 
				AND g.id = $idGracza;
			";
		$result1 = $mysqli->query($sql1);
		echo 'Wyprawa wyruszyła. Niestety sztorm zatopił nasze łodzie wraz z załogą. Jesteś jedynym ocalałym.';
		exit;
	}

	$czasTrwania = $data['czasTrwania'];
	$sql2 = "
		INSERT INTO wyprawa(idGracza, idEtapu) 
		VALUES ($idGracza,$idEtapu);
		";
	$result2 = $mysqli->query($sql2);
	
	$czasStart = date("Y-m-d H:i:s");
	$czasStop = date("Y-m-d H:i:s", strtotime($czasStart . " +" . $czasTrwania . " hours"));
	
	$sql3 = "
		UPDATE budynek 
		SET proces='$idEtapu', procesStart='$czasStart', procesStop='$czasStop' 
		WHERE nazwa='dlugiDom' AND idGracza=$idGracza;
	";
	$result3 = $mysqli->query($sql3);
	
	$mysqli->close();
	echo "Wyprawa ruszyła";
?>