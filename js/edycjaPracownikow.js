function wyswietlStatystykiWojow(nrPostaci, nrGracza)
{
	var popup = document.createElement('div');
	var popupStatystykiMieszkanca = document.createElement('div');
	var zawartosc = document.getElementById('zawartosc');
	var popupZamknij = document.createElement('span');
	
	
	$.ajax({
		url: './php/pobierzInfoOPostaci.php',
		method: 'POST',
		dataType: 'json',
		data: {idPostaci: nrPostaci},
		success: function(data) {
			popup.style.display = 'block';
			popup.className = 'popup';
			popup.id = 'popupStatystyki';
			popupStatystykiMieszkanca.className = 'popupStatystyki';
			popupStatystykiMieszkanca.id = 'popupStatystykiId';
			popupZamknij.className = 'popupStatystykiZamknij';
			popupZamknij.id = 'zamknij';
			popupZamknij.innerHTML = 'Zamknij';
			popupZamknij.style.marginBottom = '30px';
			
			var lewyDiv = document.createElement('div');
			var prawyDiv = document.createElement('div');
			var portret = document.createElement('img');
			
			var imie = document.createElement('div');
			var sila = document.createElement('div');
			var zwinnosc = document.createElement('div');
			var hp = document.createElement('div');
			var plec = document.createElement('div');
			
			var helmImg = document.createElement('img');
			var tarczaImg = document.createElement('img');
			var mieczImg = document.createElement('img');
			var toporImg = document.createElement('img');
			
			var helmOpcja = document.createElement('div');
			var tarczaOpcja = document.createElement('div');
			var mieczOpcja = document.createElement('div');
			var toporOpcja = document.createElement('div');
			
			var helm = document.createElement('div');
			var tarcza = document.createElement('div');
			var miecz = document.createElement('div');
			var topor = document.createElement('div');
			
			helm.className = 'dlugiDomEkwipunekBlok';
			tarcza.className = 'dlugiDomEkwipunekBlok';
			miecz.className = 'dlugiDomEkwipunekBlok';
			topor.className = 'dlugiDomEkwipunekBlok';
			
			helmImg.src = './img/ikony/helm.png';
			tarczaImg.src = './img/ikony/tarcza.png';
			mieczImg.src = './img/ikony/miecz.png';
			toporImg.src = './img/ikony/topor.png';
			
			helmImg.className = 'dlugiDomEkwipunekImg';
			tarczaImg.className = 'dlugiDomEkwipunekImg';
			mieczImg.className = 'dlugiDomEkwipunekImg';
			toporImg.className = 'dlugiDomEkwipunekImg';
			
			var helmStan = data.helm;
			var tarczaStan = data.tarcza;
			var bronStan = data.bron;
			
			if(helmStan == 0)
				helmOpcja.innerHTML = 'Dodaj';
			else
				helmOpcja.innerHTML = 'Odbierz';
			
			if(tarczaStan == 0)
				tarczaOpcja.innerHTML = 'Dodaj';
			else
				tarczaOpcja.innerHTML = 'Odbierz';
			
			if(bronStan == 0)
			{
				mieczOpcja.innerHTML = 'Dodaj';
				toporOpcja.innerHTML = 'Dodaj';
			}
			else if(bronStan == 'miecz')
			{
				mieczOpcja.innerHTML = 'Odbierz';
				toporOpcja.innerHTML = 'Dodaj';				
			}
			else if(bronStan == 'topór')
			{
				mieczOpcja.innerHTML = 'Dodaj';
				toporOpcja.innerHTML = 'Odbierz';				
			}
			
			tarczaOpcja.addEventListener('click', function() {
				$.ajax({
					url: './php/pobierzInfoOSurowcach.php',
					method: 'POST',
					dataType: 'json',
					data: {idGracza: nrGracza},
					success: function(data2){
						if(data2.tarcze <= 0 && tarczaOpcja.innerHTML == 'Dodaj')
						{
							komunikatPopup('Masz za mało tarcz');
						}
						else
						{
							$.ajax({
								url: './php/uzbrojPostac.php',
								method: 'POST',
								data: {idPostaci: nrPostaci, idGracza: nrGracza, przedmiot: 'tarcza', przedmioty: 'tarcze', wartosc: '1'},
								success: function(){
									if(tarczaOpcja.innerHTML == 'Dodaj')
									{
										tarczaOpcja.innerHTML = 'Odbierz';
									}
									else
									{
										tarczaOpcja.innerHTML = 'Dodaj';
									}
									pobierzUzbrojenie();
								}
							});
						}
					}
				});
			});
			
			helmOpcja.addEventListener('click', function() {
				$.ajax({
					url: './php/pobierzInfoOSurowcach.php',
					method: 'POST',
					dataType: 'json',
					data: {idGracza: nrGracza},
					success: function(data2){
						if(data2.helmy <= 0 && helmOpcja.innerHTML == 'Dodaj')
						{
							komunikatPopup('Masz za mało hełmów');
						}
						else
						{
							$.ajax({
								url: './php/uzbrojPostac.php',
								method: 'POST',
								data: {idPostaci: nrPostaci, idGracza: nrGracza, przedmiot: 'helm', przedmioty: 'hełmy', wartosc: '1'},
								success: function(){
									if(helmOpcja.innerHTML == 'Dodaj')
									{
										helmOpcja.innerHTML = 'Odbierz';
									}
									else
									{
										helmOpcja.innerHTML = 'Dodaj';
									}
									pobierzUzbrojenie();
								}
							});
						}
					}
				});
			});


			mieczOpcja.addEventListener('click', function() {
				$.ajax({
					url: './php/pobierzInfoOSurowcach.php',
					method: 'POST',
					dataType: 'json',
					data: {idGracza: nrGracza},
					success: function(data2){
						if(data2.miecze <= 0 && mieczOpcja.innerHTML == 'Dodaj')
						{
							komunikatPopup('Masz za mało mieczy');
						}
						else
						{
							$.ajax({
								url: './php/uzbrojPostac.php',
								method: 'POST',
								data: {idPostaci: nrPostaci, idGracza: nrGracza, przedmiot: 'bron', przedmioty: 'miecze', wartosc: 'miecz'},
								success: function(){
									if(mieczOpcja.innerHTML == 'Dodaj')
									{
										mieczOpcja.innerHTML = 'Odbierz';
										toporOpcja.innerHTML = 'Dodaj';
									}
									else
									{
										mieczOpcja.innerHTML = 'Dodaj';
									}
									pobierzUzbrojenie();
								}
							});
						}
					}
				});
			});
			
			toporOpcja.addEventListener('click', function() {
				$.ajax({
					url: './php/pobierzInfoOSurowcach.php',
					method: 'POST',
					dataType: 'json',
					data: {idGracza: nrGracza},
					success: function(data2){
						if(data2.topory <= 0 && toporOpcja.innerHTML == 'Dodaj')
						{
							komunikatPopup('Masz za mało toporów');
						}
						else
						{
							$.ajax({
								url: './php/uzbrojPostac.php',
								method: 'POST',
								data: {idPostaci: nrPostaci, idGracza: nrGracza, przedmiot: 'bron', przedmioty: 'topory', wartosc: 'topór'},
								success: function(){
									if(toporOpcja.innerHTML == 'Dodaj')
									{
										toporOpcja.innerHTML = 'Odbierz';
										mieczOpcja.innerHTML = 'Dodaj';
									}
									else
									{
										toporOpcja.innerHTML = 'Dodaj';
									}
									pobierzUzbrojenie();
								}
							});
						}
					}
				});
			});
			
			helmOpcja.className = 'dlugiDomEkwipunekOpcja';
			tarczaOpcja.className = 'dlugiDomEkwipunekOpcja';
			mieczOpcja.className = 'dlugiDomEkwipunekOpcja';
			toporOpcja.className = 'dlugiDomEkwipunekOpcja';
			
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
			helm.appendChild(helmImg);
			helm.appendChild(helmOpcja);
			lewyDiv.appendChild(helm);
			tarcza.appendChild(tarczaImg);
			tarcza.appendChild(tarczaOpcja);
			lewyDiv.appendChild(tarcza);
			prawyDiv.appendChild(imie);
			prawyDiv.appendChild(plec);
			
			prawyDiv.appendChild(hp);
			prawyDiv.appendChild(sila);
			prawyDiv.appendChild(zwinnosc);
			popupZamknij.addEventListener('click', function() {
				popup.remove();
			});
			prawyDiv.appendChild(popupZamknij);
			
			miecz.appendChild(mieczImg);
			miecz.appendChild(mieczOpcja);
			prawyDiv.appendChild(miecz);
			topor.appendChild(toporImg);
			topor.appendChild(toporOpcja);
			prawyDiv.appendChild(topor);
			
			popupStatystykiMieszkanca.appendChild(lewyDiv);
			popupStatystykiMieszkanca.appendChild(prawyDiv);
			popup.appendChild(popupStatystykiMieszkanca);
			zawartosc.appendChild(popup);
		}
	});
	

}

