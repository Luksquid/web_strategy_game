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
	<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script><link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
	<link href="https://fonts.googleapis.com/css2?family=Metamorphous&display=swap" rel="stylesheet">
	<style>
		#zawartosc 
		{
			width: 830px;
			height: 500px;
			padding: 40px;
			color: #ffffff;
			float: none;
			background-color: transparent;
			font-family: 'Spectral', serif;
			margin-left: auto;
			margin-right: auto;
		}
	</style>
</head>

<body>

	<?php
		session_start();
		if (isset($_SESSION['id']))
		{
			unset($_SESSION['id']);
		}
	?>
	
	<div id="glownyDiv">
		
		<div id="tytul">
			Saga
		</div>
		
		<div id="opis">
			Zapraszamy do fascynującego świata gry strategiczno-symulacyjnej, gdzie możesz zanurzyć się w epokę wikingów i stworzyć swoją własną osadę. W tej niezwykłej grze. Twoim zadaniem jest nie tylko przetrwać w surowym środowisku, ale także rozwijać swoją osadę, uczestnicząc w strategicznych decyzjach i ekonomicznych wyzwaniach. Rozpoczynając jako mała osada, masz możliwość eksplorować terytoria, zdobywać surowce i budować imponujące struktury.
		</div>
		
		<div id="zawartosc">
			
			<div id="formularzRejestracji">
			
				<form id="rejestracja" method="POST" action="./php/rejestracja.php">
				
					<input type="email" id="rEmail" name="rEmail" placeholder="Email" onfocus="this.placeholder=''" onblur="this.placeholder='Email'" >
					<br>
					<input type="text" id="rImie" name="rImie" placeholder="Imię" onfocus="this.placeholder=''" onblur="this.placeholder='Imię'" >
					<br>
					<input type="password" id="rHaslo" name="rHaslo" placeholder="Hasło" onfocus="this.placeholder=''" onblur="this.placeholder='Hasło'" >
					<br>
					<input type="password" id="rHaslo2" name="powtorzHaslo" placeholder="Powtórz hasło" onfocus="this.placeholder=''" onblur="this.placeholder='Powtórz hasło'" >
					<br>
					<input type="submit" id="zarejestruj" value="Zarejestruj">
					
				</form>
				
			</div>
			
			<div id="formularzLogowania">
				
				<form id="logowanie" method="POST" action="./php/logowanie.php">
				
					<input type="email" id="lEmail" name="lEmail" placeholder="Email" onfocus="this.placeholder=''" onblur="this.placeholder='Email'" >
					<br>
					<input type="password" id="lHaslo" name="lHaslo" placeholder="Haslo" onfocus="this.placeholder=''" onblur="this.placeholder='Haslo'" >
					<br>
					<input type="submit" id="zaloguj" value="Zaloguj">
					
				</form>
				
			</div>
			
		</div>
		
	</div>
	
	<script>
		document.body.style.margin = "0";
	</script>
	
	<script src = "./js/komunikatPopup.js"></script>	
	<script src="./js/obslugaBledow.js"></script>

	<script>
		document.body.style.backgroundImage = 'none';
		document.body.style.backgroundImage = 'linear-gradient(50deg, #151426, #2386b3)';
		setTimeout(
			function() {
				var blad = "<?php echo isset($_SESSION['blad']) ? $_SESSION['blad'] : '0'; ?>";
				if(blad == "1")
				{
					komunikatPopup("Podany email lub hasło jest niepoprawne");
					<?php unset($_SESSION['blad']); ?>
				}
				var zarejestrowano = "<?php echo isset($_SESSION['zarejestrowano']) ? $_SESSION['zarejestrowano'] : '0'; ?>";
				if(zarejestrowano == "1")
				{
					komunikatPopup("Rejestracja przebiegła pomyślnie");
					<?php unset($_SESSION['zarejestrowano']) ?>
				}
		}, 10);
	</script>
	
</body>