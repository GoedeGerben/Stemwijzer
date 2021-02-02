var vraag = 0;//slaat op op welke vraag de gebruiker zit
var antwoorden = [];//slaat de antwoorden van de gebruiker op
var totaleScore = [];//slaat de totale score van de partijen op nadat die vergeleken zijn met de antwoorden van de gebruiker
var meeTellen = [];//slaat op welke partijen de gebruiker mee wilt laten tellen
var dubbelTellen = [];//slaat op welke onderwerpen de gebruiker belangrijk vind
var groot = false;//slaat op of de gebruiker alleen grote partijen wilt laten zien
var seculiere = false;//slaat op of de gebruiker alleen seculiere partijen wilt laten zien
const grotePartij = 15;//de criteria waaraan een partij moet voldoen om een grote partij te zijn

//zet alle partijen als objects in de array totale score 
for (let i in parties) {
	totaleScore[i] = {
		"partij" : parties[i].name,
		"score" : 0
	}
}

/*slaat het antwoord op en laat de volgende vraag zien als het niet de laatste vraag is.
Als het wel de laatste vraag is dan kijkt hij of er een vraag is overgeslagen. Als dit 
waar is dan word je terug gestuurd naar de overgeslagen vraag. als dit niet waar is
dan word je naar de onderwerp selectie gestuurd.*/
function volgende() {
	if (vraag !== 0) {
		antwoorden[vraag - 1] = arguments[0]
	} 

	if (vraag === subjects.length) {
		var overgeslagen = false;

		for (var i = antwoorden.length - 1; i >= 0; i--) {
			if (antwoorden[i] == 'overslaan') {
				overgeslagen = true;
				vraag = i;
			}	
		}

		if (overgeslagen === false) {
			laatOnderwerpenZien();
		}else {
			alert("je hebt een vraag overgeslagen")
			zetVragen();
		}//Geeft een alert als je een vraag hebt overgeslagen en brengt je terug naar die vraag
	}else {	
		zetVragen()
	} 
	vraag++
	console.log(vraag)
}

//laat je naar de vorige vraag toe gaan. Als de gebruiker op de eerste vraag zit dan krijgt de gebruiker een confirm om te kiezen om naar de hoofdpagina te gaan
function vorige() {
	if (vraag !== 1) {
		vraag = vraag - 2;
		zetVragen()
		vraag++
	}else {
		if (confirm('weet je zeker dat je terug gaar de hoofdpagina wilt gaan?')) {
			window.location.href = 'main.html'
		}
	}
}

//zet de vragen op de pagina, update de progress bar en kleurt de knoppen blauw als dat een eerder antwoord was.
function zetVragen(){
	document.getElementById("stelling").innerHTML = (vraag + 1) + ". " + subjects[vraag].title;
	document.getElementById("contentStelling").innerHTML = subjects[vraag].statement;
	document.getElementById("pro").style.backgroundColor = "black";
	document.getElementById("geen").style.backgroundColor = "black";
	document.getElementById("contra").style.backgroundColor = "black";

	if (antwoorden[vraag] !== undefined && antwoorden[vraag] !== 'overslaan') {
		document.getElementById(antwoorden[vraag]).style.backgroundColor = "blue";
	}

	document.getElementById("progressBar").style.width = (vraag + 1) / subjects.length * 100 + "%";
	console.log(vraag + " + " + subjects.length + " + " + (vraag + 1) / subjects.length * 100);
}

