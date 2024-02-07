<div id="nowyBudynek" onclick="dodajNowyBudynek()">
	<img src="./img/ikony/plus.png" width="90" height="90" style="float: left; margin-right: 50px;">
	Utwórz nowy budynek
	<br>
	Koszt: 80 drewno | 25 wełna | 5 żelazo
</div>

<script src = "./js/przyciskCofnij.js"></script>
<script src = "./js/aktualizacjaOdliczania.js"></script>
<script src = "./js/obslugaBudynkow.js"></script>

<script>
	var nrGracza = '<?php echo $_SESSION['id']?>';
	var idStrony = '<?php echo $_GET['idp']?>';
	var nazwa = idStrony.slice(0, -4);
	
	pobierzBudynki(nrGracza, nazwa);

	var drewno = 80;
	var welna = 25;
	var zelazo = 5;
	var zloto = 0;
	
	var nowyBudynek = document.getElementById('nowyBudynek');
	nowyBudynek.addEventListener('click', function() {
		dodajNowyBudynek(nrGracza, nazwa, drewno, welna, zelazo, zloto);
	});	
	
</script>