function pobierzWyprawy(nrGracza, nrBudynku)
{
	function zmienEtap(nrGracza, nrEtapu, czas) 
	{
		$.ajax({
			url: './php/zmienEtap.php',
			method: 'POST',
			data: {idGracza: nrGracza, idEtapu: nrEtapu}
		});
	}
	
	function wykonajPolecenie(polecenie, nrGracza) 
	{
		$.ajax({
			url: './php/polecenia/'+polecenie,
			method: 'POST',
			data: {idGracza: nrGracza},
			success: function()
			{
				pokazSurowce(nrGracza);
			},
			error: function(jqXHR, textStatus, errorThrown) {
				console.error('Błąd AJAX:', textStatus, errorThrown);
			}
		});
	}
	
	function akcja()
	{                  
		$.ajax({
			url: './php/pobierzWyprawy.php',
			method: 'POST',
			dataType: 'json',
			data: {idGracza: nrGracza},
			success: function(data){
				popupWyprawyLewy.appendChild(popupWyprawyDodaj);
				for (var i = 0; i < data.length; i++)
				{
					const row = data[i];
					var nazwaWyprawy = document.createElement('div');
					nazwaWyprawy.innerHTML = row.nazwaWyprawy;
					nazwaWyprawy.className = 'popupWyprawa';
					nazwaWyprawy.addEventListener('click', function() {
						popupWyprawyPrawy.innerHTML = '';
						$.ajax({
							url: './php/wyswietlWyprawy.php',
							method: 'POST',
							dataType: 'json',
							data: {idGracza: nrGracza, nazwa: row.nazwaWyprawy},	
							success: function(data2){
								var ostatni;
								for (var i = 0; i < data2.length; i++)
								{
									const row2 = data2[i];
									var wpis = document.createElement('p');
									wpis.innerHTML = row2.tekst;
									popupWyprawyPrawy.appendChild(wpis);
									ostatni = row2;
								}
								$.ajax({
									url: './php/wyprawaOpcje.php',
									method: 'POST',
									dataType: 'json',
									data: {idGracza: nrGracza, nazwa: row.nazwaWyprawy},
									success: function(data3){
										if(data3 == 0)
										{
											if(ostatni.walka == 1)
											{
												$.ajax({
													url: './php/walka.php',
													method: 'POST',
													dataType: 'text',
													data: {idGracza: nrGracza, idEtapu: ostatni.id},
													success: function(data4)
													{
														if(data4=='1')
														{
															komunikatPopup('Twoi wojowie umarli i wyprawa zaakończyła się niepowodzeniem. Możesz powtórzyć wyprawę');
															pobierzPracownikow(nrBudynku, nrGracza, 'dlugiDom');
															popup.remove();
														}
													}
													
												});
											}
											
											if(ostatni.polecenie == 'Koniec')
											{
												$.ajax({
													url: './php/koniecWyprawy.php',
													method: 'POST',
													data: {idGracza: nrGracza}
												});	
											}
											var opcja1 = document.createElement('div');
											var opcja2 = document.createElement('div');
											var opcja3 = document.createElement('div');
											opcja1.className = 'popupWyprawaOpcje';
											opcja2.className = 'popupWyprawaOpcje';
											opcja3.className = 'popupWyprawaOpcje';
											opcja1.innerHTML = ostatni.opcja1nazwa;
											opcja2.innerHTML = ostatni.opcja2nazwa;
											opcja3.innerHTML = ostatni.opcja3nazwa;
											opcja1.addEventListener('click', function() {
												zmienEtap(nrGracza, ostatni.opcja1id);
												opcja1.remove();
												opcja2.remove();
												opcja3.remove();
												if(ostatni.polecenie != null && ostatni.polecenie != 'Start' && ostatni.polecenie != 'Koniec')
												{
													wykonajPolecenie(ostatni.polecenie, nrGracza);
												}
											});
											opcja2.addEventListener('click', function() {
												zmienEtap(nrGracza, ostatni.opcja2id);
												opcja1.remove();
												opcja2.remove();
												opcja3.remove();
												if(ostatni.polecenie != null && ostatni.polecenie != 'Start' && ostatni.polecenie != 'Koniec')
												{
													wykonajPolecenie(ostatni.polecenie, nrGracza);
												}
											});
											opcja3.addEventListener('click', function() {
												zmienEtap(nrGracza, ostatni.opcja3id);
												opcja1.remove();
												opcja2.remove();
												opcja3.remove();
												if(ostatni.polecenie != null && ostatni.polecenie != 'Start' && ostatni.polecenie != 'Koniec')
												{
													wykonajPolecenie(ostatni.polecenie, nrGracza);
												}
											});
											if(opcja1.innerHTML != '')
												popupWyprawyPrawy.appendChild(opcja1);
											if(opcja2.innerHTML != '')
												popupWyprawyPrawy.appendChild(opcja2);
											if(opcja3.innerHTML != '')
												popupWyprawyPrawy.appendChild(opcja3);									
										}
									}
								});
							},
							error: function(jqXHR, textStatus, errorThrown) {
								// Obsługa błędu
								console.error("Błąd AJAX:", textStatus, errorThrown);
							}
						})
					});
					popupWyprawyLewy.appendChild(nazwaWyprawy);
				}
				popupWyprawy.appendChild(popupZamknij);
				popupWyprawy.appendChild(popupWyprawyLewy);
				popupWyprawy.appendChild(popupWyprawyPrawy);
				popup.appendChild(popupWyprawy);
				zawartosc.appendChild(popup);
			}
		});
	}
	
	var popup = document.createElement('div');
	var popupWyprawy = document.createElement('div');
	var popupWyprawyLewy = document.createElement('div');
	var popupWyprawyPrawy = document.createElement('div');
	var popupWyprawyDodaj = document.createElement('div');
	var zawartosc = document.getElementById('zawartosc');
	var popupZamknij = document.createElement('span');
	
	popup.style.display = 'block';
	popup.className = 'popup';
	popup.id = 'popupID';
	popupWyprawy.id = 'popupWyprawy';
	popupWyprawyLewy.id = 'popupWyprawyLewy';
	popupWyprawyPrawy.id = 'popupWyprawyPrawy';
	popupWyprawyDodaj.id = 'popupWyprawyDodaj';
	popupWyprawyDodaj.innerHTML = 'Rozpocznij wyprawę';
	popupWyprawyDodaj.addEventListener('click', function() {
		$.ajax({
			url: './php/dodajWyprawe.php',
			method: 'POST',
			dataType: 'text',
			data: {idGracza: nrGracza},
			success: function(data)
			{
				if(data == 'Wyprawa ruszyła')
				{
					popupWyprawyPrawy.innerHTML = '';
					popupWyprawyLewy.innerHTML = '';
					akcja();
				}
				else
					komunikatPopup(data);
			}
		});		
	});
	popupZamknij.className = 'popupWyprawyZamknij';
	popupZamknij.id = 'zamknij';
	popupZamknij.innerHTML = '&times;';
	popupZamknij.style.padding = '15px';
	popupZamknij.addEventListener('click', function() {
		popup.remove();
	});
	akcja();
}