<?php
	
	$mysqli = new mysqli("localhost","root","","saga");
	mysqli_set_charset($mysqli, "utf8");
	
	$nazwa = $_POST['nazwa'];
	$id = $_POST['id'];

	if ($mysqli->connect_error) {
		die("Błąd połączenia z bazą danych: " . $mysqli->connect_error);
	}
	
	switch ($nazwa) {
    case 'chataDrwala':
        $kosztDrewno = 15; 
        $kosztWelna = 5;   
		$kosztZelazo = 0;
		$kosztZloto = 0;
        break;
    case 'farma':
        $kosztDrewno = 20; 
        $kosztWelna = 7; 
        $kosztZelazo = 2; 
		$kosztZloto = 0; 
        break;
    case 'dom':
        $kosztDrewno = 30; 
        $kosztWelna = 12; 
        $kosztZelazo = 1;  
		$kosztZloto = 0;
        break;
    case 'kuznia':
        $kosztDrewno = 50; 
        $kosztWelna = 15; 
        $kosztZelazo = 10;  
		$kosztZloto = 0;
        break;
    case 'port':
        $kosztDrewno = 80; 
        $kosztWelna = 25; 
        $kosztZelazo = 5; 
		$kosztZloto = 0;
        break;
    case 'swiatynia':
        $kosztDrewno = 150; 
        $kosztWelna = 50; 
        $kosztZelazo = 8; 
        $kosztZloto = 10;
        break;
    default:
        echo 'Nie ma takiego budynku';
	}
	$sql = "SELECT drewno, wełna, żelazo, złoto FROM magazyn WHERE idGracza = '$id';";
	$wynik = mysqli_query($mysqli, $sql);
	$data = mysqli_fetch_array($wynik);
	$drewno = $data[0];
	$welna = $data[1];
	$zelazo = $data[2];
	$zloto = $data[3];

	if($kosztDrewno > $drewno || $kosztWelna > $welna || $kosztZelazo > $zelazo || $kosztZloto > $zloto)
		echo 'Nie można utworzyć budynku';
	else
	{
		$noweDrewno = $drewno - $kosztDrewno;
		$nowaWelna = $welna - $kosztWelna;
		$noweZelazo = $zelazo - $kosztZelazo;
		$noweZloto = $zloto - $kosztZloto;
		$magazynSql = "UPDATE magazyn SET drewno='$noweDrewno', wełna='$nowaWelna', żelazo='$noweZelazo', złoto='$noweZloto' WHERE idGracza = '$id';";
		$budynekSql = "INSERT INTO budynek(idGracza, nazwa) VALUES ('$id','$nazwa');";
		$mysqli->query($magazynSql);
		$mysqli->query($budynekSql);
	}
	$mysqli->close();

	$odpowiedz = array('odpowiedz' => 'Budynek został utworzony');
	echo json_encode($odpowiedz, JSON_UNESCAPED_UNICODE);
?>