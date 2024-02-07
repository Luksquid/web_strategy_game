function wyswietlProcesyFarma(iloscPracownikow, idBudynku, idGracza)
{
	var procesy = document.getElementById('budynekProcesy');
	procesy.innerHTML = 'Procesy';
	
	var proces1 = document.createElement('div');
	var proces2 = document.createElement('div');
	var proces3 = document.createElement('div');
	
	proces1.className = 'proces';
	proces2.className = 'proces';
	proces3.className = 'proces';
	
	var p1s1 = 1 * iloscPracownikow;
	var p1s2 = 3 * iloscPracownikow;
	var p2s1 = 2 * iloscPracownikow;
	var p2s2 = 3 * iloscPracownikow;
	var p3s1 = 5 * iloscPracownikow;
	
	proces1.innerHTML = "<img src='./img/ikony/skora.png' class='procesImg' height='30' width='30'> " + p1s1 + " <img src='./img/ikony/zywnosc.png' class='procesImg' height='30' width='30'> " + p1s2 + "<span style='float: right;'>24h<span>";
	proces2.innerHTML = "<img src='./img/ikony/welna.png' class='procesImg' height='30' width='30'> " + p2s1 + " <img src='./img/ikony/zywnosc.png' class='procesImg' height='30' width='30'> " + p2s2 + "<span style='float: right;'>24h<span>";
	proces3.innerHTML = "<img src='./img/ikony/zywnosc.png' class='procesImg' height='30' width='30'> " + p3s1 + "<span style='float: right;'>24h<span>";
	
	proces1.addEventListener('click', function() {
		dodajProces(idGracza, idBudynku, 24, 'skóra', p1s1, 'NULL');
	});
	
	proces2.addEventListener('click', function() {
		dodajProces(idGracza, idBudynku, 24, 'wełna', p2s1, 'NULL');
	});

	proces3.addEventListener('click', function() {
		dodajProces(idGracza, idBudynku, 24, 'żywność', p3s1, 'NULL');
	});
	
	procesy.appendChild(proces1);
	procesy.appendChild(proces2);
	procesy.appendChild(proces3);	
}

function wyswietlProcesyChataDrwala(iloscPracownikow, idBudynku, idGracza)
{
	var procesy = document.getElementById('budynekProcesy');
	procesy.innerHTML = 'Procesy';
	
	var proces = document.createElement('div');
	
	proces.className = 'proces';
	
	var p1s1 = 3 * iloscPracownikow;
	
	proces.innerHTML = "<img src='./img/ikony/drewno.png' class='procesImg' height='30' width='30'> " + p1s1 + "<span style='float: right;'>10h<span>";
	
	proces.addEventListener('click', function() {
		dodajProces(idGracza, idBudynku, 10, 'drewno', p1s1, 'NULL');
	});
	
	procesy.appendChild(proces);
}

