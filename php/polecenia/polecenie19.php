<?php
	
	$mysqli = new mysqli("localhost","root","","saga");
	mysqli_set_charset($mysqli, "utf8");
	$idGracza = $_POST['idGracza'];
	$polecenie = "INSERT INTO postac(idGracza, imie, imieOjca, plec, hp, maxHp, sila, zwinnosc, helm, tarcza, bron, grafika) VALUES ($idGracza, 'Gunhilda', 'Sven', 'kobieta', 120, 120, 30, 15, 1, 1, 'topór', '/img/postaci/kobiety/gunhilda.jpg');";
	$mysqli->query($polecenie);
?>