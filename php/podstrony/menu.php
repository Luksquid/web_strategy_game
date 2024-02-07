<div id="menu">

	<div class="menuOpcja" id='menuDlugiDom'>
		<div id="menuDlugiDomObraz" class="menuImg">
			Długi dom
		</div>
		<div id="menuDlugiDomStatystyki" class="menuStatystyki"></div>
	</div>

	<div class="menuOpcja" id="menuSwiatynia">
		<div id="menuSwiatyniaObraz" class="menuImg">
				Świątynia
		</div>
		<div id="menuSwiatyniaStatystyki" class="menuStatystyki"></div>
	</div>

	<a href="./glowna.php?idp=portMenu">
		<div class="menuOpcja">
			<div id="menuPortObraz" class="menuImg">
				Porty
			</div>
			<div id="menuPortStatystyki" class="menuStatystyki"></div>
		</div>
	</a>

	<a href="./glowna.php?idp=kuzniaMenu">
		<div class="menuOpcja">
			<div id="menuKuzniaObraz" class="menuImg">
				Kuźnie
			</div>
			<div id="menuKuzniaStatystyki" class="menuStatystyki"></div>
		</div>
	</a>

	<a href="./glowna.php?idp=farmaMenu">
		<div class="menuOpcja">
			<div id="menuFarmaObraz" class="menuImg">
				Farmy
			</div>
			<div id="menuFarmaStatystyki" class="menuStatystyki"></div>
		</div>
	</a>

	<a href="./glowna.php?idp=chataDrwalaMenu">
		<div class="menuOpcja">
			<div id="menuChataDrwalaObraz" class="menuImg">
				Chaty drwali
			</div>
			<div id="menuChataDrwalaStatystyki" class="menuStatystyki"></div>
		</div>
	</a>

	<a href="./glowna.php?idp=domMenu">
		<div class="menuOpcja">
			<div id="menuDomObraz" class="menuImg">
				Domy
			</div>
			<div id="menuDomStatystyki" class="menuStatystyki"></div>
		</div>
	</a>
	
</div>


<script>
	var menuElement = document.getElementById("menu");
	var pasekBocznyElement = document.getElementById("pasekBoczny");
	var glownyDivElement = document.getElementById("glownyDiv");
	
	var glownyDivDlugosc = menuElement.offsetHeight + 110;
	var pasekBocznyDlugosc = menuElement.offsetHeights;
	
	glownyDivElement.style.height = glownyDivDlugosc + "px";
	pasekBocznyElement.setAttribute("style", "height: " + glownyDivDlugosc + "px;");
	
	document.body.style.overflow = 'auto';
</script>

<script>
	function pokarzSratystykiBudynkow()
	{
		var dane = { 	
				id: '<?php echo $_SESSION['id']?>'
			};
			
		$.ajax({
			url: './php/pobierzInfoOBudynkach.php',
			dataType: 'json',
			method: 'POST',
			data: dane,
			success: function(data) {
				$('#menuDlugiDomStatystyki').html("Postaci: " + data.postaciDlugiDom);
				$('#menuPortStatystyki').html("Budynki: " + data.budynkiPort + "\n<br>Łodzie: " + data.lodziePort + "\n<br>Postaci: " + data.postaciPort);
				$('#menuKuzniaStatystyki').html("Budynki: " + data.budynkiKuznia + "\n<br>Postaci: " + data.postaciKuznia);
				$('#menuFarmaStatystyki').html("Budynki: " + data.budynkiFarma + "\n<br>Postaci: " + data.postaciFarma);
				$('#menuChataDrwalaStatystyki').html("Budynki: " + data.budynkiChataDrwala + "\n<br>Postaci: " + data.postaciChataDrwala);
				$('#menuDomStatystyki').html("Budynki: " + data.budynkiDom + "\n<br>Postaci: " + data.postaciDom);
			}
		});
	};
	pokarzSratystykiBudynkow();
</script>

<script>

	var idPostaci = '<?php echo $_SESSION['id']?>';
	var dane = {
		id: '<?php echo $_SESSION['id']?>'
	};
	
	$.ajax({
		url: './php/czyJestSwiatynia.php',
		dataType: 'text',
		method: 'POST',
		data: dane,
		success: function(data) {
			var menuSwiatynia = document.getElementById('menuSwiatynia');
			menuSwiatynia.addEventListener('click', function() {
				window.location.href = "./glowna.php?idp=swiatynia&id="+data;
			});
		}
	});
	
	$.ajax({
		url: './php/pobierzIdDlugiegoDomu.php',
		dataType: 'text',
		method: 'POST',
		data: {id: idPostaci},
		success: function(data){
			var menuDlugiDom = document.getElementById('menuDlugiDom');
			menuDlugiDom.addEventListener('click', function() {
				window.location.href = "./glowna.php?idp=dlugiDom&id="+data;
			});
		}
	});
</script>