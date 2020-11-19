var vraag = 0;
const stellingen = ['dit is de eerste vraag' , 'dit is de tweede vraag' , 'dit is de derde vraag']
const content = ['dit is de eerst content voor de eerste vraag' , 'dit is de eerst content voor de tweede vraag' , 'dit is de eerst content voor de derde vraag']
var antwoorden = ['geen', 'geen', 'geen', 'geen']

function volgende() {
	if (vraag !== 0) {
		antwoorden[vraag - 1] = arguments[0]
	}

	/*if (arguments[0] === 'overslaan') {scores()}*/

	document.getElementById("stelling1").innerHTML = (vraag + 1) + ". " + stellingen[vraag] + ".";
	document.getElementById("contentStelling1").innerHTML = "" + content[vraag] + ".";
	
	vraag++

	console.log(vraag)
	console.log(antwoorden)
}// laat je gaan naar de volgende pagina

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
}//laat je terug gaan naar de vorige pagina of het hoofdscherm.

const partij = ['eens' , 'geen' , 'eens' , 'oneens'];
var resultaat = [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0]

function scores(){
	var a = 0; //stelling
	var b = 0; //partij

	while(antwoorden.length > a) {
		if (antwoorden[a] === partij[a]) {
			resultaat[b]++
		}
		a++
		console.log(resultaat)
	}
}


