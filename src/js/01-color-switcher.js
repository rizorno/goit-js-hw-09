function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const { body, startBtn, stopBtn } = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

stopBtn.disabled = true;

let timerId = null;

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  stopBtn.classList.add('pause');

  setTimeout(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1);

  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
  stopBtn.classList.remove('pause');
});
