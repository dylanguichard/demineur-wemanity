var bombsTab = [];
var hiddenCase = [];
var discoveredCases = [];
var possiblePosition = [];
var bombNumb = 0;

function showBombs(){

	// CHANGE BOMB CASE COLOR
	for(i = 0; i < bombsTab.length; i++)
		document.getElementById(bombsTab[i]).style.backgroundColor = "red";

}

function createElements(){
	var dem = document.getElementById("dem");

	for(var i = 0; i < 100; i++){

		var el = document.createElement('div');
		el.classList.add("el");
		el.appendChild(document.createTextNode(0));
		el.id = i;
		dem.appendChild(el);

	}
}


function placeBombs(){

	// CREATE BOMB TAB (50)
	for(i = 0; i < 30; i++){

		// ON RECUPERE UNE POSITION DU TABLEAU DANS LES POSITIONS POSSIBLES
		var pos = Math.floor(Math.random() * possiblePosition.length);

		// ON RECUPERE LA VALEURE DE CETTE POSITION DANS bombNumb
		bombNumb = possiblePosition[pos];

		bombsTab[i] = bombNumb;

		// ON SUPPRIME LA CASE DU TABLEAU DEJA UTILISE POUR EVITER LES DOUBLONS
		possiblePosition.splice(pos, 1);
	}

}

function youLoose(){

	document.getElementById("dem").style.display = "none";
	document.getElementById("loose").style.display = "block";
	document.getElementById("title").innerHTML = "YOU LOOSE !";
	document.getElementById("subTitle").innerHTML = "Pas de bol.";

	console.log("YOU LOOSE");

}

function youWin(){

	document.getElementById("dem").style.display = "none";
	document.getElementById("win").style.display = "block";
	document.getElementById("title").innerHTML = "YOU WIN !";
	document.getElementById("subTitle").innerHTML = "Félicitation ! En vrai on sait bien que vous avez cliquer sur \"Show bombs\" mais on dira rien promis ;)";

	console.log("YOU WIN");

}

function clic(num){

	num = parseInt(num);
	loose = false;

	// CHECK SI CLICK SUR UNE BOMBE
	for(var i = 0; i < bombsTab.length; i++){

		if(num == bombsTab[i]){
			youLoose();
			loose = true;
			break;
		}
	}

	if(!loose)
		checkPlace(num);

}

function checkPlace(num){

	var nearBomb = false;
	var nbNearBomb = 0;

	// LA CASE N EST PAS UNE BOMBE DONC ON LA DECOUVRE
	for(i = 0; i < hiddenCase.length; i++){
		if (num == hiddenCase[i]) {
			discoveredCases.push(hiddenCase[i]);
			hiddenCase.splice(i, 1);
		}
	}

	// CONDITION DE VICTOIRE
	if(discoveredCases.length + bombsTab.length == 100){
		youWin();
	}

	// CHANGE STYLE
	document.getElementById(num).style.backgroundColor = "#333";

	// COMPARE CLIC ET POSITION BOMBE POUR CONNAITRE LE NOMBRE DE BOMBE A PROXIMITE
	for(var i = 0; i < bombsTab.length; i++){

		// SI PAS PREMIERE LIGNE
		if(num > 11){
			// CHECK SI BOMBE AU DESSUS DU CLIC
			if(num - 10 == bombsTab[i]){
				console.log("BOMBE EN HAUT");
				nearBomb = true;
				nbNearBomb++;
			}
		}
		// SI PAS PREMIERE COLONE
		if(num != 0 && num != 10 && num != 20 && num != 30 && num != 40 && num != 50 && num != 60 && num != 70 && num != 80 && num != 90){
			if(num - 1 == bombsTab[i]){
				console.log("BOMBE A GAUCHE");
				nearBomb = true;
				nbNearBomb++;
			}
		}
		// SI PAS DERNIERE LIGNE
		if(num < 89){
			if(num + 10 == bombsTab[i]){
				console.log("BOMBE EN BAS");
				nearBomb = true;
				nbNearBomb++;
			}
		}
		// SI PAS DEUXIEME COLONE
		if(num != 9 && num != 19 && num != 29 && num != 39 && num != 49 && num != 59 && num != 69 && num != 79 && num != 89 && num != 99){
			if(num + 1 == bombsTab[i]){
				console.log("BOMBE A DROITE");
				nearBomb = true;
				nbNearBomb++;
			}
		}
	}

	// SI IL Y A UNE BOMBE A PROXIMITE ON ECRIT NOMBRE
	if(nearBomb == true){
		console.log("Nombre de bombe proche : " + nbNearBomb);
		document.getElementById(num).innerHTML = nbNearBomb;
		document.getElementById(num).style.color = "black";
	}
	// SINON ON DECOUVRE LES CASES AUTOUR
	else{
		console.log("NO BOMBE");
		if(num > 9){
			discovered = false;
			for(i = 0; i < discoveredCases.length; i++){
				if(num - 10 == discoveredCases[i]){
					discovered = true;
					break;
				}
			}
			if(!discovered)
				checkPlace(num - 10);
		}
		if(num != 0 && num != 10 && num != 20 && num != 30 && num != 40 && num != 50 && num != 60 && num != 70 && num != 80 && num != 90){
			discovered = false;
			for(i = 0; i < discoveredCases.length; i++){
				if(num - 1 == discoveredCases[i]){
					discovered = true;
					break;
				}
			}
			if(!discovered)
				checkPlace(num - 1);
		}
		if(num < 89){
			discovered = false;
			for(i = 0; i < discoveredCases.length; i++){
				if(num + 10 == discoveredCases[i]){
					discovered = true;
					break;
				}
			}
			if(!discovered)
				checkPlace(num + 10);
		}
		if(num != 9 && num != 19 && num != 29 && num != 39 && num != 49 && num != 59 && num != 69 && num != 79 && num != 89 && num != 99){
			discovered = false;
			for(i = 0; i < discoveredCases.length; i++){
				if(num + 1 == discoveredCases[i]){
					discovered = true;
					break;
				}
			}
			if(!discovered)
				checkPlace(num + 1);
		}
	}

}



function createListeners(){

	for(i = 0; i < 100; i++){

		document.getElementsByClassName('el')[i].onclick = function () {clic(this.getAttribute('id'));};
	}

}


function load(){

	createElements();

	for(i = 0; i < 100; i++){
		possiblePosition[i] = i;
		hiddenCase[i] = i;
	} 
	
	placeBombs();

	createListeners();

}