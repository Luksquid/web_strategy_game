function zakonczProces(nrBudynku)
{
	var dane = {
		idBudynku: nrBudynku
	};

	var budynekPostep = document.getElementById('budynekPostep');

	budynekPostep.innerHTML = `
		<div id='licznik'>
			<div id='srodek'>
				<div id='numer'></div>
			</div>
			<svg xmlns='http://www.w3.org/2000/svg' version='1.1' width='184px' height='184px'>
				<defs>
					<linearGradient id='GradientColor'>
						<stop offset='0%' stop-color='#ff6d12' />
						<stop offset='100%' stop-color='#fce61e' />
					</linearGradient>
				</defs>
				<circle cx='92' cy='92' r='66.3' stroke-linecap='butt' stroke='url(#GradientColor)' fill='none' />
			</svg>
		</div>
		<div id='postepProdukt'>Brak wytwarzania</div>`;

	$.ajax({
		url: './php/zakonczProces.php',
		method: 'POST',
		data: dane
	});
}

function porownajDaty(data) 
{
	const dataObj = new Date(data);

	const teraz = new Date();
	
	const dataUTC = dataObj.toUTCString();
	
	const terazUTC = teraz.toUTCString();
	
	return Date.parse(dataUTC) < Date.parse(terazUTC);
}

function przyciskOdbierz(nrBudynku, nrGracza)
{
	var budynekPostep = document.getElementById('budynekPostep');
	function odbierz()
	{			
		var numer = document.getElementById('numer');
		numer.innerHTML = '';
		
		var kolo = document.querySelector('circle');
		kolo.style.strokeDashoffset = 472;
		
		var dane = {
			idBudynku: nrBudynku,
			idGracza: nrGracza
		}
		
		var postepProdukt = document.getElementById('postepProdukt');
		
		postepProdukt.innerHTML = "Brak wytwarzania";
		$.ajax({
			url: './php/odbierzProdukt.php',
			dataType: 'json',
			method: 'POST',
			data: dane,
			success: function(data) {
				var produkt = data.nazwa;
				var ilosc = data.ilosc;
				switch (produkt) 
				{
					case 'wełna':
						var welna = document.getElementById('infoZasobWelna');
						var zywnosc = document.getElementById('infoZasobZywnosc');
						zywnosc.innerHTML = parseInt(zywnosc.innerHTML) + (parseInt(ilosc) * 1.5);
						welna.innerHTML = parseInt(welna.innerHTML) + parseInt(ilosc);
						pobierzPracownikow(nrBudynku, nrGracza);
					break;
					
					case 'skóra':
						var skora = document.getElementById('infoZasobSkora');
						var zywnosc = document.getElementById('infoZasobZywnosc');
						zywnosc.innerHTML = parseInt(zywnosc.innerHTML) + (parseInt(ilosc) * 3);
						skora.innerHTML = parseInt(skora.innerHTML) + parseInt(ilosc);
						pobierzPracownikow(nrBudynku, nrGracza);
					break;
					
					case 'żywność':
						var zywnosc = document.getElementById('infoZasobZywnosc');
						zywnosc.innerHTML = parseInt(zywnosc.innerHTML) + parseInt(ilosc);
						pobierzPracownikow(nrBudynku, nrGracza);
					break;
					
					case 'drewno':
						var drewno = document.getElementById('infoZasobDrewno');
						drewno.innerHTML = parseInt(drewno.innerHTML) + parseInt(ilosc);
						pobierzPracownikow(nrBudynku, nrGracza);
					break;
					
					case 'łaskaBogów':
						var laska = document.getElementById('infoZasobLaskoBogow');
						laska.innerHTML = parseInt(laska.innerHTML) + parseInt(ilosc);
						pobierzPracownikow(nrBudynku, nrGracza);
					break;
					
					case 'człowiek':
						pobierzMieszkancow(nrBudynku, nrGracza);
					break;
					
					default:
						pobierzPracownikow(nrBudynku, nrGracza);
					break;
				}
				var zakonczProcesPrzycisk = document.getElementById('zakonczProcesPrzycisk');
				zakonczProcesPrzycisk.remove();
			}
		});
		
		var budynekPostep = document.getElementById('budynekPostep');
		budynekPostep.removeEventListener('click', odbierz);
		budynekPostep.removeEventListener('mouseenter', zmianaWygladu);
		function zmianaWygladu() 
		{	
			budynekPostep.style.cursor = 'default';
		}
		budynekPostep.addEventListener('mouseenter', zmianaWygladu);
	}
	function zmianaWygladu() 
	{	
		budynekPostep.style.cursor = 'pointer';
	}
	budynekPostep.addEventListener('mouseenter', zmianaWygladu);
	budynekPostep.addEventListener('click', odbierz);
	
	var kolo = document.querySelector('circle');
	
}

