<!DOCTYPE html>

<head>
	<meta http-equiv="Content-type" content="text/html; charset=UTF-8"/>
    <title>Saga</title>
	<meta charset="UTF-8">
	<meta http-equiv="Content-Language" content="pl"/>
	<meta name="Author" content="Łukasz Kałamarski"/>
	<meta name="description" content="Saga - strategiczna gra o dawnych normanach"/>
	<link rel="stylesheet" href="./css/style.css" type="text/css"/>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500&family=Spectral&display=swap" rel="stylesheet">
	<script src="./lib/jquery-3.7.1.js"></script>
	<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Metamorphous&display=swap" rel="stylesheet">
</head>

<body>
	<?php
		session_start();
		$mysqli = new mysqli("localhost","root","","saga");
		if (!isset($_SESSION['id']) )
		{
			header("Location: ./index.php");
			exit;
		}
		
		$idGracza = $_SESSION['id'];
		$sql = "SELECT ostatnieLogowanie FROM gracz WHERE id = $idGracza;";
		$result = $mysqli->query($sql);
		$data = $result->fetch_assoc();
		$ostatnieLogowanie = $data['ostatnieLogowanie'];
		if($ostatnieLogowanie == NULL)
		{
			$sql2 = "UPDATE gracz SET ostatnieLogowanie = CURDATE() WHERE id = $idGracza;";
			$mysqli->query($sql2);
		}
	?>
	
	<div id="glownyDiv">
		
		<div id="gornyPasek">
			
			<div id="infoGracz">
				
			</div>

			<div class="infoZasob" style="margin-left: 10px;">
				
				<img src="./img/ikony/drewno.png" height="30" width="35" style="float: left; margin: 5px -5px 5px 5px;">
				<div class="infoZasobIlosc" id="infoZasobDrewno"></div>
				
			</div>			
			
			<div class="infoZasob">
				
				<img src="./img/ikony/welna.png" height="30" style="float: left; margin: 5px 0 5px 10px;">
				<div class="infoZasobIlosc" id="infoZasobWelna"></div>
				
			</div> 

			<div class="infoZasob">
				
				<img src="./img/ikony/zelazo.png" width="35" height="40" style="float: left; margin-left: 10px;">
				<div class="infoZasobIlosc" id="infoZasobZelazo"></div>
				
			</div>

			<div class="infoZasob">
				
				<img src="./img/ikony/skora.png" height="30" width="35" style="float: left; margin: 5px -5px 5px 5px;">
				<div class="infoZasobIlosc" id="infoZasobSkora"></div>
				
			</div>
			
			<div class="infoZasob">
				
				<img src="./img/ikony/zywnosc.png" width="35" height="40" style="float: left; margin: 0 -5px 0 10px;">
				<div class="infoZasobIlosc" id="infoZasobZywnosc"></div>
				
			</div>
			
			<div class="infoZasob">
				
				<img src="./img/ikony/zloto.png" width="35" height="40" style="float: left; margin-left: 10px;">
				<div class="infoZasobIlosc" id="infoZasobZloto"></div>
				
			</div>
		
			<div class="infoZasob">
				
				<img src="./img/ikony/laskaBogow.png" height="30" width="35" style="float: left; margin: 5px -5px 5px 5px;">
				<div class="infoZasobIlosc" id="infoZasobLaskaBogow"></div>
				
			</div>
			
			<a href="./index.php" style="text-decoration: none; color: #000000;">
				<div id="wyloguj">
					Wyloguj
				</div>	
			</a>		
			
		</div>
		
		<div id="pasekBoczny">
			
		</div>

		<div id="zawartosc">		
			
			<?php

				include('./php/podstrony/'.$_GET['idp'].'.php');

			?>
			
		</div>
		
		
	</div>

	<script src = "./js/zmienRozmiarDivaGlowna.js"></script>
	<script src = "./js/komunikatPopup.js"></script>	
	<script src = "./js/pokazSurowce.js"></script>	

	<script>
		document.body.style.margin = "0";
		var nrGracza = '<?php echo $_SESSION['id']?>';
		
		pokazSurowce(nrGracza);
		
		$.ajax({
			url: './php/aktualizacjaDanych.php',
			dataType: 'text',
			method: 'POST',
			data: {idGracza: nrGracza},
			success: function(data) {
				if(data==0)
				{
					$.ajax({
						url: './php/uwstecznijKonto.php',
						method: 'POST',
						data: {idGracza: nrGracza},
						success: function() {
							if(data==0)
							{
								komunikatPopupRel('Nie masz więcej postaci. Twoja gra wraca do stanu początkowego');
							}
						},
						error: function(jqXHR, textStatus, errorThrown) {
							console.error('Błąd:', textStatus, errorThrown);
						}
					});					
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.error('Błąd:', textStatus, errorThrown);
			}
		});
	</script>
</body>