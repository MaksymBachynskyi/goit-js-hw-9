const btnStartEl = document.querySelector('button[data-start]');
const btnStopEl = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
let cangeColorIdInterval = null;
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
btnStartEl.addEventListener('click', onBtnStart);
btnStopEl.addEventListener('click', onBtnStop);
function onBtnStart() {
  btnStartEl.disabled = true;
  btnStopEl.disabled = false;
  cangeColorIdInterval = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}
function onBtnStop() {
  clearInterval(cangeColorIdInterval);
  btnStartEl.disabled = false;
  btnStopEl.disabled = true;
}
