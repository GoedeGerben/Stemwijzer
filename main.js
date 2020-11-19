var vraag = 0;
var antwoorden = ['geen', 'geen', 'geen', 'geen']

function volgende() {
	if (vraag === subjects.length) {
		scores();
	}else {	
		document.getElementById("stelling1").innerHTML = (vraag + 1) + ". " + subjects[vraag].title + ".";
		document.getElementById("contentStelling1").innerHTML = "" + subjects[vraag].statement + ".";
	} 

	if (vraag !== 0) {
		antwoorden[vraag - 1] = arguments[0]
	} 

	vraag++
	console.log(vraag)
}// laat je gaan naar de volgende pagina

function vorige() {
	if (vraag !== 1) {
		vraag--
		vraag--

		document.getElementById("stelling1").innerHTML = (vraag + 1) + ". " + subjects[vraag].title + ".";
		document.getElementById("contentStelling1").innerHTML = "" + subjects[vraag].statement + ".";

		vraag++
	}else {
		if (confirm('weet je zeker dat je terug gaar de hoofd pagina wilt gaan?')) {
			window.location.href = 'main.html'
		}
	}
}//laat je terug gaan naar de vorige pagina of het hoofdscherm.
const pvda = ['eens' , 'eens' , 'eens' , 'eens' , 'eens']
const xs4all = ['geen' , 'geen' , 'geen' , 'geen' , 'geen']
const partij = ['eens' , 'geen' , 'eens' , 'oneens' , 'geen'];
const partijen = [partij , pvda , xs4all];
var resultaat = [0 , 0 , 0 , 0 , 0 , 0 , 0 , 0];



function scores(){
	for (var i = 0; i < antwoorden.length; i++) {
		if (antwoorden[i] === 'overslaan') {
			alert("U heeft nog vraag openstaan.");
			vraag = i;
			console.log("vraag" + vraag)
			volgende();
			i = antwoorden.length;
		}
	}


	if (subjects[0].parties[0].position === antwoorden) {
		alert("hello world")
	}
	



	/*var a = 0; //stelling
	var b = 0; //partij stelling
	var c = 0; //partij

	while(partijen.length > c) {
		while(antwoorden.length > a) {
			if (antwoorden[a] === partijen[c[a]]) {
				resultaat[b]++
			}
			a++
			console.log(resultaat)
		}
		c++
		console.log('scores' + c)
	}*/
}


