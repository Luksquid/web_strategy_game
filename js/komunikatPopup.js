function komunikatPopup(komunikat)
{
	var popup = document.createElement('div');
	var popupZamknij = document.createElement('div');
	var popupKomunikat = document.createElement('div');
	
	popupZamknij.className = 'popupKomunikatZamknij';
	popupZamknij.innerHTML = 'Ok';

	popupKomunikat.className = 'popupKomunikat';
	
	popup.style.display = 'block';
	popup.className = 'popup';
	
	popupKomunikat.innerHTML = '<center>' + komunikat + '</center>';
	
	popupZamknij.addEventListener('click', function() {
		popup.remove();
	});
	
	popupKomunikat.appendChild(popupZamknij);
	popup.appendChild(popupKomunikat);
	zawartosc.appendChild(popup);
}

function komunikatPopupRel(komunikat)
{
	var popup = document.createElement('div');
	var popupZamknij = document.createElement('div');
	var popupKomunikat = document.createElement('div');
	
	popupZamknij.className = 'popupKomunikatZamknij';
	popupZamknij.innerHTML = 'Ok';

	popupKomunikat.className = 'popupKomunikat';
	
	popup.style.display = 'block';
	popup.className = 'popup';
	
	popupKomunikat.innerHTML = '<center>' + komunikat + '</center>';
	
	popupZamknij.addEventListener('click', function() {
		popup.remove();
		location.reload();
	});
	
	popupKomunikat.appendChild(popupZamknij);
	popup.appendChild(popupKomunikat);
	zawartosc.appendChild(popup);
}
