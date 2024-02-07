<?php
	$mysqli = new mysqli("localhost","root","","saga");
	mysqli_set_charset($mysqli, "utf8");
	$id = $_POST['id'];

	if ($mysqli->connect_error) {
		die("Błąd połączenia z bazą danych: " . $mysqli->connect_error);
	}

	$sql = "SELECT COUNT(id) AS id FROM budynek WHERE nazwa='swiatynia' AND idGracza='$id';";
		
	$result = $mysqli->query($sql);
	$data = $result->fetch_assoc(); 

	if($data['id'] == 0)
	{
		echo $data['id'];
		$mysqli->close();
	}
	else
	{
		$sql2 = "SELECT id FROM budynek WHERE nazwa='swiatynia' AND idGracza='$id';";
		$result2 = $mysqli->query($sql2);
		$data2 = $result2->fetch_assoc(); 
		echo $data2['id'];
		$mysqli->close();
	}
?>