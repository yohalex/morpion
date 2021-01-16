const cross = "❌";
const circle = "⭕";
const plateau = document.querySelector("table");
const cases = document.querySelectorAll("td");
const start = document.querySelector(".start");
const reStart = document.querySelector(".restart");
const menu = document.querySelector(".menu");
const modes = document.querySelectorAll(".mode input");
const outils = document.querySelectorAll(".choice-outil input");
const resultat = document.querySelector(".resultat");
let solo = true;
let duo = false;

const parametre = document.querySelector(".parametre");

start.addEventListener("click", startGame);

function startGame() {
  //retire les paramètres et bouton
  this.style.display = "none";
  parametre.style.display = "none";
  //affiche le plateau de jeu
  plateau.style.display = "table";
  //verification du mode et outil
  if (verifiParametre(modes, "solo", "duo") === 1) {
    verifiParametre(outils, "cross", "circle") === 0
      ? modeDuo(cross, circle)
      : modeDuo(circle, cross);
  } else {
    verifiParametre(outils, "cross", "circle") === 0
      ? modeSolo(cross, circle)
      : modeSolo(circle, cross);
  }
}

function modeDuo(firstOutil, secondOutil) {
  const firstPlayer = firstOutil;
  const secondPlayer = secondOutil;
  let stateOfCase = false;
  let count = 0;
  cases.forEach((cellule) => cellule.addEventListener("click", clicked));

  function clicked() {
    if (!stateOfCase) {
      stateOfCase = true;
      this.innerText = firstPlayer;
      this.removeEventListener("click", clicked);
      count++;
    } else {
      stateOfCase = false;
      this.innerText = secondPlayer;
      this.removeEventListener("click", clicked);
      count++;
    }
    //A partir de 5 click on verifie si il y 'a un gagnant
    if (count >= 5) {
        debuteVerification(count , clicked)
    }
    // a partir de 9 click
    if (
      count === 9 &&
      !verification(firstRow) &&
      !verification(secondRow) &&
      !verification(threeRow) &&
      !verification(firstCol) &&
      !verification(secondCol) &&
      !verification(threeCol) &&
      !verification(firstDiag) &&
      !verification(secondDiag)
    ) {
      resultat.innerText = "Pas de vainqueur ";
      finOfpartie();
    }
  }
}



function modeSolo(firstOutil, secondOutil) {
  compteur = 0;
  const user = firstOutil;
  const computer = secondOutil;
  const placeStrategique = [cases[0], cases[4] ,cases[2], cases[6], cases[8]] ;
  const placeNonStrategique = [cases[1], cases[3], cases[5]];

  //choisir quel joueur débutera
  const choiceOfPlayer =  Math.floor(Math.random()* 2);
  console.log(choiceOfPlayer)

  if (choiceOfPlayer === 0) {
    //computer débute
    let index = Math.floor(Math.random()* 8)
    cases[index].innerText = computer
    compteur++
    cases[index].removeEventListener('click',clickedCase)
    cases.forEach((cellule) => cellule.addEventListener("click", clickedCase));

  } else {
    //user debute
    cases.forEach((cellule) => cellule.addEventListener("click", clickedCase));
  }

  function clickedCase() {
    // user fait son tour
    this.innerText = user;
    this.removeEventListener("click", clickedCase);
    compteur++;

    if (
      //verifie si user tente de gagner
      // ou si computer a une possibilité de gagner
      !coupFatal(firstRow, computer) &&
      !coupFatal(secondRow, computer) &&
      !coupFatal(threeRow, computer) &&
      !coupFatal(firstCol, computer) &&
      !coupFatal(secondCol, computer) &&
      !coupFatal(threeCol, computer) &&
      !coupFatal(firstDiag, computer) &&
      !coupFatal(secondDiag, computer)
    ) {
      // on recherche les points stratégiques
      if (
        cases[0].innerText === "" ||
        cases[2].innerText === "" ||
        cases[6].innerText === "" ||
        cases[8].innerText === "" ||
        cases[4].innerText === ""
      ) {
        filtrePlaceVide( placeStrategique , computer)

      }else if (
        cases[1].innerText === "" ||
        cases[3].innerText === "" ||
        cases[5].innerText === ""
      ) {
        filtrePlaceVide( placeNonStrategique , computer)
      }
    
    }

    debuteVerification(compteur ,clickedCase , user)
    verifiePlateauRempli(compteur)
    //retirer le click des coup de computer
    cases.forEach((cellule) => {
      if (cellule.innerText !== "") {
        cellule.removeEventListener("click", clickedCase);
      }
    });
  }
}

//verifier qui  à gagner
const firstRow = [cases[0], cases[1], cases[2]];
const secondRow = [cases[3], cases[4], cases[5]];
const threeRow = [cases[6], cases[7], cases[8]];

const firstCol = [cases[0], cases[3], cases[6]];
const secondCol = [cases[1], cases[4], cases[7]];
const threeCol = [cases[2], cases[5], cases[8]];

const firstDiag = [cases[0], cases[4], cases[8]];
const secondDiag = [cases[2], cases[4], cases[6]];

