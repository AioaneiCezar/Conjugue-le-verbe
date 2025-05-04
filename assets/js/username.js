document.querySelector(".facile").addEventListener("click", function () {
  let username = document.querySelector(".username").value;

  if (username !== "") {
    localStorage.setItem("username", username);
    window.location.href = "alege.html";
  }
});

document.querySelector(".moyen").addEventListener("click", function () {
  let username = document.querySelector(".username").value;

  if (username !== "") {
    localStorage.setItem("username", username);
    window.location.href = "verb.html";
  }
});
