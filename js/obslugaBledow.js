function sprawdzMail() {
    var email = document.getElementById("rEmail").value;
    var dane = {
        email: email
    };

    $.ajax({
        url: "./php/sprawdzMail.php",
        method: "POST",
        data: dane,
        success: function(response) {			
			if(response!=0)
			{
				komunikatPopup("Do podanego adresu email jest już utowrzone konto");
			}
			
			else if(document.getElementById("rEmail").value.length === 0)
				komunikatPopup("Należy wpisać adres email");
			
			else if(document.getElementById("rImie").value.length === 0)
				komunikatPopup("Należy wpisać imie");
			
			else if(document.getElementById("rHaslo").value.length === 0)
				komunikatPopup("Należy wpisać hasło")
			
			else if(document.getElementById("rHaslo").value != document.getElementById("rHaslo2").value)
				komunikatPopup("Hasła nie są zgodne");
			
			else
			{
				var formularz = document.getElementById("rejestracja");
				formularz.submit();
			}
            }
          });
      }

$("#zarejestruj").click(function(event) {
	przycisk = document.getElementById("zarejestruj");
	przycisk.removeAttribute("disabled");
	event.preventDefault();
	sprawdzMail();
});