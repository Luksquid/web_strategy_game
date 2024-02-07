<img src='./img/budynki/swiatynia.jpg' id='swiatyniaImg'>

<div style='float: left;'>
	<div id='swiatyniaProcesy' style='margin-bottom: 20px;'>

	</div>
	
	<div id='swiatyniaOpis' style="text-align: left; font-family: 'Metamorphous'; font-size: 20px;">
		<div class='procesProg'>
			100 <img src='./img/ikony/laskaBogow.png' class='procesImg' height='30' width='30'> 
		</div>
		<div class='procesOpis'>
			- Twoje statki na pewno nie zatoną
		</div>
		<div class='procesProg'>
			50 <img src='./img/ikony/laskaBogow.png' class='procesImg' height='30' width='30'> 
		</div>
		<div class='procesOpis'>
			- Twoje statki nie zatoną na 70%
		</div>
	</div>
</div>

<script src = "./js/wyswietlProcesy.js"></script>

<script>
	var zawartosc = document.getElementById("zawartosc");
	var pasekBoczny = document.getElementById("pasekBoczny");
	var przyciskCofnij = document.createElement("div");
	zawartosc.style.height = '650px';
	pasekBoczny.style.height = '100vh';
	przyciskCofnij.id = 'przyciskCofnij';
	przyciskCofnij.textContent = 'COFNIJ';
	przyciskCofnij.onclick = function() {
		window.history.back();
	};
	pasekBoczny.appendChild(przyciskCofnij);
</script>

<script src = "./js/utworzSwiatynie.js"></script>

<script>
	var idGracza = '<?php echo $_SESSION['id']?>';
	var idBudynku = '<?php echo $_GET['id']?>';
	if(idBudynku == 0)
	{
		utworzSwiatynie(idGracza);
	}
	else
	{
		wyswietlProcesySwiatynia(idBudynku, idGracza);
	}
</script>