function wyswietlProcesyKuznia(iloscPracownikow, idBudynku, idGracza)
{
	var procesy = document.getElementById('budynekProcesy');
	procesy.innerHTML = 'Procesy';
	
	var proces1 = document.createElement('div');
	var proces2 = document.createElement('div');
	var proces3 = document.createElement('div');
	var proces4 = document.createElement('div');
	var proces5 = document.createElement('div');
	
	proces1.className = 'proces';
	proces2.className = 'proces';
	proces3.className = 'proces';
	proces4.className = 'proces';
	proces5.className = 'proces';
	
	var mieczKosztZelazo = iloscPracownikow * 4;
	var mieczKosztDrewno = iloscPracownikow * 2;
	var mieczKosztSkora = iloscPracownikow * 1;
	
	var toporKosztZelazo = iloscPracownikow * 2;
	var toporKosztDrewno = iloscPracownikow * 2;
		
	var tarczaKosztZelazo = iloscPracownikow * 3;
	var tarczaKosztDrewno = iloscPracownikow * 5;
	var tarczaKosztSkora = iloscPracownikow * 2;
	
	var helmKosztZelazo = iloscPracownikow * 5;
	var helmKosztSkora = iloscPracownikow * 4;
	var helmKosztWelna = iloscPracownikow;
	
	var kotwicaKosztZelazo = iloscPracownikow * 6;
	
	proces1.innerHTML = "<div class='wyswietlProcesy1'><img src='./img/ikony/miecz.png' class='procesImg' height='30' width='30'> " + iloscPracownikow + "</div> Koszt: <img src='./img/ikony/zelazo.png' class='procesImg' height='30' width='30'> " + mieczKosztZelazo + " <img src='./img/ikony/drewno.png' class='procesImg' height='30' width='30'> " + mieczKosztDrewno + " <img src='./img/ikony/skora.png' class='procesImg' height='30' width='30'> " + mieczKosztSkora + " <span style='float: right;'>15h<span>";
	proces2.innerHTML = "<div class='wyswietlProcesy1'><img src='./img/ikony/topor.png' class='procesImg' height='30' width='30'> " + iloscPracownikow + "</div> Koszt: <img src='./img/ikony/zelazo.png' class='procesImg' height='30' width='30'> "+ toporKosztZelazo + " <img src='./img/ikony/drewno.png' class='procesImg' height='30' width='30'> " + toporKosztDrewno + " <span style='float: right;'>6h<span>";
	proces3.innerHTML = "<div class='wyswietlProcesy1'><img src='./img/ikony/tarcza.png' class='procesImg' height='30' width='30'> " + iloscPracownikow + "</div> Koszt: <img src='./img/ikony/zelazo.png' class='procesImg' height='30' width='30'> "+ tarczaKosztZelazo + " <img src='./img/ikony/drewno.png' class='procesImg' height='30' width='30'> " + tarczaKosztDrewno + " <img src='./img/ikony/skora.png' class='procesImg' height='30' width='30'> " + tarczaKosztSkora + " <span style='float: right;'>10h<span>";
	proces4.innerHTML = "<div class='wyswietlProcesy1'><img src='./img/ikony/helm.png' class='procesImg' height='30' width='30'> " + iloscPracownikow + "</div> Koszt: <img src='./img/ikony/zelazo.png' class='procesImg' height='30' width='30'> "+ helmKosztZelazo + " <img src='./img/ikony/skora.png' class='procesImg' height='30' width='30'> " + helmKosztSkora + " <img src='./img/ikony/welna.png' class='procesImg' height='30' width='30'> " + helmKosztWelna + " <span style='float: right;'>20h<span>";
	proces5.innerHTML = "<div class='wyswietlProcesy1'><img src='./img/ikony/kotwica.png' class='procesImg' height='30' width='30'> " + iloscPracownikow + "</div> Koszt: <img src='./img/ikony/zelazo.png' class='procesImg' height='30' width='30'> "+ kotwicaKosztZelazo + " <span style='float: right;'>12h<span>";
	
	proces1.addEventListener('click', function() {
		dodajProces(idGracza, idBudynku, 15, 'miecze', iloscPracownikow, 'NULL');
	});
	
	proces2.addEventListener('click', function() {
		dodajProces(idGracza, idBudynku, 6, 'topory', iloscPracownikow, 'NULL');
	});

	proces3.addEventListener('click', function() {
		dodajProces(idGracza, idBudynku, 10, 'tarcze', iloscPracownikow, 'NULL');
	});

	proces4.addEventListener('click', function() {
		dodajProces(idGracza, idBudynku, 20, 'hełmy', iloscPracownikow, 'NULL');
	});

	proces5.addEventListener('click', function() {
		dodajProces(idGracza, idBudynku, 12, 'kotwice', iloscPracownikow, 'NULL');
	});

	procesy.appendChild(proces1);
	procesy.appendChild(proces2);
	procesy.appendChild(proces3);	
	procesy.appendChild(proces4);	
	procesy.appendChild(proces5);	
}

