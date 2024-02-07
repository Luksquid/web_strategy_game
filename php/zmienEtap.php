<?php
	
	$mysqli = new mysqli("localhost","root","","saga");
	mysqli_set_charset($mysqli, "utf8");
	$idGracza = $_POST['idGracza'];
	$idEtapu = $_POST['idEtapu'];
	
	$sql0 = "SELECT czasTrwania FROM etap WHERE id=$idEtapu;";
	
	$result0 = $mysqli->query($sql0);
	$data0 = $result0->fetch_assoc();
	$czasTrwania = $data0['czasTrwania'];
	
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