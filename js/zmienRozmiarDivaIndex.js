function dostosujSzerokoscElementow() {
	var szerokoscOkna = window.innerWidth;
	var skala = szerokoscOkna / 1519;
	var zawartoscSzerokosc = 1519 * skala;
	var zawartoscElement = document.getElementById("zawartosc");
	zawartoscElement.style.width = zawartoscSzerokosc + "px";
}
document.addEventListener("DOMContentLoaded", dostosujSzerokoscElementow);
window.addEventListener("resize", dostosujSzerokoscElementow);