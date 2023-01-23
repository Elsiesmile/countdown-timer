import { countdownTitle, inputTitle, numbers, complete, transitionDisplay} from './index.js';

export default class Timer {
	constructor(date, inputTitle) {
	  this.date = date;
	  this.timerID  = null;
	  this.dateNow = null;
	}
 
	init() {
		if (this.date === '') {
		  // проверяем что дата подходящая
		  alert('Дата не введена!');
  
		  return;
		}
  
		countdownTitle.textContent = this.inputTitle;
  
		this.startTimer();
	 }
 
	// запускается таймер
	startTimer() {
	  // сохраняем данные в локальное хранилище
	  localStorage.setItem('title', inputTitle.value);
	  localStorage.setItem('date', this.date);
 
	  // значение заголовка
	  countdownTitle.innerHTML = inputTitle.value;
 
	  transitionDisplay();
	  this.keepCountdown();
	  this.timerID = setInterval(this.keepCountdown.bind(this), 1000); // вызываем функцию кажду секунду
	}
 
	// логика обратного отсчета до выбранной даты
	keepCountdown() {
	  this.dateNow = moment(); // текущий момент
 
	  if (moment(this.date).diff(this.dateNow) <= 0) {
		 clearInterval(this.timerID);
		 complete.classList.remove('hide');
		 complete.textContent = `${this.inputTitle} завершился ${this.date}`;
 
		 return;
	  }
 
	  this.createDate(this.dateNow);
	}
 
	// находим целое количество дней,часов,минут и секунд в разнице между датами
	createDate(dateNow) {
	  const days = Math.floor(moment(this.date).diff(dateNow, 'days'));
	  const hours = Math.floor(moment(this.date).diff(dateNow, 'hours') % 24);
	  const minutes = Math.floor(moment(this.date).diff(dateNow, 'minutes') % 60);
	  const seconds = Math.floor(moment(this.date).diff(dateNow, 'seconds') % 60);
 
	  // складываем полученные значения по следующему формату: дни:часы:минуты:секунды
	  numbers.textContent = 
	  `${this.addZero(days)}:${this.addZero(hours)}:${this.addZero(minutes)}:${this.addZero(seconds)}`;
	}
 
	// проверка значений, все значения из 2х цифр и чтобы смотрелось лучше добавляем 0 к числам меньше 10
	addZero(dateID) {
	 return dateID < 10 ? `0${dateID}` : dateID;
	}
 }
