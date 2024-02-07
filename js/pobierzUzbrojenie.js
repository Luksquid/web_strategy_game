function pobierzUzbrojenie()
{
	$.ajax({
		url: './php/pobierzInfoOSurowcach.php',
		method: 'POST',
		dataType: 'json',
		data: {idGracza: nrGracza},
		success: function(data){
			$('#infoZasobMiecz').html(data.miecze);
			$('#infoZasobTopor').html(data.topory);
			$('#infoZasobTarcza').html(data.tarcze);
			$('#infoZasobHelm').html(data.helmy);
		}
	});
}