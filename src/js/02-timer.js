import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import 'flatpickr/dist/themes/dark.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

let selectedTime = null;

const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.insertAdjacentHTML(
  'afterend',
  " <button type='button' data-stop class='stop'>Stop</button>"
);
const stopBtn = document.querySelector('[data-stop]');

stopBtn.insertAdjacentHTML(
  'afterend',
  " <button type='button' data-destroy class='destroy'>Destroy</button>"
);
const destroyBtn = document.querySelector('[data-destroy]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: Date.now(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future');
      selectedDates[0] = new Date();
    } else {
      refs.startBtn.disabled = false;
      selectedTime = selectedDates[0];
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

class Timer {
  timerID = null;
  isActive = false;

  constructor() {
    refs.startBtn.disabled = true;
    stopBtn.disabled = true;
    destroyBtn.disabled = true;
  }

  startTimer() {
    // Needed if the start button is not disabled
    //  if (this.isActive) {
    //    return;
    //  }

    refs.startBtn.disabled = true;
    stopBtn.disabled = false;
    destroyBtn.disabled = false;

    this.isActive = true;
    this.timerID = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = selectedTime - currentTime;
      const componentsTimer = convertMs(deltaTime);
      this.updateComponentsTimer(componentsTimer);
      if (deltaTime <= 0) {
        this.stopTimer();
      }
    }, 1000);
  }

  updateComponentsTimer({ days, hours, minutes, seconds }) {
    refs.days.textContent = days;
    refs.hours.textContent = hours;
    refs.minutes.textContent = minutes;
    refs.seconds.textContent = seconds;
  }

  stopTimer() {
    // Needed if the stop button is not disabled
    //  if (!this.isActive) return;
    //  this.isActive = false;

    clearInterval(this.timerID);
    refs.startBtn.disabled = true;
    stopBtn.disabled = true;
    destroyBtn.disabled = false;
  }

  destroyTimer() {
    clearInterval(this.timerID);
    const listValue = document.querySelectorAll('.value');
    listValue.forEach(element => {
      element.textContent = '00';
    });
    stopBtn.disabled = true;
    destroyBtn.disabled = true;
  }
}

const timer = new Timer();

flatpickr(refs.inputDate, options);

refs.startBtn.addEventListener('click', () => timer.startTimer());
stopBtn.addEventListener('click', () => timer.stopTimer());
destroyBtn.addEventListener('click', () => timer.destroyTimer());
