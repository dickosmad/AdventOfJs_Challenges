const minutesInput = document.querySelector(".minutes input");
const secondsInput = document.querySelector(".seconds input");
const start = document.querySelector(".start");
const settings = document.querySelector(".settings");
const ring = document.querySelector(".ring");

let interval;
start.addEventListener("click", function () {
  if (start.textContent === "start") {
    start.textContent = "pause";

    interval = setInterval(function () {
      secondsInput.value--;
      if (secondsInput.value < 10) {
        secondsInput.value = secondsInput.value.padStart(2, "0");
      }
      if (minutesInput.value < 10) {
        minutesInput.value = minutesInput.value.padStart(2, "0");
      }
      if (secondsInput.value < 0) {
        minutesInput.value--;
        secondsInput.value = 60;
      }
      if (minutesInput.value <= 0 && secondsInput.value <= 0) {
        clearInterval(interval);
        ring.classList.add("ending");
      }
    }, 1000);
  } else {
    start.textContent = "start";
    clearInterval(interval);
  }
});

settings.addEventListener("click", function () {
  start.textContent = "start";
  if (start.textContent === "start") {
    clearInterval(interval);
    secondsInput.removeAttribute("disabled");
    minutesInput.removeAttribute("disabled");
  }
});
