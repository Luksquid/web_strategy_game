function pobierzBudynki(idGracza, nazwa)
{
	var dane = {
		id: idGracza,
		nazwa: nazwa
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
				var czas = document.createElement("span");
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
				
				var divNr = document.createElement('div');
				var divProces = document.createElement('div');
				var divCzas = document.createElement('div');
				
				divNr.className = 'budynekInfo';
				divNr.style.width = '130px';
				divProces.className = 'budynekInfo';
				divProces.style.width = '300px';
				divCzas.className = 'budynekInfo';
				divCzas.style.width = '150px';
				
				divNr.innerHTML = "Nr: " + nr;
				divProces.innerHTML = "Produkcja: " + proces;
				divCzas.appendChild(czas);
				
				div.appendChild(divNr);
				div.appendChild(divProces);
				div.appendChild(divCzas);
				
				div.className = "MenuBudynek";
				
				link.href = "./glowna.php?idp=" + nazwa + "&id="+row.id;
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
		},
		error: function(jqXHR, textStatus, errorThrown) {

        console.error('Wystąpił błąd:', textStatus, errorThrown);
        console.log('Szczegóły błędu:', jqXHR);
		}
	});
}

function dodajNowyBudynek(idGracza, nazwa, kDrewno, kWelna, kZelazo, kZloto)
{	
	var drewno = document.getElementById('infoZasobDrewno').innerHTML;
	var welna = document.getElementById('infoZasobWelna').innerHTML;
	var zelazo = document.getElementById('infoZasobZelazo').innerHTML;
	var zloto = document.getElementById('infoZasobZloto').innerHTML;
	if(drewno < kDrewno || welna < kWelna || zelazo < kZelazo || zloto < kZloto)
		komunikatPopup("Nie posiadasz wystarczającej liczby surowców do stworzenia tego budyku");
	else

		var dane = {
			id: idGracza,
			nazwa: nazwa
		};
		
		$.ajax({
			url: './php/utworzNowyBudynek.php',
			dataType: 'json',
			method: 'POST',
			data: dane,
			success: function(data){
				komunikatPopupRel(data.odpowiedz);
			}
		});
}