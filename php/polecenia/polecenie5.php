<?php
	
	$mysqli = new mysqli("localhost","root","","saga");
	mysqli_set_charset($mysqli, "utf8");
	$idGracza = $_POST['idGracza'];
	$polecenie = "UPDATE magazyn SET złoto=złoto+5 WHERE idGracza='$idGracza';";
	$mysqli->query($polecenie);
?>