function wyswietlStatystyki(idPostaci)
{
	var popup = document.createElement('div');
	var popupStatystykiMieszkanca = document.createElement('div');
	var zawartosc = document.getElementById('zawartosc');
	var popupZamknij = document.createElement('span');
	
	
	$.ajax({
		url: './php/pobierzInfoOPostaci.php',
		method: 'POST',
		dataType: 'json',
		data: {idPostaci: idPostaci},
		success: function(data) {
			popup.style.display = 'block';
			popup.className = 'popup';
			popup.id = 'popupStatystyki';
			popupStatystykiMieszkanca.className = 'popupStatystyki';
			popupStatystykiMieszkanca.id = 'popupStatystykiId';
			popupZamknij.className = 'popupStatystykiZamknij';
			popupZamknij.id = 'zamknij';
			popupZamknij.innerHTML = 'Zamknij';
			
			var lewyDiv = document.createElement('div');
			var prawyDiv = document.createElement('div');
			var portret = document.createElement('img');
			
			var imie = document.createElement('div');
			var sila = document.createElement('div');
			var zwinnosc = document.createElement('div');
			var hp = document.createElement('div');
			var plec = document.createElement('div');
			
			imie.className = 'popupStatystykiTekst';
			sila.className = 'popupStatystykiTekst';
			zwinnosc.className = 'popupStatystykiTekst';
			hp.className = 'popupStatystykiTekst';
			plec.className = 'popupStatystykiTekst';
			
			portret.src = '.'+data.grafika;
			portret.className = 'popupStatystykiImg';
			
			if(data.plec == 'mezczyzna')
			{
				plec.innerHTML = 'Płeć: mężczyzna';
				imie.innerHTML = data.imie + ' ' + data.imieOjca + 'sson';
			}
			else
			{
				plec.innerHTML = 'Płeć: kobieta';
				imie.innerHTML = data.imie + ' ' + data.imieOjca + 'sdotter';
			}
			
			sila.innerHTML = 'Siła: ' + data.sila;
			zwinnosc.innerHTML = 'Zwinność: ' + data.zwinnosc;
			hp.innerHTML = 'Hp: ' + data.hp + '/' + data.maxHp;
			
			lewyDiv.className = 'popupStatystykiDiv';
			prawyDiv.className = 'popupStatystykiDiv';
			prawyDiv.style.marginLeft = '40px';
			
			lewyDiv.appendChild(portret);
			prawyDiv.appendChild(imie);
			prawyDiv.appendChild(plec);
			
			prawyDiv.appendChild(hp);
			prawyDiv.appendChild(sila);
			prawyDiv.appendChild(zwinnosc);
			
			popupZamknij.addEventListener('click', function() {
				popup.remove();
			});
		
			prawyDiv.appendChild(popupZamknij);
			popupStatystykiMieszkanca.appendChild(lewyDiv);
			popupStatystykiMieszkanca.appendChild(prawyDiv);
			popup.appendChild(popupStatystykiMieszkanca);
			zawartosc.appendChild(popup);
		}
	});
	

}

function dodajMieszkanca(IdPosataci, IdBudynku, IdGracza)
{
	
	dane = {
		idPostaci: IdPosataci,
		idBudynku: IdBudynku
	}
	
	$.ajax({
		url: './php/dodajMieszkanca.php',
		method: 'POST',
		data: dane,
		success: function() {
			var popup = document.getElementById('popupDodajMieszkanca');
			popup.remove();
			pobierzMieszkancow(IdBudynku, IdGracza)
		}
	});
}

function wyswietlPostaci(idGracza, idBudynku)
{
	function wyswietlPopup()
	{
		var popup = document.createElement('div');
		var popupMieszkancy = document.createElement('div');
		var zawartosc = document.getElementById('zawartosc');
		var popupZamknij = document.createElement('span');
		
		popup.style.display = 'block';
		popup.className = 'popup';
		popup.id = 'popupDodajMieszkanca';
		popupMieszkancy.className = 'popupMieszkancy';
		popupMieszkancy.id = 'popupMieszkancyId';
		popupMieszkancy.innerHTML = "<span style='font-size: 24px;'>Wybierz osobę</span>";
		popupZamknij.className = 'popupZamknij';
		popupZamknij.id = 'zamknij';
		popupZamknij.innerHTML = '&times;';
		popupZamknij.addEventListener('click', function() {
			popup.remove();
		});
		popupMieszkancy.appendChild(popupZamknij);
		popup.appendChild(popupMieszkancy);
		zawartosc.appendChild(popup);
	}
	
	var dane = {
		id: idGracza
	}
	
	$.ajax({
		url: './php/pobierzInfoOBezdomnych.php',
		dataType: 'json',
		method: 'POST',
		data: dane,
		success: function (data) {
			if(data.length == 0)
			{
				komunikatPopup('Brak wolnych postaci');
				return 0;
			}
			wyswietlPopup();
			var glownyDiv = document.getElementById('popupMieszkancyId');
			for (var i = 0; i < data.length; i++) {
				const row = data[i];
				var postac = document.createElement('div');
				var postacObraz = document.createElement('img');
				var postacImie = document.createElement('div');
				postac.className = 'budynekPostac2';
				postac.id = row.id + 'p';
				postac.style.marginLeft = '10px';
				postacObraz.src = '.' + row.grafika;
				postacObraz.className = 'budynekPostacObraz';
				postacImie.className = 'budynekPostacImie';
				postacImie.textContent = row.imie;
				postac.appendChild(postacObraz);
				postac.appendChild(postacImie);
				glownyDiv.appendChild(postac);

				(function (idPostaci, idBudynku, idGracza) {
					postac.addEventListener('click', function () {
						dodajMieszkanca(idPostaci, idBudynku, idGracza);
					});
				})(row.id, idBudynku, idGracza);
			}
		}
	});

}

