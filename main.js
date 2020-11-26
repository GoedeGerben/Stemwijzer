var vraag = 0;
var antwoorden = ['geen', 'geen', 'geen', 'geen']

function volgende() {
	if (vraag === subjects.length) {
		scores();
	}else {	
		zetVragen()
	} 

	if (vraag !== 0) {
		antwoorden[vraag - 1] = arguments[0]
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
	document.getElementById("stelling1").innerHTML = (vraag + 1) + ". " + subjects[vraag].title;
	document.getElementById("contentStelling1").innerHTML = subjects[vraag].statement;
}

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
			var stelling = 0;
			var partijen = 0;

			for (var b = subjects[stelling].parties.length - 1; b >= 0; b--) {
				if (subjects[stelling].parties[partijen].position === antwoorden[stelling]) {
					console.log(subjects[stelling].parties[partijen].name + " +1")
				}
				partijen++
				console.log("het einde van een position")
			}
			stelling++
			console.log("het einde van een subject")
		}
	}else {
		alert("je hebt een vraag overgeslagen")
		zetVragen();
	}
}