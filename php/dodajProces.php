<?php
	
	$mysqli = new mysqli("localhost", "root", "", "saga");
	mysqli_set_charset($mysqli, "utf8");
	$idBudynku = $_POST['idBudynku'];
	$czasTrwania = $_POST['czasTrwania'];
	$proces = $_POST['proces'];
	$ilosc = $_POST['ilosc'];
	$opis = $_POST['procesOpis'];
	$czasStart = date("Y-m-d H:i:s");
	$czasStop = date("Y-m-d H:i:s", strtotime($czasStart . " +" . $czasTrwania . " hours"));
	

	if ($mysqli->connect_error) {
		die("Błąd połączenia z bazą danych: " . $mysqli->connect_error);
	}

	$query = "UPDATE budynek 
				SET procesStart = '$czasStart',
				procesStop = '$czasStop',
				proces = '$proces',
				procesIlosc = '$ilosc',
				procesOpis = ".$opis."
				WHERE id = '$idBudynku' 
				LIMIT 1;";
	
	if($proces=='miecze')
	{	
		$kosztZelazo = $ilosc * 4;
		$kosztDrewno = $ilosc * 2;
		$kosztSkora = $ilosc * 1;
		$query2 = "UPDATE magazyn m, budynek b SET m.drewno = m.drewno - $kosztDrewno, m.żelazo = m.żelazo - $kosztZelazo, m.skóra = m.skóra - $kosztSkora WHERE b.id = $idBudynku AND m.idGracza = b.idGracza;";
		$mysqli->query($query2);
	}
	
	elseif($proces=='topory')
	{	
		$kosztZelazo = $ilosc * 2;
		$kosztDrewno = $ilosc * 2;
		$query2 = "UPDATE magazyn m, budynek b SET m.drewno = m.drewno - $kosztDrewno, m.żelazo = m.żelazo - $kosztZelazo WHERE b.id = $idBudynku AND m.idGracza = b.idGracza;";
		$mysqli->query($query2);
	}
	
	elseif($proces=='tarcze')
	{	
		$kosztZelazo = $ilosc * 3;
		$kosztDrewno = $ilosc * 5;
		$kosztSkora = $ilosc * 2;
		$query2 = "UPDATE magazyn m, budynek b SET m.drewno = m.drewno - $kosztDrewno, m.żelazo = m.żelazo - $kosztZelazo, m.skóra = m.skóra - $kosztSkora WHERE b.id = $idBudynku AND m.idGracza = b.idGracza;";
		$mysqli->query($query2);
	}

	elseif($proces=='hełmy')
	{	
		$kosztZelazo = $ilosc * 5;
		$kosztWelna = $ilosc * 1;
		$kosztSkora = $ilosc * 4;
		$query2 = "UPDATE magazyn m, budynek b SET m.wełna = m.wełna - $kosztWelna, m.żelazo = m.żelazo - $kosztZelazo, m.skóra = m.skóra - $kosztSkora WHERE b.id = $idBudynku AND m.idGracza = b.idGracza;";
		$mysqli->query($query2);
	}
	
	elseif($proces=='kotwice')
	{	
		$kosztZelazo = $ilosc * 6;
		$query2 = "UPDATE magazyn m, budynek b SET m.żelazo = m.żelazo - $kosztZelazo WHERE b.id = $idBudynku AND m.idGracza = b.idGracza;";
		$mysqli->query($query2);
	}
	
	elseif($proces=='człowiek')
	{	
		$query2 = "UPDATE magazyn m, budynek b SET m.żywność = m.żywność - 4 WHERE b.id = $idBudynku AND m.idGracza = b.idGracza;";
		$mysqli->query($query2);
	}
	
	elseif($proces=='sneka')
	{
		$query2 = "UPDATE magazyn m, budynek b SET m.wełna = m.wełna - 20, m.żelazo = m.żelazo - 2, m.drewno = m.drewno - 100, m.kotwice = m.kotwice - 1 WHERE b.id = $idBudynku AND m.idGracza = b.idGracza;";
		$mysqli->query($query2);
	}
	
	elseif($proces=='skeida')
	{
		$query2 = "UPDATE magazyn m, budynek b SET m.wełna = m.wełna - 40, m.żelazo = m.żelazo - 4, m.drewno = m.drewno - 150, m.kotwice = m.kotwice - 1 WHERE b.id = $idBudynku AND m.idGracza = b.idGracza;";
		$mysqli->query($query2);
	}
	
	elseif($proces=='drakar')
	{
		$query2 = "UPDATE magazyn m, budynek b SET m.wełna = m.wełna - 60, m.żelazo = m.żelazo - 6, m.drewno = m.drewno - 200, m.kotwice = m.kotwice - 1 WHERE b.id = $idBudynku AND m.idGracza = b.idGracza;";
		$mysqli->query($query2);		
	}
	
	$mysqli->query($query);

	$mysqli->close();
?>
