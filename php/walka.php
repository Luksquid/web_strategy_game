<?php
	
	$mysqli = new mysqli("localhost","root","","saga");
	mysqli_set_charset($mysqli, "utf8");

	function usunPostac($idPostaci)
	{	
		$mysqli = new mysqli("localhost","root","","saga");
		$sql2 = "DELETE FROM postac WHERE id=$idPostaci;";
		$mysqli->query($sql2);
	}
	
	function aktualizujPostac($idPostaci, $liczbaHp)
	{
		$mysqli = new mysqli("localhost","root","","saga");
		$liczbaHp = ceil($liczbaHp);
		$sql2 = "UPDATE postac SET hp=$liczbaHp WHERE id=$idPostaci;";
		$mysqli->query($sql2);
		
		$aktuaizacjaSily = random_int(1, 100); 
		$aktuaizacjaZwinnosci = random_int(1, 100); 
		$aktuaizacjaHp = random_int(1, 100); 
		if($aktuaizacjaSily <=50)
		{
			$sql3 = "UPDATE postac SET sila=sila+2 WHERE id=$idPostaci;";
			$mysqli->query($sql3);
		}
		if($aktuaizacjaZwinnosci <=50)
		{
			$sql4 = "UPDATE postac SET zwinnosc=zwinnosc+2 WHERE id=$idPostaci;";
			$mysqli->query($sql4);
		}
		if($aktuaizacjaHp <=20)
		{
			$sql5 = "UPDATE postac SET maxHp=maxHp+10 WHERE id=$idPostaci;";
			$mysqli->query($sql5);
		}
	}
	
	$idGracza = $_POST['idGracza'];
	$idEtapu = $_POST['idEtapu'];
	
	$sql0 = "
		SELECT hp, sila, zwinnosc 
			FROM wrog 
			WHERE idEtapu = 6;
	";

	$result0 = $mysqli->query($sql0);

	$wrogowie = array();

	if ($result0) {
		while ($row0 = $result0->fetch_assoc()) {
			$wrogowie[] = $row0;
		}
	}
	$sql = "
	SELECT p.id, p.hp, p.maxHp, p.sila, p.zwinnosc, p.helm, p.tarcza, p.bron 
		FROM postac p, budynek b, gracz g 
		WHERE p.idBudynkuPracy = b.id 
		AND p.idGracza = g.id 
		AND b.idGracza = g.id 
		AND b.nazwa = 'dlugiDom'
		AND g.id = $idGracza;
	";
		
	$result = $mysqli->query($sql);
	$postaci = array();

	if ($result) {
		while ($row = $result->fetch_assoc()) {
			$postaci[] = $row;
			
		}
	}
	
	$zywiWrogowie = array();
	$zywePostaci = array();
	while(!empty($wrogowie) && !empty($postaci))
	{
		for($i=0; $i<count($wrogowie); $i++)
		{
			$nrWroga = $i;
			$nrPostaci = $i%count($postaci);
			$silaWroga = $wrogowie[$nrWroga]['sila'];
			$zwinnoscWroga = $wrogowie[$nrWroga]['zwinnosc'];
			if($postaci[$nrPostaci]['tarcza'] == '1')
			{
				$zwinnoscWroga = $zwinnoscWroga * 0.5;
			}
			$skutecznoscAtakuWroga = random_int(1, 100); 
			
			if($skutecznoscAtakuWroga <= $zwinnoscWroga)
			{			
				$atakWroga = 50 + 50 * ($silaWroga/100);
				if($postaci[$nrPostaci]['helm'] == 1)
					$atakWroga = $atakWroga * 0.75;
				$postaci[$nrPostaci]['hp'] = $postaci[$nrPostaci]['hp'] - $atakWroga;
				if($postaci[$nrPostaci]['hp'] <= 0)
				{
					continue;
				}
			}
		}
		
		for($i=0; $i<count($postaci); $i++)
		{
			$nrWroga = $i%count($wrogowie);
			$nrPostaci = $i;
			
			$silaPostaci = $postaci[$nrPostaci]['sila'];
			$zwinnoscPostaci = $postaci[$nrPostaci]['zwinnosc'];
			$skutecznoscAtakuPostaci = random_int(1, 100); 
			if($skutecznoscAtakuPostaci <= $zwinnoscPostaci)
			{			
				$atakPostaci = 50 + 50 * ($silaPostaci/100);
				if($postaci[$nrPostaci]['bron'] == 'miecz')
					$atakPostaci = $atakPostaci * 1.25;
				elseif($postaci[$nrPostaci]['bron'] == '0')
					$atakPostaci = 0;
				$wrogowie[$nrWroga]['hp'] = $wrogowie[$nrWroga]['hp'] - $atakPostaci;
			}
		}
		
		for($i=0; $i<count($postaci); $i++)
		{	
			if($postaci[$i]['hp'] > 0)
			{
				$zywePostaci[] = $postaci[$i];
			}
			else
			{
				usunPostac($postaci[$i]['id']);
			}
		}
		$postaci = $zywePostaci;
		$zywePostaci = array();
		
		for($i=0; $i<count($wrogowie); $i++)
		{
			if($wrogowie[$i]['hp'] > 0)
				$zywiWrogowie[] = $wrogowie[$i];
			
		}
		$wrogowie = $zywiWrogowie;
		$zywiWrogowie = array();
	}
	
	for($i=0; $i<count($postaci); $i++)
	{	
		aktualizujPostac($postaci[$i]['id'], $postaci[$i]['hp']);
	}
	
	if(empty($postaci))
	{
		$sql6 = "DELETE w FROM wyprawa w, etap e WHERE w.idEtapu = e.id AND w.idGracza = $idGracza AND nazwaWyprawy = (SELECT nazwaWyprawy FROM etap WHERE id = $idEtapu);";
		$mysqli->query($sql6);
		
		$sql7 = "UPDATE budynek SET proces=null,procesOpis=null,procesStart=null,procesStop=null WHERE nazwa='dlugiDom' AND idGracza=$idGracza;";
		$mysqli->query($sql7);
		
		echo 1;
	}
	
	elseif(empty($wrogowie))
	{
		echo 0;
	}
	
	$mysqli->close();
?>