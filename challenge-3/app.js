const pianoKeys = document.querySelectorAll("a");
let keys = [...pianoKeys];
const audios = Array.from([...pianoKeys]).map(
  (_, idx) => new Audio(`audio/key-${idx + 1}.mp3`)
);

keys.forEach((pianoKey, index) => {
  pianoKey.addEventListener("click", function playAudio(evt) {
    evt.preventDefault();
    const audio = audios[index];
    audio.play();
  });
});
