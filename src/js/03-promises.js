import Notiflix from 'notiflix';
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
const inputDelay = document.querySelector('input[name=delay]');
const inputStep = document.querySelector('input[name=step');
const inputAmount = document.querySelector('input[name=amount]');
const buttonEl = document.querySelector('button[type=submit]');
const formEl = document.querySelector('.form');
formEl.addEventListener('submit', event => {
  event.preventDefault();
  let numbFirstDelay = Number(inputDelay.value);
  let numbStep = Number(inputStep.value);
  for (let index = 1; index <= Number(inputAmount.value); index++) {
    createPromise(index, numbFirstDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    numbFirstDelay += numbStep;
  }
});