function dodajPracownika(IdPosataci, IdBudynku, IdGracza, nazwaBudynku)
{
	
	dane = {
		idPostaci: IdPosataci,
		idBudynku: IdBudynku
	}
	
	$.ajax({
		url: './php/dodajPracownika.php',
		method: 'POST',
		data: dane,
		success: function() {
			var popup = document.getElementById('popupDodajPracownika');
			popup.remove();
			pobierzPracownikow(IdBudynku, IdGracza, nazwaBudynku)
		}
	});
}

function wyswietlPostaci(idGracza, idBudynku, nazwaBudynku)
{
	function wyswietlPopup()
	{
		var popup = document.createElement('div');
		var popupPracownicy = document.createElement('div');
		var zawartosc = document.getElementById('zawartosc');
		var popupZamknij = document.createElement('span');
		
		popup.style.display = 'block';
		popup.className = 'popup';
		popup.id = 'popupDodajPracownika';
		popupPracownicy.className = 'popupPracownicy';
		popupPracownicy.id = 'popupPracownicyId';
		popupPracownicy.innerHTML = "<span style='font-size: 24px;'>Wybierz osobę</span>";
		popupZamknij.className = 'popupZamknij';
		popupZamknij.id = 'zamknij';
		popupZamknij.innerHTML = '&times;';
		popupZamknij.addEventListener('click', function() {
			popup.remove();
		});
		popupPracownicy.appendChild(popupZamknij);
		popup.appendChild(popupPracownicy);
		zawartosc.appendChild(popup);
	}
	
	var dane = {
		id: idGracza
	}
	
	$.ajax({
		url: './php/pobierzInfoOBezrobotnych.php',
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
			var glownyDiv = document.getElementById('popupPracownicyId');
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
						dodajPracownika(idPostaci, idBudynku, idGracza, nazwaBudynku);
					});
				})(row.id, idBudynku, idGracza);
			}
		}
	});

}

