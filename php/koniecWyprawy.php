<?php
	
	$mysqli = new mysqli("localhost","root","","saga");
	mysqli_set_charset($mysqli, "utf8");
	$idGracza = $_POST['idGracza'];
	$polecenie = "UPDATE budynek SET procesStart = null, procesStop = null, proces = null WHERE idGracza=$idGracza AND nazwa='dlugiDom';";
	$mysqli->query($polecenie);
?>