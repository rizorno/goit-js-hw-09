function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  body: document.querySelector('body'),
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

refs.stopBtn.disabled = true;

let timerId = null;

refs.startBtn.addEventListener('click', () => {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
  refs.stopBtn.classList.add('pause');

  //   refs.body.style.backgroundColor = getRandomHexColor();
  setTimeout(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1);

  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

refs.stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
  refs.stopBtn.classList.remove('pause');
});
