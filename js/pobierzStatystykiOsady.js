function pobierzStatystykiOsady(idGracza)
{
	var popup = document.createElement('div');
	var popupStatystykiOsady = document.createElement('div');
	var zawartosc = document.getElementById('zawartosc');
	var popupZamknij = document.createElement('span');
	
	popup.style.display = 'block';
	popup.className = 'popup';
	popup.id = 'popupStatystyki';
	popupStatystykiOsady.className = 'popupStatystykiOsady';
	popupStatystykiOsady.id = 'popupStatystykiId';
	popupStatystykiOsady.style.textAlign = 'left';
	popupZamknij.className = 'popupStatystykiZamknij';
	popupZamknij.id = 'zamknij';
	popupZamknij.innerHTML = 'Zamknij';
	popupZamknij.style.margin = '20px 130px';
	popupZamknij.style.padding = '15px';
	
	popupZamknij.addEventListener('click', function() {
		popup.remove();
	});
	
	$.ajax({
		url: './php/wyswietlStatystyki.php',
		method: 'POST',
		dataType: 'json',
		data: {idGracza: idGracza},
		success: function(data){
			var racje = document.createElement('p');
			var populacja = document.createElement('p');
			var zabudowania = document.createElement('p');
			var sredniaSila = document.createElement('p');
			var sredniaZwinnosc = document.createElement('p');
			var flota = document.createElement('p');
			var miejscaLodzi = document.createElement('p');
			var populacjaHirdu = document.createElement('p');
			var wyprawy = document.createElement('p');
			
			racje.className = 'statystykiOsadyText';
			populacja.className = 'statystykiOsadyText';
			zabudowania.className = 'statystykiOsadyText';
			sredniaSila.className = 'statystykiOsadyText';
			sredniaZwinnosc.className = 'statystykiOsadyText';
			flota.className = 'statystykiOsadyText';
			miejscaLodzi.className = 'statystykiOsadyText';
			populacjaHirdu.className = 'statystykiOsadyText';
			wyprawy.className = 'statystykiOsadyText';
			racje.innerHTML = 'Żywności starczy na ' + data.racje + ' dni';
			populacja.innerHTML = 'Osada posiada ' + data.populacja + ' osób';
			zabudowania.innerHTML = 'Osada składa się z ' + data.zabudowania + ' budynków';
			sredniaSila.innerHTML = 'Średnia siła wojownika: ' + data.sredniaSila;
			sredniaZwinnosc.innerHTML = 'Średnia zwinność wojownika: ' + data.sredniaZwinnosc;
			flota.innerHTML = 'Ilość statków: ' + data.flota;
			miejscaLodzi.innerHTML = 'Liczba miejsc na łodziach: ' + data.miejscaLodzi;
			populacjaHirdu.innerHTML = 'Liczba wojowników w hirdzie: ' + data.populacjaHirdu;
			wyprawy.innerHTML = 'Odbyte wyprawy: ' + data.wyprawy;
			
			popupStatystykiOsady.appendChild(racje);
			popupStatystykiOsady.appendChild(populacja);
			popupStatystykiOsady.appendChild(zabudowania);
			popupStatystykiOsady.appendChild(sredniaSila);
			popupStatystykiOsady.appendChild(sredniaZwinnosc);
			popupStatystykiOsady.appendChild(flota);
			popupStatystykiOsady.appendChild(miejscaLodzi);
			popupStatystykiOsady.appendChild(populacjaHirdu);
			popupStatystykiOsady.appendChild(wyprawy);
					
			popupStatystykiOsady.appendChild(popupZamknij);
			popup.appendChild(popupStatystykiOsady);
			zawartosc.appendChild(popup);
		}
	});
}