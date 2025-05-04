"use strict";

// raspunsCorect = toate raspunsurile corecte puse sub forma de array si sunt accesate cu ajutorul la currentLevel;
// verbe = sunt toate verbele de la toate nivelele sub forma de array;
// cerinte = sunt toate cerintele de la toate nivelel sub forma de array;

// setLevel = functia care schimba datele afisate pe ecran;
// currentLevel = level ul curent si acesta este parametrul functiei;

// .verbul = span ul cu verbul din cerinta care trebuie afisata;
// .cerinta = span ul cu cerinta care trebuie afisata;

// .verb = input ul unde introducem verbul conjugat;
// .validare = butonul de validare;
// .raspuns = butonul care afiseaza raspunsul corect in input;

// Raspunsurile la fiecare nivel
let raspunsCorect = [];
raspunsCorect[1] = "vous parlez";
raspunsCorect[2] = "nous finissons";
raspunsCorect[3] = "il va";
raspunsCorect[4] = "tu prends";
raspunsCorect[5] = "elles font";
raspunsCorect[6] = "je suis";
raspunsCorect[7] = "vous avez";
raspunsCorect[8] = "ils viennent";
raspunsCorect[9] = "je vois";
raspunsCorect[10] = "elle dit";
raspunsCorect[11] = "tu mets";
raspunsCorect[12] = "nous savons";

// Setam primul nivel si dupa va creste in momentul in care se raspunde corect la intrebare adica mai jos in addEventListener.
let currentLevel = 1;
document.querySelector(".currentLevel").textContent = `${currentLevel}`;

// Progresul initial si cel total
let progress = 0;
let progressTotal = 100;

// Initalizam variabilelel care contorizeaza cate raspunsuri corecte si gresite a dat jucatorul
let raspunsuriCorecte = 0;
let raspunsuriGresite = 0;
let gresitContorizat = false;

function setLevel(level) {
  // Prima este null deoarece vreau sa am 12 nivele si in cod la fel. Daca incep de la 0 am sa am tot 12 dar ultimul va fi level 11.
  const verbe = [
    null,
    "PARLER",
    "FINIR",
    "ALLER",
    "PRENDRE",
    "FAIRE",
    "ÊTRE",
    "AVOIR",
    "VENIR",
    "VOIR",
    "DIRE",
    "METTRE",
    "SAVOIR",
  ];

  // Prima este null deoarece vreau sa am 12 nivele si in cod la fel. Daca incep de la 0 am sa am tot 12 dar ultimul va fi level 11.
  const cerinte = [
    null,
    "Conjugue le verbe à la 2e personne du pluriel (vous)",
    "Conjugue le verbe à la 1re personne du pluriel (nous)",
    "Conjugue le verbe à la 3e personne du singulier (il)",
    "Conjugue le verbe à la 2e personne du singulier (tu)",
    "Conjugue le verbe à la 3e personne du pluriel (elles)",
    "Conjugue le verbe à la 1re personne du singulier (je)",
    "Conjugue le verbe à la 2e personne du pluriel (vous)",
    "Conjugue le verbe à la 3e personne du pluriel (ils)",
    "Conjugue le verbe à la 1re personne du singulier (je)",
    "Conjugue le verbe à la 3e personne du singulier (elle)",
    "Conjugue le verbe à la 2e personne du singulier (tu)",
    "Conjugue le verbe à la 1re personne du pluriel (nous)",
  ];

  // Cu ajutorul DOM-ului schimb fiecare chestie de pe ecran: verbul, cerinta si inputul il golesc
  document.querySelector(".verbul").textContent = verbe[level];
  document.querySelector(".cerinta").textContent = cerinte[level];
  document.querySelector(".verb").value = "";
}

// Seteaza levelul ca de fiecare data cand trece prin functie sa stie al catelea vreb si cerinta ia.
setLevel(currentLevel);

// Butonul de validare
document.querySelector(".validare").addEventListener("click", function () {
  let inputField = document.querySelector(".verb").value.toLowerCase().trim();

  // Daca raqspunsul este corect
  if (inputField === raspunsCorect[currentLevel]) {
    // Daca mesajul rosu este activ, il pune pe none si apare cel verde
    if (document.querySelector(".mesajgresit").style.display === "block") {
      document.querySelector(".mesajgresit").style.display = "none";
    }
    document.querySelector(".mesajcorect").style.display = "block";
    document.querySelector(".validare").disabled = true;

    if (gresitContorizat === false) {
      raspunsuriCorecte++;
    }

    // Trecerea la urmatorul nivel
    setTimeout(function () {
      document.querySelector(".mesajcorect").style.display = "none";

      // Progressbar care trebuie sa il fac functional si sa creasca width pentru fiecare nivel facut adica atunci cand un nivel este facut corect vreau sa creasca un procent din bara de fiecare data si formula este: width la progressbar total (100%) / cate nivele sunt (actual: 12)
      progress += progressTotal / 12;
      document.querySelector(".progres").style.width = `${progress}%`;
      document.querySelector(".validare").disabled = false;

      currentLevel++;
      gresitContorizat = false;

      if (currentLevel <= 12) {
        document.querySelector(".currentLevel").textContent = `${currentLevel}`;
        setLevel(currentLevel);
      } else {
        window.location.href = "final.html";
      }
    }, 1000);

    // Daca raspunsul este gresit
  } else {
    // Daca mesajul verde este activ, il pune pe none si apare cel rosu
    if (document.querySelector(".mesajcorect").style.display === "block") {
      document.querySelector(".mesajcorect").style.display = "none";
    }
    document.querySelector(".mesajgresit").style.display = "block";

    if (gresitContorizat === false) {
      raspunsuriGresite++;
      gresitContorizat = true;
    }
  }

  localStorage.setItem("raspunsuriCorecte", raspunsuriCorecte);
  localStorage.setItem("raspunsuriGresite", raspunsuriGresite);
});

// Butonul de afisare a raspunsului
document.querySelector(".raspuns").addEventListener("click", function () {
  document.querySelector(".verb").value = raspunsCorect[currentLevel];
});
