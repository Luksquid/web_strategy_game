function aktualizacjaOdliczania(godzina) // funkja odliczania
{
	var czas = document.getElementById(godzina);
	if(czas.textContent == '')
	{
		return 0;
	}
	var tablica = czas.textContent.split(":");
	var godziny = parseInt(tablica[0], 10);
	var minuty = parseInt(tablica[1], 10);
	var sekundy = parseInt(tablica[2], 10);
	var id = setInterval(function() {
		sekundy--;
		
		if(sekundy==0 && minuty==0 && sekundy==0)
		{
			clearInterval(id);
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
			clearInterval(id);
		}
		else
			czas.textContent = czasNapis;
	}, 1000);
	  
}