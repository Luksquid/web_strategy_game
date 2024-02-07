<div id='budynekPostaci' style='height: 580px;'>

</div>

<div id='dlugiDomMenu'>
	
	<div id='zbrojownia'>
		<div class="infoZasob" style='padding: 5px;'>
			
			<img src="./img/ikony/helm.png" width="35" height="35" style="float: left; margin: 2px 5px 5px 5px;">
			<div class="infoZasobIlosc" id="infoZasobHelm"></div>
			
		</div>
		
		<div class="infoZasob" style='padding: 5px;'>
			
			<img src="./img/ikony/tarcza.png" width="35" height="35" style="float: left; margin: 2px 5px 5px 5px;">
			<div class="infoZasobIlosc" id="infoZasobTarcza"></div>
			
		</div>

		<div class="infoZasob" style='padding: 5px;'>
			
			<img src="./img/ikony/miecz.png" width="35" height="35" style="float: left; margin: 2px 5px 5px 5px;">
			<div class="infoZasobIlosc" id="infoZasobMiecz"></div>
			
		</div>
		
		<div class="infoZasob" style='padding: 5px;'>
			
			<img src="./img/ikony/topor.png" width="35" height="35" style="float: left; margin: 2px 5px 5px 5px;">
			<div class="infoZasobIlosc" id="infoZasobTopor">234</div>
			
		</div>
	</div>
	
	<div>
		<div id='dlugiDomStatystyki'>
			Raport
		</div>
		
		<div id='dlugiDomWyprawy'>
			Wyprawy
		</div>
	</div>
	
<div>

<script src = "./js/edycjaPracownikow.js"></script>
<script src = "./js/przyciskCofnij.js"></script>
<script src = "./js/pobierzUzbrojenie.js"></script>	
<script src = "./js/pobierzStatystykiOsady.js"></script>	
<script src = "./js/pokazSurowce.js"></script>	
<script src = "./js/pobierzWyprawy.js"></script>	

<script>
	var nrBudynku = '<?php echo $_GET['id']?>';
	var nrGracza = '<?php echo $_SESSION['id']?>';
	var nazwaBudynku = '<?php echo $_GET['idp']?>';
	
	pobierzPracownikow(nrBudynku, nrGracza, nazwaBudynku);
	pobierzUzbrojenie();

	var staty = document.getElementById('dlugiDomStatystyki');
	staty.onclick = function(event) {
		pobierzStatystykiOsady(nrGracza);
	}
	
	var wyprawy = document.getElementById('dlugiDomWyprawy');
	wyprawy.onclick = function(event) {
		pobierzWyprawy(nrGracza, nrBudynku);
	}
</script>