function wygenerujPostac(idOjca, idMatki, idGracza, idBudynku)
{
	dane1 = {
		idPostaci: idOjca
	}
	dane2 = {
		idPostaci: idMatki
	}
	$.ajax({
		url: './php/pobierzInfoOPostaci.php',
		dataType: 'json',
		method: 'POST',
		data: dane1,
		success: function (data) {
			var infoOjca = data;
			$.ajax({
				url: './php/pobierzInfoOPostaci.php',
				dataType: 'json',
				method: 'POST',
				data: dane2,
				success: function (data) {
					var infoMatki = data;
					var imie = Math.floor(Math.random() * (201 - 1)) + 1;
					var plec = Math.floor(Math.random() * (2 - 0));
					var hp = Math.floor(Math.random() * (parseInt(infoOjca.maxHp)+1 - parseInt(infoMatki.maxHp))) + parseInt(infoMatki.maxHp);
					var sila = Math.floor(Math.random() * (parseInt(infoOjca.sila)+1 - parseInt(infoMatki.sila))) + parseInt(infoMatki.sila);
					var zwinnosc = Math.floor(Math.random() * (parseInt(infoOjca.zwinnosc)+1 - parseInt(infoMatki.zwinnosc))) + parseInt(infoMatki.zwinnosc);
					var grafika = Math.floor(Math.random() * (41 - 1)) + 1;
					if(plec == 1)
						var opis = "\"INSERT INTO postac(idGracza, imie, imieOjca, plec, hp, maxHp, sila, zwinnosc, idDomu, grafika) SELECT "+idGracza+", imie, '"+infoOjca.imie+"', 'mezczyzna', "+hp+" , "+hp+", "+sila+", "+zwinnosc+", "+idBudynku+", '/img/postaci/mezczyzni/postac"+grafika+".jpg' FROM imiemeskie WHERE id = "+imie+";\"";
					else
						var opis = "\"INSERT INTO postac(idGracza, imie, imieOjca, plec, hp, maxHp, sila, zwinnosc, idDomu, grafika) SELECT "+idGracza+", imie, '"+infoOjca.imie+"', 'kobieta', "+hp+" , "+hp+", "+sila+", "+zwinnosc+", "+idBudynku+", '/img/postaci/kobiety/postac"+grafika+".jpg' FROM imiezenskie WHERE id = "+imie+";\"";
					dodajProces(idGracza, idBudynku, 48, 'człowiek', 1, opis);
				}
			});
		}
	});
}

function wybierzRodzicow(idBudynku, idGracza)
{
	var popup = document.createElement('div');
	var popupPracownicy = document.createElement('div');
	var zawartosc = document.getElementById('zawartosc');
	var popupZamknij = document.createElement('span');
	
	function wyswietlPopup()
	{		
		popup.style.display = 'block';
		popup.className = 'popup';
		popup.id = 'popupDodajPracownika';
		popupPracownicy.className = 'popupPracownicy';
		popupPracownicy.id = 'popupPracownicyId';
		popupPracownicy.innerHTML = "<span style='font-size: 24px;'>Wybierz rodziców</span>";
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
		id: idBudynku
	}
	
	$.ajax({
		url: './php/pobierzInfoOMieszkancach.php',
		dataType: 'json',
		method: 'POST',
		data: dane,
		success: function (data) {
			if(data.length > 0 && data.length < 5)
				wyswietlPopup()
			
			else if(data.length >= 5)
				komunikatPopup('Budynek nie pomieści więcej osób');
			
			else if(data.length <= 0)
				komunikatPopup('Do wytwarzania potrzebne są postaci');
			
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
				
				var idMatki = 0;
				var idOjca = 0;
				
				(function (idPostaci, plec) {
					postac.addEventListener('click', function () {
						if(plec == 'kobieta')
							idMatki = idPostaci;
						else
							idOjca = idPostaci;
						
						if(idOjca != 0 && idMatki !=0)
						{
							popup.remove();
							wygenerujPostac(idOjca, idMatki, idGracza, idBudynku);
						}
					});
				})(row.id, row.plec);
			}
		}
	});

}

function wyswietlProcesyDom(idBudynku, idGracza)
{	
	var procesy = document.getElementById('budynekProcesy');
	procesy.innerHTML = 'Procesy';
	
	var proces1 = document.createElement('div');
	
	proces1.className = 'proces';
	
	proces1.innerHTML = "<div class='wyswietlProcesy1'>Człowiek</div> Koszt: <img src='./img/ikony/zywnosc.png' class='procesImg' height='30' width='30'> 4<span style='float: right;'>48h<span>";
	
	proces1.addEventListener('click', function() {
		wybierzRodzicow(idBudynku, idGracza);
	});
	
	procesy.appendChild(proces1);
}

