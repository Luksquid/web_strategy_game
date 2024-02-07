var pasekBoczny = document.getElementById("pasekBoczny");
var przyciskCofnij = document.createElement("div");
zawartosc.style.height = '650px';
pasekBoczny.style.height = '100vh';
przyciskCofnij.id = 'przyciskCofnij';
przyciskCofnij.textContent = 'COFNIJ';
przyciskCofnij.onclick = function() {
	window.history.back();
};
pasekBoczny.appendChild(przyciskCofnij);