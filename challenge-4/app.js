const keys = [...document.querySelectorAll(".key")];

function getRandomKey() {
  return keys[Math.floor(Math.random() * keys.length)];
}

let randomKey = getRandomKey();

document.addEventListener("DOMContentLoaded", () => {
  randomKey.classList.add("jiggle");
});

document.addEventListener("keydown", function (evt) {
  if (randomKey.dataset.key.toLowerCase() === evt.key.toLowerCase()) {
    randomKey.classList.remove("jiggle");
    randomKey = getRandomKey();
    randomKey.classList.add("jiggle");
  }
});
