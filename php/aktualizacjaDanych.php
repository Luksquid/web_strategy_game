<?php
	$mysqli = new mysqli("localhost","root","","saga");
	mysqli_set_charset($mysqli, "utf8");
	$idGracza = $_POST['idGracza'];

	$sql0 = "
		SELECT DATEDIFF(CURDATE(), ostatnieLogowanie) AS 'roznica'
			FROM gracz
			WHERE id = $idGracza;
	";
	
	$result0 = $mysqli->query($sql0);
	$data0 = $result0->fetch_assoc();
	$roznica = $data0['roznica'];
	
	if($roznica > 0)
	{
		$sql = "
			SET @niedobory = (
			SELECT
				CASE
					WHEN logowanie.roznica > 7 THEN m.żywność - (ludzie.populacja * 7)
					WHEN logowanie.roznica <= 7 THEN m.żywność - (ludzie.populacja * logowanie.roznica)
				END AS zapasy
			FROM magazyn m
			JOIN (SELECT DATEDIFF(CURDATE(), ostatnieLogowanie) AS roznica FROM gracz WHERE id = $idGracza) AS logowanie ON 1=1
			JOIN (SELECT COUNT(id) AS populacja FROM postac WHERE idGracza = $idGracza) AS ludzie ON 1=1
			WHERE idGracza = $idGracza
			);

			SET @roznica = (
				SELECT DATEDIFF(CURDATE(), ostatnieLogowanie)
				FROM gracz
				WHERE id = $idGracza
			);

			UPDATE magazyn m
			JOIN (SELECT DATEDIFF(CURDATE(), ostatnieLogowanie) AS roznica FROM gracz WHERE id = $idGracza) AS logowanie ON 1=1
			JOIN (SELECT COUNT(id) AS populacja FROM postac WHERE idGracza = $idGracza) AS ludzie ON 1=1
			SET 
				m.żywność = 
					CASE
						WHEN logowanie.roznica <= 7 AND m.żywność > (ludzie.populacja * logowanie.roznica) THEN m.żywność - (ludzie.populacja * logowanie.roznica)
						WHEN logowanie.roznica <= 7 AND m.żywność <= (ludzie.populacja * logowanie.roznica) THEN 0
						WHEN logowanie.roznica > 7 AND m.żywność > (ludzie.populacja * 7) THEN m.żywność - (ludzie.populacja * 7)
						WHEN logowanie.roznica > 7 AND m.żywność <= (ludzie.populacja * 7) THEN 0
						ELSE m.żywność
					END,
				m.łaskaBogów = 
					CASE
						WHEN logowanie.roznica <= 7 AND m.łaskaBogów > 7 THEN m.łaskaBogów - logowanie.roznica
						WHEN logowanie.roznica <= 7 AND m.łaskaBogów <= 7 THEN 0
						WHEN logowanie.roznica > 7 AND m.łaskaBogów > 7 THEN m.łaskaBogów - 7
						WHEN logowanie.roznica > 7 AND m.łaskaBogów <= 7 THEN 0
						ELSE m.łaskaBogów
					END
			WHERE m.idGracza = $idGracza;

			UPDATE postac
			SET hp = 
				CASE 
					WHEN @niedobory <= 0 THEN hp + (FLOOR(@niedobory/@roznica) * 10)
					WHEN @niedobory > 0 THEN hp + (@roznica * 10)
				END
			WHERE idGracza = $idGracza;

			UPDATE postac
			SET hp = LEAST(hp, maxHp)
			WHERE idGracza = $idGracza;

			UPDATE postac
			SET hp = LEAST(hp, maxHp)
			WHERE idGracza = $idGracza;

			DELETE FROM postac 
			WHERE hp<=0 
			AND idGracza = $idGracza;

			DELETE FROM postac 
			WHERE idDomu is NULL
			AND idGracza = $idGracza;

			UPDATE gracz 
			SET ostatnieLogowanie = CURDATE() 
			WHERE id = $idGracza;
		";
		
		$mysqli->multi_query($sql);
	}
	
	$sql2 = "SELECT COUNT(id) populacja FROM postac WHERE idGracza = $idGracza;";
	$result2 = $mysqli->query($sql2);
	$data2 = $result2->fetch_assoc();
	$liczebnoscPopulacji = $data2['populacja'];
	echo $liczebnoscPopulacji;
?>