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
   if(verifiParametre(modes,'solo','duo')=== 1 ){
        verifiParametre(outils,'cross','circle')=== 0 ? modeDuo(cross,circle) : modeDuo(circle,cross)
   }
   //else{
  //      verifiParametre(outils,'cross','circle')=== 0 ? modeSolo(cross,circle) : modeSolo(circle,cross)
  // }
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
      if (verification(firstRow)) {
        cases.forEach((cellule) =>
          cellule.removeEventListener("click", clicked)
        );
      } else if (verification(secondRow)) {
        cases.forEach((cellule) =>
          cellule.removeEventListener("click", clicked)
        );
      } else if (verification(threeRow)) {
        cases.forEach((cellule) =>
          cellule.removeEventListener("click", clicked)
        );
      } else if (verification(firstCol)) {
        cases.forEach((cellule) =>
          cellule.removeEventListener("click", clicked)
        );
      } else if (verification(secondCol)) {
        cases.forEach((cellule) =>
          cellule.removeEventListener("click", clicked)
        );
      } else if (verification(threeCol)) {
        cases.forEach((cellule) =>
          cellule.removeEventListener("click", clicked)
        );
      } else if (verification(firstDiag)) {
        cases.forEach((cellule) =>
          cellule.removeEventListener("click", clicked)
        );
      } else if (verification(secondDiag)) {
        cases.forEach((cellule) =>
          cellule.removeEventListener("click", clicked)
        );
      }
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

//verifier qui  à gagner
const firstRow = [cases[0], cases[1], cases[2]];
const secondRow = [cases[3], cases[4], cases[5]];
const threeRow = [cases[6], cases[7], cases[8]];

const firstCol = [cases[0], cases[3], cases[6]];
const secondCol = [cases[1], cases[4], cases[7]];
const threeCol = [cases[2], cases[5], cases[8]];

const firstDiag = [cases[0], cases[4], cases[8]];
const secondDiag = [cases[2], cases[4], cases[6]];

function verification(tab) {
  if (
    tab[0].innerText !== "" &&
    tab[0].innerText === tab[1].innerText &&
    tab[1].innerText === tab[2].innerText
  ) {
    resultat.innerText = "Le vainqueur est : " + tab[0].innerText;
    tab[0].style.backgroundColor ='green'
    tab[1].style.backgroundColor ='green'
    tab[2].style.backgroundColor ='green'
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
  verifiParametre(outils,'cross','circle')=== 0 ? modeDuo(cross,circle) : modeDuo(circle,cross)
}

function verifiParametre(tab , first , second) {
  let recup =''
  tab.forEach((elt) => {
    if (elt.checked) {
      if(elt.getAttribute('id')=== first){
        recup = 0
      }else{
        recup = 1
      }
    }
  });
  return recup
}


/*
function modeSolo(firstOutil , secondOutil){
  const user = firstOutil;
  const computer = secondOutil;
  let stateOfCase = false 
  let count = 0 
  
  //choisir quel joueur débutera 
  const choiceOfPlayer = Math.floor(Math.random()*1)
  if(choiceOfPlayer === 0){
    //computer débute

  }else{
    //user debute 
  }

}


function computerCommence(){

    let choice = Math.floor(Math.random()*4)
    const tab = [cases[0].innerText,cases[2].innerText ,cases[4].innerText ,cases[6].innerText , cases[8].innerText]
    tab[choice] = computer

    while(
      //recherche a prendre les cases du fond 
      (cases[0].innerText==='' || 
      cases[2].innerText==='' || 
      cases[4].innerText==='' || 
      cases[6].innerText==='' ||
      cases[8].innerText==='') &&
      //Si possibilite de gagner 

      ){

    }

}

*/