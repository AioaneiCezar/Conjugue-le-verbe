let username = localStorage.getItem("username");
document.querySelector(".felicitari").textContent = `Félicitations ${username}`;

let raspunsuriCorecte = localStorage.getItem("raspunsuriCorecte");
let raspunsuriGresite = localStorage.getItem("raspunsuriGresite");
document.querySelector(
  ".statistici"
).textContent = `Réponses correctes ${raspunsuriCorecte}; Réponses incorrectes ${raspunsuriGresite}`;