function aktualizacjaOdliczania(godzina, idGracza, idBudynku, stop)
{
	
	if(porownajDaty(stop))
	{
		var numer = document.getElementById('numer');
		var kolo = document.querySelector('circle');
		numer.innerHTML = 'Odbierz';
		przyciskOdbierz(idBudynku, idGracza);
		kolo.style.strokeDashoffset = 0;
		return 0;
	}
	
	var czas = document.getElementById(godzina);
	if(czas.textContent == '')
	{
		return 0;
	}
	var tablica = czas.textContent.split(":");
	var godziny = parseInt(tablica[0], 10);
	var minuty = parseInt(tablica[1], 10);
	var sekundy = parseInt(tablica[2], 10);
	postepOdliczanie = setInterval(function() {
		sekundy--;
		
		if(sekundy==0 && minuty==0 && sekundy==0)
		{
			clearInterval(postepOdliczanie);
		}

		if (sekundy < 0)
		{
			sekundy = 59;
			minuty--;

			if (minuty < 0)
			{
				minuty = 59;
				godziny--;
			}
		}

		
		var czasNapis = godziny.toString().padStart(2, '0') + ":" + minuty.toString().padStart(2, '0') + ":" + sekundy.toString().padStart(2, '0');
		
		if(czasNapis == '00:00:00')	
		{
			czas.textContent = "Odbierz";
			przyciskOdbierz(idBudynku, idGracza);
			clearInterval(odliczanie);
		}
		else
			czas.textContent = czasNapis;
	}, 1000);
	  
}

function pobierzProces(idBudynku, idGracza) 
{ 

	var dane = {
		id: idBudynku
	}
	
	function aktualizacjaPaska(interwal)
	{
		var kolo = document.querySelector('circle');
		var odliczanie = setInterval(function() {
			kolo.style.strokeDashoffset = (parseInt(kolo.style.strokeDashoffset) - 1).toString();
			if((parseInt(kolo.style.strokeDashoffset) - 1).toString() == 0)
			{
				clearInterval(odliczanie);
			}
		}, interwal * 1000);
	}
	$.ajax({
		url: './php/pobierzInfoOProcesie.php',
		dataType: 'json',
		method: 'POST',
		data: dane,
		success: function(data) {
			var kolo = document.querySelector('circle');
			var numer = document.getElementById('numer');
			var postepProdukt = document.getElementById('postepProdukt');
			var zakonczProcesPrzycisk = document.createElement('span');
			zakonczProcesPrzycisk.id = 'zakonczProcesPrzycisk';
			zakonczProcesPrzycisk.innerHTML = '&times;'
			var nrBudynku = idBudynku;
			zakonczProcesPrzycisk.addEventListener('click', function() {
				zakonczProces(nrBudynku);
				if(data.proces != 'człowiek')
					pobierzPracownikow(nrBudynku, nrGracza);
				else
					pobierzMieszkancow(nrBudynku, nrGracza);
			});
			if(data.proces != null)
				budynekPostep.insertBefore(zakonczProcesPrzycisk, licznik);
			if(data.ileRazem == data.ileZostalo)
				var procent = 472;
			else
				var procent = (data.ileZostalo / data.ileRazem) * 472;
			var interwal = data.ileRazem/472;
			var ileZostalo = data.ileZostalo;
			kolo.style.strokeDashoffset = procent;
			ileZostalo = ileZostalo - interwal;
			if(data.proces)
			{
				postepProdukt.innerHTML = 'Proces: ' + data.proces;
				numer.innerHTML = data.czas;
				aktualizacjaOdliczania('numer', idGracza, idBudynku, data.procesStop);
			}
			else
			{
				postepProdukt.innerHTML = 'Brak wytwarzania';
				numer.innerHTML = '';
			}
			if(ileZostalo > 0)
			{
				aktualizacjaPaska(interwal);
			}
		}
	});
}