function usunPracownika(idPracownika, idBudynku, idGracza, nazwaBudynku)
{
	var dane = {
		idPostaci: idPracownika
	}
	
	$.ajax({
		url: './php/zwolnijPracownika.php',
		method: 'POST',
		data: dane,
		success: function() {
			pobierzPracownikow(idBudynku, idGracza, nazwaBudynku);
		}
	});
}

function pobierzPracownikow(idBudynku, idGracza, nazwaBudynku) {
	var dane = {
		id: nrBudynku
	}
	
	if(nazwaBudynku == 'dlugiDom')
		document.getElementById('budynekPostaci').innerHTML = '<center>Hird</center>';
	else
		document.getElementById('budynekPostaci').innerHTML = '<center>Postaci</center>';
	
	
	$.ajax({
		url: './php/pobierzInfoOPracownikach.php',
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
					var nazwaBudynku = data.nazwa;
					switch (nazwaBudynku){
						case 'farma':
							wyswietlProcesyFarma(iloscPracownikow, idBudynku, idGracza);
							var iloscMiejsc = 3;
							break;
						case 'chataDrwala':
							wyswietlProcesyChataDrwala(iloscPracownikow, idBudynku, idGracza);
							var iloscMiejsc = 4;
							break;
						case 'kuznia':
							wyswietlProcesyKuznia(iloscPracownikow, idBudynku, idGracza);
							var iloscMiejsc = 2;
							break;
						case 'port':
							wyswietlProcesyPort(iloscPracownikow, idBudynku, idGracza);
							var iloscMiejsc = 3;
							break;
						case 'dlugiDom':
							var iloscMiejsc = 1000;
							document.getElementById('budynekPostaci').style.fontSize = '25px';
							break;
					}
					
					if(iloscPracownikow<iloscMiejsc)
					{
						var dodajPracownika = document.createElement('div');
						var ikonaPlus = document.createElement('img');
						var napisDodaj = document.createElement('p');
						var glownyDiv = document.getElementById('budynekPostaci');
				
						dodajPracownika.id = 'nowyPracownik';
						ikonaPlus.src = './img/ikony/plus.png';
						ikonaPlus.id = 'dodajPracownikaIkona';
						napisDodaj.textContent = 'Przydziel postać';
						napisDodaj.id = 'budynekPostacKomunikat';
						dodajPracownika.appendChild(ikonaPlus);
						dodajPracownika.appendChild(napisDodaj);
						dodajPracownika.addEventListener('click', function() {
							if(data.proces == '' || data.proces == undefined)
							{
								wyswietlPostaci(idGracza, idBudynku, nazwaBudynku);
							}
							else
							{	
								komunikatPopup('Nie można dodawać pracowników podczas wytwarzania');
							}
								
						});
						glownyDiv.appendChild(dodajPracownika);
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
				postacImie.className = 'budynekPostacImie';
				postacImie.textContent = row.imie;
				if(nazwaBudynku == 'dlugiDom')
				{
					postacImie.onclick = function(event) {
						wyswietlStatystykiWojow(row.id, idGracza);
					}
					
					postacImie.className = 'dlugiDomPostacImie';
				}
			
				minusDiv.src = './img/ikony/minus.png';
				minusDiv.className = 'usunPracownika';
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
								usunPracownika(idNr, dane.idBudynku, idGracza, nazwaBudynku);
							else
								komunikatPopup('Nie można usuwać pracowników podczas wytwarzania');
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