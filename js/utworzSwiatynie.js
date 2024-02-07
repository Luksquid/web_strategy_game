function dodajNowyBudynek(idGracza)
{	
	var drewno = document.getElementById('infoZasobDrewno').innerHTML;
	var welna = document.getElementById('infoZasobWelna').innerHTML;
	var zelazo = document.getElementById('infoZasobZelazo').innerHTML;
	var zloto = document.getElementById('infoZasobZloto').innerHTML;
	if(drewno < 150 || welna < 50 || zelazo < 8 || zloto < 10)
		komunikatPopup("Nie posiadasz wystarczającej liczby surowców do stworzenia tego budyku");
	else
	{
		var dane = {
			id: idGracza,
			nazwa: 'swiatynia'
		}

		$.ajax({
			url: './php/utworzNowyBudynek.php',
			method: 'POST',
			data: dane,
			success: function(){
				$.ajax({
					url: './php/czyJestSwiatynia.php',
					dataType: 'text',
					method: 'POST',
					data: {id: idGracza},
					success: function(data) {
						window.location.href = "./glowna.php?idp=swiatynia&id="+data;
					}
				});
			},
			error: function(xhr, status, error) {
				console.error('Błąd!', xhr, status, error);

				// Dodatkowe informacje o błędzie
				console.log('Status: ' + xhr.status);
				console.log('Odpowiedź serwera: ' + xhr.responseText);
			}
		});
	}
}

function utworzSwiatynie(idGracza)
{
	var nowy = document.createElement('div');
	var obrazek = document.createElement('img');
	var zawartosc = document.getElementById('zawartosc');
	zawartosc.innerHTML = '';
	obrazek.src = './img/ikony/plus.png';
	obrazek.width = '90';
	obrazek.height = '90';
	obrazek.style.cssFloat = 'left';
	obrazek.style.marginRight = '50px';
	nowy.id = 'nowaSwiatynia';
	nowy.appendChild(obrazek);
	
	var linia = document.createTextNode("Utwórz nowy budynek");
	var odstep = document.createElement('br'); 
	var koszt = document.createTextNode("Koszt: 120 drewno | 20 wełna | 8 żelazo | 10 złoto");

	nowy.appendChild(linia);
	nowy.appendChild(odstep);
	nowy.appendChild(koszt);
	nowy.onclick = function() {
		dodajNowyBudynek(idGracza);
	};
	zawartosc.appendChild(nowy);
}	