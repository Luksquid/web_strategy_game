<?php
	
	$mysqli = new mysqli("localhost","root","","saga");
	mysqli_set_charset($mysqli, "utf8");
	$id = $_POST['id'];

	if ($mysqli->connect_error) {
		die("Błąd połączenia z bazą danych: " . $mysqli->connect_error);
	}

	$sql = "
		SELECT 
			(SELECT COUNT(p.id) 
				FROM budynek b, gracz g, postac p 
				WHERE b.idGracza = g.id 
				AND p.idBudynkuPracy = b.id 
				AND g.id = '$id' 
				AND b.nazwa = 'dlugiDom') AS 'postaciDlugiDom',
			(SELECT COUNT(b.id)
				FROM budynek b, gracz g
				WHERE b.idGracza = g.id 
				AND g.id = '$id'
				AND b.nazwa = 'port') AS 'budynkiPort',
			(SELECT COUNT(p.id)
				FROM budynek b, gracz g, postac p 
				WHERE b.idGracza = g.id 
				AND p.idBudynkuPracy = b.id 
				AND g.id = '$id' 
				AND b.nazwa = 'port') AS 'postaciPort',
			(SELECT COUNT(l.id)
				FROM budynek b, gracz g, lodz l
				WHERE b.idGracza = g.id 
				AND l.idPortu = b.id 
				AND g.id = '$id') AS 'lodziePort',
			(SELECT COUNT(b.id)
				FROM budynek b, gracz g
				WHERE b.idGracza = g.id 
				AND g.id = '$id'
				AND b.nazwa = 'kuznia') AS 'budynkiKuznia',
			(SELECT COUNT(p.id)
				FROM budynek b, gracz g, postac p 
				WHERE b.idGracza = g.id 
				AND p.idBudynkuPracy = b.id 
				AND g.id = '$id' 
				AND b.nazwa = 'kuznia') AS 'postaciKuznia',
			(SELECT COUNT(b.id)
				FROM budynek b, gracz g
				WHERE b.idGracza = g.id 
				AND g.id = '$id'
				AND b.nazwa = 'farma') AS 'budynkiFarma',
			(SELECT COUNT(p.id)
				FROM budynek b, gracz g, postac p 
				WHERE b.idGracza = g.id 
				AND p.idBudynkuPracy = b.id 
				AND g.id = '$id' 
				AND b.nazwa = 'farma') AS 'postaciFarma',
			(SELECT COUNT(b.id)
				FROM budynek b, gracz g
				WHERE b.idGracza = g.id 
				AND g.id = '$id'
				AND b.nazwa = 'chataDrwala') AS 'budynkiChataDrwala',
			(SELECT COUNT(p.id)
				FROM budynek b, gracz g, postac p 
				WHERE b.idGracza = g.id 
				AND p.idBudynkuPracy = b.id 
				AND g.id = '$id' 
				AND b.nazwa = 'chataDrwala') AS 'postaciChataDrwala',
			(SELECT COUNT(b.id)
				FROM budynek b, gracz g
				WHERE b.idGracza = g.id 
				AND g.id = '$id'
				AND b.nazwa = 'Dom') AS 'budynkiDom',
			(SELECT COUNT(p.id)
				FROM budynek b, gracz g, postac p 
				WHERE b.idGracza = g.id 
				AND p.idDomu = b.id 
				AND g.id = '$id' 
				AND b.nazwa = 'dom') AS 'postaciDom'
		";
	$result = $mysqli->query($sql);

	if ($result) {
		$data = $result->fetch_assoc();
	} else {
		echo "Błąd zapytania: " . $mysqli->error;
	}

	$mysqli->close();
	echo json_encode($data);
?>