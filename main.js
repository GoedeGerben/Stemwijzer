var vraag = 0;
var stellingen = ['dit is de eerste vraag' , 'dit is de tweede vraag' , 'dit is de derde vraag']
var content = ['dit is de eerst content voor de eerste vraag' , 'dit is de eerst content voor de tweede vraag' , 'dit is de eerst content voor de derde vraag']
var antwoorden = ['geen', 'geen', 'geen', 'geen']

function volgende() {
	if (vraag !== 0) {
		antwoorden[vraag - 1] = arguments[0]
	}

	document.getElementById("stelling1").innerHTML = (vraag + 1) + ". " + stellingen[vraag] + ".";
	document.getElementById("contentStelling1").innerHTML = "" + content[vraag] + ".";
	
	vraag++

	console.log(vraag)
	console.log(antwoorden)
}

function vorige() {
	if (vraag !== 1) {
		vraag--
		vraag--

		document.getElementById("stelling1").innerHTML = (vraag + 1) + ". " + stellingen[vraag] + ".";
		document.getElementById("contentStelling1").innerHTML = "" + content[vraag] + ".";

		vraag++
	}else {
		if (confirm('weet je zeker dat je terug gaar de hoofd pagina wilt gaan?')) {
			window.location.href = 'main.html'
		}
	}
	
}


