import '../style.css';
import Timer from './timer.js';

export const inputTitle = document.querySelector('#title-date');
export const countdownTitle = document.querySelector('h1');
export const inputDate = document.querySelector('#date');
export const numbers = document.querySelector('.numbers');
export const complete = document.querySelector('.complete');

const buttonStart = document.querySelector('#btn');
const buttonReset = document.querySelector('#btn-reset');
const blockInput = document.querySelector('.input');
const blockOutput = document.querySelector('.output');

let timer;

// изменить отображение и начать подсчет самого обратного отсчета
// скрываем кнопку "Начать" и выводим кнопку "Сброс"
export const transitionDisplay = () => {
	buttonStart.classList.add('hide');
	buttonReset.classList.remove('hide');
	blockInput.classList.add('hide');
	blockOutput.classList.remove('hide');
 };

// точка входа, начало работы таймера, сохранение текущей даты и переход к следующему внешнему виду отображения на экране
function startCountdown() {
  timer = new Timer(inputDate.value);
  timer.init();

  buttonReset.addEventListener('click', reset);
}

// обнуляем значения полей ввода, сбрасываем все до начального состояния
function reset() {
  countdownTitle.textContent = 'Создать новый таймер обратного отсчета';
  blockInput.classList.remove('hide');
  blockOutput.classList.add('hide');
  buttonReset.classList.add('hide');
  buttonStart.classList.remove('hide');

  inputTitle.value = '';
  inputDate.value = '';

  // удаляем информацию из LocalStorage при сбросе таймера
  localStorage.removeItem('title');
  localStorage.removeItem('date');
  clearInterval(timer.timerID);
}

// заполняется при обновлении страницы и получать эти значения из localStorage
const pageRefresh = () => {
  const title = localStorage.getItem('title');
  const date = localStorage.getItem('date');

  if (!title && !date) {
    return;
  }

  inputTitle.value = title;
  inputDate.value = date;

  startCountdown();
};

buttonStart.addEventListener('click', startCountdown); // кнопка начать
// проверяем есть ли значение в localStorage и если есть переходим к дальнейшей работе
pageRefresh();