function wyswietlProcesyPort(iloscPracownikow, idBudynku, idGracza)
{	

	var lodz = $.ajax({
		url: './php/pobierzInfoOLiczbieLodzi.php',
		method: 'POST',
		dataType: 'json',
		data: {idPortu: idBudynku}
	});

	var surowce = $.ajax({
		url: './php/pobierzInfoOSurowcach.php',
		method: 'POST',
		dataType: 'json',
		data: {idGracza: idGracza}
	});
	
	var procesy = document.getElementById('budynekProcesy');
	procesy.innerHTML = 'Procesy';
	
	var proces1 = document.createElement('div');
	var proces2 = document.createElement('div');
	var proces3 = document.createElement('div');
	
	proces1.className = 'proces';
	proces2.className = 'proces';
	proces3.className = 'proces';
	
	var mieczKosztZelazo = iloscPracownikow * 4;
	var mieczKosztDrewno = iloscPracownikow * 2;
	var mieczKosztSkora = iloscPracownikow * 1;
	
	var ilosc1 = 0;
	var ilosc2 = 0;
	var ilosc3 = 0;
	
	if(iloscPracownikow>0)
	{
		ilosc1 = 48/iloscPracownikow;
	    ilosc2 = 96/iloscPracownikow;
		ilosc3 = 144/iloscPracownikow;
	}
	
	surowce.done(function(data) {
		proces1.innerHTML = "<div class='wyswietlProcesy1'>Sneka</div> Koszt: <img src='./img/ikony/drewno.png' class='procesImg' height='30' width='30'> 100 <img src='./img/ikony/welna.png' class='procesImg' height='30' width='30'> 20 <img src='./img/ikony/zelazo.png' class='procesImg' height='30' width='30'> 2 <img src='./img/ikony/kotwica.png' class='procesImg' height='30' width='30'> 1/"+data.kotwice+" <span style='float: right;'>"+ilosc1+"h<span>";
		proces2.innerHTML = "<div class='wyswietlProcesy1'>Skeida</div> Koszt: <img src='./img/ikony/drewno.png' class='procesImg' height='30' width='30'> 150 <img src='./img/ikony/welna.png' class='procesImg' height='30' width='30'> 40 <img src='./img/ikony/zelazo.png' class='procesImg' height='30' width='30'> 4 <img src='./img/ikony/kotwica.png' class='procesImg' height='30' width='30'> 1/"+data.kotwice+" <span style='float: right;'>"+ilosc2+"h<span>";
		proces3.innerHTML = "<div class='wyswietlProcesy1'>Drakar</div> Koszt: <img src='./img/ikony/drewno.png' class='procesImg' height='30' width='30'> 200 <img src='./img/ikony/welna.png' class='procesImg' height='30' width='30'> 60 <img src='./img/ikony/zelazo.png' class='procesImg' height='30' width='30'> 6 <img src='./img/ikony/kotwica.png' class='procesImg' height='30' width='30'> 1/"+data.kotwice+" <span style='float: right;'>"+ilosc3+"h<span>";
	});
	
	opis1 = "\"INSERT INTO lodz(idGracza, idPortu, typ, iloscMiejsc, grafika) VALUES ("+idGracza+", "+idBudynku+", 'sneka', 30, '/img/lodzie/sneka.jpg');\"";
	opis2 = "\"INSERT INTO lodz(idGracza, idPortu, typ, iloscMiejsc, grafika) VALUES ("+idGracza+", "+idBudynku+", 'skeida', 40, '/img/lodzie/skeida.jpg');\"";
	opis3 = "\"INSERT INTO lodz(idGracza, idPortu, typ, iloscMiejsc, grafika) VALUES ("+idGracza+", "+idBudynku+", 'drakar', 50, '/img/lodzie/drakar.jpg');\"";
	
	

	proces1.addEventListener('click', function() {
		lodz.done(function(data) {
			if(data.liczbaLodzi<2)
				if(iloscPracownikow<1)
					komunikatPopup('Musisz mieć przydzielonych pracowników aby móc wytwarzać');
				else
					dodajProces(idGracza, idBudynku, 48/iloscPracownikow, 'sneka', 1, opis1);
			else
				komunikatPopup('Port nie pomieści więcej łodzi');
		});		
	});
	
	proces2.addEventListener('click', function() {
		lodz.done(function(data) {
			if(data.liczbaLodzi<2)
				if(iloscPracownikow<1)
					komunikatPopup('Musisz mieć przydzielonych pracowników aby móc wytwarzać');
				else
					dodajProces(idGracza, idBudynku, 96/iloscPracownikow, 'skeida', 1, opis2);
			else
				komunikatPopup('Port nie pomieści więcej łodzi');
		});		
	});

	proces3.addEventListener('click', function() {
		lodz.done(function(data) {
			if(data.liczbaLodzi<2)
				if(iloscPracownikow<1)
					komunikatPopup('Musisz mieć przydzielonych pracowników aby móc wytwarzać');
				else
					dodajProces(idGracza, idBudynku, 144/iloscPracownikow, 'drakar', 1, opis3);
			else
				komunikatPopup('Port nie pomieści więcej łodzi');
		});	
	});
	
	var lodzie = document.createElement('div');
	lodzie.className = 'lodzie';
	
	var napisLodzie = document.createElement('div');
	napisLodzie.innerHTML = 'Łodzie';
	napisLodzie.style.marginTop = '15px';
	
	procesy.appendChild(proces1);
	procesy.appendChild(proces2);
	procesy.appendChild(proces3);
		
	procesy.appendChild(napisLodzie);
	
	$.ajax({
		url: './php/pobierzInfoOLodziach.php',
		method: 'POST',
		dataType: 'json',
		data: {idPortu: idBudynku},
		success: function(data){
			for (var i = 0; i < data.length; i++) {
				const row = data[i];
				var statek = document.createElement('div');
				var statekImg = document.createElement('img');
				var statekNazwa = document.createElement('div');
				statekNazwa.innerHTML = row.nazwa;
				statekNazwa.className = 'lodzTekst';
				statek.className = 'lodz';
				statekImg.src = '.'+row.grafika;
				statekImg.className = 'lodzImg';
				
				if(row.nazwa == null)
				{
					statek.addEventListener('click', function() {
						var popup = document.createElement('div');
						var popupNazwij = document.createElement('div');
						var zawartosc = document.getElementById('zawartosc');
						var popupZamknij = document.createElement('span');
						
						popup.style.display = 'block';
						popup.className = 'popup';
						popup.id = 'popupNazwij';
						popupNazwij.className = 'popupNazwij';
						popupNazwij.id = 'popupNazwij';
						popupNazwij.innerHTML = "<span style='font-size: 24px;'>Nazwij statek</span>";
						popupZamknij.className = 'popupNazwijZamknij';
						popupZamknij.id = 'zamknij';
						popupZamknij.innerHTML = '&times;';
						popupZamknij.addEventListener('click', function() {
							popup.remove();
						});
						popupNazwij.appendChild(popupZamknij);
						popup.appendChild(popupNazwij);
						zawartosc.appendChild(popup);
						
						var form = document.createElement('form');
						form.id = 'nazwijStatek';
						
						var inputField = document.createElement('input');
						inputField.type = 'text';
						inputField.id = 'nazwa';
						inputField.name = 'nazwa';
						inputField.placeholder = 'Nazwa';
						inputField.addEventListener('focus', function() {
							this.placeholder = '';
						});
						inputField.addEventListener('blur', function() {
							this.placeholder = 'Nazwa';
						});
						form.appendChild(inputField);
						
						var submitButton = document.createElement('input');
						submitButton.type = 'submit';
						submitButton.id = 'nazwij';
						submitButton.value = 'Nazwij';
						form.appendChild(submitButton);
						
						popupNazwij.appendChild(form);
						
						form.addEventListener('submit', function(e) {
							e.preventDefault();
							dane = {
								idLodzi: row.id, 
								nazwa: inputField.value
							}
							$.ajax({
								url: './php/nazwijStatek.php',
								method: 'POST',
								data: dane,
								success: function(){
									pobierzPracownikow(idBudynku, idGracza);
									popup.remove();
								}
							});
						});
					});
				}
				else
				{
					statek.addEventListener('click', function() {
						var popup = document.createElement('div');
						var popupStatystykiLodzi = document.createElement('div');
						var zawartosc = document.getElementById('zawartosc');
						var popupZamknij = document.createElement('span');
						var popupUsun = document.createElement('span');
						
						popup.style.display = 'block';
						popup.className = 'popup';
						popup.id = 'popupStatystyki';
						popupStatystykiLodzi.className = 'popupStatystyki';
						popupStatystykiLodzi.id = 'popupStatystykiId';
						popupZamknij.className = 'popupStatystykiZamknij';
						popupZamknij.style.marginTop = '81px';
						popupZamknij.id = 'zamknij';
						popupZamknij.innerHTML = 'Zamknij';
						popupZamknij.style.float = 'left';
						popupZamknij.addEventListener('click', function() {
							popup.remove();
						});
												
						popupUsun.innerHTML = 'Usuń';
						popupUsun.style.float = 'left';
						popupUsun.className = 'popupStatystykiUsun';
						popupUsun.style.margin = '81px 0 0 20px';
						popupUsun.addEventListener('click', function() {
							$.ajax({
								url: './php/usunLodz.php',
								method: 'POST',
								data: {idLodzi: row.id}
							});
							pobierzPracownikow(idBudynku, idGracza);
							popup.remove();
						});
						
						var lewyDiv = document.createElement('div');
						var prawyDiv = document.createElement('div');
						lewyDiv.className = 'popupStatystykiDiv';
						prawyDiv.className = 'popupStatystykiDiv';
						prawyDiv.style.marginLeft = '40px';
						var portret = document.createElement('img');
						var nazwa = document.createElement('div');
						var typ = document.createElement('div');
						var iloscMiejsc = document.createElement('div');
						
						nazwa.className = 'popupStatystykiTekst';
						typ.className = 'popupStatystykiTekst';
						iloscMiejsc.className = 'popupStatystykiTekst';
						
						nazwa.innerHTML = row.nazwa;
						typ.innerHTML = 'Typ: '+row.typ;
						iloscMiejsc.innerHTML = 'Ilość miejsc: '+row.iloscMiejsc;
						
						portret.src = '.'+row.grafika;
						portret.className = 'popupStatystykiImg';
						
						
						lewyDiv.appendChild(portret);
						prawyDiv.appendChild(nazwa);
						prawyDiv.appendChild(typ);
						prawyDiv.appendChild(iloscMiejsc);
						prawyDiv.appendChild(popupZamknij);
						prawyDiv.appendChild(popupUsun);
						popupStatystykiLodzi.appendChild(lewyDiv);
						popupStatystykiLodzi.appendChild(prawyDiv);
						popup.appendChild(popupStatystykiLodzi);
						zawartosc.appendChild(popup);
					});
				}
				statek.appendChild(statekImg);
				statek.appendChild(statekNazwa);
				lodzie.appendChild(statek);
			}
		}
	});
	
	procesy.appendChild(lodzie);
}


