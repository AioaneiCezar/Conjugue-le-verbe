"use strict";

let currentLevel = 1;
document.querySelector(".currentLevel").textContent = currentLevel;

// Progresul initial si cel total
let progress = 0;
let progressTotal = 100;

// Initalizam variabilelel care contorizeaza cate raspunsuri corecte si gresite a dat jucatorul
let raspunsuriCorecte = 0;
let raspunsuriGresite = 0;
localStorage.setItem("raspunsuriCorecte", raspunsuriCorecte);
localStorage.setItem("raspunsuriGresite", raspunsuriGresite);
let gresitContorizat = false;

const nivele = [
  null,
  {
    verb: "PARLER",
    cerinta: "Conjugue à la 2e personne du pluriel (vous)",
    optiuni: ["parlons", "parlez", "parle", "parles"],
    corect: 1,
  },
  {
    verb: "FINIR",
    cerinta: "Conjugue à la 1re personne du pluriel (nous)",
    optiuni: ["finit", "finis", "finissons", "finissez"],
    corect: 2,
  },
  {
    verb: "ALLER",
    cerinta: "Conjugue à la 3e personne du singulier (il)",
    optiuni: ["allez", "va", "vas", "allons"],
    corect: 1,
  },
  {
    verb: "PRENDRE",
    cerinta: "Conjugue à la 2e personne du singulier (tu)",
    optiuni: ["prends", "prend", "prenez", "prennent"],
    corect: 0,
  },
  {
    verb: "FAIRE",
    cerinta: "Conjugue à la 3e personne du pluriel (elles)",
    optiuni: ["fait", "faites", "faisons", "font"],
    corect: 3,
  },
  {
    verb: "ÊTRE",
    cerinta: "Conjugue à la 1re personne du singulier (je)",
    optiuni: ["es", "suis", "sommes", "êtes"],
    corect: 1,
  },
  {
    verb: "AVOIR",
    cerinta: "Conjugue à la 2e personne du pluriel (vous)",
    optiuni: ["avez", "as", "ont", "ai"],
    corect: 0,
  },
  {
    verb: "VENIR",
    cerinta: "Conjugue à la 3e personne du pluriel (ils)",
    optiuni: ["vient", "venons", "viennent", "viens"],
    corect: 2,
  },
  {
    verb: "VOIR",
    cerinta: "Conjugue à la 1re personne du singulier (je)",
    optiuni: ["vois", "voit", "voyons", "voient"],
    corect: 0,
  },
  {
    verb: "DIRE",
    cerinta: "Conjugue à la 3e personne du singulier (elle)",
    optiuni: ["dis", "dit", "dites", "disons"],
    corect: 1,
  },
  {
    verb: "METTRE",
    cerinta: "Conjugue à la 2e personne du singulier (tu)",
    optiuni: ["mets", "met", "mettons", "mettez"],
    corect: 0,
  },
  {
    verb: "SAVOIR",
    cerinta: "Conjugue à la 1re personne du pluriel (nous)",
    optiuni: ["sait", "savons", "sais", "savez"],
    corect: 1,
  },
];

const clase = [".unu", ".doi", ".trei", ".patru"];

function setLevel(level) {
  const nivel = nivele[level];

  document.querySelector(".verbul").textContent = nivel.verb;
  document.querySelector(".cerinta").textContent = nivel.cerinta;

  clase.forEach(function (cls, idx) {
    const btn = document.querySelector(cls);
    btn.textContent = nivel.optiuni[idx];
    btn.style.backgroundColor = "";
    btn.style.color = "";
  });
}

setLevel(currentLevel);

function verificaRaspuns(index) {
  const corectIndex = nivele[currentLevel].corect;

  if (index === corectIndex) {
    displayCorect(index);
  } else {
    displayGresit(index);
  }
}

function displayCorect(index) {
  const btn = document.querySelector(clase[index]);
  document.querySelectorAll(".btn").forEach(function (btn) {
    btn.disabled = true;
  });
  btn.style.backgroundColor = "green";
  btn.style.color = "white";

  if (gresitContorizat === false) {
    raspunsuriCorecte++;
    localStorage.setItem("raspunsuriCorecte", raspunsuriCorecte);
  }

  setTimeout(() => {
    currentLevel++;

    // Progressbar care trebuie sa il fac functional si sa creasca width pentru fiecare nivel facut adica atunci cand un nivel este facut corect vreau sa creasca un procent din bara de fiecare data si formula este: width la progressbar total (100%) / cate nivele sunt (actual: 12)
    progress += progressTotal / (nivele.length - 1);
    document.querySelector(".progres").style.width = `${progress}%`;

    gresitContorizat = false;

    document.querySelectorAll(".btn").forEach(function (btn) {
      btn.disabled = false;
    });

    if (currentLevel < nivele.length) {
      document.querySelector(".currentLevel").textContent = currentLevel;
      setLevel(currentLevel);
    } else {
      window.location.href = "final_usor.html";
    }
  }, 1000);
}

function displayGresit(index) {
  const btn = document.querySelector(clase[index]);

  btn.style.backgroundColor = "red";
  btn.style.color = "white";

  if (gresitContorizat === false) {
    raspunsuriGresite++;
    localStorage.setItem("raspunsuriGresite", raspunsuriGresite);
    gresitContorizat = true;
  }
}

clase.forEach(function (cls, index) {
  document.querySelector(cls).addEventListener("click", () => {
    verificaRaspuns(index);
  });
});
