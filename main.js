var vraag = 0;
var antwoorden = [];
var totaleScore = [];
var meeTellen = [];
var dubbelTellen = [];

for (let i in parties) {
	totaleScore[i] = {
		"partij" : parties[i].name,
		"score" : 0
	}
}
//dit laat de volgende vraag zien
function volgende() {
	if (vraag !== 0) {
		antwoorden[vraag - 1] = arguments[0]
	} 

	if (vraag === subjects.length) {
		//button voor grote partijen
		laatOnderwerpenZien();
		
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
				console.log(subjects[a].title + ' ' + subjects[a].parties[partijen].position + ' ' + antwoorden[a])
				console.log(totaleScore[partijen])
				partijen++
				/*console.log("het einde van een position")*/
			}//vergelijkt de ingevulde antwoorden met de antwoorden van een partij
			/*console.log("het einde van een subject " + subjects[a].title)*/
		}// loopt door alle partijen heen

		document.getElementById("partijLijst").remove()

		totaleScore.sort(dynamicSort("score"));

		for (var c = subjects.length - 1; c >= 0; c--) {//moet -- blijven anders worden de partijen van klein naar groot weergegeven. evt docent vragen hoe dit gedaan kan worden met let x in y
			for (let d in totaleScore) {
				if (meeTellen[d] == totaleScore[c].partij) {
					var creatie = document.createElement("PARAGRAPH");
					document.getElementById("partijResultaten").appendChild(creatie);	
					creatie.innerHTML = totaleScore[c].partij + " " + (totaleScore[c].score / (subjects.length + dubbelTellen.length) * 100)+ "%" + "<br>";
				}
			}
		}//laat de partijen op de pagina zien
		
	}else {
		alert("je hebt een vraag overgeslagen")
		zetVragen();
	}//Geeft een alert als je een vraag hebt overgeslagen en brengt je terug naar die vraag
}

function dynamicSort(property) {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        /* next line works with strings and numbers, 
         * and you may want to customize it to your needs
         */
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}//sorteert arrays met objects

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

function onderwerpenLatenTellen(id){
	if (dubbelTellen[id] == subjects[id].title) {
		dubbelTellen[id] = null;
	}else {	
		dubbelTellen[id] = subjects[id].title;
	}
}

function laatPartijenZien(){
	document.getElementById("onderwerpLijst").remove()
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
			creatie.onclick = function() {scores();};
}


function partijLatenTellen(id) {	
	if (meeTellen[id] == parties[id].name) {
		meeTellen[id] = null;
	}else {	
		meeTellen[id] = parties[id].name;
	}
	console.log(meeTellen)
}