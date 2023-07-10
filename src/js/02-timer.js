import Notiflix from 'notiflix';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
const inputEl = document.querySelector('input#datetime-picker');
const btnStartEl = document.querySelector('button');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours');
const minutesEl = document.querySelector('[data-minutes');
const secondsEl = document.querySelector('[data-seconds');
const fp = flatpickr(inputEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      btnStartEl.disabled = false;
    } else if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    }
  },
});
btnStartEl.addEventListener('click', onBtnStart);
function onBtnStart() {
  btnStartEl.disabled = true;
  const intervalTimer = setInterval(() => {
    const deltaTime = +new Date(inputEl.value) - Date.now();
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
    if (deltaTime < 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      clearInterval(intervalTimer);
    }
  }, 1000);
}
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}
function pad(item) {
  return String(item).padStart(2, 0);
}
