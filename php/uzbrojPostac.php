<?php
	
	$mysqli = new mysqli("localhost","root","","saga");
	mysqli_set_charset($mysqli, "utf8");
	$idPostaci = $_POST['idPostaci'];
	$idGracza = $_POST['idGracza'];
	$przedmiot = $_POST['przedmiot'];
	$przedmioty = $_POST['przedmioty'];
	$wartosc = $_POST['wartosc'];
	
	if ($mysqli->connect_error) {
		die("Błąd połączenia z bazą danych: " . $mysqli->connect_error);
	}
	$query = "SELECT $przedmiot FROM postac WHERE id = $idPostaci;";
	$queryWynik = mysqli_query($mysqli, $query);
	$queryRezultat = mysqli_fetch_assoc($queryWynik);
    $opis = $queryRezultat[$przedmiot];
	
	if($opis == 0)
	{
		$sql1 = "UPDATE postac SET $przedmiot='$wartosc' WHERE id = '$idPostaci';";
		$sql2 = "UPDATE magazyn SET $przedmioty=$przedmioty-1 WHERE idGracza = '$idGracza';";
		$mysqli->query($sql1);
		$mysqli->query($sql2);
	}
	elseif($opis == 'topór')
	{
		if($wartosc == 'miecz')
		{
			$sql1 = "UPDATE postac SET $przedmiot='miecz' WHERE id = '$idPostaci';";
			$sql2 = "UPDATE magazyn SET topory=topory+1, miecze=miecze-1 WHERE idGracza = '$idGracza';";
			$mysqli->query($sql1);
			$mysqli->query($sql2);
		}
		else
		{
			$sql1 = "UPDATE postac SET $przedmiot='0' WHERE id = '$idPostaci';";
			$sql2 = "UPDATE magazyn SET topory=topory+1 WHERE idGracza = '$idGracza';";
			$mysqli->query($sql1);
			$mysqli->query($sql2);
		}
	}
	elseif($opis == 'miecz')
	{
		if($wartosc == 'topór')
		{
			$sql1 = "UPDATE postac SET $przedmiot='topór' WHERE id = '$idPostaci';";
			$sql2 = "UPDATE magazyn SET topory=topory-1, miecze=miecze+1 WHERE idGracza = '$idGracza';";
			$mysqli->query($sql1);
			$mysqli->query($sql2);
		}
		else
		{
			$sql1 = "UPDATE postac SET $przedmiot='0' WHERE id = '$idPostaci';";
			$sql2 = "UPDATE magazyn SET miecze=miecze+1 WHERE idGracza = '$idGracza';";
			$mysqli->query($sql1);
			$mysqli->query($sql2);
		}
	}
	else
	{
		$sql1 = "UPDATE postac SET $przedmiot=0 WHERE id = '$idPostaci';";
		$sql2 = "UPDATE magazyn SET $przedmioty=$przedmioty+1 WHERE idGracza = '$idGracza';";
		$mysqli->query($sql1);
		$mysqli->query($sql2);
	}
	
	$mysqli->close();
?>