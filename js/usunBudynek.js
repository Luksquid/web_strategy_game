function usunBudynekWykonaj(idBudynku)
{
	dane = {
		id: idBudynku
	}
	
	$.ajax({
		url: './php/usunBudynek.php',
		method: 'POST',
		data: dane,
		success: function() {
			window.history.back();
		},
		error: function(jqxhr, status, error) {
			console.error("Wystąpił błąd AJAX: " + error);
		}
	});
}

function usunBudynekPopup(idBudynku)
{
	var popup = document.createElement('div');
	var popupZamknij = document.createElement('div');
	var popupWykonaj = document.createElement('div');
	var popupUsunBudynek = document.createElement('div');
	
	popupWykonaj.className = 'usunBudynekPopupPrzycisk';
	popupZamknij.className = 'usunBudynekPopupPrzycisk';
	popupWykonaj.innerHTML = 'Wykonaj';
	popupZamknij.innerHTML = 'Anuluj';

	popupUsunBudynek.className = 'popupUsunBudynek';
	
	popup.style.display = 'block';
	popup.className = 'popup';
	
	popupUsunBudynek.innerHTML = '<center>Czy usunąć budynek?</center>';
	
	popupZamknij.addEventListener('click', function() {
		popup.remove();
	});
		
	popupWykonaj.addEventListener('click', function() {
		popup.remove()
		usunBudynekWykonaj(idBudynku);
	});
		
	popupUsunBudynek.appendChild(popupWykonaj);
	popupUsunBudynek.appendChild(popupZamknij);
	popup.appendChild(popupUsunBudynek);
	zawartosc.appendChild(popup);
}