function wyswietlPostaciSwiatynia(idGracza)
{
	function wyswietlPopup()
	{
		var popup = document.createElement('div');
		var popupPracownicy = document.createElement('div');
		var zawartosc = document.getElementById('zawartosc');
		var popupZamknij = document.createElement('span');
		
		popup.style.display = 'block';
		popup.className = 'popup';
		popup.id = 'popupUsunPostac';
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
			if(data.length>0)
			{
				wyswietlPopup();
			}
			else
				komunikatPopup('Brak wolnych postaci');
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

				(function (idPostaci, idGracza) {
					postac.addEventListener('click', function () {
						ofiaraZCzlowieka(idGracza, idPostaci);
					});
				})(row.id, idGracza);
			}
		}
	});

}

function ofiaraZCzlowieka(nrGracza, nrPostaci)
{
	$.ajax({
		url: './php/ofiaraZCzlowieka.php',
		method: 'POST',
		data: {idGracza: nrGracza, idPostaci: nrPostaci},
		success: function(){
			var laskaBogow = document.getElementById('infoZasobLaskaBogow');
			laskaBogow.innerHTML = parseInt(laskaBogow.innerHTML) + 30;
			$('#popupUsunPostac').remove();
			komunikatPopup('Ofiara dokonała się');
		}
	});
}

