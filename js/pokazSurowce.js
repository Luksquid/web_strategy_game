function pokazSurowce(idGracza) {
	var dane = {
		id: idGracza
	}
	
	$.ajax({
		url: './php/pobierzDane.php',
		dataType: 'json',
		method: 'POST',
		data: dane,
		success: function(data) {
			for (let i = 0; i < data.length; i++) {
				const row = data[i];
				var przydomek = row.przydomek
				if(przydomek == null)
					przydomek = '';
				$('#infoGracz').html(row.imie);
				$('#infoZasobZloto').html(row.złoto);
				$('#infoZasobZelazo').html(row.żelazo);
				$('#infoZasobDrewno').html(row.drewno);
				$('#infoZasobZywnosc').html(row.żywność);
				$('#infoZasobSkora').html(row.skóra);
				$('#infoZasobWelna').html(row.wełna);
				$('#infoZasobLaskaBogow').html(row.łaskaBogów);
			}
		}
	});
}