function usunMieszkanca(idPracownika, idBudynku, idGracza)
{
	var dane = {
		idPostaci: idPracownika
	}
	
	$.ajax({
		url: './php/usunMieszkanca.php',
		method: 'POST',
		data: dane,
		success: function() {
			pobierzMieszkancow(idBudynku, idGracza);
		}
	});
}

function pobierzMieszkancow(idBudynku, idGracza) {
	var dane = {
		id: nrBudynku
	}
	
	document.getElementById('budynekPostaci').innerHTML = '<center>Postaci</center>';
	
	
	$.ajax({
		url: './php/pobierzInfoOMieszkancach.php',
		dataType: 'json',
		method: 'POST',
		data: dane,
		success: function (data) {
			
			var iloscPracownikow = data.length;
			
			$.ajax({
				url: './php/pobierzInfoONazwieBudynku.php',
				dataType: 'json',
				method: 'POST',
				async: false, 
				data: dane,
				success: function(data){
					var iloscMiejsc = 0;
					if(data.nazwa == 'dom')
					{
						var iloscMiejsc = 5;
						wyswietlProcesyDom(idBudynku, idGracza);
					}
					
					if(iloscPracownikow<iloscMiejsc)
					{
						var dodajMieszkanca = document.createElement('div');
						var ikonaPlus = document.createElement('img');
						var napisDodaj = document.createElement('p');
						var glownyDiv = document.getElementById('budynekPostaci');
				
						dodajMieszkanca.id = 'nowyMieszkaniec';
						ikonaPlus.src = './img/ikony/plus.png';
						ikonaPlus.id = 'dodajMieszkancaIkona';
						napisDodaj.textContent = 'Przydziel postać';
						napisDodaj.id = 'budynekPostacKomunikat';
						dodajMieszkanca.appendChild(ikonaPlus);
						dodajMieszkanca.appendChild(napisDodaj);
						dodajMieszkanca.addEventListener('click', function() {
							if(data.proces == '' || data.proces == undefined)
							{
								wyswietlPostaci(idGracza, idBudynku);
							}
							else
							{	
								komunikatPopup('Nie można dodawać postaci podczas oczekiwania na dziecko');
							}
								
						});
						glownyDiv.appendChild(dodajMieszkanca);
					}
				}
			});
			for (var i = 0; i < data.length; i++) {
				const row = data[i];
				var postac = document.createElement('div');
				var postacObraz = document.createElement('img');
				var postacImie = document.createElement('div');
				var minusDiv = document.createElement('img');
				var glownyDiv = document.getElementById('budynekPostaci');
				postac.className = 'budynekPostac';
				postac.id = 'postac' + row.id;
				postacObraz.src = '.' + row.grafika;
				postacObraz.className = 'budynekPostacObraz'; 
				postacImie.className = 'budynekPostacImieDom';
				postacImie.textContent = row.imie;
				postacImie.onclick = function(event) {
					wyswietlStatystyki(row.id);
				}
				minusDiv.src = './img/ikony/minus.png';
				minusDiv.className = 'usunMieszkanca';
				minusDiv.id = row.id + 'u';
				minusDiv.onclick = function(event) {
				    var id = event.target.id; 
					var idNr = id.slice(0, -1);
					
					var nrBudynku = idBudynku;
					dane = {
						idBudynku: nrBudynku
					}
					
					$.ajax({
						url: './php/czyJestProces.php',
						method: 'POST',
						dataType: 'text',
						data: dane,
						success: function(data){
							if(data == '')
								usunMieszkanca(idNr, dane.idBudynku, idGracza);
							else
								komunikatPopup('Nie można usuwać pracownków podczas wytwarzania');
						}
					});
				};

				postac.appendChild(postacObraz);
				postac.appendChild(postacImie);
				postac.appendChild(minusDiv);
				glownyDiv.appendChild(postac);
			}
		}
	});
}