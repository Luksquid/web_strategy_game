<?php
	
	$mysqli = new mysqli("localhost","root","","saga");
	mysqli_set_charset($mysqli, "utf8");
	
	$idBudynku = $_GET['id'];
	$nazwaBudynku = $_GET['idp'];
	$idGracza = $_SESSION['id'];
	
	$sql = "SELECT id FROM budynek WHERE id = $idBudynku AND idGracza = $idGracza AND nazwa = '$nazwaBudynku' LIMIT 1;";
		
	$result = $mysqli->query($sql);
	$data = $result->fetch_assoc(); 

	$mysqli->close();
	if($data['id'] == '')
	{
		header("Location: ./glowna.php?idp=chataDrwalaMenu");
		exit;
	}
?>

<div style="float: left; margin: -15px 20px 15px -15px;">

	<img src='./img/budynki/chataDrwala.jpg' id='budynekGrafika'></img>
	
	<div id='budynekPostep'>
		<div id='licznik'>
			<div id='srodek'>
				<div id='numer'></div>
			</div>
		
			<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="184px" height="184px">
				<defs>
					<linearGradient id="GradientColor">
						<stop offset="0%" stop-color="#ff6d12" />
						<stop offset="100%" stop-color="#fce61e" />
					</linearGradient>
				</defs>
				<circle cx="92" cy="92" r="66.3" stroke-linecap="butt" stroke="url(#GradientColor)" fill="none" />

			</svg>
		</div>
		
		<div id='postepProdukt'>
			Brak wytwarzania
		</div>
		
	</div>
	
	<div id='budynekPostaci'>
		
	</div>
</div>

<div style='float: left; margin-top: -15px;'>

	<div id='budynekProcesy'></div>

	<div id='usunBudynek'>
		<img src='./img/ikony/minus.png' id='ikonaUsunBudynek'></img>
		<p style='float: left; margin: 30px 0 0 30px; '>Usuń budynek</p>
	</div>
	
</div>
	
<script src = "./js/dodajProces.js"></script>	
<script src = "./js/edycjaPracownikow.js"></script>
<script src = "./js/obslugaPaskaPostepu.js"></script>
<script src = "./js/przyciskCofnij.js"></script>	
<script src = "./js/usunBudynek.js"></script>	
<script src = "./js/wyswietlProcesy.js"></script>

<script>
	var nrBudynku = '<?php echo $_GET['id']?>';
	var nrGracza = '<?php echo $_SESSION['id']?>';
	pobierzPracownikow(nrBudynku, nrGracza);
	pobierzProces(nrBudynku, nrGracza);
	
	var usunBudynek = document.getElementById('usunBudynek');
	usunBudynek.addEventListener('click', function() {
		usunBudynekPopup(nrBudynku)
	});
	
</script>