function verification(tab , user) {
  if (
    tab[0].innerText !== "" &&
    tab[0].innerText === tab[1].innerText &&
    tab[1].innerText === tab[2].innerText
  ) {
    if (verifiParametre(modes, "solo", "duo") === 1) {
      resultat.innerText = "Le vainqueur est : " + tab[0].innerText;
      resultat.style.color = "#00bcf2"
    } else {
        if(tab[0].innerText === user){
          resultat.innerText ="Bravo vous avez gagné au bout de "+ compteur + " coups"
          resultat.style.color = "green"
        }else{
          resultat.innerText = "Pff vous avez perdu "
          resultat.style.color = "red"
        }
    }
    tab[0].style.backgroundColor = "green";
    tab[1].style.backgroundColor = "green";
    tab[2].style.backgroundColor = "green";
    finOfpartie();
    return true;
  } else {
    return false;
  }
}

function finOfpartie() {
  reStart.style.display = "inline-block";
  menu.style.display = "inline-block";
}

menu.addEventListener("click", showMenu);

function showMenu() {
  reStart.style.display = "none";
  menu.style.display = "none";
  parametre.style.display = "flex";
  plateau.style.display = "none";
  start.style.display = "inline-block";
  resultat.innerText = "";

  cases.forEach((cellule) => {
    cellule.innerText = "";
    cellule.style.backgroundColor = "#00bcf2";
  });
}

reStart.addEventListener("click", newPartie);
function newPartie() {
  reStart.style.display = "none";
  menu.style.display = "none";
  resultat.innerText = "";
  cases.forEach((cellule) => {
    cellule.innerText = "";
    cellule.style.backgroundColor = "#00bcf2";
  });
  if (verifiParametre(modes, "solo", "duo") === 1) {
    verifiParametre(outils, "cross", "circle") === 0
      ? modeDuo(cross, circle)
      : modeDuo(circle, cross);
  } else {
    verifiParametre(outils, "cross", "circle") === 0
      ? modeSolo(cross, circle)
      : modeSolo(circle, cross);
  }
  /*
  verifiParametre(outils, "cross", "circle") === 0
    ? modeDuo(cross, circle)
    : modeDuo(circle, cross);*/
}

function verifiParametre(tab, first, second) {
  let recup = "";
  tab.forEach((elt) => {
    if (elt.checked) {
      if (elt.getAttribute("id") === first) {
        recup = 0;
      } else {
        recup = 1;
      }
    }
  });
  return recup;
}

// au cas user est sur le point de gagner
// ou computer est sur le point de gagner
function coupFatal(tab, outil) {
  if (
    tab[0].innerText !== "" &&
    tab[1].innerText !== "" &&
    tab[0].innerText === tab[1].innerText &&
    tab[2].innerText === ""
  ) {
    tab[2].innerText = outil;
    compteur++;
    return true;
  } else if (
    tab[0].innerText !== "" &&
    tab[2].innerText !== "" &&
    tab[0].innerText === tab[2].innerText &&
    tab[1].innerText === ""
  ) {
    tab[1].innerText = outil;
    compteur++;
    return true;
  } else if (
    tab[1].innerText !== "" &&
    tab[2].innerText !== "" &&
    tab[1].innerText === tab[2].innerText &&
    tab[0].innerText === ""
  ) {
    tab[0].innerText = outil;
    compteur++;
    return true;
  } else {
    return false;
  }
}

function filtrePlaceVide(tab , outil) {
  let temp = [];
  tab.forEach((place) => {
    if (place.innerText === "") {
      temp.push(place);
    }
  });
  let long = temp.length - 1;
  let index = Math.floor(Math.random() * long);
  temp[index].innerText = outil;
  compteur++
  temp = [];
}

function debuteVerification(count , Click , user){
  //A partir de 5 click on verifie si il y 'a un gagnant
  if (count >= 5) {
    if (verification(firstRow , user)) {
      cases.forEach((cellule) =>
        cellule.removeEventListener("click", Click)
      );
    } else if (verification(secondRow , user)) {
      cases.forEach((cellule) =>
        cellule.removeEventListener("click", Click)
      );
    } else if (verification(threeRow , user)) {
      cases.forEach((cellule) =>
        cellule.removeEventListener("click", Click)
      );
    } else if (verification(firstCol , user)) {
      cases.forEach((cellule) =>
        cellule.removeEventListener("click", Click)
      );
    } else if (verification(secondCol , user)) {
      cases.forEach((cellule) =>
        cellule.removeEventListener("click", click)
      );
    } else if (verification(threeCol , user)) {
      cases.forEach((cellule) =>
        cellule.removeEventListener("click", Click)
      );
    } else if (verification(firstDiag , user)) {
      cases.forEach((cellule) =>
        cellule.removeEventListener("click", Click)
      );
    } else if (verification(secondDiag , user)) {
      cases.forEach((cellule) =>
        cellule.removeEventListener("click", Click)
      );
    }
  }
}


function verifiePlateauRempli(count){
  if (
    count >= 9 &&
    !verification(firstRow) &&
    !verification(secondRow) &&
    !verification(threeRow) &&
    !verification(firstCol) &&
    !verification(secondCol) &&
    !verification(threeCol) &&
    !verification(firstDiag) &&
    !verification(secondDiag)
  ) {
    resultat.innerText = "Pas de vainqueur ";
    resultat.style.color = "#00bcf2"
    finOfpartie();
  }
}
