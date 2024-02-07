function dodajProces(nrGracza, nrBudynku, czas, nazwaProcesu, liczba, opis) {
	
	function akcja()
	{	
		if (liczba == 0) {
			komunikatPopup('Musisz mieć przydzielonych pracowników aby móc wytwarzać');
			return;
		}
		
		var dane = {
			idBudynku: nrBudynku,
			czasTrwania: czas,
			proces: nazwaProcesu,
			ilosc: liczba,
			procesOpis: opis
		};
		
		$.ajax({
			url: './php/dodajProces.php',
			method: 'POST',
			data: dane,
			success: function () {
				pobierzProces(nrBudynku, nrGracza);
				try 
				{
					pobierzPracownikow(nrBudynku, nrGracza);
				} 
				catch (error) 
				{
					pobierzMieszkancow(nrBudynku, nrGracza);
				}
				
				var infoZasobDrewno = document.getElementById('infoZasobDrewno');
				var infoZasobZelazo = document.getElementById('infoZasobZelazo');
				var infoZasobSkora = document.getElementById('infoZasobSkora');
				var infoZasobWelna = document.getElementById('infoZasobWelna');
				var infoZasobZywnosc = document.getElementById('infoZasobZywnosc');
				
				infoZasobDrewno.innerHTML = parseInt(infoZasobDrewno.innerHTML) - kosztDrewno;
				infoZasobZelazo.innerHTML = parseInt(infoZasobZelazo.innerHTML) - kosztZelazo;
				infoZasobSkora.innerHTML = parseInt(infoZasobSkora.innerHTML) - kosztSkora;
				infoZasobWelna.innerHTML = parseInt(infoZasobWelna.innerHTML) - kosztWelna;
				infoZasobZywnosc.innerHTML = parseInt(infoZasobZywnosc.innerHTML) - kosztZywnosc;
			}
		});
	}
	
	var kosztZelazo = 0;
	var kosztDrewno = 0;
	var kosztSkora = 0;
	var kosztWelna = 0;
	var kosztZywnosc = 0;
	var kosztKotwice = 0;
	
	switch (nazwaProcesu)
	{
		case 'miecze':
			kosztZelazo = liczba * 4;
			kosztDrewno = liczba * 2;
			kosztSkora = liczba * 1;
		break;
		
		case 'topory':
			kosztZelazo = liczba * 2;
			kosztDrewno = liczba * 2;
		break;
		
		case 'tarcze':
			kosztZelazo = liczba * 3;
			kosztDrewno = liczba * 5;
			kosztSkora = liczba * 2;
		break;
		
		case 'hełmy':
			kosztZelazo = liczba * 5;
			kosztSkora = liczba * 4;
			kosztWelna = liczba;
		break;
		
		case 'kotwice':
			kosztZelazo = liczba * 6;
		break;
		
		case 'człowiek':
			kosztZywnosc = 4;
		break;
		
		case 'sneka':
			kosztDrewno = 100;
			kosztWelna = 20;
			kosztZelazo = 2;
			kosztKotwice = 1;
		break;
		
		case 'skeida':
			kosztDrewno = 150;
			kosztWelna = 40;
			kosztZelazo = 4;
			kosztKotwice = 1;
		break;
		
		case 'drakar':
			kosztDrewno = 200;
			kosztWelna = 60;
			kosztZelazo = 6;
			kosztKotwice = 1;
		break;
	}
	
	var dane = {
		idGracza: nrGracza
	}
	
	
	$.ajax({
		url: './php/pobierzInfoOSurowcach.php',
		method: 'POST',
		dataType: 'json',
		data: dane,
		success: function(data){
			if(data.drewno < kosztDrewno || data.zelazo < kosztZelazo || data.skora < kosztSkora || data.welna < kosztWelna || data.zywnosc < kosztZywnosc || data.kotwice < kosztKotwice)
			{
				komunikatPopup('Nie posiadasz wystarczającej liczny surowców');
			}
			else
			{
				dane = {
					idBudynku: nrBudynku
				}
				
				$.ajax({
					url: './php/czyJestProces.php',
					method: 'POST',
					dataType: 'text',
					data: dane,
					success: function(data){
						if(data != '')
						{
							komunikatPopup('Budynek obecnie wytwarza');
							return 0;
						}
						else
						{
							akcja();
						}
					}
				});				
			}
		}
	});
}
