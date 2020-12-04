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
			}
			console.log("het einde van een subject " + subjects[a].title)
		}
	}else {
		alert("je hebt een vraag overgeslagen")
		zetVragen();
	}

	/*window.location.href = 'resultaten.html'*/

	for (var i = subjects.length - 1; i >= 0; i--) {
		var god = document.createElement("PARAGRAPH");
		document.getElementById("partijResultaten").appendChild(god);	
		god.innerHTML = totaleScore[i].partij + " " + (totaleScore[i].score / subjects.length * 100)+ "%" + "<br>";
		console.log("texttest")

	}

	
	



}