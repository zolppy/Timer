const toggleThemeButton = document.getElementById('toggle-theme-button');
const startButton = document.querySelector('#start-button');
const pauseButton = document.querySelector('#pause-button');
const resumeButton = document.querySelector('#resume-button');
const resetButton = document.querySelector('#reset-button');

let interval;
let minute = 0;
let second = 0;
let millisecond = 0;
let isPaused = false;

function updateTimer() {
  const minuteElement = document.querySelector('#minute');
  const secondElement = document.querySelector('#second');
  const millisecondElement = document.querySelector('#millisecond');

  const formatTime = (time) => time < 10 ? '0' + time : time;
  const formatMillisecond = (time) => time < 100 ? String(time).padStart(3, '0') : time;

  minuteElement.textContent = formatTime(minute);
  secondElement.textContent = formatTime(second);
  millisecondElement.textContent = formatMillisecond(millisecond);
}

function startTimer() {
  interval = setInterval(() => {
    if (!isPaused) {
      millisecond += 10;

      if (millisecond === 1000) {
        second++;
        millisecond = 0;
      }

      if (second === 60) {
        minute++;
        second = 0;
      }

      updateTimer();
    }
  }, 10);

  startButton.classList.add('hide');
  pauseButton.classList.remove('hide');
}

function pauseTimer() {
  isPaused = true;
  pauseButton.classList.add('hide');
  resumeButton.classList.remove('hide');
}

function resumeTimer() {
  isPaused = false;
  pauseButton.classList.remove('hide');
  resumeButton.classList.add('hide');
}

function resetTimer() {
  const minuteElement = document.querySelector('#minute');
  const secondElement = document.querySelector('#second');
  const millisecondElement = document.querySelector('#millisecond');

  clearInterval(interval);
  minute = 0;
  second = 0;
  millisecond = 0;
  minuteElement.textContent = '00';
  secondElement.textContent = '00';
  millisecondElement.textContent = '000';

  startButton.classList.remove('hide');
  pauseButton.classList.add('hide');
  resumeButton.classList.add('hide');
  resetButton.classList.remove('hide');
}

const loadTheme = () => {
  const bodyEl = document.querySelector('body');
  const containerEl = document.querySelector('#container');
  const toggleThemeButton = document.querySelector('#toggle-theme-button');
  const icon = document.querySelector('#icon-theme');
  const theme = localStorage.getItem('theme');

  if (theme) {
    if (theme === 'dark') {
      bodyEl.classList.add('dark');
      bodyEl.classList.add('dark');
      containerEl.classList.add('dark');
      toggleThemeButton.classList.add('dark');
      icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
    } else {
      bodyEl.classList.remove('dark');
      containerEl.classList.remove('dark');
      toggleThemeButton.classList.remove('dark');
      icon.classList.replace('bi-sun-fill', 'bi-moon-fill');
    }
  }
}

const toggleTheme = () => {
  const bodyEl = document.querySelector('body');
  const containerEl = document.querySelector('#container');
  const toggleThemeButton = document.querySelector('#toggle-theme-button');
  const icon = document.querySelector('#icon-theme');
  let theme;

  bodyEl.classList.toggle('dark');
  containerEl.classList.toggle('dark');
  toggleThemeButton.classList.toggle('dark');
  if (icon.classList.contains('bi-sun-fill')) {
    theme = 'light';
    icon.classList.replace('bi-sun-fill', 'bi-moon-fill');
    localStorage.setItem('theme', theme);
  } else {
    theme = 'dark';
    icon.classList.replace('bi-moon-fill', 'bi-sun-fill');
    localStorage.setItem('theme', theme);
  }
}

window.addEventListener('load', () => {
  loadTheme();
});

toggleThemeButton.addEventListener('click', toggleTheme);
startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resumeButton.addEventListener('click', resumeTimer);
resetButton.addEventListener('click', resetTimer);