/*kijkt of er vragen overgeslagen zijn, berekent de scores van de partijen 
die gekozen zijn door de gebruiker, laat de gekozen vragen door de gebruiker 
dubbel tellen en zet de antwoorden van de berekening op de pagina */
function berekenScores(){
	for (let a in subjects) {
		var partijen = 0;
		for (let b in subjects[a].parties) {
			if (subjects[a].parties[partijen].position === antwoorden[a]) {
				for (let c in subjects[a].parties) {
					if (totaleScore[c].partij === subjects[a].parties[partijen].name) {
						if (subjects[a].title === dubbelTellen[a]) {
							totaleScore[c].score = totaleScore[c].score + 2;
						}else {
							totaleScore[c].score = totaleScore[c].score + 1;
						}
					}
				}
			}
			partijen++
			
		}//vergelijkt de ingevulde antwoorden met de antwoorden van een partij
	}// loopt door alle partijen heen

	document.getElementById("partijLijst").remove()

	if (seculiere === true) {
		for(let i in parties){
			if (parties[i].secular === true) {
				meeTellen[i] = parties[i].name;
			}
		}
	}else if (groot === true) {
		for(let i in parties){
			if (parties[i].size >= grotePartij) {
				meeTellen[i] = parties[i].name;
			}
		}
	}

	totaleScore.sort(dynamicSort("score"));

	for (var c = parties.length - 1; c >= 0; c--) {//moet -- blijven anders worden de partijen van klein naar groot weergegeven. evt docent vragen hoe dit gedaan kan worden met let x in y
		for (let d in totaleScore) {
			if (meeTellen[d] == totaleScore[c].partij) {
				var creatie = document.createElement("PARAGRAPH");
				document.getElementById("partijResultaten").appendChild(creatie);	
				creatie.innerHTML = totaleScore[c].partij + " " + Math.ceil(totaleScore[c].score / (subjects.length + dubbelTellen.length) * 100)+ "%" + "<br>";
			}
		}
	}//laat de partijen op de pagina zien
}


function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}//sorteert arrays met objects

//laat de onderwerpen zien waaruit de gebruiker kan kiezen om dubbel mee te laten tellen.
function laatOnderwerpenZien(){
	document.getElementById("vragen").remove();
	for (var i = 0; i <= subjects.length - 1; i++) {
		var creatie = document.createElement("PARAGRAPH");
		document.getElementById("onderwerpLijst").appendChild(creatie);
		var tweedeCreatie = document.createElement("BR");
		document.getElementById("onderwerpLijst").appendChild(tweedeCreatie);
		creatie.id = i;
		creatie.innerHTML = subjects[i].title;
		creatie.setAttribute('onclick', 'onderwerpenLatenTellen("' + i + '")');
	}

	var creatie = document.createElement("PARAGRAPH");
	document.getElementById("onderwerpLijst").appendChild(creatie);
	creatie.innerHTML = "Volgende";
	creatie.onclick = function() {laatPartijenZien();};
}

//als de gebruiker op een knop klikt dan word het opderwerp dat op die knop stond opgeslagen.
function onderwerpenLatenTellen(id){
	if (dubbelTellen[id] == subjects[id].title) {
		dubbelTellen[id] = null;
	}else {	
		dubbelTellen[id] = subjects[id].title;
	}
}

/*laat de partijen zien waaruit de gebruiker kan kiezen om mee te laten tellen.
De gebruiker krijgt ook 2 andere knoppen. Een om allen de grote partijen te
laten zien en een om alleen de seculiere partijen te laten zien.*/
function laatPartijenZien(){
	document.getElementById("onderwerpLijst").remove();

	var creatie = document.createElement("PARAGRAPH");
	document.getElementById("partijLijst").appendChild(creatie);
	var tweedeCreatie = document.createElement("BR");
	document.getElementById("partijLijst").appendChild(tweedeCreatie);
	creatie.innerHTML = 'Selecteer grote partijen';
	creatie.onclick = function() {groot = true};

	var creatie = document.createElement("PARAGRAPH");
	document.getElementById("partijLijst").appendChild(creatie);
	var tweedeCreatie = document.createElement("BR");
	document.getElementById("partijLijst").appendChild(tweedeCreatie);
	creatie.innerHTML = 'Selecteer seculiere partijen';
	creatie.onclick = function() {seculiere = true};

	for (var i = 0; i <= parties.length - 1; i++) {
			var creatie = document.createElement("PARAGRAPH");
			document.getElementById("partijLijst").appendChild(creatie);
			var tweedeCreatie = document.createElement("BR");
			document.getElementById("partijLijst").appendChild(tweedeCreatie);
			creatie.id = i;
			creatie.innerHTML = parties[i].name;
			creatie.setAttribute('onclick', 'partijLatenTellen("' + i + '")');
		}

			var creatie = document.createElement("PARAGRAPH");
			document.getElementById("partijLijst").appendChild(creatie);
			creatie.innerHTML = "Volgende";
			creatie.onclick = function() {berekenScores();};
}

//als de gebruiker op een knop klikt dan word de partij die op de knop stond opgeslagen.
function partijLatenTellen(id) {	
	if (meeTellen[id] == parties[id].name) {
		meeTellen[id] = null;
	}else {	
		meeTellen[id] = parties[id].name;
	}
	console.log(meeTellen)
}