function ofiaraZZywnosci(nrGracza)
{
	$.ajax({
		url: './php/ofiaraZZywnosci.php',
		method: 'POST',
		data: {idGracza: nrGracza},
		success: function(){
			var zywnosc = document.getElementById('infoZasobZywnosc');
			zywnosc.innerHTML = parseInt(zywnosc.innerHTML) - 10;
			var laskaBogow = document.getElementById('infoZasobLaskaBogow');
			laskaBogow.innerHTML = parseInt(laskaBogow.innerHTML) + 20;
			komunikatPopup('Ofiara dokonała się');
		}
	});
}

function wyswietlProcesySwiatynia(idBudynku, idGracza)
{
	var procesy = document.getElementById('swiatyniaProcesy');
	procesy.innerHTML = 'Ofiary';
	
	var proces1 = document.createElement('div');
	var proces2 = document.createElement('div');
	
	proces1.className = 'procesSwiatynia';
	proces2.className = 'procesSwiatynia';
	
	proces1.innerHTML = "<div class='wyswietlProcesy1'><img src='./img/ikony/laskaBogow.png' class='procesImg' height='30' width='30'>30</div> Koszt: człowiek 1";
	proces2.innerHTML = "<div class='wyswietlProcesy1'><img src='./img/ikony/laskaBogow.png' class='procesImg' height='30' width='30'>20</div> Koszt: żywność 10";
	
	proces1.addEventListener('click', function() {
		wyswietlPostaciSwiatynia(idGracza, idBudynku);
	});
	
	proces2.addEventListener('click', function() {
		ofiaraZZywnosci(idGracza);
	});
	
	procesy.appendChild(proces1);
	procesy.appendChild(proces2);
}