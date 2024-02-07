function dostosujSzerokoscElementow() {
	var szerokoscOkna = window.innerWidth;
	var skala = (szerokoscOkna-297) / 1239;
	var zawartoscSzerokosc = 1238 * skala;
	var zawartoscElement = document.getElementById("zawartosc");
	zawartoscElement.style.width = zawartoscSzerokosc + "px";
}
document.addEventListener("DOMContentLoaded", dostosujSzerokoscElementow);
window.addEventListener("resize", dostosujSzerokoscElementow);