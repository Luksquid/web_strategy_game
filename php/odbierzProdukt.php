<?php
	
	$mysqli = new mysqli("localhost","root","","saga");
	mysqli_set_charset($mysqli, "utf8");
	$idBudynku = $_POST['idBudynku'];
	$idGracza = $_POST['idGracza'];

	if ($mysqli->connect_error) {
		die("Błąd połączenia z bazą danych: " . $mysqli->connect_error);
	}
	$sql = "
		SELECT procesIlosc AS 'ilosc', proces AS 'nazwa'
			FROM budynek
			WHERE id = '$idBudynku';
		";
	
	$query4 = "SELECT procesOpis FROM budynek WHERE id = $idBudynku;";
	$query4Wynik = mysqli_query($mysqli, $query4);
	$query4Rezultat = mysqli_fetch_assoc($query4Wynik);
    $opis = $query4Rezultat['procesOpis'];
	
	$query1 = "UPDATE budynek SET proces=NULL, procesOpis=NULL, procesStart=NULL, procesStop=NULL, procesIlosc=NULL WHERE id = '$idBudynku';";
	$result = $mysqli->query($sql);
	$data = $result->fetch_assoc();
	$nazwa = $data['nazwa'];
	$ilosc = $data['ilosc'];
	$mysqli->query($query1);
	if($nazwa != 'człowiek' && $nazwa != 'sneka' && $nazwa != 'skeida' && $nazwa != 'drakar')
	{	
		$query2 = "UPDATE magazyn SET `$nazwa` = `$nazwa` + $ilosc WHERE idGracza = '$idGracza';";
		$mysqli->query($query2);
	}
	else
	{	
		$mysqli->query($opis);
	}
	if($nazwa == 'wełna')
	{
		$ilosc = $ilosc * 1.5;
		$query3 = "UPDATE magazyn SET żywność = żywność + $ilosc WHERE idGracza = '$idGracza';";
		$mysqli->query($query3);
	}
	if($nazwa == 'skóra')
	{
		$ilosc = $ilosc * 3;
		$query3 = "UPDATE magazyn SET żywność = żywność + $ilosc WHERE idGracza = '$idGracza';";
		$mysqli->query($query3);
	}
	
	$mysqli->close();
	
	echo json_encode($data, JSON_UNESCAPED_UNICODE);
?>