setInterval(setClock, 1000)

const secondHand = document.querySelector('[data-second-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const hourHand = document.querySelector('[data-hour-hand]')
const elem = document.documentElement;

function setClock(){
  const currentDate = new Date()

  let currentSecond = currentDate.getSeconds();         // 0 - 59
  let currentMinute = currentDate.getMinutes();         // 0 - 59
  let currentHour = currentDate.getHours();             // 0 - 23
  let currentDay = currentDate.getDay();                // 0 - 6
  let currentDateInMonth = currentDate.getDate();       // 1 - 31
  let currentMonth = currentDate.getUTCMonth();         // 0 - 11
  let currentYear = currentDate.getFullYear();          // YYYY

  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  let secondsRatio = currentSecond / 60
  let minutesRatio = (secondsRatio + currentMinute) / 60
  let hoursRatio = (minutesRatio + currentHour) / 12

  let session = "AM";

  if(currentHour === 0){
      currentHour = 12;
  }

  if(currentHour > 12){
      currentHour = currentHour - 12;
      session = "PM";
  }

  currentHour = (currentHour < 10) ? "0" + currentHour : currentHour;
  currentMinute = (currentMinute < 10) ? "0" + currentMinute : currentMinute;
  currentSecond = (currentSecond < 10) ? "0" + currentSecond : currentSecond;

  const time = currentHour + ":" + currentMinute + ":" + currentSecond + " " + session;
  document.getElementById("time").innerText = time;
  document.getElementById("time").textContent = time;

  const date = days[currentDay] + ", " + months[currentMonth] + " " + currentDateInMonth + ", " + currentYear;
  document.getElementById("date").innerText = date;
  document.getElementById("date").textContent = date;

  setRotation({element: secondHand, rotationRatio: secondsRatio})
  setRotation({element: minuteHand, rotationRatio: minutesRatio})
  setRotation({element: hourHand, rotationRatio: hoursRatio})
}

function setRotation({element, rotationRatio}){
  element.style.setProperty('--rotation', rotationRatio * 360)
}

// ###########################################################
// FULLSCREEN BUTTON
// ###########################################################

if(document.fullscreenEnabled) {
	const toggleBtn = document.querySelector('.js-toggle-fullscreen-btn');

	const styleEl = document.createElement('link');
	styleEl.setAttribute('rel', 'stylesheet');
	styleEl.setAttribute('href', 'css/main.css');
	styleEl.addEventListener('load', function() {
		toggleBtn.hidden = false;
	});
	document.head.appendChild(styleEl);

	toggleBtn.addEventListener('click', function() {
		if(document.fullscreenElement != null) {
			document.exitFullscreen();
		} else if(document.documentElement.requestFullscreen) {
			document.documentElement.requestFullscreen();
		}
	});

	document.addEventListener('fullscreenchange', handleFullscreen);
	document.addEventListener('webkitfullscreenchange', handleFullscreen);


	function handleFullscreen() {
		if(document.fullscreenElement != null) {
			toggleBtn.classList.add('on');
			toggleBtn.setAttribute('aria-label', 'Exit fullscreen mode');
		} else {
			toggleBtn.classList.remove('on');
			toggleBtn.setAttribute('aria-label', 'Enter fullscreen mode');
		}
	}
}


setClock()
