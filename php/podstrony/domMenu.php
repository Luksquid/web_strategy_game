<div id="nowyBudynek" onclick="dodajNowyBudynek()">
	<img src="./img/ikony/plus.png" width="90" height="90" style="float: left; margin-right: 50px;">
	Utwórz nowy budynek
	<br>
	Koszt: 30 drewno | 12 wełna | 1 żelazo
</div>
<script src = "./js/przyciskCofnij.js"></script>
<script src = "./js/aktualizacjaOdliczania.js"></script>

<script>
	
	function pobierzBudynki() { //pobieranie informacji do menu oraz włączenie aktualizacji odliczania

		var dane = {
			id: '<?php echo $_SESSION['id']?>',
			nazwa: 'dom'
		}
		
		$.ajax({
			url: './php/pobierzInfoOBudynku.php',
			dataType: 'json',
			method: 'POST',
			data: dane,
			success: function(data) {
				for (let i = 0; i < data.length; i++) {
					const row = data[i];
					var cel = document.getElementById("nowyBudynek");
				
					var div = document.createElement("div");
					var czas = document.createElement("strong");
					var link = document.createElement("a");
					var nr = i + 1;
					
					czas.id = "czas"+row.id;
					if(row.czas==null)
						czas.textContent = '';
					else if(row.czas[0]=='-' && row.czas != null)
						czas.textContent = "Odbierz";
					else
						czas.textContent = row.czas;

					if(!row.proces)
						var proces = 'brak';
					else
						var proces = row.proces
					
					div.textContent = "Nr: " + nr + "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0Proces: " + proces + "\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0";
					div.appendChild(czas);
					
					div.className = "MenuBudynek";
					
					link.href = "./glowna.php?idp=dom&id="+row.id;
					link.className = "link";
					link.appendChild(div);
					
					cel.insertAdjacentElement("afterend", link);
					
					if(row.czas != null)
					{
						if(row.czas[0]!='-')
						{
							aktualizacjaOdliczania("czas"+row.id);
						}
					}
				}
			}
		});
	}

	pobierzBudynki();

	function dodajNowyBudynek()
	{	
		var drewno = document.getElementById('infoZasobDrewno').innerHTML;
		var welna = document.getElementById('infoZasobWelna').innerHTML;
		var zelazo = document.getElementById('infoZasobZelazo').innerHTML;
		if(drewno < 30 || welna < 12 || zelazo < 1)
			alert("Nie posiadasz wystarczającej liczby surowców do stworzenia tego budyku");
		else

			dane = {
				id: '<?php echo $_SESSION['id']?>',
				nazwa: 'dom'
			};

			$.ajax({
				url: './php/utworzNowyBudynek.php',
				dataType: 'json',
				method: 'POST',
				data: dane,
				success: function(data){
					alert(data.odpowiedz);
					location.reload();
				}
			});
	}
</script>