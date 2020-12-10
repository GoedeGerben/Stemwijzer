var vraag = 0;
var antwoorden = [];
var totaleScore = [];

for (var i = parties.length - 1; i >= 0; i--) {
	totaleScore[i] = {
	"partij" : parties[i].name,
	"score" : 0
}
}

function volgende() {
	if (vraag !== 0) {
		antwoorden[vraag - 1] = arguments[0]
	} 

	if (vraag === subjects.length) {
		scores();
	}else {	
		zetVragen()
	} 

	vraag++
	console.log(vraag)
}// laat je gaan naar de volgende pagina

function vorige() {
	if (vraag !== 1) {
		vraag = vraag - 2;
		zetVragen()
		vraag++
	}else {
		if (confirm('weet je zeker dat je terug gaar de hoofd pagina wilt gaan?')) {
			window.location.href = 'main.html'
		}
	}
}//laat je terug gaan naar de vorige pagina of het hoofdscherm.

function zetVragen(){
	document.getElementById("stelling").innerHTML = (vraag + 1) + ". " + subjects[vraag].title;
	document.getElementById("contentStelling").innerHTML = subjects[vraag].statement;

	for (var i = document.getElementsByTagName("button").length - 1; i >= 1; i--) {
		document.getElementsByTagName("button")[i].style.backgroundColor = "black";
	}

	if (antwoorden[vraag] !== undefined && antwoorden[vraag] !== 'overslaan') {
		document.getElementById(antwoorden[vraag]).style.backgroundColor = "blue";
	}

	document.getElementById("progressBar").style.width = (vraag + 1) / subjects.length * 100 + "%";
	console.log(vraag + " + " + subjects.length + " + " + (vraag + 1) / subjects.length * 100);
}// laat de vragen en de progress bar zien op de pagina

function scores(){
	var overgeslagen = false;

	for (var i = antwoorden.length - 1; i >= 0; i--) {
		if (antwoorden[i] == 'overslaan') {
			overgeslagen = true;
			vraag = i;
		}	
	}

	if (overgeslagen === false) {
		for (var a = subjects.length - 1; a >= 0; a--) {
			var partijen = 0;

			for (var b = subjects[a].parties.length - 1; b >= 0; b--) {
				if (subjects[a].parties[partijen].position === antwoorden[a]) {
					totaleScore[a].score = totaleScore[a].score + 1;
					console.log(totaleScore[a])
				}
				partijen++
				console.log("het einde van een position")
			}//vergelijkt een de ingevulde antwoorden met de antwoorden van een partij
			console.log("het einde van een subject " + subjects[a].title)
		}// loopt door alle partijen heen

		document.getElementById("vragen").remove()

		for (var c = subjects.length - 1; c >= 0; c--) {
			var creatie = document.createElement("PARAGRAPH");
			document.getElementById("partijResultaten").appendChild(creatie);	
			creatie.innerHTML = totaleScore[c].partij + " " + (totaleScore[c].score / subjects.length * 100)+ "%" + "<br>";
		}//laat de partijen op de pagina zien
		//varriabel totale score gebruiken om partijen op volgorden te zetten.
	}else {
		alert("je hebt een vraag overgeslagen")
		zetVragen();
	}//Geeft een alert als je een vraag hebt overgeslagen en brengt je terug naar die vraag

	
}